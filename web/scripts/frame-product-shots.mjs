/**
 * Puts every pack shot in the same 4:3 frame as orthagrow-cal.webp — client, 2026-09-29:
 * "all the product images the same size".
 *
 * The product card is a 4:3 box that shows its image whole (object-fit: contain). A 4:3
 * photo like Orthagrow Cal fills it; a square pouch, a portrait box or a Huwa-San bottle
 * cut out on transparency sat in the middle with empty bands around it, and read smaller.
 * So each shot that is not already 4:3 is rebuilt at 4:3:
 *
 *  - a photo on a studio ground is fitted to the frame's height and its ground carried
 *    out to the sides by repeating the edge pixels — the grounds are flat or run in
 *    horizontal bands, so the join does not show;
 *  - a cut-out on transparency is trimmed to the product and set on white, filling
 *    FILL of the frame's height, so every bottle stands at the same height;
 *  - a logo (the ranges without a pack shot yet) is set on white at LOGO_FILL of the width.
 *
 * Idempotent: a shot that is already 4:3 and opaque is left alone. The originals are in git.
 * Run from web/, then re-measure:
 *   node scripts/frame-product-shots.mjs && node scripts/measure-media.mjs
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const PRODUCTS = join(HERE, '..', 'public', 'media', 'products');

const RATIO = 4 / 3;
/** How far from 4:3 a shot may be and still count as framed (Orthagrow Cal is 1.317). */
const TOLERANCE = 0.03;
/** The frame's height; smaller photos keep their own and are not upscaled. */
const MAX_HEIGHT = 1080;
/** The share of the frame's height a cut-out product fills. */
const FILL = 0.88;
/** The share of the frame's width a logo fills. */
const LOGO_FILL = 0.7;
/** Wider than this, a transparent image is a logo rather than a product. */
const LOGO_RATIO = 2;

const WEBP = { quality: 86, effort: 6 };

for (const name of readdirSync(PRODUCTS).filter((f) => f.endsWith('.webp'))) {
  const file = join(PRODUCTS, name);
  /* Read into memory: libvips holding the path open makes OneDrive refuse the write back. */
  const source = readFileSync(file);
  const { width, height, hasAlpha } = await sharp(source).metadata();
  const framed = Math.abs(width / height - RATIO) <= RATIO * TOLERANCE;
  if (framed && !hasAlpha) continue;

  let out;
  if (hasAlpha) {
    const trimmed = await sharp(source).trim().toBuffer({ resolveWithObject: true });
    const logo = trimmed.info.width / trimmed.info.height > LOGO_RATIO;
    const frameH = Math.min(MAX_HEIGHT, Math.max(height, 600));
    const frameW = Math.round(frameH * RATIO);
    const product = await sharp(trimmed.data)
      .resize(
        logo
          ? { width: Math.round(frameW * LOGO_FILL) }
          : { width: Math.round(frameW * 0.9), height: Math.round(frameH * FILL), fit: 'inside' }
      )
      .toBuffer();
    out = await sharp({ create: { width: frameW, height: frameH, channels: 3, background: '#ffffff' } })
      .composite([{ input: product, gravity: 'center' }])
      .webp(WEBP)
      .toBuffer();
  } else if (width / height < RATIO) {
    /* Taller than 4:3: fit the height, carry the ground out to the sides. */
    const frameH = Math.min(MAX_HEIGHT, height);
    const fitted = await sharp(source).resize({ height: frameH }).toBuffer({ resolveWithObject: true });
    const extra = Math.round(frameH * RATIO) - fitted.info.width;
    out = await sharp(fitted.data)
      .extend({ left: Math.floor(extra / 2), right: Math.ceil(extra / 2), extendWith: 'copy' })
      .webp(WEBP)
      .toBuffer();
  } else {
    /* Wider than 4:3: fit the width, carry the ground up and down. */
    const frameW = Math.min(Math.round(MAX_HEIGHT * RATIO), width);
    const fitted = await sharp(source).resize({ width: frameW }).toBuffer({ resolveWithObject: true });
    const extra = Math.round(frameW / RATIO) - fitted.info.height;
    out = await sharp(fitted.data)
      .extend({ top: Math.floor(extra / 2), bottom: Math.ceil(extra / 2), extendWith: 'copy' })
      .webp(WEBP)
      .toBuffer();
  }

  writeFileSync(file, out);
  const m = await sharp(out).metadata();
  console.log(`${name.padEnd(36)} ${width}x${height}${hasAlpha ? ' alpha' : ''}  ->  ${m.width}x${m.height}`);
}

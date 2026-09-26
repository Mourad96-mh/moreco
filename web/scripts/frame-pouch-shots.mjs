/**
 * Re-mats the 1 kg pouch pack shots of the Orthagrow 4G range.
 *
 * The renders the client sent are the pouch on white with barely twenty pixels of margin
 * — and the catalogue lays every pack shot over --paper-2, a grey-beige panel. A white
 * rectangle stopping a few millimetres from the pouch reads as a badly cut sticker, which
 * is exactly what the briefing of 2026-09-17 objected to.
 *
 * So the product is cut off its own background and re-mounted: the near-white surround is
 * measured away, and what is left is centred on a clean square white mat with a wide even
 * margin. Nothing else changes — the panel behind it then reads as the frame and the mat
 * as the mount, which is what the client asked for, and the pouch sits inside both.
 *
 * The cut is a measurement, not a segmentation: the background is a flat 254 and the
 * pouch throws a soft shadow, so the bounding box of everything darker than THRESHOLD is
 * the product plus its shadow, exactly. Keying the white out to transparency would eat
 * into the pouch, which is itself white.
 *
 * Idempotent: a shot already matted has an even margin, so re-running finds the same box
 * and rebuilds the same file. Run from web/: node scripts/frame-pouch-shots.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const PRODUCTS = join(HERE, '..', 'public', 'media', 'products');

/**
 * The water-soluble 1 kg pouches still on a white render. None are left: Frucfolia,
 * Frucferti and Matur were replaced by studio shots on a coloured ground on 2026-09-21,
 * Initio and Flor on 2026-09-26. Those shots have no white surround to measure, so the
 * list stays empty — running the script over them would shrink them onto a white mat.
 */
const SHOTS = [];

/** How far from pure white a pixel must be to count as product rather than backdrop. */
const THRESHOLD = 8;
/** The mat, and the share of its height the pouch is allowed to fill. */
const MAT = 1400;
const FILL = 0.8;

/** The tightest box holding every pixel that is not the white backdrop. */
async function contentBox(source) {
  const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let left = width;
  let right = -1;
  let top = height;
  let bottom = -1;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const dark =
        255 - data[i] > THRESHOLD || 255 - data[i + 1] > THRESHOLD || 255 - data[i + 2] > THRESHOLD;
      if (!dark) continue;
      if (x < left) left = x;
      if (x > right) right = x;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
    }
  }

  if (right < 0) throw new Error('no product found, the shot is blank');
  return { left, top, width: right - left + 1, height: bottom - top + 1 };
}

for (const slug of SHOTS) {
  const file = join(PRODUCTS, `${slug}.webp`);
  /* Read once into memory and work off the buffer. Handing sharp the path instead leaves
     libvips holding the file open, and this project lives in a OneDrive folder, which
     then refuses to reopen it for writing (EUNKNOWN, and EPERM on a rename over it). */
  const source = readFileSync(file);
  const box = await contentBox(source);

  const product = await sharp(source)
    .extract(box)
    .resize({ height: Math.round(MAT * FILL), fit: 'inside' })
    .toBuffer();

  const matted = await sharp({
    create: { width: MAT, height: MAT, channels: 3, background: '#ffffff' },
  })
    .composite([{ input: product, gravity: 'center' }])
    .webp({ quality: 88 })
    .toBuffer();

  writeFileSync(file, matted);
  console.log(
    `${slug.padEnd(22)} cut ${box.width}×${box.height} at ${box.left},${box.top}` +
      `  ->  ${MAT}×${MAT}  ${Math.round(source.length / 1024)} kB -> ${Math.round(matted.length / 1024)} kB`
  );
}

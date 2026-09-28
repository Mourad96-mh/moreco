/**
 * Puts the photographs the client chose on each segment — briefing of 2026-09-28: citrus for
 * Agriculture & Crops, the family for Humans, broilers for Animals. Disinfection keeps
 * the pictures it has.
 *
 * A segment's picture appears in three places, and each gets its own cut of the same
 * photograph so the segment reads as one image across the site:
 *
 *  - scenes/segment-*.webp — the home page hexagon. Cut to the hexagon of the one the
 *    client kept (segment-general), and washed in the segment colour the way the
 *    archive's four hexagons were.
 *  - pages/*.webp — the Applications page, where the photo sits on a plate.
 *  - heroes/seg-*.webp — the banner of the segment page.
 *
 * The files the client sent are 360 to 612 px wide. That covers the hexagon and the
 * plate at their size on the page; the banner is written at BANNER_WIDTH rather than
 * the 2000 px of the other heroes, since upscaling further adds bytes and no detail —
 * the browser stretches it under the banner's dark gradient.
 *
 * humans.webp is a Shutterstock preview (147171317), watermark and all: once the licence
 * is bought, drop the clean file in its place and re-run.
 *
 * Sources live in scripts/segment-photos/. Run from web/, then re-measure:
 *   node scripts/segment-photos.mjs && node scripts/measure-media.mjs
 */
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, 'segment-photos');
const MEDIA = join(HERE, '..', 'public', 'media');

/** The segment colours of app/globals.css; --seg-animals is its own amber. */
const PHOTOS = {
  agri: { file: 'agri.jpg', page: 'agri-horticulture', tint: '#40ab5c' },
  humans: { file: 'humans.webp', page: 'humans', tint: '#e02020' },
  animals: { file: 'animals.jpg', page: 'animals', tint: '#c79000' },
};

/** The kept hexagon: its alpha channel is the mask, its size the size of all four. */
const HEXAGON = join(MEDIA, 'scenes', 'segment-general.webp');
/** How much of the segment colour is laid over the photo inside the hexagon. */
const WASH = 0.22;

const PLATE = { width: 740, height: 500 };
const BANNER_WIDTH = 1400;
const BANNER = { width: BANNER_WIDTH, height: Math.round((BANNER_WIDTH * 840) / 2000) };

const WEBP = { quality: 86, effort: 6 };

const hexMeta = await sharp(HEXAGON).metadata();
const mask = await sharp(HEXAGON).extractChannel('alpha').toBuffer();

/*
 * The hexagon and the plate crop on what sharp finds most salient. The banner is a thin
 * slice of the photo, and there saliency lands on the hen's eye and drops her head
 * above it, so the banner takes the centre.
 */
const cut = (file, { width, height }, position = 'attention') =>
  sharp(join(SRC, file))
    .resize(width, height, { fit: 'cover', position, kernel: 'lanczos3' })
    /* Only the upscaled cuts need it; on the others it is below what the eye sees. */
    .sharpen({ sigma: 0.6 });

for (const [segment, { file, page, tint }] of Object.entries(PHOTOS)) {
  const { width, height } = hexMeta;
  const photo = await cut(file, { width, height }).removeAlpha().toBuffer();
  const wash = await sharp({
    create: { width, height, channels: 4, background: { ...hex(tint), alpha: WASH } },
  })
    .png()
    .toBuffer();

  /* sharp composites last in a pipeline, so the wash is flattened before the mask goes on. */
  const washed = await sharp(photo).composite([{ input: wash }]).removeAlpha().toBuffer();

  await sharp(washed)
    .joinChannel(mask)
    .webp({ ...WEBP, alphaQuality: 100 })
    .toFile(join(MEDIA, 'scenes', `segment-${segment}.webp`));

  await cut(file, PLATE).webp(WEBP).toFile(join(MEDIA, 'pages', `${page}.webp`));
  await cut(file, BANNER, 'centre').webp(WEBP).toFile(join(MEDIA, 'heroes', `seg-${segment}.webp`));

  console.log(`${segment}: hexagon ${width}x${height}, plate ${PLATE.width}x${PLATE.height}, banner ${BANNER.width}x${BANNER.height}`);
}

function hex(color) {
  const n = parseInt(color.slice(1), 16);
  return { r: n >> 16, g: (n >> 8) & 255, b: n & 255 };
}

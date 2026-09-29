/**
 * Puts the photographs the client chose on each segment — briefing of 2026-09-28: citrus for
 * Agriculture & Crops, the family for Humans, broilers for Animals. Disinfection keeps
 * the pictures it has.
 *
 * A segment's picture appears in two places, and each gets its own cut of the same
 * photograph:
 *
 *  - pages/*.webp — the Applications page, where the photo sits on a plate.
 *  - heroes/seg-*.webp — the banner of the segment page.
 *
 * The home page hexagons (scenes/segment-*.webp) keep the archive's pictures: the client
 * asked on 2026-09-29 to have them back, so this script leaves them alone.
 *
 * The files the client sent are 360 to 612 px wide. That covers the plate at its size
 * on the page; the banner is written at BANNER_WIDTH rather than the 2000 px of the other heroes, since upscaling further adds bytes and no detail —
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

const PHOTOS = {
  agri: { file: 'agri.jpg', page: 'agri-horticulture' },
  /* The banner has its own photograph since 2026-09-29, already cut to the band's shape;
     the plate keeps humans.webp. */
  humans: { file: 'humans.webp', page: 'humans', banner: 'humans-banner.jpg' },
  animals: { file: 'animals.jpg', page: 'animals' },
};

const PLATE = { width: 740, height: 500 };
const BANNER_WIDTH = 1400;
const BANNER = { width: BANNER_WIDTH, height: Math.round((BANNER_WIDTH * 840) / 2000) };

const WEBP = { quality: 86, effort: 6 };

/*
 * The plate crops on what sharp finds most salient. The banner is a thin slice of the photo, and there saliency lands on the hen's eye and drops her head
 * above it, so the banner takes the centre.
 */
const cut = (file, { width, height }, position = 'attention') =>
  sharp(join(SRC, file))
    .resize(width, height, { fit: 'cover', position, kernel: 'lanczos3' })
    /* Only the upscaled cuts need it; on the others it is below what the eye sees. */
    .sharpen({ sigma: 0.6 });

for (const [segment, { file, page, banner = file }] of Object.entries(PHOTOS)) {
  await cut(file, PLATE).webp(WEBP).toFile(join(MEDIA, 'pages', `${page}.webp`));
  await cut(banner, BANNER, 'centre').webp(WEBP).toFile(join(MEDIA, 'heroes', `seg-${segment}.webp`));

  console.log(`${segment}: plate ${PLATE.width}x${PLATE.height}, banner ${BANNER.width}x${BANNER.height}`);
}

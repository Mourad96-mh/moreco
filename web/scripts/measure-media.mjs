/**
 * Writes data/image-sizes.json — the intrinsic pixel size of every editorial image.
 *
 * Layout components need this: the archive's pictures range from 300px hexagon cut-outs
 * to 5:1 result charts, so a fixed aspect-ratio frame either crops them or blows them up.
 * With the real dimensions a row can take the image's own shape and refuse to upscale.
 *
 * Run after import-media.mjs / extract-research.mjs, or any time public/media changes.
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(HERE, '..', 'public', 'media');

/** Only the folders whose images are laid out by aspect-ratio-sensitive components. */
const FOLDERS = ['scenes', 'research', 'pages'];

const sizes = {};

for (const folder of FOLDERS) {
  const dir = join(PUBLIC, folder);
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    console.warn(`skipped ${folder} (not found)`);
    continue;
  }

  for (const name of entries) {
    const file = join(dir, name);
    if (!statSync(file).isFile()) continue;
    const { width, height } = await sharp(file).metadata();
    if (!width || !height) continue;
    sizes[posix.join('/media', folder, name)] = [width, height];
  }
}

/*
 * Brand marks additionally get a tone: some of the archive's logos are white artwork on a
 * transparent background (Mavita), which is invisible on a light tile. Measuring the mean
 * luminance of the opaque pixels tells the card when to put the mark on a dark chip.
 */
const marks = {};
for (const name of readdirSync(join(PUBLIC, 'brand'))) {
  const file = join(PUBLIC, 'brand', name);
  if (!statSync(file).isFile()) continue;

  const image = sharp(file);
  const { width, height, hasAlpha } = await image.metadata();
  const { data } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  let sum = 0;
  let opaque = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] <= 25) continue;
    sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    opaque += 1;
  }
  const luminance = opaque ? sum / opaque : 0;

  marks[posix.join('/media/brand', name)] = {
    width,
    height,
    /* Artwork that is itself near-white only reads against a dark chip. */
    onDark: Boolean(hasAlpha) && luminance > 200,
  };
}

writeFileSync(join(HERE, '..', 'data', 'brand-marks.json'), `${JSON.stringify(marks, null, 2)}\n`);
console.log(
  `${Object.keys(marks).length} brand marks -> data/brand-marks.json ` +
    `(${Object.values(marks).filter((m) => m.onDark).length} need a dark chip)`,
);

const target = join(HERE, '..', 'data', 'image-sizes.json');
writeFileSync(target, `${JSON.stringify(sizes, null, 2)}\n`);

const ratios = Object.values(sizes).map(([w, h]) => w / h).sort((a, b) => a - b);
console.log(
  `${Object.keys(sizes).length} images -> data/image-sizes.json ` +
    `(ratios ${ratios[0].toFixed(2)} … ${ratios.at(-1).toFixed(2)})`,
);

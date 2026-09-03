/**
 * Copies the media the new site needs out of the archive mirror (../site) into
 * public/media, renamed by SKU slug so the app never has to know the old WordPress
 * upload paths.
 *
 *   public/media/products/<slug>.<ext>     pack shots
 *   public/media/datasheets/<slug>.pdf     product flyers / safety data sheets
 *   public/media/brand/                    the Moreco logo and range marks
 *
 * Idempotent: re-running overwrites. The archive is only ever read.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, statSync, unlinkSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const MIRROR = join(HERE, '..', '..', 'site');
const PUBLIC = join(HERE, '..', 'public', 'media');

const assets = JSON.parse(readFileSync(join(HERE, '..', 'data', 'product-assets.json'), 'utf8'));

/** Logos and range marks the pages need beyond the pack shots. */
const BRAND = {
  'moreco-logo.png': 'wp-content/uploads/2015/01/color_moreco_logo-ontwerp-druk_CMYK_300dpi11.png',
  'orthagrow.png': 'wp-content/uploads/2014/01/logo_orthagrow2.jpg',
  'orthafight.png': 'wp-content/uploads/2014/01/logo_orthafight2.jpg',
  'orthahealth.png': 'wp-content/uploads/2014/04/logo-orthahealth.jpg',
  'mavita.png': 'wp-content/uploads/2014/03/Mavita_beeldmerk.png',
  'huwa-san.png': 'wp-content/uploads/2014/03/huwa-san-logo.png',
  'clearox.png': 'wp-content/uploads/2014/03/clearox-by-huwa-san-logo.png',
  'bioxeco.png': 'wp-content/uploads/2014/03/bioxecologo.png',
};

/** Section imagery reused across the segment and R&D pages. */
const SCENES = {
  'segment-agri.png': 'wp-content/uploads/2015/02/agri-horticulture-biological-full-absorble-form-Orthosilicic-acid.png',
  'segment-animals.png': 'wp-content/uploads/2015/02/enhance-health-quality-life-animals-osa-silicon.png',
  'segment-humans.png': 'wp-content/uploads/2015/02/human-biologically-active-Silicon-osa-maca.png',
  'segment-general.png': 'wp-content/uploads/2015/02/general-purpose-Ecological-disinfection-hydrogen-peroxide.png',
  'orthagrow-helps-plants.jpg': 'wp-content/uploads/2014/03/orthagrow-helps-plants.jpg',
  'mavita-how-it-works.jpg': 'wp-content/uploads/2014/03/mavita-how-it-works_scheme.jpg',
  'huwa-san-professional.jpg': 'wp-content/uploads/2015/02/professional-disinfection_huwa-san-products1.jpg',
};

let copied = 0;
const missing = [];
let bytes = 0;

function take(from, toDir, toName) {
  const src = join(MIRROR, from);
  if (!existsSync(src)) {
    missing.push(from);
    return null;
  }
  mkdirSync(toDir, { recursive: true });
  const dest = join(toDir, toName);
  copyFileSync(src, dest);
  bytes += statSync(dest).size;
  copied++;
  return toName;
}

/**
 * Pack shots are 2014-era PNGs of ~130 KB each; a range page shows seven of them.
 * WebP at 1000px wide keeps them sharp on a 2× display for a tenth of the weight.
 * Transparency is preserved, so the shots still sit on any background.
 */
async function takeImage(from, toDir, slug) {
  const src = join(MIRROR, from);
  if (!existsSync(src)) {
    missing.push(from);
    return null;
  }
  mkdirSync(toDir, { recursive: true });
  const name = `${slug}.webp`;
  const dest = join(toDir, name);
  const meta = await sharp(src).metadata();
  await sharp(src)
    .resize({ width: Math.min(meta.width ?? 1000, 1000), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest);
  bytes += statSync(dest).size;
  copied++;
  return name;
}

const manifest = {};

for (const [slug, a] of Object.entries(assets)) {
  manifest[slug] = {};
  if (a.image) {
    const name = await takeImage(a.image, join(PUBLIC, 'products'), slug);
    if (name) manifest[slug].image = `/media/products/${name}`;
  }
  if (a.datasheet) {
    const name = take(a.datasheet, join(PUBLIC, 'datasheets'), `${slug}.pdf`);
    if (name) {
      manifest[slug].datasheet = `/media/datasheets/${name}`;
      manifest[slug].datasheetKind = a.datasheetKind ?? 'flyer';
    }
  }
}

for (const [name, from] of Object.entries(BRAND)) {
  await takeImage(from, join(PUBLIC, 'brand'), name.replace(/\.\w+$/, ''));
}
for (const [name, from] of Object.entries(SCENES)) {
  await takeImage(from, join(PUBLIC, 'scenes'), name.replace(/\.\w+$/, ''));
}

writeFileSync(join(HERE, '..', 'data', 'media-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

console.log(`${copied} files copied into public/media (${(bytes / 1024 / 1024).toFixed(1)} MB)`);
console.log(`  data/media-manifest.json: ${Object.keys(manifest).length} SKUs`);
if (missing.length) {
  console.log(`  NOT FOUND IN THE ARCHIVE (${missing.length}):`);
  for (const m of missing) console.log('    ' + m);
}

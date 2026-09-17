/**
 * Rebuilds public/media/heroes — the photograph behind every interior page's banner.
 *
 * The pictures come from the Unsplash archive on Wikimedia Commons: modern commercial
 * photography released CC0, at full resolution. (Openverse's own CC0 pool is mostly
 * documentary or vintage; StockSnap caps downloads at 960 px and Rawpixel at 1024 px,
 * both too small for a full-bleed band. Unsplash, Pexels and Pixabay block scripted
 * access altogether.)
 *
 * Each file is fetched at 2400 px, cropped to 2000x840 — the band's shape, with room for
 * `object-fit: cover` to work on any viewport — and written as WebP. CREDITS.json keeps
 * the author and licence of each one.
 *
 *   node scripts/import-heroes.mjs [slot,slot,...]
 *
 * Idempotent: re-running overwrites. To change a picture, put another Commons file name
 * in the table below and re-run that one slot.
 */
import { writeFileSync, mkdirSync, existsSync, statSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, '..', 'public', 'media', 'heroes');
const CACHE = join(HERE, '..', '.hero-cache');
const UA = 'moreco-site-build/1.0 (contact: info@moreco.ma)';
const WIDTH = 2000;
const HEIGHT = 840;

/** Hero slot -> the file on Wikimedia Commons. All CC0. */
const FILES = {
  'products': 'Green_plantation_(Unsplash).jpg',
  /* Avocados, cereals dropped — client briefing of 2026-09-13. */
  'seg-agri': 'Unripe_Avocados_(Unsplash).jpg',
  'seg-humans': 'Mother_Nature,_Summer_(Unsplash).jpg',
  /* Healthy laying flock, replacing the cows in a field the client asked us to drop. */
  'seg-animals': 'Arkansas_chickens_(Unsplash).jpg',
  'seg-general': 'Water_droplets_(Unsplash).jpg',
  'orthagrow': 'Wheat_field_sunset_(Unsplash).jpg',
  'orthafight': 'Dewdrops_on_leaves_(Unsplash).jpg',
  'mavita': 'Brunette_woman_portrait_(Unsplash).jpg',
  'orthahealth': 'White_horse_in_Iceland_(Unsplash).jpg',
  'huwa-san-pro': 'Heavy_industry_(Unsplash).jpg',
  'huwa-san-home': 'Blue_white_kitchen_interior_(Unsplash).jpg',
  'huwa-san-pool': 'Swimming_laps_(Unsplash_rAyIvNqlwCY).jpg',
  'bioxeco': 'Dentist_(Unsplash).jpg',
  'clearox': 'A_cord_of_water_droplets_(Unsplash).jpg',
  'rdi': 'Plants_in_beakers_(Unsplash).jpg',
  'resources': 'Books,_pencils,_laptop,_and_iphone_on_a_desk_(Unsplash).jpg',
  'knowledge': 'White_library_tall_windows_(Unsplash).jpg',
  'news': 'Newsstand_(Unsplash).jpg',
  'media': 'Elegant_steel_microphone_(Unsplash).jpg',
  'about': 'Office_buildings_under_clouds_(Unsplash).jpg',
  'services': "Farmer's_Hat_in_a_Cornfield_(Unsplash).jpg",
  'contact': 'Clean_minimalist_office_(Unsplash).jpg',
  'careers': 'Casual_Meeting_Room_(Unsplash).jpg',
  'quote': 'Sign_here_(Unsplash).jpg',
};

/**
 * Trial banners: one photograph of the crop each field campaign was run on, written to
 * heroes/trials/. Olives, onions and melons are absent on purpose — no usable CC0
 * photograph was found, and data/hero-images.ts falls those pages back to the archive's
 * own plate.
 */
const TRIAL_FILES = {
  'pommiers': 'Freshly_Picked_Apples_(Unsplash).jpg',
  'fraises': 'Fresh_strawberries_(Unsplash).jpg',
  'tomates': 'Tomatoes_on_the_Vine_(Unsplash).jpg',
  'agrumes': 'Orange_Tree_(Unsplash).jpg',
  'pechers': 'Peach_blossom_in_Lhasa_(Unsplash).jpg',
  'pommes-de-terre': 'Farming_Potatoes_(Unsplash).jpg',
  'carottes': 'Organic_Carrots_(Unsplash).jpg',
  'ble': 'Wheat_Crop_(Unsplash).jpg',
  'poivrons': 'Colorful_Bell_Peppers_(Unsplash).jpg',
  'mais-ensilage': 'Corn_Field_Maze_(Unsplash).jpg',
  'cactus': 'Arizona_cacti_(Unsplash).jpg',
  'quinoa': 'Grain_Crop_(Unsplash).jpg',
  'raisins': 'Future_wine_on_vine_(Unsplash).png',
  'gazon': 'Green_grass_texture_(Unsplash).jpg',
};

mkdirSync(OUT, { recursive: true });
mkdirSync(join(OUT, 'trials'), { recursive: true });
mkdirSync(CACHE, { recursive: true });

const only = process.argv[2] ? new Set(process.argv[2].split(',')) : null;
const credits = existsSync(join(OUT, 'CREDITS.json'))
  ? JSON.parse(readFileSync(join(OUT, 'CREDITS.json'), 'utf8'))
  : {};

/** Commons resolves Special:FilePath itself; hand-built thumbnail URLs 400. */
const filePath = (file, width) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

function meta(file) {
  const url =
    'https://commons.wikimedia.org/w/api.php?format=json&action=query&prop=imageinfo' +
    '&iiprop=url|size|extmetadata&titles=' + encodeURIComponent('File:' + file);
  const data = JSON.parse(
    execFileSync('curl', ['-s', '--max-time', '60', '-A', UA, url], { maxBuffer: 32 * 1024 * 1024 }).toString()
  );
  const page = Object.values(data?.query?.pages ?? {})[0];
  const ii = page?.imageinfo?.[0];
  if (!ii) return null;
  return {
    license: ii.extmetadata?.LicenseShortName?.value ?? '',
    author: (ii.extmetadata?.Artist?.value ?? '').replace(/<[^>]*>/g, '').trim(),
    source: ii.descriptionurl,
    width: ii.width,
    height: ii.height,
  };
}

const JOBS = [
  ...Object.entries(FILES).map(([slot, file]) => ({ slot, file, dir: OUT })),
  ...Object.entries(TRIAL_FILES).map(([slot, file]) => ({ slot, file, dir: join(OUT, 'trials') })),
];

for (const { slot, file, dir } of JOBS) {
  if (only && !only.has(slot)) continue;

  const raw = join(CACHE, `${slot}.img`);
  if (!existsSync(raw) || statSync(raw).size < 50_000) {
    execFileSync('curl', ['-sL', '--max-time', '120', '-A', UA, '-o', raw, filePath(file, 2400)]);
  }

  const dest = join(dir, `${slot}.webp`);
  await sharp(raw).resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' }).webp({ quality: 74 }).toFile(dest);

  const info = meta(file);
  if (info) credits[slot] = { title: file.replace(/\.(jpg|jpeg|png)$/i, ''), ...info };

  console.log(`${slot.padEnd(14)} ${(statSync(dest).size / 1024).toFixed(0).padStart(4)} KB  ${file}`);
}

writeFileSync(join(OUT, 'CREDITS.json'), JSON.stringify(credits, null, 2));

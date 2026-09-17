/**
 * Builds the R&D + I trial set from the old /research/ pages.
 *
 * Every trial page is the same shape: a numbered title ("01-Résultats sur les pommiers"),
 * one "Description de Projet" paragraph, and two or three result plates comparing an
 * untreated control with a treated plot. That is exactly the alternating image/text
 * rhythm the R&D + I section uses, so each plate becomes one FeatureRow.
 *
 * Writes data/research.json and copies the plates into public/media/research/.
 * The archive is only ever read.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const PAGES = join(HERE, '..', '..', 'content', 'fr', 'pages');
const MIRROR = join(HERE, '..', '..', 'site');
const OUT_IMG = join(HERE, '..', 'public', 'media', 'research');

/** Stable, language-neutral slug per crop — the plates are the same in every language. */
const SLUGS = {
  'pommiers': 'pommiers',
  'fraises': 'fraises',
  'tomates': 'tomates',
  'agrumes': 'agrumes',
  'pêcher': 'pechers',
  'pommes de terre': 'pommes-de-terre',
  'melons': 'melons',
  'carottes': 'carottes',
  'blé': 'ble',
  'poivrons': 'poivrons',
  'olives': 'olives',
  "maïs d'ensilage": 'mais-ensilage',
  'cactus': 'cactus',
  'quinoa': 'quinoa',
  'grapes': 'raisins',
  'oignons': 'oignons',
  'gazon': 'gazon',
};

const read = (f) => readFileSync(join(PAGES, f), 'utf8').split(String.fromCharCode(13)).join('');

/**
 * Two trial pages run their plates straight on from the last sentence with no line
 * break ("...à Larache et Moulay Bousselham![Moreco Resultats...](...png)"), so the
 * image markdown has to be stripped from the text rather than split away from it.
 */
const clean = (s) =>
  s
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const files = readdirSync(PAGES).filter((f) => f.startsWith('research-') && f.endsWith('.md'));
const seen = new Set();
const trials = [];

for (const file of files) {
  const md = read(file);
  const rawTitle = md.match(/^title:\s*"(.+?)"$/m)?.[1] ?? '';
  const url = md.match(/^url:\s*"(.+?)"$/m)?.[1] ?? '';
  const body = md.replace(/^---\n[\s\S]*?\n---\n/, '');

  // "01-Résultats sur les pommiers - Moreco" -> order 1, label "Résultats sur les pommiers"
  const m = rawTitle.match(/^(\d+)\s*-\s*(.+?)\s*-\s*Moreco$/);
  const order = m ? Number(m[1]) : 999;
  const title = clean(m ? m[2] : rawTitle.replace(/\s*-\s*Moreco$/, ''));

  const cropKey = Object.keys(SLUGS).find((k) => title.toLowerCase().includes(k.toLowerCase()));
  const slug = SLUGS[cropKey] ?? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (seen.has(slug)) continue; // the archive holds a duplicate carrot page
  seen.add(slug);

  const description = clean(
    body.match(/###\s+Description de Projet\s*\n+([\s\S]*?)(?=\n!\[|\n###|\n\[|$)/)?.[1] ?? ''
  );

  const plates = [...body.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)]
    .map((x) => x[1].replace(/^.*?\/wp-content\/uploads\//, 'wp-content/uploads/'))
    .filter((p, i, all) => all.indexOf(p) === i);

  trials.push({ slug, order, title, description, url, plates });
}

trials.sort((a, b) => a.order - b.order);

// Copy the plates, renamed <slug>-1.webp, <slug>-2.webp ...
mkdirSync(OUT_IMG, { recursive: true });
let bytes = 0;
const missing = [];

for (const t of trials) {
  const images = [];
  for (const [i, rel] of t.plates.entries()) {
    const src = join(MIRROR, rel);
    if (!existsSync(src)) {
      missing.push(rel);
      continue;
    }
    const name = `${t.slug}-${i + 1}.webp`;
    const meta = await sharp(src).metadata();
    await sharp(src)
      .resize({ width: Math.min(meta.width ?? 1400, 1400), withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(join(OUT_IMG, name));
    bytes += statSync(join(OUT_IMG, name)).size;
    images.push(`/media/research/${name}`);
  }
  t.images = images;
  delete t.plates;
}

/*
 * Titles and descriptions are per-locale objects: the archive only holds the French, so a
 * re-extraction refreshes `fr` and keeps the en/es/de translations that were written by hand.
 */
const TARGET = join(HERE, '..', 'data', 'research.json');
const previous = existsSync(TARGET)
  ? Object.fromEntries(JSON.parse(readFileSync(TARGET, 'utf8')).map((t) => [t.slug, t]))
  : {};

for (const t of trials) {
  const before = previous[t.slug];
  t.title = { ...(before?.title ?? {}), fr: t.title };
  t.description = { ...(before?.description ?? {}), fr: t.description };
}

writeFileSync(TARGET, JSON.stringify(trials, null, 2), 'utf8');

const translated = trials.filter((t) => t.title.en && t.title.es && t.title.de).length;
console.log(`${trials.length} trials -> data/research.json (${translated} with en/es/de kept)`);
console.log(`  ${trials.reduce((n, t) => n + t.images.length, 0)} plates (${(bytes / 1024 / 1024).toFixed(1)} MB)`);
const thin = trials.filter((t) => !t.description || !t.images.length);
if (thin.length) console.log('  THIN:', thin.map((t) => t.slug).join(', '));
if (missing.length) console.log(`  NOT IN ARCHIVE: ${missing.length}`);

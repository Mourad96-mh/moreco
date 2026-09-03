/**
 * Pulls the editorial pages (about, careers, media, knowledge articles, news) out of the
 * archive into data/pages.json, so the rebuilt site carries the client's real words
 * rather than filler.
 *
 * Each entry keeps its FR and EN body as a list of blocks — headings, paragraphs, lists
 * and images — which the views render directly. The archive is only ever read.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(HERE, '..', '..', 'content');
const MIRROR = join(HERE, '..', '..', 'site');
const OUT_IMG = join(HERE, '..', 'public', 'media', 'pages');

/** view key -> the FR and EN markdown files that make it up. */
const PAGES = {
  about: { fr: ['limportance-du-silicium', 'applications-produits'], en: ['the-importance-of-silicon', 'applications'] },
  careers: { fr: ['opportunites-de-carriere-a-moreco'], en: ['career-opportunities-moreco'] },
  media: { fr: ['les-dossiers-pour-les-medias-et-les-evenements-venir'], en: ['media'] },
  services: { fr: ['applications-produits'], en: ['applications'] },
  news: { fr: ['news'], en: ['news'] },
};

/** The knowledge centre: the scientific write-ups the old site published. */
const ARTICLES = [
  ['importance-du-silicium', 'limportance-du-silicium', 'the-importance-of-silicon'],
  ['acide-silicique', 'le-potentiel-therapeutique-de-lacide-silicique', 'hydroxyaluminosilicates-and-the-therapeutic-potential-of-silicic-acid'],
  ['bio-disponibilite-aos', 'etude-de-la-bio-disponibilite-de-laos', 'osa-bioavailability-cross-over-study'],
  ['nutrition-foliaire', 'nutrition-foliare-faits-mythes-et-perspectives', 'foliar-nutrition-of-crops-facts-myths-and-perspectives'],
  ['cycle-du-silicium', 'limpact-de-lagriculture-sur-le-cycle-biogeochimique-de-si', 'impact-of-agriculture-on-the-si-biogeochemical-cycle'],
  ['nutrition-et-cheveux', 'la-nutrition-et-les-cheveux-deficiences-et-supplements', 'nutrition-and-hair-deficiencies-and-supplements'],
  ['mavita-immunite', 'mavita-health-renforce-le-systeme-dimmunite', 'mavita-health-supports-immune-system'],
];

const clean = (s) =>
  s
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\\\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();

function read(lang, slug) {
  const file = join(CONTENT, lang, 'pages', `${slug}.md`);
  if (!existsSync(file)) return null;
  return readFileSync(file, 'utf8').split(String.fromCharCode(13)).join('');
}

const meta = (md, key) => md.match(new RegExp(`^${key}:\\s*"(.+?)"$`, 'm'))?.[1] ?? null;

const imagesUsed = new Set();

/** Markdown -> a flat block list the views can render without a markdown runtime. */
function blocksOf(md) {
  if (!md) return [];
  const body = md.replace(/^---\n[\s\S]*?\n---\n/, '');
  const out = [];
  let list = null;

  const flush = () => {
    if (list && list.items.length) out.push(list);
    list = null;
  };

  for (const raw of body.split('\n')) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }

    // Skip the WordPress byline and the leftover favourite/counter widgets.
    if (/^écrit par|^written by|^\d+$/i.test(line)) continue;
    if (/^(favoris|favorites?)$/i.test(line)) continue;

    const image = line.match(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/);
    if (image) {
      flush();
      const rel = image[1].replace(/^.*?\/wp-content\/uploads\//, 'wp-content/uploads/');
      if (rel.startsWith('wp-content/')) {
        imagesUsed.add(rel);
        out.push({ type: 'image', src: rel });
      }
      continue;
    }

    const pdf = line.match(/\[([^\]]+)\]\((https?:\/\/[^)\s]+\.pdf)\)/i);
    if (pdf) {
      flush();
      out.push({ type: 'pdf', label: clean(pdf[1]), href: pdf[2] });
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flush();
      out.push({ type: 'heading', level: Math.min(3, heading[1].length + 1), text: clean(heading[2]) });
      continue;
    }

    const bullet = line.match(/^(?:\\\*|\*|-|•)\s+(.+)$/);
    if (bullet) {
      if (!list) list = { type: 'list', items: [] };
      const text = clean(bullet[1]);
      if (text) list.items.push(text);
      continue;
    }

    flush();
    const text = clean(line);
    if (text.length > 2) out.push({ type: 'paragraph', text });
  }

  flush();
  return out;
}

const pages = {};

for (const [key, sources] of Object.entries(PAGES)) {
  pages[key] = {};
  for (const lang of ['fr', 'en']) {
    const blocks = sources[lang].flatMap((slug) => blocksOf(read(lang, slug)));
    if (blocks.length) pages[key][lang] = blocks;
  }
}

const articles = [];
for (const [slug, frSlug, enSlug] of ARTICLES) {
  const fr = read('fr', frSlug);
  const en = read('en', enSlug);
  if (!fr && !en) continue;

  articles.push({
    slug,
    title: { fr: meta(fr ?? '', 'title')?.replace(/\s*-\s*Moreco$/, '') ?? slug, en: meta(en ?? '', 'title')?.replace(/\s*-\s*Moreco$/, '') ?? slug },
    excerpt: {
      fr: blocksOf(fr).find((b) => b.type === 'paragraph')?.text ?? '',
      en: blocksOf(en).find((b) => b.type === 'paragraph')?.text ?? '',
    },
    blocks: { fr: blocksOf(fr), en: blocksOf(en) },
  });
}

// Copy every image the blocks reference and rewrite the paths to /media/pages/.
mkdirSync(OUT_IMG, { recursive: true });
const renamed = new Map();
let bytes = 0;
let n = 0;

for (const rel of imagesUsed) {
  const src = join(MIRROR, rel);
  if (!existsSync(src)) continue;
  const name = rel.split('/').pop().replace(/\.\w+$/, '').replace(/[^a-zA-Z0-9-]+/g, '-').toLowerCase() + '.webp';
  const meta2 = await sharp(src).metadata();
  await sharp(src)
    .resize({ width: Math.min(meta2.width ?? 1200, 1200), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(OUT_IMG, name));
  bytes += statSync(join(OUT_IMG, name)).size;
  renamed.set(rel, `/media/pages/${name}`);
  n++;
}

const rewrite = (value) => {
  if (Array.isArray(value)) return value.map(rewrite);
  if (value && typeof value === 'object') {
    if (value.type === 'image') {
      const to = renamed.get(value.src);
      return to ? { type: 'image', src: to } : null;
    }
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, rewrite(v)]));
  }
  return value;
};

const clip = (value) =>
  Array.isArray(value) ? value.filter(Boolean).map(clip) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k, v]) => [k, clip(v)])) : value;

writeFileSync(join(HERE, '..', 'data', 'pages.json'), JSON.stringify(clip(rewrite(pages)), null, 2), 'utf8');
writeFileSync(join(HERE, '..', 'data', 'articles.json'), JSON.stringify(clip(rewrite(articles)), null, 2), 'utf8');

console.log(`pages: ${Object.keys(pages).join(', ')}`);
for (const [key, langs] of Object.entries(pages)) {
  console.log(`  ${key}: fr ${langs.fr?.length ?? 0} blocks, en ${langs.en?.length ?? 0} blocks`);
}
console.log(`articles: ${articles.length}`);
console.log(`images: ${n} (${(bytes / 1024).toFixed(0)} KB)`);

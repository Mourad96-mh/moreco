/**
 * Reads the FR + EN markdown captured from the old moreco.ma
 * (../content/<lang>/pages/*.md) and pulls out the marketing copy of every SKU:
 * claim, description paragraphs, advantages, pack sizes.
 *
 * Writes:
 *   data/product-copy.json          the copy, per SKU per locale — consumed by the app
 *   scripts/out/products.raw.json   full dump incl. image/PDF candidates, for reference
 *
 * Structured fields (pack shot, datasheet, segment) live in data/products.ts, curated by
 * hand — several range pages interleave charts with pack shots, so "first image in the
 * block" gets it wrong often enough not to be trusted.
 *
 * The archive under ../content and ../site is never modified.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ARCHIVE = join(HERE, '..', '..', 'content');

/** Range pages to mine, and which `###` headings inside them are real SKUs. */
const RANGES = [
  {
    segment: 'agri', range: 'orthagrow',
    fr: 'agri-horticulture-fr-gamme-de-produits-orthagrow',
    en: 'agri-horticulture-orthagrow-productline',
    skus: [
      ['orthagrow-control', 'ORTHAGROW Control'],
      ['orthagrow-bloom-booster', 'ORTHAGROW BLOOM BOOSTER'],
      ['orthagrow-soil-conditioner', 'ORTHAGROW SOIL CONDITIONER 4TH'],
      ['orthagrow-micro-manager', 'ORTHAGROW MICRO MANAGER'],
      ['orthagrow-fertifight', 'ORTHAGROW FERTIFIGHT', 'ORGTHAGROW FERTIFIGHT'],
      ['orthagrow-granule', 'ORTHAGROW GRANULÉ'],
      ['orthagrow-poudre', 'ORTHAGROW POUDRE'],
    ],
  },
  {
    segment: 'agri', range: 'orthafight',
    fr: 'agri-horticulture-fr-gamme-de-produits-orthafight',
    en: 'agri-horticulture-orthafight-productline',
    skus: [['fertifight', 'FertiFight']],
  },
  {
    segment: 'general', range: 'huwa-san-pro',
    fr: 'emploi-general-gamme-de-produits-huwa-san-desinfection-professionnel',
    en: 'general-use-huwa-san-productline-professional-disinfection-2',
    skus: [
      ['huwa-san-agro', 'Huwa-San AGRO'],
      ['huwa-san-vet', 'Huwa-San VET'],
      ['huwa-san-fb', 'Huwa-San F&B'],
      ['huwa-san-hard-surface', 'Huwa-San HARD SURFACE'],
      ['huwa-san-water-treatment', 'Huwa-San WATER TREATMENT', 'Huwa-San WATER TEATMENT'],
    ],
  },
  {
    segment: 'general', range: 'huwa-san-home',
    fr: 'emploi-general-gamme-de-produits-huwa-san-hygiene-home',
    en: 'general-use-huwa-san-productline-hygiene-home',
    skus: [
      ['huwa-san-hands', 'Huwa-San Hands'],
      ['huwa-san-toilet', 'Huwa-San Toilet'],
      ['huwa-san-bathroom', 'Huwa-San Bathroom'],
      ['huwa-san-fruit-vegetables', 'Huwa-San Fruit & Vegetables'],
      ['huwa-san-kitchen', 'Huwa-San Kitchen'],
    ],
  },
  {
    segment: 'general', range: 'huwa-san-pool',
    fr: 'emploi-general-gamme-de-produits-huwa-san-pool',
    en: 'general-use-huwa-san-productline-pool',
    skus: [
      ['huwa-san-kiddiepool', 'Huwa-San KiddiePOOL'],
      ['huwa-san-minipool', 'Huwa-San MiniPOOL'],
      ['huwa-san-pool', 'Huwa-San POOL'],
      ['huwa-san-whirlpool', 'Huwa-San WhirlPOOL'],
      ['huwa-san-wellness', 'Huwa-San Wellness'],
    ],
  },
  {
    segment: 'general', range: 'bioxeco',
    fr: 'emploi-general-bioxeco',
    en: 'general-use-bioxeco',
    skus: [
      ['bioxeco-hand', 'BioXeco Hand'],
      ['bioxeco-25s', 'BioXeco 25S'],
      ['bioxeco-dw', 'BioXeco DW'],
      ['bioxeco-fog', 'BioXeco FOG'],
    ],
  },
];

/** SKUs that own a whole page rather than a `###` block inside a range page. */
const PAGE_SKUS = [
  ['orthafight', 'agri', 'orthafight', 'agri-horticulture-fr-gamme-de-produits-orthafight', 'agri-horticulture-orthafight-productline'],
  ['orthahealth', 'animals', 'orthahealth', 'des-animaux-orthahealth-fr', 'animals-orthahealth'],
  ['clearox', 'general', 'clearox', 'emploi-general-produit-clearox', 'general-use-clearox'],
  ['mavita-health', 'humans', 'mavita', 'les-humains-ligne-de-produit-mavita-mavita-health-fr', 'humans-mavita-productline-mavita-health'],
  ['mavita-beauty', 'humans', 'mavita', 'les-humains-ligne-de-produit-mavita-mavita-beauty-fr', 'humans-mavita-productline-mavita-beauty'],
  ['mavita-luxe', 'humans', 'mavita', 'les-humains-ligne-de-produit-mavita-mavita-luxe-fr', 'humans-mavita-productline-mavita-luxe'],
  ['mavita-slim', 'humans', 'mavita', 'les-humains-ligne-de-produit-mavita-mavita-slim-avec-maca', 'humans-mavita-productline-mavita-slim-maca'],
  ['mavita-sport', 'humans', 'mavita', 'les-humains-ligne-de-produit-mavita-mavita-sport-fr', 'humans-mavita-productline-mavita-sport'],
  ['mavita-stress-plex', 'humans', 'mavita', 'les-humains-ligne-de-produit-mavita-mavita-stress-plex-fr', 'humans-mavita-productline-mavita-stress-plex'],
];

/** Headings that describe the SKU above them rather than starting a new one. */
const SATELLITE = /^(advantages?|avantages?|compatibilit|impact|direction for use|conseils? d|usage tips|disponible en|available (in|as)|savoir plus|learn more|en savoir plus)/i;
const SIZES = /^(?:disponible en|available (?:in|as))\s*(.+)$/i;
/** A list item: `* x`, `\* x` (the archive escapes some), `- x`, `. x`. */
const BULLET_SRC = '^\\s*(?:\\\\\\*|\\*|-|•)\\s+(?!\\*)(.+)$';

const norm = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();
const clean = (s) =>
  s
    // Some pages run an image straight on from the last sentence with no line break,
    // so image and link markdown has to be stripped from the text, not split off it.
    .replace(/!?\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\*\*/g, '')
    .replace(/\\\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
const isBullet = (s) => new RegExp(BULLET_SRC).test(s);
/** A bullet that is nothing but a link — the BioXeco page bullets a video player's controls. */
const isLinkOnly = (s) => /^!?\[[^\]]*\]\([^)]*\)$/.test(s.trim());

function read(lang, slug) {
  try {
    // The archive is CRLF; every regex below assumes LF line endings.
    const raw = readFileSync(join(ARCHIVE, lang, 'pages', `${slug}.md`), 'utf8');
    return raw.split(String.fromCharCode(13)).join('');
  } catch {
    return null;
  }
}

/** Split a markdown page into `{ heading, body }` blocks on `### `. */
function blocks(md) {
  const body = md.replace(/^---\n[\s\S]*?\n---\n/, '');
  const re = /^###\s+(.+)$/gm;
  const first = re.exec(body);
  const intro = body.slice(0, first ? first.index : body.length);
  re.lastIndex = 0;

  const out = [];
  let m, prev = null;
  while ((m = re.exec(body))) {
    if (prev) prev.body = body.slice(prev.at, m.index).trim();
    prev = { heading: m[1].trim(), at: re.lastIndex };
    out.push(prev);
  }
  if (prev) prev.body = body.slice(prev.at).trim();
  return { intro: intro.trim(), sections: out };
}

const images = (t) => [...t.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)].map((m) => m[1]);
const pdfs = (t) => [...t.matchAll(/\]\((https?:\/\/[^)\s]+\.pdf)\)/gi)].map((m) => m[1]);
const bullets = (t) =>
  [...t.matchAll(new RegExp(BULLET_SRC, 'gm'))]
    .filter((m) => !isLinkOnly(m[1]))
    .map((m) => clean(m[1]))
    .filter(Boolean);

/**
 * Prose paragraphs: images dropped, links flattened to their text, bold kept as text —
 * several SKUs open with a `**NAME** est une formulation...` paragraph, so a naive
 * "skip anything starting with *" filter loses the whole description.
 */
const paras = (t) =>
  t
    .split(/\n{2,}/)
    .flatMap((p) => p.split(/\n(?=\s*(?:\\\*|\*|-|•)\s)/))
    .map((p) => clean(p.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')))
    .filter((p) => p && !isBullet(p) && p.length > 40 && !/^(télécharger|download|plus d)/i.test(p));

/** Collect a SKU's own block plus the satellite blocks that follow it. */
function harvest(md, ...headings) {
  if (!md) return null;
  const { sections } = blocks(md);
  const wanted = headings.filter(Boolean).map(norm);
  const i = sections.findIndex((s) => wanted.includes(norm(s.heading)));
  if (i === -1) return null;

  let text = sections[i].body;
  const sizes = [];
  const advantages = [];

  for (let j = i + 1; j < sections.length && SATELLITE.test(sections[j].heading); j++) {
    const size = sections[j].heading.match(SIZES);
    if (size) sizes.push(clean(size[1]));
    else advantages.push(...bullets(sections[j].body));
    text += '\n\n' + sections[j].body;
  }

  const own = paras(sections[i].body);
  return {
    name: sections[i].heading,
    claim: own[0] ?? null,
    paragraphs: own.slice(1),
    advantages: advantages.length ? advantages : bullets(sections[i].body),
    sizes,
    images: images(text),
    pdfs: pdfs(text),
  };
}

/** A whole page as one SKU: intro + every section that is not navigation. */
function harvestPage(md) {
  if (!md) return null;
  const { intro, sections } = blocks(md);
  const whole = md.replace(/^---\n[\s\S]*?\n---\n/, '');
  const all = [...paras(intro), ...sections.flatMap((s) => paras(s.body))];
  return {
    name: md.match(/^title:\s*"(.+?)"$/m)?.[1] ?? null,
    claim: all[0] ?? null,
    paragraphs: all.slice(1, 8),
    advantages: bullets(whole).slice(0, 10),
    sizes: sections.flatMap((s) => {
      const m = s.heading.match(SIZES);
      return m ? [clean(m[1])] : [];
    }),
    images: images(whole),
    pdfs: pdfs(whole),
    headings: sections.map((s) => s.heading),
  };
}

const products = [];

for (const r of RANGES) {
  const fr = read('fr', r.fr);
  const en = read('en', r.en);
  for (const [slug, frHeading, altHeading] of r.skus) {
    products.push({
      slug, segment: r.segment, range: r.range,
      source: { fr: r.fr, en: r.en },
      fr: harvest(fr, frHeading, altHeading),
      en: harvest(en, altHeading, frHeading),
    });
  }
}

for (const [slug, segment, range, frPage, enPage] of PAGE_SKUS) {
  products.push({
    slug, segment, range, wholePage: true,
    source: { fr: frPage, en: enPage },
    fr: harvestPage(read('fr', frPage)),
    en: harvestPage(read('en', enPage)),
  });
}

mkdirSync(join(HERE, 'out'), { recursive: true });
writeFileSync(join(HERE, 'out', 'products.raw.json'), JSON.stringify(products, null, 2), 'utf8');

/** The app only needs the copy; ES and DE are added by scripts/translate.mjs later. */
const copy = {};
for (const p of products) {
  copy[p.slug] = {};
  for (const lang of ['fr', 'en']) {
    if (!p[lang]) continue;
    copy[p.slug][lang] = {
      claim: p[lang].claim,
      paragraphs: p[lang].paragraphs,
      advantages: p[lang].advantages,
      sizes: p[lang].sizes,
    };
  }
}
mkdirSync(join(HERE, '..', 'data'), { recursive: true });
writeFileSync(join(HERE, '..', 'data', 'product-copy.json'), JSON.stringify(copy, null, 2), 'utf8');

const noClaim = products.filter((p) => !p.fr?.claim).map((p) => p.slug);
console.log(`${products.length} SKUs -> data/product-copy.json`);
console.log(`  FR ${products.filter((p) => p.fr).length} - EN ${products.filter((p) => p.en).length}`);
console.log(`  with advantages: ${products.filter((p) => p.fr?.advantages.length).length}`);
if (noClaim.length) console.log('  NO FR CLAIM:', noClaim.join(', '));

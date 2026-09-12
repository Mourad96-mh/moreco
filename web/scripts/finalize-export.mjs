/**
 * Post-build step. Turns `out/` into something a shared host can serve:
 *
 *   out/index.html   language landing page for the bare domain
 *   out/.htaccess    root redirect + the 301 map from the old moreco.ma
 *   out/sitemap.xml  every page, in all five languages, with hreflang alternates
 *   out/robots.txt
 *
 * Run after `next build`. Reads ../content-index.json for the old URL inventory.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const OUT = join(ROOT, 'out');
const SITE = 'https://moreco.ma';
const LOCALES = ['fr', 'en', 'es', 'nl', 'ar'];
const DEFAULT = 'fr';

if (!existsSync(OUT)) {
  console.error('out/ not found — run scripts/build.ps1 first.');
  process.exit(1);
}

/* ------------------------------------------------------------------ routes */

/**
 * The route table is TypeScript, so rather than compile it we re-derive the same
 * localised paths from the built export: every directory holding an index.html is a
 * page, and its first segment is the locale.
 */
import { readdirSync, statSync } from 'node:fs';

function walk(dir, base = '') {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    if (entry.startsWith('_') || entry.startsWith('.')) continue;
    const rel = base ? `${base}/${entry}` : entry;
    if (existsSync(join(full, 'index.html'))) found.push(rel);
    found.push(...walk(full, rel));
  }
  return found;
}

const built = walk(OUT).filter((p) => LOCALES.includes(p.split('/')[0]));
const byLocale = new Map(LOCALES.map((l) => [l, []]));
for (const p of built) byLocale.get(p.split('/')[0]).push(p);

/**
 * A page's siblings in the other languages: only the localised words differ, and those
 * come from the same table the routes were built from, so translating segment by segment
 * reproduces the exact sibling URL. Brand slugs (orthagrow, mavita-health) pass through.
 */
const wordTable = JSON.parse(readFileSync(join(ROOT, 'data', 'route-words.json'), 'utf8'));
const vocab = [...Object.values(wordTable.words), ...Object.values(wordTable.segments)];

const translateSegment = (segment, from, to) => {
  const entry = vocab.find((v) => v[from] === segment);
  return entry ? entry[to] : segment;
};

const siblingsOf = (path) => {
  const [from, ...rest] = path.split('/');
  return LOCALES.map((to) => ({
    locale: to,
    url: `${SITE}/${[to, ...rest.map((s) => translateSegment(s, from, to))].join('/')}/`,
  }));
};

/**
 * The /ar/ twin of a freshly built path, or undefined when that page was not exported.
 * Used to retire the old site's Arabic URLs onto the new Arabic pages instead of French.
 */
const arabicSiblingOf = (target) => {
  const path = target.replace(/^\/|\/$/g, '');
  const [from, ...rest] = path.split('/');
  if (from === 'ar') return target;
  const twin = ['ar', ...rest.map((seg) => translateSegment(seg, from, 'ar'))].join('/');
  return built.includes(twin) ? `/${twin}/` : undefined;
};

/* ------------------------------------------------- old URL -> new URL (301) */

/** Old FR and EN paths, mapped to the localised path they became. */
const RULES = [
  // Home
  ['/', 'fr', ''],

  // Catalogue — French
  ['/produits/', 'fr', 'produits'],
  ['/produits-moreco/', 'fr', 'produits'],
  ['/applications-produits/', 'fr', 'a-propos/services-et-conseils'],
  ['/agri-horticulture-fr/', 'fr', 'produits/agri-horticulture'],
  ['/agri-horticulture-fr/gamme-de-produits-orthagrow/', 'fr', 'produits/agri-horticulture/orthagrow'],
  ['/agri-horticulture-fr/gamme-de-produits-orthagrow/emploi-sur-le-terrain/', 'fr', 'produits/agri-horticulture/orthagrow'],
  /* OrthaFight and FertiFight were withdrawn on 2026-09-09; FertFight replaced them. */
  ['/agri-horticulture-fr/gamme-de-produits-orthafight/', 'fr', 'produits/agri-horticulture/orthagrow/orthagrow-fertifight'],
  ['/les-humains/', 'fr', 'produits/humains'],
  ['/les-humains/ligne-de-produit-mavita/', 'fr', 'produits/humains/mavita'],
  ['/les-humains/ligne-de-produit-mavita/mavita-health-fr/', 'fr', 'produits/humains/mavita/mavita-health'],
  ['/les-humains/ligne-de-produit-mavita/mavita-beauty-fr/', 'fr', 'produits/humains/mavita/mavita-beauty'],
  ['/les-humains/ligne-de-produit-mavita/mavita-luxe-fr/', 'fr', 'produits/humains/mavita/mavita-luxe'],
  ['/les-humains/ligne-de-produit-mavita/mavita-slim-avec-maca/', 'fr', 'produits/humains/mavita/mavita-slim'],
  ['/les-humains/ligne-de-produit-mavita/mavita-sport-fr/', 'fr', 'produits/humains/mavita/mavita-sport'],
  ['/les-humains/ligne-de-produit-mavita/mavita-stress-plex-fr/', 'fr', 'produits/humains/mavita/mavita-stress-plex'],
  ['/des-animaux/', 'fr', 'produits/animaux'],
  ['/des-animaux/orthahealth-fr/', 'fr', 'produits/animaux/orthahealth/orthahealth'],
  ['/des-animaux/huwa-san-for-animals/', 'fr', 'produits/emploi-general/huwa-san-pro'],
  ['/emploi-general/', 'fr', 'produits/emploi-general'],
  ['/emploi-general/gamme-de-produits-huwa-san/', 'fr', 'produits/emploi-general/huwa-san-pro'],
  ['/emploi-general/gamme-de-produits-huwa-san/desinfection-professionnel/', 'fr', 'produits/emploi-general/huwa-san-pro'],
  ['/emploi-general/gamme-de-produits-huwa-san/desinfection-professionnel/agriculture/', 'fr', 'produits/emploi-general/huwa-san-pro/huwa-san-agro'],
  ['/emploi-general/gamme-de-produits-huwa-san/desinfection-professionnel/veterinaire/', 'fr', 'produits/emploi-general/huwa-san-pro/huwa-san-vet'],
  ['/emploi-general/gamme-de-produits-huwa-san/desinfection-professionnel/aliments-et-boissons/', 'fr', 'produits/emploi-general/huwa-san-pro/huwa-san-fb'],
  ['/emploi-general/gamme-de-produits-huwa-san/desinfection-professionnel/hard-surface/', 'fr', 'produits/emploi-general/huwa-san-pro/huwa-san-hard-surface'],
  ['/emploi-general/gamme-de-produits-huwa-san/desinfection-professionnel/traitement-de-leau/', 'fr', 'produits/emploi-general/huwa-san-pro/huwa-san-water-treatment'],
  ['/emploi-general/gamme-de-produits-huwa-san/hygiene-home/', 'fr', 'produits/emploi-general/huwa-san-home'],
  ['/emploi-general/gamme-de-produits-huwa-san/pool/', 'fr', 'produits/emploi-general/huwa-san-pool'],
  ['/emploi-general/bioxeco/', 'fr', 'produits/emploi-general/bioxeco'],
  ['/emploi-general/produit-clearox/', 'fr', 'produits/emploi-general/clearox/clearox'],

  // Catalogue — English
  ['/products/', 'en', 'products'],
  ['/moreco-products/', 'en', 'products'],
  ['/applications/', 'en', 'about/services-and-advice'],
  ['/agri-horticulture/', 'en', 'products/agri-horticulture'],
  ['/agri-horticulture/orthagrow-productline/', 'en', 'products/agri-horticulture/orthagrow'],
  ['/agri-horticulture/orthagrow-productline/guidelines-use-field/', 'en', 'products/agri-horticulture/orthagrow'],
  ['/agri-horticulture/orthafight-productline/', 'en', 'products/agri-horticulture/orthagrow/orthagrow-fertifight'],
  ['/humans/', 'en', 'products/humans'],
  ['/humans/mavita-productline/', 'en', 'products/humans/mavita'],
  ['/humans/mavita-productline/mavita-health/', 'en', 'products/humans/mavita/mavita-health'],
  ['/humans/mavita-productline/mavita-beauty/', 'en', 'products/humans/mavita/mavita-beauty'],
  ['/humans/mavita-productline/mavita-luxe/', 'en', 'products/humans/mavita/mavita-luxe'],
  ['/humans/mavita-productline/mavita-slim-maca/', 'en', 'products/humans/mavita/mavita-slim'],
  ['/humans/mavita-productline/mavita-sport/', 'en', 'products/humans/mavita/mavita-sport'],
  ['/humans/mavita-productline/mavita-stress-plex/', 'en', 'products/humans/mavita/mavita-stress-plex'],
  ['/animals/', 'en', 'products/animals'],
  ['/animals/orthahealth/', 'en', 'products/animals/orthahealth/orthahealth'],
  ['/animals/huwa-san-for-animals/', 'en', 'products/general-use/huwa-san-pro'],
  ['/general-use/', 'en', 'products/general-use'],
  ['/general-use/huwa-san-productline/', 'en', 'products/general-use/huwa-san-pro'],
  ['/general-use/huwa-san-productline/professional-disinfection-2/', 'en', 'products/general-use/huwa-san-pro'],
  ['/general-use/huwa-san-productline/professional-disinfection-2/agriculture/', 'en', 'products/general-use/huwa-san-pro/huwa-san-agro'],
  ['/general-use/huwa-san-productline/professional-disinfection-2/veterinary/', 'en', 'products/general-use/huwa-san-pro/huwa-san-vet'],
  ['/general-use/huwa-san-productline/professional-disinfection-2/food-beverage/', 'en', 'products/general-use/huwa-san-pro/huwa-san-fb'],
  ['/general-use/huwa-san-productline/professional-disinfection-2/hard-surface/', 'en', 'products/general-use/huwa-san-pro/huwa-san-hard-surface'],
  ['/general-use/huwa-san-productline/professional-disinfection-2/water-treatment/', 'en', 'products/general-use/huwa-san-pro/huwa-san-water-treatment'],
  ['/general-use/huwa-san-productline/hygiene-home/', 'en', 'products/general-use/huwa-san-home'],
  ['/general-use/huwa-san-productline/pool/', 'en', 'products/general-use/huwa-san-pool'],
  ['/general-use/bioxeco/', 'en', 'products/general-use/bioxeco'],
  ['/general-use/clearox/', 'en', 'products/general-use/clearox/clearox'],

  // R&D + I, knowledge centre, editorial.
  // Each article kept its own page on the new site, so these land on the piece itself
  // rather than on the list — the old URLs carry whatever ranking the articles had.
  ['/recherche/', 'fr', 'rd-i'],
  ['/research-products/', 'en', 'rd-i'],
  ['/limportance-du-silicium/', 'fr', 'ressources/centre-de-connaissances/importance-du-silicium'],
  ['/the-importance-of-silicon/', 'en', 'resources/knowledge-centre/importance-du-silicium'],
  ['/le-potentiel-therapeutique-de-lacide-silicique/', 'fr', 'ressources/centre-de-connaissances/acide-silicique'],
  ['/hydroxyaluminosilicates-and-the-therapeutic-potential-of-silicic-acid/', 'en', 'resources/knowledge-centre/acide-silicique'],
  ['/etude-de-la-bio-disponibilite-de-laos/', 'fr', 'ressources/centre-de-connaissances/bio-disponibilite-aos'],
  ['/osa-bioavailability-cross-over-study/', 'en', 'resources/knowledge-centre/bio-disponibilite-aos'],
  ['/nutrition-foliare-faits-mythes-et-perspectives/', 'fr', 'ressources/centre-de-connaissances/nutrition-foliaire'],
  ['/foliar-nutrition-of-crops-facts-myths-and-perspectives/', 'en', 'resources/knowledge-centre/nutrition-foliaire'],
  ['/limpact-de-lagriculture-sur-le-cycle-biogeochimique-de-si/', 'fr', 'ressources/centre-de-connaissances/cycle-du-silicium'],
  ['/impact-of-agriculture-on-the-si-biogeochemical-cycle/', 'en', 'resources/knowledge-centre/cycle-du-silicium'],
  ['/la-nutrition-et-les-cheveux-deficiences-et-supplements/', 'fr', 'ressources/centre-de-connaissances/nutrition-et-cheveux'],
  ['/nutrition-and-hair-deficiencies-and-supplements/', 'en', 'resources/knowledge-centre/nutrition-et-cheveux'],
  ['/mavita-health-renforce-le-systeme-dimmunite/', 'fr', 'ressources/centre-de-connaissances/mavita-immunite'],
  ['/mavita-health-supports-immune-system/', 'en', 'resources/knowledge-centre/mavita-immunite'],
  ['/les-dossiers-pour-les-medias-et-les-evenements-venir/', 'fr', 'actualites/medias'],
  ['/media/', 'en', 'news/media'],
  ['/registration-for-launch-moreco/', 'fr', 'actualites'],
  ['/news/', 'fr', 'actualites'],
  ['/contact/', 'fr', 'contact'],
  ['/opportunites-de-carriere-a-moreco/', 'fr', 'contact/carrieres'],
  ['/career-opportunities-moreco/', 'en', 'contact/careers'],
];

/** Crop trial slugs, mapped from their old /research/ URL. */
const TRIALS = {
  'resultats-sur-les-pommiers-apres-lapplication-des-produits-la-gamme-orthagrow': 'pommiers',
  'resultats-sur-les-fraises-apres-lapplication-de-la-gamme-orthagrow': 'fraises',
  'resultats-sur-les-tomates-apres-lapplication-de-orthagrow-control': 'tomates',
  'resultats-sur-les-agrumes-marisol-apres-lapplication-de-orthagrow-control': 'agrumes',
  'resultats-de-la-production-sur-les-arbres-pecher-a-lapplication-de-orthagrow-bloom-booster': 'pechers',
  'resultats-sur-les-pommes-de-terre-apres-lapplication-du-produit-orthagrow-control': 'pommes-de-terre',
  'resultats-sur-les-melons-jaune-apres-lapplication-de-la-gamme-orthagrow': 'melons',
  'resultats-sur-les-carottes-apres-lapplication-de-orthagrow-control': 'carottes',
  'resultats-sur-les-carottes-apres-lapplication-de-orthagrow-control-2': 'carottes',
  'resultats-de-la-production-de-ble-a-lapplication-de-orthagrow-granule': 'ble',
  'effets-des-produits-orthagrow-sur-les-poivrons': 'poivrons',
  'resultats-sur-les-olives-apres-lapplication-de-orthagrow-control': 'olives',
  'resultats-de-la-production-de-mais-densilage-a-lapplication-de-orthagrow-poudre': 'mais-ensilage',
  'resultats-sur-les-cactus-apres-lapplication-de-orthagrow-control': 'cactus',
  'resultats-de-la-production-de-guinoa-a-lapplication-de-orthagrow-control': 'quinoa',
  '15-resultats-sur-les-grapes': 'raisins',
  '16-resultats-sur-les-prunes': 'prunes',
  '17-resultats-sur-les-framboises': 'framboises',
  '18-resultats-sur-les-oignons': 'oignons',
  '19-resultats-sur-le-gazon': 'gazon',
};

const TRIAL_PREFIX = { fr: 'rd-i/essais', en: 'rd-i/trials' };

const map = new Map();
const addRule = (from, locale, to) => map.set(from, `/${locale}${to ? '/' + to : ''}/`);

for (const [from, locale, to] of RULES) addRule(from, locale, to);
for (const [slug, trial] of Object.entries(TRIALS)) {
  addRule(`/research/${slug}/`, 'fr', `${TRIAL_PREFIX.fr}/${trial}`);
}

/**
 * The old site's Arabic pages have a home again: the archive's own translation links
 * give each one a French or English sibling, and that sibling's new path is re-localised
 * into /ar/. Anything without a usable sibling keeps the French target.
 */
const index = JSON.parse(readFileSync(join(ROOT, '..', 'content-index.json'), 'utf8'));
const unmapped = [];

for (const entry of index) {
  const path = new URL(entry.url).pathname;
  if (map.has(path)) continue;

  if (entry.lang === 'ar') {
    const sibling = entry.translations?.fr ?? entry.translations?.en;
    if (sibling) {
      const target = map.get(new URL(sibling).pathname.replace(/\/?$/, '/'));
      if (target) {
        map.set(path, arabicSiblingOf(target) ?? target);
        continue;
      }
    }
  }

  // Yearly WordPress archives: nothing to keep, send them to the news listing.
  if (/^\/\d{4}\/(\d{2}\/)?$/.test(path)) {
    map.set(path, `/${entry.lang === 'en' ? 'en/news' : 'fr/actualites'}/`);
    continue;
  }

  if (path.startsWith('/research/')) {
    map.set(path, '/fr/rd-i/');
    continue;
  }

  unmapped.push(`${entry.lang} ${path}`);
}

/* --------------------------------------------------------------- .htaccess */

const dead = [...map.entries()].filter(([, to]) => !existsSync(join(OUT, to.slice(1), 'index.html')));

const htaccess = `# Generated by scripts/finalize-export.mjs — do not edit by hand.

Options -MultiViews
DirectoryIndex index.html

# The bare domain is NOT redirected here on purpose. Apache can only read the first
# token of Accept-Language, and a server redirect fires before the page can consult the
# language the visitor actually chose last time. index.html does both, and works on any
# static host rather than only on Apache.

# --- 301s from the old moreco.ma (${map.size} rules) ---
# WPML served every language off the same paths with ?lang=xx, so the query string is
# dropped here: the language now lives in the path. The old Arabic pages land on /ar/.
${[...map.entries()]
  .filter(([from]) => from !== '/')
  .sort((a, b) => b[0].length - a[0].length)
  .map(([from, to]) => `Redirect 301 ${from} ${to}`)
  .join('\n')}

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json image/svg+xml
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType text/html "access plus 1 hour"
</IfModule>

ErrorDocument 404 /404.html
`;

writeFileSync(join(OUT, '.htaccess'), htaccess, 'utf8');

/* ------------------------------------------------------- root landing page */

const landing = `<!doctype html>
<html lang="${DEFAULT}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Moreco</title>
<link rel="canonical" href="${SITE}/${DEFAULT}/">
${LOCALES.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}/${l}/">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${SITE}/${DEFAULT}/">
<script>
  /*
   * Language detection, in the head so the choice is made before anything paints.
   *
   * Order: the language the visitor last picked with the header switcher, then the
   * browser's own list (navigator.languages is ordered by preference and includes
   * region tags like ar-MA), then French.
   *
   * This used to sit at the foot of the body under a <meta http-equiv="refresh"
   * content="0"> — which fired first, so a German browser still landed on French.
   * The refresh is now inside <noscript>, where it cannot race anything.
   */
  (function () {
    var known = ${JSON.stringify(LOCALES)};
    var chosen = null;
    try { chosen = localStorage.getItem('moreco:lang'); } catch (e) { /* private mode */ }

    var wanted = known.indexOf(chosen) !== -1 ? chosen : null;
    if (!wanted) {
      var offered = navigator.languages || [navigator.language || ''];
      for (var i = 0; i < offered.length && !wanted; i++) {
        var tag = String(offered[i]).slice(0, 2).toLowerCase();
        if (known.indexOf(tag) !== -1) wanted = tag;
      }
    }

    /* replace(), not assign(): the chooser must not sit in the back button. */
    location.replace('/' + (wanted || '${DEFAULT}') + '/');
  })();
</script>
<noscript><meta http-equiv="refresh" content="0; url=/${DEFAULT}/"></noscript>
<style>
  body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f6f8f7;color:#10161c;
       font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;text-align:center}
  ul{display:flex;gap:.75rem;list-style:none;padding:0;flex-wrap:wrap;justify-content:center}
  a{display:block;padding:.6rem 1.1rem;border:1px solid #ccd3d9;border-radius:4px;background:#fff;
    color:inherit;text-decoration:none;font-weight:600}
  a:hover{border-color:#40ab5c;color:#25743a}
</style>
</head>
<body>
  <main>
    <img src="/media/brand/moreco-logo.webp" alt="Moreco" width="535" height="200" style="height:56px;width:auto">
    <p>Choose your language / Choisissez votre langue</p>
    <ul>
${LOCALES.map((l) => `      <li><a href="/${l}/" hreflang="${l}">${{ fr: 'Français', en: 'English', es: 'Español', nl: 'Nederlands', ar: 'العربية' }[l]}</a></li>`).join('\n')}
    </ul>
  </main>
</body>
</html>
`;

writeFileSync(join(OUT, 'index.html'), landing, 'utf8');

/* ------------------------------------------------------------- sitemap.xml */

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${built
  .slice()
  .sort()
  .map((p) => {
    const siblings = siblingsOf(p);
    return `  <url>
    <loc>${SITE}/${p}/</loc>
${siblings.map((s) => `    <xhtml:link rel="alternate" hreflang="${s.locale}" href="${s.url}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${siblings.find((s) => s.locale === DEFAULT).url}"/>
    <changefreq>monthly</changefreq>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

// Every alternate the sitemap claims must be a page that was actually built.
const knownUrls = new Set(built.map((p) => `${SITE}/${p}/`));
const brokenAlternates = built
  .flatMap((p) => siblingsOf(p).map((s) => s.url))
  .filter((url) => !knownUrls.has(url));

writeFileSync(join(OUT, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(
  join(OUT, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
  'utf8'
);

/* ------------------------------------------------------------------ report */

console.log(`landing page   out/index.html`);
console.log(`redirects      ${map.size} rules -> out/.htaccess`);
console.log(`sitemap        ${built.length} URLs, ${built.length * LOCALES.length} hreflang alternates`);
if (brokenAlternates.length) {
  const unique = [...new Set(brokenAlternates)];
  console.log(`\n  ${unique.length} HREFLANG ALTERNATES POINT AT A PAGE THAT WAS NOT BUILT:`);
  for (const url of unique.slice(0, 20)) console.log(`    ${url}`);
}
if (dead.length) {
  console.log(`\n  ${dead.length} REDIRECT TARGETS DO NOT EXIST:`);
  for (const [from, to] of dead) console.log(`    ${from} -> ${to}`);
}
if (unmapped.length) {
  console.log(`\n  ${unmapped.length} OLD URLS WITH NO RULE:`);
  for (const u of unmapped) console.log(`    ${u}`);
}

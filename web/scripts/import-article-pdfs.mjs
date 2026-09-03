/**
 * Copies the knowledge-centre articles' PDFs out of the archive mirror (../site/download)
 * into public/media/articles, renamed by article slug, and writes the manifest the
 * article pages read.
 *
 * The old site served these through a WordPress download-manager widget, which the crawl
 * could only flatten into prose — a filename, a byte count, a "5 Téléchargements" line
 * and a markdown table. data/articles.ts drops all of that from the body; this script is
 * what puts the actual file back within reach.
 *
 *   node scripts/import-article-pdfs.mjs
 *
 * Idempotent: re-running overwrites. The archive is only ever read.
 */
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const MIRROR = join(HERE, '..', '..', 'site', 'download');
const OUT = join(HERE, '..', 'public', 'media', 'articles');

/** Article slug -> the file as it sits in the archive. */
const FILES = {
  'importance-du-silicium': 'news-article/interview-professor_theimportance of silicon.pdf',
  'acide-silicique': 'pharmaceutical_science_studies/silicic-acid-and-aluminum-exley-2012.pdf',
  'bio-disponibilite-aos': 'pharmaceutical_science_studies/study-OSA-bioavailability-cross-over-study.pdf',
  'nutrition-foliaire': 'agricultural_studies/agronomics201303-foliar-spray.pdf',
  'cycle-du-silicium': 'agricultural_studies/silicon-cycle-and-agriculture-2012.pdf',
  'nutrition-et-cheveux': 'pharmaceutical_science_studies/OSA AND HAIR 2013.pdf',
  /* mavita-immunite carried no download on the old site. */
};

mkdirSync(OUT, { recursive: true });

const manifest = {};
const missing = [];

for (const [slug, source] of Object.entries(FILES)) {
  const from = join(MIRROR, source);
  if (!existsSync(from)) {
    missing.push(source);
    continue;
  }

  const dest = join(OUT, `${slug}.pdf`);
  copyFileSync(from, dest);
  const bytes = statSync(dest).size;
  manifest[slug] = { pdf: `/media/articles/${slug}.pdf`, bytes };
  console.log(`${slug.padEnd(24)} ${(bytes / 1024).toFixed(0).padStart(5)} KB`);
}

writeFileSync(
  join(HERE, '..', 'data', 'article-assets.json'),
  JSON.stringify(manifest, null, 1) + '\n'
);

if (missing.length) {
  console.log('\nnot found in the archive:');
  for (const m of missing) console.log('  ' + m);
}

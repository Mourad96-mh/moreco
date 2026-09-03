/**
 * Copies the media-page downloads out of the archive mirror into public/media/press.
 *
 * The crawl turned the old page's links into the words "Telecharger ici", losing the
 * files they pointed at — but the files themselves came down with the rest of the mirror.
 * These four are what /actualites/medias offered: a stand dossier per trade show, the
 * product brochure and the sales terms.
 *
 *   node scripts/import-press.mjs
 *
 * Idempotent: re-running overwrites. The archive is only ever read.
 */
import { writeFileSync, mkdirSync, copyFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const MIRROR = join(HERE, '..', '..', 'site');
const OUT = join(HERE, '..', 'public', 'media', 'press');

/** Key -> the file as it sits in the archive. */
const FILES = {
  'siam-stand': 'wp-content/uploads/2014/03/exhibition_stand_siam_moreco.pdf',
  'saudi-stand': 'wp-content/uploads/2014/03/exhibition_stand_saudi_agriculture_moreco.pdf',
  'product-brochure': 'public/productbrochure/Productsheet_Moreco_FR_web.pdf',
  'sales-terms': 'wp-content/uploads/2014/04/Salesterms-of-Moreco-Sarl_08-04-2014.pdf',
};

mkdirSync(OUT, { recursive: true });

const manifest = {};
const missing = [];

for (const [key, source] of Object.entries(FILES)) {
  const from = join(MIRROR, source);
  if (!existsSync(from)) {
    missing.push(source);
    continue;
  }

  const dest = join(OUT, `${key}.pdf`);
  copyFileSync(from, dest);
  const bytes = statSync(dest).size;
  manifest[key] = { pdf: `/media/press/${key}.pdf`, bytes };
  console.log(`${key.padEnd(18)} ${(bytes / 1024).toFixed(0).padStart(5)} KB`);
}

writeFileSync(join(HERE, '..', 'data', 'press-assets.json'), JSON.stringify(manifest, null, 1) + '\n');

if (missing.length) {
  console.log('\nnot found in the archive:');
  for (const m of missing) console.log('  ' + m);
}

/**
 * Cuts the home-page hero film from the nine rushes, to the timing in
 * BRIEF-VIDEO-ACCUEIL.md, and encodes what the site actually serves.
 *
 *   node scripts/build-hero-video.mjs [--source DIR] [--crossfade SECONDS] [--dry]
 *
 * Put the rushes in `hero-source/` (git-ignored: raw footage does not belong in the
 * repo), one file per shot, named by its number — `01-drone-champs.mp4`, `02-tomate.mov`,
 * … `09-dattiers.mp4`. Anything ffmpeg can read will do, any resolution, any frame rate.
 * The script writes `public/media/hero/hero.mp4` and `public/media/hero/hero-poster.webp`.
 *
 * ## Picking the seconds that count
 *
 * A rush is always longer than the two seconds the brief gives it. `hero-source/shots.json`
 * says where to start in each one, in seconds:
 *
 *   { "2": { "start": 14.5 }, "9": { "start": 3 } }
 *
 * Missing entry, missing file: the shot is taken from its first frame.
 *
 * ## The loop
 *
 * The client asked on 2026-09-09 for the film to come back round to shot 1 rather than
 * fade to black, because the banner replays it for as long as the visitor stays on the
 * page and a black frame every twenty seconds reads as a fault.
 *
 * So the twenty seconds of rushes become a nineteen-second file: the last second is
 * dissolved into the first second, and the result starts one second into shot 1 — which
 * is exactly where that dissolve leaves off. Played on a loop it has no seam at all.
 * Give shot 1 a rush long enough to lose its first second.
 */
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');

/** The brief's nine shots, in order, with the seconds each one holds. Total 20. */
const SHOTS = [
  { n: 1, seconds: 3, what: 'drone, champs verts au lever de soleil' },
  { n: 2, seconds: 2, what: 'macro, tomates vertes et gouttes d’eau' },
  { n: 3, seconds: 2, what: 'macro, cassis et rosée' },
  { n: 4, seconds: 2, what: 'fraises mûres dans la terre' },
  { n: 5, seconds: 2, what: 'avocats sur la branche' },
  { n: 6, seconds: 2, what: 'travelling, rangs de vigne' },
  { n: 7, seconds: 2, what: 'traversée d’un champ de maïs' },
  { n: 8, seconds: 2, what: 'olives mûres, verger méditerranéen' },
  { n: 9, seconds: 3, what: 'drone, palmeraie de dattiers au coucher de soleil' },
];

/* 1920 wide is what the banner needs: it is a background, and a 4K file would cost the
   visitor megabytes for pixels the layout never shows. The master stays 4K. */
const WIDTH = 1920;
const HEIGHT = 1080;
const FPS = 25;
const POSTER_WIDTH = 2000;
/* The brief's budget. Over this the banner starts to compete with the page itself. */
const SIZE_BUDGET_MB = 8;

/* ------------------------------------------------------------------ arguments */

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

/* resolve, not join: an absolute --source or --out has to stay absolute. */
const SOURCE = resolve(ROOT, flag('source', 'hero-source'));
/* --out writes a draft somewhere harmless; the default replaces what the site serves. */
const OUT_DIR = resolve(ROOT, flag('out', 'public/media/hero'));
const CROSSFADE = Number(flag('crossfade', '1'));
const DRY = args.includes('--dry');

if (!Number.isFinite(CROSSFADE) || CROSSFADE <= 0 || CROSSFADE >= 2.5) {
  throw new Error(`--crossfade must be between 0 and 2.5 seconds, got ${CROSSFADE}`);
}

/* -------------------------------------------------------------------- helpers */

const ffmpeg = (...a) => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...a]);

function probe(file, entries) {
  const out = execFileSync('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', entries,
    '-of', 'default=noprint_wrappers=1:nokey=1',
    file,
  ]);
  return out.toString().trim().split('\n');
}

const durationOf = (file) => Number(probe(file, 'format=duration')[0]);
const megabytes = (file) => statSync(file).size / 1e6;

/* --------------------------------------------------------------- the rushes */

if (!existsSync(SOURCE)) {
  console.error(`No rushes: ${SOURCE} does not exist.`);
  console.error('Create it and drop 01-….mp4 … 09-….mp4 in it — see BRIEF-VIDEO-ACCUEIL.md.');
  process.exit(1);
}

const files = readdirSync(SOURCE);
const starts = existsSync(join(SOURCE, 'shots.json'))
  ? JSON.parse(readFileSync(join(SOURCE, 'shots.json'), 'utf8'))
  : {};

const missing = [];
const tooShort = [];
const plan = SHOTS.map((shot) => {
  const prefix = String(shot.n).padStart(2, '0');
  const name = files.find((f) => f.startsWith(prefix) && !f.endsWith('.json'));
  if (!name) {
    missing.push(`${prefix} — ${shot.what}`);
    return null;
  }

  const file = join(SOURCE, name);
  const start = Number(starts[shot.n]?.start ?? 0);
  const available = durationOf(file) - start;
  /* Shot 1 also feeds the dissolve that closes the loop, so it needs the extra second. */
  const needed = shot.seconds + (shot.n === 1 ? CROSSFADE : 0);

  /* Half a frame of slack: a rush cut to exactly 2.00s should not be rejected. */
  if (available + 0.02 < needed) {
    tooShort.push(
      `${prefix} — ${name}: ${needed}s needed, ${available.toFixed(1)}s left after start=${start}s`
    );
  }
  return { ...shot, file, name, start, needed };
});

if (missing.length || tooShort.length) {
  if (missing.length) {
    console.error(`Missing ${missing.length} of the nine rushes in ${SOURCE}:`);
    for (const m of missing) console.error(`  ${m}`);
  }
  if (tooShort.length) {
    console.error(`${tooShort.length} rush(es) too short for the shot:`);
    for (const t of tooShort) console.error(`  ${t}`);
    console.error('Lower the start in shots.json, or buy a longer clip.');
  }
  process.exit(1);
}

console.log(`rushes    ${SOURCE}`);
for (const s of plan) {
  console.log(`  ${String(s.n).padStart(2, '0')}  ${s.needed}s from ${s.start}s  ${s.name}`);
}
if (DRY) process.exit(0);

/* ------------------------------------------------------------------ the cut */

mkdirSync(OUT_DIR, { recursive: true });
const work = mkdtempSync(join(tmpdir(), 'moreco-hero-'));

try {
  /*
   * One pass per shot rather than a single nine-input filtergraph: rushes arrive in
   * whatever the camera or the stock library produced, and normalising them one at a
   * time is what makes a mixed bag concatenate at all. `crf 16` keeps the intermediates
   * effectively lossless — the quality that matters is set on the final pass.
   */
  const cuts = plan.map((shot) => {
    const cut = join(work, `${String(shot.n).padStart(2, '0')}.mp4`);
    ffmpeg(
      '-ss', String(shot.start),
      '-i', shot.file,
      '-t', String(shot.needed),
      '-an',
      '-vf',
      `scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=increase,` +
        `crop=${WIDTH}:${HEIGHT},fps=${FPS},setsar=1,format=yuv420p`,
      '-c:v', 'libx264', '-crf', '16', '-preset', 'veryfast',
      cut
    );
    return cut;
  });

  /* The concat demuxer reads forward slashes on Windows too, and only forward slashes. */
  const list = join(work, 'shots.txt');
  writeFileSync(list, cuts.map((c) => `file '${c.replace(/\\/g, '/')}'`).join('\n'), 'utf8');

  const full = join(work, 'full.mp4');
  ffmpeg('-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', full);

  const total = durationOf(full);
  const body = total - CROSSFADE;

  /*
   * The seam. `body` is everything from the crossfade point to the end of shot 9; the
   * head is the first second, which is where the dissolve lands. Playing the result on
   * a loop, the frame after the dissolve is the frame the file opens on.
   */
  ffmpeg(
    '-i', full,
    '-i', full,
    '-filter_complex',
    `[0:v]trim=${CROSSFADE}:${body},setpts=PTS-STARTPTS[main];` +
      `[1:v]trim=${body}:${total},setpts=PTS-STARTPTS[tail];` +
      `[0:v]trim=0:${CROSSFADE},setpts=PTS-STARTPTS[head];` +
      `[tail][head]xfade=transition=fade:duration=${CROSSFADE}:offset=0[seam];` +
      `[main][seam]concat=n=2:v=1:a=0,format=yuv420p[v]`,
    '-map', '[v]',
    '-an',
    '-c:v', 'libx264', '-profile:v', 'high', '-crf', '23', '-preset', 'slow',
    /* A keyframe every second: the loop restart lands on one, so it never stutters. */
    '-g', String(FPS), '-keyint_min', String(FPS),
    '-movflags', '+faststart',
    join(OUT_DIR, 'hero.mp4')
  );

  /*
   * The poster is the first frame of the finished file, so the still the visitor sees
   * before playback is the exact frame playback opens on. It carries the first paint,
   * stands in when autoplay is refused, and replaces the film entirely for anyone who
   * asked their system to reduce motion.
   */
  ffmpeg(
    '-i', join(OUT_DIR, 'hero.mp4'),
    '-frames:v', '1',
    '-vf', `scale=${POSTER_WIDTH}:-2`,
    '-quality', '82',
    join(OUT_DIR, 'hero-poster.webp')
  );
} finally {
  rmSync(work, { recursive: true, force: true });
}

/* ------------------------------------------------------------------- report */

const video = join(OUT_DIR, 'hero.mp4');
const size = megabytes(video);
const [w, h] = probe(video, 'stream=width,height');

console.log('');
console.log(`hero.mp4         ${w}x${h}  ${durationOf(video).toFixed(1)}s  ${size.toFixed(1)} MB`);
console.log(`hero-poster.webp ${megabytes(join(OUT_DIR, 'hero-poster.webp')).toFixed(2)} MB`);
console.log(`loop             ${CROSSFADE}s dissolve, shot 9 into shot 1 — no black frame`);

if (size > SIZE_BUDGET_MB) {
  console.log('');
  console.log(`  ${size.toFixed(1)} MB is over the ${SIZE_BUDGET_MB} MB budget for a banner.`);
  console.log('  Raise -crf (25, then 27) before dropping the resolution: this is a');
  console.log('  background behind nothing, and it degrades gracefully.');
}

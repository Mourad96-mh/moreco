import type { Locale } from '@/i18n/config';
import pages from './pages.json';
import articles from './articles.json';

/**
 * The news page, recovered from a WordPress archive listing.
 *
 * scripts/extract-pages.mjs could only see prose, so each post came out of the crawl as
 * five loose blocks in a row — picture, title, teaser, a meta line reading
 * "Posted on 5 nov 2014 | By Moreco | In Nouvelles", then "Continuer a lire" — and the
 * page rendered them as one undifferentiated column. Reading them back into posts is
 * what lets the page look like a news page.
 *
 * The shape is regular across all four languages, so a post starts at every image and
 * runs to the next one.
 */
export interface NewsPost {
  title: string;
  excerpt: string;
  image: string | null;
  /** ISO yyyy-mm-dd, for <time dateTime>. Null if the meta line could not be read. */
  date: string | null;
  /** The archive's own "Continuer a lire" / "Continue Reading", already translated. */
  readMore: string | null;
  /** The knowledge-centre article this post announced, where there is one. */
  articleSlug: string | null;
}

type Block = { type: string; text?: string; items?: string[]; src?: string };
type PageStore = Record<string, Partial<Record<Locale, Block[]>>>;
const PAGES = pages as PageStore;

/** French is the source language; the other three were translated from it. */
const blocksFor = (locale: Locale): Block[] => PAGES.news?.[locale] ?? PAGES.news?.fr ?? [];

/**
 * The meta line carries the date in each language's own wording — "Posted on 5 Nov 2014",
 * "Veröffentlicht am 5. Nov. 2014". Rather than parse four languages, the French line is
 * read for all of them: the posts line up one-to-one across locales, so post *n* has the
 * same date whatever page it is read on.
 */
const FR_MONTHS = ['jan', 'fév', 'mar', 'avr', 'mai', 'jui', 'juil', 'aoû', 'sep', 'oct', 'nov', 'déc'];

function parseFrenchDate(line: string): string | null {
  const match = line.match(/(\d{1,2})\s+([^\s]+)\s+(\d{4})/);
  if (!match) return null;
  const [, day, monthWord, year] = match;

  const word = monthWord.toLowerCase();
  /* "juin" and "juillet" share their first three letters, so the longer one wins. */
  const index = word.startsWith('juil')
    ? 6
    : FR_MONTHS.findIndex((m) => word.startsWith(m.slice(0, 3)));
  if (index < 0) return null;

  return `${year}-${String(index + 1).padStart(2, '0')}-${day.padStart(2, '0')}`;
}

/** Apostrophes and case differ between the listing and the article store; titles match. */
const normalise = (value: string) =>
  value.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();

const ARTICLE_BY_TITLE = new Map(
  (articles as { slug: string; title: Partial<Record<Locale, string>> }[])
    .filter((a) => a.title.fr)
    .map((a) => [normalise(a.title.fr!), a.slug])
);

function postsIn(blocks: Block[], frBlocks: Block[]): NewsPost[] {
  const posts: NewsPost[] = [];

  blocks.forEach((block, i) => {
    if (block.type !== 'image') return;

    const run = [];
    for (let j = i + 1; j < blocks.length && blocks[j].type !== 'image'; j++) run.push(blocks[j]);

    const heading = run.find((b) => b.type === 'heading');
    if (!heading?.text) return;

    const paragraphs = run.filter((b) => b.type === 'paragraph');
    const meta = run.find((b) => b.type === 'list');

    /* The French meta line at the same position carries the canonical date. */
    const frMeta = frBlocks[i + (run.indexOf(meta!) + 1)];
    const metaLine = (frMeta?.items ?? meta?.items ?? [])[0] ?? '';

    posts.push({
      title: heading.text,
      excerpt: paragraphs[0]?.text ?? '',
      image: block.src ?? null,
      date: parseFrenchDate(metaLine),
      /* The last paragraph of a post is its read-more line. */
      readMore: paragraphs.length > 1 ? (paragraphs[paragraphs.length - 1].text ?? null) : null,
      articleSlug: ARTICLE_BY_TITLE.get(normalise(heading.text)) ?? null,
    });
  });

  return posts;
}

/**
 * The posts pictured with human products — Mavita Health, and the hair-nutrition study —
 * go to the very end of the page (briefing of 2026-09-26). Matched by picture, which is
 * the same file in every language.
 */
const HUMAN_PRODUCT_IMAGES = new Set([
  '/media/pages/mavitahealth-artikel1-870x296.webp',
  '/media/pages/hair-loss-study1-870x296.webp',
]);

const isHumanProductPost = (post: NewsPost) => post.image !== null && HUMAN_PRODUCT_IMAGES.has(post.image);

export function newsPosts(locale: Locale): NewsPost[] {
  const posts = postsIn(blocksFor(locale), blocksFor('fr'));
  return [...posts.filter((p) => !isHumanProductPost(p)), ...posts.filter(isHumanProductPost)];
}

/** Long form, in the reader's own language: "5 novembre 2014". */
export function formatDate(iso: string, locale: Locale): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(Date.UTC(year, month - 1, day))
  );
}

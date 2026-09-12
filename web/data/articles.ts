import type { Locale } from '@/i18n/config';
import raw from './articles.json';
import assets from './article-assets.json';
import type { Block } from '@/components/Blocks/Blocks';

/**
 * The seven pieces the old moreco.ma published on silicon, foliar nutrition and
 * orthosilicic acid. They are read as two lists now — see KNOWLEDGE_ARTICLES and
 * PUBLICATIONS at the foot of this file.
 *
 * Each one arrives from scripts/extract-pages.mjs with its own title, a WordPress meta
 * line and a lead image at the top of the body, all of which the page renders as chrome
 * rather than prose. `articleBody` hands back what is left.
 */
export interface Article {
  slug: string;
  title: Partial<Record<Locale, string>>;
  excerpt: Partial<Record<Locale, string>>;
  blocks: Partial<Record<Locale, Block[]>>;
}

export const ARTICLES = raw as Article[];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);

/** FR is the source language, EN the archive's own translation, ES/DE written by us. */
const pick = <T,>(field: Partial<Record<Locale, T>>, locale: Locale): T | undefined =>
  field[locale] ?? field.fr ?? field.en;

export const articleTitle = (article: Article, locale: Locale): string =>
  pick(article.title, locale) ?? article.slug;

/** The archive wraps some excerpts in markdown asterisks that nothing renders. */
export const articleExcerpt = (article: Article, locale: Locale): string =>
  (pick(article.excerpt, locale) ?? '').replace(/^\*+|\*+$/g, '').trim();

type Asset = { pdf: string; bytes: number };
const ASSETS = assets as Record<string, Asset>;

/** The study itself, where the old site offered one. Six of the seven articles do. */
export const articlePdf = (slug: string): Asset | null => ASSETS[slug] ?? null;

const blocksOf = (article: Article, locale: Locale): Block[] => pick(article.blocks, locale) ?? [];

/** The lead picture, which the page shows under the banner rather than mid-prose. */
export function articleImage(article: Article): string | null {
  const image = blocksOf(article, 'fr').find((b) => b.type === 'image');
  return image && image.type === 'image' ? image.src : null;
}

/**
 * Where the article proper stops and the old WordPress furniture begins: the
 * download-manager widget (a filename, a byte count, a downloads tally and a markdown
 * table, all flattened into paragraphs by the crawl), the "Poster Tags" line, and the
 * "écrit par Moreco" author box with its English boilerplate. None of it is content.
 */
function endOfProse(blocks: Block[]): number {
  const stop = blocks.findIndex(
    (b) =>
      (b.type === 'paragraph' && /\.pdf$/i.test(b.text.trim())) ||
      (b.type === 'paragraph' && /^poster tags/i.test(b.text.trim())) ||
      (b.type === 'heading' && /(écrit par|written by|escrito por|geschrieben von)/i.test(b.text))
  );
  if (stop < 0) return blocks.length;

  /* The widget announces itself with the article's title one line above the filename. */
  const before = blocks[stop - 1];
  return before?.type === 'paragraph' && /\.pdf$/i.test((blocks[stop] as { text: string }).text)
    ? stop - 1
    : stop;
}

/**
 * The body, with the chrome removed: the repeated title, the WordPress meta line
 * ("Posted on 31 mar 2013 | By Moreco | In Nouvelles"), the lead image, the excerpt
 * (which the banner already shows) and everything from the download widget onward.
 */
export function articleBody(article: Article, locale: Locale): Block[] {
  const blocks = blocksOf(article, locale);
  const excerpt = articleExcerpt(article, locale);

  return blocks.slice(0, endOfProse(blocks)).filter((block, i) => {
    if (i === 0 && block.type === 'heading') return false;
    if (block.type === 'image') return false;
    if (block.type === 'list' && block.items.some((item) => /moreco/i.test(item))) return false;
    if (block.type === 'paragraph' && excerpt && block.text.replace(/^\*+|\*+$/g, '').trim() === excerpt) {
      return false;
    }
    return true;
  });
}

/**
 * Publication date, ISO, read off that same meta line — the only place it exists. The
 * French line is parsed for every language, as on the news page: one article, one date.
 */
const FR_MONTHS = ['jan', 'fév', 'mar', 'avr', 'mai', 'jui', 'juil', 'aoû', 'sep', 'oct', 'nov', 'déc'];

export function articleDate(article: Article): string | null {
  const meta = blocksOf(article, 'fr').find(
    (b) => b.type === 'list' && b.items.some((item) => /moreco/i.test(item))
  );
  if (!meta || meta.type !== 'list') return null;

  const match = meta.items.join(' ').match(/(\d{1,2})\s+([^\s]+)\s+(\d{4})/);
  if (!match) return null;
  const [, day, monthWord, year] = match;

  const word = monthWord.toLowerCase();
  const index = word.startsWith('juil')
    ? 6
    : FR_MONTHS.findIndex((m) => word.startsWith(m.slice(0, 3)));
  if (index < 0) return null;

  return `${year}-${String(index + 1).padStart(2, '0')}-${day.padStart(2, '0')}`;
}

/**
 * The four peer-reviewed studies. The client's briefing of 2026-09-09 separated them
 * from the rest: a scientific publication belongs on R&D + I and nowhere else, while
 * the knowledge centre keeps the two interviews and the Mavita piece.
 *
 * Every article still has its own page at the same URL — this splits the two lists that
 * link to them, not the articles themselves.
 */
const PUBLICATION_SLUGS = new Set([
  'acide-silicique',
  'bio-disponibilite-aos',
  'nutrition-foliaire',
  'cycle-du-silicium',
]);

export const isPublication = (slug: string): boolean => PUBLICATION_SLUGS.has(slug);

/** Newest first, as the client asked; anything the archive left undated sinks to the end. */
const byDateDesc = (list: Article[]): Article[] =>
  [...list].sort((a, b) => (articleDate(b) ?? '').localeCompare(articleDate(a) ?? ''));

/** The knowledge centre's list. */
export const KNOWLEDGE_ARTICLES: Article[] = byDateDesc(
  ARTICLES.filter((a) => !isPublication(a.slug))
);

/** The R&D + I page's list. */
export const PUBLICATIONS: Article[] = byDateDesc(ARTICLES.filter((a) => isPublication(a.slug)));

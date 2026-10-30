import raw from './press-articles.json';

/**
 * What the press wrote about Moreco, as PDFs on the media page. The old site's press
 * coverage came off on 2026-09-29; these are the articles the client has since retyped
 * and sent back (e-mail of 2026-10-07), with more to come a couple at a time.
 */
export interface PressArticle {
  slug: string;
  /** The newspaper, as it names itself. */
  outlet: string;
  /** The headline, in the language it was printed in; not translated. */
  title: string;
  /** ISO date of publication. */
  date: string;
  /** Path under public/, e.g. /media/press/….pdf */
  file: string;
  bytes?: number;
}

export const PRESS_ARTICLES = (raw.articles ?? []) as PressArticle[];

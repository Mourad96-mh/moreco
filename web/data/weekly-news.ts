import type { Locale } from '@/i18n/config';
import type { Block } from '@/components/Blocks/Blocks';
import raw from './weekly-news.json';

/**
 * The weekly posts Moreco publishes under News every Thursday, from 2026-11 on — the
 * site's side of a weekly rhythm the client keeps on their own channels too, for SEO.
 *
 * Unlike the archive's posts (data/news.ts), each one has a page of its own, with the
 * client's meta title and description. To add a week, append an entry to
 * weekly-news.json and drop its picture in public/media/news/: the route, the card on
 * the news page and the sitemap entry all follow from the entry.
 *
 * The slug is the same in every language, like the knowledge-centre articles. In the
 * body, `**text**` sets a run in bold (Blocks renders it).
 */
export interface WeeklyPost {
  slug: string;
  week: number;
  /** ISO yyyy-mm-dd, the day it went out. */
  date: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  /** The product the post is about, linked under the text. */
  product?: string;
  title: Record<Locale, string>;
  seoTitle: Record<Locale, string>;
  seoDescription: Record<Locale, string>;
  keywords: Record<Locale, string[]>;
  lead: Record<Locale, string>;
  blocks: Record<Locale, Block[]>;
}

/** Newest first. */
export const WEEKLY_POSTS: WeeklyPost[] = (raw as WeeklyPost[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

export const getWeeklyPost = (slug: string) => WEEKLY_POSTS.find((p) => p.slug === slug);

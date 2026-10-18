import type { Locale } from '@/i18n/config';
import raw from './flyers.json';

/**
 * The per-crop application flyers, published under Resources > Product applications.
 *
 * They are their own list rather than a field on a product: a flyer is written for a crop
 * — tomato, citrus, strawberry — and names several products at once, which is the opposite
 * way round from the datasheets already on that page.
 */
export interface Flyer {
  slug: string;
  /** French at minimum; other languages fall back to it. */
  title: Partial<Record<Locale, string>>;
  /** Path under public/, e.g. /media/flyers/tomate.pdf */
  file: string;
  /** Size of the PDF, for the weight chip. Optional. */
  bytes?: number;
}

export const FLYERS = (raw.flyers ?? []) as Flyer[];

export const flyerTitle = (flyer: Flyer, locale: Locale): string =>
  flyer.title[locale] ?? flyer.title.fr ?? flyer.slug;

import type { Locale } from '@/i18n/config';
import raw from './testimonials.json';

/**
 * Farmer testimonials, 2018–2019, from the client's deck of 2026-10-07. Shown on
 * Resources > Trial results next to the campaigns they speak about. The deck says the
 * growers are known and identified; their portraits stay off, as the deck has them.
 */
type Localized = Partial<Record<Locale, string>>;

export interface Testimonial {
  slug: string;
  year: number;
  crop: Localized;
  /** English is the deck's own wording; the other languages are translated from it. */
  quote: Localized;
  name: string;
  location: string;
  /** Crop and field photos, two per testimonial. */
  photos: string[];
}

export interface TestimonialVideo {
  year: number;
  title: Localized;
  file: string;
  poster: string;
}

export const TESTIMONIALS = (raw.testimonials ?? []) as Testimonial[];
export const TESTIMONIAL_VIDEO = (raw.video ?? null) as TestimonialVideo | null;

/** The reader's language, else the deck's English. */
export const localized = (value: Localized, locale: Locale): string =>
  value[locale] ?? value.en ?? value.fr ?? '';

import type { Locale } from '@/i18n/config';
import raw from './research.json';

/**
 * The nineteen field campaigns recovered from the old /research/ section.
 * Titles and descriptions carry every locale; the plates and the slug do not translate.
 */
export interface Trial {
  slug: string;
  order: number;
  title: Record<string, string>;
  description: Record<string, string>;
  /** The URL the trial had on the old WordPress site — kept for the redirect map. */
  url: string;
  images: string[];
}

export const TRIALS = raw as Trial[];

/** Falls back to French, the language the trials were written in. */
export const trialTitle = (trial: Trial, locale: Locale): string =>
  trial.title[locale] ?? trial.title.fr;

export const trialDescription = (trial: Trial, locale: Locale): string =>
  trial.description[locale] ?? trial.description.fr;

export const getTrial = (slug: string) => TRIALS.find((t) => t.slug === slug);

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

/**
 * Campaigns documented in Morocco, as the client states it (briefing of 2026-09-18). It
 * is a figure we are given, not a count of TRIALS: the site publishes a page for the
 * campaigns the archive kept, the programme itself ran far more of them.
 */
export const MOROCCO_CAMPAIGNS = 117;

/** Falls back to French, the language the trials were written in. */
export const trialTitle = (trial: Trial, locale: Locale): string =>
  trial.title[locale] ?? trial.title.fr;

export const trialDescription = (trial: Trial, locale: Locale): string =>
  trial.description[locale] ?? trial.description.fr;

export const getTrial = (slug: string) => TRIALS.find((t) => t.slug === slug);

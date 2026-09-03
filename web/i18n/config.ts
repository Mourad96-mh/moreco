export const LOCALES = ['fr', 'en', 'es', 'de'] as const;

export type Locale = (typeof LOCALES)[number];

/** French is the primary market (Morocco) and the language the client writes in. */
export const DEFAULT_LOCALE: Locale = 'fr';

export const LOCALE_NAMES: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
};

/** `hreflang` values — plain language codes, no region: the site targets no single country. */
export const LOCALE_HREFLANG: Record<Locale, string> = {
  fr: 'fr',
  en: 'en',
  es: 'es',
  de: 'de',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const SITE_URL = 'https://moreco.ma';

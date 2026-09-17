export const LOCALES = ['fr', 'en', 'es', 'nl'] as const;

export type Locale = (typeof LOCALES)[number];

/** French is the primary market (Morocco) and the language the client writes in. */
export const DEFAULT_LOCALE: Locale = 'fr';

export const LOCALE_NAMES: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  nl: 'Nederlands',
};

/** `hreflang` values — plain language codes, no region: the site targets no single country. */
export const LOCALE_HREFLANG: Record<Locale, string> = {
  fr: 'fr',
  en: 'en',
  es: 'es',
  nl: 'nl',
};

/**
 * Writing direction, read by the <html dir> in app/[locale]/layout.tsx.
 *
 * Arabic was withdrawn on 2026-09-17 — the client judged the translation too faulty to
 * publish — and with it the only right-to-left language the site had. The map is kept
 * rather than hard-coded to `ltr` so the day a reviewed Arabic comes back, adding the
 * locale here is all the direction handling it needs; the stylesheets are still written
 * with logical properties (inline-start/end).
 */
export const LOCALE_DIR: Record<Locale, 'ltr' | 'rtl'> = {
  fr: 'ltr',
  en: 'ltr',
  es: 'ltr',
  nl: 'ltr',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const SITE_URL = 'https://moreco.ma';

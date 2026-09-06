export const LOCALES = ['fr', 'en', 'es', 'nl', 'ar'] as const;

export type Locale = (typeof LOCALES)[number];

/** French is the primary market (Morocco) and the language the client writes in. */
export const DEFAULT_LOCALE: Locale = 'fr';

export const LOCALE_NAMES: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  nl: 'Nederlands',
  ar: 'العربية',
};

/** `hreflang` values — plain language codes, no region: the site targets no single country. */
export const LOCALE_HREFLANG: Record<Locale, string> = {
  fr: 'fr',
  en: 'en',
  es: 'es',
  nl: 'nl',
  ar: 'ar',
};

/**
 * Writing direction, read by the <html dir> in app/[locale]/layout.tsx. Arabic is the
 * only right-to-left language here; the stylesheets are written with logical properties
 * (inline-start/end) so the flip needs no per-locale CSS beyond a handful of overrides.
 */
export const LOCALE_DIR: Record<Locale, 'ltr' | 'rtl'> = {
  fr: 'ltr',
  en: 'ltr',
  es: 'ltr',
  nl: 'ltr',
  ar: 'rtl',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const SITE_URL = 'https://moreco.ma';

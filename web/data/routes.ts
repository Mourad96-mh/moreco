import { LOCALES, type Locale } from '@/i18n/config';
import { PRODUCTS, RANGES, SEGMENTS, type SegmentKey } from './products';
import { TRIALS } from './trials';
import { ARTICLES } from './articles';
import { words, segments } from './route-words.json';

/**
 * Every page of the site lives under `app/[locale]/[[...path]]`, resolved against the
 * table below. A static export cannot run middleware, so URLs are localised here and
 * baked at build time instead: /fr/produits, /en/products, /es/productos, /de/produkte.
 *
 * Brand slugs (orthagrow, mavita-health, huwa-san-pool) are never translated.
 */
export type View =
  | 'home'
  | 'products'
  | 'segment'
  | 'range'
  | 'product'
  | 'rdi'
  | 'trial'
  | 'resources'
  | 'knowledge'
  | 'article'
  | 'news'
  | 'media'
  | 'about'
  | 'services'
  | 'contact'
  | 'careers'
  | 'quote';

type Words = Record<Locale, string>;

/**
 * The localised URL words live in data/route-words.json, shared with
 * scripts/finalize-export.mjs, which needs them to pair a built page with its siblings
 * in the sitemap. One copy, so the routes and the sitemap cannot drift apart.
 */
export type WordKey =
  | 'products'
  | 'rdi'
  | 'trials'
  | 'resources'
  | 'knowledge'
  | 'news'
  | 'media'
  | 'about'
  | 'services'
  | 'contact'
  | 'careers'
  | 'quote';

export const WORDS = words as Record<WordKey, Words>;

/** The four catalogue segments, as they appear in a URL. */
export const SEGMENT_WORDS = segments as Record<SegmentKey, Words>;

export interface RouteParams {
  segment?: SegmentKey;
  range?: string;
  product?: string;
  trial?: string;
  article?: string;
}

export interface Route {
  view: View;
  locale: Locale;
  /** Path segments after the locale, e.g. ['produits', 'humains', 'mavita']. */
  path: string[];
  params: RouteParams;
  /** Same page in each of the other locales — feeds hreflang and the language switcher. */
  key: string;
}

const w = (k: WordKey, l: Locale) => WORDS[k][l];

/**
 * Builds every route of the site for one locale. `key` identifies the same page across
 * locales, so the language switcher can stay on the page the visitor is reading.
 */
function routesFor(locale: Locale): Route[] {
  const out: Route[] = [];
  const add = (view: View, key: string, path: string[], params: RouteParams = {}) =>
    out.push({ view, locale, path, params, key });

  add('home', 'home', []);
  add('products', 'products', [w('products', locale)]);
  add('rdi', 'rdi', [w('rdi', locale)]);
  add('resources', 'resources', [w('resources', locale)]);
  add('knowledge', 'knowledge', [w('resources', locale), w('knowledge', locale)]);
  add('news', 'news', [w('news', locale)]);
  add('media', 'media', [w('news', locale), w('media', locale)]);
  add('about', 'about', [w('about', locale)]);
  add('services', 'services', [w('about', locale), w('services', locale)]);
  add('contact', 'contact', [w('contact', locale)]);
  add('careers', 'careers', [w('contact', locale), w('careers', locale)]);
  add('quote', 'quote', [w('quote', locale)]);

  for (const segment of SEGMENTS) {
    const seg = SEGMENT_WORDS[segment][locale];
    add('segment', `segment:${segment}`, [w('products', locale), seg], { segment });

    for (const range of RANGES.filter((r) => r.segment === segment)) {
      add('range', `range:${range.slug}`, [w('products', locale), seg, range.slug], {
        segment,
        range: range.slug,
      });

      for (const product of PRODUCTS.filter((p) => p.range === range.slug)) {
        add('product', `product:${product.slug}`, [w('products', locale), seg, range.slug, product.slug], {
          segment,
          range: range.slug,
          product: product.slug,
        });
      }
    }
  }

  /*
   * The knowledge-centre articles sit under the page that lists them. Their slugs are
   * not translated, for the same reason product and trial slugs are not: one slug per
   * piece of content, whatever language it is read in.
   */
  for (const article of ARTICLES) {
    add(
      'article',
      `article:${article.slug}`,
      [w('resources', locale), w('knowledge', locale), article.slug],
      { article: article.slug }
    );
  }

  for (const trial of TRIALS) {
    add('trial', `trial:${trial.slug}`, [w('rdi', locale), w('trials', locale), trial.slug], {
      trial: trial.slug,
    });
  }

  return out;
}

export const ALL_ROUTES: Route[] = LOCALES.flatMap(routesFor);

const BY_HREF = new Map(ALL_ROUTES.map((r) => [`${r.locale}/${r.path.join('/')}`, r]));
const BY_KEY = new Map(ALL_ROUTES.map((r) => [`${r.locale}|${r.key}`, r]));

/** `/fr/produits/humains/mavita/` -> the Route it renders. */
export function resolveRoute(locale: Locale, path: string[] = []): Route | undefined {
  return BY_HREF.get(`${locale}/${path.join('/')}`);
}

export function href(locale: Locale, key: string): string {
  const route = BY_KEY.get(`${locale}|${key}`);
  if (!route) return `/${locale}/`;
  return route.path.length ? `/${locale}/${route.path.join('/')}/` : `/${locale}/`;
}

export const routeHref = (route: Route): string =>
  route.path.length ? `/${route.locale}/${route.path.join('/')}/` : `/${route.locale}/`;

/** The same page in another language — used by the switcher and by hreflang. */
export const translationsOf = (key: string) =>
  LOCALES.map((locale) => ({ locale, href: href(locale, key) }));

export const productHref = (locale: Locale, slug: string) => href(locale, `product:${slug}`);
export const rangeHref = (locale: Locale, slug: string) => href(locale, `range:${slug}`);
export const segmentHref = (locale: Locale, key: SegmentKey) => href(locale, `segment:${key}`);
export const trialHref = (locale: Locale, slug: string) => href(locale, `trial:${slug}`);
export const articleHref = (locale: Locale, slug: string) => href(locale, `article:${slug}`);

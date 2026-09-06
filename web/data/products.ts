import type { Locale } from '@/i18n/config';
import media from './media-manifest.json';
import copy from './product-copy.json';

/** The four markets the old moreco.ma organised its catalogue around. */
export type SegmentKey = 'agri' | 'humans' | 'animals' | 'general';

export interface ProductRange {
  slug: string;
  segment: SegmentKey;
  /** Ranges are brands — the name is the same in every language. */
  name: string;
  brandMark?: string;
}

export interface Product {
  slug: string;
  /** Brand names do not translate — `names` covers the two SKUs whose name is a common word. */
  name: string;
  names?: Partial<Record<Locale, string>>;
  segment: SegmentKey;
  range: string;
  /** Segments the product is also sold into, e.g. Huwa-San VET for livestock. */
  alsoIn?: SegmentKey[];
}

export interface ProductCopy {
  claim: string | null;
  paragraphs: string[];
  advantages: string[];
  sizes: string[];
}

export const SEGMENTS: SegmentKey[] = ['agri', 'humans', 'animals', 'general'];

/**
 * Functional families inside a segment: what a product DOES, rather than which brand
 * range it belongs to. The client reorganised Agriculture this way (WhatsApp brief of
 * 2026-09-01). Ranges still own the URLs — /produits/agriculture/<gamme>/<produit> is
 * unchanged — so a family is purely a presentation layer on the segment page.
 *
 * `soon` closes a family with a tile reading only the word SOON. The client was explicit:
 * no name, no number, no explanation on the site. For our own reference only, the three
 * placeholders stand for MYCO4G (soil), the ten-product Orthagrow 4G range
 * (biostimulants) and two further products (protection).
 */
export interface ProductFamily {
  key: FamilyKey;
  segment: SegmentKey;
  /** Product slugs, in the order the client listed them. */
  products: string[];
  soon?: boolean;
}

export type FamilyKey = 'nutrients' | 'soil' | 'biostimulants' | 'protection';

export const FAMILIES: ProductFamily[] = [
  { key: 'nutrients', segment: 'agri', products: ['orthagrow-control'] },
  {
    key: 'soil',
    segment: 'agri',
    products: ['orthagrow-granule', 'orthagrow-soil-conditioner', 'orthagrow-poudre'],
    soon: true,
  },
  {
    key: 'biostimulants',
    segment: 'agri',
    products: [
      'orthagrow-bloom-booster',
      'orthagrow-micro-manager',
      'fertifight',
      'orthagrow-fertifight',
      'orthafight',
    ],
    soon: true,
  },
  { key: 'protection', segment: 'agri', products: [], soon: true },
];

export const RANGES: ProductRange[] = [
  { slug: 'orthagrow', segment: 'agri', name: 'Orthagrow', brandMark: '/media/brand/orthagrow.webp' },
  { slug: 'orthafight', segment: 'agri', name: 'OrthaFight', brandMark: '/media/brand/orthafight.webp' },
  { slug: 'mavita', segment: 'humans', name: 'Mavita', brandMark: '/media/brand/mavita.webp' },
  { slug: 'orthahealth', segment: 'animals', name: 'OrthaHealth', brandMark: '/media/brand/orthahealth.webp' },
  { slug: 'huwa-san-pro', segment: 'general', name: 'Huwa-San Professionnel', brandMark: '/media/brand/huwa-san.webp' },
  { slug: 'huwa-san-home', segment: 'general', name: 'Huwa-San Hygiene @ Home', brandMark: '/media/brand/huwa-san.webp' },
  { slug: 'huwa-san-pool', segment: 'general', name: 'Huwa-San Pool', brandMark: '/media/brand/huwa-san.webp' },
  { slug: 'bioxeco', segment: 'general', name: 'BioXeco', brandMark: '/media/brand/bioxeco.webp' },
  { slug: 'clearox', segment: 'general', name: 'Clearox', brandMark: '/media/brand/clearox.webp' },
];

export const PRODUCTS: Product[] = [
  { slug: 'orthagrow-control', name: 'Orthagrow Control 4TH', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-bloom-booster', name: 'Orthagrow Bloom Booster', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-soil-conditioner', name: 'Orthagrow Soil Conditioner 4TH', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-micro-manager', name: 'Orthagrow Micro Manager', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-fertifight', name: 'Orthagrow FertiFight', segment: 'agri', range: 'orthagrow' },
  {
    slug: 'orthagrow-granule',
    name: 'Orthagrow Granulé',
    names: { en: 'Orthagrow Granule', es: 'Orthagrow Granule', ar: 'Orthagrow حُبيبات' },
    segment: 'agri',
    range: 'orthagrow',
  },
  {
    slug: 'orthagrow-poudre',
    name: 'Orthagrow Poudre',
    names: { en: 'Orthagrow Powder', es: 'Orthagrow Polvo', ar: 'Orthagrow مسحوق' },
    segment: 'agri',
    range: 'orthagrow',
  },
  { slug: 'orthafight', name: 'OrthaFight', segment: 'agri', range: 'orthafight' },
  { slug: 'fertifight', name: 'FertiFight', segment: 'agri', range: 'orthafight' },

  { slug: 'mavita-health', name: 'Mavita Health', segment: 'humans', range: 'mavita' },
  { slug: 'mavita-beauty', name: 'Mavita Beauty', segment: 'humans', range: 'mavita' },
  { slug: 'mavita-luxe', name: 'Mavita Luxe', segment: 'humans', range: 'mavita' },
  { slug: 'mavita-slim', name: 'Mavita Slim+', segment: 'humans', range: 'mavita' },
  { slug: 'mavita-sport', name: 'Mavita Sport', segment: 'humans', range: 'mavita' },
  { slug: 'mavita-stress-plex', name: 'Mavita Stress-Plex', segment: 'humans', range: 'mavita' },

  { slug: 'orthahealth', name: 'OrthaHealth', segment: 'animals', range: 'orthahealth' },

  { slug: 'huwa-san-agro', name: 'Huwa-San AGRO', segment: 'general', range: 'huwa-san-pro', alsoIn: ['agri'] },
  { slug: 'huwa-san-vet', name: 'Huwa-San VET', segment: 'general', range: 'huwa-san-pro', alsoIn: ['animals'] },
  { slug: 'huwa-san-fb', name: 'Huwa-San F&B', segment: 'general', range: 'huwa-san-pro' },
  { slug: 'huwa-san-hard-surface', name: 'Huwa-San Hard Surface', segment: 'general', range: 'huwa-san-pro' },
  { slug: 'huwa-san-water-treatment', name: 'Huwa-San Water Treatment', segment: 'general', range: 'huwa-san-pro', alsoIn: ['animals'] },
  { slug: 'huwa-san-hands', name: 'Huwa-San Hands', segment: 'general', range: 'huwa-san-home' },
  { slug: 'huwa-san-toilet', name: 'Huwa-San Toilet', segment: 'general', range: 'huwa-san-home' },
  { slug: 'huwa-san-bathroom', name: 'Huwa-San Bathroom', segment: 'general', range: 'huwa-san-home' },
  { slug: 'huwa-san-fruit-vegetables', name: 'Huwa-San Fruit & Vegetables', segment: 'general', range: 'huwa-san-home' },
  { slug: 'huwa-san-kitchen', name: 'Huwa-San Kitchen', segment: 'general', range: 'huwa-san-home' },
  { slug: 'huwa-san-kiddiepool', name: 'Huwa-San KiddiePOOL', segment: 'general', range: 'huwa-san-pool' },
  { slug: 'huwa-san-minipool', name: 'Huwa-San MiniPOOL', segment: 'general', range: 'huwa-san-pool' },
  { slug: 'huwa-san-pool', name: 'Huwa-San POOL', segment: 'general', range: 'huwa-san-pool' },
  { slug: 'huwa-san-whirlpool', name: 'Huwa-San WhirlPOOL', segment: 'general', range: 'huwa-san-pool' },
  { slug: 'huwa-san-wellness', name: 'Huwa-San Wellness', segment: 'general', range: 'huwa-san-pool' },
  { slug: 'bioxeco-hand', name: 'BioXeco Hand', segment: 'general', range: 'bioxeco' },
  { slug: 'bioxeco-25s', name: 'BioXeco 25S', segment: 'general', range: 'bioxeco' },
  { slug: 'bioxeco-dw', name: 'BioXeco DW', segment: 'general', range: 'bioxeco' },
  { slug: 'bioxeco-fog', name: 'BioXeco FOG', segment: 'general', range: 'bioxeco' },
  { slug: 'clearox', name: 'Clearox', segment: 'general', range: 'clearox', alsoIn: ['animals', 'agri'] },
];

type MediaEntry = { image?: string; datasheet?: string; datasheetKind?: string };
const MEDIA = media as Record<string, MediaEntry>;
const COPY = copy as Record<string, Partial<Record<Locale, ProductCopy>>>;

export const productImage = (slug: string): string | null => MEDIA[slug]?.image ?? null;
export const productDatasheet = (slug: string): string | null => MEDIA[slug]?.datasheet ?? null;

/** 'flyer' = commercial product sheet, 'sds' = safety data sheet. Labelled differently. */
export const productDatasheetKind = (slug: string): 'flyer' | 'sds' =>
  MEDIA[slug]?.datasheetKind === 'sds' ? 'sds' : 'flyer';

/**
 * All four locales are filled in — FR and EN from the archive, ES and DE translated by us.
 * The FR -> EN fallback stays as a safety net for any SKU a future extraction adds.
 */
export function productCopy(slug: string, locale: Locale): ProductCopy {
  const entry = COPY[slug] ?? {};
  return (
    entry[locale] ??
    entry.fr ??
    entry.en ?? { claim: null, paragraphs: [], advantages: [], sizes: [] }
  );
}

/** The product's name in this language — French unless the SKU carries a translation. */
export const productName = (product: Product, locale: Locale): string =>
  product.names?.[locale] ?? product.name;

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getRange = (slug: string) => RANGES.find((r) => r.slug === slug);
export const rangesOf = (segment: SegmentKey) => RANGES.filter((r) => r.segment === segment);
export const productsOfRange = (range: string) => PRODUCTS.filter((p) => p.range === range);

/** Everything sold into a segment, including products whose home range sits elsewhere. */
export const productsOfSegment = (segment: SegmentKey) =>
  PRODUCTS.filter((p) => p.segment === segment || p.alsoIn?.includes(segment));

export const familiesOf = (segment: SegmentKey) => FAMILIES.filter((f) => f.segment === segment);

/** Resolves a family's slugs to products, dropping any slug that no longer exists. */
export const productsOfFamily = (family: ProductFamily): Product[] =>
  family.products.map((slug) => getProduct(slug)).filter((p): p is Product => Boolean(p));

/**
 * Own-segment products no family claims. Should stay empty — it is the safety net that
 * keeps a newly added SKU visible instead of silently dropping out of the catalogue.
 */
export function productsOutsideFamilies(segment: SegmentKey): Product[] {
  const families = familiesOf(segment);
  if (families.length === 0) return [];
  const claimed = new Set(families.flatMap((f) => f.products));
  return PRODUCTS.filter((p) => p.segment === segment && !claimed.has(p.slug));
}

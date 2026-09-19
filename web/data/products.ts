import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';
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
 * no name, no number, no explanation on the site. For our own reference only, the two
 * placeholders left stand for the last of the ten Orthagrow 4G products (biostimulants)
 * and two further products (protection). Soil lost its placeholder on 2026-09-16, when
 * MYCO 4G arrived with a name and a pack shot.
 */
export interface ProductFamily {
  key: FamilyKey;
  segment: SegmentKey;
  /** Product slugs, in the order the client listed them. */
  products: string[];
  soon?: boolean;
  /**
   * A name that is the same in every language, and so bypasses the dictionary. Only
   * HIGH END NPK has one: the client ruled it must never be translated (2026-09-18).
   */
  name?: string;
  /**
   * Closes the family with a description block, filled from `familyNotes` in the
   * dictionaries. The client asked for one under three families on 2026-09-18 and will
   * send the text later; the block stays off the page until it has something to say.
   */
  note?: FamilyNoteKey;
}

export type FamilyNoteKey = 'specialties' | 'biostimulants' | 'npk';

export type FamilyKey =
  | 'specialties'
  | 'soil'
  | 'biostimulants'
  | 'npk'
  | 'protection'
  | 'disinfectant'
  /* Animals is organised by species rather than by what the product does. */
  | 'poultry'
  | 'pets'
  | 'equine'
  | 'cattle';

/**
 * The order the filter bar shows, set by the client's briefing of 2026-09-09 and
 * reshaped on 2026-09-18: specialties, soil, trace elements & biostimulants, HIGH END
 * NPK, protection, disinfectant.
 */
export const FAMILIES: ProductFamily[] = [
  /*
   * Specialties opens the catalogue — the family was "special nutrients" until
   * 2026-09-18, when the client renamed it and cut it down to these two.
   */
  {
    key: 'specialties',
    segment: 'agri',
    products: ['orthagrow-control', 'orthagrow-myco'],
    note: 'specialties',
  },
  {
    key: 'soil',
    segment: 'agri',
    products: ['orthagrow-granule', 'orthagrow-soil-conditioner'],
  },
  /*
   * The four Orthagrow 4G liquids joined this family from specialties on 2026-09-18, in
   * the order the client listed them. The same list opens with a plain "Orthagrow",
   * which matches no single product in the catalogue — to be clarified with the client.
   */
  {
    key: 'biostimulants',
    segment: 'agri',
    products: [
      'orthagrow-bloom-booster',
      'orthagrow-micro-manager',
      'orthagrow-fertifight',
      'orthagrow-alga-si',
      'orthagrow-aminactif',
      'orthagrow-cal',
      'orthagrow-zno',
    ],
    soon: true,
    note: 'biostimulants',
  },
  /* Every 1 kg pouch of the Orthagrow 4G range, in the order the client sent them. */
  {
    key: 'npk',
    segment: 'agri',
    name: 'HIGH END NPK',
    products: [
      'orthagrow-initio',
      'orthagrow-flor',
      'orthagrow-frucfolia',
      'orthagrow-frucferti',
      'orthagrow-matur',
    ],
    note: 'npk',
  },
  { key: 'protection', segment: 'agri', products: [], soon: true },
  /*
   * The two disinfectants already sold into crops. Their home range is Huwa-San /
   * Clearox under the Disinfectant segment, so until now they appeared at the foot of
   * the page as "other products in the range"; the family gives them a filter button.
   */
  { key: 'disinfectant', segment: 'agri', products: ['huwa-san-agro', 'clearox'] },

  /*
   * Animals, in the strict order the client gave on 2026-09-13: poultry, pets, equine,
   * cattle. The segment page opens on the four buttons alone — see SegmentView, which
   * starts the filter on `none` for this segment.
   */
  { key: 'poultry', segment: 'animals', products: ['orthahealth-volailles'] },
  { key: 'pets', segment: 'animals', products: ['orthahealth-chiens-chats'] },
  { key: 'equine', segment: 'animals', products: ['orthahealth-equides'] },
  { key: 'cattle', segment: 'animals', products: ['orthahealth-bovins'] },
];

export const RANGES: ProductRange[] = [
  { slug: 'orthagrow', segment: 'agri', name: 'Orthagrow', brandMark: '/media/brand/orthagrow.webp' },
  /* The OrthaFight range went with its two products — see the note above PRODUCTS. */
  { slug: 'mavita', segment: 'humans', name: 'Mavita', brandMark: '/media/brand/mavita.webp' },
  { slug: 'orthahealth', segment: 'animals', name: 'OrthaHealth', brandMark: '/media/brand/orthahealth.webp' },
  { slug: 'huwa-san-pro', segment: 'general', name: 'Huwa-San Professionnel', brandMark: '/media/brand/huwa-san.webp' },
  { slug: 'huwa-san-home', segment: 'general', name: 'Huwa-San Hygiene @ Home', brandMark: '/media/brand/huwa-san.webp' },
  { slug: 'huwa-san-pool', segment: 'general', name: 'Huwa-San Pool', brandMark: '/media/brand/huwa-san.webp' },
  { slug: 'bioxeco', segment: 'general', name: 'BioXeco', brandMark: '/media/brand/bioxeco.webp' },
  { slug: 'clearox', segment: 'general', name: 'Clearox', brandMark: '/media/brand/clearox.webp' },
];

/**
 * OrthaFight and FertiFight were withdrawn on 2026-09-09: the client replaced both with
 * the renamed FertFight (slug `orthagrow-fertifight`, "Orthagrow FertiFight" until that
 * date). The two shared a single datasheet PDF with each other, which is what made the
 * three names impossible to tell apart. Orthagrow Poudre followed them out on
 * 2026-09-17, struck from the catalogue by the client. Their entries in
 * product-copy.json and media-manifest.json are left in place — those files are
 * extraction output, and an unreferenced entry costs nothing.
 */
export const PRODUCTS: Product[] = [
  { slug: 'orthagrow-control', name: 'Orthagrow Control 4TH', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-bloom-booster', name: 'Orthagrow Bloom Booster', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-soil-conditioner', name: 'Orthagrow Soil Conditioner 4TH', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-micro-manager', name: 'Orthagrow Micro Manager', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-fertifight', name: 'FertFight', segment: 'agri', range: 'orthagrow' },
  {
    slug: 'orthagrow-granule',
    name: 'Orthagrow Granulé',
    names: { en: 'Orthagrow Granule', es: 'Orthagrow Granule' },
    segment: 'agri',
    range: 'orthagrow',
  },
  /*
   * The Orthagrow 4G range. The five below, sent on 2026-09-13, are water-soluble
   * foliar formulations in a 1 kg pouch, and only their analysis is public so far —
   * see product-copy.json.
   */
  { slug: 'orthagrow-initio', name: 'Orthagrow Initio 4G', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-flor', name: 'Orthagrow Flor 4G', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-frucfolia', name: 'Orthagrow Frucfolia 4G', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-frucferti', name: 'Orthagrow Frucferti 4G', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-matur', name: 'Orthagrow Matur 4G', segment: 'agri', range: 'orthagrow' },

  /*
   * The four liquids of the same range, sent on 2026-09-16, and grouped with the trace
   * elements rather than with the pouches — see FAMILIES. Each is sold in both a 1 L bottle and a
   * 10 L drum, and a product carries a single image, so the pack shot holds both formats
   * side by side at their true relative height rather than the site growing a gallery
   * for what is one photograph's worth of difference. That leaves one of the ten still
   * to come, which is what keeps the SOON tile on the biostimulants family.
   */
  { slug: 'orthagrow-cal', name: 'Orthagrow CAL 21% SC 4G', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-zno', name: 'Orthagrow ZnO 39,5% 4G', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-alga-si', name: 'Orthagrow ALGA +SI 4G', segment: 'agri', range: 'orthagrow' },
  { slug: 'orthagrow-aminactif', name: 'Orthagrow AMINACTIF-4G', segment: 'agri', range: 'orthagrow' },

  /* Named on 2026-09-16; it had been the soil family's unnamed SOON tile until then. */
  { slug: 'orthagrow-myco', name: 'Orthagrow MYCO 4G', segment: 'agri', range: 'orthagrow' },

  /*
   * Renamed from "Mavita Health" on 2026-09-17, at the client's instruction, while the
   * SKU below keeps the same name — their briefing was explicit on both points. The slug
   * is deliberately untouched: it is the URL the old site's /mavita-health-fr/ redirects
   * onto, and the client asked for a name change, not a new product. The client still
   * owes us the two new pack shots; the copy stays word for word as it was.
   */
  { slug: 'mavita-health', name: 'Mavita Sport', segment: 'humans', range: 'mavita' },
  { slug: 'mavita-beauty', name: 'Mavita Beauty', segment: 'humans', range: 'mavita' },
  { slug: 'mavita-luxe', name: 'Mavita Luxe', segment: 'humans', range: 'mavita' },
  { slug: 'mavita-slim', name: 'Mavita Slim+', segment: 'humans', range: 'mavita' },
  { slug: 'mavita-sport', name: 'Mavita Sport', segment: 'humans', range: 'mavita' },
  { slug: 'mavita-stress-plex', name: 'Mavita Stress-Plex', segment: 'humans', range: 'mavita' },

  /*
   * The single generic "OrthaHealth" SKU was retired on 2026-09-13: the client split the
   * animal catalogue by species and asked that every product read as OrthaHealth plus
   * its own sub-name. Its old URL now points at the segment page (finalize-export.mjs),
   * and its archive copy was split across the four entries below.
   */
  {
    slug: 'orthahealth-volailles',
    name: 'OrthaHealth Volailles',
    names: {
      en: 'OrthaHealth Poultry',
      es: 'OrthaHealth Aves',
      nl: 'OrthaHealth Pluimvee',
    },
    segment: 'animals',
    range: 'orthahealth',
  },
  {
    slug: 'orthahealth-chiens-chats',
    name: 'OrthaHealth Chiens & Chats',
    names: {
      en: 'OrthaHealth Dogs & Cats',
      es: 'OrthaHealth Perros y Gatos',
      nl: 'OrthaHealth Honden & Katten',
    },
    segment: 'animals',
    range: 'orthahealth',
  },
  {
    slug: 'orthahealth-equides',
    /* "Équidés" became "Chevaux" on 2026-09-18, with the family it sits in. */
    name: 'OrthaHealth Chevaux',
    names: {
      en: 'OrthaHealth Horses',
      es: 'OrthaHealth Caballos',
      nl: 'OrthaHealth Paarden',
    },
    segment: 'animals',
    range: 'orthahealth',
  },
  {
    slug: 'orthahealth-bovins',
    name: 'OrthaHealth Bovins',
    names: {
      en: 'OrthaHealth Cattle',
      es: 'OrthaHealth Bovinos',
      nl: 'OrthaHealth Rundvee',
    },
    segment: 'animals',
    range: 'orthahealth',
  },

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

/** The family's name in this language — or its fixed name, for the one that has one. */
export const familyName = (family: ProductFamily, t: Dictionary): string =>
  family.name ?? t.families[family.key as keyof Dictionary['families']];

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

import { getRange, type Product, type SegmentKey } from './products';
import type { Trial } from './trials';

/**
 * The photograph behind each page's banner — the interior-page answer to the home
 * page's video hero.
 *
 * The pictures are CC0, taken from the Unsplash archive on Wikimedia Commons and
 * cropped to 2000×840 by scripts/import-heroes.mjs; public/media/heroes/CREDITS.json
 * records the file, author and licence of each one.
 *
 * A page never has to carry its own picture: a product falls back to its range, a range
 * to its segment, so a new SKU is illustrated the day it is added.
 */
const DIR = '/media/heroes';

/** Pages that stand on their own, keyed by the view that renders them. */
const PAGE_HERO: Record<string, string> = {
  products: `${DIR}/products.webp`,
  rdi: `${DIR}/rdi.webp`,
  resources: `${DIR}/resources.webp`,
  knowledge: `${DIR}/knowledge.webp`,
  news: `${DIR}/news.webp`,
  media: `${DIR}/media.webp`,
  about: `${DIR}/about.webp`,
  services: `${DIR}/services.webp`,
  contact: `${DIR}/contact.webp`,
  careers: `${DIR}/careers.webp`,
  quote: `${DIR}/quote.webp`,
};

const SEGMENT_HERO: Record<SegmentKey, string> = {
  agri: `${DIR}/seg-agri.webp`,
  humans: `${DIR}/seg-humans.webp`,
  animals: `${DIR}/seg-animals.webp`,
  general: `${DIR}/seg-general.webp`,
};

/** One scene per brand range: what the range is used on, not the pack shot. */
const RANGE_HERO: Record<string, string> = {
  orthagrow: `${DIR}/orthagrow.webp`,
  orthafight: `${DIR}/orthafight.webp`,
  mavita: `${DIR}/mavita.webp`,
  orthahealth: `${DIR}/orthahealth.webp`,
  'huwa-san-pro': `${DIR}/huwa-san-pro.webp`,
  'huwa-san-home': `${DIR}/huwa-san-home.webp`,
  'huwa-san-pool': `${DIR}/huwa-san-pool.webp`,
  bioxeco: `${DIR}/bioxeco.webp`,
  clearox: `${DIR}/clearox.webp`,
};

export const pageHero = (view: string): string | undefined => PAGE_HERO[view];

export const segmentHero = (segment: SegmentKey): string => SEGMENT_HERO[segment];

export const rangeHero = (slug: string): string => {
  const range = getRange(slug);
  return RANGE_HERO[slug] ?? (range ? SEGMENT_HERO[range.segment] : PAGE_HERO.products);
};

export const productHero = (product: Product): string =>
  RANGE_HERO[product.range] ?? SEGMENT_HERO[product.segment];

/**
 * A trial opens on a photograph of its crop. The archive's own plates are 751 px wide
 * and several are two pictures joined, which shows as a seam once stretched across the
 * band, so they stay in the page body — at their native size, where they are evidence —
 * and the banner uses the crop shot. Three crops (olives, onions, melons) had no usable
 * CC0 photograph; those pages fall back to the plate.
 */
const TRIAL_CROPS = new Set([
  'pommiers', 'fraises', 'tomates', 'agrumes', 'pechers', 'pommes-de-terre', 'carottes',
  'ble', 'poivrons', 'mais-ensilage', 'cactus', 'quinoa', 'raisins', 'prunes',
  'framboises', 'gazon',
]);

export const trialHero = (trial: Trial): string =>
  TRIAL_CROPS.has(trial.slug)
    ? `${DIR}/trials/${trial.slug}.webp`
    : trial.images[0] ?? PAGE_HERO.rdi;

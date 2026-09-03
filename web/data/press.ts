import type { Locale } from '@/i18n/config';
import pages from './pages.json';
import assets from './press-assets.json';

/**
 * The media page: two trade shows Moreco exhibited at in 2014, their sessions, the stand
 * dossiers and the brochure.
 *
 * The crawl flattened all of it into one column of headings, paragraphs and lists, and
 * dropped every link — the downloads became the words "Telecharger ici", the video became
 * the heading "Moreco @ SIAM". The block order is identical in all four languages
 * (verified: 27 blocks, same types, same order), so the page is read back by position and
 * the lost links are restored here.
 */
export interface PressSession {
  /** "Première présentation Moreco au SIAM Meknès". */
  title: string | null;
  /** Date, time, room, speaker — one line each, as the archive listed them. */
  details: string[];
  /** "Traduction par: …". */
  note: string | null;
}

export interface PressEvent {
  /** "SIAM Meknès : du 24 avril au 3 mai". */
  title: string;
  subtitle: string | null;
  sessions: PressSession[];
  photo: string | null;
  photoCaption: string | null;
  /** The stand dossier the old page linked to. */
  dossier: { pdf: string; bytes: number } | null;
}

export interface PressContent {
  events: PressEvent[];
  /** Keyed, not labelled: the wording comes from the dictionary, in four languages. */
  downloads: { key: 'product-brochure' | 'sales-terms'; pdf: string; bytes: number }[];
  /** The article whose PDF the page also offered — now a page of its own. */
  articleLink: { label: string; slug: string } | null;
  video: { title: string; embed: string } | null;
}

type Block = { type: string; text?: string; items?: string[]; src?: string };
type PageStore = Record<string, Partial<Record<Locale, Block[]>>>;
const PAGES = pages as PageStore;
const ASSETS = assets as Record<string, { pdf: string; bytes: number }>;

/** The embed the crawl could not keep: "Moreco @ SIAM", from raw/…/index.html. */
const VIDEO = 'https://www.youtube.com/embed/ZSDpw1z8UGA?rel=0';

const text = (block: Block | undefined) => block?.text?.trim() || null;
const items = (block: Block | undefined) => block?.items ?? [];

export function pressContent(locale: Locale): PressContent {
  const b = PAGES.media?.[locale] ?? PAGES.media?.fr ?? [];
  if (b.length < 27) return { events: [], downloads: [], articleLink: null, video: null };

  const siam: PressEvent = {
    title: text(b[1]) ?? '',
    subtitle: null,
    sessions: [
      { title: text(b[2]), details: items(b[4]), note: text(b[5]) },
      { title: text(b[6]), details: items(b[8]), note: text(b[9]) },
    ],
    photo: b[13]?.src ?? null,
    photoCaption: text(b[12]),
    dossier: ASSETS['siam-stand'] ?? null,
  };

  const saudi: PressEvent = {
    title: text(b[14]) ?? '',
    subtitle: text(b[15]),
    sessions: [{ title: null, details: items(b[17]), note: text(b[18]) }],
    photo: b[22]?.src ?? null,
    photoCaption: text(b[21]),
    dossier: ASSETS['saudi-stand'] ?? null,
  };

  /* The brochure and the sales terms sat in the page's closing downloads block. */
  const downloads = (['product-brochure', 'sales-terms'] as const)
    .filter((key) => ASSETS[key])
    .map((key) => ({ key, ...ASSETS[key] }));

  const articleLabel = items(b[25])[0] ?? null;

  return {
    events: [siam, saudi],
    downloads,
    articleLink: articleLabel
      ? { label: articleLabel, slug: 'importance-du-silicium' }
      : null,
    video: text(b[26]) ? { title: text(b[26])!, embed: VIDEO } : null,
  };
}

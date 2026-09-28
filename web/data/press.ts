import type { Locale } from '@/i18n/config';
import pages from './pages.json';
import assets from './press-assets.json';

/**
 * The media page: the Médina FM interviews and the press coverage on top (briefing of
 * 2026-09-28), then the two trade shows Moreco exhibited at in 2014, their sessions and
 * the stand dossiers.
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
  video: { title: string; embed: string } | null;
}

/**
 * The two Médina FM interviews, recorded upright on a phone at the radio's stand and
 * compressed from 2.8 GB to web size (540×960, ~0.4 Mbit/s: speech, a mostly still
 * frame). The client asked for three; two exist, the third comes when they send it.
 */
export interface RadioInterview {
  src: string;
  poster: string;
  /** Running time, shown on the card. */
  minutes: number;
}

export const RADIO_INTERVIEWS: RadioInterview[] = [
  { src: '/media/press/medina-fm-1.mp4', poster: '/media/press/medina-fm-1.webp', minutes: 15 },
  { src: '/media/press/medina-fm-2.mp4', poster: '/media/press/medina-fm-2.webp', minutes: 7 },
];

/**
 * Articles about Moreco in the press, linked rather than copied: the text belongs to the
 * paper. Headlines stay in the language they were printed in; newest first.
 */
export interface PressArticle {
  title: string;
  outlet: string;
  /** ISO date, from the article's own published_time. */
  date: string;
  url: string;
  lang: 'fr' | 'en';
}

export const PRESS_ARTICLES: PressArticle[] = [
  {
    title: 'MORECO : la start-up marocaine œuvre pour une agriculture verte',
    outlet: 'Agrimaroc',
    date: '2016-07-13',
    url: 'https://www.agrimaroc.ma/moreco-la-start-up-marocaine-oeuvre-pour-une-agriculture-verte/',
    lang: 'fr',
  },
  {
    title: 'Fertilisants écologiques : Moreco commercialise ses produits au Maroc',
    outlet: "Aujourd'hui le Maroc",
    date: '2015-11-29',
    url: 'https://aujourdhui.ma/economie/fertilisants-ecologiques-moreco-commercialise-ses-produits-au-maroc-122121',
    lang: 'fr',
  },
  {
    title: 'Kasim Chihabi: Journey from Scratch to Business Success in Morocco',
    outlet: 'Morocco World News',
    date: '2015-08-25',
    url: 'https://www.moroccoworldnews.com/2015/08/116181/kasim-chihabi-journey-from-scratch-to-business-success-in-morocco/',
    lang: 'en',
  },
];

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
  if (b.length < 27) return { events: [], video: null };

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

  /*
   * The page's closing downloads block (b[23]–b[25]) is not read: the brochure and the
   * sales terms came off with the briefing of 2026-09-28 (points 5 and 6), and the
   * Van den Berghe interview it linked lives under R&D + I › Publications (point 4).
   */
  return {
    events: [siam, saudi],
    video: text(b[26]) ? { title: text(b[26])!, embed: VIDEO } : null,
  };
}

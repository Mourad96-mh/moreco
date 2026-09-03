import type { Locale } from '@/i18n/config';
import type { SegmentKey } from './products';
import pages from './pages.json';

/**
 * The Applications page (/applications-produits on the old site), read back into the
 * five sections it was written as.
 *
 * The crawl could only see prose, so each section arrived as a picture, a heading, a
 * paragraph or two and a bare "EN SAVOIR PLUS" line that linked nowhere. The wording of
 * that line is the archive's own and already translated, so it is kept — and pointed at
 * the page it was always meant to open.
 */
export interface ServiceSection {
  title: string;
  paragraphs: string[];
  image: string;
  /** The archive's own call to action, e.g. "EN SAVOIR PLUS". */
  cta: string | null;
  /** Where that call now goes: a catalogue domain, or the R&D pages. */
  target: SegmentKey | 'rdi' | null;
}

export interface ServicesContent {
  introTitle: string | null;
  introText: string | null;
  sections: ServiceSection[];
}

type Block = { type: string; text?: string; items?: string[]; src?: string };
type PageStore = Record<string, Partial<Record<Locale, Block[]>>>;
const PAGES = pages as PageStore;

/**
 * Which picture belongs to which destination. Matching on the filename rather than on
 * the heading keeps this working in all four languages.
 */
const TARGETS: Record<string, SegmentKey | 'rdi'> = {
  'humans.webp': 'humans',
  'agri-horticulture.webp': 'agri',
  'animals.webp': 'animals',
  'general.webp': 'general',
  'research.webp': 'rdi',
};

const targetFor = (src: string): SegmentKey | 'rdi' | null =>
  TARGETS[src.split('/').pop() ?? ''] ?? null;

export function servicesContent(locale: Locale): ServicesContent {
  const blocks = PAGES.services?.[locale] ?? PAGES.services?.fr ?? [];

  const firstImage = blocks.findIndex((b) => b.type === 'image');
  const head = blocks.slice(0, firstImage < 0 ? blocks.length : firstImage);

  /* The opening h2 only repeats the page title; the h3 under it is the real statement. */
  const introTitle = head.filter((b) => b.type === 'heading').at(-1)?.text ?? null;
  const introText = head.find((b) => b.type === 'paragraph')?.text ?? null;

  const sections: ServiceSection[] = [];

  blocks.forEach((block, i) => {
    if (block.type !== 'image' || !block.src) return;

    const run = [];
    for (let j = i + 1; j < blocks.length && blocks[j].type !== 'image'; j++) run.push(blocks[j]);

    const title = run.find((b) => b.type === 'heading')?.text;
    if (!title) return;

    const paragraphs = run.filter((b) => b.type === 'paragraph').map((b) => b.text ?? '');
    const target = targetFor(block.src);

    sections.push({
      title,
      /* The last paragraph is the call to action, not prose — unless there is only one. */
      paragraphs: paragraphs.length > 1 ? paragraphs.slice(0, -1) : paragraphs,
      image: block.src,
      cta: paragraphs.length > 1 ? paragraphs[paragraphs.length - 1] : null,
      target,
    });
  });

  return { introTitle, introText, sections };
}

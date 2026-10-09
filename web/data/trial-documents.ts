import type { Locale } from '@/i18n/config';
import raw from './trial-documents.json';

/**
 * The trial reports themselves — PDFs and scanned tables — published as downloads under
 * Resources > Trial results (client's e-mail of 2026-10-07). They are their own list
 * rather than a field on a trial: several cover crops the photo campaigns do not, and one
 * report can span two crops.
 */
export interface TrialDocument {
  slug: string;
  /** French at minimum; other languages fall back to it. */
  title: Partial<Record<Locale, string>>;
  /** As written on the document. Absent when the document carries none. */
  date?: Partial<Record<Locale, string>>;
  /** Path under public/, e.g. /media/research/documents/mais-ensilage-2016.pdf */
  file: string;
  /** Size of the file, for the weight chip. */
  bytes?: number;
}

export const TRIAL_DOCUMENTS = (raw.documents ?? []) as TrialDocument[];

export const trialDocumentTitle = (doc: TrialDocument, locale: Locale): string =>
  doc.title[locale] ?? doc.title.fr ?? doc.slug;

export const trialDocumentDate = (doc: TrialDocument, locale: Locale): string | undefined =>
  doc.date?.[locale] ?? doc.date?.fr;

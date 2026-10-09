import type { Locale } from '@/i18n/config';
import raw from './publication-documents.json';

/**
 * Scientific papers published as plain downloads (client's e-mail of 2026-10-07): unlike
 * the articles in PUBLICATIONS, they have no page of their own on the site — the card
 * leads straight to the document.
 */
export interface PublicationDocument {
  slug: string;
  /** In the language the paper was published in; not translated. */
  title: string;
  /** Authors and venue, as printed on the document. */
  source: string;
  /** As printed on the document, per language; French at minimum. */
  date: Partial<Record<Locale, string>>;
  /** Path under public/, e.g. /media/research/publications/….pdf */
  file: string;
  bytes?: number;
}

export const PUBLICATION_DOCUMENTS = (raw.documents ?? []) as PublicationDocument[];

export const publicationDocumentDate = (doc: PublicationDocument, locale: Locale): string =>
  doc.date[locale] ?? doc.date.fr ?? '';

import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';
import { SEGMENTS } from './products';
import { href, segmentHref } from './routes';

/**
 * The casem.ma header shape: five or six top-level items, each opening a small
 * hover dropdown, plus the quote button pinned to the right.
 */
export interface NavLink {
  label: string;
  href: string;
  /** One-line tagline. Only the mega panel shows it. */
  description?: string;
  /** Segment colour, so the panel carries the identity that does the navigating. */
  accent?: string;
}

export interface NavItem extends NavLink {
  children?: NavLink[];
  /** Renders the children as a two-column panel with colour chips and taglines. */
  mega?: boolean;
  /** A closing row inside the mega panel — "all products". */
  footer?: NavLink;
}

export function mainNav(locale: Locale, t: Dictionary): NavItem[] {
  const at = (key: string, hash?: string) => href(locale, key) + (hash ?? '');

  return [
    {
      label: t.nav.products,
      href: at('products'),
      mega: true,
      children: SEGMENTS.map((segment) => ({
        label: t.segments[segment].name,
        href: segmentHref(locale, segment),
        description: t.segments[segment].short,
        accent: `var(--seg-${segment})`,
      })),
      footer: { label: t.product.allProducts, href: at('products') },
    },
    /*
     * Resources, as the client reshaped it on 2026-09-17: the knowledge centre lost its
     * menu entry and the trial results took the slot. The centre itself is still online
     * and still linked from every article page — it simply no longer opens a menu of
     * its own. Renamed on 2026-09-27: product sheets, crop sheets, trial results.
     */
    {
      label: t.nav.resources,
      href: at('resources'),
      children: [
        { label: t.nav.catalogues, href: at('resources', '#catalogues') },
        { label: t.nav.cropSheets, href: at('resources', '#applications') },
        { label: t.nav.trials, href: at('trials') },
      ],
    },
    {
      label: t.nav.rdi,
      href: at('rdi'),
      /*
       * Reordered by the client on 2026-09-18: Innovation first, opening on the
       * department's own copy, and the scientific publications last. The silicon
       * interview that used to head this menu is listed among those publications now.
       */
      children: [
        { label: t.nav.innovation, href: at('rdi', '#innovation') },
        { label: t.nav.publications, href: at('rdi', '#publications') },
      ],
    },
    {
      label: t.nav.news,
      href: at('news'),
      children: [
        { label: t.nav.newsList, href: at('news') },
        { label: t.nav.mediaKit, href: at('media') },
      ],
    },
    {
      label: t.nav.about,
      href: at('about'),
      children: [
        { label: t.nav.aboutMoreco, href: at('about') },
        { label: t.nav.services, href: at('services') },
      ],
    },
    {
      label: t.nav.contact,
      href: at('contact'),
      children: [
        { label: t.nav.contactUs, href: at('contact') },
        { label: t.nav.careers, href: at('careers') },
      ],
    },
  ];
}

/**
 * Company details, shown in the top bar, the contact page and the footer.
 * Name, address and number as the client set them in the e-mail of 2026-10-09: Moreco
 * Maroc rather than Moreco Sarl, the Casablanca office, and a single landline — the
 * mobiles are no longer published.
 */
export const CONTACT = {
  company: 'Moreco Maroc',
  address: ['283 Bd Yacoub El Mansouri, 4ᵉ étage', '20200 Casablanca', 'Maroc'],
  phones: [{ label: '+212 702 11 28 61', href: 'tel:+212702112861' }],
  email: 'info@moreco.ma',
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/Moreco.Maroc', icon: 'facebook' as const },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/moreco_biotechnology',
      icon: 'instagram' as const,
    },
    { label: 'YouTube', href: 'https://www.youtube.com/@morecomaroc6237', icon: 'youtube' as const },
    /* The client has no company page yet: the briefing of 2026-09-13 asks for this
       bare link and nothing else, so it stays until they send a real profile URL. */
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' as const },
  ],
};

/** The number shown in the header's utility bar. */
export const PRIMARY_PHONE = CONTACT.phones[0];

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
    {
      label: t.nav.resources,
      href: at('resources'),
      children: [
        { label: t.nav.catalogues, href: at('resources', '#catalogues') },
        { label: t.nav.applications, href: at('resources', '#applications') },
        { label: t.nav.knowledge, href: at('knowledge') },
      ],
    },
    {
      label: t.nav.rdi,
      href: at('rdi'),
      children: [
        { label: t.nav.trials, href: at('rdi', '#trials') },
        /* The knowledge centre no longer pins this interview at #silicon: one
           chronological list, so the menu points at the article itself. */
        { label: t.nav.silicon, href: at('article:importance-du-silicium') },
        /* The studies moved off the knowledge centre on 2026-09-09; this follows them. */
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
 * Company details, shown in the top bar and the footer.
 * Taken from the archived contact page (raw/contact/index.html) — to be confirmed with
 * the client before launch, the site had not been updated since 2019.
 */
export const CONTACT = {
  company: 'Moreco Sarl',
  address: ['N° 2 Route El Jadida, 1ᵉʳ étage', 'Bd Mohammed VI', '26402 Had Soualem', 'Maroc'],
  phones: [
    { label: '+212 522 964 500', href: 'tel:+212522964500' },
    { label: '+212 522 032 623', href: 'tel:+212522032623' },
  ],
  mobiles: [
    { label: '+212 6 13 75 75 75', href: 'tel:+212613757575' },
    { label: '+212 6 77 57 67 39', href: 'tel:+212677576739' },
  ],
  email: 'info@moreco.ma',
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/Moreco.Maroc', icon: 'facebook' as const },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/moreco_biotechnology',
      icon: 'instagram' as const,
    },
    { label: 'YouTube', href: 'https://www.youtube.com/@morecomaroc6237', icon: 'youtube' as const },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' as const },
  ],
};

/** The number shown in the header's utility bar. */
export const PRIMARY_PHONE = CONTACT.phones[0];

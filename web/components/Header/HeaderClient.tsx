'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { LOCALES, LOCALE_NAMES, isLocale, type Locale } from '@/i18n/config';
import type { NavItem } from '@/data/nav';
import { resolveRoute, translationsOf } from '@/data/routes';
import { useQuote } from '@/components/Quote/QuoteProvider';
import SocialIcon, { type SocialName } from '@/components/SocialIcon/SocialIcon';
import s from './Header.module.css';

interface Props {
  locale: Locale;
  nav: NavItem[];
  homeHref: string;
  quoteHref: string;
  phone: { label: string; href: string };
  social: { label: string; href: string; icon: SocialName }[];
  labels: {
    quote: string;
    quoteShort: string;
    openMenu: string;
    closeMenu: string;
    search: string;
    language: string;
    mainNav: string;
    siteName: string;
  };
}

export default function HeaderClient({
  locale,
  nav,
  homeHref,
  quoteHref,
  phone,
  social,
  labels,
}: Props) {
  const pathname = usePathname();
  const { count, ready } = useQuote();

  /**
   * casem's header floats over the hero and turns solid on scroll (their theme calls it
   * "phantom"). Only pages that open with a hero can afford that, so it is limited to
   * the locale home page.
   */
  const isHome = pathname === homeHref || pathname === homeHref.replace(/\/$/, '');
  const [scrolled, setScrolled] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [drawer, setDrawer] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Any navigation closes whatever was open.
  useEffect(() => {
    setDrawer(false);
    setOpenIndex(null);
  }, [pathname]);

  useEffect(() => {
    if (!drawer) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawer(false);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [drawer]);

  /** Hover opens a dropdown; a short delay on leaving stops it flickering between items. */
  const openNow = (i: number) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenIndex(i);
  };
  const closeSoon = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 140);
  };
  const closeNow = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenIndex(null);
  };

  /* An open panel is dismissed by Escape or by a click anywhere outside the nav — the two
   * things people try when a hover menu is in the way. */
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNow();
    };
    const onDown = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) closeNow();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  /** Highlights the section you are in, including when the page sits under a child link. */
  const matches = (link: string) => {
    const base = link.split('#')[0].replace(/\/$/, '');
    const here = pathname.replace(/\/$/, '');
    return base !== '' && (here === base || here.startsWith(`${base}/`));
  };
  const isCurrent = (item: NavItem) =>
    item.href !== homeHref &&
    (matches(item.href) || (item.children?.some((c) => matches(c.href)) ?? false));

  /**
   * Picking a language here is an explicit choice, so it is remembered: the bare domain
   * reads it back and honours it instead of guessing from the browser's own setting.
   * Deep links are never redirected, so this only ever decides what moreco.ma opens on.
   */
  const rememberLocale = (value: Locale) => {
    try {
      localStorage.setItem('moreco:lang', value);
    } catch {
      /* Private mode, or storage disabled: the switch still works, it is just not kept. */
    }
  };

  /** Language switcher: stay on the same page rather than dumping people on the home. */
  const alternates = (() => {
    const parts = pathname.split('/').filter(Boolean);
    const [first, ...rest] = parts;
    const current = first && isLocale(first) ? resolveRoute(first as Locale, rest) : undefined;
    if (current) return translationsOf(current.key);
    return LOCALES.map((l) => ({ locale: l, href: `/${l}/` }));
  })();

  const transparent = isHome && !scrolled && !drawer;

  return (
    <header
      className={[
        s.header,
        transparent ? s.isTransparent : s.isSolid,
        scrolled ? s.isScrolled : '',
      ].join(' ')}
      data-transparent={transparent ? 'true' : 'false'}
    >
      <div className={s.topbar}>
        <div className={`page ${s.topbarInner}`}>
          <div className={s.topLeft}>
            <ul className={s.social}>
              {social.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
                    <SocialIcon name={item.icon} />
                  </a>
                </li>
              ))}
            </ul>

            <a className={s.topLink} href={phone.href}>
              <PhoneIcon />
              <span>{phone.label}</span>
            </a>
          </div>

          <div className={s.topRight}>
            <nav className={s.langs} aria-label={labels.language}>
              {alternates.map(({ locale: l, href: h }) => (
                <Link
                  key={l}
                  href={h}
                  hrefLang={l}
                  className={l === locale ? s.langActive : s.lang}
                  aria-current={l === locale ? 'true' : undefined}
                  onClick={() => rememberLocale(l)}
                >
                  <span aria-hidden="true">{l.toUpperCase()}</span>
                  <span className="visually-hidden">{LOCALE_NAMES[l]}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className={s.main}>
        <div className={`page ${s.mainInner}`}>
          <Link href={homeHref} className={s.logo} aria-label={labels.siteName}>
            <Image
              src="/media/brand/moreco-logo.webp"
              alt={labels.siteName}
              width={535}
              height={200}
              priority
              className={s.logoImg}
            />
          </Link>

          <nav className={s.nav} aria-label={labels.mainNav} ref={navRef}>
            <ul className={s.navList}>
              {nav.map((item, i) => (
                <li
                  key={item.label}
                  className={s.navItem}
                  onMouseEnter={() => item.children && openNow(i)}
                  onMouseLeave={closeSoon}
                >
                  <Link
                    href={item.href}
                    className={s.navLink}
                    aria-expanded={item.children ? openIndex === i : undefined}
                    aria-haspopup={item.children ? 'true' : undefined}
                    aria-current={isCurrent(item) ? 'true' : undefined}
                    onFocus={() => item.children && openNow(i)}
                  >
                    <span className={s.navLabel}>{item.label}</span>
                    {item.children && <ChevronIcon />}
                  </Link>

                  {item.children && (
                    <div
                      className={[
                        s.panelWrap,
                        item.mega ? s.panelWrapMega : '',
                        openIndex === i ? s.panelOpen : '',
                      ].join(' ')}
                    >
                      {/* The card sits inside a padded wrapper: that padding is the bridge
                          the pointer crosses on its way down, so the panel cannot flicker. */}
                      <div className={item.mega ? s.mega : s.panel}>
                        {item.mega ? (
                          <>
                            <ul className={s.megaGrid}>
                              {item.children.map((child) => (
                                <li key={child.label}>
                                  <Link
                                    href={child.href}
                                    className={s.megaLink}
                                    style={{ '--accent': child.accent } as React.CSSProperties}
                                  >
                                    <span className={s.megaDot} aria-hidden="true" />
                                    <span className={s.megaText}>
                                      <span className={s.megaName}>{child.label}</span>
                                      {child.description && (
                                        <span className={s.megaDesc}>{child.description}</span>
                                      )}
                                    </span>
                                    <ArrowIcon />
                                  </Link>
                                </li>
                              ))}
                            </ul>

                            {item.footer && (
                              <Link href={item.footer.href} className={s.megaFooter}>
                                <span>{item.footer.label}</span>
                                <ArrowIcon />
                              </Link>
                            )}
                          </>
                        ) : (
                          <ul className={s.panelList}>
                            {item.children.map((child) => (
                              <li key={child.label}>
                                <Link href={child.href} className={s.panelLink}>
                                  <span>{child.label}</span>
                                  <ArrowIcon />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <Link href={quoteHref} className={s.quote}>
            <CartIcon />
            <span className={s.quoteLabel}>{labels.quote}</span>
            <span className={s.quoteLabelShort}>{labels.quoteShort}</span>
            {ready && count > 0 && <span className={s.badge}>{count}</span>}
          </Link>

          <button
            type="button"
            className={s.burger}
            aria-expanded={drawer}
            aria-controls="mobile-drawer"
            onClick={() => setDrawer((v) => !v)}
          >
            <span className="visually-hidden">{drawer ? labels.closeMenu : labels.openMenu}</span>
            <span className={s.burgerBars} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="mobile-drawer"
        className={[s.drawer, drawer ? s.drawerOpen : ''].join(' ')}
        hidden={!drawer}
      >
        {/* The drawer paints over the header, so it carries its own logo and close button —
            otherwise the burger that opened it is hidden underneath. */}
        <div className={s.drawerTop}>
          <Link href={homeHref} className={s.drawerLogo} aria-label={labels.siteName}>
            <Image
              src="/media/brand/moreco-logo.webp"
              alt={labels.siteName}
              width={535}
              height={200}
              className={s.drawerLogoImg}
            />
          </Link>
          <button type="button" className={s.drawerClose} onClick={() => setDrawer(false)}>
            <span className="visually-hidden">{labels.closeMenu}</span>
            <CloseIcon />
          </button>
        </div>

        <nav aria-label={labels.mainNav}>
          <ul className={s.drawerList}>
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={s.drawerLink}
                  aria-current={isCurrent(item) ? 'true' : undefined}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className={s.drawerSub}>
                    {item.children.map((child) => (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className={s.drawerSubLink}
                          style={{ '--accent': child.accent } as React.CSSProperties}
                        >
                          {child.accent && <span className={s.drawerDot} aria-hidden="true" />}
                          <span>{child.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <Link href={quoteHref} className={`btn ${s.drawerQuote}`}>
          <CartIcon />
          {labels.quote}
          {ready && count > 0 && <span className={s.badge}>{count}</span>}
        </Link>

        <a className={s.drawerPhone} href={phone.href}>
          <PhoneIcon />
          {phone.label}
        </a>

        {/* The utility bar is behind the drawer, so the language switcher is repeated here. */}
        <nav className={s.drawerLangs} aria-label={labels.language}>
          {alternates.map(({ locale: l, href: h }) => (
            <Link
              key={l}
              href={h}
              hrefLang={l}
              className={l === locale ? s.drawerLangActive : s.drawerLang}
              aria-current={l === locale ? 'true' : undefined}
              onClick={() => rememberLocale(l)}
            >
              <span aria-hidden="true">{l.toUpperCase()}</span>
              <span className="visually-hidden">{LOCALE_NAMES[l]}</span>
            </Link>
          ))}
        </nav>
      </div>

      {drawer && <button className={s.scrim} onClick={() => setDrawer(false)} aria-hidden="true" tabIndex={-1} />}
    </header>
  );
}

/* ---------- icons ---------- */

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

const CartIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M1 1h3l2.7 12.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L22 6H5.5" />
    <circle cx="9.5" cy="20" r="1.6" />
    <circle cx="18" cy="20" r="1.6" />
  </svg>
);

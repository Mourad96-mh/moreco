import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { CONTACT, mainNav } from '@/data/nav';
import { href, segmentHref } from '@/data/routes';
import { SEGMENTS } from '@/data/products';
import s from './Footer.module.css';

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const nav = mainNav(locale, t);

  return (
    <footer className={s.footer}>
      <div className={`page ${s.top}`}>
        <div className={s.brand}>
          <Link href={href(locale, 'home')} aria-label={t.site.name}>
            <Image
              src="/media/brand/moreco-logo.webp"
              alt={t.site.name}
              width={535}
              height={200}
              className={s.logo}
            />
          </Link>
          <p className={s.tagline}>{t.site.tagline}</p>
        </div>

        <nav className={s.col} aria-label={t.footer.navTitle}>
          <h2 className={s.colTitle}>{t.footer.navTitle}</h2>
          <ul className={s.list}>
            {nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={s.col} aria-label={t.footer.productsTitle}>
          <h2 className={s.colTitle}>{t.footer.productsTitle}</h2>
          <ul className={s.list}>
            {SEGMENTS.map((segment) => (
              <li key={segment}>
                <Link href={segmentHref(locale, segment)}>{t.segments[segment].name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s.col}>
          <h2 className={s.colTitle}>{t.footer.contactTitle}</h2>
          <address className={s.address}>
            <strong>{CONTACT.company}</strong>
            {CONTACT.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <ul className={s.list}>
            {CONTACT.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href}>{p.label}</a>
              </li>
            ))}
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={s.bar}>
        <div className={`page ${s.barInner}`}>
          <p>
            © {new Date().getFullYear()} {CONTACT.company}. {t.footer.rights}
          </p>
          <a href="#main" className={s.toTop}>
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}

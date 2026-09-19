import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { CONTACT } from '@/data/nav';
import { href } from '@/data/routes';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import ContactForm from '@/components/Contact/ContactForm';
import Reveal from '@/components/Reveal/Reveal';
import SocialIcon from '@/components/SocialIcon/SocialIcon';
import s from './ContactView.module.css';

/**
 * Contact.
 *
 * The page used to be three cards of details and nothing else — no way to actually write
 * to anyone, and the same address the footer carries two hundred pixels below. The form
 * is the page now; the details sit beside it, and the parts the footer does not repeat
 * (the mobiles, the way through to a quote) earn their place.
 */
export default function ContactView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <PageHeader
        title={t.pages.contact.title}
        lead={t.pages.contact.lead}
        image={pageHero('contact')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          { label: t.pages.contact.title },
        ]}
      />

      <div className="section">
        <div className={`page ${s.layout}`}>
          <Reveal className={s.formSide}>
            <h2 className={s.formTitle}>{t.contact.formTitle}</h2>
            <ContactForm locale={locale} labels={t.quote} />
          </Reveal>

          <Reveal className={s.details} delay={90}>
            <address className={s.card}>
              <h3 className={s.cardTitle}>{CONTACT.company}</h3>
              <div className={s.lines}>
                {CONTACT.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </div>
            </address>

            <div className={s.card}>
              <h3 className={s.cardTitle}>{t.quote.phone}</h3>
              <ul className={s.plain}>
                {CONTACT.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href}>{p.label}</a>
                  </li>
                ))}
              </ul>

              <p className={s.mobileLabel}>{t.contact.mobile}</p>
              <ul className={s.plain}>
                {CONTACT.mobiles.map((p) => (
                  <li key={p.href}>
                    <a href={p.href}>{p.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={s.card}>
              <h3 className={s.cardTitle}>{t.quote.email}</h3>
              <ul className={s.plain}>
                <li>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </li>
              </ul>
            </div>

            {/* Opening hours and the four profiles, asked for on this page by the
                briefing of 2026-09-18. */}
            <div className={s.card}>
              <h3 className={s.cardTitle}>{t.contact.hoursTitle}</h3>
              <dl className={s.hours}>
                {t.contact.hours.map((row) => (
                  <div key={row.days} className={s.hoursRow}>
                    <dt>{row.days}</dt>
                    <dd>{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={s.card}>
              <h3 className={s.cardTitle}>{t.contact.followUs}</h3>
              <ul className={s.social}>
                {CONTACT.social.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label}>
                      <SocialIcon name={item.icon} size={20} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* A quote is a different errand from a question: it has its own page. The
                careers link that used to sit beside it came off on 2026-09-17 at the
                client's request; careers is still in the Contacts menu. */}
            <div className={s.links}>
              <Link className={s.sideLink} href={href(locale, 'quote')}>
                {t.nav.quote}
                <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

const Arrow = () => (
  <svg
    width="15"
    height="15"
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

import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { PRODUCTS, RANGES, SEGMENTS } from '@/data/products';
import { MOROCCO_CAMPAIGNS } from '@/data/trials';
import { href, segmentHref } from '@/data/routes';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Reveal from '@/components/Reveal/Reveal';
import s from './AboutView.module.css';

const ACCENT = {
  agri: 'var(--seg-agri)',
  humans: 'var(--seg-humans)',
  animals: 'var(--seg-animals)',
  general: 'var(--seg-general)',
} as const;

/**
 * The company page.
 *
 * The archive had nothing of its own to put here: what the crawl filed under "about" was
 * the silicon article — now a page of its own in the knowledge centre — followed by the
 * Applications copy, word for word what /a-propos/services-et-conseils already says. So
 * this page was built from what the site can vouch for: the catalogue counted, the
 * trials counted, and the way to reach them. Since 2026-09-26 it opens on the client's
 * own presentation of the company and its vision.
 */
export default function AboutView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const figures = [
    { value: SEGMENTS.length, label: t.about.domains },
    { value: RANGES.length, label: t.product.ranges },
    { value: PRODUCTS.length, label: t.product.products },
    { value: MOROCCO_CAMPAIGNS, label: t.rdi.statTrials },
  ];

  return (
    <>
      <PageHeader
        title={t.pages.about.title}
        lead={t.pages.about.lead}
        image={pageHero('about')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[{ label: t.site.name, href: href(locale, 'home') }, { label: t.pages.about.title }]}
      />

      {/* The client's own presentation of the company, briefing of 2026-09-26. */}
      <section className="section">
        <div className="page-narrow">
          <Reveal>
            <p className="eyebrow">{t.site.name}</p>
            <h2>{t.about.introTitle}</h2>
            {t.about.introText.map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'lead' : undefined}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal className={s.vision} delay={80}>
            <h3 className={s.visionTitle}>{t.about.visionTitle}</h3>
            <p className={s.visionLines}>
              {t.about.vision.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className={s.signature}>
              {t.site.name.toUpperCase()} — {t.site.signature}
            </p>
          </Reveal>
        </div>
      </section>

      {/* The catalogue, counted from the data itself, and the trial programme as the
          client states it. */}
      <section className={s.figuresBand}>
        <div className={`page ${s.figures}`}>
          {figures.map((figure, i) => (
            <Reveal key={figure.label} delay={i * 70} className={s.figure}>
              <p className={s.figureValue}>{figure.value}</p>
              <p className={s.figureLabel}>{figure.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="page">
          <Reveal>
            <h2 className={s.sectionTitle}>{t.home.segmentsTitle}</h2>
          </Reveal>

          <div className={s.domains}>
            {SEGMENTS.map((segment, i) => (
              <Reveal key={segment} delay={i * 60}>
                <Link
                  href={segmentHref(locale, segment)}
                  className={s.domain}
                  style={{ '--accent': ACCENT[segment] } as React.CSSProperties}
                >
                  <span className={s.domainName}>{t.segments[segment].name}</span>
                  <span className={s.domainShort}>{t.segments[segment].short}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className={`page ${s.split}`}>
          <Reveal className={s.card}>
            <p className="eyebrow">{t.rdi.title}</p>
            <h3 className={s.cardTitle}>{t.rdi.trialsTitle}</h3>
            <p className={s.cardText}>{t.home.rdiText}</p>
            <Link className="btn" href={href(locale, 'rdi')}>
              {t.home.rdiCta}
            </Link>
          </Reveal>

          <Reveal className={s.card} delay={100}>
            <p className="eyebrow">{t.nav.services}</p>
            <h3 className={s.cardTitle}>{t.pages.services.title}</h3>
            <p className={s.cardText}>{t.pages.services.lead}</p>
            <Link className="btn btn--ghost" href={href(locale, 'services')}>
              {t.about.discover}
            </Link>
          </Reveal>
        </div>
      </section>

      {/*
        * A call to action, not a contact card: the footer sits directly under this band
        * and already carries the address, the phones and the email. Repeating them
        * here reads as a mistake.
        */}
      <section className={s.contactBand} data-flush-footer>
        <div className={`page ${s.contact}`}>
          <Reveal>
            <h2 className={s.contactTitle}>{t.nav.contactUs}</h2>
            <p className={s.contactLead}>{t.about.contactLead}</p>

            <div className={s.contactActions}>
              <Link className="btn btn--inverse" href={href(locale, 'contact')}>
                {t.nav.contactUs}
              </Link>
              <Link className={s.quoteLink} href={href(locale, 'quote')}>
                {t.nav.quoteShort}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { SEGMENTS } from '@/data/products';
import { href, segmentHref } from '@/data/routes';
import HeroVideo from '@/components/Hero/HeroVideo';
import FeatureRow from '@/components/FeatureRow/FeatureRow';
import Reveal from '@/components/Reveal/Reveal';
import s from './HomeView.module.css';

/**
 * One pictogram per figure, in the order the dictionary lists them: trial campaigns,
 * the growers who use the products, Morocco, and the Agadir office. Stroked line art at
 * currentColor, so they take the band's green without a second asset.
 */
const STAT_ICONS = [
  /* Conical flask — the trial campaigns. */
  <svg key="trials" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6M10 3v6.2L4.6 18.4A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.6L14 9.2V3" />
    <path d="M7.2 14.5h9.6" />
  </svg>,
  /* Three figures — the growers. */
  <svg key="farmers" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="3.2" />
    <path d="M2.5 20.5a6.5 6.5 0 0 1 13 0" />
    <path d="M16.2 5.4a3.2 3.2 0 0 1 0 5.2M18 14.4a6.5 6.5 0 0 1 3.5 6.1" />
  </svg>,
  /* Flag — Morocco. */
  <svg key="morocco" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 21.5V3.5" />
    <path d="M5 4h13.5l-2.6 4.5 2.6 4.5H5" />
  </svg>,
  /* Map pin — Agadir. */
  <svg key="agadir" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21.5s7-6.1 7-11.2a7 7 0 1 0-14 0c0 5.1 7 11.2 7 11.2Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>,
];

const SEGMENT_MEDIA = {
  agri: { image: '/media/scenes/segment-agri.webp', accent: 'var(--seg-agri)' },
  humans: { image: '/media/scenes/segment-humans.webp', accent: 'var(--seg-humans)' },
  animals: { image: '/media/scenes/segment-animals.webp', accent: 'var(--seg-animals)' },
  general: { image: '/media/scenes/segment-general.webp', accent: 'var(--seg-general)' },
} as const;

export default function HomeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      {/*
       * The film plays on its own: no title, subtitle, button or caption. The title it
       * carried from 2026-09-26 came off with the briefing of 2026-09-27 (step 1), and
       * the line moved to the intro below as the page's h1. The client's own 10 s loop,
       * delivered 2026-09-12, muxed without its audio track: the banner autoplays, and
       * an autoplaying film with sound is blocked anyway. BRIEF-VIDEO-ACCUEIL.md holds
       * the shot list.
       */}
      <HeroVideo
        poster="/media/hero/hero-poster.webp"
        /* H.264 only: a VP9 re-encode of this footage came out larger, so a
           second source would cost bandwidth without buying compatibility. */
        sources={[{ src: '/media/hero/hero.mp4', type: 'video/mp4' }]}
      />

      {/* The intro, rewritten by the client on 2026-09-27, opens the page and holds its h1. */}
      <section className="section">
        <div className="page-narrow">
          <Reveal>
            <h1 className={s.introTitle}>{t.home.introTitle}</h1>
            {t.home.introText.map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'lead' : undefined}>
                {paragraph}
              </p>
            ))}

            {/* The five pillars the last paragraph announces, numbered as the client
                numbers them, so the colon before them resolves into a list to scan. */}
            <ol className={s.introPoints}>
              {t.home.introPoints.map((point) => (
                <li key={point.title} className={s.introPoint}>
                  <strong className={s.introPointTitle}>{point.title}</strong>
                  <span>{point.text}</span>
                </li>
              ))}
            </ol>

            <p>{t.home.introClose}</p>
          </Reveal>
        </div>
      </section>

      {/*
       * The four segments, told as the alternating image/text rows the client picked
       * from bioworkseurope — each one tinted with its hexagon colour from the logo.
       */}
      <section className="section section--tint" id="segments">
        <div className="page">
          <Reveal>
            <h2 className={s.sectionTitle}>{t.home.segmentsTitle}</h2>
          </Reveal>

          {SEGMENTS.map((segment, i) => (
            <FeatureRow
              key={segment}
              index={i}
              eyebrow={t.site.name}
              title={t.segments[segment].name}
              body={<p>{t.segments[segment].blurb}</p>}
              image={SEGMENT_MEDIA[segment].image}
              imageAlt={t.segments[segment].name}
              accent={SEGMENT_MEDIA[segment].accent}
              variant="cutout"
              link={{ label: t.product.allProducts, href: segmentHref(locale, segment) }}
            />
          ))}
        </div>
      </section>

      {/*
       * The figures the client wants read from across the room (briefings of 2026-09-13
       * and 2026-09-18). The R&D+I trial-results block that stood above them was taken
       * off the home page on 2026-09-27. They are reach figures for the group,
       * not the Moroccan trial count the R&D page documents — which is why they live in
       * the dictionary rather than being counted off TRIALS.
       *
       * Every label sits above its number — "Présence au Maroc depuis" over 2001 — so the
       * four read the same way (briefing of 2026-09-27, step 2; until then the two
       * counts put their number first).
       */}
      <section className="section">
        <div className="page">
          <div className={s.stats}>
            {t.home.stats.map((stat, i) => (
              <Reveal key={stat.label} className={s.stat} delay={i * 110}>
                <span className={s.statIcon} aria-hidden="true">
                  {STAT_ICONS[i]}
                </span>
                <p className={s.statLabel}>{stat.label}</p>
                <p className={s.statNumber}>{stat.value}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ends the page flush against the footer — see `data-flush-footer` in globals.css. */}
      <section className={s.quoteBand} data-flush-footer>
        <div className="page">
          <Reveal className={s.quoteInner}>
            <div>
              <h2 className={s.quoteTitle}>{t.home.quoteTitle}</h2>
              <p className={s.quoteText}>{t.home.quoteText}</p>
            </div>
            <Link className="btn btn--inverse" href={href(locale, 'quote')}>
              {t.home.quoteCta}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

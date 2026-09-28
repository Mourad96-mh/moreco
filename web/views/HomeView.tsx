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

/* One pictogram per pillar, in the client's order, drawn like STAT_ICONS. */
const PILLAR_ICONS = [
  /* Nutrient efficiency — a seedling. */
  <svg key="nutrition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21v-7" />
    <path d="M12 14c0-5 3.5-9 9-9 0 5.5-4 9-9 9Z" />
    <path d="M12 16c0-3.5-2.5-6-6.5-6 0 3.8 2.8 6 6.5 6Z" />
    <path d="M9 21h6" />
  </svg>,
  /* Resilience — a shield. */
  <svg key="resilience" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 21.5s7.5-3.2 7.5-9.5V5.2L12 2.5 4.5 5.2V12c0 6.3 7.5 9.5 7.5 9.5Z" />
    <path d="m8.8 12 2.2 2.2 4.2-4.4" />
  </svg>,
  /* Water — a drop. */
  <svg key="water" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.8s6.5 7 6.5 11.7a6.5 6.5 0 0 1-13 0C5.5 9.8 12 2.8 12 2.8Z" />
    <path d="M9 15a3 3 0 0 0 3 3" />
  </svg>,
  /* Harvest quality — a fruit. */
  <svg key="quality" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 7.5c-2-1.6-6.5-1.4-6.5 4.2 0 4.6 3 9 5.2 9 .6 0 .9-.3 1.3-.3s.7.3 1.3.3c2.2 0 5.2-4.4 5.2-9 0-5.6-4.5-5.8-6.5-4.2Z" />
    <path d="M12 7.5c0-2 .8-3.6 2.5-4.5" />
  </svg>,
  /* Fewer residues — a filter. */
  <svg key="residues" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 4.5h17l-6.5 7.8v6.2l-4 2v-8.2Z" />
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

  /* "MORECO | L'innovation agronomique…": the brand becomes the eyebrow. */
  const [brand, headline] = t.home.introTitle.includes('|')
    ? t.home.introTitle.split('|').map((part) => part.trim())
    : [null, t.home.introTitle];
  /* First paragraph: the lead. Last: the line that announces the pillars. */
  const [lead, ...rest] = t.home.introText;
  const pillarsLead = rest.at(-1);
  const body = rest.slice(0, -1);

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

      {/*
       * The intro, rewritten by the client on 2026-09-27, opens the page and holds its h1.
       * Laid out on 2026-09-28 (point 2) so the same words read as a page rather than a
       * column: the brand as an eyebrow over the headline, the opening paragraph as the
       * lead with the three that follow beside it, the five pillars as cards, and the
       * closing sentence as a panel. The wording itself is the client's, untouched.
       */}
      <section className={`section ${s.intro}`}>
        <div className="page">
          <Reveal>
            <header className={s.introHead}>
              {brand && (
                <p className={s.introEyebrow} aria-hidden="true">
                  {brand}
                </p>
              )}
              <h1 className={s.introTitle}>
                {brand && <span className="visually-hidden">{brand} | </span>}
                {headline}
              </h1>
            </header>
          </Reveal>

          <div className={s.introBody}>
            <Reveal delay={80}>
              <p className={s.introLead}>{lead}</p>
            </Reveal>
            <Reveal delay={160} className={s.introAside}>
              {body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </Reveal>
          </div>

          {/* The five pillars the last paragraph announces, numbered as the client
              numbers them. */}
          {pillarsLead && (
            <Reveal>
              <h2 className={s.pillarsTitle}>{pillarsLead}</h2>
            </Reveal>
          )}
          <ol className={s.pillars}>
            {t.home.introPoints.map((point, i) => (
              <li key={point.title} className={s.pillar}>
                <Reveal delay={i * 70} className={s.pillarInner}>
                  <span className={s.pillarHead} aria-hidden="true">
                    <span className={s.pillarIcon}>{PILLAR_ICONS[i]}</span>
                    <span className={s.pillarNumber}>{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <strong className={s.pillarTitle}>{point.title}</strong>
                  <span className={s.pillarText}>{point.text}</span>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal>
            <p className={s.introClose}>{t.home.introClose}</p>
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

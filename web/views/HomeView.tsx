import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { SEGMENTS } from '@/data/products';
import { href, segmentHref } from '@/data/routes';
import { TRIALS } from '@/data/trials';
import HeroVideo from '@/components/Hero/HeroVideo';
import FeatureRow from '@/components/FeatureRow/FeatureRow';
import Reveal from '@/components/Reveal/Reveal';
import s from './HomeView.module.css';

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
       * Film only — no title, no subtitle, no button (client briefing, 2026-09-09). The
       * client's own 10 s loop, delivered 2026-09-12, muxed without its audio track:
       * the banner autoplays, and an autoplaying film with sound is blocked anyway.
       * BRIEF-VIDEO-ACCUEIL.md holds the shot list this footage was cut to.
       */}
      <HeroVideo
        poster="/media/hero/hero-poster.webp"
        /* H.264 only: a VP9 re-encode of this footage came out larger, so a
           second source would cost bandwidth without buying compatibility. */
        sources={[{ src: '/media/hero/hero.mp4', type: 'video/mp4' }]}
      />

      {/* The page's h1 lives here now that the film carries no headline of its own. */}
      <section className="section">
        <div className="page-narrow">
          <Reveal>
            <p className="eyebrow">{t.site.name}</p>
            <h1>{t.home.introTitle}</h1>
            {t.home.introText.map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'lead' : undefined}>
                {paragraph}
              </p>
            ))}
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

      <section className="section">
        <div className="page">
          <div className={s.rdi}>
            <Reveal className={s.rdiText}>
              <p className="eyebrow">{t.home.rdiTitle}</p>
              <h2>{t.rdi.trialsTitle}</h2>
              <p className="lead">{t.home.rdiText}</p>
              <Link className="btn" href={href(locale, 'rdi')}>
                {t.home.rdiCta}
              </Link>
            </Reveal>

            <Reveal className={s.rdiStat} delay={120}>
              <p className={s.statNumber}>{TRIALS.length}</p>
              <p className={s.statLabel}>{t.rdi.statTrials}</p>
            </Reveal>
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

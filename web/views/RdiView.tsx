import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, articleHref, trialHref } from '@/data/routes';
import { TRIALS, trialTitle, trialDescription } from '@/data/trials';
import { PUBLICATIONS, articleTitle, articleExcerpt, articleDate, articlePdf } from '@/data/articles';
import { formatDate } from '@/data/news';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import FeatureRow from '@/components/FeatureRow/FeatureRow';
import Reveal from '@/components/Reveal/Reveal';
import s from './RdiView.module.css';

/**
 * R&D + I, built with the behaviour the client picked out of bioworkseurope: the trials
 * run down the page as alternating image/text rows that reveal on scroll.
 *
 * The content is real — nineteen field campaigns recovered from the old /research/
 * section, each comparing an untreated control with a treated plot.
 *
 * The peer-reviewed studies close the page (#publications, where the header menu points
 * since 2026-09-09). They were listed in the knowledge centre until the client ruled
 * that a scientific publication belongs here and nowhere else.
 */
export default function RdiView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={t.rdi.lead}
        title={t.rdi.title}
        lead={t.rdi.intro}
        image={pageHero('rdi')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[{ label: t.site.name, href: href(locale, 'home') }, { label: t.rdi.title }]}
      />

      {/*
       * Four figures, and the first two must not be confused with each other: 215 is the
       * group's worldwide trial programme (client briefing, 2026-09-13), while the count
       * beside it is what this page actually documents — the Moroccan campaigns recovered
       * from the archive, one page each. The worldwide figure is a claim we are given;
       * the Moroccan one is counted off the trials themselves and cannot drift.
       */}
      <section className={s.stats}>
        <div className={`page ${s.statsInner}`}>
          <Reveal className={s.stat}>
            <p className={s.statNumber}>215</p>
            <p className={s.statLabel}>{t.rdi.statTrialsWorld}</p>
          </Reveal>
          <Reveal className={s.stat} delay={90}>
            <p className={s.statNumber}>{TRIALS.length}</p>
            <p className={s.statLabel}>{t.rdi.statTrials}</p>
          </Reveal>
          <Reveal className={s.stat} delay={180}>
            <p className={s.statNumber}>{TRIALS.reduce((n, x) => n + x.images.length, 0)}</p>
            <p className={s.statLabel}>{t.rdi.statPlates}</p>
          </Reveal>
          <Reveal className={s.stat} delay={270}>
            <p className={s.statNumber}>2016</p>
            <p className={s.statLabel}>{t.rdi.statSince}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" id="trials">
        <div className="page">
          <Reveal>
            <h2>{t.rdi.trialsTitle}</h2>
            <p className="lead">{t.rdi.trialsIntro}</p>
          </Reveal>

          <div className={s.rows}>
            {TRIALS.map((trial, i) => (
              <FeatureRow
                key={trial.slug}
                index={i}
                eyebrow={`${t.rdi.trialLabel} ${String(trial.order).padStart(2, '0')}`}
                title={trialTitle(trial, locale)}
                body={<p>{trialDescription(trial, locale)}</p>}
                image={trial.images[0]}
                imageAlt={trialTitle(trial, locale)}
                link={{ label: t.rdi.projectDescription, href: trialHref(locale, trial.slug) }}
                priority={i === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" id="publications">
        <div className="page">
          <Reveal>
            <h2>{t.nav.publications}</h2>
            <p className="lead">{t.rdi.publicationsIntro}</p>
          </Reveal>

          <ul className={s.papers}>
            {PUBLICATIONS.map((article, i) => {
              const date = articleDate(article);
              const pdf = articlePdf(article.slug);

              return (
                <Reveal key={article.slug} as="li" delay={(i % 3) * 70} className={s.paper}>
                  <Link className={s.paperLink} href={articleHref(locale, article.slug)}>
                    <span className={s.paperMeta}>
                      {date && <time dateTime={date}>{formatDate(date, locale)}</time>}
                      {pdf && (
                        <span className={s.pdf}>
                          PDF · {Math.round(pdf.bytes / 1024)} {t.article.sizeUnit}
                        </span>
                      )}
                    </span>
                    <span className={s.paperTitle}>{articleTitle(article, locale)}</span>
                    <span className={s.paperExcerpt}>{articleExcerpt(article, locale)}</span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, trialHref } from '@/data/routes';
import { TRIALS, trialTitle, trialDescription } from '@/data/trials';
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

      <section className={s.stats}>
        <div className={`page ${s.statsInner}`}>
          <Reveal className={s.stat}>
            <p className={s.statNumber}>{TRIALS.length}</p>
            <p className={s.statLabel}>{t.rdi.statTrials}</p>
          </Reveal>
          <Reveal className={s.stat} delay={90}>
            <p className={s.statNumber}>{TRIALS.reduce((n, x) => n + x.images.length, 0)}</p>
            <p className={s.statLabel}>{t.rdi.statPlates}</p>
          </Reveal>
          <Reveal className={s.stat} delay={180}>
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
    </>
  );
}

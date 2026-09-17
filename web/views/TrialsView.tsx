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
 * The trial results.
 *
 * They were a section of R&D + I until the client's briefing of 2026-09-17 moved them
 * under Resources, into the slot the knowledge centre had in that menu — and a section
 * that fills most of a page it shares is a page. The shape is unchanged: each campaign
 * is an alternating image/text row that reveals on scroll, and links through to its own
 * plates. R&D + I keeps the stats and the peer-reviewed studies.
 *
 * The same briefing struck two campaigns off, plums and raspberries, and the seventeen
 * that remain were renumbered so the list counts without a gap.
 */
export default function TrialsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow={t.nav.rdi}
        title={t.pages.trials.title}
        lead={t.pages.trials.lead}
        image={pageHero('trials')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          { label: t.pages.resources.title, href: href(locale, 'resources') },
          { label: t.pages.trials.title },
        ]}
      />

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

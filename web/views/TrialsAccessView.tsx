import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href } from '@/data/routes';
import { TRIALS, trialTitle } from '@/data/trials';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import ContactForm from '@/components/Contact/ContactForm';
import Reveal from '@/components/Reveal/Reveal';
import s from './ContactView.module.css';

/**
 * Asking for the trial results.
 *
 * The client wants the trials open only to people Moreco has approved (2026-10-30). Every
 * trial page, plate and report is refused by the server to a visitor without access
 * (public/api/essais-gate.php), who is sent here instead. The request is mailed to
 * info@moreco.ma with an approve link; approving mails the visitor a personal link that
 * opens the trials for twelve months. The whole round trip is in public/api/essais-*.php.
 *
 * The page lays out like Contact: the form leads, what the visitor gets sits beside it,
 * with the campaigns named so the request is worth making.
 */
export default function TrialsAccessView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const a = t.trialsAccess;

  return (
    <>
      <PageHeader
        eyebrow={t.pages.resources.title}
        title={t.pages.trialsAccess.title}
        lead={t.pages.trialsAccess.lead}
        image={pageHero('trials')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          { label: t.pages.resources.title, href: href(locale, 'resources') },
          { label: t.pages.trials.title },
        ]}
      />

      <div className="section">
        <div className={`page ${s.layout}`}>
          <Reveal className={s.formSide}>
            <h2 className={s.formTitle}>{a.formTitle}</h2>
            <ContactForm
              locale={locale}
              form="essais-demande"
              labels={{ ...t.quote, message: a.crops, success: a.success }}
              service={a.profile}
              messageOptional
              analyticsEvent="trials_access_request"
            />
          </Reveal>

          <Reveal className={s.details} delay={90}>
            <div className={s.card}>
              <h3 className={s.cardTitle}>{a.howTitle}</h3>
              <ol className={s.lines}>
                {a.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>

            <div className={s.card}>
              <h3 className={s.cardTitle}>{a.coveredTitle}</h3>
              <p className={s.lines}>{a.coveredText.replace('{n}', String(TRIALS.length))}</p>
              <ul className={s.plain}>
                {TRIALS.map((trial) => (
                  <li key={trial.slug}>{trialTitle(trial, locale)}</li>
                ))}
              </ul>
            </div>

            <div className={s.card}>
              <h3 className={s.cardTitle}>{a.approvedTitle}</h3>
              <p className={s.lines}>{a.approvedText}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

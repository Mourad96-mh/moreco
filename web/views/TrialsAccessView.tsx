import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href } from '@/data/routes';
import { TRIALS, trialTitle } from '@/data/trials';
import { TESTIMONIALS, TESTIMONIAL_VIDEO } from '@/data/testimonials';
import { TRIAL_DOCUMENTS } from '@/data/trial-documents';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import ContactForm from '@/components/Contact/ContactForm';
import Reveal from '@/components/Reveal/Reveal';
import note from '@/components/FamilyNote/FamilyNote.module.css';
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
 * with the campaigns named so the request is worth making. Seventeen names ran the column
 * far below the form, so they fold away behind their title (2026-10-30), in the green bar
 * the product FAQs use.
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
            {/* Client's e-mail of 2026-11-01. The counts come from the data, so the sentence
                stays true when a trial, testimonial or report is added; the video counts as one
                of the six testimonials, as the client counted it. */}
            <p className={s.formIntro}>
              {a.formIntro
                .replace('{trials}', String(TRIALS.length))
                .replace('{testimonials}', String(TESTIMONIALS.length + (TESTIMONIAL_VIDEO ? 1 : 0)))
                .replace('{reports}', String(TRIAL_DOCUMENTS.length))}
            </p>
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

            {/* The column's gap spaces it; the bar's own top margin is for stacked FAQs. */}
            <details className={`${note.note} ${note.faq}`} style={{ marginTop: 0 }}>
              <summary className={note.summary}>
                <h3 className={`${note.title} ${note.question}`}>{a.coveredTitle}</h3>
                <span className={note.chevron} aria-hidden="true" />
              </summary>
              <div className={note.body}>
                <p>{a.coveredText.replace('{n}', String(TRIALS.length))}</p>
                <ul className={s.plain}>
                  {TRIALS.map((trial) => (
                    <li key={trial.slug}>{trialTitle(trial, locale)}</li>
                  ))}
                </ul>
              </div>
            </details>

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

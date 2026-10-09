import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, trialHref } from '@/data/routes';
import { TRIALS, trialTitle, trialDescription } from '@/data/trials';
import { TESTIMONIALS, TESTIMONIAL_VIDEO, localized } from '@/data/testimonials';
import { TRIAL_DOCUMENTS, trialDocumentTitle, trialDocumentDate } from '@/data/trial-documents';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Reveal from '@/components/Reveal/Reveal';
import s from './RdiView.module.css';

/**
 * The trial results.
 *
 * They were a section of R&D + I until the client's briefing of 2026-09-17 moved them
 * under Resources, into the slot the knowledge centre had in that menu — and a section
 * that fills most of a page it shares is a page. R&D + I keeps the stats and the
 * peer-reviewed studies.
 *
 * The same briefing struck two campaigns off, plums and raspberries, and the seventeen
 * that remain were renumbered so the list counts without a gap.
 *
 * Since the client's e-mail of 2026-10-09 the campaigns are an accordion: only the titles
 * show, and a click on one unrolls its description and plates. A native <details>, as in
 * FamilyNote — no script, and the plates stay in the page for search engines. Each
 * campaign keeps its own page, linked from the bottom of its panel.
 *
 * Under the campaigns, the growers' testimonials from the client's 2018–2019 deck, then
 * the reports themselves as downloads (client's e-mail of
 * 2026-10-07), each with the title and date written on it. See data/trial-documents.json.
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

          <div className={s.trials}>
            {TRIALS.map((trial) => {
              const title = trialTitle(trial, locale);
              return (
                <details key={trial.slug} className={s.trial} id={trial.slug}>
                  <summary className={s.trialSummary}>
                    <span className={s.trialOrder}>
                      {t.rdi.trialLabel} {String(trial.order).padStart(2, '0')}
                    </span>
                    <h3 className={s.trialTitle}>{title}</h3>
                    <span className={s.trialChevron} aria-hidden="true" />
                  </summary>

                  <div className={s.trialBody}>
                    <p className={s.trialDescription}>{trialDescription(trial, locale)}</p>
                    <div className={s.trialPlates}>
                      {trial.images.map((image, i) => (
                        <Image
                          key={image}
                          src={image}
                          alt={`${title} — ${i + 1}`}
                          width={1400}
                          height={900}
                          sizes="(min-width: 1100px) 1000px, 100vw"
                          className={s.trialPlate}
                        />
                      ))}
                    </div>
                    <Link href={trialHref(locale, trial.slug)} className={s.trialLink}>
                      {t.rdi.projectDescription}
                    </Link>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section className="section section--tint" id="testimonials">
          <div className="page">
            <Reveal>
              <h2>{t.rdi.testimonialsTitle}</h2>
              <p className="lead">{t.rdi.testimonialsIntro}</p>
            </Reveal>

            <ul className={s.testimonials}>
              {TESTIMONIALS.map((item, i) => (
                <Reveal key={item.slug} as="li" delay={(i % 3) * 70} className={s.testimonial}>
                  <div className={s.testimonialPhotos}>
                    {item.photos.map((photo) => (
                      <Image
                        key={photo}
                        src={photo}
                        alt={`${localized(item.crop, locale)} — ${item.location}`}
                        width={655}
                        height={1000}
                        sizes="(min-width: 900px) 15vw, 45vw"
                      />
                    ))}
                  </div>
                  <figure className={s.testimonialBody}>
                    <figcaption className={s.testimonialMeta}>
                      {localized(item.crop, locale)} · {item.year}
                    </figcaption>
                    <blockquote className={s.testimonialQuote}>
                      <p>{quoted(localized(item.quote, locale), locale)}</p>
                    </blockquote>
                    <p className={s.testimonialName}>
                      <strong>{item.name}</strong> — {item.location}
                    </p>
                  </figure>
                </Reveal>
              ))}

              {TESTIMONIAL_VIDEO && (
                <Reveal as="li" delay={(TESTIMONIALS.length % 3) * 70} className={s.testimonial}>
                  <video
                    className={s.testimonialVideo}
                    src={TESTIMONIAL_VIDEO.file}
                    poster={TESTIMONIAL_VIDEO.poster}
                    controls
                    playsInline
                    preload="none"
                  />
                  <div className={s.testimonialBody}>
                    <p className={s.testimonialMeta}>
                      {localized(TESTIMONIAL_VIDEO.title, locale)} · {TESTIMONIAL_VIDEO.year}
                    </p>
                  </div>
                </Reveal>
              )}
            </ul>
          </div>
        </section>
      )}

      {TRIAL_DOCUMENTS.length > 0 && (
        <section className="section" id="reports">
          <div className="page">
            <Reveal>
              <h2>{t.rdi.trialDocumentsTitle}</h2>
              <p className="lead">{t.rdi.trialDocumentsIntro}</p>
            </Reveal>

            <ul className={s.documents}>
              {TRIAL_DOCUMENTS.map((doc) => {
                const date = trialDocumentDate(doc, locale);
                const kind = doc.file.split('.').pop()!.toUpperCase();
                return (
                  <li key={doc.slug}>
                    <a href={doc.file} download className={s.document}>
                      <span className={s.documentName}>{trialDocumentTitle(doc, locale)}</span>
                      {date && <span className={s.documentDate}>{date}</span>}
                      <span className={s.documentKind}>
                        {kind}
                        {doc.bytes ? ` · ${Math.round(doc.bytes / 1024)} ${t.article.sizeUnit}` : ''}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

/** French and Spanish quote with guillemets, English and Dutch with curly quotes. */
const quoted = (text: string, locale: Locale): string =>
  locale === 'fr' ? `« ${text} »` : locale === 'es' ? `«${text}»` : `“${text}”`;

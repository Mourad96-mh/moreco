import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import {
  PRODUCTS,
  productDatasheet,
  productDatasheetBytes,
  productDatasheetKind,
  productDatasheetPages,
  productName,
} from '@/data/products';
import { FLYERS, flyerFaq, flyerText, flyerTitle } from '@/data/flyers';
import { href, productHref } from '@/data/routes';
import pages from '@/data/pages.json';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Blocks, { type Block } from '@/components/Blocks/Blocks';
import CareerForm from '@/components/Careers/CareerForm';
import { jobsFor } from '@/data/jobs';
import Reveal from '@/components/Reveal/Reveal';
import TrialDialog from '@/components/TrialDialog/TrialDialog';
import note from '@/components/FamilyNote/FamilyNote.module.css';
import s from './ArticlePageView.module.css';

/** What is left for the generic renderer: the pages with no shape of their own. */
type SimpleView = 'resources' | 'careers';

type PageStore = Record<string, Partial<Record<Locale, Block[]>>>;
const PAGES = pages as PageStore;

/** FR is the source language, EN the archive's own translation, ES/DE written by us.
 * The fallback chain stays as a safety net for any block a future extraction adds. */
const bodyFor = (view: string, locale: Locale): Block[] =>
  PAGES[view]?.[locale] ?? PAGES[view]?.fr ?? PAGES[view]?.en ?? [];

export default function ArticlePageView({ locale, view }: { locale: Locale; view: SimpleView }) {
  const t = getDictionary(locale);
  const page = t.pages[view as keyof typeof t.pages];

  return (
    <>
      <PageHeader
        title={page?.title ?? t.site.name}
        lead={page?.lead}
        image={pageHero(view)}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[{ label: t.site.name, href: href(locale, 'home') }, { label: page?.title ?? '' }]}
      />

      <div className="section">
        <div className="page">
          {view === 'resources' && <ResourcesBlock locale={locale} />}

          {/*
           * Careers opens on the client's own text since 2026-09-26. The archive prose it
           * replaced ended on "Postes vacants :" over a widget the crawl never saw.
           */}
          {view === 'careers' && <WorkAtMoreco locale={locale} />}
          {view === 'careers' && <VacanciesBlock locale={locale} />}

          {view !== 'careers' && bodyFor(view, locale).length > 0 && (
            <Reveal>
              <Blocks blocks={bodyFor(view, locale)} />
            </Reveal>
          )}

          {view === 'resources' && <ApplicationsBlock locale={locale} />}
          {view === 'resources' && <TrialsBlock locale={locale} />}
          {view === 'careers' && <CareersBlock locale={locale} />}
        </div>
      </div>
    </>
  );
}

/**
 * The product sheets, strictly in the order of the client's final briefing (2026-10-29),
 * Clearox last. The list names its sheets rather than filtering the catalogue: Mavita's
 * (2026-10-08), Huwa-San's (2026-10-19) and Clearox AGRO's stay on their product pages only.
 */
const SHEET_ORDER = [
  'orthagrow-granule',
  'orthagrow-myco',
  'orthagrow-soil-conditioner',
  'orthagrow-control',
  'orthagrow-fertifight',
  'orthagrow-bloom-booster',
  'orthagrow-micro-manager',
  'orthagrow-alga-si',
  'orthagrow-aminactif',
  'orthagrow-zno',
  'orthagrow-cal',
  'orthagrow-initio',
  'orthagrow-flor',
  'orthagrow-frucfolia',
  'orthagrow-frucferti',
  'orthagrow-matur',
  'clearox',
];

function ResourcesBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const withSheets = SHEET_ORDER.map((slug) => PRODUCTS.find((p) => p.slug === slug)).filter(
    (p): p is (typeof PRODUCTS)[number] => !!p && !!productDatasheet(p.slug),
  );

  // A card opens the sheet's recto and verso over the page (TrialDialog, as the crop
  // sheets); the download is offered there, once the visitor has seen it (2026-10-29).
  return (
    <section id="catalogues" className={s.section}>
      <h2>{t.nav.catalogues}</h2>
      <ul className={s.crops}>
        {withSheets.map((product) => {
          const name = productName(product, locale);
          const file = productDatasheet(product.slug)!;
          const sds = productDatasheetKind(product.slug) === 'sds';
          const bytes = productDatasheetBytes(product.slug);
          return (
            <li key={product.slug}>
              <TrialDialog
                id={`fiche-${product.slug}`}
                order={sds ? t.resources.sheetSds : t.resources.sheetFlyer}
                title={name}
                closeLabel={t.product.zoomClose}
              >
                <div className={s.sheetPages}>
                  {productDatasheetPages(product.slug).map((page, i) => (
                    <a key={page} href={file} className={s.cropFlyer} target="_blank" rel="noopener">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={page} alt={`${name} (${i + 1})`} loading="lazy" width={900} height={1273} />
                    </a>
                  ))}
                </div>
                <div className={s.sheetActions}>
                  <a href={file} download className={`btn ${s.cropDownload}`}>
                    {sds ? t.product.sds : t.product.datasheet}
                    <span className={s.cropDownloadKind}>
                      PDF{bytes ? ` · ${Math.round(bytes / 1024)} ${t.article.sizeUnit}` : ''}
                    </span>
                  </a>
                  <Link href={productHref(locale, product.slug)} className={s.sheetLink}>
                    {t.resources.seeProduct}
                  </Link>
                </div>
              </TrialDialog>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/**
 * Resources > Crop sheets, where the header menu's #applications points: one card per
 * crop in a grid of four (three, two, one as the screen narrows), in the briefing's
 * order (2026-10-24). The client wanted the flyers out of sight until asked for
 * (2026-10-25), so a card is the crop's name alone, and a click opens the flyer over the
 * page beside the crop's questions and the download — the same sheet as the trial
 * results (TrialDialog). The flyer is lazy and the sheet closed, so no flyer loads with
 * the page. A crop without a flyer opens on its questions alone, and its preview and
 * download appear once `image` and `file` are set in data/flyers.json.
 */
function ApplicationsBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="applications" className={s.section}>
      <h2>{t.nav.cropSheets}</h2>
      <ul className={s.crops}>
        {FLYERS.map((flyer) => {
          const title = flyerTitle(flyer, locale);
          return (
            <li key={flyer.slug}>
              <TrialDialog
                id={flyer.slug}
                order={flyer.latin ?? ''}
                orderClassName={s.cropLatin}
                title={title}
                closeLabel={t.product.zoomClose}
              >
                <div className={s.cropSheet}>
                  {/* The download sits right under the flyer it saves (2026-10-29). */}
                  {(flyer.image || flyer.file) && (
                    <div className={s.cropMedia}>
                      {flyer.image && (
                        <a href={flyer.file ?? flyer.image} className={s.cropFlyer} target="_blank" rel="noopener">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={flyer.image} alt={title} loading="lazy" />
                        </a>
                      )}
                      {flyer.file && (
                        <a href={flyer.file} download className={`btn ${s.cropDownload}`}>
                          {t.resources.downloadFlyer}
                          <span className={s.cropDownloadKind}>
                            PDF{flyer.bytes ? ` · ${Math.round(flyer.bytes / 1024)} ${t.article.sizeUnit}` : ''}
                          </span>
                        </a>
                      )}
                    </div>
                  )}
                  <div className={s.cropText}>
                    {/* The crop's text of 2026-10-18, back in the sheet on 2026-10-29; its
                        last paragraph ("Choisissez la gamme Orthagrow…") is the call to action. */}
                    {flyerText(flyer, locale).length > 0 && (
                      <div className={s.cropIntro}>
                        {flyerText(flyer, locale).map((paragraph, i, all) => (
                          <p key={i} className={i === all.length - 1 ? s.cropClosing : i === 0 ? s.cropLead : undefined}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                    {/* The questions fold like the family ones (2026-10-29), one under the
                        other: the sheet's text column is too narrow for two side by side. */}
                    {flyerFaq(flyer, locale).length > 0 && (
                      <div className={s.cropFaqs}>
                        {flyerFaq(flyer, locale).map((faq) => (
                          <details key={faq.question} className={`${note.note} ${note.faq} ${s.cropFaq}`}>
                            <summary className={note.summary}>
                              <h3 className={`${note.title} ${note.question}`}>{faq.question}</h3>
                              <span className={note.chevron} aria-hidden="true" />
                            </summary>
                            <div className={note.body}>
                              <p>{faq.answer}</p>
                            </div>
                          </details>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TrialDialog>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Resources > Trial results: the third section, pointing at the trials' own pages. */
function TrialsBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="trials" className={s.section}>
      <h2>{t.nav.trials}</h2>
      <p className="lead">{t.pages.trials.lead}</p>
      <Link className="btn" href={href(locale, 'trials')}>
        {t.home.rdiCta}
      </Link>
    </section>
  );
}

/** "Travailler chez MORECO", briefing of 2026-09-26, closed by the company's signature. */
function WorkAtMoreco({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <Reveal className={`${s.section} ${s.work}`}>
      <h2>{t.careers.workTitle}</h2>
      {t.careers.workText.map((paragraph, i) => (
        <p key={i} className={i === 0 ? 'lead' : undefined}>
          {paragraph}
        </p>
      ))}
      <p className={s.signature}>{t.site.signature}</p>
    </Reveal>
  );
}

/**
 * "Postes vacants", briefing of 2026-10-22: one fold per opening, its title and facts on
 * the bar, the full text inside. Applications go through the form below, so each opening
 * ends on a link down to it.
 */
function VacanciesBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const jobs = jobsFor(locale);
  if (jobs.length === 0) return null;

  return (
    <section id="postes-vacants" className={s.section}>
      <h2>{t.careers.vacanciesTitle}</h2>
      <p className="lead">{t.careers.vacanciesIntro}</p>
      <div className={s.jobs}>
        {jobs.map((job) => (
          <details key={job.slug} id={job.slug} className={s.job}>
            <summary className={s.jobSummary}>
              <span className={s.jobHead}>
                <h3 className={s.jobTitle}>{job.title}</h3>
                <span className={s.jobPlace}>{job.facts[0].value}</span>
              </span>
              <span className={s.jobChevron} aria-hidden="true" />
            </summary>
            <div className={s.jobBody}>
              <dl className={s.jobFacts}>
                {job.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <h4>{t.careers.jobDescription}</h4>
              <p>{job.description}</p>
              <h4>{t.careers.jobMissions}</h4>
              <ul>
                {job.missions.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <h4>{t.careers.jobProfile}</h4>
              <ul>
                {job.profile.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <h4>{t.careers.jobOffer}</h4>
              <ul>
                {job.offer.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              {job.note && <p className={s.jobNote}>{job.note}</p>}
              <a className="btn" href="#candidature">
                {t.careers.jobApply}
              </a>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/**
 * Careers. The archive's page is prose that ends on the words "Postes vacants:" and then
 * stops — the vacancies themselves were a WordPress widget the crawl could not see. The
 * client asked on 2026-09-17 for the speculative application casem.ma runs, so what
 * follows that heading now is a form rather than nothing.
 */
function CareersBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="candidature" className={s.section}>
      <h2>{t.careers.formTitle}</h2>
      <p className="lead">{t.careers.intro}</p>
      <div className={s.formWrap}>
        <CareerForm
          locale={locale}
          labels={{
            firstName: t.quote.firstName,
            lastName: t.quote.lastName,
            email: t.quote.email,
            phone: t.quote.phone,
            message: t.quote.message,
            required: t.quote.required,
            sending: t.quote.sending,
            error: t.quote.error,
            ...t.careers,
          }}
        />
      </div>
    </section>
  );
}

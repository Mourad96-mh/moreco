import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { PRODUCTS, productDatasheet, productDatasheetKind, productName } from '@/data/products';
import { FLYERS, flyerFaq, flyerTitle } from '@/data/flyers';
import { href, productHref } from '@/data/routes';
import pages from '@/data/pages.json';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Blocks, { type Block } from '@/components/Blocks/Blocks';
import CareerForm from '@/components/Careers/CareerForm';
import { jobsFor } from '@/data/jobs';
import Reveal from '@/components/Reveal/Reveal';
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

const NOT_LISTED = new Set(['huwa-san-vet', 'huwa-san-water-treatment']);

function ResourcesBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  // Mavita's sheets stay on its own product pages but are not listed here (client's request
  // of 2026-10-08): this list is for the agricultural, animal and hygiene ranges. Huwa-San
  // VET and Water Treatment left the list on 2026-10-19, their pages keeping their sheets.
  const withSheets = PRODUCTS.filter(
    (p) => productDatasheet(p.slug) && p.range !== 'mavita' && !p.variantOf && !NOT_LISTED.has(p.slug),
  );

  return (
    <section id="catalogues" className={s.section}>
      <h2>{t.nav.catalogues}</h2>
      <ul className={s.sheets}>
        {withSheets.map((product) => (
          <li key={product.slug}>
            <a href={productDatasheet(product.slug)!} download className={s.sheet}>
              <span className={s.sheetName}>{productName(product, locale)}</span>
              <span className={s.sheetKind}>
                {productDatasheetKind(product.slug) === 'sds' ? t.product.sds : t.product.datasheet}
              </span>
            </a>
            <Link href={productHref(locale, product.slug)} className={s.sheetLink}>
              {t.product.products}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Resources > Crop sheets, where the header menu's #applications points: since the
 * briefing of 2026-10-24, one card per crop in a grid of four (three, two, one as the
 * screen narrows), the flyer on top and the crop's questions folded beneath it at the
 * flyer's own width. The crops come in the briefing's order, left to right then row by
 * row. The flyers came on 2026-10-24; a crop without one opens on its name, and its
 * preview and download appear once `image` and `file` are set in data/flyers.json.
 */
function ApplicationsBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="applications" className={s.section}>
      <h2>{t.nav.cropSheets}</h2>
      <ul className={s.crops}>
        {FLYERS.map((flyer) => (
          <li key={flyer.slug} id={flyer.slug} className={s.crop}>
            {flyer.image && (
              <a href={flyer.file ?? flyer.image} className={s.cropFlyer}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={flyer.image} alt={flyerTitle(flyer, locale)} loading="lazy" />
              </a>
            )}
            <div className={s.cropHead}>
              <h3 className={s.cropName}>{flyerTitle(flyer, locale)}</h3>
              {flyer.latin && <span className={s.cropLatin}>{flyer.latin}</span>}
            </div>
            {flyerFaq(flyer, locale).map((faq) => (
              <details key={faq.question} className={s.cropFaq}>
                <summary className={s.cropSummary}>
                  <h4 className={s.cropQuestion}>{faq.question}</h4>
                  <span className={s.cropChevron} aria-hidden="true" />
                </summary>
                <p className={s.cropAnswer}>{faq.answer}</p>
              </details>
            ))}
            {flyer.file && (
              <a href={flyer.file} download className={s.sheet}>
                <span className={s.sheetName}>{t.resources.downloadFlyer}</span>
                <span className={s.sheetKind}>
                  PDF{flyer.bytes ? ` · ${Math.round(flyer.bytes / 1024)} ${t.article.sizeUnit}` : ''}
                </span>
              </a>
            )}
          </li>
        ))}
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

import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { PRODUCTS, productDatasheet, productDatasheetKind, productName } from '@/data/products';
import { href, productHref } from '@/data/routes';
import pages from '@/data/pages.json';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Blocks, { type Block } from '@/components/Blocks/Blocks';
import CareerForm from '@/components/Careers/CareerForm';
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
 * Resources > Crop sheets, where the header menu's #applications points. The client had
 * the crop cards taken out on 2026-10-19, so only the heading stands; the crops' texts
 * stay in data/flyers.json.
 */
function ApplicationsBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="applications" className={s.section}>
      <h2>{t.nav.cropSheets}</h2>
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

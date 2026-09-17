import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { PRODUCTS, productDatasheet, productDatasheetKind, productName } from '@/data/products';
import { FLYERS, flyerTitle } from '@/data/flyers';
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

          {bodyFor(view, locale).length > 0 && (
            <Reveal>
              <Blocks blocks={bodyFor(view, locale)} />
            </Reveal>
          )}

          {view === 'resources' && <ApplicationsBlock locale={locale} />}
          {view === 'careers' && <CareersBlock locale={locale} />}
        </div>
      </div>
    </>
  );
}

function ResourcesBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const withSheets = PRODUCTS.filter((p) => productDatasheet(p.slug));

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
 * Resources > Product applications, where the header menu's #applications has pointed
 * since that menu was built: the flyers written crop by crop.
 *
 * The section renders nothing while the list is empty, which is what it is until the
 * client's e-mailed flyers reach the repository — better a menu entry that lands on the
 * page than a heading standing over an empty shelf. See data/flyers.json.
 */
function ApplicationsBlock({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  if (FLYERS.length === 0) return null;

  return (
    <section id="applications" className={s.section}>
      <h2>{t.nav.applications}</h2>
      <p className="lead">{t.resources.applicationsIntro}</p>
      <ul className={s.sheets}>
        {FLYERS.map((flyer) => (
          <li key={flyer.slug}>
            <a href={flyer.file} download className={s.sheet}>
              <span className={s.sheetName}>{flyerTitle(flyer, locale)}</span>
              <span className={s.sheetKind}>
                PDF{flyer.bytes ? ` · ${Math.round(flyer.bytes / 1024)} ${t.article.sizeUnit}` : ''}
              </span>
            </a>
          </li>
        ))}
      </ul>
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

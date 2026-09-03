import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { PRODUCTS, productDatasheet, productDatasheetKind, productName } from '@/data/products';
import { href, productHref } from '@/data/routes';
import pages from '@/data/pages.json';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Blocks, { type Block } from '@/components/Blocks/Blocks';
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

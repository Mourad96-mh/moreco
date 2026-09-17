import Image from 'next/image';
import { notFound } from 'next/navigation';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import {
  getProduct,
  getRange,
  productCopy,
  productDatasheet,
  productDatasheetKind,
  productImage,
  productName,
  productsOfRange,
  type SegmentKey,
} from '@/data/products';
import { href, rangeHref, segmentHref } from '@/data/routes';
import { productHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import ProductCard from '@/components/ProductCard/ProductCard';
import AddToQuote from '@/components/Quote/AddToQuote';
import Reveal from '@/components/Reveal/Reveal';
import catalogue from './Catalogue.module.css';
import s from './ProductView.module.css';

const ACCENT: Record<SegmentKey, string> = {
  agri: 'var(--seg-agri)',
  humans: 'var(--seg-humans)',
  animals: 'var(--seg-animals)',
  general: 'var(--seg-general)',
};

export default function ProductView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getDictionary(locale);
  const product = getProduct(slug);
  if (!product) notFound();

  const range = getRange(product.range);
  const copy = productCopy(slug, locale);
  const name = productName(product, locale);
  const image = productImage(slug);
  const datasheet = productDatasheet(slug);
  const isSds = productDatasheetKind(slug) === 'sds';
  const siblings = productsOfRange(product.range).filter((p) => p.slug !== slug);

  return (
    <>
      <PageHeader
        eyebrow={range?.name}
        title={name}
        accent={ACCENT[product.segment]}
        image={productHero(product)}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          { label: t.nav.products, href: href(locale, 'products') },
          { label: t.segments[product.segment].name, href: segmentHref(locale, product.segment) },
          ...(range ? [{ label: range.name, href: rangeHref(locale, range.slug) }] : []),
          { label: name },
        ]}
      />

      <div className="section">
        <div className={`page ${s.layout}`}>
          <div className={s.mediaCol}>
            {image && (
              <div className={s.frame}>
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(min-width: 900px) 460px, 100vw"
                  className={s.img}
                  priority
                />
              </div>
            )}

            {/*
             * The formats sit under the pack shot, not in the prose column: the client
             * asked for them there on 2026-09-17, and it is the right place — a photograph
             * of a 1 L bottle is read as the whole offer until something beside it says
             * the same product also comes as a 1000 L container.
             */}
            {copy.sizes.length > 0 && (
              <div className={s.sizesBlock}>
                <h2 className={s.blockTitle}>{t.product.availableIn}</h2>
                <ul className={s.sizes}>
                  {copy.sizes.map((size) => (
                    <li key={size}>{size}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={s.textCol}>
            {copy.claim && <p className={s.claim}>{copy.claim}</p>}

            {copy.paragraphs.length === 0 && !copy.claim && <p className={s.claim}>{t.product.noCopy}</p>}

            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}

            {copy.advantages.length > 0 && (
              <div className={s.block}>
                <h2 className={s.blockTitle}>{t.product.advantages}</h2>
                <ul className={s.advantages}>
                  {copy.advantages.map((advantage) => (
                    <li key={advantage.slice(0, 40)}>{advantage}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={s.actions}>
              <AddToQuote
                slug={slug}
                labels={{ add: t.product.addToQuote, inQuote: t.product.inQuote }}
              />
              {datasheet && (
                <a className={`btn btn--ghost ${s.download}`} href={datasheet} download>
                  <DownloadIcon />
                  {isSds ? t.product.sds : t.product.datasheet}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {siblings.length > 0 && (
        <div className="section section--tint">
          <div className="page">
            <h2 className={catalogue.groupTitle}>{t.product.relatedTitle}</h2>
            <div className={catalogue.grid}>
              {siblings.map((sibling, i) => (
                <Reveal key={sibling.slug} delay={i * 50}>
                  <ProductCard product={sibling} locale={locale} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 19h16" />
  </svg>
);

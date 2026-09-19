import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary, type Dictionary } from '@/i18n/dictionary';
import {
  RANGES,
  SEGMENTS,
  familiesOf,
  familyName,
  productsOfFamily,
  productsOfSegment,
  type SegmentKey,
} from '@/data/products';
import { href, segmentHref } from '@/data/routes';
import { pageHero, segmentHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import ProductCard from '@/components/ProductCard/ProductCard';
import FamilyFilter, { type FamilyGroup } from '@/components/FamilyFilter/FamilyFilter';
import FamilyNote from '@/components/FamilyNote/FamilyNote';
import Reveal from '@/components/Reveal/Reveal';
import s from './ProductsView.module.css';
import c from './Catalogue.module.css';

const ACCENT: Record<SegmentKey, string> = {
  agri: 'var(--seg-agri)',
  humans: 'var(--seg-humans)',
  animals: 'var(--seg-animals)',
  general: 'var(--seg-general)',
};

/** French keeps the singular at 0 and 1; the other three only at 1. Both are covered. */
const productCount = (t: Dictionary, n: number) =>
  n === 1 ? t.product.count.one : t.product.count.other.replace('{n}', String(n));

const rangeCount = (t: Dictionary, n: number) =>
  n === 1 ? t.product.rangeCount.one : t.product.rangeCount.other.replace('{n}', String(n));

export default function ProductsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  /*
   * The four photographic bands. They are what "all products" shows, and they are
   * full-bleed, which is why this page keeps the filter bar outside a page container
   * and brings it back to page width with a class of its own.
   */
  const bands = SEGMENTS.map((segment, index) => {
    const ranges = RANGES.filter((r) => r.segment === segment);
    const total = productsOfSegment(segment).length;
    const to = segmentHref(locale, segment);

    return (
      <section
        key={segment}
        className={`${s.band} ${index % 2 === 1 ? s.bandTint : ''}`}
        style={{ '--accent': ACCENT[segment] } as React.CSSProperties}
      >
        <div className={`page ${s.intro} ${index % 2 === 1 ? s.introFlip : ''}`}>
          <Reveal className={s.photoWrap}>
            <Link href={to} className={s.photo}>
              <Image
                src={segmentHero(segment)}
                alt=""
                fill
                sizes="(min-width: 900px) 44vw, 100vw"
                className={s.photoImg}
              />
              <span className={s.photoWash} aria-hidden="true" />
              <span className={s.photoNumber} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
            </Link>
          </Reveal>

          <Reveal className={s.introText} delay={90}>
            <h2 className={s.segTitle}>
              <Link href={to}>{t.segments[segment].name}</Link>
            </h2>

            <p className={s.meta}>
              <span className={s.metaCount}>{productCount(t, total)}</span>
              <span className={s.metaDot} aria-hidden="true" />
              {rangeCount(t, ranges.length)}
            </p>

            <p className={s.lead}>{t.segments[segment].blurb}</p>

            <Link href={to} className={s.cta}>
              {t.product.allProducts}
              <Arrow />
            </Link>
          </Reveal>
        </div>
      </section>
    );
  });

  /*
   * The Agriculture families, as the buttons the client listed on 2026-09-13. They
   * are the only families with their own filter: Animals is organised by species and is
   * chosen on its own page, where the four sub-categories live.
   */
  const familyGroups: FamilyGroup[] = familiesOf('agri').map((family) => ({
    key: family.key,
    label: familyName(family, t),
    content: (
      <div className={`section ${s.familyBand}`}>
        <div className="page">
          <h2 className={c.groupTitle}>{familyName(family, t)}</h2>
          <div className={c.grid}>
            {productsOfFamily(family).map((product, i) => (
              <Reveal key={product.slug} delay={i * 50}>
                <ProductCard product={product} locale={locale} />
              </Reveal>
            ))}
            {family.soon && (
              <Reveal delay={productsOfFamily(family).length * 50}>
                <p className={c.soon}>SOON</p>
              </Reveal>
            )}
          </div>
          {family.note && (
            <FamilyNote
              title={familyName(family, t)}
              summary={t.product.learnMore}
              paragraphs={t.familyNotes[family.note]}
            />
          )}
        </div>
      </div>
    ),
  }));

  return (
    <>
      <PageHeader
        title={t.pages.products.title}
        image={pageHero('products')}
        lead={t.pages.products.lead}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[{ label: t.site.name, href: href(locale, 'home') }, { label: t.nav.products }]}
      />

      {/*
       * The category buttons the client wants seen first (briefing of 2026-09-13): the
       * bar sits directly under the banner, "all products" leads it, and picking a family
       * swaps the four photographic bands for that family's products.
       *
       * The bands themselves are unchanged — one per domain: its photograph, what it
       * covers, and the way in. They run as a Z, the photograph left, then right, then
       * left again, paper alternating with tint, so the eye crosses the page on the way
       * down instead of running along one edge.
       */}
      <div className={s.filterSection}>
        <FamilyFilter
          allLabel={t.product.allProducts}
          groups={familyGroups}
          allContent={<>{bands}</>}
          barClassName={s.filterBar}
        />
      </div>
    </>
  );
}

const Arrow = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

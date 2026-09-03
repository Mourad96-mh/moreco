import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary, type Dictionary } from '@/i18n/dictionary';
import { RANGES, SEGMENTS, productsOfSegment, type SegmentKey } from '@/data/products';
import { href, segmentHref } from '@/data/routes';
import { pageHero, segmentHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Reveal from '@/components/Reveal/Reveal';
import s from './ProductsView.module.css';

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
       * One band per domain: its photograph, what it covers, and the way in. The ranges
       * themselves are not listed here — the band counts them and hands the visitor to
       * the segment page, which is where they are laid out in full.
       *
       * The bands run as a Z: the photograph sits left, then right, then left again, and
       * paper alternates with tint behind it, so the eye crosses the page on the way down
       * instead of running along one edge.
       */}
      {SEGMENTS.map((segment, index) => {
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
      })}
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

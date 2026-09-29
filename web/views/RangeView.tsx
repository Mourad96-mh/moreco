import { notFound } from 'next/navigation';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { getRange, productsOfRange, type SegmentKey } from '@/data/products';
import { rangeHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import ProductCard from '@/components/ProductCard/ProductCard';
import Reveal from '@/components/Reveal/Reveal';
import s from './Catalogue.module.css';

const ACCENT: Record<SegmentKey, string> = {
  agri: 'var(--seg-agri)',
  humans: 'var(--seg-humans)',
  animals: 'var(--seg-animals)',
  general: 'var(--seg-general)',
};

export default function RangeView({ locale, range: slug }: { locale: Locale; range: string }) {
  const t = getDictionary(locale);
  const range = getRange(slug);
  if (!range) notFound();

  const products = productsOfRange(slug);

  return (
    <>
      {/* The range's name, once — no eyebrow or breadcrumb repeating it (2026-09-28). */}
      <PageHeader
        title={range.name}
        accent={ACCENT[range.segment]}
        image={rangeHero(range.slug)}
        crumbLabel={t.a11y.breadcrumb}
      />

      <div className="section">
        <div className="page">
          <div className={s.grid}>
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={i * 50}>
                <ProductCard product={product} locale={locale} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import {
  familiesOf,
  familyName,
  productsOfFamily,
  productsOfSegment,
  productsOutsideFamilies,
  rangesOf,
  type Product,
  type SegmentKey,
} from '@/data/products';
import { href } from '@/data/routes';
import { segmentHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import ProductCard from '@/components/ProductCard/ProductCard';
import FamilyFilter, { type FamilyGroup } from '@/components/FamilyFilter/FamilyFilter';
import FamilyNote from '@/components/FamilyNote/FamilyNote';
import Reveal from '@/components/Reveal/Reveal';
import s from './Catalogue.module.css';

const ACCENT: Record<SegmentKey, string> = {
  agri: 'var(--seg-agri)',
  humans: 'var(--seg-humans)',
  animals: 'var(--seg-animals)',
  general: 'var(--seg-general)',
};

export default function SegmentView({ locale, segment }: { locale: Locale; segment: SegmentKey }) {
  const t = getDictionary(locale);
  const products = productsOfSegment(segment);

  /**
   * Agriculture is organised by family — what a product does. Every other segment is
   * still grouped by brand range, which is how the archive presented them.
   */
  const families = familiesOf(segment);

  const grid = (list: Product[], soon = false) => (
    <div className={s.grid}>
      {list.map((product, i) => (
        <Reveal key={product.slug} delay={i * 50}>
          <ProductCard product={product} locale={locale} />
        </Reveal>
      ))}
      {/* Announced but deliberately unnamed — the client wants the word and nothing else. */}
      {soon && (
        <Reveal delay={list.length * 50}>
          <p className={s.soon}>SOON</p>
        </Reveal>
      )}
    </div>
  );

  const familyGroups: FamilyGroup[] = families.map((family) => ({
    key: family.key,
    label: familyName(family, t),
    content: (
      <>
        <h2 className={s.groupTitle}>{familyName(family, t)}</h2>
        {grid(productsOfFamily(family), family.soon)}
        {family.note && (
          <FamilyNote
            title={familyName(family, t)}
            summary={t.product.learnMore}
            paragraphs={t.familyNotes[family.note]}
          />
        )}
      </>
    ),
  }));

  const rangeGroups = rangesOf(segment)
    .map((range) => ({ range, list: products.filter((p) => p.range === range.slug) }))
    .filter(({ list }) => list.length > 0);

  /* Safety net: an own-segment product no family claims still gets shown. */
  const unclaimed = productsOutsideFamilies(segment);

  /*
   * Products whose home range sits in another segment. A family may claim one — the
   * Disinfectant family on Agriculture is made of them — and then it belongs up in the
   * filtered grid, not again at the foot of the page.
   */
  const claimed = new Set(families.flatMap((f) => f.products));
  const borrowed = products.filter((p) => p.segment !== segment && !claimed.has(p.slug));

  return (
    <>
      <PageHeader
        eyebrow={t.nav.products}
        title={t.segments[segment].name}
        lead={t.segments[segment].blurb}
        accent={ACCENT[segment]}
        image={segmentHero(segment)}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          { label: t.nav.products, href: href(locale, 'products') },
          { label: t.segments[segment].name },
        ]}
      />

      <div className="section">
        <div className="page" style={{ '--accent': ACCENT[segment] } as React.CSSProperties}>
          {families.length > 0 ? (
            /*
             * Animals opens on its four sub-categories and nothing else — the client was
             * explicit that the products appear only once one of them is clicked
             * (briefing of 2026-09-13). Agriculture keeps the "all products" way in.
             */
            <FamilyFilter
              allLabel={t.product.allProducts}
              groups={familyGroups}
              initial={segment === 'animals' ? 'none' : 'all'}
              emptyHint={segment === 'animals' ? t.product.chooseCategory : undefined}
            />
          ) : (
            rangeGroups.map(({ range, list }) => (
              <section key={range.slug}>
                <h2 className={s.groupTitle}>{range.name}</h2>
                {grid(list)}
              </section>
            ))
          )}

          {unclaimed.length > 0 && (
            <section>
              <h2 className={s.groupTitle}>{t.product.products}</h2>
              {grid(unclaimed)}
            </section>
          )}

          {borrowed.length > 0 && (
            <section>
              <h2 className={s.groupTitle}>{t.product.relatedTitle}</h2>
              {grid(borrowed)}
            </section>
          )}
        </div>
      </div>
    </>
  );
}

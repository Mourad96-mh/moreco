import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { getRange, productCopy, productImage, productName, type Product } from '@/data/products';
import { productHref } from '@/data/routes';
import AddToQuote from '@/components/Quote/AddToQuote';
import s from './ProductCard.module.css';

const SEGMENT_ACCENT = {
  agri: 'var(--seg-agri)',
  humans: 'var(--seg-humans)',
  animals: 'var(--seg-animals)',
  general: 'var(--seg-general)',
} as const;

export default function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const t = getDictionary(locale);
  const copy = productCopy(product.slug, locale);
  const image = productImage(product.slug);
  /* Until its pack shot arrives, a product shows its range's brand mark. */
  const placeholder = image ? null : getRange(product.range)?.brandMark;

  return (
    <article
      className={s.card}
      style={{ '--accent': SEGMENT_ACCENT[product.segment] } as React.CSSProperties}
    >
      <Link href={productHref(locale, product.slug)} className={s.media} tabIndex={-1} aria-hidden="true">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1100px) 300px, (min-width: 700px) 33vw, 50vw"
            className={s.img}
          />
        )}
        {placeholder && <Image src={placeholder} alt="" fill sizes="300px" className={s.placeholder} />}
      </Link>

      <div className={s.body}>
        <h3 className={s.title}>
          <Link href={productHref(locale, product.slug)}>{productName(product, locale)}</Link>
        </h3>

        {copy.claim && <p className={s.claim}>{copy.claim}</p>}

        {copy.sizes.length > 0 && (
          <p className={s.sizes}>
            <span className={s.sizesLabel}>{t.product.availableIn}</span> {copy.sizes.join(' · ')}
          </p>
        )}

        <div className={s.actions}>
          <AddToQuote
            slug={product.slug}
            size="small"
            labels={{ add: t.product.addToQuote, inQuote: t.product.inQuote }}
          />
        </div>
      </div>
    </article>
  );
}

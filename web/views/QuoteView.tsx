import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { PRODUCTS, productImage, productName } from '@/data/products';
import { href } from '@/data/routes';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import QuoteForm from '@/components/Quote/QuoteForm';

export default function QuoteView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  /** The basket only stores slugs; the page supplies the names and pack shots. */
  const catalogue = PRODUCTS.map((p) => ({
    slug: p.slug,
    name: productName(p, locale),
    image: productImage(p.slug),
  }));

  return (
    <>
      <PageHeader
        title={t.quote.title}
        lead={t.quote.intro}
        image={pageHero('quote')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[{ label: t.site.name, href: href(locale, 'home') }, { label: t.quote.title }]}
      />

      <div className="section">
        <div className="page">
          <QuoteForm
            locale={locale}
            catalogue={catalogue}
            productsHref={href(locale, 'products')}
            labels={t.quote}
          />
        </div>
      </div>
    </>
  );
}

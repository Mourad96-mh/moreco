import Link from 'next/link';
import { notFound } from 'next/navigation';

import { SITE_URL, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, productHref, newsPostHref } from '@/data/routes';
import { getWeeklyPost, WEEKLY_POSTS } from '@/data/weekly-news';
import { getProduct, productName } from '@/data/products';
import { formatDate } from '@/data/news';
import PageHeader from '@/components/PageHeader/PageHeader';
import Blocks from '@/components/Blocks/Blocks';
import Reveal from '@/components/Reveal/Reveal';
import s from './KnowledgeArticleView.module.css';

/**
 * One weekly news post (data/weekly-news.json). The client's photograph is the banner;
 * the page carries a NewsArticle JSON-LD so Google can read it as a dated news piece.
 * It borrows the knowledge-centre article's layout: same reading width, same footer.
 */
export default function NewsPostView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getDictionary(locale);
  const post = getWeeklyPost(slug);
  if (!post) notFound();

  const title = post.title[locale];
  const newsHref = href(locale, 'news');
  const product = post.product ? getProduct(post.product) : undefined;

  /* "Next" walks to the previous week, wrapping round; with one post there is none. */
  const index = WEEKLY_POSTS.findIndex((p) => p.slug === slug);
  const next = WEEKLY_POSTS[(index + 1) % WEEKLY_POSTS.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: post.seoDescription[locale],
    image: [`${SITE_URL}${post.image}`],
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale,
    keywords: post.keywords[locale].join(', '),
    mainEntityOfPage: `${SITE_URL}${newsPostHref(locale, slug)}`,
    author: { '@type': 'Organization', name: 'Moreco', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Moreco',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/media/brand/moreco-logo.webp` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <PageHeader
        eyebrow={t.news.weekly}
        title={title}
        image={post.image}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          { label: t.pages.news.title, href: newsHref },
          { label: title },
        ]}
      />

      <div className="section">
        <div className={`page-narrow ${s.article}`}>
          <p className={s.date}>
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          </p>

          <Reveal>
            <p className="lead">{post.lead[locale]}</p>
            <Blocks blocks={post.blocks[locale]} />
          </Reveal>

          {product && (
            <p style={{ marginTop: '2rem' }}>
              <Link className="btn" href={productHref(locale, product.slug)}>
                {t.news.discover.replace('{product}', productName(product, locale))}
              </Link>
            </p>
          )}

          <nav className={s.footer} aria-label={t.news.allNews}>
            <Link className={s.back} href={newsHref}>
              <Arrow flip />
              {t.news.allNews}
            </Link>

            {next.slug !== slug && (
              <Link className={s.next} href={newsPostHref(locale, next.slug)}>
                <span className={s.nextLabel}>{next.title[locale]}</span>
                <Arrow />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}

const Arrow = ({ flip }: { flip?: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    style={flip ? { transform: 'scaleX(-1)' } : undefined}
  >
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

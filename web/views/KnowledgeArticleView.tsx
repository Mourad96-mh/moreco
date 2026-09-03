import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, articleHref } from '@/data/routes';
import {
  ARTICLES,
  getArticle,
  articleTitle,
  articleExcerpt,
  articleBody,
  articleImage,
  articleDate,
  articlePdf,
} from '@/data/articles';
import { formatDate } from '@/data/news';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Blocks from '@/components/Blocks/Blocks';
import Reveal from '@/components/Reveal/Reveal';
import s from './KnowledgeArticleView.module.css';

/**
 * One knowledge-centre article. The bodies came out of the archive with the rest of the
 * site and then sat unread in data/articles.json — the centre only ever listed their
 * titles. This is the page that publishes them.
 */
export default function KnowledgeArticleView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getDictionary(locale);
  const article = getArticle(slug);
  if (!article) notFound();

  const index = ARTICLES.findIndex((a) => a.slug === slug);
  const next = ARTICLES[(index + 1) % ARTICLES.length];

  const title = articleTitle(article, locale);
  const date = articleDate(article);
  const image = articleImage(article);
  const body = articleBody(article, locale);
  const pdf = articlePdf(slug);

  return (
    <>
      <PageHeader
        eyebrow={t.nav.publications}
        title={title}
        lead={articleExcerpt(article, locale)}
        image={pageHero('knowledge')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          { label: t.pages.resources.title, href: href(locale, 'resources') },
          { label: t.nav.knowledge, href: href(locale, 'knowledge') },
          { label: title },
        ]}
      />

      <div className="section">
        <div className={`page-narrow ${s.article}`}>
          {date && (
            <p className={s.date}>
              <time dateTime={date}>{formatDate(date, locale)}</time>
            </p>
          )}

          {image && (
            <Reveal>
              <figure className={s.figure}>
                <Image src={image} alt="" width={870} height={296} sizes="(min-width: 820px) 780px, 100vw" />
              </figure>
            </Reveal>
          )}

          {body.length > 0 && (
            <Reveal>
              <Blocks blocks={body} />
            </Reveal>
          )}

          {/*
            * The study the old site offered through its download widget. The widget
            * itself came out of the crawl as unreadable prose and is stripped from the
            * body; the file it pointed at is here.
            */}
          {pdf && (
            <p className={s.download}>
              <a href={pdf.pdf} target="_blank" rel="noopener noreferrer">
                <PdfIcon />
                {t.article.download}
                <span className={s.size}>
                  PDF · {Math.round(pdf.bytes / 1024)} {t.article.sizeUnit}
                </span>
              </a>
            </p>
          )}

          <nav className={s.footer} aria-label={t.nav.publications}>
            <Link className={s.back} href={href(locale, 'knowledge')}>
              <Arrow flip />
              {t.nav.knowledge}
            </Link>

            {next.slug !== slug && (
              <Link className={s.next} href={articleHref(locale, next.slug)}>
                <span className={s.nextLabel}>{articleTitle(next, locale)}</span>
                <Arrow />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}

const PdfIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6" />
    <path d="M12 18v-6M9 15l3 3 3-3" />
  </svg>
);

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

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, articleHref } from '@/data/routes';
import {
  KNOWLEDGE_ARTICLES,
  PUBLICATIONS,
  getArticle,
  isPublication,
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
 * One article. The bodies came out of the archive with the rest of the site and then sat
 * unread in data/articles.json — the listings only ever showed their titles. This is the
 * page that publishes them.
 *
 * Two lists lead here since 2026-09-09: the knowledge centre and, for the peer-reviewed
 * studies, R&D + I. The breadcrumb, the eyebrow and "next" follow whichever list the
 * piece belongs to. The URL is unchanged either way — the archive's redirects point at
 * it, and a study is still the same document wherever it is listed.
 */
export default function KnowledgeArticleView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getDictionary(locale);
  const article = getArticle(slug);
  if (!article) notFound();

  const publication = isPublication(slug);
  const siblings = publication ? PUBLICATIONS : KNOWLEDGE_ARTICLES;
  const parent = publication
    ? { label: t.rdi.title, href: `${href(locale, 'rdi')}#publications` }
    : { label: t.nav.knowledge, href: href(locale, 'knowledge') };

  const index = siblings.findIndex((a) => a.slug === slug);
  const next = siblings[(index + 1) % siblings.length];

  const title = articleTitle(article, locale);
  const date = articleDate(article);
  const image = articleImage(article);
  const body = articleBody(article, locale);
  const pdf = articlePdf(slug);

  return (
    <>
      <PageHeader
        eyebrow={publication ? t.nav.publications : t.nav.knowledge}
        title={title}
        lead={articleExcerpt(article, locale)}
        image={pageHero('knowledge')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          ...(publication
            ? []
            : [{ label: t.pages.resources.title, href: href(locale, 'resources') }]),
          parent,
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

          <nav className={s.footer} aria-label={parent.label}>
            <Link className={s.back} href={parent.href}>
              <Arrow flip />
              {parent.label}
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

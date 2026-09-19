import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, articleHref } from '@/data/routes';
import {
  KNOWLEDGE_ARTICLES,
  articleTitle,
  articleExcerpt,
  articleImage,
  articleDate,
  articlePdf,
  type Article,
} from '@/data/articles';
import { formatDate } from '@/data/news';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Reveal from '@/components/Reveal/Reveal';
import s from './KnowledgeView.module.css';

/**
 * The knowledge centre: one list, newest first.
 *
 * Two rounds of the client's briefing shaped this. The peer-reviewed studies left for
 * R&D + I, which is now the one place they are published (see PUBLICATIONS in
 * data/articles.ts and RdiView). Then "L'importance du silicium" lost its pinned
 * flagship block: a single chronological list was asked for, and a 2013 interview held
 * above a 2014 article is not one. On 2026-09-18 the interview left this list too, for
 * the scientific publications on R&D + I.
 */
export default function KnowledgeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <PageHeader
        title={t.pages.knowledge.title}
        lead={t.pages.knowledge.lead}
        image={pageHero('knowledge')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          { label: t.pages.resources.title, href: href(locale, 'resources') },
          { label: t.pages.knowledge.title },
        ]}
      />

      <section className="section" id="articles">
        <div className="page">
          <div className={s.grid}>
            {KNOWLEDGE_ARTICLES.map((article, i) => (
              <Reveal key={article.slug} delay={(i % 3) * 70}>
                <Link className={s.card} href={articleHref(locale, article.slug)}>
                  {articleImage(article) && (
                    <span className={s.cardMedia}>
                      <Image
                        src={articleImage(article)!}
                        alt=""
                        width={870}
                        height={296}
                        sizes="(min-width: 1100px) 30vw, (min-width: 700px) 46vw, 100vw"
                        className={s.cardImg}
                        /* First card of the only list on the page: it is the LCP. */
                        priority={i === 0}
                      />
                    </span>
                  )}

                  <span className={s.cardText}>
                    <span className={s.cardTitle}>{articleTitle(article, locale)}</span>
                    <Meta article={article} locale={locale} t={t} />
                    <span className={s.excerpt}>{articleExcerpt(article, locale)}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/** Date and, where the old site offered the study itself, a PDF chip. */
function Meta({
  article,
  locale,
  t,
}: {
  article: Article;
  locale: Locale;
  t: ReturnType<typeof getDictionary>;
}) {
  const date = articleDate(article);
  const pdf = articlePdf(article.slug);
  if (!date && !pdf) return null;

  return (
    <span className={s.meta}>
      {date && <time dateTime={date}>{formatDate(date, locale)}</time>}
      {pdf && (
        <span className={s.pdf}>
          PDF · {Math.round(pdf.bytes / 1024)} {t.article.sizeUnit}
        </span>
      )}
    </span>
  );
}

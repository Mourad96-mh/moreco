import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, articleHref } from '@/data/routes';
import {
  ARTICLES,
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
 * The knowledge centre: seven scientific pieces, each now a page of its own.
 *
 * The header menu points here twice — at "L'importance du silicium" (#silicon) and at
 * "Publications scientifiques" (#publications) — but the page only ever had one section
 * and no #publications anchor at all, so that menu item led nowhere. It is two sections
 * now: the flagship interview, then everything else.
 */
const FLAGSHIP = 'importance-du-silicium';

export default function KnowledgeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  const flagship = ARTICLES.find((a) => a.slug === FLAGSHIP);
  const rest = ARTICLES.filter((a) => a.slug !== FLAGSHIP);

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

      {flagship && (
        <section className="section" id="silicon">
          <div className="page">
            <Reveal>
              <Link className={s.flagship} href={articleHref(locale, flagship.slug)}>
                {articleImage(flagship) && (
                  <span className={s.flagshipMedia}>
                    <Image
                      src={articleImage(flagship)!}
                      alt=""
                      width={870}
                      height={296}
                      sizes="(min-width: 900px) 54vw, 100vw"
                      className={s.flagshipImg}
                      priority
                    />
                  </span>
                )}

                <span className={s.flagshipText}>
                  <span className="eyebrow">{t.nav.silicon}</span>
                  <span className={s.flagshipTitle}>{articleTitle(flagship, locale)}</span>
                  <Meta article={flagship} locale={locale} t={t} />
                  <span className={s.excerpt}>{articleExcerpt(flagship, locale)}</span>
                </span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section section--tint" id="publications">
        <div className="page">
          <Reveal>
            <h2 className={s.sectionTitle}>{t.nav.publications}</h2>
          </Reveal>

          <div className={s.grid}>
            {rest.map((article, i) => (
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

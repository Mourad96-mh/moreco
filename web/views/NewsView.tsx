import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, articleHref, newsPostHref } from '@/data/routes';
import { newsPosts, formatDate, type NewsPost } from '@/data/news';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Reveal from '@/components/Reveal/Reveal';
import s from './NewsView.module.css';

/**
 * The newsroom. The archive gave us eight posts as one flat column of prose; here they
 * are posts again, as one grid of cards, newest first. The latest post used to lead at
 * full width; since the weekly posts began (2026-11-06) the client wants them as cards
 * like the others, so every post now takes the same card.
 *
 * Seven of the eight announced an article that is still on the site, so their read-more
 * line finally goes somewhere: to that article in the knowledge centre.
 */
export default function NewsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const posts = newsPosts(locale);

  /* A weekly post opens its own page; an archive post, the article it announced. */
  const knowledgeHref = (post: NewsPost) =>
    post.postSlug
      ? newsPostHref(locale, post.postSlug)
      : post.articleSlug
        ? articleHref(locale, post.articleSlug)
        : null;
  /*
   * A weekly post borrows the archive's own read-more line ("Continuer a lire"), so its
   * card reads like every other one.
   */
  const archiveReadMore = posts.find((p) => !p.postSlug && p.readMore)?.readMore ?? t.news.readMore;
  const readMoreOf = (post: NewsPost): NewsPost =>
    post.postSlug ? { ...post, readMore: archiveReadMore } : post;

  return (
    <>
      <PageHeader
        title={t.pages.news.title}
        lead={t.pages.news.lead}
        image={pageHero('news')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[{ label: t.site.name, href: href(locale, 'home') }, { label: t.pages.news.title }]}
      />

      {/*
       * Moreco's technology leads the page (briefing of 2026-09-26), ahead of the
       * archive's posts. The three cards beside it — plant, human, animal — were taken
       * off on 2026-10-21: the client found they no longer fit there.
       */}
      <section className={`section ${s.tech}`}>
        <div className="page">
          <Reveal className={s.techText}>
            <p className="eyebrow">{t.news.techEyebrow}</p>
            <h2 className={s.techTitle}>{t.news.techTitle}</h2>
            {t.news.techText.map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'lead' : undefined}>
                {paragraph}
              </p>
            ))}
            <p className={s.signature}>
              {t.site.name.toUpperCase()} — {t.site.signature}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="section">
        <div className="page">
          <h2 className={s.postsTitle}>{t.news.postsTitle}</h2>

          {posts.length > 0 && (
            <div className={s.grid}>
              {posts.map((post, i) => (
                <Reveal key={post.title} delay={(i % 3) * 70} className={s.cell}>
                  <article className={s.card}>
                    {post.image && (
                      <div className={s.cardMedia}>
                        <Image
                          src={post.image}
                          alt=""
                          width={post.imageWidth ?? 870}
                          height={post.imageHeight ?? 296}
                          sizes="(min-width: 1100px) 30vw, (min-width: 700px) 46vw, 100vw"
                          className={post.imageWidth ? `${s.cardImg} ${s.strip}` : s.cardImg}
                          priority={i === 0}
                        />
                      </div>
                    )}

                    <div className={s.cardText}>
                      <PostMeta post={post} locale={locale} />
                      <h3 className={s.cardTitle}>{post.title}</h3>
                      <p className={s.cardExcerpt}>{post.excerpt}</p>
                      <ReadMore post={readMoreOf(post)} to={knowledgeHref(post)} />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/** The date, in the reader's language. Posts whose meta line was unreadable show none. */
function PostMeta({ post, locale }: { post: NewsPost; locale: Locale }) {
  if (!post.date) return null;
  return (
    <p className={s.meta}>
      <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
    </p>
  );
}

/**
 * The archive's own read-more wording, kept because it is already translated. Without a
 * matching article it would be a link to nowhere, so it is dropped rather than faked.
 */
function ReadMore({ post, to }: { post: NewsPost; to: string | null }) {
  if (!to || !post.readMore) return null;
  return (
    <Link className={s.more} href={to}>
      {post.readMore}
      <svg
        width="15"
        height="15"
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
    </Link>
  );
}

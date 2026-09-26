import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, articleHref, segmentHref } from '@/data/routes';
import { newsPosts, formatDate, type NewsPost } from '@/data/news';
import type { SegmentKey } from '@/data/products';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Reveal from '@/components/Reveal/Reveal';
import s from './NewsView.module.css';

/**
 * The newsroom. The archive gave us eight posts as one flat column of prose; here they
 * are posts again — the latest one leading at full width, the rest as a grid.
 *
 * Seven of the eight announced an article that is still on the site, so their read-more
 * line finally goes somewhere: to that article in the knowledge centre.
 */
/** Plant, human, animal — in the order the technology text names them. */
const TECH_DOMAINS: { segment: SegmentKey; accent: string }[] = [
  { segment: 'agri', accent: 'var(--seg-agri)' },
  { segment: 'humans', accent: 'var(--seg-humans)' },
  { segment: 'animals', accent: 'var(--seg-animals)' },
];

export default function NewsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const posts = newsPosts(locale);
  const [lead, ...rest] = posts;

  const knowledgeHref = (post: NewsPost) =>
    post.articleSlug ? articleHref(locale, post.articleSlug) : null;

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
       * archive's posts: the client's text, and the three domains it names, each one a
       * way into its catalogue in the colour of its hexagon.
       */}
      <section className={`section ${s.tech}`}>
        <div className={`page ${s.techInner}`}>
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

          <Reveal className={s.pillars} delay={100}>
            {TECH_DOMAINS.map((domain, i) => (
              <Link
                key={domain.segment}
                href={segmentHref(locale, domain.segment)}
                className={s.pillar}
                style={{ '--accent': domain.accent } as React.CSSProperties}
              >
                <span className={s.pillarMark} aria-hidden="true">
                  OSA
                </span>
                <span className={s.pillarName}>{t.news.techPillars[i]}</span>
                <span className={s.pillarSegment}>{t.segments[domain.segment].name}</span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <div className="section">
        <div className="page">
          <h2 className={s.postsTitle}>{t.news.postsTitle}</h2>

          {lead && (
            <Reveal>
              <article className={s.lead}>
                {lead.image && (
                  <div className={s.leadMedia}>
                    <Image
                      src={lead.image}
                      alt=""
                      width={870}
                      height={296}
                      sizes="(min-width: 900px) 56vw, 100vw"
                      className={s.leadImg}
                      priority
                    />
                  </div>
                )}

                <div className={s.leadText}>
                  <PostMeta post={lead} locale={locale} />
                  <h2 className={s.leadTitle}>{lead.title}</h2>
                  <p className={s.leadExcerpt}>{lead.excerpt}</p>
                  <ReadMore post={lead} to={knowledgeHref(lead)} />
                </div>
              </article>
            </Reveal>
          )}

          {rest.length > 0 && (
            <div className={s.grid}>
              {rest.map((post, i) => (
                <Reveal key={post.title} delay={(i % 3) * 70} className={s.cell}>
                  <article className={s.card}>
                    {post.image && (
                      <div className={s.cardMedia}>
                        <Image
                          src={post.image}
                          alt=""
                          width={870}
                          height={296}
                          sizes="(min-width: 1100px) 30vw, (min-width: 700px) 46vw, 100vw"
                          className={s.cardImg}
                        />
                      </div>
                    )}

                    <div className={s.cardText}>
                      <PostMeta post={post} locale={locale} />
                      <h3 className={s.cardTitle}>{post.title}</h3>
                      <p className={s.cardExcerpt}>{post.excerpt}</p>
                      <ReadMore post={post} to={knowledgeHref(post)} />
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

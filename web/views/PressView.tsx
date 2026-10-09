import Image from 'next/image';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href } from '@/data/routes';
import { pressContent } from '@/data/press';
import { PRESS_ARTICLES } from '@/data/press-articles';
import { formatDate } from '@/data/news';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Reveal from '@/components/Reveal/Reveal';
import s from './PressView.module.css';

/**
 * Media & events: the two trade shows Moreco exhibited at in 2014, with their dossiers
 * and the stand video. The downloads block that closed the page (brochure, sales terms,
 * the silicon interview) came off with the briefing of 2026-09-28; the Médina FM
 * interviews and the press coverage came off on 2026-09-29. Press articles came back on
 * 2026-10-07 as the client retypes them — see data/press-articles.json.
 *
 * Everything here is twelve years old, so the page says so plainly rather than presenting
 * it as what is coming up — the archive's own heading called these "événements à venir",
 * which would now be simply untrue.
 */
export default function PressView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { events, video } = pressContent(locale);

  return (
    <>
      <PageHeader
        title={t.pages.media.title}
        lead={t.pages.media.lead}
        image={pageHero('media')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          { label: t.pages.news.title, href: href(locale, 'news') },
          { label: t.pages.media.title },
        ]}
      />

      <div className="section">
        <div className="page">
          <Reveal>
            <h2 className={s.sectionTitle}>{t.press.eventsTitle}</h2>
            <p className={s.archive}>{t.press.archive}</p>
          </Reveal>

          {events.map((event, i) => (
            <Reveal key={event.title} delay={i * 80}>
              <article className={s.event}>
                <div className={s.eventText}>
                  <h2 className={s.eventTitle}>{event.title}</h2>
                  {event.subtitle && <p className={s.eventSubtitle}>{event.subtitle}</p>}

                  <div className={s.sessions}>
                    {event.sessions.map((session, j) => (
                      <div key={session.title ?? j} className={s.session}>
                        {session.title && <h3 className={s.sessionTitle}>{session.title}</h3>}

                        {session.details.length > 0 && (
                          <ul className={s.details}>
                            {session.details.map((detail) => (
                              <li key={detail}>{detail}</li>
                            ))}
                          </ul>
                        )}

                        {session.note && <p className={s.note}>{session.note}</p>}
                      </div>
                    ))}
                  </div>

                  {event.dossier && (
                    <a className={s.dossier} href={event.dossier.pdf} target="_blank" rel="noopener noreferrer">
                      <PdfIcon />
                      {t.press.dossier}
                      <span className={s.size}>
                        PDF · {Math.round(event.dossier.bytes / 1024)} {t.article.sizeUnit}
                      </span>
                    </a>
                  )}
                </div>

                {event.photo && (
                  <figure className={s.photo}>
                    <Image
                      src={event.photo}
                      alt={event.photoCaption ?? ''}
                      width={570}
                      height={357}
                      sizes="(min-width: 900px) 42vw, 100vw"
                    />
                    {event.photoCaption && <figcaption>{event.photoCaption}</figcaption>}
                  </figure>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {PRESS_ARTICLES.length > 0 && (
        <section className="section section--tint" id="press">
          <div className="page">
            <Reveal>
              <h2 className={s.sectionTitle}>{t.press.articlesTitle}</h2>
              <p className="lead">{t.press.articlesIntro}</p>
            </Reveal>

            <ul className={s.articles}>
              {PRESS_ARTICLES.map((article, i) => (
                <Reveal key={article.slug} as="li" delay={(i % 3) * 70}>
                  <a className={s.article} href={article.file} target="_blank" rel="noopener noreferrer">
                    <span className={s.articleMeta}>
                      {article.outlet} · <time dateTime={article.date}>{formatDate(article.date, locale)}</time>
                    </span>
                    <span className={s.articleTitle}>{article.title}</span>
                    <span className={s.size}>
                      <PdfIcon />
                      PDF{article.bytes ? ` · ${Math.round(article.bytes / 1024)} ${t.article.sizeUnit}` : ''}
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {video && (
        <section className="section section--tint">
          <div className="page-narrow">
            <Reveal>
              <h2 className={s.videoTitle}>{video.title}</h2>
              <div className={s.video}>
                <iframe
                  src={video.embed}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}

const PdfIcon = () => (
  <svg
    width="18"
    height="18"
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


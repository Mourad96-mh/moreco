import Image from 'next/image';
import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, articleHref } from '@/data/routes';
import { pressContent } from '@/data/press';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Reveal from '@/components/Reveal/Reveal';
import s from './PressView.module.css';

/**
 * Media & events: the two trade shows Moreco exhibited at in 2014, with the dossiers,
 * the brochure and the stand video.
 *
 * Everything here is twelve years old, so the page says so plainly rather than presenting
 * it as what is coming up — the archive's own heading called these "événements à venir",
 * which would now be simply untrue.
 */
export default function PressView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { events, downloads, articleLink, video } = pressContent(locale);

  const downloadLabel = (key: 'product-brochure' | 'sales-terms') =>
    key === 'product-brochure' ? t.press.productBrochure : t.press.salesTerms;

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

      {(downloads.length > 0 || articleLink) && (
        <section className="section">
          <div className="page">
            <Reveal>
              <h2 className={s.downloadsTitle}>{t.press.downloads}</h2>
            </Reveal>

            <div className={s.downloads}>
              {downloads.map((download, i) => (
                <Reveal key={download.key} delay={i * 70}>
                  <a className={s.download} href={download.pdf} target="_blank" rel="noopener noreferrer">
                    <PdfIcon />
                    <span className={s.downloadText}>
                      <span className={s.downloadLabel}>{downloadLabel(download.key)}</span>
                      <span className={s.size}>
                        PDF · {Math.round(download.bytes / 1024)} {t.article.sizeUnit}
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}

              {/* The interview the page offered as a PDF is a page of its own now. */}
              {articleLink && (
                <Reveal delay={downloads.length * 70}>
                  <Link className={s.download} href={articleHref(locale, articleLink.slug)}>
                    <DocIcon />
                    <span className={s.downloadText}>
                      <span className={s.downloadLabel}>{articleLink.label}</span>
                      <span className={s.size}>{t.nav.publications}</span>
                    </span>
                  </Link>
                </Reveal>
              )}
            </div>
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

const DocIcon = () => (
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
    <path d="M9 13h6M9 17h4" />
  </svg>
);

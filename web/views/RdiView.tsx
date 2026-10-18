import Link from 'next/link';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, articleHref } from '@/data/routes';
import { MOROCCO_CAMPAIGNS } from '@/data/trials';
import { PUBLICATIONS, articleTitle, articleExcerpt, articleDate, articlePdf } from '@/data/articles';
import { formatDate } from '@/data/news';
import { PUBLICATION_DOCUMENTS, publicationDocumentDate } from '@/data/publication-documents';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Reveal from '@/components/Reveal/Reveal';
import s from './RdiView.module.css';

/**
 * R&D + I.
 *
 * The client wrote this page's copy themselves (briefing of 2026-09-17) and set its
 * headings: the H1 names the department, the H2 under it is the single word Innovation.
 * What follows is their text, unedited, in two movements — what the department is, and
 * the invitation to have something formulated.
 *
 * The trial results used to run down the middle of this page. They moved to Resources on
 * the same date and are a page of their own now (views/TrialsView.tsx). The trials keep
 * a way in from here, below the figures they explain.
 *
 * The peer-reviewed studies close the page (#publications, where the header menu points
 * since 2026-09-09). They were listed in the knowledge centre until the client ruled
 * that a scientific publication belongs here and nowhere else.
 */
export default function RdiView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      {/* One title line, as the client set it on 2026-10-18: Moreco / R&D + I / the
          department's full name. The breadcrumb went: it read "Moreco / R&D + I", the
          same words again. */}
      <PageHeader
        title={`${t.site.name} / ${t.nav.rdi} / ${t.rdi.title}`}
        wide
        lead={t.rdi.intro}
        image={pageHero('rdi')}
        crumbLabel={t.a11y.breadcrumb}
      />

      {/*
       * Four figures, and the first two must not be confused with each other: 215 is the
       * group's worldwide trial programme (client briefing, 2026-09-13), while the one
       * beside it is the Moroccan campaigns alone. Both are figures the client gives us
       * — the Moroccan one was a count of the trial pages until the briefing of
       * 2026-09-18 set it at 117, then 24 on 2026-10-18; the About page quotes the same
       * number. The result sheets (37) and the first campaign (2012) are the client's
       * figures too since that briefing.
       */}
      <section className={s.stats}>
        <div className={`page ${s.statsInner}`}>
          <Reveal className={s.stat}>
            <p className={s.statNumber}>215</p>
            <p className={s.statLabel}>{t.rdi.statTrialsWorld}</p>
          </Reveal>
          <Reveal className={s.stat} delay={90}>
            <p className={s.statNumber}>{MOROCCO_CAMPAIGNS}</p>
            <p className={s.statLabel}>{t.rdi.statTrials}</p>
          </Reveal>
          <Reveal className={s.stat} delay={180}>
            <p className={s.statNumber}>37</p>
            <p className={s.statLabel}>{t.rdi.statPlates}</p>
          </Reveal>
          <Reveal className={s.stat} delay={270}>
            <p className={s.statNumber}>2012</p>
            <p className={s.statLabel}>{t.rdi.statSince}</p>
          </Reveal>
        </div>

        {/* The campaigns and the plates are what the trial pages show, so those pages
            are one click away from the band that quotes them. */}
        <div className={`page ${s.statsLink}`}>
          <Link href={href(locale, 'trials')} className={s.trialsLink}>
            {t.rdi.allTrials}
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className="section" id="innovation">
        <div className="page-narrow">
          <Reveal>
            <h2>{t.rdi.innovationTitle}</h2>
            <p className="lead">{t.rdi.innovationLead}</p>
            {t.rdi.innovationText.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal className={s.bespoke} delay={90}>
            <h3>{t.rdi.customTitle}</h3>
            {t.rdi.customText.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
            {/* The question the client closes on (2026-09-27), leading into the button. */}
            <p className={s.bespokeAsk}>
              <strong>{t.rdi.customAskTitle}</strong>
              <br />
              {t.rdi.customAskText}
            </p>
            <Link className="btn" href={href(locale, 'contact')}>
              {t.rdi.customCta}
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint" id="publications">
        <div className="page">
          <Reveal>
            <h2>{t.nav.publications}</h2>
            <p className="lead">{t.rdi.publicationsIntro}</p>
          </Reveal>

          <ul className={s.papers}>
            {PUBLICATIONS.map((article, i) => {
              const date = articleDate(article);
              const pdf = articlePdf(article.slug);

              return (
                <Reveal key={article.slug} as="li" delay={(i % 3) * 70} className={s.paper}>
                  <Link className={s.paperLink} href={articleHref(locale, article.slug)}>
                    <span className={s.paperMeta}>
                      {date && <time dateTime={date}>{formatDate(date, locale)}</time>}
                      {pdf && (
                        <span className={s.pdf}>
                          PDF · {Math.round(pdf.bytes / 1024)} {t.article.sizeUnit}
                        </span>
                      )}
                    </span>
                    <span className={s.paperTitle}>{articleTitle(article, locale)}</span>
                    <span className={s.paperExcerpt}>{articleExcerpt(article, locale)}</span>
                  </Link>
                </Reveal>
              );
            })}

            {/* Papers with no page of their own: the card is the download. */}
            {PUBLICATION_DOCUMENTS.map((doc, i) => (
              <Reveal key={doc.slug} as="li" delay={((PUBLICATIONS.length + i) % 3) * 70} className={s.paper}>
                <a className={s.paperLink} href={doc.file} download>
                  <span className={s.paperMeta}>
                    <span>{publicationDocumentDate(doc, locale)}</span>
                    <span className={s.pdf}>
                      {doc.file.split('.').pop()!.toUpperCase()}
                      {doc.bytes ? ` · ${Math.round(doc.bytes / 1024)} ${t.article.sizeUnit}` : ''}
                    </span>
                  </span>
                  <span className={s.paperTitle}>{doc.title}</span>
                  <span className={s.paperExcerpt}>{doc.source}</span>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

const ArrowIcon = () => (
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
);

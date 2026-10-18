import Link from 'next/link';
import { notFound } from 'next/navigation';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, rangeHref, solutionHref, trialHref } from '@/data/routes';
import {
  AOS_TECHNOLOGY,
  CROP_GROUPS,
  CROP_SOLUTIONS,
  getCropSolution,
  type FaqItem,
} from '@/data/crop-solutions';
import { FLYERS, flyerText } from '@/data/flyers';
import { pageHero, segmentHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Reveal from '@/components/Reveal/Reveal';
import s from './SolutionsView.module.css';

/**
 * "Technologie A.O.S." and "Nos solutions par culture", the two entries the client's
 * briefing of 2026-10-18 adds to the menu. The text lives in data/crop-solutions.ts.
 *
 * Each FAQ is in the page twice over: once as reading matter, once as FAQPage structured
 * data, which is what the briefing's "FAQ Scientifique (GEO/SEO)" is after — search
 * engines and AI assistants read the question and its answer as a pair.
 */

/** The technology page. */
export function TechnologyView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <FaqSchema faq={AOS_TECHNOLOGY.faq} />
      <PageHeader
        eyebrow="Orthagrow"
        title={t.nav.technology}
        lead={t.solutions.technologyLead}
        image={pageHero('rdi')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[{ label: t.site.name, href: href(locale, 'home') }, { label: t.nav.technology }]}
      />

      <div className="section">
        <div className={`page-narrow ${s.body}`}>
          <Reveal>
            <h2>{AOS_TECHNOLOGY.title}</h2>
            <p className="lead">{AOS_TECHNOLOGY.intro}</p>
          </Reveal>

          <Faq title={t.solutions.faq} faq={AOS_TECHNOLOGY.faq} />

          <div className={s.actions}>
            <Link className="btn" href={href(locale, 'solutions')}>
              {t.solutions.title}
            </Link>
            <Link className="btn btn--ghost" href={rangeHref(locale, 'orthagrow')}>
              {t.solutions.orthagrow}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/** The list of crops, in the menu's two groups. */
export function SolutionsIndexView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <>
      <PageHeader
        eyebrow="Orthagrow"
        title={t.solutions.title}
        lead={t.solutions.lead}
        image={segmentHero('agri')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[{ label: t.site.name, href: href(locale, 'home') }, { label: t.solutions.title }]}
      />

      <div className="section">
        <div className="page">
          {CROP_GROUPS.map((group) => (
            <section key={group} className={s.group}>
              <h2>{t.solutions[group]}</h2>
              <ul className={s.cards}>
                {CROP_SOLUTIONS.filter((c) => c.group === group).map((crop) => (
                  <li key={crop.slug}>
                    <Link href={solutionHref(locale, crop.slug)} className={s.card}>
                      <span className={s.cardName}>{crop.name[locale]}</span>
                      {crop.regions && <span className={s.cardRegions}>{crop.regions}</span>}
                      <span className={s.cardTitle}>{crop.title}</span>
                      <span className={s.cardMore}>{t.solutions.discover} →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <p className={s.actions}>
            <Link className="btn btn--ghost" href={href(locale, 'technology')}>
              {t.solutions.technologyCta}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

/** One crop: the technical presentation, its FAQ, then the crop sheet and the trial. */
export function SolutionView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getDictionary(locale);
  const crop = getCropSolution(slug);
  if (!crop) notFound();

  const flyer = crop.flyer ? FLYERS.find((f) => f.slug === crop.flyer) : undefined;
  const sheet = flyer ? flyerText(flyer, locale) : [];

  return (
    <>
      <FaqSchema faq={crop.faq} />
      <PageHeader
        eyebrow={`${t.solutions.title} · ${t.solutions[crop.group]}`}
        title={crop.title}
        lead={crop.regions}
        image={segmentHero('agri')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          { label: t.solutions.title, href: href(locale, 'solutions') },
          { label: crop.name[locale] },
        ]}
      />

      <div className="section">
        <div className={`page-narrow ${s.body}`}>
          <Reveal>
            <p className="lead">{crop.intro}</p>
          </Reveal>

          <Faq title={t.solutions.faq} faq={crop.faq} />

          {/* The crop sheet's text for the same crop (client, 2026-10-18). */}
          {sheet.length > 0 && (
            <Reveal className={s.sheet}>
              <h2>{t.solutions.range}</h2>
              {sheet.map((paragraph, i) => (
                <p key={i} className={paragraph.startsWith('Choisissez') ? s.closing : undefined}>
                  {paragraph}
                </p>
              ))}
            </Reveal>
          )}

          <div className={s.actions}>
            {crop.trial && (
              <Link className="btn" href={trialHref(locale, crop.trial)}>
                {t.solutions.trial}
              </Link>
            )}
            <Link className="btn btn--ghost" href={href(locale, 'technology')}>
              {t.solutions.technologyCta}
            </Link>
          </div>

          <nav className={s.siblings} aria-label={t.solutions.all}>
            <Link href={href(locale, 'solutions')}>← {t.solutions.all}</Link>
          </nav>
        </div>
      </div>
    </>
  );
}

function Faq({ title, faq }: { title: string; faq: FaqItem[] }) {
  return (
    <section className={s.faq}>
      <h2>{title}</h2>
      {faq.map((item) => (
        <Reveal key={item.q} className={s.qa}>
          <h3 className={s.question}>{item.q}</h3>
          {item.a.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
          {item.list && (
            <ul className={s.list}>
              {item.list.map((point) => (
                <li key={point}>
                  <LabelledPoint text={point} />
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}
    </section>
  );
}

/** "Homéostasie ionique : elle régule…" — the label before the colon in bold. */
function LabelledPoint({ text }: { text: string }) {
  const match = text.match(/^([^:]{3,60}?)(\s?:\s)(.+)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      <strong>{match[1]}</strong>
      {match[2]}
      {match[3]}
    </>
  );
}

/** schema.org FAQPage, so the questions can be read as questions by search engines. */
function FaqSchema({ faq }: { faq: FaqItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: [...item.a, ...(item.list ?? [])].join(' '),
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

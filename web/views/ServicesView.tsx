import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, segmentHref } from '@/data/routes';
import { servicesContent, type ServiceSection } from '@/data/services';
import { pageHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import FeatureRow from '@/components/FeatureRow/FeatureRow';
import Reveal from '@/components/Reveal/Reveal';
import s from './ServicesView.module.css';

const ACCENT = {
  agri: 'var(--seg-agri)',
  humans: 'var(--seg-humans)',
  animals: 'var(--seg-animals)',
  general: 'var(--seg-general)',
  rdi: 'var(--green-dark)',
} as const;

/**
 * Applications & advice: what the silicon is used for, market by market.
 *
 * The archive rendered this as a column of pictures and paragraphs with dead "EN SAVOIR
 * PLUS" lines under each one. Here each section is an alternating row — the same shape
 * the home page uses — and every call to action reaches the catalogue domain or the R&D
 * pages it names.
 */
export default function ServicesView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const { introTitle, intro, sections } = servicesContent(locale);
  const firstParagraph = intro.findIndex((block) => block.type === 'paragraph');

  const linkFor = (section: ServiceSection) => {
    if (!section.target || !section.cta) return undefined;
    const to =
      section.target === 'rdi' ? href(locale, 'rdi') : segmentHref(locale, section.target);
    return { label: section.cta, href: to };
  };

  return (
    <>
      <PageHeader
        title={t.pages.services.title}
        lead={t.pages.services.lead}
        image={pageHero('services')}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          { label: t.pages.about.title, href: href(locale, 'about') },
          { label: t.pages.services.title },
        ]}
      />

      {/*
       * "À propos de Moreco" (briefing of 2026-10-21), in place of the archive's few lines
       * on silicon. Its title names the company, so the "Applications produits" eyebrow
       * that stood over the old text went with it; the client's signature closes it.
       */}
      {(introTitle || intro.length > 0) && (
        <section className="section">
          <div className="page-narrow">
            <Reveal>
              {introTitle && <h2>{introTitle}</h2>}
              {intro.map((block, i) =>
                block.type === 'heading' ? (
                  <h3 key={i} className={s.introHeading}>
                    {block.text}
                  </h3>
                ) : (
                  <p key={i} className={i === firstParagraph ? 'lead' : undefined}>
                    {block.text}
                  </p>
                )
              )}
              <p className={s.signature}>
                {t.site.name.toUpperCase()} — {t.site.signature}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      <section className={`section section--tint ${s.rows}`}>
        <div className="page">
          {sections.map((section, i) => (
            <FeatureRow
              key={section.title}
              index={i}
              eyebrow={t.nav.applications}
              title={section.title}
              body={
                <>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </>
              }
              image={section.image}
              imageAlt={section.title}
              accent={section.target ? ACCENT[section.target] : undefined}
              link={linkFor(section)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

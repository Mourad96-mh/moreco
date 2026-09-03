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
  const { introTitle, introText, sections } = servicesContent(locale);

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

      {(introTitle || introText) && (
        <section className="section">
          <div className="page-narrow">
            <Reveal>
              <p className="eyebrow">{t.nav.applications}</p>
              {introTitle && <h2>{introTitle}</h2>}
              {introText && <p className="lead">{introText}</p>}
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

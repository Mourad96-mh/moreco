import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { href, trialHref } from '@/data/routes';
import { TRIALS, trialTitle, trialDescription } from '@/data/trials';
import { trialHero } from '@/data/hero-images';
import PageHeader from '@/components/PageHeader/PageHeader';
import Reveal from '@/components/Reveal/Reveal';
import s from './TrialView.module.css';

export default function TrialView({ locale, slug }: { locale: Locale; slug: string }) {
  const t = getDictionary(locale);
  const index = TRIALS.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();

  const trial = TRIALS[index];
  const next = TRIALS[(index + 1) % TRIALS.length];

  return (
    <>
      <PageHeader
        eyebrow={`${t.rdi.trialLabel} ${String(trial.order).padStart(2, '0')}`}
        title={trialTitle(trial, locale)}
        lead={trialDescription(trial, locale)}
        image={trialHero(trial)}
        crumbLabel={t.a11y.breadcrumb}
        crumbs={[
          { label: t.site.name, href: href(locale, 'home') },
          { label: t.rdi.title, href: href(locale, 'rdi') },
          { label: trialTitle(trial, locale) },
        ]}
      />

      <div className="section">
        <div className="page">
          {/* Every plate from the original trial page, at full width, revealed on scroll. */}
          <div className={s.plates}>
            {trial.images.map((image, i) => (
              <Reveal key={image} delay={i * 60}>
                <figure className={s.plate}>
                  <Image
                    src={image}
                    alt={`${trialTitle(trial, locale)} — ${i + 1}`}
                    width={1400}
                    height={900}
                    sizes="(min-width: 1100px) 1100px, 100vw"
                    className={s.plateImg}
                    priority={i === 0}
                  />
                </figure>
              </Reveal>
            ))}
          </div>

          <nav className={s.pager}>
            <Link href={href(locale, 'rdi')} className="btn btn--ghost">
              {t.rdi.backToTrials}
            </Link>
            <Link href={trialHref(locale, next.slug)} className="btn">
              {trialTitle(next, locale)}
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

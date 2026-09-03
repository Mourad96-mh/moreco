import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { imageSize, maxRenderWidth } from '@/data/images';
import Reveal from '@/components/Reveal/Reveal';
import s from './FeatureRow.module.css';

/**
 * The alternating image + text row from bioworkseurope.com, rebuilt: the image fades in,
 * then the heading, the body and the link follow on a stagger as the row enters the
 * viewport. Consecutive rows flip sides on their own via `index`.
 *
 * Sizing is driven by the picture itself (data/image-sizes.json), because the archive
 * holds two very different kinds:
 *
 *  - `cutout` — the 300px hexagon graphics of the segment pages, transparent corners and
 *    all. A fixed frame framed emptiness around them and stretched them to twice their
 *    pixels; they now sit at their own size on an accent halo, in a narrow column.
 *  - `plate` — trial results and photographs, anywhere from 1:1 to 5:1. Cropping a chart
 *    to a uniform frame destroys it, so the card takes the picture's own ratio and caps
 *    the height instead.
 */
export interface FeatureRowProps {
  title: string;
  /** Small label above the title. */
  eyebrow?: string;
  body?: ReactNode;
  image: string;
  imageAlt: string;
  /** Even rows put the image left, odd rows put it right. */
  index?: number;
  link?: { label: string; href: string };
  /** Tints the eyebrow, the halo and the link, e.g. a segment colour. */
  accent?: string;
  variant?: 'cutout' | 'plate';
  priority?: boolean;
}

/** Rendering caps per variant — see maxRenderWidth. */
const CAPS = {
  cutout: { upscale: 1.05, maxHeight: 300 },
  plate: { upscale: 1.7, maxHeight: 420 },
} as const;

export default function FeatureRow({
  title,
  eyebrow,
  body,
  image,
  imageAlt,
  index = 0,
  link,
  accent,
  variant = 'plate',
  priority = false,
}: FeatureRowProps) {
  const flipped = index % 2 === 1;
  const size = imageSize(image);

  /* Unmeasured images keep a sane default rather than collapsing to nothing. */
  const width = size?.width ?? 800;
  const height = size?.height ?? 600;
  const cap = size ? maxRenderWidth(size, CAPS[variant]) : 620;

  return (
    <div
      className={[s.row, s[variant], flipped ? s.flipped : ''].join(' ')}
      style={
        {
          ...(accent ? { '--accent': accent } : {}),
          '--media-cap': `${cap}px`,
        } as React.CSSProperties
      }
    >
      <Reveal className={s.media} delay={0}>
        <figure className={s.figure}>
          <Image
            src={image}
            alt={imageAlt}
            width={width}
            height={height}
            sizes={variant === 'cutout' ? '(min-width: 860px) 300px, 60vw' : '(min-width: 860px) 620px, 100vw'}
            className={s.img}
            priority={priority}
          />
        </figure>
      </Reveal>

      <div className={s.text}>
        {eyebrow && (
          <Reveal delay={80}>
            <p className={s.eyebrow}>{eyebrow}</p>
          </Reveal>
        )}

        <Reveal delay={140}>
          <h3 className={s.title}>{title}</h3>
        </Reveal>

        {body && (
          <Reveal delay={220}>
            <div className={s.body}>{body}</div>
          </Reveal>
        )}

        {link && (
          <Reveal delay={300}>
            <Link className={s.link} href={link.href}>
              {link.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        )}
      </div>
    </div>
  );
}

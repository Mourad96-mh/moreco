'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import s from './HeroVideo.module.css';

/**
 * The bioworkseurope.com hero: a full-bleed muted video loop behind the title, a light
 * dark wash for legibility, and the text sliding up from behind a mask on load — their
 * theme calls the two halves `animation-cropper` / `animation-contents`.
 *
 * The poster carries the first paint (so the LCP is an image, not the video), and under
 * `prefers-reduced-motion` the video is never attached at all.
 */
export interface HeroVideoProps {
  title: string;
  subtitle: string;
  cta?: { label: string; href: string };
  poster: string;
  sources: { src: string; type: string }[];
  /** Credit line for CC0 footage, shown small in the corner. */
  credit?: string;
}

export default function HeroVideo({ title, subtitle, cta, poster, sources, credit }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setMotion(!query.matches);
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !motion) return;
    // Some browsers refuse autoplay until the element is muted in the DOM, not just in JSX.
    video.muted = true;
    void video.play().catch(() => {
      /* Autoplay blocked: the poster stays, which is a perfectly good hero. */
    });
  }, [motion]);

  return (
    <section className={s.hero}>
      <div className={s.media}>
        {motion && sources.length > 0 ? (
          <video
            ref={videoRef}
            className={s.video}
            poster={poster}
            loop
            muted
            playsInline
            autoPlay
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          >
            {sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))}
          </video>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className={s.video} src={poster} alt="" aria-hidden="true" />
        )}
        <span className={s.wash} aria-hidden="true" />
      </div>

      <div className={`page ${s.inner}`}>
        <div className={s.cropper}>
          <h1 className={s.title}>{title}</h1>
        </div>
        <div className={s.cropper} style={{ '--delay': '120ms' } as React.CSSProperties}>
          <p className={s.subtitle}>{subtitle}</p>
        </div>
        {cta && (
          <div className={s.cropper} style={{ '--delay': '240ms' } as React.CSSProperties}>
            <Link className={`btn btn--inverse ${s.cta}`} href={cta.href}>
              {cta.label}
            </Link>
          </div>
        )}
      </div>

      {credit && <p className={s.credit}>{credit}</p>}
    </section>
  );
}

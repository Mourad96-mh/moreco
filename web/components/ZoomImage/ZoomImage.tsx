'use client';

import Image from 'next/image';
import { useRef } from 'react';
import s from './ZoomImage.module.css';

/**
 * A pack shot that opens full-size on click. The client asked on 2026-09-22 that every
 * product photo can be enlarged. A native <dialog> gives the focus trap, Escape to close
 * and the inert page behind it for free; a click on the backdrop closes it too.
 */
export default function ZoomImage({
  src,
  alt,
  labels,
}: {
  src: string;
  alt: string;
  labels: { open: string; close: string };
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" className={s.trigger} onClick={() => dialog.current?.showModal()}>
        <Image src={src} alt={alt} fill sizes="(min-width: 900px) 460px, 100vw" className={s.img} priority />
        <span className={s.hint} aria-hidden="true">
          <ZoomIcon />
        </span>
        <span className="visually-hidden">{labels.open}</span>
      </button>

      <dialog
        ref={dialog}
        className={s.dialog}
        aria-label={alt}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className={s.sheet}>
          {/* eslint-disable-next-line @next/next/no-img-element -- the export serves images unoptimised anyway */}
          <img src={src} alt={alt} className={s.large} />
          <button type="button" className={s.close} onClick={() => dialog.current?.close()} aria-label={labels.close}>
            <CloseIcon />
          </button>
        </div>
      </dialog>
    </>
  );
}

const ZoomIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4M11 8v6M8 11h6" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

'use client';

import { useRef, type ReactNode } from 'react';
import s from './TrialDialog.module.css';

/**
 * A trial campaign as a card that opens its description and plates over the page — the
 * client's request of 2026-10-23, in place of the panel that unrolled in the grid. The
 * same native <dialog> as ZoomImage: focus trap, Escape to close, the page behind made
 * inert; a click on the backdrop closes it too. The content is rendered with the page,
 * closed, so search engines still read it.
 */
export default function TrialDialog({
  id,
  order,
  orderClassName,
  title,
  closeLabel,
  children,
}: {
  id: string;
  order: string;
  /** Restyles the line above the title: the crop sheets put a Latin name there. */
  orderClassName?: string;
  title: string;
  closeLabel: string;
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = `${id}-title`;

  return (
    <>
      {/* The button sits in the heading (a heading may not sit in a button) and stretches
          over the whole card, so the card is one click target. */}
      <div className={s.card} id={id}>
        <span className={`${s.order} ${orderClassName ?? ''}`}>{order}</span>
        <h3 className={s.title}>
          <button type="button" className={s.open} onClick={() => dialog.current?.showModal()}>
            {title}
          </button>
        </h3>
        <span className={s.plus} aria-hidden="true" />
      </div>

      <dialog
        ref={dialog}
        className={s.dialog}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className={s.sheet}>
          <header className={s.head}>
            <span className={`${s.order} ${orderClassName ?? ''}`}>{order}</span>
            <h2 className={s.sheetTitle} id={titleId}>
              {title}
            </h2>
            <button type="button" className={s.close} onClick={() => dialog.current?.close()} aria-label={closeLabel}>
              <CloseIcon />
            </button>
          </header>
          <div className={s.body}>{children}</div>
        </div>
      </dialog>
    </>
  );
}

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

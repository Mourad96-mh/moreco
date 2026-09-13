'use client';

import { useState, type ReactNode } from 'react';
import s from './FamilyFilter.module.css';

export interface FamilyGroup {
  key: string;
  label: string;
  content: ReactNode;
}

/**
 * The category selector above a catalogue: one button per family, plus the "all
 * products" button that is the state the page loads in.
 *
 * The client moved "all products" back to the head of the bar on 2026-09-13, reversing
 * the 2026-09-09 order — it now reads as the way in rather than the way out, which is
 * also what every visitor expects of a filter bar.
 *
 * Two shapes:
 *
 *   - Agriculture and /produits load on `all` and show everything. With JavaScript off
 *     the buttons do nothing and every family stays visible, which is why nothing is
 *     marked hidden in that state.
 *   - Animals loads on nothing: the client wants the four sub-categories to be the only
 *     thing on screen until one is clicked (briefing of 2026-09-13). That state DOES
 *     hide the groups in the served HTML, so a `<noscript>` rule puts them back for a
 *     visitor who cannot click anything anyway.
 */
export default function FamilyFilter({
  allLabel,
  groups,
  allContent,
  initial = 'all',
  emptyHint,
  barClassName = '',
}: {
  allLabel: string;
  groups: FamilyGroup[];
  /** What "all products" shows. Omitted: every group at once, stacked. */
  allContent?: ReactNode;
  /** `none` renders the bar alone until the visitor picks a family. */
  initial?: 'all' | 'none';
  /** Shown while nothing is selected. Only reachable when `initial` is `none`. */
  emptyHint?: string;
  /**
   * Extra class on the bar. /produits sits outside a page container — its bands are
   * full-bleed — so it uses this to bring the bar itself back to page width.
   */
  barClassName?: string;
}) {
  /* A family key, or the two reserved values `all` and `none`. */
  const [active, setActive] = useState<string>(initial);

  /* With no "all" state to return to, the bar would otherwise be a dead end. */
  const showAll = initial === 'all';

  return (
    <>
      <div className={`${s.bar} ${barClassName}`.trim()} role="group">
        {showAll && (
          <button
            type="button"
            className={s.chip}
            aria-pressed={active === 'all'}
            onClick={() => setActive('all')}
          >
            {allLabel}
          </button>
        )}

        {groups.map((group) => (
          <button
            key={group.key}
            type="button"
            className={s.chip}
            aria-pressed={active === group.key}
            onClick={() => setActive(group.key)}
          >
            {group.label}
          </button>
        ))}
      </div>

      {emptyHint && active === 'none' && <p className={s.hint}>{emptyHint}</p>}

      {allContent && <div hidden={active !== 'all'}>{allContent}</div>}

      {groups.map((group) => (
        <section
          key={group.key}
          data-family-group=""
          hidden={active !== group.key && !(active === 'all' && !allContent)}
        >
          {group.content}
        </section>
      ))}

      {/* Without scripting no button can ever be pressed, so show the lot. */}
      <noscript>
        <style>{'[data-family-group][hidden]{display:block!important}'}</style>
      </noscript>
    </>
  );
}

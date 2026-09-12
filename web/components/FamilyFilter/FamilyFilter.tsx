'use client';

import { useState, type ReactNode } from 'react';
import s from './FamilyFilter.module.css';

export interface FamilyGroup {
  key: string;
  label: string;
  content: ReactNode;
}

/**
 * The family selector on a segment page: one button per family, then an "all" button
 * that is the state the page loads in — so the whole catalogue is visible before any
 * click, and with JavaScript off the buttons simply do nothing and every family shows.
 *
 * "All products" closes the bar rather than opening it: the client asked for that order
 * on 2026-09-09, so the families read as the menu and "all" as the way back out of it.
 */
export default function FamilyFilter({
  allLabel,
  groups,
}: {
  allLabel: string;
  groups: FamilyGroup[];
}) {
  const [active, setActive] = useState('all');

  return (
    <>
      <div className={s.bar}>
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
        <button
          type="button"
          className={s.chip}
          aria-pressed={active === 'all'}
          onClick={() => setActive('all')}
        >
          {allLabel}
        </button>
      </div>

      {groups.map((group) => (
        <section key={group.key} hidden={active !== 'all' && active !== group.key}>
          {group.content}
        </section>
      ))}
    </>
  );
}

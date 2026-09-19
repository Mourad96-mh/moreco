import s from './FamilyNote.module.css';

/**
 * The description block under a product family — the client's briefing of 2026-09-18
 * asked for one under Specialties, Trace elements & biostimulants and HIGH END NPK, in
 * the accordion style of casem.ma's contact page. A native <details>: it opens without
 * JavaScript and a screen reader announces it as the disclosure it is.
 *
 * The text arrives later. Until a family's `familyNotes` entry has a paragraph in it, the
 * block renders nothing — an accordion that opens onto nothing reads as a broken page.
 */
export default function FamilyNote({
  title,
  summary,
  paragraphs,
}: {
  title: string;
  summary: string;
  paragraphs: readonly string[];
}) {
  if (paragraphs.length === 0) return null;

  return (
    <details className={s.note}>
      <summary className={s.summary}>
        <span>
          {summary} <span className={s.title}>{title}</span>
        </span>
        <Chevron />
      </summary>
      <div className={s.body}>
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </details>
  );
}

const Chevron = () => (
  <svg
    className={s.chevron}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

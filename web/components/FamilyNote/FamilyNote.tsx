import type { FamilyNoteContent } from '@/data/family-notes';
import s from './FamilyNote.module.css';

/**
 * The green box under a product family — the client's briefing of 2026-09-26, after the
 * category pages of casem.ma: the family's explanatory text, set in full under its
 * products at the foot of the page. It replaced the "En savoir plus" accordion of
 * 2026-09-18, which never had text to open onto.
 *
 * Since 2026-09-27 the box folds: closed, it shows the family's name and the title with
 * a chevron in the top-right corner, and opens on the full text. A native <details>, so
 * it needs no script and the text is in the page for search engines either way.
 */
export default function FamilyNote({ note }: { note: FamilyNoteContent }) {
  /*
   * The family's name on its own line, then the title (briefing of 2026-09-27, step 4:
   * "Spécialités" once, and the title opening straight on "Technologie…").
   */
  return (
    <details className={s.note}>
      <summary className={s.summary}>
        <span className={s.summaryText}>
          <span className={s.eyebrow}>{note.eyebrow}</span>
          <h3 className={s.title}>{note.title}</h3>
        </span>
        <span className={s.chevron} aria-hidden="true" />
      </summary>

      <div className={s.body}>
        {note.blocks.map((block, i) => {
          switch (block.type) {
            case 'heading':
              return (
                <h4 key={i} className={s.heading}>
                  {block.text}
                </h4>
              );
            case 'paragraph':
              return <p key={i}>{block.text}</p>;
            case 'list':
              return (
                <ul key={i} className={s.list}>
                  {block.items.map((item) => (
                    <li key={item}>
                      <ListItem text={item} />
                    </li>
                  ))}
                </ul>
              );
            case 'closing':
              return (
                <p key={i} className={s.closing}>
                  {block.text}
                </p>
              );
          }
        })}
      </div>
    </details>
  );
}

/**
 * "Phase de démarrage : favorise…" — an item that opens on a short label and a colon gets
 * its label in bold, so the four growth stages of HIGH END NPK read as a scannable list.
 * The colon may carry a French non-breaking space before it, or none in English.
 */
function ListItem({ text }: { text: string }) {
  const match = text.match(/^([^:]{3,90}?)(\s?:\s)(.+)$/);
  if (!match) return <>{text}</>;
  return (
    <>
      <strong>{match[1]}</strong>
      {match[2]}
      {match[3]}
    </>
  );
}

import type { FamilyNoteContent } from '@/data/family-notes';
import s from './FamilyNote.module.css';

/**
 * The green box under a product family — the client's briefing of 2026-09-26, after the
 * category pages of casem.ma: the family's explanatory text, set in full under its
 * products at the foot of the page. It replaced the "En savoir plus" accordion of
 * 2026-09-18, which never had text to open onto.
 */
export default function FamilyNote({ note }: { note: FamilyNoteContent }) {
  return (
    <aside className={s.note}>
      <p className={s.eyebrow}>{note.eyebrow}</p>
      <h3 className={s.title}>{note.title}</h3>

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
    </aside>
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

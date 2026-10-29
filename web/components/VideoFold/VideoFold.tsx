import note from '@/components/FamilyNote/FamilyNote.module.css';
import s from './VideoFold.module.css';

/**
 * A video behind its title (client's final briefing, 2026-10-29, point 9): the green bar
 * and round chevron of the family boxes, opening on the player. A native <details>, so it
 * needs no script; the lazy iframe in a closed fold is not loaded until it is opened.
 */
export default function VideoFold({ title, embed }: { title: string; embed: string }) {
  return (
    <details className={`${note.note} ${note.faq}`}>
      <summary className={note.summary}>
        <h3 className={`${note.title} ${note.question}`}>{title}</h3>
        <span className={note.chevron} aria-hidden="true" />
      </summary>
      <div className={s.video}>
        <iframe
          src={embed}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </details>
  );
}

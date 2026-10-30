import type { FamilyFaq } from '@/data/family-faqs';
import note from '@/components/FamilyNote/FamilyNote.module.css';
import s from './ProductFaq.module.css';

/**
 * The product's questions at the foot of its page (final briefing of 2026-10-29): the
 * green bars of the family questions, the answer folded under each, two to a row on a
 * wide screen. A native <details>, so the answers are in the page for search engines
 * either way.
 */
export default function ProductFaq({ title, faqs }: { title: string; faqs: FamilyFaq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section className={s.faq}>
      <h2 className={s.title}>{title}</h2>
      <div className={note.faqs}>
        {faqs.map((faq) => (
          <details key={faq.question} className={`${note.note} ${note.faq}`}>
            <summary className={note.summary}>
              <h3 className={`${note.title} ${note.question}`}>
                <Italics text={faq.question} />
              </h3>
              <span className={note.chevron} aria-hidden="true" />
            </summary>
            <div className={note.body}>
              <p>
                <Italics text={faq.answer} />
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/** "*Phytophthora*" in the data is set in italics: the client asked for the Latin terms so. */
function Italics({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*([^*]+)\*/).map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part))}
    </>
  );
}

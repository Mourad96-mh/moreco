import Image from 'next/image';
import s from './Blocks.module.css';

/**
 * Renders the block lists produced by scripts/extract-pages.mjs. The archive is plain
 * prose, so the shapes are deliberately few: heading, paragraph, list, image, pdf.
 */
export type Block =
  | { type: 'heading'; level: number; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string }
  | { type: 'pdf'; label: string; href: string };

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className={s.prose}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading': {
            const Tag = (block.level === 2 ? 'h2' : 'h3') as 'h2' | 'h3';
            return <Tag key={i}>{block.text}</Tag>;
          }
          case 'paragraph':
            return <p key={i}>{block.text}</p>;
          case 'list':
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case 'image':
            return (
              <figure key={i} className={s.figure}>
                <Image src={block.src} alt="" width={1200} height={800} sizes="(min-width: 820px) 780px, 100vw" />
              </figure>
            );
          case 'pdf':
            return (
              <p key={i}>
                <a className={s.pdf} href={block.href} target="_blank" rel="noopener noreferrer">
                  <PdfIcon />
                  {block.label}
                </a>
              </p>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

const PdfIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
    <path d="M14 2v6h6" />
  </svg>
);

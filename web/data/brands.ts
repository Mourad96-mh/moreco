import marks from './brand-marks.json';

/**
 * Brand-mark tones, measured from public/media/brand by scripts/measure-media.mjs.
 * The archive's logos are a mixed bag: most are dark artwork, but Mavita's is white on a
 * transparent background and disappears on a light chip.
 */
const MARKS = marks as Record<string, { width: number; height: number; onDark: boolean }>;

/** True when the mark is light artwork and needs a dark chip behind it to be visible. */
export const markNeedsDarkChip = (src: string): boolean => MARKS[src]?.onDark ?? false;

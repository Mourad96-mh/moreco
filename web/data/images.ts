import sizes from './image-sizes.json';

/**
 * Intrinsic pixel sizes, measured from public/media by scripts/measure-media.mjs.
 * Components use them to lay an image out in its own shape instead of a fixed frame.
 */
const SIZES = sizes as Record<string, number[]>;

export interface ImageSize {
  width: number;
  height: number;
  /** width / height */
  ratio: number;
}

export function imageSize(src: string): ImageSize | null {
  const found = SIZES[src];
  if (!found || found.length < 2) return null;
  const [width, height] = found;
  return { width, height, ratio: width / height };
}

/**
 * The widest this image may be drawn: never more than `upscale`× its own pixels — the
 * archive's pictures are small and go soft when stretched — and never so wide that its
 * height passes `maxHeight`, which is what keeps a square picture from towering over
 * the paragraph beside it.
 */
export function maxRenderWidth(
  size: ImageSize,
  { upscale = 1.7, maxHeight = 420 }: { upscale?: number; maxHeight?: number } = {},
): number {
  return Math.round(Math.min(size.width * upscale, maxHeight * size.ratio));
}

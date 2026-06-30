import { CSSProperties } from 'react';

export interface ProgressBarProps {
  /** Completion percentage 0–100. */
  value: number;
  /** Fill color. Default terracota; pass a technology color on track pages. */
  color?: string;
  /** Bar height in px. Default 6. */
  height?: number;
  /** Track (background) color. */
  track?: string;
  style?: CSSProperties;
}

/** Thin progress track with an animated colored fill (300ms ease-in-out width). */
export function ProgressBar(props: ProgressBarProps): JSX.Element;

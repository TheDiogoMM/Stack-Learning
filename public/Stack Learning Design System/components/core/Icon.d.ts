import { CSSProperties, SVGProps } from 'react';

/** Name of an icon in the Stack Learning line-icon library. */
export type IconName =
  | 'check' | 'check-circle' | 'lock' | 'play' | 'bookmark' | 'bookmark-fill'
  | 'bulb' | 'mail' | 'phone' | 'clock' | 'chevron-left' | 'chevron-right'
  | 'arrow-right' | 'arrow-left' | 'code' | 'terminal' | 'book' | 'layers'
  | 'search' | 'user' | 'menu' | 'external' | 'sparkle' | 'plus' | 'x' | 'circle-dot';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /** Which icon to render. */
  name: IconName;
  /** Pixel size (width = height). Default 20. */
  size?: number;
  /** Stroke width on the 24px grid. Default 1.6. */
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Minimalist line icon from the Stack Learning library. Inherits color via
 * `currentColor` — set `color` on the icon or a parent.
 */
export function Icon(props: IconProps): JSX.Element;

/** All available icon names. */
export const iconNames: IconName[];

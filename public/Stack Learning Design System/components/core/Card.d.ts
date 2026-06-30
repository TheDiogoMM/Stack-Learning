import { CSSProperties, ReactNode, HTMLAttributes } from 'react';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  children?: ReactNode;
  /** CSS color for a 4px left accent border (e.g. a technology color). */
  accent?: string;
  /** Enable scale(1.02) + shadow lift on hover. Default false. */
  hover?: boolean;
  /** Padding in px (number) or any CSS value. Default 16. */
  padding?: number | string;
  style?: CSSProperties;
}

/** Dark surface card — #1A1A1A fill, hairline border, 8px radius; optional accent + hover lift. */
export function Card(props: CardProps): JSX.Element;

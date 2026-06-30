import { CSSProperties, ReactNode, HTMLAttributes } from 'react';

export type BadgeTone =
  | 'terracota' | 'gold' | 'neutral'
  | 'beginner' | 'intermediate' | 'advanced'
  | 'react' | 'nextjs' | 'typescript' | 'tailwind' | 'shadcn' | 'supabase';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style' | 'color'> {
  children?: ReactNode;
  /** Preset color tone (brand / difficulty / technology). Default 'terracota'. */
  tone?: BadgeTone;
  /** Override with any CSS color (wins over `tone`). */
  color?: string;
  /** Solid fill instead of soft tint. Default false. */
  solid?: boolean;
  style?: CSSProperties;
}

/** Small status / category label — colored border over a soft tint of the same color. */
export function Badge(props: BadgeProps): JSX.Element;

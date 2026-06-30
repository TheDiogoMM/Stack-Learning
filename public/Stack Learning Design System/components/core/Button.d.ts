import { CSSProperties, ReactNode, ButtonHTMLAttributes } from 'react';
import { IconName } from './Icon';

/**
 * @startingPoint section="Core" subtitle="Brand buttons — 5 variants, 3 sizes, optional icons" viewport="700x200"
 */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  children?: ReactNode;
  /** Visual style. Default 'primary'. */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  /** Default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Icon library name rendered before the label. */
  iconLeft?: IconName;
  /** Icon library name rendered after the label. */
  iconRight?: IconName;
  fullWidth?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
}

/** Stack Learning button — terracota primary, gold secondary, plus outline/ghost/success. */
export function Button(props: ButtonProps): JSX.Element;

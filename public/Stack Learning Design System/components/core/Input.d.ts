import { CSSProperties, ReactNode, InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style'> {
  /** Optional field label rendered above the input. */
  label?: string;
  /** Optional leading icon node (e.g. <Icon name="mail" size={16} />). */
  icon?: ReactNode;
  style?: CSSProperties;
}

/** Dark text input with terracota focus border; optional label and leading icon. */
export function Input(props: InputProps): JSX.Element;

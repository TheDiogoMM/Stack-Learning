import { CSSProperties } from 'react';

export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  /** Tab definitions in order. */
  tabs: TabItem[];
  /** Controlled active tab id. Omit for uncontrolled. */
  value?: string;
  /** Called with the newly selected tab id. */
  onChange?: (id: string) => void;
  style?: CSSProperties;
}

/** Underline tab bar — active tab has a terracota bottom border + bold terracota label. */
export function Tabs(props: TabsProps): JSX.Element;

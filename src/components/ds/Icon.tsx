import { memo } from 'react';

export type IconName =
  | 'check' | 'check-circle' | 'lock' | 'play' | 'bookmark' | 'bookmark-fill'
  | 'bulb' | 'mail' | 'phone' | 'clock' | 'chevron-left' | 'chevron-right'
  | 'arrow-right' | 'arrow-left' | 'code' | 'terminal' | 'book' | 'layers'
  | 'search' | 'user' | 'menu' | 'external' | 'sparkle' | 'plus' | 'x' | 'circle-dot';

interface Props {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  'aria-label'?: string;
}

/** Renders a glyph from the DS sprite served at /ds/sprite.svg (symbol id `sl-<name>`). */
const Icon = memo(function Icon({ name, size = 20, color = 'currentColor', className, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      style={{ color, display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      aria-hidden={rest['aria-label'] ? undefined : true}
      role={rest['aria-label'] ? 'img' : undefined}
      aria-label={rest['aria-label']}
    >
      <use href={`/ds/sprite.svg#sl-${name}`} />
    </svg>
  );
});

export default Icon;

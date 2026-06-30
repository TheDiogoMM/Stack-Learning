import React from 'react';

/**
 * Stack Learning surface card. `accent` adds the product's 4px colored
 * left-border; `hover` enables the scale+shadow lift on pointer.
 */
export function Card({ children, accent, hover = false, padding = 16, style = {}, onClick, ...rest }) {
  const [over, setOver] = React.useState(false);
  const lift = hover && over;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-default)',
        borderLeft: accent ? `4px solid ${accent}` : '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: typeof padding === 'number' ? `${padding}px` : padding,
        cursor: onClick ? 'pointer' : 'default',
        transform: lift ? 'scale(1.02)' : 'scale(1)',
        boxShadow: lift ? 'var(--shadow-card-hover)' : 'none',
        transition: 'transform 300ms ease-in-out, box-shadow 300ms ease-in-out, border-color 200ms',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

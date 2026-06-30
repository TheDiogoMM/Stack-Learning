import React from 'react';
import { Icon } from './Icon';

const VARIANTS = {
  primary: {
    background: 'var(--accent-primary)',
    color: '#fff',
    border: '1px solid var(--accent-primary)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--accent-secondary)',
    border: '1px solid var(--accent-secondary)',
  },
  outline: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-strong)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid transparent',
  },
  success: {
    background: 'var(--color-success)',
    color: '#fff',
    border: '1px solid var(--color-success)',
  },
};

const SIZES = {
  sm: { padding: '7px 14px', fontSize: '13px', gap: '6px', iconSize: 15 },
  md: { padding: '10px 18px', fontSize: '14px', gap: '8px', iconSize: 17 },
  lg: { padding: '13px 24px', fontSize: '15px', gap: '9px', iconSize: 19 },
};

/** Stack Learning button. Variants: primary | secondary | outline | ghost | success. */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size] ?? SIZES.md;
  const [hover, setHover] = React.useState(false);

  const hoverStyle = !disabled && hover
    ? (variant === 'ghost'
        ? { background: 'var(--surface-card)' }
        : variant === 'primary' || variant === 'success'
          ? { opacity: 0.9 }
          : { background: 'var(--color-terracota-soft)' })
    : {};

  return (
    <button
      type="button"
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        width: fullWidth ? '100%' : 'auto',
        padding: s.padding,
        fontSize: s.fontSize,
        fontFamily: 'var(--font-brand)',
        fontWeight: 'var(--weight-bold)',
        lineHeight: 1,
        borderRadius: 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        whiteSpace: 'nowrap',
        transition: 'opacity 200ms, background 200ms, border-color 200ms, color 200ms',
        ...v,
        ...hoverStyle,
        ...style,
      }}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size={s.iconSize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={s.iconSize} />}
    </button>
  );
}

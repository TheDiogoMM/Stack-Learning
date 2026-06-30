import { memo, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
type Size = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
}

const VARIANTS: Record<Variant, React.CSSProperties> = {
  primary:   { background: 'var(--accent-primary)', color: '#1A1A1A', border: '1px solid transparent' },
  secondary: { background: 'var(--accent-secondary)', color: '#1A1A1A', border: '1px solid transparent' },
  outline:   { background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' },
  ghost:     { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent' },
  success:   { background: 'var(--color-success)', color: '#FFFFFF', border: '1px solid transparent' },
};

const SIZES: Record<Size, React.CSSProperties> = {
  sm: { padding: '6px 12px', fontSize: 'var(--text-sm)' },
  md: { padding: '10px 18px', fontSize: 'var(--text-body)' },
  lg: { padding: '14px 26px', fontSize: 'var(--text-body-lg)' },
};

const Button = memo(function Button({
  variant = 'primary', size = 'md', fullWidth, style, children, disabled, ...rest
}: Props) {
  return (
    <button
      disabled={disabled}
      style={{
        ...VARIANTS[variant],
        ...SIZES[size],
        width: fullWidth ? '100%' : undefined,
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-brand)',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        transition: 'opacity var(--duration-fast), filter var(--duration-fast)',
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = 'brightness(1.08)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;

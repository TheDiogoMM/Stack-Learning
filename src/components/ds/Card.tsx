import { memo, type ReactNode, type CSSProperties } from 'react';

interface Props {
  accent?: string;          // left/top border color
  hover?: boolean;          // lift on hover
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}

const Card = memo(function Card({ accent, hover, onClick, style, className, children }: Props) {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-default)',
        borderTop: accent ? `3px solid ${accent}` : '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform var(--duration-base), box-shadow var(--duration-base)',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!hover) return;
        e.currentTarget.style.transform = 'scale(var(--hover-lift-scale))';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
      }}
      onMouseLeave={(e) => {
        if (!hover) return;
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </div>
  );
});

export default Card;

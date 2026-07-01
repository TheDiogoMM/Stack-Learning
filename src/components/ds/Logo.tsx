import { memo } from 'react';

interface Props {
  variant?: 'lockup' | 'symbol';
  height?: number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/** Brand logo from /ds/logo-lockup.png (full lockup) or /ds/logo-symbol.png (mark only). */
const Logo = memo(function Logo({ variant = 'lockup', height = 28, onClick, className, style }: Props) {
  const src = variant === 'symbol' ? '/ds/logo-symbol.png' : '/ds/logo-lockup.png';
  return (
    <img
      src={src}
      alt="Stack Learning"
      height={height}
      onClick={onClick}
      className={className}
      style={{ height, width: 'auto', cursor: onClick ? 'pointer' : 'default', display: 'block', ...style }}
    />
  );
});

export default Logo;

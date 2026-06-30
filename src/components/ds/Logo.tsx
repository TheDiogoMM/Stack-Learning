import { memo } from 'react';

interface Props {
  variant?: 'lockup' | 'symbol';
  height?: number;
  onClick?: () => void;
  className?: string;
}

/** Brand logo from /ds/logo.svg (full lockup) or /ds/logo-symbol.svg (mark only). */
const Logo = memo(function Logo({ variant = 'lockup', height = 28, onClick, className }: Props) {
  const src = variant === 'symbol' ? '/ds/logo-symbol.svg' : '/ds/logo.svg';
  return (
    <img
      src={src}
      alt="Stack Learning"
      height={height}
      onClick={onClick}
      className={className}
      style={{ height, width: 'auto', cursor: onClick ? 'pointer' : 'default', display: 'block' }}
    />
  );
});

export default Logo;

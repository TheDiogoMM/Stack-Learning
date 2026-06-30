import { memo } from 'react';

interface Props {
  value: number;          // 0–100
  color?: string;
  height?: number;
  showLabel?: boolean;
}

const ProgressBar = memo(function ProgressBar({ value, color = 'var(--accent-primary)', height = 6, showLabel }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <div style={{ flex: 1, height, background: 'var(--color-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 'var(--radius-full)', transition: 'width var(--duration-base)' }} />
      </div>
      {showLabel && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', minWidth: 34, textAlign: 'right' }}>{Math.round(pct)}%</span>}
    </div>
  );
});

export default ProgressBar;

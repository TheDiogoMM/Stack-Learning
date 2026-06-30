import React from 'react';

/**
 * Stack Learning progress bar — thin track with an animated fill. `color`
 * defaults to terracota; pass a technology color for track pages.
 */
export function ProgressBar({ value = 0, color = 'var(--accent-primary)', height = 6, track = 'var(--border-default)', style = {} }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ background: track, height: `${height}px`, borderRadius: 'var(--radius-sm)', overflow: 'hidden', ...style }}
    >
      <div style={{ background: color, width: `${pct}%`, height: '100%', borderRadius: 'var(--radius-sm)', transition: 'width 300ms ease-in-out' }} />
    </div>
  );
}

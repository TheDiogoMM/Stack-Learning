import React from 'react';

/**
 * Stack Learning icon library — minimalist line icons (24x24 grid, 1.6px
 * stroke, round caps/joins, currentColor). Paths are inlined so the icon
 * always renders (no external-sprite <use> quirks).
 */
const PATHS = {
  check: <path d="M5 12.5 10 17.5 19 6.5" />,
  'check-circle': <><circle cx="12" cy="12" r="8.5" /><path d="M8.2 12.2 11 15 15.8 9.2" /></>,
  lock: <><rect x="5.5" y="10.5" width="13" height="9" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></>,
  play: <path d="M8 5.5 18.5 12 8 18.5V5.5Z" />,
  bookmark: <path d="M7 4.5h10a1 1 0 0 1 1 1v14l-6-4-6 4v-14a1 1 0 0 1 1-1Z" />,
  bulb: <><path d="M9 17h6M9.5 20h5" /><path d="M12 3.5a6 6 0 0 1 3.7 10.7c-.7.6-1.2 1.2-1.2 2.3h-5c0-1.1-.5-1.7-1.2-2.3A6 6 0 0 1 12 3.5Z" /></>,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  phone: <><rect x="7" y="3.5" width="10" height="17" rx="2" /><path d="M11 17.5h2" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  'chevron-left': <path d="M14.5 6 8.5 12l6 6" />,
  'chevron-right': <path d="M9.5 6 15.5 12l-6 6" />,
  'arrow-right': <path d="M4.5 12h15M13 5.5 19.5 12 13 18.5" />,
  'arrow-left': <path d="M19.5 12h-15M11 5.5 4.5 12 11 18.5" />,
  code: <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13" />,
  terminal: <><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><path d="m7 9.5 3 2.5-3 2.5M12.5 15h4" /></>,
  book: <><path d="M4 5.5A2 2 0 0 1 6 4h6v15H6a2 2 0 0 0-2 1.5V5.5Z" /><path d="M20 5.5A2 2 0 0 0 18 4h-6v15h6a2 2 0 0 1 2 1.5V5.5Z" /></>,
  layers: <><path d="M12 3.5 21 8l-9 4.5L3 8l9-4.5Z" /><path d="m3 12.5 9 4.5 9-4.5M3 16.5 12 21l9-4.5" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
  user: <><circle cx="12" cy="8.5" r="3.8" /><path d="M5 20c.8-3.4 3.6-5.5 7-5.5s6.2 2.1 7 5.5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  external: <path d="M14 5h5v5M19 5l-8 8M17 13.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h4.5" />,
  sparkle: <><path d="M12 4c.6 3.6 1.8 4.8 5.4 5.4-3.6.6-4.8 1.8-5.4 5.4-.6-3.6-1.8-4.8-5.4-5.4C10.2 8.8 11.4 7.6 12 4Z" /><path d="M18 15c.3 1.5.8 2 2.3 2.3-1.5.3-2 .8-2.3 2.3-.3-1.5-.8-2-2.3-2.3 1.5-.3 2-.8 2.3-2.3Z" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  'circle-dot': <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" /></>,
};

// Filled variants (use fill instead of stroke-only)
const FILLED = {
  'bookmark-fill': <path d="M7 4.5h10a1 1 0 0 1 1 1v14l-6-4-6 4v-14a1 1 0 0 1 1-1Z" />,
};

export function Icon({ name, size = 20, strokeWidth = 1.6, className = '', style = {}, ...rest }) {
  const filled = FILLED[name];
  const content = filled ?? PATHS[name] ?? PATHS['circle-dot'];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ flexShrink: 0, display: 'block', ...style }}
      aria-hidden="true"
      {...rest}
    >
      {content}
    </svg>
  );
}

export const iconNames = [...Object.keys(PATHS), ...Object.keys(FILLED)];

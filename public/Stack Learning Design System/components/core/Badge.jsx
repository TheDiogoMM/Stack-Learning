import React from 'react';

/**
 * Stack Learning badge — small label with a colored border over a soft tint
 * of the same color (the product's "tone" pattern). Pass any CSS color via
 * `color`; convenience tones map to brand/difficulty colors.
 */
const TONES = {
  terracota: 'var(--accent-primary)',
  gold: 'var(--accent-secondary)',
  neutral: 'var(--text-muted)',
  beginner: 'var(--color-level-beginner)',
  intermediate: 'var(--color-level-intermediate)',
  advanced: 'var(--color-level-advanced)',
  react: 'var(--tech-react)',
  nextjs: 'var(--tech-nextjs)',
  typescript: 'var(--tech-typescript)',
  tailwind: 'var(--tech-tailwind)',
  shadcn: 'var(--tech-shadcn)',
  supabase: 'var(--tech-supabase)',
};

export function Badge({ children, tone = 'terracota', color, solid = false, style = {}, ...rest }) {
  const c = color ?? TONES[tone] ?? TONES.terracota;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: '3px 10px',
        fontSize: '12px',
        fontFamily: 'var(--font-brand)',
        fontWeight: 'var(--weight-semibold)',
        lineHeight: 1.5,
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${c}`,
        color: solid ? '#0F0F0F' : c,
        background: solid ? c : `color-mix(in srgb, ${c} 13%, transparent)`,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}

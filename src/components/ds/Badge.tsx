import { memo, type ReactNode } from 'react';

type Tone = 'terracota' | 'beginner' | 'intermediate' | 'advanced' | 'neutral' | 'ai' | 'success';

const TONES: Record<Tone, { bg: string; fg: string }> = {
  terracota:    { bg: 'var(--color-terracota-soft)', fg: 'var(--accent-primary)' },
  beginner:     { bg: 'rgba(62,207,142,0.13)', fg: 'var(--color-level-beginner)' },
  intermediate: { bg: 'rgba(244,162,97,0.13)', fg: 'var(--color-level-intermediate)' },
  advanced:     { bg: 'rgba(231,76,60,0.13)', fg: 'var(--color-level-advanced)' },
  neutral:      { bg: 'rgba(128,128,128,0.15)', fg: 'var(--text-muted)' },
  ai:           { bg: 'var(--color-ai-soft)', fg: 'var(--color-ai)' },
  success:      { bg: 'rgba(39,174,96,0.15)', fg: 'var(--color-success-bright)' },
};

interface Props { tone?: Tone; children: ReactNode; }

/** Maps a Difficulty string to the matching tone, if you have one. */
export function difficultyTone(d: string): Tone {
  if (d === 'Iniciante') return 'beginner';
  if (d === 'Intermediário') return 'intermediate';
  if (d === 'Avançado') return 'advanced';
  return 'neutral';
}

const Badge = memo(function Badge({ tone = 'neutral', children }: Props) {
  const t = TONES[tone];
  return (
    <span style={{
      background: t.bg, color: t.fg,
      fontSize: 'var(--text-xs)', fontWeight: 600, fontFamily: 'var(--font-brand)',
      padding: '3px 10px', borderRadius: 'var(--radius-full)',
      display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
});

export default Badge;

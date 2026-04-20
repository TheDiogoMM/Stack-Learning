import { useMemo } from 'react';
import { getLessonsByTechnology } from '@/data/lessons';
import type { Technology } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';

interface Props {
  techId: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const TECH_MAP: Record<string, { tech: Technology; color: string }> = {
  nextjs:     { tech: 'Next.js 15.5',   color: '#fff' },
  typescript: { tech: 'TypeScript',      color: '#3178c6' },
  tailwind:   { tech: 'Tailwind CSS 4',  color: '#06b6d4' },
  shadcn:     { tech: 'shadcn/ui',       color: '#a1a1aa' },
  supabase:   { tech: 'Supabase',        color: '#3ecf8e' },
  sketchain:  { tech: 'Sketchain',       color: '#D4A574' },
  react:      { tech: 'React 19',        color: '#61dafb' },
};

export default function TechPath({ techId, onNavigate }: Props) {
  const config = TECH_MAP[techId];
  const { isCompleted, getProgressPercent } = useProgress();

  if (!config) {
    return (
      <div style={{ padding: '40px', color: 'var(--netflix-light-gray)' }}>
        Tecnologia não encontrada.{' '}
        <button onClick={() => onNavigate('home')} style={linkBtn}>Voltar</button>
      </div>
    );
  }

  const lessons = useMemo(() => getLessonsByTechnology(config.tech), [config.tech]);
  const lessonIds = useMemo(() => lessons.map(l => l.id), [lessons]);
  const percent = getProgressPercent(lessonIds);
  const doneCount = lessonIds.filter(id => isCompleted(id)).length;

  return (
    <div style={{ padding: '40px', maxWidth: '800px' }}>
      <button onClick={() => onNavigate('home')} style={linkBtn}>← Home</button>

      <h2 style={{
        color: config.color === '#fff' || config.color === '#18181b' ? 'var(--netflix-light-gray)' : config.color,
        fontSize: '1.8rem',
        fontWeight: 'bold',
        margin: '20px 0 4px',
      }}>
        {config.tech}
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
        <p style={{ color: 'var(--netflix-gray)', fontSize: '0.9rem' }}>
          {doneCount}/{lessons.length} aulas completas
        </p>
        <span style={{ color: 'var(--netflix-gray)', fontSize: '0.9rem' }}>·</span>
        <p style={{ color: 'var(--netflix-gray)', fontSize: '0.9rem' }}>{percent}%</p>
      </div>

      <div style={{ background: '#2a2a2a', borderRadius: '4px', height: '4px', marginBottom: '32px' }}>
        <div style={{
          background: config.color,
          width: `${percent}%`,
          height: '100%',
          borderRadius: '4px',
          transition: 'width 300ms ease-in-out',
        }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {lessons.map((lesson, i) => {
          const done = isCompleted(lesson.id);
          return (
            <div
              key={lesson.id}
              onClick={() => onNavigate('lesson', { id: lesson.id })}
              style={{
                background: 'var(--netflix-dark-gray)',
                border: `1px solid ${done ? config.color + '44' : '#2a2a2a'}`,
                borderLeft: `4px solid ${done ? config.color : '#2a2a2a'}`,
                borderRadius: '8px',
                padding: '16px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'border-color 200ms',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ color: 'var(--netflix-gray)', fontSize: '0.85rem', minWidth: '28px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p style={{ color: 'var(--netflix-light-gray)', fontSize: '0.95rem', marginBottom: '2px' }}>
                    {lesson.title}
                  </p>
                  <p style={{ color: 'var(--netflix-gray)', fontSize: '0.75rem' }}>
                    {lesson.difficulty} · {lesson.estimatedTime} min
                  </p>
                </div>
              </div>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>
                {done ? '✅' : '▶'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const linkBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--sketchain-gold)',
  cursor: 'pointer',
  fontSize: '0.9rem',
  padding: 0,
};

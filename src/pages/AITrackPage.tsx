import { useState } from 'react';
import { allLessons } from '@/data/lessons';
import { PILLARS } from '@/data/tracks';
import { useProgress } from '@/hooks/useProgress';
import { useQuizStore } from '@/providers/QuizProvider';
import Button from '@/components/ds/Button';
import Badge, { difficultyTone } from '@/components/ds/Badge';
import Icon from '@/components/ds/Icon';
import ProgressBar from '@/components/ds/ProgressBar';

interface Props {
  initialPillar?: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const DIAGNOSTIC_ID = 'diagnostic-ai';

export default function AITrackPage({ initialPillar, onNavigate }: Props) {
  // useProgress returns `completed` (not `completedLessons`) — alias it here
  const { completed: completedLessons } = useProgress();
  const { latestFor } = useQuizStore();
  const diag = latestFor(DIAGNOSTIC_ID);
  const [openPillar, setOpenPillar] = useState<string>(initialPillar ?? 'Fundamentos');

  const lessonsFor = (pillarId: string) =>
    allLessons.filter((l) => l.pillar === pillarId).sort((a, b) => (a.pillarOrder ?? 0) - (b.pillarOrder ?? 0));

  const isPillarComplete = (pillarId: string) => {
    const ls = lessonsFor(pillarId);
    return ls.length > 0 && ls.every((l) => completedLessons.includes(l.id));
  };

  const pillarLocked = (i: number) => i > 0 && !isPillarComplete(PILLARS[i - 1].id);

  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: 'var(--space-15) var(--space-6)',
        background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(15,15,15,0.9))',
        borderBottom: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
          <Badge tone="ai"><Icon name="sparkle" size={14} /> Trilha</Badge>
          <h1 style={{ fontFamily: 'var(--font-brand)', fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,3rem)',
            color: 'var(--text-primary)', margin: 'var(--space-4) 0' }}>Engenharia de IA</h1>
          <div style={{ marginTop: 'var(--space-4)' }}>
            {diag ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <Badge tone="success">Diagnóstico: {diag.score}%</Badge>
                <Button variant="outline" size="sm" onClick={() => onNavigate('diagnostic')}>Refazer diagnóstico</Button>
              </div>
            ) : (
              <Button variant="primary" onClick={() => onNavigate('diagnostic')}>
                <Icon name="sparkle" size={16} /> Iniciar avaliação diagnóstica
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Pillars accordion */}
      <section className="section-gap-full" style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        {PILLARS.map((p, i) => {
          const ls = lessonsFor(p.id);
          const done = ls.filter((l) => completedLessons.includes(l.id)).length;
          const locked = pillarLocked(i);
          const isOpen = openPillar === p.id;
          return (
            <div key={p.id} style={{ marginBottom: 'var(--space-4)', border: '1px solid var(--border-default)',
              borderTop: `3px solid ${p.color}`, borderRadius: 'var(--radius-lg)', overflow: 'hidden', opacity: locked ? 0.6 : 1 }}>
              <button
                onClick={() => !locked && setOpenPillar(isOpen ? '' : p.id)}
                style={{ width: '100%', background: 'var(--surface-card)', border: 'none',
                  cursor: locked ? 'not-allowed' : 'pointer', padding: 'var(--space-5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}
              >
                <div style={{ textAlign: 'left' }}>
                  <span style={{ color: p.color, fontSize: 'var(--text-xs)', fontWeight: 700 }}>PILAR {p.order}</span>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-h2)', fontWeight: 700 }}>{p.id}</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', minWidth: 160 }}>
                  {locked ? <Icon name="lock" size={18} color="var(--text-muted)" />
                    : <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{done}/{ls.length}</span>}
                  <div style={{ flex: 1 }}><ProgressBar value={ls.length ? (done / ls.length) * 100 : 0} color={p.color} /></div>
                  <Icon name={isOpen ? 'chevron-left' : 'chevron-right'} size={18} />
                </div>
              </button>

              {isOpen && !locked && (
                <ul style={{ listStyle: 'none', padding: 'var(--space-2) var(--space-5) var(--space-5)' }}>
                  {ls.map((l) => {
                    const completed = completedLessons.includes(l.id);
                    return (
                      <li key={l.id} onClick={() => onNavigate('ai-lesson', { id: l.id })}
                        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                          padding: '12px 0', borderBottom: '1px solid var(--border-default)', cursor: 'pointer' }}>
                        <Icon name={completed ? 'check-circle' : 'play'} size={18}
                          color={completed ? 'var(--color-success-bright)' : p.color} />
                        <span style={{ flex: 1, color: 'var(--text-primary)', fontSize: 'var(--text-body)' }}>{l.title}</span>
                        <Badge tone={difficultyTone(l.difficulty)}>{l.difficulty}</Badge>
                        <span className="hide-mobile" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                          {l.estimatedTime} min
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}

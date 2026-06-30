import { recommendations } from '@/lib/scoring';
import { scoreDiagnostic } from '@/lib/scoring';
import { diagnosticQuestions } from '@/data/quizzes';
import { PILLARS, pillarMeta } from '@/data/tracks';
import { allLessons } from '@/data/lessons';
import { useQuizStore } from '@/providers/QuizProvider';
import Button from '@/components/ds/Button';
import Badge from '@/components/ds/Badge';
import Icon from '@/components/ds/Icon';
import ProgressBar from '@/components/ds/ProgressBar';
import type { Pillar } from '@/data/lessons';

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const DIAGNOSTIC_ID = 'diagnostic-ai';

export default function DiagnosticResult({ onNavigate }: Props) {
  const { latestFor } = useQuizStore();
  const record = latestFor(DIAGNOSTIC_ID);

  if (!record) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: 'var(--space-15) var(--space-6)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Você ainda não realizou o diagnóstico.</p>
        <Button variant="primary" onClick={() => onNavigate('diagnostic')} style={{ marginTop: 16 }}>
          Iniciar diagnóstico
        </Button>
      </div>
    );
  }

  const base = scoreDiagnostic(diagnosticQuestions, record.answers);
  const recs = recommendations(base.byPillar);

  const startLesson = allLessons.find((l) => l.pillar === recs.startPillar && l.pillarOrder === 1);

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: 'var(--space-10) var(--space-6)' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', fontWeight: 800, fontSize: 'var(--text-h1)', color: 'var(--text-primary)' }}>
        Seu diagnóstico de IA
      </h1>

      {/* Ring */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', flexWrap: 'wrap', margin: 'var(--space-6) 0' }}>
        <div style={{ width: 140, height: 140, borderRadius: '50%',
          background: `conic-gradient(var(--color-ai) ${base.overall * 3.6}deg, var(--color-border) 0deg)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 106, height: 106, borderRadius: '50%', background: 'var(--bg-app)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '2rem' }}>{base.overall}%</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>geral</span>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {PILLARS.map((p) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ width: 110, color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{p.id}</span>
              <ProgressBar value={base.byPillar[p.id as Pillar]} color={pillarMeta(p.id as Pillar).color} showLabel />
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-h3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="bulb" size={18} color="var(--color-ai)" /> Recomendação personalizada
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-body)' }}>
          Comece pelo pilar <strong style={{ color: 'var(--text-primary)' }}>{recs.startPillar}</strong>.
        </p>
        {recs.focus.length > 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 8 }}>
            Foco recomendado: {recs.focus.map((p) => <Badge key={p} tone="ai">{p}</Badge>)}
          </p>
        )}
        {recs.canSkip.length > 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 8 }}>
            Você já domina: {recs.canSkip.map((p) => <Badge key={p} tone="success">{p}</Badge>)}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
        <Button variant="primary" onClick={() => startLesson ? onNavigate('ai-lesson', { id: startLesson.id }) : onNavigate('ai-track')}>
          <Icon name="play" size={16} /> Iniciar trilha personalizada
        </Button>
        <Button variant="outline" onClick={() => onNavigate('ai-track')}>Ver todos os pilares</Button>
        <Button variant="ghost" onClick={() => onNavigate('diagnostic')}>Refazer diagnóstico</Button>
      </div>
    </div>
  );
}

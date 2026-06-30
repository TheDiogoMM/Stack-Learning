import { useDiagnostic } from '@/hooks/useDiagnostic';
import { useQuizStore } from '@/providers/QuizProvider';
import Button from '@/components/ds/Button';
import Badge from '@/components/ds/Badge';
import Icon from '@/components/ds/Icon';
import ProgressBar from '@/components/ds/ProgressBar';

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const DIAGNOSTIC_ID = 'diagnostic-ai';

export default function DiagnosticScreen({ onNavigate }: Props) {
  const d = useDiagnostic();
  const { saveResult } = useQuizStore();

  const finish = async () => {
    await saveResult({
      lessonId: DIAGNOSTIC_ID, quizType: 'diagnostic',
      score: d.result.overall, answers: d.answers,
    });
    onNavigate('diagnostic-result');
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-10) var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <ProgressBar value={((d.index + 1) / d.total) * 100} color="var(--color-ai)" />
        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', whiteSpace: 'nowrap' }}>
          {d.index + 1}/{d.total}
        </span>
      </div>

      {d.current.pillar && <Badge tone="ai">{d.current.pillar}</Badge>}
      <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-brand)', fontSize: 'var(--text-h1)',
        fontWeight: 700, margin: 'var(--space-4) 0 var(--space-6)' }}>
        {d.current.prompt}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {d.current.options.map((opt, i) => {
          const active = d.selected === i;
          return (
            <button key={i} onClick={() => d.select(i)}
              style={{ textAlign: 'left', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)',
                border: `1px solid ${active ? 'var(--color-ai)' : 'var(--border-default)'}`,
                background: active ? 'var(--color-ai-soft)' : 'var(--surface-card)',
                color: 'var(--text-primary)', cursor: 'pointer', fontSize: 'var(--text-body)',
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ fontWeight: 700, color: 'var(--color-ai)' }}>{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-8)' }}>
        <Button variant="ghost" onClick={d.prev} disabled={!d.canPrev}>
          <Icon name="arrow-left" size={16} /> Anterior
        </Button>
        {d.isLast
          ? <Button variant="primary" onClick={finish} disabled={!d.canNext}>Finalizar</Button>
          : <Button variant="primary" onClick={d.next} disabled={!d.canNext}>Próxima <Icon name="arrow-right" size={16} /></Button>}
      </div>
    </div>
  );
}

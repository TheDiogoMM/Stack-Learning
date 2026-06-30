import { useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { quizForLesson } from '@/data/quizzes';
import { useQuizStore } from '@/providers/QuizProvider';
import KnowledgeComparison from '@/components/KnowledgeComparison';
import Button from '@/components/ds/Button';
import Icon from '@/components/ds/Icon';
import ProgressBar from '@/components/ds/ProgressBar';

interface Props {
  lessonId: string;
  lessonTitle: string;
  pillar?: string;
  priorScore: number | null;
  onPass: (score: number) => void;
  onClose: () => void;
}

export default function LessonQuiz({ lessonId, lessonTitle, pillar, priorScore, onPass, onClose }: Props) {
  const quiz = quizForLesson(lessonId, lessonTitle);
  const q = useQuiz(quiz.questions);
  const { saveResult } = useQuizStore();
  const [saved, setSaved] = useState(false);

  const handleFinishStep = async () => {
    q.next();
    if (q.isLast && !saved) {
      setSaved(true);
      await saveResult({ lessonId, quizType: 'lesson', pillar, score: q.score, answers: q.answers });
    }
  };

  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200,
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)',
  };
  const panel: React.CSSProperties = {
    background: 'var(--surface-card)', border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', width: '100%', maxWidth: 560,
    maxHeight: '90vh', overflowY: 'auto',
  };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={panel} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-h3)' }}>Quiz — {lessonTitle}</h3>
          <button onClick={onClose} aria-label="Fechar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <Icon name="x" size={20} />
          </button>
        </div>

        {!q.finished ? (
          <>
            <ProgressBar value={((q.index + 1) / q.total) * 100} color="var(--accent-primary)" />
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', margin: '6px 0 var(--space-4)' }}>
              Pergunta {q.index + 1}/{q.total}
            </p>
            <h4 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-body-lg)', marginBottom: 'var(--space-4)' }}>
              {q.current.prompt}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {q.current.options.map((opt, i) => {
                const isCorrect = i === q.current.correctIndex;
                const isChosen = q.selected === i;
                let border = 'var(--border-default)';
                let bg = 'var(--bg-app)';
                if (q.revealed) {
                  if (isCorrect) { border = 'var(--color-success)'; bg = 'rgba(39,174,96,0.12)'; }
                  else if (isChosen) { border = 'var(--color-danger)'; bg = 'rgba(231,76,60,0.12)'; }
                }
                return (
                  <button key={i} disabled={q.revealed} onClick={() => q.select(i)}
                    style={{ textAlign: 'left', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)',
                      border: `1px solid ${border}`, background: bg, color: 'var(--text-primary)',
                      cursor: q.revealed ? 'default' : 'pointer', fontSize: 'var(--text-body)' }}>
                    <strong style={{ marginRight: 8 }}>{String.fromCharCode(65 + i)}</strong>{opt}
                  </button>
                );
              })}
            </div>
            {q.revealed && (
              <div style={{ marginTop: 'var(--space-4)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                  <Icon name="bulb" size={14} color="var(--accent-secondary)" /> {q.current.explanation}
                </p>
                <Button variant="primary" onClick={handleFinishStep} style={{ marginTop: 'var(--space-4)' }}>
                  {q.isLast ? 'Ver resultado' : 'Próxima'} <Icon name="arrow-right" size={16} />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-h2)', marginBottom: 'var(--space-4)' }}>
              Você fez {q.score}%
            </h4>
            <KnowledgeComparison before={priorScore} after={q.score} />
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
              <Button variant="success" onClick={() => onPass(q.score)}>
                <Icon name="check" size={16} /> Concluir aula
              </Button>
              <Button variant="ghost" onClick={onClose}>Fechar</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

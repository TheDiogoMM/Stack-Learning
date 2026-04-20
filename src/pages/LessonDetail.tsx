import { useState, useCallback } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import CodeEditor from '@/components/CodeEditor';
import VideoEmbed from '@/components/VideoEmbed';
import { useProgress } from '@/hooks/useProgress';
import { getLessonById, getLessonsByTechnology } from '@/data/lessons';

interface Props {
  lessonId: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}


type Tab = 'conteudo' | 'mini-lab' | 'recursos';

export default function LessonDetail({ lessonId, onNavigate }: Props) {
  const lesson = getLessonById(lessonId) ?? getLessonById('react-intro')!;
  const trilhaIds = getLessonsByTechnology(lesson.technology).map(l => l.id);
  const [tab, setTab] = useState<Tab>('conteudo');

  // Read initial duration from localStorage override (if any video was already replaced)
  const [displayTime, setDisplayTime] = useState<number>(() => {
    for (const v of lesson.youtubeVideos) {
      try {
        const raw = localStorage.getItem(`yt_override_${v.youtubeId}`);
        if (raw) return (JSON.parse(raw) as { duration: number }).duration ?? lesson.estimatedTime;
      } catch { /* ignore */ }
    }
    return lesson.estimatedTime;
  });

  const handleDurationChange = useCallback((minutes: number) => {
    setDisplayTime(minutes);
  }, []);
  const { isCompleted, isBookmarked, markComplete, unmarkComplete, toggleBookmark, getProgressPercent } = useProgress();

  const completed = isCompleted(lesson.id);
  const bookmarked = isBookmarked(lesson.id);
  const percent = getProgressPercent(trilhaIds);
  const doneCount = trilhaIds.filter(id => isCompleted(id)).length;

  const difficultyColor = {
    Iniciante: '#3ecf8e',
    Intermediário: '#F4A261',
    Avançado: '#e74c3c',
  }[lesson.difficulty];

  return (
    <div style={{ padding: '32px 40px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button onClick={() => onNavigate('home')} style={linkBtn}>Home</button>
        <span style={{ color: 'var(--netflix-gray)' }}>›</span>
        <span style={{ color: 'var(--netflix-gray)', fontSize: '0.85rem' }}>{lesson.technology}</span>
        <span style={{ color: 'var(--netflix-gray)' }}>›</span>
        <span style={{ color: 'var(--netflix-light-gray)', fontSize: '0.85rem' }}>{lesson.title}</span>
      </div>

      {/* Layout 2 colunas */}
      <div className="lesson-grid" style={{ alignItems: 'start' }}>

        {/* COLUNA 1 — Conteúdo */}
        <div>
          <h1 style={{ color: 'var(--sketchain-terracota)', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '16px' }}>
            {lesson.title}
          </h1>

          {/* Badges */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
            <Badge text={lesson.technology} color="var(--sketchain-terracota)" />
            <Badge text={lesson.difficulty} color={difficultyColor} />
            <Badge text={`${displayTime} min`} color="var(--netflix-gray)" />
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '24px', borderBottom: '1px solid #2a2a2a' }}>
            {(['conteudo', 'mini-lab', 'recursos'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: tab === t ? '2px solid var(--sketchain-terracota)' : '2px solid transparent',
                  color: tab === t ? 'var(--sketchain-terracota)' : 'var(--netflix-gray)',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: tab === t ? 'bold' : 'normal',
                  textTransform: 'capitalize',
                  transition: 'color 200ms',
                }}
              >
                {t === 'conteudo' ? 'Conteúdo' : t === 'mini-lab' ? 'Mini-Lab' : 'Recursos'}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {tab === 'conteudo' && (
            <MarkdownRenderer content={lesson.content} />
          )}

          {tab === 'mini-lab' && (
            <div>
              <p style={{ color: 'var(--netflix-light-gray)', marginBottom: '16px', fontSize: '0.95rem' }}>
                Implemente o componente <code style={{ background: 'var(--netflix-dark-gray)', padding: '2px 6px', borderRadius: '4px', color: '#9cdcfe' }}>Counter</code> usando <code style={{ background: 'var(--netflix-dark-gray)', padding: '2px 6px', borderRadius: '4px', color: '#9cdcfe' }}>useState</code>:
              </p>
              <CodeEditor
                initialCode={lesson.codeTemplate ?? '// Sem template disponível'}
                language="typescript"
                solution={lesson.codeSolution}
              />
            </div>
          )}

          {tab === 'recursos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {(lesson.youtubeVideos ?? []).length > 0 && (
                <div>
                  <h3 style={{ color: 'var(--netflix-light-gray)', fontSize: '1rem', fontWeight: 'bold', marginBottom: '16px' }}>
                    Vídeos Recomendados
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {lesson.youtubeVideos.map(v => (
                      <VideoEmbed key={v.youtubeId} {...v} onDurationChange={handleDurationChange} />
                    ))}
                  </div>
                </div>
              )}
              <div>
                <h3 style={{ color: 'var(--netflix-light-gray)', fontSize: '1rem', fontWeight: 'bold', marginBottom: '12px' }}>
                  Links Úteis
                </h3>
                <ul style={{ paddingLeft: '20px', lineHeight: '2.2' }}>
                  <li><a href="https://react.dev" target="_blank" rel="noreferrer" style={{ color: 'var(--sketchain-gold)' }}>Documentação oficial do React</a></li>
                  <li><a href="https://react.dev/blog/2024/04/25/react-19" target="_blank" rel="noreferrer" style={{ color: 'var(--sketchain-gold)' }}>Blog: O que há de novo no React 19</a></li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* COLUNA 2 — Sidebar */}
        <div className="sidebar-sticky" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Progresso */}
          <div style={sideCard}>
            <p style={{ color: 'var(--netflix-gray)', fontSize: '0.8rem', marginBottom: '8px' }}>Progresso da Trilha</p>
            <p style={{ color: 'var(--netflix-light-gray)', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>{percent}%</p>
            <div style={{ background: '#2a2a2a', borderRadius: '4px', height: '6px' }}>
              <div style={{ background: 'var(--sketchain-terracota)', width: `${percent}%`, height: '100%', borderRadius: '4px', transition: 'width 300ms ease-in-out' }} />
            </div>
            <p style={{ color: 'var(--netflix-gray)', fontSize: '0.75rem', marginTop: '8px' }}>{doneCount} de {trilhaIds.length} aulas completas</p>
          </div>

          {/* Ações */}
          <div style={sideCard}>
            <button
              onClick={() => completed ? unmarkComplete(lesson.id) : markComplete(lesson.id)}
              style={{
                width: '100%',
                background: completed ? '#27ae60' : 'var(--sketchain-terracota)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '12px',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '10px',
                transition: 'background 300ms',
              }}
            >
              {completed ? '✅ Concluída' : 'Marcar como Concluída'}
            </button>

            <button
              onClick={() => toggleBookmark(lesson.id)}
              style={{
                width: '100%',
                background: 'none',
                border: `1px solid ${bookmarked ? 'var(--sketchain-gold)' : 'var(--netflix-gray)'}`,
                borderRadius: '6px',
                padding: '10px',
                fontSize: '0.9rem',
                color: bookmarked ? 'var(--sketchain-gold)' : 'var(--netflix-gray)',
                cursor: 'pointer',
                transition: 'all 300ms',
              }}
            >
              {bookmarked ? '❤️ Salvo' : '🤍 Salvar'}
            </button>
          </div>

          {/* Info da Aula */}
          <div style={sideCard}>
            <p style={{ color: 'var(--netflix-gray)', fontSize: '0.8rem', marginBottom: '12px' }}>Informações</p>
            <InfoRow label="Duração" value={`${displayTime} min`} />
            <InfoRow label="Nível" value={lesson.difficulty} />
            <InfoRow label="Pré-requisitos" value={(lesson.prerequisites ?? []).length === 0 ? 'Nenhum' : (lesson.prerequisites ?? []).join(', ')} />
          </div>

          {/* Próxima Aula */}
          {lesson.nextLesson && (
            <div style={sideCard}>
              <p style={{ color: 'var(--netflix-gray)', fontSize: '0.8rem', marginBottom: '10px' }}>Próxima Aula</p>
              <p style={{ color: 'var(--netflix-light-gray)', fontSize: '0.9rem', marginBottom: '12px' }}>
                {lesson.nextLesson.title}
              </p>
              {completed ? (
                <button
                  onClick={() => onNavigate('lesson', { id: lesson.nextLesson!.id })}
                  style={{
                    width: '100%',
                    background: 'none',
                    border: '1px solid var(--sketchain-terracota)',
                    borderRadius: '6px',
                    padding: '10px',
                    color: 'var(--sketchain-terracota)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  Ir para próxima →
                </button>
              ) : (
                <p style={{ color: 'var(--netflix-gray)', fontSize: '0.78rem', fontStyle: 'italic' }}>
                  Complete essa aula para desbloquear
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span style={{
      background: `${color}22`,
      border: `1px solid ${color}`,
      color,
      borderRadius: '4px',
      padding: '3px 10px',
      fontSize: '0.78rem',
      fontWeight: '600',
    }}>
      {text}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
      <span style={{ color: 'var(--netflix-gray)', fontSize: '0.8rem' }}>{label}</span>
      <span style={{ color: 'var(--netflix-light-gray)', fontSize: '0.8rem' }}>{value}</span>
    </div>
  );
}

const sideCard: React.CSSProperties = {
  background: 'var(--netflix-dark-gray)',
  border: '1px solid #2a2a2a',
  borderRadius: '8px',
  padding: '16px',
};

const linkBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--sketchain-gold)',
  cursor: 'pointer',
  fontSize: '0.85rem',
  padding: 0,
};

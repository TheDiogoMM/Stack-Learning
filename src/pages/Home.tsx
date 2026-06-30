import { useMemo } from 'react';
import { allLessons } from '@/data/lessons';
import { TRACKS, PILLARS } from '@/data/tracks';
import { useProgress } from '@/hooks/useProgress';
import { useQuizStore } from '@/providers/QuizProvider';
import TrackPoster from '@/components/TrackPoster';
import PillarCard from '@/components/PillarCard';
import Button from '@/components/ds/Button';
import Icon from '@/components/ds/Icon';
import Badge from '@/components/ds/Badge';

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const DIAGNOSTIC_ID = 'diagnostic-ai';

export default function Home({ onNavigate }: Props) {
  // useProgress returns `completed` (not `completedLessons`) — alias it here
  const { completed: completedLessons, completionByTrack } = useProgress();
  const { latestFor } = useQuizStore();

  const aiTrack = TRACKS.find((t) => t.id === 'ai')!;
  const stackTrack = TRACKS.find((t) => t.id === 'stack')!;
  const diagnosticDone = !!latestFor(DIAGNOSTIC_ID);

  const stackStats = completionByTrack('stack');
  const aiStats = completionByTrack('ai');

  const continueLessons = useMemo(
    () => allLessons.filter((l) => completedLessons.includes(l.id)).slice(0, 10),
    [completedLessons],
  );

  const pillarStats = (pillarId: string) => {
    const inPillar = allLessons.filter((l) => l.pillar === pillarId);
    const done = inPillar.filter((l) => completedLessons.includes(l.id)).length;
    return { count: inPillar.length, done };
  };

  return (
    <div>
      {/* 1 — HERO */}
      <section style={{
        position: 'relative', padding: 'var(--space-15) var(--space-6)',
        background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(15,15,15,0.9))',
        borderBottom: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
          <Badge tone="ai"><Icon name="sparkle" size={14} /> Nova trilha</Badge>
          <h1 style={{
            fontFamily: 'var(--font-brand)', fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-primary)',
            margin: 'var(--space-4) 0', letterSpacing: 'var(--tracking-display)', lineHeight: 1.1,
          }}>
            Engenharia de IA
          </h1>
          <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-body-lg)', maxWidth: 560 }}>
            {aiTrack.tagline}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', margin: 'var(--space-5) 0' }}>
            {PILLARS.map((p) => <Badge key={p.id} tone="ai">{p.id}</Badge>)}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" onClick={() => onNavigate(diagnosticDone ? 'diagnostic-result' : 'diagnostic')}>
              <Icon name="sparkle" size={18} /> {diagnosticDone ? 'Ver diagnóstico' : 'Iniciar diagnóstico'}
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate('ai-track')}>
              <Icon name="play" size={18} /> Ver trilha
            </Button>
          </div>
        </div>
      </section>

      {/* 2 — CONTINUAR */}
      {continueLessons.length > 0 && (
        <section className="section-gap" style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
          <h2 style={sectionTitle}>Continuar assistindo</h2>
          <div className="row-scroll">
            {continueLessons.map((l) => (
              <div key={l.id} onClick={() => onNavigate(l.track === 'ai' ? 'ai-lesson' : 'lesson', { id: l.id })}
                className="card-hover"
                style={{ width: 240, background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-default)', padding: 'var(--space-4)', cursor: 'pointer' }}>
                <Badge tone={l.track === 'ai' ? 'ai' : 'terracota'}>{l.track === 'ai' ? 'IA' : 'Stack'}</Badge>
                <h4 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-h3)', marginTop: 8 }}>{l.title}</h4>
                <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{l.technology}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3 — SUAS TRILHAS */}
      <section className="section-gap" style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <h2 style={sectionTitle}>Suas trilhas</h2>
        <div className="tracks-grid">
          <TrackPoster track={stackTrack} progressPct={stackStats.pct} done={stackStats.done} total={stackStats.total}
            onOpen={() => onNavigate('tech-path', { id: 'React 19' })} />
          <TrackPoster track={aiTrack} progressPct={aiStats.pct} done={aiStats.done} total={aiStats.total}
            diagnosticPending={!diagnosticDone} onOpen={() => onNavigate('ai-track')} />
        </div>
      </section>

      {/* 4 — PILARES IA */}
      <section className="section-gap" style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h2 style={sectionTitle}>Pilares — Engenharia de IA</h2>
          <Button variant="ghost" size="sm" onClick={() => onNavigate(diagnosticDone ? 'diagnostic-result' : 'diagnostic')}>
            <Icon name="sparkle" size={16} /> {diagnosticDone ? 'Refazer diagnóstico' : 'Iniciar diagnóstico'}
          </Button>
        </div>
        <div className="pillars-grid" style={{ marginTop: 'var(--space-4)' }}>
          {PILLARS.map((p, i) => {
            const st = pillarStats(p.id);
            const prevDone = i === 0 ? true : (() => { const prev = PILLARS[i - 1]; const ps = pillarStats(prev.id); return ps.count > 0 && ps.done === ps.count; })();
            return (
              <PillarCard key={p.id} pillar={p} lessonCount={st.count} done={st.done}
                locked={!prevDone} onOpen={() => onNavigate('ai-track', { pillar: p.id })} />
            );
          })}
        </div>
      </section>

      {/* 5 — CONHECIMENTO CONSOLIDADO */}
      <section className="section-gap-full" style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <h2 style={sectionTitle}>Conhecimento consolidado</h2>
        <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
          <KnowledgeRing label="Stack Sketchain" pct={stackStats.pct} color="var(--accent-primary)" />
          <KnowledgeRing label="Engenharia de IA" pct={aiStats.pct} color="var(--color-ai)" />
          <Button variant="outline" onClick={() => onNavigate('profile')}>Ver perfil completo</Button>
        </div>
      </section>
    </div>
  );
}

function KnowledgeRing({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 110, height: 110, borderRadius: '50%',
        background: `conic-gradient(${color} ${pct * 3.6}deg, var(--color-border) 0deg)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--bg-app)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-primary)', fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: 'var(--text-h2)' }}>
          {pct}%
        </div>
      </div>
      <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', display: 'block', marginTop: 8 }}>{label}</span>
    </div>
  );
}

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-brand)', fontSize: 'var(--text-h2)', fontWeight: 700,
  color: 'var(--text-primary)', marginBottom: 'var(--space-4)',
};

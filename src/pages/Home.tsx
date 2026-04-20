import { useRef } from 'react';
import { getLessonsByTechnology, lessons } from '@/data/lessons';
import { useProgress } from '@/hooks/useProgress';

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}


const TECH_TRACKS = [
  { id: 'react',      tech: 'React 19' as const,       title: 'React 19',             desc: 'Componentes, hooks e context',            color: '#61dafb' },
  { id: 'nextjs',     tech: 'Next.js 15.5' as const,   title: 'Next.js 15.5',         desc: 'App Router, Server Components e deploy',  color: '#fff' },
  { id: 'typescript', tech: 'TypeScript' as const,      title: 'TypeScript',           desc: 'Tipos, generics e boas práticas',          color: '#3178c6' },
  { id: 'tailwind',   tech: 'Tailwind CSS 4' as const,  title: 'Tailwind CSS 4',       desc: 'Utility-first, responsividade e dark mode',color: '#06b6d4' },
  { id: 'shadcn',     tech: 'shadcn/ui' as const,       title: 'shadcn/ui',            desc: 'Componentes, formulários e tabelas',       color: '#a1a1aa' },
  { id: 'supabase',   tech: 'Supabase' as const,        title: 'Supabase',             desc: 'PostgreSQL, auth e Row Level Security',    color: '#3ecf8e' },
  { id: 'sketchain',  tech: 'Sketchain' as const,       title: 'Projeto Sketchain',    desc: 'Arquitetura real do zero ao deploy',       color: '#D4A574' },
];

const sequentialIds = lessons.sort((a, b) => a.order - b.order).slice(0, 10).map(l => l.id);
const caseStudyLessons = getLessonsByTechnology('Sketchain');

function statusIcon(completed: boolean, locked: boolean) {
  if (completed) return '✅';
  if (locked) return '🔒';
  return '▶';
}

export default function Home({ onNavigate }: Props) {
  const seqRef = useRef<HTMLDivElement>(null);
  const csRef = useRef<HTMLDivElement>(null);
  const { isCompleted, getProgressPercent } = useProgress();

  function scroll(ref: React.RefObject<HTMLDivElement | null>, dir: 'left' | 'right') {
    if (ref.current) ref.current.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
  }

  return (
    <div style={{ background: 'var(--netflix-black)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #D4A574, #F4A261)',
        textAlign: 'center',
      }}
      className="hero-section fade-in"
      >
        <h1 style={{
          fontSize: 'clamp(32px, 8vw, 64px)',
          fontWeight: 'bold',
          color: '#fff',
          marginBottom: '16px',
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>
          Aprenda o Stack Sketchain
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
          Do Zero ao Sênior em 8–10 semanas
        </p>
      </section>

      {/* TRILHA SEQUENCIAL */}
      <section className="section-gap slide-in">
        <h2 style={{ color: 'var(--netflix-light-gray)', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px' }}>
          Trilha Sequencial
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => scroll(seqRef, 'left')} style={arrowBtn}>‹</button>
          <div ref={seqRef} style={scrollRow}>
            {sequentialIds.map((lessonId, i) => {
              const lesson = lessons.find(l => l.id === lessonId)!;
              const done = isCompleted(lessonId);
              const locked = i >= 5 && !isCompleted(sequentialIds[i - 1]);
              return (
                <div
                  key={lessonId}
                  onClick={() => !locked && onNavigate('lesson', { id: lessonId })}
                  style={{ ...card, opacity: locked ? 0.5 : 1, cursor: locked ? 'not-allowed' : 'pointer' }}
                >
                  <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--sketchain-terracota)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ color: 'var(--netflix-light-gray)', fontSize: '0.85rem', marginTop: '8px', lineHeight: '1.4' }}>
                    {lesson.title}
                  </p>
                  <span style={{ fontSize: '1.1rem', marginTop: '12px', display: 'block' }}>
                    {statusIcon(done, locked)}
                  </span>
                  <div style={{ background: 'var(--netflix-gray)', height: '3px', borderRadius: '2px', marginTop: '10px' }}>
                    <div style={{ background: 'var(--sketchain-terracota)', width: done ? '100%' : '0%', height: '100%', borderRadius: '2px', transition: 'width 300ms' }} />
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => scroll(seqRef, 'right')} style={arrowBtn}>›</button>
        </div>
      </section>

      {/* POR TECNOLOGIA */}
      <section className="section-gap-full">
        <h2 style={{ color: 'var(--netflix-light-gray)', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px' }}>
          Por Tecnologia
        </h2>
        <div className="tech-grid">
          {TECH_TRACKS.map(tech => {
            const techLessons = getLessonsByTechnology(tech.tech);
            const percent = getProgressPercent(techLessons.map(l => l.id));
            const done = techLessons.filter(l => isCompleted(l.id)).length;
            return (
              <div
                key={tech.id}
                onClick={() => onNavigate('tech-path', { id: tech.id })}
                style={{ ...card, cursor: 'pointer', borderLeft: `4px solid ${tech.color}`, padding: '20px' }}
              >
                <h3 style={{ color: 'var(--netflix-light-gray)', fontSize: '1rem', fontWeight: 'bold', marginBottom: '6px' }}>
                  {tech.title}
                </h3>
                <p style={{ color: 'var(--netflix-gray)', fontSize: '0.8rem', marginBottom: '12px', lineHeight: '1.4' }}>
                  {tech.desc}
                </p>
                <p style={{ color: 'var(--netflix-gray)', fontSize: '0.75rem', marginBottom: '6px' }}>
                  {done}/{techLessons.length} aulas completas
                </p>
                <div style={{ background: 'var(--netflix-gray)', height: '3px', borderRadius: '2px' }}>
                  <div style={{ background: tech.color, width: `${percent}%`, height: '100%', borderRadius: '2px', transition: 'width 300ms ease-in-out' }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ESTUDO DE CASO */}
      <section className="section-gap-full" style={{ paddingBottom: '60px' }}>
        <h2 style={{ color: 'var(--netflix-light-gray)', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px' }}>
          Estudo de Caso — Sketchain
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => scroll(csRef, 'left')} style={arrowBtn}>‹</button>
          <div ref={csRef} style={scrollRow}>
            {caseStudyLessons.map((lesson, i) => {
              const done = isCompleted(lesson.id);
              return (
                <div
                  key={lesson.id}
                  onClick={() => onNavigate('lesson', { id: lesson.id })}
                  style={{ ...card, cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--sketchain-gold)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ color: 'var(--netflix-light-gray)', fontSize: '0.85rem', marginTop: '8px', lineHeight: '1.4' }}>
                    {lesson.title}
                  </p>
                  <span style={{ fontSize: '1.1rem', marginTop: '12px', display: 'block' }}>{done ? '✅' : '▶'}</span>
                  <div style={{ background: 'var(--netflix-gray)', height: '3px', borderRadius: '2px', marginTop: '10px' }}>
                    <div style={{ background: 'var(--sketchain-gold)', width: done ? '100%' : '0%', height: '100%', borderRadius: '2px', transition: 'width 300ms' }} />
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => scroll(csRef, 'right')} style={arrowBtn}>›</button>
        </div>
      </section>

    </div>
  );
}

const card: React.CSSProperties = {
  background: 'var(--netflix-dark-gray)',
  border: '1px solid #2a2a2a',
  borderRadius: '8px',
  padding: '16px',
  minWidth: '180px',
  flexShrink: 0,
  transition: 'transform 300ms ease-in-out, box-shadow 300ms ease-in-out',
};

const scrollRow: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  flex: 1,
  paddingBottom: '4px',
};

const arrowBtn: React.CSSProperties = {
  background: 'var(--netflix-dark-gray)',
  border: '1px solid var(--netflix-gray)',
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  color: 'var(--netflix-light-gray)',
  cursor: 'pointer',
  fontSize: '1.2rem',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

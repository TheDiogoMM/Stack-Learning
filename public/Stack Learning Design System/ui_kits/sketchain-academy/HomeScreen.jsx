// Sketchain Academy — Home: hero, sequential track carousel, technology grid.
const { Card, ProgressBar, Icon } = window.StackLearningDesignSystem_7ae9fc;

function StatusGlyph({ done, locked }) {
  if (done) return <Icon name="check-circle" size={18} style={{ color: 'var(--color-success-bright)' }} />;
  if (locked) return <Icon name="lock" size={16} style={{ color: 'var(--text-muted)' }} />;
  return <Icon name="play" size={16} style={{ color: 'var(--accent-primary)' }} />;
}

function SectionTitle({ children }) {
  return <h2 style={{ color: 'var(--text-primary)', fontSize: 21, fontWeight: 700, margin: '0 0 18px', fontFamily: 'var(--font-brand)' }}>{children}</h2>;
}

function HomeScreen({ onOpenLesson, onOpenTrack }) {
  const D = window.SLData;
  return (
    <div style={{ background: 'var(--bg-app)', minHeight: '100%' }}>
      {/* HERO */}
      <section className="sl-fade-in" style={{ background: 'var(--brand-gradient)', padding: '56px 40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(30px,6vw,56px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', textShadow: '0 2px 8px rgba(0,0,0,0.3)', fontFamily: 'var(--font-brand)', letterSpacing: '-1px' }}>
          Aprenda o Stack Sketchain
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.92)', fontWeight: 500, margin: 0, fontFamily: 'var(--font-brand)' }}>
          Do Zero ao Sênior em 8–10 semanas
        </p>
      </section>

      {/* SEQUENCIAL */}
      <section style={{ padding: '36px 40px 0' }}>
        <SectionTitle>Trilha Sequencial</SectionTitle>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 6 }}>
          {D.sequential.map((l, i) => (
            <Card key={l.id} hover={!l.locked} padding={16}
              onClick={() => !l.locked && onOpenLesson(l.id)}
              style={{ minWidth: 184, flexShrink: 0, opacity: l.locked ? 0.5 : 1, cursor: l.locked ? 'not-allowed' : 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 30, fontWeight: 800, color: 'var(--accent-primary)', lineHeight: 1, fontFamily: 'var(--font-brand)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <StatusGlyph done={l.done} locked={l.locked} />
              </div>
              <p style={{ color: 'var(--text-primary)', fontSize: 13.5, margin: '12px 0 14px', lineHeight: 1.4, minHeight: 38, fontFamily: 'var(--font-brand)' }}>{l.title}</p>
              <ProgressBar value={l.done ? 100 : 0} height={3} />
            </Card>
          ))}
        </div>
      </section>

      {/* POR TECNOLOGIA */}
      <section style={{ padding: '40px 40px 56px' }}>
        <SectionTitle>Por Tecnologia</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
          {D.tracks.map(t => {
            const pct = Math.round((t.done / t.total) * 100);
            return (
              <Card key={t.id} hover accent={t.color} padding={20} onClick={() => onOpenTrack(t.id)} style={{ cursor: 'pointer' }}>
                <h3 style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700, margin: '0 0 6px', fontFamily: 'var(--font-brand)' }}>{t.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: '0 0 14px', lineHeight: 1.4, fontFamily: 'var(--font-brand)' }}>{t.desc}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: '0 0 7px', fontFamily: 'var(--font-brand)' }}>{t.done}/{t.total} aulas completas</p>
                <ProgressBar value={pct} color={t.color} height={3} />
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
window.HomeScreen = HomeScreen;

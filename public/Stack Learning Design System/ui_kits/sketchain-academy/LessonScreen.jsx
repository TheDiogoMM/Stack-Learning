// Sketchain Academy — Lesson detail: breadcrumb, tabs, content/code, sidebar.
const { Card, Badge, Button, Tabs, ProgressBar, Icon } = window.StackLearningDesignSystem_7ae9fc;

function CodeBlock({ code }) {
  return (
    <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', margin: '12px 0 4px' }}>
      <div style={{ background: 'var(--surface-code)', padding: '8px 14px', borderBottom: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#E74C3C' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#F39C12' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27AE60' }} />
        <span style={{ color: 'var(--text-muted)', fontSize: 11, marginLeft: 6, fontFamily: 'var(--font-mono)' }}>index.tsx</span>
      </div>
      <pre style={{ margin: 0, padding: '14px 16px', background: 'var(--surface-code)', color: '#E5E5E5', fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.7, overflowX: 'auto' }}>{code}</pre>
    </div>
  );
}

function SideCard({ children }) {
  return <Card padding={16} style={{ display: 'flex', flexDirection: 'column' }}>{children}</Card>;
}
function Label({ children }) {
  return <p style={{ color: 'var(--text-muted)', fontSize: 12.5, margin: '0 0 10px', fontFamily: 'var(--font-brand)' }}>{children}</p>;
}

function LessonScreen({ onNavigate }) {
  const L = window.SLData.lesson;
  const [tab, setTab] = React.useState('conteudo');
  const [done, setDone] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const pct = Math.round((L.track.done / L.track.total) * 100);

  return (
    <div style={{ background: 'var(--bg-app)', minHeight: '100%', padding: '28px 40px' }}>
      {/* breadcrumb */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 22, fontFamily: 'var(--font-brand)' }}>
        <button onClick={() => onNavigate('home')} style={{ background: 'none', border: 'none', color: 'var(--text-link)', cursor: 'pointer', fontSize: 13.5, padding: 0 }}>Home</button>
        <Icon name="chevron-right" size={14} style={{ color: 'var(--text-muted)' }} />
        <span style={{ color: 'var(--text-muted)', fontSize: 13.5 }}>{L.technology}</span>
        <Icon name="chevron-right" size={14} style={{ color: 'var(--text-muted)' }} />
        <span style={{ color: 'var(--text-primary)', fontSize: 13.5 }}>{L.title}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>
        {/* content */}
        <div>
          <h1 style={{ color: 'var(--accent-primary)', fontSize: 29, fontWeight: 700, margin: '0 0 16px', fontFamily: 'var(--font-brand)' }}>{L.title}</h1>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
            <Badge tone="terracota">{L.technology}</Badge>
            <Badge tone="beginner">{L.difficulty}</Badge>
            <Badge tone="neutral"><Icon name="clock" size={13} /> {L.time} min</Badge>
          </div>
          <Tabs value={tab} onChange={setTab} style={{ marginBottom: 22 }}
            tabs={[{ id: 'conteudo', label: 'Conteúdo' }, { id: 'lab', label: 'Mini-Lab' }, { id: 'recursos', label: 'Recursos' }]} />

          {tab === 'conteudo' && (
            <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6 }}>
              <p style={{ marginTop: 0 }}>{L.intro}</p>
              {L.sections.map(s => (
                <div key={s.h}>
                  <h2 style={{ fontSize: 19, fontWeight: 700, color: 'var(--text-primary)', margin: '24px 0 4px', fontFamily: 'var(--font-brand)' }}>{s.h}</h2>
                  <CodeBlock code={s.code} />
                </div>
              ))}
            </div>
          )}
          {tab === 'lab' && (
            <div>
              <p style={{ color: 'var(--text-primary)', fontSize: 15, marginBottom: 14, fontFamily: 'var(--font-body)' }}>
                Implemente o componente <code style={{ background: 'var(--surface-card)', padding: '2px 7px', borderRadius: 4, color: '#9CDCFE', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Counter</code> usando <code style={{ background: 'var(--surface-card)', padding: '2px 7px', borderRadius: 4, color: '#9CDCFE', fontFamily: 'var(--font-mono)', fontSize: 13 }}>useState</code>:
              </p>
              <CodeBlock code={"export function Counter() {\n  const [n, setN] = useState(0);\n  // seu código aqui\n}"} />
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                <Button variant="outline" size="sm" iconLeft="play" disabled>Executar</Button>
                <Button variant="secondary" size="sm" iconLeft="bulb">Ver Solução</Button>
              </div>
            </div>
          )}
          {tab === 'recursos' && (
            <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-brand)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 0 }}>Links Úteis</h3>
              <ul style={{ lineHeight: 2.2, paddingLeft: 18 }}>
                <li><a href="#" style={{ color: 'var(--text-link)' }}>Documentação oficial do React</a></li>
                <li><a href="#" style={{ color: 'var(--text-link)' }}>Blog: O que há de novo no React 19</a></li>
              </ul>
            </div>
          )}
        </div>

        {/* sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 90 }}>
          <SideCard>
            <Label>Progresso da Trilha</Label>
            <p style={{ color: 'var(--text-primary)', fontSize: 18, fontWeight: 700, margin: '0 0 10px', fontFamily: 'var(--font-brand)' }}>{pct}%</p>
            <ProgressBar value={pct} />
            <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: '8px 0 0', fontFamily: 'var(--font-brand)' }}>{L.track.done} de {L.track.total} aulas completas</p>
          </SideCard>
          <SideCard>
            <Button variant={done ? 'success' : 'primary'} fullWidth iconLeft={done ? 'check' : undefined} onClick={() => setDone(d => !d)} style={{ marginBottom: 10 }}>
              {done ? 'Concluída' : 'Marcar como Concluída'}
            </Button>
            <Button variant={saved ? 'secondary' : 'outline'} fullWidth iconLeft={saved ? 'bookmark-fill' : 'bookmark'} onClick={() => setSaved(s => !s)}>
              {saved ? 'Salvo' : 'Salvar'}
            </Button>
          </SideCard>
          <SideCard>
            <Label>Próxima Aula</Label>
            <p style={{ color: 'var(--text-primary)', fontSize: 14, margin: '0 0 12px', fontFamily: 'var(--font-brand)' }}>{L.next}</p>
            <Button variant="secondary" size="sm" fullWidth iconRight="arrow-right" disabled={!done}>Ir para próxima</Button>
            {!done && <p style={{ color: 'var(--text-muted)', fontSize: 12, fontStyle: 'italic', margin: '10px 0 0', fontFamily: 'var(--font-brand)' }}>Complete essa aula para desbloquear</p>}
          </SideCard>
        </div>
      </div>
    </div>
  );
}
window.LessonScreen = LessonScreen;

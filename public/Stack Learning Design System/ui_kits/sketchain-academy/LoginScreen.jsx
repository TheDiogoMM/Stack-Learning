// Sketchain Academy — Login screen.
const { Card, Button, Input, Icon } = window.StackLearningDesignSystem_7ae9fc;

function LoginScreen({ onNavigate }) {
  return (
    <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-app)', padding: 40 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
          <img src="../../assets/logo-symbol.svg" height="34" alt="" />
          <span style={{ fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: 19, color: 'var(--text-primary)' }}>
            Sketchain <span style={{ color: 'var(--accent-primary)' }}>Academy</span>
          </span>
        </div>
        <Card padding={36} style={{ border: '1px solid var(--accent-primary)' }}>
          <h2 style={{ color: 'var(--accent-primary)', fontSize: 22, fontWeight: 700, margin: '0 0 22px', fontFamily: 'var(--font-brand)' }}>Entrar</h2>
          <form onSubmit={e => { e.preventDefault(); onNavigate('home'); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Email" type="email" placeholder="seu@email.com" icon={<Icon name="mail" size={16} />} required />
            <Input label="Senha" type="password" placeholder="••••••••" icon={<Icon name="lock" size={16} />} required />
            <Button type="submit" fullWidth style={{ marginTop: 6 }}>Entrar</Button>
          </form>
          <p style={{ color: 'var(--text-muted)', fontSize: 13.5, marginTop: 20, textAlign: 'center', fontFamily: 'var(--font-brand)' }}>
            Não tem conta? <a href="#" onClick={e => e.preventDefault()} style={{ color: 'var(--text-link)' }}>Registre-se</a>
          </p>
        </Card>
      </div>
    </div>
  );
}
window.LoginScreen = LoginScreen;

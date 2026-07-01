import { useState, type FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Logo from '@/components/ds/Logo';
import Button from '@/components/ds/Button';
import Icon from '@/components/ds/Icon';

interface Props {
  onNavigate: (page: string) => void;
}

type View = 'login' | 'forgot';

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function Login({ onNavigate }: Props) {
  const { login, resetPassword, error, loading } = useAuth();
  const [view, setView] = useState<View>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    await login(email, password);
  }

  async function handleReset(e: FormEvent) {
    e.preventDefault();
    const { ok } = await resetPassword(email);
    if (ok) setResetSent(true);
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-app)',
      padding: 'var(--space-4)',
    }}>
      <div style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-8)',
        width: '100%',
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-6)',
      }}>
        {/* Logo */}
        <div style={{ padding: 'var(--space-4) 0 var(--space-2)' }}>
          <Logo variant="lockup" height={72} style={{ filter: 'drop-shadow(0 0 20px rgba(212,165,116,0.6)) drop-shadow(0 0 6px rgba(212,165,116,0.3))' }} />
        </div>

        {view === 'login' ? (
          <>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-brand)', fontSize: 'var(--text-h2)', fontWeight: 700 }}>
                Bem-vindo de volta
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
                Entre na sua conta para continuar
              </p>
            </div>

            <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <label style={labelStyle}>Email</label>
                <div style={inputWrap}>
                  <Icon name="mail" size={16} color="var(--text-muted)" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    autoComplete="email"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Senha */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={labelStyle}>Senha</label>
                  <button
                    type="button"
                    onClick={() => setView('forgot')}
                    style={ghostLink}
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div style={inputWrap}>
                  <Icon name="lock" size={16} color="var(--text-muted)" />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    aria-label={showPwd ? 'Ocultar senha' : 'Mostrar senha'}
                    style={eyeBtn}
                  >
                    <EyeIcon open={showPwd} />
                  </button>
                </div>
              </div>

              {error && (
                <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)', margin: 0 }}>{error}</p>
              )}

              <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', margin: 0 }}>
              Não tem conta?{' '}
              <button onClick={() => onNavigate('register')} style={ghostLink}>
                Registre-se
              </button>
            </p>
          </>
        ) : (
          <>
            <button onClick={() => { setView('login'); setResetSent(false); }} style={{ ...ghostLink, alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="arrow-left" size={14} /> Voltar
            </button>

            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-brand)', fontSize: 'var(--text-h2)', fontWeight: 700 }}>
                Recuperar senha
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
                Enviaremos um link para redefinir sua senha.
              </p>
            </div>

            {resetSent ? (
              <div style={{
                background: 'rgba(39,174,96,0.12)', border: '1px solid var(--color-success)',
                borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', width: '100%', textAlign: 'center',
              }}>
                <Icon name="check-circle" size={20} color="var(--color-success-bright)" />
                <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-sm)', marginTop: 8 }}>
                  Link enviado para <strong>{email}</strong>. Verifique sua caixa de entrada.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReset} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <label style={labelStyle}>Email da conta</label>
                  <div style={inputWrap}>
                    <Icon name="mail" size={16} color="var(--text-muted)" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      autoComplete="email"
                      style={inputStyle}
                    />
                  </div>
                </div>

                {error && (
                  <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)', margin: 0 }}>{error}</p>
                )}

                <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar link de recuperação'}
                </Button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  color: 'var(--text-primary)',
  fontSize: 'var(--text-sm)',
  fontWeight: 500,
};

const inputWrap: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
  background: 'var(--bg-app)',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--radius-md)',
  padding: '0 var(--space-3)',
  transition: 'border-color var(--duration-base)',
};

const inputStyle: React.CSSProperties = {
  flex: 1,
  background: 'none',
  border: 'none',
  outline: 'none',
  color: 'var(--text-primary)',
  fontSize: 'var(--text-body)',
  padding: '10px 0',
};

const eyeBtn: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--text-muted)',
  display: 'flex',
  alignItems: 'center',
  padding: 0,
};

const ghostLink: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--accent-secondary)',
  fontSize: 'var(--text-sm)',
  padding: 0,
};

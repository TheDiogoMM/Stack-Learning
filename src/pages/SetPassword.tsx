import { useState, type FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import Logo from '@/components/ds/Logo';
import Button from '@/components/ds/Button';
import Icon from '@/components/ds/Icon';

interface Props {
  onNavigate: (page: string) => void;
}

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

export default function SetPassword({ onNavigate }: Props) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    setError(null);
    setLoading(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (err) { setError(err.message); return; }
    setDone(true);
    setTimeout(() => onNavigate('home'), 2000);
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
        <Logo variant="lockup" height={36} />

        {done ? (
          <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Icon name="check-circle" size={40} color="var(--color-success-bright)" />
            <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-brand)', fontSize: 'var(--text-h2)', fontWeight: 700 }}>
              Senha atualizada!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
              Redirecionando para a plataforma...
            </p>
          </div>
        ) : (
          <>
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-brand)', fontSize: 'var(--text-h2)', fontWeight: 700 }}>
                Criar nova senha
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
                Escolha uma senha segura para sua conta.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <label style={labelStyle}>Nova senha</label>
                <div style={inputWrap}>
                  <Icon name="lock" size={16} color="var(--text-muted)" />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                    autoComplete="new-password"
                    style={inputStyle}
                  />
                  <button type="button" onClick={() => setShowPwd((v) => !v)} aria-label={showPwd ? 'Ocultar' : 'Mostrar'} style={eyeBtn}>
                    <EyeIcon open={showPwd} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <label style={labelStyle}>Confirmar senha</label>
                <div style={inputWrap}>
                  <Icon name="lock" size={16} color="var(--text-muted)" />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="Repita a senha"
                    required
                    autoComplete="new-password"
                    style={inputStyle}
                  />
                </div>
              </div>

              {error && (
                <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)', margin: 0 }}>{error}</p>
              )}

              <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading}>
                {loading ? 'Salvando...' : 'Salvar nova senha'}
              </Button>
            </form>
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

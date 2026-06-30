import { useState, type FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  onNavigate: (page: string) => void;
}

export default function Login({ onNavigate }: Props) {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await login(email, password);
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-app)',
    }}>
      <div style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--accent-primary)',
        borderRadius: '8px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', marginBottom: '24px', fontWeight: 'bold' }}>
          Entrar
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ color: 'var(--text-primary)', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'var(--bg-app)',
                border: '1px solid var(--text-muted)',
                borderRadius: '4px',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ color: 'var(--text-primary)', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'var(--bg-app)',
                border: '1px solid var(--text-muted)',
                borderRadius: '4px',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          {error && (
            <p style={{ color: '#e74c3c', fontSize: '0.85rem' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '12px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: '8px',
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '20px', textAlign: 'center' }}>
          Não tem conta?{' '}
          <button
            onClick={() => onNavigate('register')}
            style={{ color: 'var(--accent-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Registre-se
          </button>
        </p>
      </div>
    </div>
  );
}

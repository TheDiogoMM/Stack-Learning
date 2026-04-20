import { useState, type FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  onNavigate: (page: string) => void;
}

export default function Register({ onNavigate }: Props) {
  const { register, error, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLocalError('');

    if (password !== confirm) {
      setLocalError('As senhas não coincidem.');
      return;
    }

    await register(email, password);
    setSuccess(true);
  }

  if (success && !error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--netflix-black)',
      }}>
        <div style={{
          background: 'var(--netflix-dark-gray)',
          border: '1px solid var(--sketchain-terracota)',
          borderRadius: '8px',
          padding: '40px',
          maxWidth: '400px',
          textAlign: 'center',
        }}>
          <p style={{ color: 'var(--netflix-light-gray)', marginBottom: '16px' }}>
            Conta criada! Verifique seu email para confirmar o cadastro.
          </p>
          <button
            onClick={() => onNavigate('login')}
            style={{
              color: 'var(--sketchain-gold)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            Ir para o login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--netflix-black)',
    }}>
      <div style={{
        background: 'var(--netflix-dark-gray)',
        border: '1px solid var(--sketchain-terracota)',
        borderRadius: '8px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
      }}>
        <h2 style={{ color: 'var(--sketchain-terracota)', fontSize: '1.5rem', marginBottom: '24px', fontWeight: 'bold' }}>
          Criar Conta
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ color: 'var(--netflix-light-gray)', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
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
                background: 'var(--netflix-black)',
                border: '1px solid var(--netflix-gray)',
                borderRadius: '4px',
                color: 'var(--netflix-light-gray)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ color: 'var(--netflix-light-gray)', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
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
                background: 'var(--netflix-black)',
                border: '1px solid var(--netflix-gray)',
                borderRadius: '4px',
                color: 'var(--netflix-light-gray)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label style={{ color: 'var(--netflix-light-gray)', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
              Confirmar Senha
            </label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'var(--netflix-black)',
                border: '1px solid var(--netflix-gray)',
                borderRadius: '4px',
                color: 'var(--netflix-light-gray)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          {(localError || error) && (
            <p style={{ color: '#e74c3c', fontSize: '0.85rem' }}>{localError || error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'var(--sketchain-terracota)',
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
            {loading ? 'Criando...' : 'Criar Conta'}
          </button>
        </form>

        <p style={{ color: 'var(--netflix-gray)', fontSize: '0.85rem', marginTop: '20px', textAlign: 'center' }}>
          Já tem conta?{' '}
          <button
            onClick={() => onNavigate('login')}
            style={{ color: 'var(--sketchain-gold)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Entre
          </button>
        </p>
      </div>
    </div>
  );
}

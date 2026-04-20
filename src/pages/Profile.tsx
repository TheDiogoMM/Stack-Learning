import { useAuth } from '@/hooks/useAuth';

interface Props {
  onNavigate: (page: string) => void;
}

export default function Profile({ onNavigate }: Props) {
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    onNavigate('login');
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px' }}>
      <h2 style={{ color: 'var(--sketchain-terracota)', fontSize: '1.5rem', marginBottom: '24px', fontWeight: 'bold' }}>
        Meu Perfil
      </h2>

      <div style={{
        background: 'var(--netflix-dark-gray)',
        border: '1px solid var(--netflix-gray)',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <p style={{ color: 'var(--netflix-gray)', fontSize: '0.85rem', marginBottom: '4px' }}>Email</p>
        <p style={{ color: 'var(--netflix-light-gray)', fontSize: '1rem' }}>{user?.email}</p>
      </div>

      <div style={{
        background: 'var(--netflix-dark-gray)',
        border: '1px solid var(--netflix-gray)',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <p style={{ color: 'var(--netflix-gray)', fontSize: '0.85rem', marginBottom: '8px' }}>Progresso Geral</p>
        <p style={{ color: 'var(--netflix-light-gray)', fontSize: '0.9rem' }}>
          0 de 33 aulas concluídas
        </p>
        <div style={{
          background: 'var(--netflix-gray)',
          borderRadius: '4px',
          height: '6px',
          marginTop: '12px',
        }}>
          <div style={{ background: 'var(--sketchain-terracota)', width: '0%', height: '100%', borderRadius: '4px' }} />
        </div>
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: 'transparent',
          border: '1px solid var(--netflix-gray)',
          borderRadius: '4px',
          padding: '10px 24px',
          color: 'var(--netflix-light-gray)',
          cursor: 'pointer',
          fontSize: '0.95rem',
        }}
      >
        Logout
      </button>
    </div>
  );
}

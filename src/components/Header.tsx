import { memo } from 'react';

interface Props {
  onNavigate: (page: string) => void;
}

const Header = memo(function Header({ onNavigate }: Props) {
  return (
    <header style={{
      background: 'var(--netflix-dark-gray)',
      padding: '16px 24px',
      borderBottom: '1px solid #2a2a2a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(8px)',
    }}>
      <h1
        onClick={() => onNavigate('home')}
        className="fade-in"
        style={{ color: 'var(--sketchain-terracota)', fontSize: '1.3rem', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '-0.3px' }}
      >
        Sketchain Academy
      </h1>
      <nav className="header-nav" style={{ alignItems: 'center' }}>
        <button onClick={() => onNavigate('home')} style={navStyle}>Home</button>
        <button onClick={() => onNavigate('profile')} style={navStyle}>Perfil</button>
      </nav>
    </header>
  );
});

export default Header;

const navStyle: React.CSSProperties = {
  color: 'var(--netflix-light-gray)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '0.9rem',
};

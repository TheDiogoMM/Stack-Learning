import { memo, useState } from 'react';
import Logo from '@/components/ds/Logo';
import Icon from '@/components/ds/Icon';

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const NAV = [
  { label: 'Início', page: 'home' as const, params: undefined },
  { label: 'Stack Sketchain', page: 'tech-path' as const, params: { id: 'React 19' } },
  { label: 'Engenharia de IA', page: 'ai-track' as const, params: undefined },
];

const Header = memo(function Header({ onNavigate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      background: 'rgba(26,26,26,0.85)', padding: '14px 24px',
      borderBottom: '1px solid var(--border-default)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(8px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
        <Logo height={38} onClick={() => onNavigate('home')} style={{ filter: 'drop-shadow(0 0 8px rgba(212,165,116,0.35))' }} />
        <nav className="hide-mobile header-nav" style={{ alignItems: 'center' }}>
          {NAV.map((n) => (
            <button key={n.label} onClick={() => onNavigate(n.page, n.params)} style={navStyle}>
              {n.label}
            </button>
          ))}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <button aria-label="Perfil" onClick={() => onNavigate('profile')} style={iconBtn}>
          <Icon name="user" size={22} />
        </button>
        <button aria-label="Menu" className="only-mobile" onClick={() => setOpen((o) => !o)} style={iconBtn}>
          <Icon name={open ? 'x' : 'menu'} size={22} />
        </button>
      </div>

      {open && (
        <div className="only-mobile" style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--surface-card)', borderBottom: '1px solid var(--border-default)',
          display: 'flex', flexDirection: 'column', padding: 'var(--space-2) var(--space-6)',
        }}>
          {NAV.map((n) => (
            <button key={n.label} onClick={() => { onNavigate(n.page, n.params); setOpen(false); }}
              style={{ ...navStyle, textAlign: 'left', padding: '12px 0' }}>
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
});

export default Header;

const navStyle: React.CSSProperties = {
  color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer',
  fontFamily: 'var(--font-brand)', fontSize: 'var(--text-sm)', fontWeight: 500,
};
const iconBtn: React.CSSProperties = {
  color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', padding: 4,
};

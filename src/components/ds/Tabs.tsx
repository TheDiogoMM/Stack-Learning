import { memo } from 'react';

export interface TabItem { id: string; label: string; }

interface Props {
  items: TabItem[];
  active: string;
  onChange: (id: string) => void;
  accent?: string;
}

const Tabs = memo(function Tabs({ items, active, onChange, accent = 'var(--accent-primary)' }: Props) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-6)', borderBottom: '1px solid var(--border-default)' }}>
      {items.map((it) => {
        const isActive = it.id === active;
        return (
          <button
            key={it.id}
            onClick={() => onChange(it.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-brand)', fontSize: 'var(--text-sm)', fontWeight: 600,
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              padding: '10px 2px',
              borderBottom: `2px solid ${isActive ? accent : 'transparent'}`,
              marginBottom: -1, transition: 'color var(--duration-fast)',
            }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
});

export default Tabs;

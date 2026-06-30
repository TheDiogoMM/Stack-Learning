import React from 'react';

/**
 * Stack Learning tabs — underline style. Active tab gets a terracota bottom
 * border + bold terracota label; inactive tabs are muted gray.
 * `tabs` is an array of { id, label }.
 */
export function Tabs({ tabs = [], value, onChange, style = {} }) {
  const [internal, setInternal] = React.useState(value ?? tabs[0]?.id);
  const active = value ?? internal;
  const select = (id) => { setInternal(id); onChange?.(id); };
  return (
    <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border-default)', ...style }}>
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => select(t.id)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: on ? '2px solid var(--accent-primary)' : '2px solid transparent',
              color: on ? 'var(--accent-primary)' : 'var(--text-muted)',
              padding: '10px 20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'var(--font-brand)',
              fontWeight: on ? 'var(--weight-bold)' : 'var(--weight-regular)',
              marginBottom: '-1px',
              transition: 'color 200ms, border-color 200ms',
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

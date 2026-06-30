import React from 'react';

/** Stack Learning text input — dark field, terracota focus border. */
export function Input({ label, icon, type = 'text', style = {}, id, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || (label ? `in-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const field = (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      {icon && (
        <span style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)', pointerEvents: 'none', display: 'flex' }}>
          {icon}
        </span>
      )}
      <input
        id={inputId}
        type={type}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%',
          padding: icon ? '10px 12px 10px 38px' : '10px 12px',
          background: 'var(--bg-app)',
          border: `1px solid ${focus ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-primary)',
          fontSize: '14px',
          fontFamily: 'var(--font-brand)',
          outline: 'none',
          transition: 'border-color 200ms',
          ...style,
        }}
        {...rest}
      />
    </div>
  );
  if (!label) return field;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label htmlFor={inputId} style={{ color: 'var(--text-primary)', fontSize: '13px', fontFamily: 'var(--font-brand)' }}>
        {label}
      </label>
      {field}
    </div>
  );
}

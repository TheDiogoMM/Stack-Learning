import { useEffect, useState } from 'react';

export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);
  if (!offline) return null;
  return (
    <div style={{
      background: 'var(--color-warning)', color: '#1A1A1A', textAlign: 'center',
      padding: '8px 16px', fontSize: 'var(--text-sm)', fontWeight: 600,
      position: 'sticky', top: 0, zIndex: 150,
    }}>
      Você está sem conexão — seu progresso local está salvo.
    </div>
  );
}

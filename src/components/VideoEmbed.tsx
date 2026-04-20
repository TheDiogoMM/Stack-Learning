import { memo, useState, useEffect, useCallback, useRef } from 'react';

interface Props {
  youtubeId: string;
  title: string;
  creator: string;
  duration: number;
}

interface VideoOverride {
  id: string;
  title: string;
  creator: string;
  duration: number;
}

function extractYouTubeId(input: string): string | null {
  const t = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(t)) return t;
  const m = t.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function loadOverride(originalId: string): VideoOverride | null {
  try {
    const raw = localStorage.getItem(`yt_override_${originalId}`);
    return raw ? (JSON.parse(raw) as VideoOverride) : null;
  } catch { return null; }
}

function saveOverride(originalId: string, override: VideoOverride) {
  localStorage.setItem(`yt_override_${originalId}`, JSON.stringify(override));
}

function removeOverride(originalId: string) {
  localStorage.removeItem(`yt_override_${originalId}`);
}

const VideoEmbed = memo(function VideoEmbed({ youtubeId, title, creator, duration }: Props) {
  const [override, setOverride] = useState<VideoOverride | null>(() => loadOverride(youtubeId));
  const [unavailable, setUnavailable] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeId = override?.id ?? youtubeId;
  const activeTitle = override?.title ?? title;
  const activeCreator = override?.creator ?? creator;
  const activeDuration = override?.duration ?? duration;
  const hasOverride = override !== null;

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== 'https://www.youtube.com') return;
      try {
        const data = JSON.parse(e.data as string);
        if (data.event === 'onError' && [2, 100, 101, 150].includes(Number(data.info))) {
          setUnavailable(true);
          setShowReplace(true);
        }
      } catch { /* non-JSON */ }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // Reset error state when override changes
  useEffect(() => {
    setUnavailable(false);
    setShowReplace(false);
  }, [override?.id]);

  const handleApply = useCallback((newOverride: VideoOverride) => {
    saveOverride(youtubeId, newOverride);
    setOverride(newOverride);
    setShowReplace(false);
  }, [youtubeId]);

  const handleRestore = useCallback(() => {
    removeOverride(youtubeId);
    setOverride(null);
    setUnavailable(false);
    setShowReplace(false);
  }, [youtubeId]);

  const searchQuery = encodeURIComponent(`${title} ${creator} português`);
  const searchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Player or unavailable fallback */}
      {unavailable ? (
        <UnavailableFallback
          searchUrl={searchUrl}
          originalTitle={title}
          originalCreator={creator}
          originalDuration={duration}
          onApply={handleApply}
        />
      ) : (
        <>
          <div style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: 0,
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #2a2a2a',
          }}>
            <iframe
              ref={iframeRef}
              key={activeId}
              src={`https://www.youtube.com/embed/${activeId}?enablejsapi=1`}
              title={activeTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>

          {!showReplace && (
            <button
              onClick={() => setShowReplace(true)}
              style={{
                background: 'none', border: 'none',
                color: 'var(--netflix-gray)', fontSize: '0.75rem',
                cursor: 'pointer', alignSelf: 'flex-end',
                textDecoration: 'underline', opacity: 0.55, padding: 0,
              }}
            >
              Este vídeo está indisponível?
            </button>
          )}

          {showReplace && (
            <ReplaceForm
              searchUrl={searchUrl}
              originalTitle={title}
              originalCreator={creator}
              originalDuration={duration}
              onApply={handleApply}
              onCancel={() => setShowReplace(false)}
            />
          )}
        </>
      )}

      {/* Info card */}
      <div style={{
        background: 'var(--netflix-dark-gray)',
        border: '1px solid #2a2a2a',
        borderRadius: '8px',
        padding: '14px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ color: 'var(--netflix-light-gray)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '4px', wordBreak: 'break-word' }}>
            {activeTitle}
          </p>
          <p style={{ color: 'var(--netflix-gray)', fontSize: '0.8rem' }}>
            por <span style={{ color: 'var(--sketchain-gold)' }}>{activeCreator}</span>
            {hasOverride && (
              <span style={{ color: '#3ecf8e', marginLeft: '8px', fontSize: '0.75rem' }}>● substituído</span>
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
          {hasOverride && (
            <button
              onClick={handleRestore}
              title="Voltar ao vídeo original"
              style={{
                background: 'none',
                border: '1px solid #3a2a2a',
                borderRadius: '4px',
                color: '#e74c3c',
                fontSize: '0.72rem',
                cursor: 'pointer',
                padding: '4px 8px',
                whiteSpace: 'nowrap',
              }}
            >
              ↩ Restaurar
            </button>
          )}
          <div style={{
            background: '#2a2a2a',
            borderRadius: '6px',
            padding: '6px 12px',
            color: 'var(--netflix-gray)',
            fontSize: '0.8rem',
            whiteSpace: 'nowrap',
          }}>
            ⏱ {activeDuration} min
          </div>
        </div>
      </div>
    </div>
  );
});

/* ── Shared replace form ───────────────────────────────────────────── */

interface ReplaceFormProps {
  searchUrl: string;
  originalTitle: string;
  originalCreator: string;
  originalDuration: number;
  onApply: (override: VideoOverride) => void;
  onCancel?: () => void;
}

function ReplaceForm({ searchUrl, originalTitle, originalCreator, originalDuration, onApply, onCancel }: ReplaceFormProps) {
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCreator, setNewCreator] = useState('');
  const [newDuration, setNewDuration] = useState('');

  const detectedId = extractYouTubeId(url);
  const isValidUrl = detectedId !== null;

  function handleApply() {
    if (!detectedId) {
      setUrlError('URL inválida. Cole um link youtube.com/watch?v=… ou youtu.be/…');
      return;
    }
    onApply({
      id: detectedId,
      title: newTitle.trim() || originalTitle,
      creator: newCreator.trim() || originalCreator,
      duration: parseInt(newDuration) > 0 ? parseInt(newDuration) : originalDuration,
    });
  }

  return (
    <div style={{
      background: '#111',
      border: '1px solid #2a2a2a',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: 'var(--netflix-light-gray)', fontSize: '0.85rem', fontWeight: '600', margin: 0 }}>
          Substituir vídeo
        </p>
        {onCancel && (
          <button onClick={onCancel} style={{ background: 'none', border: 'none', color: 'var(--netflix-gray)', cursor: 'pointer', fontSize: '1rem', lineHeight: 1, padding: '2px 6px' }}>✕</button>
        )}
      </div>

      <a
        href={searchUrl}
        target="_blank"
        rel="noreferrer"
        style={{ color: '#ff4444', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', gap: '5px', alignItems: 'center' }}
      >
        🔍 Buscar vídeo substituto no YouTube ↗
      </a>

      {/* URL field */}
      <div>
        <label style={labelStyle}>URL do YouTube *</label>
        <input
          value={url}
          onChange={e => { setUrl(e.target.value); setUrlError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleApply()}
          placeholder="https://www.youtube.com/watch?v=..."
          style={{ ...inputStyle, borderColor: urlError ? '#e74c3c' : isValidUrl ? '#3ecf8e' : '#3a3a3a' }}
        />
        {urlError && <p style={errorStyle}>{urlError}</p>}
        {isValidUrl && !urlError && (
          <p style={{ color: '#3ecf8e', fontSize: '0.75rem', margin: '4px 0 0' }}>✓ ID detectado: {detectedId}</p>
        )}
      </div>

      {/* Metadata fields — only shown after valid URL */}
      {isValidUrl && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label style={labelStyle}>Título do vídeo</label>
              <input
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder={originalTitle}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Canal / Criador</label>
              <input
                value={newCreator}
                onChange={e => setNewCreator(e.target.value)}
                placeholder={originalCreator}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ maxWidth: '160px' }}>
            <label style={labelStyle}>Duração (minutos)</label>
            <input
              value={newDuration}
              onChange={e => setNewDuration(e.target.value)}
              placeholder={String(originalDuration)}
              type="number"
              min={1}
              style={inputStyle}
            />
          </div>
          <p style={{ color: 'var(--netflix-gray)', fontSize: '0.75rem', margin: 0 }}>
            Deixe em branco para manter as informações anteriores.
          </p>
        </>
      )}

      <button
        onClick={handleApply}
        disabled={!isValidUrl}
        style={{
          background: isValidUrl ? 'var(--sketchain-terracota)' : '#333',
          border: 'none',
          borderRadius: '6px',
          color: isValidUrl ? '#fff' : 'var(--netflix-gray)',
          fontSize: '0.85rem',
          fontWeight: '600',
          padding: '10px 20px',
          cursor: isValidUrl ? 'pointer' : 'not-allowed',
          alignSelf: 'flex-start',
          transition: 'background 200ms',
        }}
      >
        Aplicar vídeo
      </button>
    </div>
  );
}

function UnavailableFallback(props: Omit<ReplaceFormProps, 'onCancel'>) {
  return (
    <div style={{
      borderRadius: '8px',
      border: '1px solid #3a2a2a',
      background: '#1a1010',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '2rem' }}>📹</div>
      <div>
        <p style={{ color: 'var(--netflix-light-gray)', fontWeight: '600', marginBottom: '4px' }}>Vídeo indisponível</p>
        <p style={{ color: 'var(--netflix-gray)', fontSize: '0.82rem' }}>
          Este vídeo foi removido ou não pode ser incorporado.
        </p>
      </div>
      <div style={{ width: '100%' }}>
        <ReplaceForm {...props} />
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: 'var(--netflix-gray)',
  fontSize: '0.75rem',
  marginBottom: '5px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#1e1e1e',
  border: '1px solid #3a3a3a',
  borderRadius: '6px',
  color: 'var(--netflix-light-gray)',
  padding: '8px 10px',
  fontSize: '0.82rem',
  outline: 'none',
  boxSizing: 'border-box',
};

const errorStyle: React.CSSProperties = {
  color: '#e74c3c',
  fontSize: '0.75rem',
  margin: '4px 0 0',
};

export default VideoEmbed;

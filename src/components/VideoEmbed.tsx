import { memo, useState, useEffect, useCallback, useRef } from 'react';

interface Props {
  youtubeId: string;
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

const VideoEmbed = memo(function VideoEmbed({ youtubeId, title, creator, duration }: Props) {
  const storageKey = `yt_override_${youtubeId}`;
  const [overrideId, setOverrideId] = useState<string | null>(
    () => localStorage.getItem(storageKey)
  );
  const [unavailable, setUnavailable] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [inputError, setInputError] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeId = overrideId ?? youtubeId;

  // Detect YouTube player errors via postMessage (enablejsapi=1)
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== 'https://www.youtube.com') return;
      try {
        const data = JSON.parse(e.data as string);
        // Error codes 100/101/150 = video unavailable / not embeddable
        if (data.event === 'onError' && [100, 101, 150, 2].includes(Number(data.info))) {
          setUnavailable(true);
          setShowReplace(true);
        }
      } catch { /* not a JSON message */ }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  // When override changes, reset unavailability state
  useEffect(() => {
    setUnavailable(false);
    setShowReplace(false);
  }, [overrideId]);

  const handleApply = useCallback(() => {
    const id = extractYouTubeId(urlInput);
    if (!id) {
      setInputError('URL inválida. Cole um link do YouTube (youtube.com/watch?v=... ou youtu.be/...).');
      return;
    }
    localStorage.setItem(storageKey, id);
    setOverrideId(id);
    setUrlInput('');
    setInputError('');
  }, [urlInput, storageKey]);

  const handleRemoveOverride = useCallback(() => {
    localStorage.removeItem(storageKey);
    setOverrideId(null);
  }, [storageKey]);

  const searchQuery = encodeURIComponent(`${title} ${creator} português`);
  const searchUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Player or fallback */}
      {unavailable ? (
        <div style={{
          borderRadius: '8px',
          border: '1px solid #3a2a2a',
          background: '#1a1010',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '2rem' }}>📹</div>
          <div>
            <p style={{ color: 'var(--netflix-light-gray)', fontWeight: '600', marginBottom: '4px' }}>
              Vídeo indisponível
            </p>
            <p style={{ color: 'var(--netflix-gray)', fontSize: '0.82rem' }}>
              Este vídeo foi removido ou não pode ser incorporado.
            </p>
          </div>

          <a
            href={searchUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ff0000',
              color: '#fff',
              borderRadius: '6px',
              padding: '10px 20px',
              fontSize: '0.85rem',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            🔍 Buscar vídeo substituto no YouTube
          </a>

          <ReplaceInput
            urlInput={urlInput}
            setUrlInput={setUrlInput}
            inputError={inputError}
            setInputError={setInputError}
            onApply={handleApply}
          />
        </div>
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
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
            />
          </div>

          {/* Manual trigger — discreet link below player */}
          {!showReplace && (
            <button
              onClick={() => setShowReplace(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--netflix-gray)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                alignSelf: 'flex-end',
                textDecoration: 'underline',
                opacity: 0.6,
                padding: 0,
              }}
            >
              Este vídeo está indisponível?
            </button>
          )}

          {showReplace && (
            <ReplaceInput
              urlInput={urlInput}
              setUrlInput={setUrlInput}
              inputError={inputError}
              setInputError={setInputError}
              onApply={handleApply}
              searchUrl={searchUrl}
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
        <div>
          <p style={{ color: 'var(--netflix-light-gray)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '4px' }}>
            {title}
          </p>
          <p style={{ color: 'var(--netflix-gray)', fontSize: '0.8rem' }}>
            por <span style={{ color: 'var(--sketchain-gold)' }}>{creator}</span>
            {overrideId && overrideId !== youtubeId && (
              <span style={{ color: '#3ecf8e', marginLeft: '8px' }}>· substituído</span>
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
          {overrideId && overrideId !== youtubeId && (
            <button
              onClick={handleRemoveOverride}
              title="Remover substituição"
              style={{
                background: 'none',
                border: '1px solid #3a2a2a',
                borderRadius: '4px',
                color: '#e74c3c',
                fontSize: '0.72rem',
                cursor: 'pointer',
                padding: '4px 8px',
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
            ⏱ {duration} min
          </div>
        </div>
      </div>
    </div>
  );
});

interface ReplaceInputProps {
  urlInput: string;
  setUrlInput: (v: string) => void;
  inputError: string;
  setInputError: (v: string) => void;
  onApply: () => void;
  searchUrl?: string;
  onCancel?: () => void;
}

function ReplaceInput({ urlInput, setUrlInput, inputError, setInputError, onApply, searchUrl, onCancel }: ReplaceInputProps) {
  return (
    <div style={{
      width: '100%',
      background: '#141414',
      border: '1px solid #2a2a2a',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <p style={{ color: 'var(--netflix-light-gray)', fontSize: '0.82rem', fontWeight: '600', margin: 0 }}>
        Substituir vídeo
      </p>
      {searchUrl && (
        <a
          href={searchUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: '#ff4444',
            fontSize: '0.8rem',
            textDecoration: 'none',
          }}
        >
          🔍 Buscar vídeo substituto no YouTube ↗
        </a>
      )}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={urlInput}
          onChange={e => { setUrlInput(e.target.value); setInputError(''); }}
          onKeyDown={e => e.key === 'Enter' && onApply()}
          placeholder="Cole a URL do YouTube aqui..."
          style={{
            flex: 1,
            background: '#1e1e1e',
            border: `1px solid ${inputError ? '#e74c3c' : '#3a3a3a'}`,
            borderRadius: '6px',
            color: 'var(--netflix-light-gray)',
            padding: '8px 12px',
            fontSize: '0.82rem',
            outline: 'none',
          }}
        />
        <button
          onClick={onApply}
          style={{
            background: 'var(--sketchain-terracota)',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            fontSize: '0.82rem',
            fontWeight: '600',
            padding: '8px 16px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Aplicar
        </button>
        {onCancel && (
          <button
            onClick={onCancel}
            style={{
              background: 'none',
              border: '1px solid #3a3a3a',
              borderRadius: '6px',
              color: 'var(--netflix-gray)',
              fontSize: '0.82rem',
              padding: '8px 12px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        )}
      </div>
      {inputError && (
        <p style={{ color: '#e74c3c', fontSize: '0.78rem', margin: 0 }}>{inputError}</p>
      )}
      <p style={{ color: 'var(--netflix-gray)', fontSize: '0.75rem', margin: 0 }}>
        Cole um link como <code style={{ color: 'var(--netflix-light-gray)', background: '#2a2a2a', padding: '1px 5px', borderRadius: '3px' }}>youtube.com/watch?v=…</code> ou <code style={{ color: 'var(--netflix-light-gray)', background: '#2a2a2a', padding: '1px 5px', borderRadius: '3px' }}>youtu.be/…</code>
      </p>
    </div>
  );
}

export default VideoEmbed;

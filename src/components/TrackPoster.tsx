import { memo } from 'react';
import type { TrackMeta } from '@/data/tracks';
import ProgressBar from '@/components/ds/ProgressBar';
import Icon from '@/components/ds/Icon';

interface Props {
  track: TrackMeta;
  progressPct: number;
  done: number;
  total: number;
  diagnosticPending?: boolean;
  onOpen: () => void;
}

const TrackPoster = memo(function TrackPoster({ track, progressPct, done, total, diagnosticPending, onOpen }: Props) {
  return (
    <div
      onClick={onOpen}
      className="card-hover"
      style={{
        position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        cursor: 'pointer', minHeight: 200, padding: 'var(--space-6)',
        background: track.gradient, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,15,15,0.45)' }} />
      <div style={{ position: 'relative' }}>
        <Icon name={track.id === 'ai' ? 'sparkle' : 'layers'} size={28} color="#fff" />
        <h3 style={{ color: '#fff', fontFamily: 'var(--font-brand)', fontSize: 'var(--text-h2)', fontWeight: 700, marginTop: 8 }}>
          {track.name}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'var(--text-sm)', marginTop: 6, maxWidth: 360 }}>
          {track.tagline}
        </p>
      </div>
      <div style={{ position: 'relative', marginTop: 'var(--space-5)' }}>
        {diagnosticPending ? (
          <span style={{ color: '#fff', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
            Diagnóstico pendente · {total} aulas
          </span>
        ) : (
          <>
            <ProgressBar value={progressPct} color="#fff" />
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'var(--text-xs)', display: 'block', marginTop: 6 }}>
              {done}/{total} aulas concluídas
            </span>
          </>
        )}
      </div>
    </div>
  );
});

export default TrackPoster;

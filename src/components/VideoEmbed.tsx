import { memo } from 'react';

interface Props {
  youtubeId: string;
  title: string;
  creator: string;
  duration: number;
}

const VideoEmbed = memo(function VideoEmbed({ youtubeId, title, creator, duration }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #2a2a2a',
      }}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>

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
          </p>
        </div>
        <div style={{
          background: '#2a2a2a',
          borderRadius: '6px',
          padding: '6px 12px',
          color: 'var(--netflix-gray)',
          fontSize: '0.8rem',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          ⏱ {duration} min
        </div>
      </div>
    </div>
  );
});

export default VideoEmbed;

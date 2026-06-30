import { memo } from 'react';
import type { PillarMeta } from '@/data/tracks';
import Icon from '@/components/ds/Icon';
import ProgressBar from '@/components/ds/ProgressBar';

interface Props {
  pillar: PillarMeta;
  lessonCount: number;
  done: number;
  locked: boolean;
  onOpen: () => void;
}

const PillarCard = memo(function PillarCard({ pillar, lessonCount, done, locked, onOpen }: Props) {
  const pct = lessonCount ? Math.round((done / lessonCount) * 100) : 0;
  return (
    <div
      onClick={locked ? undefined : onOpen}
      style={{
        background: 'var(--surface-card)', border: `1px solid var(--border-default)`,
        borderTop: `3px solid ${pillar.color}`, borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)', cursor: locked ? 'not-allowed' : 'pointer',
        opacity: locked ? 0.55 : 1, transition: 'transform var(--duration-base)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', minHeight: 150,
      }}
      onMouseEnter={(e) => { if (!locked) e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: pillar.color, fontSize: 'var(--text-xs)', fontWeight: 700, fontFamily: 'var(--font-brand)' }}>
          PILAR {pillar.order}
        </span>
        {locked && <Icon name="lock" size={16} color="var(--text-muted)" />}
      </div>
      <h4 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-h3)', fontWeight: 600 }}>{pillar.id}</h4>
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', flex: 1 }}>{pillar.blurb}</p>
      {!locked && <ProgressBar value={pct} color={pillar.color} />}
      <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
        {locked ? 'Conclua o pilar anterior' : `${done}/${lessonCount} aulas`}
      </span>
    </div>
  );
});

export default PillarCard;

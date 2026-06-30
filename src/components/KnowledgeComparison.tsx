import { memo } from 'react';
import { deltaLabel } from '@/lib/scoring';
import Badge from '@/components/ds/Badge';
import ProgressBar from '@/components/ds/ProgressBar';

interface Props {
  before: number | null;
  after: number;
  beforeLabel?: string;
}

const KnowledgeComparison = memo(function KnowledgeComparison({ before, after, beforeLabel = 'Conhecimento anterior' }: Props) {
  const delta = before === null ? null : after - before;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {before !== null && (
        <div>
          <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{beforeLabel}</span>
          <ProgressBar value={before} color="var(--text-muted)" showLabel />
        </div>
      )}
      <div>
        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Resultado agora</span>
        <ProgressBar value={after} color="var(--color-success-bright)" showLabel />
      </div>
      {delta !== null && (
        <div>
          <Badge tone={delta >= 0 ? 'success' : 'advanced'}>{deltaLabel(before!, after)}</Badge>
        </div>
      )}
    </div>
  );
});

export default KnowledgeComparison;

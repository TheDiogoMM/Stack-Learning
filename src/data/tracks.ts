import type { Pillar, TrackId } from './lessons';

export interface TrackMeta {
  id: TrackId;
  name: string;
  tagline: string;
  color: string;
  gradient: string;
}

export interface PillarMeta {
  id: Pillar;
  order: number;
  color: string;
  blurb: string;
}

export const TRACKS: TrackMeta[] = [
  {
    id: 'stack',
    name: 'Stack Sketchain',
    tagline: 'Domine o stack de produção: React 19, Next.js, TypeScript, Tailwind, shadcn/ui e Supabase.',
    color: 'var(--accent-primary)',
    gradient: 'var(--brand-gradient)',
  },
  {
    id: 'ai',
    name: 'Engenharia de IA',
    tagline: 'Dos fundamentos de LLMs à produção de agentes autônomos.',
    color: 'var(--color-ai)',
    gradient: 'var(--ai-gradient)',
  },
];

export const PILLARS: PillarMeta[] = [
  { id: 'Fundamentos', order: 1, color: 'var(--pillar-fundamentos)', blurb: 'LLMs, Transformers, embeddings e context windows.' },
  { id: 'Integração',  order: 2, color: 'var(--pillar-integracao)',  blurb: 'APIs generativas, prompt engineering, RAG, MCP e function calling.' },
  { id: 'Autonomia',   order: 3, color: 'var(--pillar-autonomia)',   blurb: 'Agentes autônomos, tool use, multi-agente e orquestração.' },
  { id: 'Produção',    order: 4, color: 'var(--pillar-producao)',    blurb: 'DevOps de IA, observabilidade, segurança, custos e deploy.' },
];

export const trackOf = (technology: string, track?: TrackId): TrackId =>
  track ?? (technology === 'Engenharia de IA' ? 'ai' : 'stack');

export const pillarMeta = (p: Pillar): PillarMeta => PILLARS.find((x) => x.id === p)!;

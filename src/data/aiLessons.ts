import type { Lesson, Pillar } from './lessons';

interface Seed { title: string; difficulty: Lesson['difficulty']; time: number; }

const PILLAR_SEEDS: Record<Pillar, Seed[]> = {
  Fundamentos: [
    { title: 'O que é um LLM', difficulty: 'Iniciante', time: 30 },
    { title: 'A arquitetura Transformer', difficulty: 'Intermediário', time: 45 },
    { title: 'Tokenização', difficulty: 'Iniciante', time: 30 },
    { title: 'Embeddings e espaço vetorial', difficulty: 'Intermediário', time: 40 },
    { title: 'Mecanismo de Attention', difficulty: 'Avançado', time: 50 },
    { title: 'Context window e limites', difficulty: 'Intermediário', time: 35 },
    { title: 'Introdução a fine-tuning', difficulty: 'Intermediário', time: 40 },
    { title: 'Casos de uso de LLMs', difficulty: 'Iniciante', time: 25 },
  ],
  Integração: [
    { title: 'APIs generativas (Anthropic & OpenAI)', difficulty: 'Iniciante', time: 35 },
    { title: 'Prompt engineering', difficulty: 'Intermediário', time: 45 },
    { title: 'RAG básico', difficulty: 'Intermediário', time: 45 },
    { title: 'RAG avançado', difficulty: 'Avançado', time: 55 },
    { title: 'Model Context Protocol (MCP)', difficulty: 'Avançado', time: 50 },
    { title: 'Function calling', difficulty: 'Intermediário', time: 40 },
    { title: 'Streaming de respostas', difficulty: 'Intermediário', time: 35 },
    { title: 'Avaliação de outputs', difficulty: 'Avançado', time: 45 },
  ],
  Autonomia: [
    { title: 'Agentes autônomos', difficulty: 'Intermediário', time: 45 },
    { title: 'Tool use', difficulty: 'Intermediário', time: 40 },
    { title: 'Loops de raciocínio', difficulty: 'Avançado', time: 50 },
    { title: 'Sistemas multi-agente', difficulty: 'Avançado', time: 55 },
    { title: 'Orquestração de agentes', difficulty: 'Avançado', time: 50 },
    { title: 'Memory & state', difficulty: 'Intermediário', time: 40 },
    { title: 'Casos reais de agentes', difficulty: 'Intermediário', time: 35 },
  ],
  Produção: [
    { title: 'DevOps para IA', difficulty: 'Intermediário', time: 45 },
    { title: 'Observabilidade de LLMs', difficulty: 'Avançado', time: 50 },
    { title: 'Segurança & guardrails', difficulty: 'Avançado', time: 50 },
    { title: 'Governança de IA', difficulty: 'Intermediário', time: 40 },
    { title: 'Custos & otimização', difficulty: 'Intermediário', time: 40 },
    { title: 'Fine-tuning avançado', difficulty: 'Avançado', time: 55 },
    { title: 'Deploy de modelos', difficulty: 'Avançado', time: 50 },
  ],
};

const slug = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
   .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function buildPillar(pillar: Pillar, seeds: Seed[], startOrder: number): Lesson[] {
  return seeds.map((s, i) => {
    const id = `ai-${slug(pillar)}-${slug(s.title)}`;
    const next = seeds[i + 1];
    return {
      id,
      title: s.title,
      technology: 'Engenharia de IA',
      track: 'ai',
      pillar,
      pillarOrder: i + 1,
      difficulty: s.difficulty,
      estimatedTime: s.time,
      order: startOrder + i,
      tags: ['ia', slug(pillar)],
      youtubeVideos: [],
      content: `# ${s.title}\n\n> Pilar **${pillar}** · aula ${i + 1} de ${seeds.length}\n\nConteúdo desta aula em produção. Esta trilha entrega a estrutura completa de ${pillar}; o material textual detalhado será publicado em fase posterior.\n\n## O que você vai aprender\n\n- Conceitos centrais de **${s.title}**\n- Como isso se conecta ao restante do pilar ${pillar}\n- Aplicação prática no contexto de engenharia de IA\n`,
      nextLesson: next ? { id: `ai-${slug(pillar)}-${slug(next.title)}`, title: next.title } : undefined,
    } satisfies Lesson;
  });
}

function buildAll(): Lesson[] {
  const order: Pillar[] = ['Fundamentos', 'Integração', 'Autonomia', 'Produção'];
  const out: Lesson[] = [];
  let running = 1;
  for (const p of order) {
    const built = buildPillar(p, PILLAR_SEEDS[p], running);
    out.push(...built);
    running += built.length;
  }
  return out;
}

export const aiLessons: Lesson[] = buildAll();

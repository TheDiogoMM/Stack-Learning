import type { Pillar } from './lessons';

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];        // length 4 (A–D)
  correctIndex: number;     // 0–3
  explanation: string;
  pillar?: Pillar;          // diagnostic questions carry their pillar
}

export interface LessonQuiz {
  lessonId: string;
  questions: QuizQuestion[];   // exactly 3
}

/** Diagnostic: 12 questions, 3 per pillar. */
export const diagnosticQuestions: QuizQuestion[] = [
  // Fundamentos
  { id: 'dg-fund-1', pillar: 'Fundamentos', prompt: 'O que um LLM faz fundamentalmente ao gerar texto?', options: ['Busca respostas num banco de dados fixo', 'Prediz o próximo token com base em probabilidade', 'Executa regras gramaticais codificadas à mão', 'Compila código em linguagem natural'], correctIndex: 1, explanation: 'Um LLM modela a distribuição de probabilidade do próximo token dado o contexto.' },
  { id: 'dg-fund-2', pillar: 'Fundamentos', prompt: 'O que é tokenização?', options: ['Criptografar o prompt', 'Dividir texto em unidades que o modelo processa', 'Validar a sintaxe do prompt', 'Comprimir a resposta final'], correctIndex: 1, explanation: 'Tokenização quebra o texto em tokens (sub-palavras) que o modelo consome.' },
  { id: 'dg-fund-3', pillar: 'Fundamentos', prompt: 'Embeddings representam principalmente:', options: ['O custo de uma chamada de API', 'Significado em um espaço vetorial', 'A latência do modelo', 'O número de parâmetros'], correctIndex: 1, explanation: 'Embeddings posicionam itens semanticamente próximos perto no espaço vetorial.' },
  // Integração
  { id: 'dg-int-1', pillar: 'Integração', prompt: 'RAG serve para:', options: ['Treinar o modelo do zero', 'Fundamentar respostas com dados recuperados', 'Reduzir o número de tokens', 'Acelerar o streaming'], correctIndex: 1, explanation: 'RAG injeta contexto recuperado para fundamentar a geração.' },
  { id: 'dg-int-2', pillar: 'Integração', prompt: 'Function calling permite que o modelo:', options: ['Reescreva seu próprio peso', 'Solicite a execução de ferramentas estruturadas', 'Ignore o system prompt', 'Aumente o context window'], correctIndex: 1, explanation: 'O modelo emite uma chamada estruturada que a aplicação executa.' },
  { id: 'dg-int-3', pillar: 'Integração', prompt: 'MCP (Model Context Protocol) padroniza:', options: ['O formato dos embeddings', 'A conexão entre modelos e fontes de contexto/ferramentas', 'A compressão de prompts', 'O fine-tuning distribuído'], correctIndex: 1, explanation: 'MCP é um protocolo aberto para conectar modelos a ferramentas e dados.' },
  // Autonomia
  { id: 'dg-aut-1', pillar: 'Autonomia', prompt: 'Um agente autônomo se distingue por:', options: ['Responder uma vez e parar', 'Planejar, agir e iterar em loop com ferramentas', 'Não usar LLM', 'Rodar apenas offline'], correctIndex: 1, explanation: 'Agentes operam em loops de raciocínio/ação até atingir o objetivo.' },
  { id: 'dg-aut-2', pillar: 'Autonomia', prompt: 'Em sistemas multi-agente, orquestração trata de:', options: ['Treinar cada agente isoladamente', 'Coordenar agentes especializados para uma meta comum', 'Eliminar o uso de ferramentas', 'Reduzir o número de tokens'], correctIndex: 1, explanation: 'Orquestração coordena papéis e fluxo entre agentes.' },
  { id: 'dg-aut-3', pillar: 'Autonomia', prompt: 'Memory & state em agentes existe para:', options: ['Aumentar a temperatura', 'Persistir contexto entre passos e sessões', 'Desativar ferramentas', 'Acelerar o tokenizer'], correctIndex: 1, explanation: 'Estado/memória mantêm continuidade ao longo do raciocínio.' },
  // Produção
  { id: 'dg-prod-1', pillar: 'Produção', prompt: 'Guardrails servem para:', options: ['Aumentar o context window', 'Restringir entradas/saídas a comportamentos seguros', 'Treinar embeddings', 'Reduzir custo de tokens sempre'], correctIndex: 1, explanation: 'Guardrails impõem limites de segurança e política.' },
  { id: 'dg-prod-2', pillar: 'Produção', prompt: 'Observabilidade de LLM foca em:', options: ['Só medir uptime', 'Rastrear prompts, respostas, custo e qualidade', 'Compilar o modelo', 'Criptografar embeddings'], correctIndex: 1, explanation: 'Observabilidade dá visibilidade de qualidade, custo e falhas.' },
  { id: 'dg-prod-3', pillar: 'Produção', prompt: 'Uma forma direta de reduzir custo é:', options: ['Sempre usar o maior modelo', 'Escolher o modelo certo e controlar tokens', 'Desligar caching', 'Aumentar a temperatura'], correctIndex: 1, explanation: 'Selecionar o modelo adequado e gerenciar tokens controla custo.' },
];

/** Lesson quizzes keyed by lesson id. */
export const lessonQuizzes: Record<string, LessonQuiz> = {
  'ai-fundamentos-o-que-e-um-llm': {
    lessonId: 'ai-fundamentos-o-que-e-um-llm',
    questions: [
      { id: 'q1', prompt: 'Um LLM gera texto ao:', options: ['Copiar de um banco fixo', 'Prever o próximo token', 'Aplicar regras manuais', 'Compilar código'], correctIndex: 1, explanation: 'Predição probabilística do próximo token.' },
      { id: 'q2', prompt: '"Parâmetros" de um modelo são:', options: ['As perguntas do usuário', 'Os pesos aprendidos no treino', 'Os tokens de saída', 'As chaves de API'], correctIndex: 1, explanation: 'Parâmetros são os pesos ajustados durante o treinamento.' },
      { id: 'q3', prompt: 'Temperatura controla:', options: ['O tamanho do modelo', 'A aleatoriedade da geração', 'O custo por token', 'O idioma'], correctIndex: 1, explanation: 'Temperatura ajusta o quão aleatória é a amostragem.' },
    ],
  },
};

/** Generic fallback quiz so every lesson can gate completion. */
export function quizForLesson(lessonId: string, lessonTitle: string): LessonQuiz {
  const bespoke = lessonQuizzes[lessonId];
  if (bespoke) return bespoke;
  return {
    lessonId,
    questions: [
      { id: 'g1', prompt: `Você revisou os conceitos centrais de "${lessonTitle}"?`, options: ['Sim, compreendi a ideia principal', 'Não revisei', 'Pulei o conteúdo', 'Não sei'], correctIndex: 0, explanation: 'Confirmar a leitura ativa a fixação do conteúdo.' },
      { id: 'g2', prompt: 'Qual atitude reforça o aprendizado desta aula?', options: ['Aplicar o conceito num exemplo próprio', 'Ignorar a prática', 'Decorar sem entender', 'Pular para a próxima sem revisar'], correctIndex: 0, explanation: 'Aplicação prática consolida o conhecimento.' },
      { id: 'g3', prompt: 'O conteúdo se conecta melhor quando você:', options: ['Relaciona com o que já sabe', 'Estuda isolado', 'Evita anotações', 'Não pergunta nada'], correctIndex: 0, explanation: 'Conectar com conhecimento prévio melhora a retenção.' },
    ],
  };
}

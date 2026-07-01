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
      { id: 'llm-1', prompt: 'Um LLM gera texto ao:', options: ['Copiar de um banco de dados fixo', 'Prever o próximo token probabilisticamente', 'Aplicar regras gramaticais codificadas', 'Compilar linguagem natural em código'], correctIndex: 1, explanation: 'LLMs modelam a distribuição de probabilidade sobre o vocabulário e amostram o próximo token iterativamente.' },
      { id: 'llm-2', prompt: 'Temperatura 0.0 em um LLM produz:', options: ['Resposta aleatória diferente a cada chamada', 'Sempre o token mais provável (determinístico)', 'Erro de configuração', 'Saída mais longa'], correctIndex: 1, explanation: 'Temperatura zero remove aleatoriedade — o modelo sempre escolhe o token de maior probabilidade.' },
      { id: 'llm-3', prompt: 'O que NÃO é verdadeiro sobre LLMs por padrão?', options: ['Geram texto token a token', 'Têm acesso à internet em tempo real', 'Aprenderam com grandes volumes de texto', 'Usam parâmetros ajustados no treinamento'], correctIndex: 1, explanation: 'Por padrão, LLMs não têm acesso à internet. Acesso à web requer ferramentas externas (function calling/MCP).' },
    ],
  },

  'ai-fundamentos-a-arquitetura-transformer': {
    lessonId: 'ai-fundamentos-a-arquitetura-transformer',
    questions: [
      { id: 'tfm-1', prompt: 'A grande vantagem do Transformer sobre RNNs é:', options: ['Usar menos memória por token', 'Processar todos os tokens em paralelo via attention', 'Não precisar de treinamento', 'Ter vocabulário menor'], correctIndex: 1, explanation: 'O self-attention processa toda a sequência simultaneamente, viabilizando treinamento paralelo em GPU em escala.' },
      { id: 'tfm-2', prompt: 'Modelos geradores como GPT e Claude são do tipo:', options: ['Encoder-only', 'Encoder-Decoder', 'Decoder-only', 'CNN'], correctIndex: 2, explanation: 'LLMs modernos de chat usam arquitetura decoder-only: recebem um prompt e geram tokens autoregressivamente.' },
      { id: 'tfm-3', prompt: 'O Feed-Forward Network (FFN) em cada bloco Transformer:', options: ['Realiza o self-attention entre tokens', 'Armazena conhecimento factual e transforma por token', 'Faz a tokenização do texto', 'Calcula a loss de treinamento'], correctIndex: 1, explanation: 'A FFN (duas camadas lineares com ativação não-linear) é aplicada independentemente por token e "armazena" grande parte do conhecimento factual do modelo.' },
    ],
  },

  'ai-fundamentos-tokenizacao': {
    lessonId: 'ai-fundamentos-tokenizacao',
    questions: [
      { id: 'tok-1', prompt: 'Byte-Pair Encoding (BPE) divide texto em:', options: ['Palavras completas sempre', 'Sub-palavras aprendidas estatisticamente', 'Caracteres individuais', 'Sentenças inteiras'], correctIndex: 1, explanation: 'BPE aprende um vocabulário de sub-palavras frequentes, permitindo representar qualquer texto com tokens conhecidos.' },
      { id: 'tok-2', prompt: 'Por que texto em português usa mais tokens que em inglês?', options: ['Português tem mais vogais', 'Morfologia mais rica gera sub-palavras menos frequentes no vocabulário', 'Modelos são treinados em menos português', 'Tokenizers rejeitam acentos'], correctIndex: 1, explanation: 'A morfologia flexional do português (conjugações, plurais, acentos) cria mais variações de sub-palavras, aumentando o custo em tokens.' },
      { id: 'tok-3', prompt: 'O que são tokens especiais como <|system|>?', options: ['Erros de tokenização', 'Delimitadores de papel que estruturam a conversa', 'Tokens de alto custo cobrados extra', 'Tokens ignorados pelo modelo'], correctIndex: 1, explanation: 'Tokens especiais são inseridos pelo template de chat para delimitar system prompt, user e assistant, estruturando o contexto.' },
    ],
  },

  'ai-fundamentos-embeddings-e-espaco-vetorial': {
    lessonId: 'ai-fundamentos-embeddings-e-espaco-vetorial',
    questions: [
      { id: 'emb-1', prompt: 'Dois embeddings próximos no espaço vetorial indicam:', options: ['Mesmo número de tokens', 'Alta similaridade semântica', 'Mesmo idioma de origem', 'Custo de API igual'], correctIndex: 1, explanation: 'A proximidade geométrica entre embeddings representa similaridade de significado — o princípio central de como busca semântica funciona.' },
      { id: 'emb-2', prompt: 'Similaridade de cosseno entre embeddings mede:', options: ['A diferença de magnitude dos vetores', 'O ângulo entre os vetores (independente do tamanho)', 'O número de dimensões em comum', 'O custo de geração do embedding'], correctIndex: 1, explanation: 'Cosseno mede o ângulo entre vetores, ignorando magnitude — ideal para comparar embeddings que podem ter normas diferentes.' },
      { id: 'emb-3', prompt: 'Um banco vetorial (pgvector, Pinecone) é usado para:', options: ['Armazenar o modelo em si', 'Busca eficiente de vizinhos mais próximos em alta dimensão', 'Fazer fine-tuning', 'Gerenciar tokens de API'], correctIndex: 1, explanation: 'Bancos vetoriais implementam ANN (Approximate Nearest Neighbor) para encontrar os embeddings mais similares em milissegundos mesmo em milhões de vetores.' },
    ],
  },

  'ai-fundamentos-mecanismo-de-attention': {
    lessonId: 'ai-fundamentos-mecanismo-de-attention',
    questions: [
      { id: 'att-1', prompt: 'No self-attention, Query, Key e Value são:', options: ['Três bases de dados separadas', 'Projeções lineares aprendidas de cada embedding de token', 'Camadas de normalização', 'Parâmetros fixos durante a inferência'], correctIndex: 1, explanation: 'Q, K e V são obtidos multiplicando o embedding do token por matrizes de pesos aprendidos — é o coração do mecanismo de atenção.' },
      { id: 'att-2', prompt: 'Multi-head attention usa múltiplas cabeças para:', options: ['Reduzir o custo computacional à metade', 'Aprender diferentes tipos de relações entre tokens em paralelo', 'Processar sequências mais longas', 'Substituir o feed-forward network'], correctIndex: 1, explanation: 'Cada cabeça aprende um padrão diferente (sintaxe, semântica, correferência etc.), e seus outputs são concatenados.' },
      { id: 'att-3', prompt: 'Causal (masked) attention em modelos geradores garante que:', options: ['O modelo nunca erre', 'Cada token só veja tokens anteriores, não futuros', 'Todos os tokens recebam peso igual', 'O contexto seja comprimido'], correctIndex: 1, explanation: 'O masking aplica -∞ nas posições futuras antes do softmax, garantindo que a geração seja autoregressiva e não "trapaceie" vendo o futuro.' },
    ],
  },

  'ai-fundamentos-context-window-e-limites': {
    lessonId: 'ai-fundamentos-context-window-e-limites',
    questions: [
      { id: 'ctx-1', prompt: 'O context window inclui:', options: ['Apenas a pergunta do usuário', 'System prompt + histórico + documentos + pergunta + resposta', 'Só as mensagens do assistente', 'Apenas o system prompt'], correctIndex: 1, explanation: 'Tudo que entra e sai na chamada consome tokens do context window — system prompt, histórico, contexto RAG, pergunta e a própria resposta gerada.' },
      { id: 'ctx-2', prompt: 'O "Lost in the Middle" problem refere-se a:', options: ['Tokens perdidos por erro de rede', 'LLMs tendem a ignorar informação no meio de contextos longos', 'Modelos que esquecem o system prompt', 'Context window menor que o esperado'], correctIndex: 1, explanation: 'Pesquisas mostram que LLMs prestam mais atenção ao início e ao fim do contexto, podendo ignorar informação no meio.' },
      { id: 'ctx-3', prompt: 'Tokens de saída costumam custar em relação a tokens de entrada:', options: ['Igual', 'Mais baratos', 'Mais caros (tipicamente 3–5×)', 'Grátis em APIs modernas'], correctIndex: 2, explanation: 'Na maioria das APIs, output tokens custam significativamente mais que input tokens — ex: Claude 3.5 Sonnet cobra $3/MTok entrada e $15/MTok saída.' },
    ],
  },

  'ai-fundamentos-introducao-a-fine-tuning': {
    lessonId: 'ai-fundamentos-introducao-a-fine-tuning',
    questions: [
      { id: 'ft-1', prompt: 'Antes de fazer fine-tuning, você deve tentar:', options: ['Aumentar a temperatura', 'Prompt engineering, few-shot e RAG primeiro', 'Sempre treinar do zero', 'Reduzir o context window'], correctIndex: 1, explanation: 'Fine-tuning tem custo e complexidade. Prompt engineering bem feito e RAG resolvem a maioria dos casos sem precisar retreinar.' },
      { id: 'ft-2', prompt: 'LoRA (Low-Rank Adaptation) reduz o custo de fine-tuning ao:', options: ['Usar um dataset menor', 'Treinar apenas matrizes de baixo rank adicionadas, não os pesos originais', 'Remover camadas de atenção', 'Desativar o feed-forward'], correctIndex: 1, explanation: 'LoRA insere matrizes de atualização de baixo rank nas camadas de atenção, treinando ~0.1% dos parâmetros originais com qualidade comparável.' },
      { id: 'ft-3', prompt: 'Para fine-tuning supervisionado, o formato de dados precisa de:', options: ['Apenas o texto de saída desejada', 'Pares input → output de alta qualidade', 'Os pesos do modelo base', 'Tokens especiais removidos'], correctIndex: 1, explanation: 'Fine-tuning supervisionado requer exemplos com pares de entrada e saída esperada — o modelo aprende a replicar esse comportamento.' },
    ],
  },

  'ai-fundamentos-casos-de-uso-de-llms': {
    lessonId: 'ai-fundamentos-casos-de-uso-de-llms',
    questions: [
      { id: 'uso-1', prompt: 'Para qual caso LLMs entregam menos valor sozinhos?', options: ['Sumarização de documentos longos', 'Geração de rascunhos de texto', 'Aritmética precisa com números grandes', 'Extração estruturada de dados em texto'], correctIndex: 2, explanation: 'LLMs são ruins para aritmética confiável — use ferramentas/código para cálculos. Para texto e linguagem, são excelentes.' },
      { id: 'uso-2', prompt: 'Extração estruturada (texto → JSON) com LLM é mais confiável quando:', options: ['A temperatura é alta', 'Você usa function calling / structured outputs com schema definido', 'O modelo é pequeno', 'O prompt não tem exemplos'], correctIndex: 1, explanation: 'Function calling / structured outputs forçam o modelo a produzir JSON válido seguindo um schema, eliminando alucinações de formato.' },
      { id: 'uso-3', prompt: 'Ao avaliar viabilidade de um projeto com LLM, a primeira pergunta deve ser:', options: ['Qual modelo usar?', 'Qual é o custo de um erro nesta tarefa?', 'Quantos tokens o modelo suporta?', 'Qual temperatura usar?'], correctIndex: 1, explanation: 'O custo de erro define a tolerância do sistema: se erros são críticos, você precisa de guardrails, revisão humana, ou outra abordagem.' },
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

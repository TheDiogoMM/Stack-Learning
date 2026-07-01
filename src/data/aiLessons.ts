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

// ─── Conteúdo real: pilar Fundamentos ────────────────────────────────────────

const FUNDAMENTOS_CONTENT: Record<string, string> = {
  'ai-fundamentos-o-que-e-um-llm': `# O que é um LLM

**LLM** (Large Language Model) é um modelo de aprendizado profundo treinado em enormes volumes de texto para aprender os padrões estatísticos da linguagem humana. Ao contrário de sistemas de busca ou bancos de dados, ele não recupera informações prontas — ele **gera** texto prevendo, token a token, qual é a continuação mais provável dado o contexto.

## Como um LLM "pensa"

O modelo aprende a mapear sequências de tokens para distribuições de probabilidade sobre o vocabulário. Dado "O céu é ", ele atribui alta probabilidade a "azul" e baixa a "quadrado". Esse processo, repetido centenas de vezes por resposta, produz texto coerente.

\`\`\`
Entrada:  "Explique o que é um LLM em uma frase."
Tokens:   ["Explique", " o", " que", " é", ...]
Saída:    distribuição de prob. sobre ~100k tokens → amostragem
\`\`\`

## Parâmetros e escala

Os **parâmetros** são os pesos da rede neural ajustados durante o treinamento. Modelos maiores (mais parâmetros) geralmente têm maior capacidade de capturar nuances, mas custam mais para treinar e inferir.

| Modelo | Parâmetros (aprox.) |
|--------|---------------------|
| GPT-2  | 1,5 B               |
| GPT-3  | 175 B               |
| Claude 3 Opus | ~200 B estimado |
| Llama 3.1 405B | 405 B       |

## Temperatura e aleatoriedade

A **temperatura** é o único parâmetro de sampling que você mais usará:

- **0.0** — respostas determinísticas, sempre o token mais provável
- **0.7** — equilíbrio entre criatividade e coerência (padrão)
- **1.5+** — respostas criativas mas potencialmente incoerentes

> **Regra prática:** Use temperatura baixa para tarefas de código/dados e mais alta para escrita criativa.

## O que um LLM não é

- Não tem acesso à internet (a menos que ferramentas sejam fornecidas)
- Não "sabe" fatos com certeza — gera o que é estatisticamente provável
- Não tem memória entre sessões por padrão
- Não raciocina como um humano — simula raciocínio via padrões aprendidos

## Próximos passos

Na próxima aula veremos a arquitetura que possibilita tudo isso: o **Transformer**.
`,

  'ai-fundamentos-a-arquitetura-transformer': `# A arquitetura Transformer

Publicado em 2017 no paper *"Attention Is All You Need"*, o Transformer substituiu RNNs e LSTMs como arquitetura dominante para linguagem. Sua inovação central é o **self-attention**, que processa todos os tokens em paralelo em vez de sequencialmente.

## Encoder–Decoder vs Decoder-only

| Tipo | Exemplos | Uso ideal |
|------|----------|-----------|
| Encoder (BERT) | BERT, RoBERTa | Classificação, NER, busca |
| Decoder-only | GPT, Claude, Llama | Geração de texto |
| Encoder–Decoder | T5, BART | Tradução, sumarização |

LLMs modernos de propósito geral são **decoder-only**: recebem um prompt e geram tokens autoregressivamente.

## Blocos principais

\`\`\`
[Token Embeddings]
       ↓
[Positional Encoding]
       ↓
┌─────────────────────┐
│  Transformer Block  │ × N camadas
│  ┌───────────────┐  │
│  │  Self-Attention│  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │  Feed-Forward │  │
│  └───────────────┘  │
└─────────────────────┘
       ↓
[Linear + Softmax → próximo token]
\`\`\`

### 1. Token Embeddings
Cada token é convertido em um vetor denso (ex: 4096 dimensões no Llama 3).

### 2. Positional Encoding
Como o attention é paralelo e não tem noção de ordem, injeta informação de posição. Variantes modernas usam **RoPE** (Rotary Position Embedding) para generalizar para contextos longos.

### 3. Self-Attention
O coração do Transformer — veja a próxima aula (**Mecanismo de Attention**) para detalhes.

### 4. Feed-Forward Network (FFN)
Duas camadas lineares com ativação não-linear (GELU/SiLU) aplicadas por token independentemente. A FFN "armazena" conhecimento factual aprendido no treinamento.

## Por que o Transformer dominou

- **Paralelismo total** no treino: sem dependências sequenciais
- **Attention de longo alcance**: conecta tokens distantes com igual facilidade
- **Escalabilidade**: desempenho melhora previsivelmente com mais dados e parâmetros (leis de escala)

> **Intuição:** Enquanto RNNs eram como ler um livro palavra por palavra sem poder voltar, o Transformer lê a página inteira de uma vez e decide quais partes são relevantes para cada palavra.
`,

  'ai-fundamentos-tokenizacao': `# Tokenização

Antes de qualquer processamento, o texto precisa ser convertido em números. **Tokenização** é o processo de dividir texto em unidades discretas — os **tokens** — que o modelo efetivamente processa.

## Tokens não são palavras

A maioria dos LLMs modernos usa **Byte-Pair Encoding (BPE)** ou variantes (como SentencePiece, tiktoken). O resultado: tokens são sub-palavras.

\`\`\`
"tokenização" → ["token", "iza", "ção"]      (3 tokens)
"gato"        → ["gato"]                      (1 token)
"supercalifragilístico" → ["super", "cal", "if", "ragil", "ístico"] (5 tokens)
\`\`\`

## Por que sub-palavras?

- **Vocabulário gerenciável**: ~100k tokens cobre praticamente qualquer texto
- **Palavras raras**: decompostas em partes conhecidas em vez de \`[UNK]\`
- **Multilíngue**: morfemas de idiomas diferentes compartilham representações

## Custo real em tokens

Entender tokenização é crítico para **custo** e **context window**:

| Conteúdo | Tokens (aprox.) |
|----------|----------------|
| 1 palavra em inglês | 1,3 tokens |
| 1 palavra em português | 1,5–2 tokens |
| 1 linha de código Python | 5–15 tokens |
| 1 página A4 de texto | ~700 tokens |

> Português usa ~30% mais tokens que inglês para o mesmo conteúdo — relevante para custo de API.

## Tokens especiais

Modelos de chat adicionam tokens estruturais:

\`\`\`
<|system|> Você é um assistente útil. <|end|>
<|user|> Olá! <|end|>
<|assistant|>
\`\`\`

Esses tokens delimitam papéis e não são parte do texto do usuário.

## Ferramenta prática

Use o [Tokenizer da OpenAI](https://platform.openai.com/tokenizer) ou \`tiktoken\` para estimar tokens:

\`\`\`python
import tiktoken
enc = tiktoken.get_encoding("cl100k_base")
tokens = enc.encode("Olá, como vai você?")
print(len(tokens))  # 7
\`\`\`

## Implicações para engenheiros

1. **Prompts em inglês são mais baratos** que em português para o mesmo conteúdo
2. **Código verboso custa mais** — minifique quando possível em contextos grandes
3. **Números são tokenizados dígito a dígito** em muitos modelos, impactando aritmética
`,

  'ai-fundamentos-embeddings-e-espaco-vetorial': `# Embeddings e espaço vetorial

Um **embedding** é uma representação numérica de um objeto (palavra, frase, imagem) como um vetor em um espaço de alta dimensão, onde **proximidade geométrica = similaridade semântica**.

## Da palavra ao vetor

\`\`\`
"rei"    → [0.21, -0.45, 0.88, ..., 0.12]   # 1536 dimensões (text-embedding-3-small)
"rainha" → [0.19, -0.41, 0.90, ..., 0.08]
"maçã"   → [-0.55, 0.23, -0.11, ..., 0.67]
\`\`\`

"rei" e "rainha" estão próximos; "maçã" está distante de ambos.

## A álgebra dos embeddings

A propriedade mais famosa: **relações semânticas correspondem a operações vetoriais**.

\`\`\`
vec("rei") - vec("homem") + vec("mulher") ≈ vec("rainha")
vec("Paris") - vec("França") + vec("Alemanha") ≈ vec("Berlim")
\`\`\`

## Similaridade por cosseno

A medida padrão para comparar embeddings é a **similaridade de cosseno** — ignora a magnitude, mede apenas o ângulo:

\`\`\`python
import numpy as np

def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# 1.0 = idênticos, 0.0 = ortogonais, -1.0 = opostos
\`\`\`

## Onde embeddings aparecem na prática

### Busca semântica
\`\`\`
query: "Como resolver problemas de conexão?"
→ embedding da query
→ comparar com embeddings de 10.000 docs no banco
→ retornar os 5 mais similares
\`\`\`

### RAG (Retrieval-Augmented Generation)
O pipeline de RAG usa embeddings como "motor de busca" para encontrar contexto relevante antes de gerar a resposta (veremos isso em Integração).

### Detecção de duplicatas / clustering
Agrupe documentos similares sem lê-los manualmente.

## Modelos de embedding em produção

| Modelo | Dimensões | Contexto | Custo |
|--------|-----------|----------|-------|
| text-embedding-3-small | 1536 | 8191 tokens | Baixo |
| text-embedding-3-large | 3072 | 8191 tokens | Médio |
| Cohere embed-v3 | 1024 | 512 tokens | Baixo |
| nomic-embed (local) | 768 | 8192 tokens | Grátis |

> **Regra prática:** Para a maioria dos casos, \`text-embedding-3-small\` tem ótimo custo-benefício. Use \`large\` só se a qualidade de busca for crítica.

## Banco vetorial

Embeddings são armazenados em **bancos vetoriais** (Pinecone, pgvector, Qdrant, Chroma) que implementam **ANN** (Approximate Nearest Neighbor) para busca eficiente em milhões de vetores em milissegundos.
`,

  'ai-fundamentos-mecanismo-de-attention': `# Mecanismo de Attention

O **self-attention** é o componente que diferencia o Transformer de tudo antes dele. Ele permite que cada token "olhe" para todos os outros tokens e decida quanto peso dar a cada um ao construir sua representação.

## Intuição

> Quando você lê "O banco que fica à beira do **rio** é antigo", seu cérebro automaticamente conecta "banco" a "rio" (margem de rio), não a "dinheiro". O attention faz o equivalente para o modelo.

## Queries, Keys e Values (Q, K, V)

Cada token gera três vetores a partir de seus embeddings:

\`\`\`
token → Linear_Q → Query  (o que estou procurando?)
token → Linear_K → Key    (o que eu ofereço para busca?)
token → Linear_V → Value  (o que eu contribuo se selecionado?)
\`\`\`

O score de atenção entre dois tokens é o produto interno Query × Key:

\`\`\`
Attention(Q, K, V) = softmax(QKᵀ / √d_k) × V
\`\`\`

- **QKᵀ**: matriz de similaridade entre todos os pares de tokens
- **√d_k**: normalização para evitar gradientes muito pequenos
- **softmax**: converte em probabilidades (soma = 1)
- **× V**: média ponderada dos Values pelos pesos de atenção

## Multi-head Attention

Em vez de um único conjunto Q/K/V, o Transformer usa **múltiplas "cabeças"** em paralelo, cada uma aprendendo um padrão diferente:

\`\`\`
[Cabeça 1]: aprende dependências sintáticas (sujeito ↔ verbo)
[Cabeça 2]: aprende correferência (pronome ↔ antecedente)
[Cabeça 3]: aprende relações semânticas (verbo ↔ objeto)
...
[Cabeça N]: padrão especializado emergente
\`\`\`

Os outputs de todas as cabeças são concatenados e projetados de volta.

## Causal (Masked) Attention

Em modelos geradores (decoder-only), tokens só podem "ver" tokens anteriores. O masking aplica \`-∞\` nas posições futuras antes do softmax:

\`\`\`
"Gato   come   rato"
  ↓       ↓      ↓
Gato   → pode ver: [Gato]
come   → pode ver: [Gato, come]
rato   → pode ver: [Gato, come, rato]
\`\`\`

## Complexidade O(n²)

O custo computacional do attention cresce com o **quadrado do número de tokens**. Com 128k tokens de contexto, a matriz de attention tem 16 bilhões de pares — daí a necessidade de variantes como Flash Attention e Sliding Window Attention para contextos longos.

## Por que isso importa para engenheiros

- Tokens **mais próximos do final do contexto** tendem a receber mais atenção
- Informações críticas no **meio de contextos muito longos** podem ser "esquecidas" (Lost in the Middle problem)
- **Flash Attention** (usado em todos os modelos modernos) é uma otimização de hardware, não uma mudança de comportamento
`,

  'ai-fundamentos-context-window-e-limites': `# Context window e limites

O **context window** é a quantidade máxima de tokens que um modelo pode processar em uma única chamada — incluindo o prompt de sistema, o histórico de conversa, documentos injetados e a própria resposta gerada.

## Evolução dos context windows

| Modelo | Context window |
|--------|---------------|
| GPT-3 (2020) | 4.096 tokens (~3 páginas) |
| GPT-4 Turbo (2023) | 128.000 tokens (~100 páginas) |
| Claude 3 (2024) | 200.000 tokens (~150 páginas) |
| Gemini 1.5 Pro (2024) | 1.000.000 tokens (~750 páginas) |

## O que consome tokens

\`\`\`
Total = system_prompt + histórico + documentos_RAG + pergunta_do_usuário + resposta
\`\`\`

Em um chatbot típico com RAG:
- System prompt: ~500 tokens
- Histórico (últimas 10 trocas): ~2.000 tokens
- Documentos recuperados: ~3.000 tokens
- Pergunta: ~50 tokens
- **Total de entrada: ~5.550 tokens**

## Limites práticos (mesmo com janela grande)

### 1. Custo cresce linearmente
Cada token de entrada tem custo. 200k tokens de entrada em Claude Opus custa ~$3 por chamada.

### 2. Latência aumenta
Mais tokens de entrada → mais tempo para a primeira resposta (TTFT).

### 3. Lost in the Middle
Pesquisas mostram que LLMs tendem a ignorar informação no **meio** de contextos muito longos. Coloque o que é mais crítico no início ou no final.

### 4. Limite de saída (max_tokens)
Separado do context window. Claude 3.5 Sonnet tem context de 200k, mas saída máxima de 8.192 tokens por chamada.

## Estratégias para gerenciar contexto

### Summarization
Quando o histórico excede um threshold, sumarize as mensagens mais antigas:
\`\`\`
[msg 1-20 sumarizadas] + [msg 21-30 completas] + [pergunta atual]
\`\`\`

### Chunking + RAG
Em vez de jogar 500 páginas no contexto, use RAG para recuperar apenas os ~5 chunks mais relevantes.

### Sliding window
Para conversas longas, mantenha apenas as últimas N mensagens mais o system prompt.

## Tokens de entrada vs saída

Na maioria das APIs, **tokens de saída custam mais** que tokens de entrada:

\`\`\`
Claude 3.5 Sonnet:
  Input:  $3 / MTok
  Output: $15 / MTok
\`\`\`

Isso significa que respostas longas custam 5× mais por token que o prompt.
`,

  'ai-fundamentos-introducao-a-fine-tuning': `# Introdução a fine-tuning

**Fine-tuning** é o processo de continuar treinando um modelo pré-treinado com um conjunto de dados especializado, ajustando seus pesos para melhorar desempenho em uma tarefa específica.

## Quando usar fine-tuning

Fine-tuning **não** é sempre a resposta. Avalie na seguinte ordem:

\`\`\`
1. Prompt engineering bem feito resolve?  → SIM: use isso
2. RAG com contexto relevante resolve?    → SIM: use isso
3. Few-shot examples no prompt resolvem?  → SIM: use isso
4. Nada acima funciona?                   → Considere fine-tuning
\`\`\`

Casos onde fine-tuning realmente faz sentido:
- **Estilo/tom consistente**: respostas que soam como sua marca
- **Formato de output**: JSON estrito, templates específicos
- **Domínio técnico denso**: jargão médico, jurídico, código proprietário
- **Latência/custo**: modelo menor fine-tunado pode superar modelo maior base

## Tipos de fine-tuning

### 1. Full fine-tuning
Todos os parâmetros são atualizados. Requer GPU significativa e dados suficientes.

### 2. LoRA (Low-Rank Adaptation)
Treina apenas matrizes de baixo rank adicionadas às camadas de atenção. Custo muito menor, resultado comparável:

\`\`\`python
# Com PEFT/HuggingFace:
from peft import LoraConfig, get_peft_model

config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"])
model = get_peft_model(base_model, config)
# Treina ~0.1% dos parâmetros originais
\`\`\`

### 3. RLHF / DPO
Alinha o modelo com preferências humanas. Usado por OpenAI e Anthropic nos modelos base. Complexidade muito maior — raramente feito fora das labs.

## Formato de dados

Para fine-tuning supervisionado, você precisa de pares input → output:

\`\`\`jsonl
{"messages": [
  {"role": "system", "content": "Você é um assistente de suporte técnico."},
  {"role": "user", "content": "Meu pedido não chegou."},
  {"role": "assistant", "content": "Lamento o ocorrido. Pode me informar o número do pedido?"}
]}
\`\`\`

**Regra de ouro:** mínimo de 50–100 exemplos de alta qualidade. Prefira qualidade a quantidade.

## Armadilhas comuns

| Armadilha | Consequência |
|-----------|-------------|
| Dados de baixa qualidade | Modelo aprende erros |
| Poucos exemplos | Overfitting, pouca generalização |
| Fine-tuning como atalho | Custo e manutenção desnecessários quando prompt resolve |
| Usar modelo fine-tunado para tudo | Perde capacidades gerais do modelo base |

## Opções gerenciadas (sem infra)

- **OpenAI Fine-tuning**: GPT-4o mini, dados via API, pay-per-use
- **Anthropic Fine-tuning**: Claude 3 Haiku (em beta)
- **Together AI / Replicate**: open-source models com fine-tuning gerenciado
`,

  'ai-fundamentos-casos-de-uso-de-llms': `# Casos de uso de LLMs

Com os fundamentos em mãos, é hora de mapear onde LLMs entregam valor real — e onde você deve evitá-los.

## Casos com alto ROI comprovado

### 1. Geração e transformação de texto
O uso mais natural dos LLMs:
- Rascunhos de e-mails, relatórios, documentação
- Tradução com contexto de marca
- Sumarização de reuniões, documentos longos
- Reformulação para diferentes públicos

### 2. Extração estruturada de dados
Converter texto não estruturado em JSON/CSV:
\`\`\`
Input:  "Reunião com João Silva, CEO da Acme, em 15/07 às 14h."
Output: { "nome": "João Silva", "cargo": "CEO", "empresa": "Acme",
           "data": "2025-07-15", "hora": "14:00" }
\`\`\`

### 3. Code generation e revisão
- Autocompletion de código (GitHub Copilot)
- Geração de testes unitários
- Explicação e documentação de código legado
- Revisão de código com sugestões de melhoria

### 4. Q&A sobre documentos (RAG)
Base de conhecimento, suporte técnico, onboarding:
- FAQ inteligente sobre produtos/serviços
- Busca semântica em documentação interna
- Triagem de tickets de suporte

### 5. Classificação e roteamento
- Classificar sentimento de reviews
- Categorizar tickets por urgência/tipo
- Detectar intenção do usuário para roteamento

## Casos que parecem bons mas têm problemas

| Caso | Problema |
|------|----------|
| Respostas com fatos precisos (datas, números) | Alucinações — sempre valide com RAG ou tools |
| Sistemas legais/médicos críticos sem revisão humana | Risco regulatório e de erros |
| Substituição completa de busca tradicional | LLMs são lentos e caros para alta volumetria |
| Tarefas determinísticas simples | Regex/código tradicional é mais confiável e barato |

## Avalie com a matriz VALOR × CONFIABILIDADE

\`\`\`
           ALTO VALOR
               │
   Geração  ───┼─── Q&A + RAG
   de texto    │
               │
  ─────────────┼─────────────────
  BAIXA        │         ALTA
  CONFIAB.     │         CONFIAB.
               │
  Aritmética ──┼─── Classificação
  complexa     │    de texto
               │
           BAIXO VALOR
\`\`\`

## Estimando viabilidade de um projeto com LLM

Antes de construir, responda:

1. **Qual é o custo de um erro?** (baixo → ótimo; alto → precisa de guardrail ou revisão humana)
2. **Qual é o volume?** (alto → avalie custo de tokens vs alternativas tradicionais)
3. **A tarefa requer criatividade/linguagem?** (sim → LLM brilha; não → código tradicional pode ser mais simples)
4. **Você tem dados de avaliação?** (sem eval = sem como medir melhorias)

## Próximos passos

Com os fundamentos completos, o próximo pilar — **Integração** — traz as ferramentas práticas: chamadas de API, prompt engineering, RAG e function calling.
`,
};

// ─── Build ────────────────────────────────────────────────────────────────────

function buildPillar(pillar: Pillar, seeds: Seed[], startOrder: number): Lesson[] {
  return seeds.map((s, i) => {
    const id = `ai-${slug(pillar)}-${slug(s.title)}`;
    const next = seeds[i + 1];
    const richContent = FUNDAMENTOS_CONTENT[id];
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
      content: richContent ?? `# ${s.title}\n\n> Pilar **${pillar}** · aula ${i + 1} de ${seeds.length}\n\nConteúdo desta aula em produção. Esta trilha entrega a estrutura completa de ${pillar}; o material textual detalhado será publicado em fase posterior.\n\n## O que você vai aprender\n\n- Conceitos centrais de **${s.title}**\n- Como isso se conecta ao restante do pilar ${pillar}\n- Aplicação prática no contexto de engenharia de IA\n`,
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

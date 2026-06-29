# Design Spec — Trilha de IA + Sistema de Conhecimento + DS + PWA

**Data:** 2026-06-29  
**Status:** Aprovado  
**Escopo:** Stack Learning (React 19 + Vite SPA)

---

## 1. Visão geral

A plataforma evolui de uma única trilha (Stack Sketchain) para uma **plataforma Netflix de trilhas de aprendizado**, com duas trilhas independentes:

| Trilha | Cor | Conteúdo |
|---|---|---|
| Stack Sketchain | Terracota `#D4A574` | 33 aulas, 7 tecnologias |
| Engenharia de IA | Violeta `#8B5CF6` | ~30 aulas, 4 pilares |

O conhecimento do usuário é rastreado **por trilha e de forma unificada** no perfil. Cada trilha funciona de forma independente (progresso, diagnóstico, quiz), mas o score geral consolida ambas.

---

## 2. Design System — Refactor Completo

### 2.1 Tokens (substituir globals.css)

Migrar todos os `var(--netflix-*)` para os tokens canônicos do Design System:

| Atual (globals.css) | DS Token |
|---|---|
| `--netflix-black` | `--color-black` / `--bg-app` |
| `--netflix-dark-gray` | `--color-dark-gray` / `--surface-card` |
| `--netflix-gray` | `--color-gray` / `--text-muted` |
| `--netflix-light-gray` | `--color-light-gray` / `--text-primary` |
| `--sketchain-terracota` | `--color-terracota` / `--accent-primary` |
| `--sketchain-gold` | `--color-gold` / `--accent-secondary` |

Importar `styles.css` do DS como base. Manter `globals.css` apenas para animações e layout de página.

### 2.2 Tipografia

- Fonte UI/headings: **Raleway** (já carregada via Google Fonts no DS)
- Fonte código: **Fira Code** (Monaco Editor + inline `<code>`)
- Carregar via `tokens/fonts.css`

### 2.3 Logo

- Header: `assets/logo.svg` (lockup "Stack Learning" com símbolo de camadas)
- Favicon + PWA: `assets/logo-symbol.svg` + `assets/favicon.svg`
- Substituir texto "Stack Learning" atual pela logo SVG inline

### 2.4 Ícones

Substituir todos os emojis funcionais pelo sprite de ícones do DS (`assets/icons/sprite.svg`):

| Emoji atual | Ícone DS |
|---|---|
| ✅ | `sl-check-circle` |
| 🔒 | `sl-lock` |
| ▶ | `sl-play` |
| ❤️ / 🤍 | `sl-bookmark-fill` / `sl-bookmark` |
| 💡 | `sl-bulb` |
| ‹ › | `sl-chevron-left` / `sl-chevron-right` |
| ← → | `sl-arrow-left` / `sl-arrow-right` |

### 2.5 Componentes reutilizáveis

Migrar / reescrever como componentes TypeScript usando os tokens do DS:

- `Button` — variantes: `primary | secondary | outline | ghost | success`
- `Card` — prop `accent` para borda colorida, `hover` para lift
- `Badge` — tons: `terracota | beginner | intermediate | advanced | neutral | ai`
- `ProgressBar` — prop `color` para cor customizada
- `Icon` — wraper do sprite SVG
- `Tabs` — com underline ativo terracota

---

## 3. Arquitetura de Navegação

### 3.1 Modelo atual → novo

O roteador de estado em `App.tsx` ganha duas novas páginas e a Home é redesenhada:

```
Pages: 'home' | 'login' | 'register' | 'profile'
     | 'tech-path' | 'lesson'            ← existentes
     | 'ai-track' | 'ai-lesson'          ← novas
     | 'diagnostic' | 'diagnostic-result' ← novas
```

### 3.2 Header

```
[Logo] [Início] [Stack Sketchain] [Engenharia de IA]    [⌕] [Avatar]
```

- `sticky top:0`, `backdrop-filter: blur(8px)`
- Item ativo com fundo `--surface-card` + cor `--text-primary`
- Avatar abre dropdown de perfil/logout

---

## 4. Home — Netflix-style

### 4.1 Seções (ordem)

1. **Hero Feature** — destaca a trilha de IA (ou a mais recente / menos progredida). Gradiente dark-violet, título grande, pills dos 4 pilares, CTA "Iniciar diagnóstico" + "Ver trilha". Stats (30 aulas, 4 pilares) no canto direito.
2. **Continuar assistindo** — carrossel horizontal com as últimas aulas acessadas de ambas as trilhas. Tags coloridas identificam a trilha de origem.
3. **Suas trilhas** — grid 2 colunas com card-poster para cada trilha. Stack: terracota, dots das tecnologias. IA: violeta, glow radial. Cada card mostra progresso ou "diagnóstico pendente".
4. **Pilares — Engenharia de IA** — strip de 4 cards com CTA diagnóstico acima. Pilares 2-4 bloqueados até completar o anterior.
5. **Conhecimento consolidado** — ring chart com score geral + barras por trilha. Link para perfil completo.

### 4.2 Responsividade

| Breakpoint | Ajuste |
|---|---|
| `< 640px` | Hero altura reduzida, stats ocultos, meta no rodapé. Carrossel com snap. Track cards em coluna única. Pilares em 2×2. |
| `640–1024px` | Hero com texto menor. Track cards em 2 colunas. Pilares em 2×2. |
| `> 1024px` | Layout completo. |

---

## 5. Trilha de Engenharia de IA

### 5.1 Estrutura de conteúdo

**~30 aulas em 4 pilares sequenciais** (pilar 2 bloqueado até concluir pilar 1, etc.):

| Pilar | Cor | Aulas (8) | Tópicos |
|---|---|---|---|
| 1 — Fundamentos | Violeta `#8B5CF6` | 8 | LLMs, Transformers, Tokenização, Embeddings, Attention, Context window, Fine-tuning intro, Casos de uso |
| 2 — Integração | Azul `#60A5FA` | 8 | APIs generativas (Anthropic/OpenAI), Prompt engineering, RAG básico, RAG avançado, MCPs, Function calling, Streaming, Avaliação de outputs |
| 3 — Autonomia | Verde `#34D399` | 7 | Agentes autônomos, Tool use, Loops de raciocínio, Multi-agent systems, Orquestração, Memory & state, Casos reais |
| 4 — Produção | Laranja `#FB923C` | 7 | DevOps para IA, Observabilidade, Segurança & guardrails, Governança, Custos & otimização, Fine-tuning avançado, Deploy de modelos |

### 5.2 Estrutura de dados (`Lesson` estendida)

```typescript
export type Technology = /* existente */ | 'Engenharia de IA';
export type Pillar = 'Fundamentos' | 'Integração' | 'Autonomia' | 'Produção';

export interface Lesson {
  // campos existentes mantidos
  pillar?: Pillar;          // apenas para trilha de IA
  pillarOrder?: number;     // posição dentro do pilar (1-8)
}
```

### 5.3 Página da trilha de IA (`/ai-track`)

- Hero com gradiente violeta + descrição dos 4 pilares
- CTA de diagnóstico se não realizado, ou score + "Retomar" se já realizado
- Acordeão ou grid de pilares com aulas internas
- Botão "Refazer diagnóstico" no header do pilar após conclusão

---

## 6. Sistema de Avaliação de Conhecimento

### 6.1 Avaliação diagnóstica

**Trigger:** ao clicar "Iniciar avaliação diagnóstica" na Home ou na página da trilha de IA. Se o usuário já realizou o diagnóstico, o CTA muda para "Refazer diagnóstico" e o resultado anterior é exibido antes de iniciar.

**Estrutura:**
- 12 perguntas distribuídas pelos 4 pilares (3 por pilar)
- Múltipla escolha com 4 opções (A–D)
- Stepper visual mostrando progresso
- Badge identificando o pilar da pergunta
- Navegação Anterior / Próxima

**Resultado:**
- Score por pilar (0–100%) e score geral
- Ring chart com conic-gradient
- Breakdown em barras por pilar
- Recomendação personalizada: quais aulas pular, qual aula iniciar, onde focar
- CTA "Iniciar trilha personalizada" → navega para primeira aula recomendada

### 6.2 Quiz por aula

**Trigger:** ao clicar "Marcar como Concluída". O quiz aparece em modal antes de confirmar a conclusão. Se o usuário fechar sem completar, a aula não é marcada como concluída.

**Estrutura:**
- 3 perguntas de múltipla escolha
- Após resposta: revela correto/errado + explicação da resposta
- Barra de progresso do quiz (pergunta 1/3)

**Painel de comparação (após completar quiz):**
- Mostra score do diagnóstico naquele tópico vs. score atual
- Delta em badge verde (+X%)
- Se revisitar a aula: compara tentativa anterior vs. atual

### 6.3 Nivelamento

Se o usuário revisitar uma aula/pilar que já completou:
- Exibe "Seu conhecimento anterior: X%" (data da última tentativa)
- Oferece "Refazer avaliação" para atualizar o score
- Compara resultado novo vs. antigo no painel de resultado

### 6.4 Banco de dados — nova tabela

```sql
CREATE TABLE quiz_results (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id),
  lesson_id   TEXT NOT NULL,           -- ou 'diagnostic-ai' para diagnóstico
  quiz_type   TEXT NOT NULL,           -- 'diagnostic' | 'lesson'
  pillar      TEXT,                    -- pilar da IA (se aplicável)
  score       INTEGER NOT NULL,        -- 0–100
  answers     JSONB,                   -- {questionId: choiceIndex}
  taken_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ver próprios resultados" ON quiz_results
  FOR ALL USING (auth.uid() = user_id);
```

**Tabela existente `user_progress`:** mantida para completed/bookmarked de ambas as trilhas. Adicionar coluna via migration:
```sql
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS track TEXT DEFAULT 'stack';
```
Registros existentes herdam `track = 'stack'` pelo `DEFAULT`. Aulas da trilha de IA usam `track = 'ai'`.

---

## 7. PWA

### 7.1 Dependência

```bash
npm install vite-plugin-pwa
```

### 7.2 Configuração (`vite.config.ts`)

```typescript
import { VitePWA } from 'vite-plugin-pwa';

VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.svg', 'logo-symbol.svg'],
  manifest: {
    name: 'Stack Learning',
    short_name: 'Stack',
    description: 'Aprenda o Stack Sketchain e Engenharia de IA',
    theme_color: '#0F0F0F',
    background_color: '#0F0F0F',
    display: 'standalone',
    start_url: '/',
    icons: [
      { src: 'logo-symbol-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'logo-symbol-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
    ]
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    runtimeCaching: [{
      urlPattern: /^https:\/\/.*supabase\.co\/.*/i,
      handler: 'NetworkFirst',
      options: { cacheName: 'supabase-api', networkTimeoutSeconds: 10 }
    }]
  }
})
```

### 7.3 Ícones PWA

Gerar `logo-symbol-192.png` e `logo-symbol-512.png` a partir de `assets/logo-symbol.svg` usando `sharp` via script Node.js e colocar em `public/`. O script de geração fica em `scripts/generate-pwa-icons.mjs`.

### 7.4 Comportamento offline

- Assets estáticos e aulas (conteúdo Markdown) servidos do cache
- Progresso local via localStorage (já implementado)
- Sync com Supabase quando reconectar
- Tela offline: "Você está sem conexão — seu progresso local está salvo."

---

## 8. Responsividade — Regras Gerais

Breakpoints:

```css
/* mobile */  @media (max-width: 639px)  { … }
/* tablet */  @media (min-width: 640px) and (max-width: 1023px) { … }
/* desktop */ @media (min-width: 1024px) { … }
```

Regras:
- Header: hamburger menu em mobile (ícone `sl-menu`)
- Hero: altura `min(420px, 60vh)` em mobile; stats ocultos abaixo de 640px
- Carrosséis: `scroll-snap-type: x mandatory` + `-webkit-overflow-scrolling: touch`
- Track cards: 1 coluna em mobile, 2 em tablet+
- Pilares: 2×2 em mobile, 4×1 em desktop
- Lesson layout: coluna única em mobile (sidebar move para baixo do conteúdo)
- Quiz: modal full-screen em mobile

---

## 9. Componentes novos a criar

| Componente | Localização | Descrição |
|---|---|---|
| `DiagnosticScreen` | `pages/DiagnosticScreen.tsx` | 12 perguntas + stepper |
| `DiagnosticResult` | `pages/DiagnosticResult.tsx` | Ring chart + breakdown + recomendação |
| `LessonQuiz` | `components/LessonQuiz.tsx` | 3 perguntas + reveal + comparação |
| `KnowledgeComparison` | `components/KnowledgeComparison.tsx` | Barras antes/depois + delta |
| `PillarCard` | `components/PillarCard.tsx` | Card de pilar com progresso + lock |
| `TrackPoster` | `components/TrackPoster.tsx` | Card Netflix-style de trilha |
| `AITrackPage` | `pages/AITrackPage.tsx` | Página da trilha de IA |
| `useQuiz` | `hooks/useQuiz.ts` | Estado do quiz + sync Supabase |
| `useDiagnostic` | `hooks/useDiagnostic.ts` | Diagnóstico + resultado + recomendações |

---

## 10. Fora do escopo desta fase

- Conteúdo final das 30 aulas da trilha de IA (estrutura sim, texto completo não)
- Sistema de notificações push via PWA
- Gamificação / badges / certificados
- Modo offline completo para vídeos do YouTube

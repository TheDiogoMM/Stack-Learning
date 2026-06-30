# Napkin Runbook — Stack Learning

## Curation Rules
- Re-prioritize on every read.
- Keep recurring, high-value notes only.
- Max 10 items per category.
- Each item includes date + "Do instead".

## Execution & Validation (Highest Priority)

1. **[2026-06-29] Navegação é state-based, não React Router**
   Do instead: usar `onNavigate(page, params)` passado como prop — nunca `<Link>` ou `useNavigate`. Pages: 'home' | 'login' | 'register' | 'profile' | 'lesson' | 'tech-path'.

2. **[2026-06-29] Env vars usam prefixo VITE_, não NEXT_PUBLIC_**
   Do instead: `import.meta.env.VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` — isso é Vite SPA puro, não Next.js.

3. **[2026-06-29] Todo conteúdo de aulas é estático em src/data/lessons.ts**
   Do instead: editar `lessons.ts` diretamente para adicionar/alterar aulas. Não há backend de conteúdo.

## Architecture & Patterns

1. **[2026-06-29] SPA Vite com React 19 — sem Next.js, sem SSR**
   Do instead: build via `vite build`, dev via `vite`. Não usar APIs do Next.js (Server Actions, route handlers, etc.).

2. **[2026-06-29] Progresso: localStorage-first, sync Supabase a cada 5 min**
   Do instead: `useProgress()` hook via ProgressContext. Tabela Supabase: `user_progress(user_id, lesson_id, completed, bookmarked, updated_at)`.

3. **[2026-06-29] Todos os componentes de UI são shadcn/ui locais (copiados)**
   Do instead: editar diretamente em `src/components/ui/`. Não instalar via `npx shadcn add` sem verificar compatibilidade com Tailwind 4.

4. **[2026-06-29] Tema visual Netflix-dark com CSS variables**
   Do instead: usar `var(--netflix-black)`, `var(--netflix-dark-gray)`, `var(--netflix-gray)`, `var(--netflix-light-gray)`, `var(--sketchain-terracota)`, `var(--sketchain-gold)`.

## Domain Behavior Guardrails

1. **[2026-06-29] 33 aulas em 7 trilhas — não duplicar IDs de aulas**
   Do instead: verificar `lessons.ts` antes de adicionar aula. IDs únicos snake-case como `react-intro`, `ts-generics`, `sk-deploy`.

2. **[2026-06-29] Trilha Sketchain é o projeto real (8 aulas, order 26–33)**
   Do instead: manter coerência entre as aulas da trilha Sketchain e o sistema Sketchain real.

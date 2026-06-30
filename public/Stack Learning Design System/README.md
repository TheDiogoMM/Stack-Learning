# Stack Learning — Design System

**Stack Learning** (in-product brand: *Sketchain Academy*) is a teaching platform that walks developers through the real technical stack behind a set of apps built with Claude Code. It is a React 19 + Vite single-page app with a **Netflix-dark** visual theme, built around one promise: take a developer **"do zero ao sênior em 8–10 semanas"** (from zero to senior in 8–10 weeks).

The curriculum is organized as **trilhas** (tracks) by technology — React 19, Next.js 15.5, TypeScript, Tailwind CSS 4, shadcn/ui, Supabase — plus a **Sketchain** case-study track that reconstructs a real project from scratch to deploy. Each lesson combines long-form Markdown content, an in-browser Monaco code mini-lab, and curated YouTube videos, with per-user progress tracking and bookmarks.

This design system captures that product's foundations so future interfaces, marketing pieces, decks, and prototypes stay on-brand.

## Sources

This system was reverse-engineered from the product source. The reader is encouraged to explore it directly for deeper fidelity:

- **GitHub — `TheDiogoMM/Stack-Learning`** · https://github.com/TheDiogoMM/Stack-Learning
  - Live theme: `src/styles/globals.css` (the authoritative one — `src/index.css` and `src/App.css` are leftover Vite-template styles, **not** used by the product).
  - Core screens: `src/pages/{Home,LessonDetail,TechPath,Login,Register,Profile}.tsx`
  - Feature components: `src/components/{Header,CodeEditor,VideoEmbed,MarkdownRenderer}.tsx`
  - shadcn primitives: `src/components/ui/*` (button, card, dialog, input, table, tabs, dropdown-menu)
  - Content + tone: `src/data/lessons.ts` (~33 lessons, all copy in Brazilian Portuguese)

> The product UI styles components almost entirely with **inline styles referencing CSS custom properties** declared in `globals.css`. The shadcn `ui/*` primitives exist in the repo but the live pages largely use bespoke inline-styled elements. This system normalizes both into reusable tokens + components.

---

## Content fundamentals

**Language: Brazilian Portuguese (pt-BR), always.** Every label, heading, and sentence in the product is in Portuguese. English appears only as technology proper nouns and code (`React 19`, `useState`, `Server Components`, `App Router`). When generating copy for this brand, write in pt-BR.

**Voice: instructor-to-student, encouraging, plain.** The product addresses the learner directly using the imperative ("Crie um componente…", "Implemente o componente…", "Marque como Concluída") and the informal *você* register. It is a mentor talking, not a marketing department.

**Tone: confident and practical, never hype.** Copy explains *why now* and *when to use* something, and is comfortable telling you when **not** to do something (e.g. "No React 19 com o compilador, … Só otimize manualmente se o Profiler indicar um problema real."). Concepts lead with a one-line plain definition, then code.

**Casing:** Sentence case for almost everything — headings ("Trilha Sequencial", "Por Tecnologia", "Estudo de Caso — Sketchain"), buttons ("Marcar como Concluída", "Ver Solução", "Entrar"). Technology names keep their official casing (Next.js, shadcn/ui, TypeScript). No ALL-CAPS.

**Structure of teaching copy:** `# Título` → one or two framing sentences → `## Subtópico` with a fenced code block → occasional `>` blockquote for the key takeaway → comparison tables for "A vs B" (React 18 vs 19, Interface vs Type, Server vs Client). Inline `código` is used liberally for APIs and filenames.

**Microcopy examples (verbatim from product):**
- Hero: *"Aprenda o Stack Sketchain"* / *"Do Zero ao Sênior em 8–10 semanas"*
- Locked lesson: *"Complete essa aula para desbloquear"*
- Buttons: *"Marcar como Concluída"*, *"Ver Solução"* / *"Ocultar Solução"*, *"Ir para próxima →"*, *"Salvar"* / *"Salvo"*
- Meta: *"{n} de {total} aulas completas"*, *"Progresso da Trilha"*, *"Pré-requisitos: Nenhum"*
- Auth: *"Entrar"*, *"Não tem conta? Registre-se"*

**Emoji: removed.** The source product uses emoji as functional UI glyphs (✅ complete, 🔒 locked, ▶ play, ❤️/🤍 bookmark, 💡 solution, 📧 📱 contact). **This design system replaces all of them with the custom line-icon library** (see Iconography). Do not use emoji in brand output.

---

## Visual foundations

**Overall mood:** a dark, cinematic, "streaming-app" surface (Netflix-dark) warmed by an earthy terracota→gold accent. Calm and focused — content sits on near-black, brand color is used sparingly for emphasis, headings, and progress.

**Color.** Background is near-black `#0F0F0F`; cards and surfaces are `#1A1A1A` with a `#2A2A2A` hairline border. Body text is `#E5E5E5`, muted text/icons `#808080`. The brand pair is **terracota `#D4A574`** (primary — headings, primary buttons, active states, progress fill) and **gold `#F4A261`** (secondary — links, highlights). The only place a saturated gradient appears is the **hero** (`linear-gradient(135deg, #D4A574, #F4A261)` with white text + soft text-shadow). Each technology track has its own accent (React `#61DAFB`, Next.js `#FFF`, TypeScript `#3178C6`, Tailwind `#06B6D4`, shadcn `#A1A1AA`, Supabase `#3ECF8E`) used for that track's progress bar and left-border. Difficulty is color-coded: Iniciante `#3ECF8E`, Intermediário `#F4A261`, Avançado `#E74C3C`.

**Type.** UI/headings use **Raleway** (the product declares `Arial, Raleway, sans-serif`; we treat Raleway as the brand face with Arial fallback). Code uses **Fira Code** (with ligatures) in the Monaco editor and inline `code`. Headings are bold (700) with slightly tight tracking (hero `-1.68px`, headers `-0.3px`). Body runs 1.6 line-height. Sizes are modest: lesson title ~29px, section header ~21px, body ~15px, meta ~12px.

**Backgrounds:** flat near-black — no textures, no patterns, no glassmorphism beyond one touch: the **sticky header** uses `backdrop-filter: blur(8px)` over the dark surface. The hero is the single gradient moment. There is one product photographic asset (`hero.png`); imagery is otherwise minimal.

**Borders & radius:** hairline `1px solid #2A2A2A` defines almost every surface edge. Radii are gentle and consistent — **8px** cards/panels, **6px** buttons, **4px** badges/inputs/chips, full-round (`50%`) only for the carousel arrow buttons and code-window "traffic light" dots.

**Cards:** `#1A1A1A` fill, `1px #2A2A2A` border, `8px` radius, `16–24px` padding. Track cards add a `4px` colored **left border** in the technology's accent. Hover lifts with `transform: scale(1.02)` + `box-shadow: 0 8px 24px rgba(0,0,0,0.4)` over `300ms ease-in-out`.

**Shadows:** essentially none at rest (the dark surface + border does the separating). Shadow is reserved for **hover elevation** and overlays/dialogs. No glow effects.

**Motion:** three named keyframes from the product — `fadeIn` (opacity + 8px rise), `slideRight` (opacity + 16px slide from left), `pulse` (opacity 1→0.5 loop, for loading). Entrances run `300ms ease-out`; hover/color transitions run `200–300ms`. Tasteful and quick — no bounces, no long or infinite decorative animation (pulse is the only loop, and only for loading states). Progress bars animate width over `300ms ease-in-out`.

**States.** Hover: cards scale + shadow; buttons shift background/opacity; bookmark/links shift toward gold. Focus: `2px` outline in terracota (buttons/inputs) or gold (links), `2px` offset — accessibility is explicit in the source. Disabled: reduced opacity (`0.5–0.7`) + `not-allowed` cursor. Active tabs: `2px` terracota bottom-border + terracota text + bold weight; inactive tabs are muted gray.

**Layout:** centered content, `max-width` 1280px (container) / 1200px (lesson). Two-column lesson layout (content + sticky 300px sidebar) collapses to one column under 900px. Generous section padding (`40px` desktop). Mobile-first responsive grids (tech grid 1→2→3 cols). The header is `sticky top:0` with blur.

**Transparency & blur:** used sparingly — header blur, and badge backgrounds as a `~13–22%` alpha tint of their accent color over the dark surface (e.g. a terracota badge is terracota text on `rgba(212,165,116,0.13)` with a solid terracota border).

---

## Iconography

The source product used **emoji as functional UI icons**. Per the brand requirement, this design system ships its **own minimalist line-icon library** to replace them — no emoji in brand output.

**Style:** single-weight **line icons**, `1.6px` stroke on a `24×24` grid, round caps and round joins, no fills (except deliberate "filled" variants like `sl-bookmark-fill`). They use `stroke="currentColor"` so they inherit text color — set color via CSS `color:` (typically `--text-muted` gray, `--accent-primary` terracota, or a state color). This matches the calm, restrained, dark aesthetic and reads cleanly at small sizes (16–28px).

**Source of truth:** `assets/icons/sprite.svg` — an SVG `<symbol>` sprite. Set members and the emoji each replaces:

| Icon id | Replaces | Use |
|---|---|---|
| `sl-check`, `sl-check-circle` | ✅ | lesson complete |
| `sl-lock` | 🔒 | locked lesson |
| `sl-play` | ▶ | start / available lesson |
| `sl-bookmark`, `sl-bookmark-fill` | 🤍 / ❤️ | save / saved |
| `sl-bulb` | 💡 | "Ver Solução" |
| `sl-mail` | 📧 | contact email |
| `sl-phone` | 📱 | contact phone |
| `sl-clock` | — | estimated time |
| `sl-chevron-left/right`, `sl-arrow-left/right` | ‹ › ← → | carousel + nav |
| `sl-code`, `sl-terminal` | — | code / mini-lab |
| `sl-book`, `sl-layers` | — | track / stack |
| `sl-search`, `sl-user`, `sl-menu`, `sl-external`, `sl-sparkle`, `sl-plus`, `sl-x`, `sl-circle-dot` | — | general UI |

**Two consumption paths:**
1. **React (components / UI kits):** use the `Icon` component — `<Icon name="check" />` — which inlines the path data (bulletproof; no external-file `<use>` quirks). Color/size via `color`/`size` props or CSS.
2. **Static HTML (cards, prototypes):** inline the sprite once into the document, then reference symbols with same-document `<use href="#sl-check"/>`. (External-file `<use href="sprite.svg#…">` renders inconsistently across browsers/sandboxes, so inline the sprite.)

**Brand mark:** the logo is a minimalist **stacked-layers** glyph (a wireframe top facet over two fading lower layers — "a stack") in the terracota→gold gradient, paired with a "Stack **Learning**" Raleway wordmark (`Stack` in light-gray, `Learning` in terracota). Files: `assets/logo.svg` (lockup), `assets/logo-symbol.svg` (mark only). `assets/favicon.svg` is the original product favicon (kept for reference).

---

## Index / manifest

**Root**
- `styles.css` — global entry point (import this); `@import`s all token files.
- `README.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter wrapper.

**`tokens/`** — `fonts.css` (Raleway + Fira Code via Google Fonts), `colors.css`, `typography.css`, `spacing.css` (spacing/radius/shadow/motion/layout), `animations.css` (keyframes + utilities).

**`assets/`** — `logo.svg`, `logo-symbol.svg`, `favicon.svg`, `hero.png`, `icons/sprite.svg`.

**`components/`** *(authored below)* — core UI primitives (Button, Icon, Badge, Card, Input, Tabs, ProgressBar, …) as React + `.d.ts` + card HTML.

**`ui_kits/sketchain-academy/`** *(authored below)* — interactive recreation of the learning app (Home / track carousels, Lesson detail, Login).

**Foundation cards** — small `@dsCard` specimens populate the Design System tab under groups Colors, Type, Spacing, Brand.

---

## Caveats / substitutions

- **Fonts** are loaded from **Google Fonts** (Raleway, Fira Code) rather than self-hosted binaries — the source repo did not include font files. If you have licensed/preferred font files, share them and they'll be self-hosted via `@font-face`.
- The product's emoji glyphs were intentionally **replaced** with the custom icon set per the brand brief; if you'd rather keep any emoji, flag which.
- Monaco (the code editor) is represented in UI kits as a styled static code surface, not a live editor.

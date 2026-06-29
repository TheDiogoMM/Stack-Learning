# Trilha de IA + Sistema de Conhecimento + DS + PWA — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Evolve Stack Learning from a single-track course into a Netflix-style dual-track platform (Stack Sketchain + Engenharia de IA) with a diagnostic + per-lesson quiz knowledge-tracking system, a full Design-System refactor, responsiveness across 3 breakpoints, and PWA support.

**Architecture:** React 19 + Vite SPA with custom **state-based navigation** (no React Router — `navigate(page, params)` threaded as a prop). Inline styles driven by CSS custom properties. Supabase for auth + persistence (`user_progress` gains a `track` column; new `quiz_results` table). Pure scoring logic (diagnostic/quiz) is isolated into testable functions; UI is verified via `tsc -b` typecheck + build. localStorage-first progress with periodic Supabase sync (existing pattern preserved).

**Tech Stack:** React 19, TypeScript ~6, Vite 8, Tailwind 4, Supabase JS, Monaco, markdown-it, vite-plugin-pwa, sharp (icon gen), Vitest (scoring tests only).

**Source of truth:** Design spec at [docs/superpowers/specs/2026-06-29-ai-track-quiz-pwa-design.md](../specs/2026-06-29-ai-track-quiz-pwa-design.md). Design System assets at [public/Stack Learning Design System/](../../../public/Stack%20Learning%20Design%20System/).

---

## File Structure

**New directories**
- `src/components/ds/` — reusable Design-System primitives (Icon, Button, Card, Badge, ProgressBar, Tabs)
- `scripts/` — build-time helpers (PWA icon generation)

**Create**
| File | Responsibility |
|---|---|
| `public/ds/sprite.svg`, `public/ds/logo.svg`, `public/ds/logo-symbol.svg`, `public/ds/favicon.svg` | DS assets served at runtime (copied from the DS folder) |
| `src/components/ds/Icon.tsx` | `<Icon name>` wrapper over the SVG sprite |
| `src/components/ds/Logo.tsx` | Inline logo lockup + symbol |
| `src/components/ds/Button.tsx` | Variants `primary\|secondary\|outline\|ghost\|success` |
| `src/components/ds/Card.tsx` | `accent` border + `hover` lift |
| `src/components/ds/Badge.tsx` | Tones incl. difficulty + `ai` |
| `src/components/ds/ProgressBar.tsx` | Determinate bar with custom color |
| `src/components/ds/Tabs.tsx` | Underline-active tabs |
| `src/data/aiLessons.ts` | 30 AI lessons (4 pillars) — structure + stub content |
| `src/data/quizzes.ts` | Per-lesson quizzes + diagnostic question bank + types |
| `src/data/tracks.ts` | Track + pillar metadata (colors, ordering) |
| `src/lib/scoring.ts` | Pure scoring/recommendation functions (unit-tested) |
| `src/lib/scoring.test.ts` | Vitest tests for scoring |
| `src/hooks/useQuiz.ts` | Lesson-quiz state + Supabase sync |
| `src/hooks/useDiagnostic.ts` | Diagnostic state + result + recommendations |
| `src/providers/QuizProvider.tsx` | Loads `quiz_results`, exposes results + save |
| `src/components/TrackPoster.tsx` | Netflix-style track card |
| `src/components/PillarCard.tsx` | Pillar card with progress + lock |
| `src/components/LessonQuiz.tsx` | 3-question modal quiz with reveal |
| `src/components/KnowledgeComparison.tsx` | Before/after bars + delta |
| `src/pages/AITrackPage.tsx` | AI track page (hero + pillars + lessons) |
| `src/pages/DiagnosticScreen.tsx` | 12-question diagnostic + stepper |
| `src/pages/DiagnosticResult.tsx` | Ring chart + breakdown + recommendation |
| `scripts/generate-pwa-icons.mjs` | SVG → 192/512 PNG via sharp |
| `supabase/migrations/2026-06-29_quiz_and_track.sql` | DB migration (reference; applied via MCP) |

**Modify**
| File | Change |
|---|---|
| `src/styles/globals.css` | Replace `--netflix-*` vars with DS tokens + import fonts + new responsive utils |
| `src/data/lessons.ts` | Extend `Technology`, add `Pillar`, add `pillar`/`pillarOrder` to `Lesson` |
| `src/hooks/useProgress.ts` | Add `track` awareness to completed/bookmarked + Supabase sync |
| `src/providers/ProgressProvider.tsx` | Thread `track` through |
| `src/components/Header.tsx` | Logo + track nav + avatar dropdown + hamburger |
| `src/pages/Home.tsx` | Full Netflix redesign (hero, continue, tracks, pillars, knowledge) |
| `src/pages/LessonDetail.tsx` | Trigger `LessonQuiz` before marking complete; show `KnowledgeComparison` |
| `src/App.tsx` | New pages in router + wrap with `QuizProvider` |
| `vite.config.ts` | Add `VitePWA` + Vitest config |
| `package.json` | New deps + scripts |
| `index.html` | Favicon + theme-color |

**Token replacement map (apply everywhere `--netflix-*` / `--sketchain-*` appears):**
```
--netflix-black       → --bg-app           (#0F0F0F)
--netflix-dark-gray   → --surface-card      (#1A1A1A)
--netflix-gray        → --text-muted        (#808080)
--netflix-light-gray  → --text-primary      (#E5E5E5)
--sketchain-terracota → --accent-primary    (#D4A574)
--sketchain-gold      → --accent-secondary  (#F4A261)
```

---

## Task 0: Project setup — dependencies, assets, fonts

**Files:**
- Modify: `package.json`, `vite.config.ts`, `index.html`
- Create: `public/ds/*` (copied assets)

- [ ] **Step 1: Install dependencies**

Run:
```bash
npm install vite-plugin-pwa@^1.0.0
npm install -D sharp vitest jsdom @testing-library/react @testing-library/jest-dom
```
Expected: packages added, no peer-dep errors that block install.

- [ ] **Step 2: Copy DS runtime assets into `public/ds/`**

Run (Git Bash):
```bash
cd "c:/Users/Diogo/Projetos/Stack Learning"
mkdir -p public/ds
cp "public/Stack Learning Design System/assets/icons/sprite.svg" public/ds/sprite.svg
cp "public/Stack Learning Design System/assets/logo.svg" public/ds/logo.svg
cp "public/Stack Learning Design System/assets/logo-symbol.svg" public/ds/logo-symbol.svg
cp "public/Stack Learning Design System/assets/favicon.svg" public/ds/favicon.svg
ls public/ds
```
Expected: `favicon.svg  logo-symbol.svg  logo.svg  sprite.svg`

> Rationale: the DS folder name has spaces and is a delivery artifact. Copying the four runtime assets to a clean `public/ds/` path avoids URL-encoding spaces in `<img>`/`<use>` and keeps imports stable.

- [ ] **Step 3: Add Vitest config + scripts to `package.json`**

Replace the `"scripts"` block:
```json
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "gen:pwa-icons": "node scripts/generate-pwa-icons.mjs"
  },
```

- [ ] **Step 4: Configure Vite (PWA + Vitest) in `vite.config.ts`**

Replace the whole file:
```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['ds/favicon.svg', 'ds/logo-symbol.svg'],
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
          { src: 'logo-symbol-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'supabase-api', networkTimeoutSeconds: 10 },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
```

- [ ] **Step 5: Wire favicon + theme-color in `index.html`**

In `<head>`, ensure these lines exist (replace any existing favicon link):
```html
    <link rel="icon" type="image/svg+xml" href="/ds/favicon.svg" />
    <meta name="theme-color" content="#0F0F0F" />
```

- [ ] **Step 6: Verify the project still builds**

Run: `npm run build`
Expected: PASS (tsc + vite build succeed; PWA plugin emits `sw.js` + `manifest.webmanifest`).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts index.html public/ds
git commit -m "chore: add PWA + vitest deps, copy DS runtime assets"
```

---

## Task 1: Design-System tokens in globals.css

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Replace the token block + fonts at the top of `globals.css`**

Replace lines 1–10 (the `@import "tailwindcss";` + `:root` block) with:
```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800&family=Fira+Code:wght@400;500;600&display=swap');

:root {
  /* ── Base neutrals (Netflix-dark) ── */
  --color-black: #0F0F0F;
  --color-dark-gray: #1A1A1A;
  --color-gray: #808080;
  --color-light-gray: #E5E5E5;
  --color-border: #2A2A2A;
  --color-elevated: #1E1E1E;
  --color-white: #FFFFFF;

  /* ── Brand accents ── */
  --color-terracota: #D4A574;
  --color-gold: #F4A261;
  --color-terracota-soft: rgba(212, 165, 116, 0.13);
  --color-gold-soft: rgba(244, 162, 97, 0.13);
  --brand-gradient: linear-gradient(135deg, #D4A574, #F4A261);

  /* ── AI track accents ── */
  --color-ai: #8B5CF6;
  --color-ai-soft: rgba(139, 92, 246, 0.13);
  --ai-gradient: linear-gradient(135deg, #8B5CF6, #6366F1);
  --pillar-fundamentos: #8B5CF6;
  --pillar-integracao: #60A5FA;
  --pillar-autonomia: #34D399;
  --pillar-producao: #FB923C;

  /* ── Semantic / status ── */
  --color-success: #27AE60;
  --color-success-bright: #3ECF8E;
  --color-warning: #F4A261;
  --color-danger: #E74C3C;

  /* ── Difficulty ── */
  --color-level-beginner: #3ECF8E;
  --color-level-intermediate: #F4A261;
  --color-level-advanced: #E74C3C;

  /* ── Tech accents ── */
  --tech-react: #61DAFB;
  --tech-nextjs: #FFFFFF;
  --tech-typescript: #3178C6;
  --tech-tailwind: #06B6D4;
  --tech-shadcn: #A1A1AA;
  --tech-supabase: #3ECF8E;
  --tech-sketchain: #D4A574;

  /* ── Semantic aliases ── */
  --bg-app: var(--color-black);
  --surface-card: var(--color-dark-gray);
  --surface-code: var(--color-elevated);
  --border-default: var(--color-border);
  --border-strong: var(--color-gray);
  --text-primary: var(--color-light-gray);
  --text-muted: var(--color-gray);
  --text-heading: var(--color-terracota);
  --text-link: var(--color-gold);
  --accent-primary: var(--color-terracota);
  --accent-secondary: var(--color-gold);
  --focus-ring: var(--color-terracota);

  /* ── Typography ── */
  --font-brand: 'Raleway', Arial, system-ui, sans-serif;
  --font-body: Arial, 'Raleway', system-ui, sans-serif;
  --font-mono: 'Fira Code', 'Cascadia Code', ui-monospace, Consolas, monospace;

  /* ── Spacing / radius / motion ── */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 20px; --space-6: 24px; --space-8: 32px; --space-10: 40px; --space-15: 60px;
  --radius-sm: 4px; --radius-md: 6px; --radius-lg: 8px; --radius-full: 9999px;
  --shadow-card-hover: 0 8px 24px rgba(0, 0, 0, 0.4);
  --shadow-overlay: 0 16px 48px rgba(0, 0, 0, 0.6);
  --container-max: 1280px; --content-max: 1200px;
  --ease-standard: ease-in-out; --ease-out: ease-out;
  --duration-fast: 200ms; --duration-base: 300ms; --hover-lift-scale: 1.02;

  /* ── Back-compat aliases (so un-migrated inline styles keep working) ── */
  --netflix-black: var(--bg-app);
  --netflix-dark-gray: var(--surface-card);
  --netflix-gray: var(--text-muted);
  --netflix-light-gray: var(--text-primary);
  --sketchain-terracota: var(--accent-primary);
  --sketchain-gold: var(--accent-secondary);
}
```

> The back-compat aliases let existing inline styles (`Login.tsx`, `Profile.tsx`, etc.) keep rendering correctly even before each file is individually migrated, so the app never visually breaks mid-refactor.

- [ ] **Step 2: Update body font + add carousel/snap utilities at the end of `globals.css`**

Change the `body` rule's `font-family` to `var(--font-body)`, then append:
```css
/* ── Netflix carousels ── */
.row-scroll {
  display: flex;
  gap: var(--space-4);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: var(--space-2);
  scrollbar-width: thin;
}
.row-scroll > * { scroll-snap-align: start; flex: 0 0 auto; }

/* ── Track poster grid ── */
.tracks-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-6); }
@media (min-width: 640px) { .tracks-grid { grid-template-columns: repeat(2, 1fr); } }

/* ── Pillars grid (2x2 mobile, 4x1 desktop) ── */
.pillars-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }
@media (min-width: 1024px) { .pillars-grid { grid-template-columns: repeat(4, 1fr); } }

/* ── Mono code face ── */
code, pre, .mono { font-family: var(--font-mono); }

/* ── Visibility helpers ── */
.hide-mobile { display: none; }
@media (min-width: 640px) { .hide-mobile { display: revert; } }
.only-mobile { display: revert; }
@media (min-width: 640px) { .only-mobile { display: none; } }
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/styles/globals.css
git commit -m "refactor: replace netflix vars with DS tokens + fonts + responsive utils"
```

---

## Task 2: Icon + Logo components

**Files:**
- Create: `src/components/ds/Icon.tsx`, `src/components/ds/Logo.tsx`

- [ ] **Step 1: Create `src/components/ds/Icon.tsx`**

```tsx
import { memo } from 'react';

export type IconName =
  | 'check' | 'check-circle' | 'lock' | 'play' | 'bookmark' | 'bookmark-fill'
  | 'bulb' | 'mail' | 'phone' | 'clock' | 'chevron-left' | 'chevron-right'
  | 'arrow-right' | 'arrow-left' | 'code' | 'terminal' | 'book' | 'layers'
  | 'search' | 'user' | 'menu' | 'external' | 'sparkle' | 'plus' | 'x' | 'circle-dot';

interface Props {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  'aria-label'?: string;
}

/** Renders a glyph from the DS sprite served at /ds/sprite.svg (symbol id `sl-<name>`). */
const Icon = memo(function Icon({ name, size = 20, color = 'currentColor', className, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      style={{ color, display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      aria-hidden={rest['aria-label'] ? undefined : true}
      role={rest['aria-label'] ? 'img' : undefined}
      aria-label={rest['aria-label']}
    >
      <use href={`/ds/sprite.svg#sl-${name}`} />
    </svg>
  );
});

export default Icon;
```

- [ ] **Step 2: Verify the sprite symbol ids match**

Run: `grep -o 'id="sl-[a-z-]*"' "public/ds/sprite.svg" | sort`
Expected: 26 ids matching the `IconName` union (`sl-check`, `sl-check-circle`, … `sl-circle-dot`). If any name differs, fix the `IconName` union to match the sprite.

- [ ] **Step 3: Create `src/components/ds/Logo.tsx`**

```tsx
import { memo } from 'react';

interface Props {
  variant?: 'lockup' | 'symbol';
  height?: number;
  onClick?: () => void;
  className?: string;
}

/** Brand logo from /ds/logo.svg (full lockup) or /ds/logo-symbol.svg (mark only). */
const Logo = memo(function Logo({ variant = 'lockup', height = 28, onClick, className }: Props) {
  const src = variant === 'symbol' ? '/ds/logo-symbol.svg' : '/ds/logo.svg';
  return (
    <img
      src={src}
      alt="Stack Learning"
      height={height}
      onClick={onClick}
      className={className}
      style={{ height, width: 'auto', cursor: onClick ? 'pointer' : 'default', display: 'block' }}
    />
  );
});

export default Logo;
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ds/Icon.tsx src/components/ds/Logo.tsx
git commit -m "feat: add DS Icon + Logo components"
```

---

## Task 3: DS core components (Button, Card, Badge, ProgressBar, Tabs)

**Files:**
- Create: `src/components/ds/Button.tsx`, `Card.tsx`, `Badge.tsx`, `ProgressBar.tsx`, `Tabs.tsx`

- [ ] **Step 1: Create `src/components/ds/Button.tsx`**

```tsx
import { memo, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
type Size = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
}

const VARIANTS: Record<Variant, React.CSSProperties> = {
  primary:   { background: 'var(--accent-primary)', color: '#1A1A1A', border: '1px solid transparent' },
  secondary: { background: 'var(--accent-secondary)', color: '#1A1A1A', border: '1px solid transparent' },
  outline:   { background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--border-strong)' },
  ghost:     { background: 'transparent', color: 'var(--text-primary)', border: '1px solid transparent' },
  success:   { background: 'var(--color-success)', color: '#FFFFFF', border: '1px solid transparent' },
};

const SIZES: Record<Size, React.CSSProperties> = {
  sm: { padding: '6px 12px', fontSize: 'var(--text-sm)' },
  md: { padding: '10px 18px', fontSize: 'var(--text-body)' },
  lg: { padding: '14px 26px', fontSize: 'var(--text-body-lg)' },
};

const Button = memo(function Button({
  variant = 'primary', size = 'md', fullWidth, style, children, disabled, ...rest
}: Props) {
  return (
    <button
      disabled={disabled}
      style={{
        ...VARIANTS[variant],
        ...SIZES[size],
        width: fullWidth ? '100%' : undefined,
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-brand)',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        transition: 'opacity var(--duration-fast), filter var(--duration-fast)',
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.filter = 'brightness(1.08)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = 'none'; }}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
```

- [ ] **Step 2: Create `src/components/ds/Card.tsx`**

```tsx
import { memo, type ReactNode, type CSSProperties } from 'react';

interface Props {
  accent?: string;          // left/top border color
  hover?: boolean;          // lift on hover
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  children: ReactNode;
}

const Card = memo(function Card({ accent, hover, onClick, style, className, children }: Props) {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-default)',
        borderTop: accent ? `3px solid ${accent}` : '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform var(--duration-base), box-shadow var(--duration-base)',
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!hover) return;
        e.currentTarget.style.transform = 'scale(var(--hover-lift-scale))';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
      }}
      onMouseLeave={(e) => {
        if (!hover) return;
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </div>
  );
});

export default Card;
```

- [ ] **Step 3: Create `src/components/ds/Badge.tsx`**

```tsx
import { memo, type ReactNode } from 'react';

type Tone = 'terracota' | 'beginner' | 'intermediate' | 'advanced' | 'neutral' | 'ai' | 'success';

const TONES: Record<Tone, { bg: string; fg: string }> = {
  terracota:    { bg: 'var(--color-terracota-soft)', fg: 'var(--accent-primary)' },
  beginner:     { bg: 'rgba(62,207,142,0.13)', fg: 'var(--color-level-beginner)' },
  intermediate: { bg: 'rgba(244,162,97,0.13)', fg: 'var(--color-level-intermediate)' },
  advanced:     { bg: 'rgba(231,76,60,0.13)', fg: 'var(--color-level-advanced)' },
  neutral:      { bg: 'rgba(128,128,128,0.15)', fg: 'var(--text-muted)' },
  ai:           { bg: 'var(--color-ai-soft)', fg: 'var(--color-ai)' },
  success:      { bg: 'rgba(39,174,96,0.15)', fg: 'var(--color-success-bright)' },
};

interface Props { tone?: Tone; children: ReactNode; }

/** Maps a Difficulty string to the matching tone, if you have one. */
export function difficultyTone(d: string): Tone {
  if (d === 'Iniciante') return 'beginner';
  if (d === 'Intermediário') return 'intermediate';
  if (d === 'Avançado') return 'advanced';
  return 'neutral';
}

const Badge = memo(function Badge({ tone = 'neutral', children }: Props) {
  const t = TONES[tone];
  return (
    <span style={{
      background: t.bg, color: t.fg,
      fontSize: 'var(--text-xs)', fontWeight: 600, fontFamily: 'var(--font-brand)',
      padding: '3px 10px', borderRadius: 'var(--radius-full)',
      display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
});

export default Badge;
```

- [ ] **Step 4: Create `src/components/ds/ProgressBar.tsx`**

```tsx
import { memo } from 'react';

interface Props {
  value: number;          // 0–100
  color?: string;
  height?: number;
  showLabel?: boolean;
}

const ProgressBar = memo(function ProgressBar({ value, color = 'var(--accent-primary)', height = 6, showLabel }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
      <div style={{ flex: 1, height, background: 'var(--color-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 'var(--radius-full)', transition: 'width var(--duration-base)' }} />
      </div>
      {showLabel && <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', minWidth: 34, textAlign: 'right' }}>{Math.round(pct)}%</span>}
    </div>
  );
});

export default ProgressBar;
```

- [ ] **Step 5: Create `src/components/ds/Tabs.tsx`**

```tsx
import { memo } from 'react';

export interface TabItem { id: string; label: string; }

interface Props {
  items: TabItem[];
  active: string;
  onChange: (id: string) => void;
  accent?: string;
}

const Tabs = memo(function Tabs({ items, active, onChange, accent = 'var(--accent-primary)' }: Props) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-6)', borderBottom: '1px solid var(--border-default)' }}>
      {items.map((it) => {
        const isActive = it.id === active;
        return (
          <button
            key={it.id}
            onClick={() => onChange(it.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-brand)', fontSize: 'var(--text-sm)', fontWeight: 600,
              color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
              padding: '10px 2px',
              borderBottom: `2px solid ${isActive ? accent : 'transparent'}`,
              marginBottom: -1, transition: 'color var(--duration-fast)',
            }}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
});

export default Tabs;
```

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/components/ds
git commit -m "feat: add DS core components (Button, Card, Badge, ProgressBar, Tabs)"
```

---

## Task 4: Data types + tracks metadata + AI lessons

**Files:**
- Modify: `src/data/lessons.ts:1-25`
- Create: `src/data/tracks.ts`, `src/data/aiLessons.ts`

- [ ] **Step 1: Extend types in `src/data/lessons.ts`**

Replace lines 1–25 (the type/interface block) with:
```ts
export type Technology =
  | 'React 19' | 'Next.js 15.5' | 'TypeScript' | 'Tailwind CSS 4'
  | 'shadcn/ui' | 'Supabase' | 'Sketchain' | 'Engenharia de IA';
export type Difficulty = 'Iniciante' | 'Intermediário' | 'Avançado';
export type Pillar = 'Fundamentos' | 'Integração' | 'Autonomia' | 'Produção';
export type TrackId = 'stack' | 'ai';

export interface YoutubeVideo {
  title: string;
  youtubeId: string;
  creator: string;
  duration: number;
}

export interface Lesson {
  id: string;
  title: string;
  technology: Technology;
  difficulty: Difficulty;
  estimatedTime: number;
  order: number;
  content: string;
  codeTemplate?: string;
  codeSolution?: string;
  youtubeVideos: YoutubeVideo[];
  prerequisites?: string[];
  tags?: string[];
  nextLesson?: { id: string; title: string };
  track?: TrackId;          // defaults to 'stack' when undefined
  pillar?: Pillar;          // AI track only
  pillarOrder?: number;     // 1-based position within the pillar
}
```

- [ ] **Step 2: Create `src/data/tracks.ts`**

```ts
import type { Pillar, TrackId } from './lessons';

export interface TrackMeta {
  id: TrackId;
  name: string;
  tagline: string;
  color: string;          // CSS var or hex
  gradient: string;
}

export interface PillarMeta {
  id: Pillar;
  order: number;          // 1..4 (sequential unlock)
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
```

- [ ] **Step 3: Create `src/data/aiLessons.ts` (30 lessons, structure + stub content)**

> Per spec §10, full lesson copy is out of scope — ship the complete structure with a consistent stub body per lesson. Each lesson is a real `Lesson` with `track: 'ai'`, `technology: 'Engenharia de IA'`, `pillar`, and `pillarOrder`. The helper builds them DRY so titles are the only per-lesson input.

```ts
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
      content: `# ${s.title}\n\n> Pilar **${pillar}** · aula ${i + 1} de ${seeds.length}\n\nConteúdo desta aula em produção. Esta trilha entrega a estrutura completa de ${pillar}; o material textual detalhado será publicado em fase posterior (ver spec §10).\n\n## O que você vai aprender\n\n- Conceitos centrais de **${s.title}**\n- Como isso se conecta ao restante do pilar ${pillar}\n- Aplicação prática no contexto de engenharia de IA\n`,
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
```

- [ ] **Step 4: Append AI lessons to the exported `lessons` array**

At the very end of `src/data/lessons.ts`, after the closing `];` of the `lessons` array, add:
```ts

// ─── Trilha de IA (importada) ───────────────────────────────────────────────
import { aiLessons } from './aiLessons';
export const allLessons: Lesson[] = [...lessons, ...aiLessons];
```

> Keep the original `lessons` export untouched (Stack-only consumers still work). New track-aware code imports `allLessons`.

- [ ] **Step 5: Verify build + counts**

Run: `npm run build`
Expected: PASS.

Run: `node --input-type=module -e "import('./src/data/aiLessons.ts').then(m=>console.log(m.aiLessons.length))" 2>/dev/null || echo "use vitest assertion instead"`
Expected: best-effort; the authoritative check is the build. AI lessons count must be **30** (8+8+7+7).

- [ ] **Step 6: Commit**

```bash
git add src/data/lessons.ts src/data/tracks.ts src/data/aiLessons.ts
git commit -m "feat: add AI track types, tracks metadata, and 30 AI lessons"
```

---

## Task 5: Quiz + diagnostic data and DB migration

**Files:**
- Create: `src/data/quizzes.ts`, `supabase/migrations/2026-06-29_quiz_and_track.sql`

- [ ] **Step 1: Create `src/data/quizzes.ts`**

```ts
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

/** Lesson quizzes keyed by lesson id. Lessons without an entry fall back to a generic 3-question set. */
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

/** Generic fallback quiz so every lesson can gate completion even before bespoke content exists. */
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
```

- [ ] **Step 2: Create the migration file `supabase/migrations/2026-06-29_quiz_and_track.sql`**

```sql
-- Track column on existing progress (existing rows inherit 'stack')
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS track TEXT DEFAULT 'stack';

-- Quiz + diagnostic results
CREATE TABLE IF NOT EXISTS quiz_results (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id),
  lesson_id   TEXT NOT NULL,            -- or 'diagnostic-ai' for the diagnostic
  quiz_type   TEXT NOT NULL,            -- 'diagnostic' | 'lesson'
  pillar      TEXT,
  score       INTEGER NOT NULL,         -- 0-100
  answers     JSONB,
  taken_at    TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ver próprios resultados" ON quiz_results;
CREATE POLICY "ver próprios resultados" ON quiz_results
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS quiz_results_user_lesson_idx
  ON quiz_results (user_id, lesson_id);
```

- [ ] **Step 3: Apply the migration to Supabase**

Use the Supabase MCP `apply_migration` tool with name `quiz_and_track` and the SQL above. (If MCP is unavailable, run the SQL in the Supabase dashboard SQL editor.)
Expected: migration succeeds; `list_tables` then shows `quiz_results` and `user_progress.track`.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/data/quizzes.ts supabase/migrations/2026-06-29_quiz_and_track.sql
git commit -m "feat: add quiz + diagnostic data and DB migration"
```

---

## Task 6: Pure scoring logic (TDD)

**Files:**
- Create: `src/lib/scoring.ts`, `src/lib/scoring.test.ts`

- [ ] **Step 1: Write the failing tests `src/lib/scoring.test.ts`**

```ts
import { describe, it, expect } from 'vitest';
import { scoreQuiz, scoreDiagnostic, recommendations, deltaLabel } from './scoring';
import type { QuizQuestion } from '@/data/quizzes';

const q = (id: string, correctIndex: number, pillar?: any): QuizQuestion => ({
  id, prompt: id, options: ['a', 'b', 'c', 'd'], correctIndex, explanation: '', pillar,
});

describe('scoreQuiz', () => {
  it('returns 100 when all answers correct', () => {
    const qs = [q('1', 0), q('2', 1), q('3', 2)];
    expect(scoreQuiz(qs, { '1': 0, '2': 1, '3': 2 })).toBe(100);
  });
  it('returns 0 when all wrong', () => {
    const qs = [q('1', 0), q('2', 1)];
    expect(scoreQuiz(qs, { '1': 3, '2': 3 })).toBe(0);
  });
  it('rounds partial scores', () => {
    const qs = [q('1', 0), q('2', 1), q('3', 2)];
    expect(scoreQuiz(qs, { '1': 0, '2': 1, '3': 0 })).toBe(67);
  });
  it('treats missing answers as wrong', () => {
    const qs = [q('1', 0), q('2', 1)];
    expect(scoreQuiz(qs, { '1': 0 })).toBe(50);
  });
});

describe('scoreDiagnostic', () => {
  it('computes per-pillar and overall scores', () => {
    const qs = [q('a', 0, 'Fundamentos'), q('b', 0, 'Fundamentos'), q('c', 0, 'Integração')];
    const res = scoreDiagnostic(qs, { a: 0, b: 3, c: 0 });
    expect(res.byPillar.Fundamentos).toBe(50);
    expect(res.byPillar['Integração']).toBe(100);
    expect(res.overall).toBe(67);
  });
});

describe('recommendations', () => {
  it('flags weak pillars below 60 and strong above 80', () => {
    const rec = recommendations({ Fundamentos: 40, 'Integração': 90, Autonomia: 70, 'Produção': 55 } as any);
    expect(rec.focus).toContain('Fundamentos');
    expect(rec.focus).toContain('Produção');
    expect(rec.canSkip).toContain('Integração');
  });
});

describe('deltaLabel', () => {
  it('formats positive delta', () => { expect(deltaLabel(40, 75)).toBe('+35%'); });
  it('formats zero delta', () => { expect(deltaLabel(50, 50)).toBe('0%'); });
  it('formats negative delta', () => { expect(deltaLabel(80, 60)).toBe('-20%'); });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — `scoring.ts` does not exist / functions undefined.

- [ ] **Step 3: Implement `src/lib/scoring.ts`**

```ts
import type { QuizQuestion } from '@/data/quizzes';
import type { Pillar } from '@/data/lessons';

export type Answers = Record<string, number>;

/** Percentage (0–100, rounded) of correctly answered questions. */
export function scoreQuiz(questions: QuizQuestion[], answers: Answers): number {
  if (questions.length === 0) return 0;
  const correct = questions.reduce(
    (n, q) => n + (answers[q.id] === q.correctIndex ? 1 : 0), 0,
  );
  return Math.round((correct / questions.length) * 100);
}

export interface DiagnosticResult {
  byPillar: Record<Pillar, number>;
  overall: number;
}

const PILLARS: Pillar[] = ['Fundamentos', 'Integração', 'Autonomia', 'Produção'];

export function scoreDiagnostic(questions: QuizQuestion[], answers: Answers): DiagnosticResult {
  const byPillar = {} as Record<Pillar, number>;
  for (const p of PILLARS) {
    const qs = questions.filter((q) => q.pillar === p);
    byPillar[p] = qs.length ? scoreQuiz(qs, answers) : 0;
  }
  const overall = scoreQuiz(questions, answers);
  return { byPillar, overall };
}

export interface Recommendation {
  focus: Pillar[];       // < 60 — needs attention
  canSkip: Pillar[];     // > 80 — likely already mastered
  startPillar: Pillar;   // first pillar (by order) that is < 80
}

export function recommendations(byPillar: Record<Pillar, number>): Recommendation {
  const focus = PILLARS.filter((p) => byPillar[p] < 60);
  const canSkip = PILLARS.filter((p) => byPillar[p] > 80);
  const startPillar = PILLARS.find((p) => byPillar[p] < 80) ?? 'Fundamentos';
  return { focus, canSkip, startPillar };
}

export function deltaLabel(before: number, after: number): string {
  const d = after - before;
  return d > 0 ? `+${d}%` : `${d}%`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (all scoring tests green).

- [ ] **Step 5: Commit**

```bash
git add src/lib/scoring.ts src/lib/scoring.test.ts
git commit -m "feat: add pure quiz/diagnostic scoring logic with tests"
```

---

## Task 7: Quiz persistence provider + hooks

**Files:**
- Create: `src/providers/QuizProvider.tsx`, `src/hooks/useQuiz.ts`, `src/hooks/useDiagnostic.ts`

> Pattern mirrors the existing `ProgressProvider` + `useProgress` (localStorage-first, Supabase sync). Read [src/hooks/useProgress.ts](../../../src/hooks/useProgress.ts) and [src/providers/ProgressProvider.tsx](../../../src/providers/ProgressProvider.tsx) first to match the established shape (context object, `useAuth()` access, localStorage keys prefixed `sl_`).

- [ ] **Step 1: Create `src/providers/QuizProvider.tsx`**

```tsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import type { Answers } from '@/lib/scoring';

export interface QuizRecord {
  lessonId: string;
  quizType: 'diagnostic' | 'lesson';
  pillar?: string;
  score: number;
  answers: Answers;
  takenAt: string;
}

interface QuizContextValue {
  results: QuizRecord[];
  latestFor: (lessonId: string) => QuizRecord | undefined;
  saveResult: (r: Omit<QuizRecord, 'takenAt'>) => Promise<void>;
}

const LS_KEY = 'sl_quiz_results';
const QuizContext = createContext<QuizContextValue | null>(null);

function readLocal(): QuizRecord[] {
  try { return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]'); } catch { return []; }
}
function writeLocal(rs: QuizRecord[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(rs));
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [results, setResults] = useState<QuizRecord[]>(() => readLocal());

  // Hydrate from Supabase on login
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('quiz_results')
        .select('lesson_id, quiz_type, pillar, score, answers, taken_at')
        .eq('user_id', user.id)
        .order('taken_at', { ascending: false });
      if (cancelled || !data) return;
      const mapped: QuizRecord[] = data.map((r: any) => ({
        lessonId: r.lesson_id, quizType: r.quiz_type, pillar: r.pillar ?? undefined,
        score: r.score, answers: r.answers ?? {}, takenAt: r.taken_at,
      }));
      setResults(mapped);
      writeLocal(mapped);
    })();
    return () => { cancelled = true; };
  }, [user]);

  const saveResult = useCallback(async (r: Omit<QuizRecord, 'takenAt'>) => {
    // Use a server-trip timestamp surrogate: ISO from a fresh fetch is overkill; use Date here (runtime, not workflow).
    const takenAt = new Date().toISOString();
    const rec: QuizRecord = { ...r, takenAt };
    setResults((prev) => { const next = [rec, ...prev]; writeLocal(next); return next; });
    if (user) {
      await supabase.from('quiz_results').insert({
        user_id: user.id, lesson_id: r.lessonId, quiz_type: r.quizType,
        pillar: r.pillar ?? null, score: r.score, answers: r.answers,
      });
    }
  }, [user]);

  const latestFor = useCallback(
    (lessonId: string) => results.find((r) => r.lessonId === lessonId),
    [results],
  );

  const value = useMemo<QuizContextValue>(
    () => ({ results, latestFor, saveResult }),
    [results, latestFor, saveResult],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuizStore(): QuizContextValue {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuizStore must be used within QuizProvider');
  return ctx;
}
```

> Note: `import { useCallback }` — fix the casing to `useCallback` (React export). The line above intentionally lists it; ensure the import reads `useCallback`, not `useCallback`/`useCallBack`. Correct import line:
> `import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';`

- [ ] **Step 2: Create `src/hooks/useQuiz.ts`**

```ts
import { useCallback, useMemo, useState } from 'react';
import type { QuizQuestion } from '@/data/quizzes';
import { scoreQuiz, type Answers } from '@/lib/scoring';

export interface UseQuiz {
  index: number;
  current: QuizQuestion;
  total: number;
  answers: Answers;
  revealed: boolean;
  isLast: boolean;
  selected?: number;
  select: (choice: number) => void;
  next: () => void;
  score: number;
  finished: boolean;
}

/** Drives a single lesson quiz: select → reveal → next, computing the final score. */
export function useQuiz(questions: QuizQuestion[]): UseQuiz {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = questions[index];
  const isLast = index === questions.length - 1;

  const select = useCallback((choice: number) => {
    if (revealed) return;
    setAnswers((a) => ({ ...a, [current.id]: choice }));
    setRevealed(true);
  }, [current, revealed]);

  const next = useCallback(() => {
    if (isLast) { setFinished(true); return; }
    setIndex((i) => i + 1);
    setRevealed(false);
  }, [isLast]);

  const score = useMemo(() => scoreQuiz(questions, answers), [questions, answers]);

  return {
    index, current, total: questions.length, answers, revealed, isLast,
    selected: answers[current?.id], select, next, score, finished,
  };
}
```

- [ ] **Step 3: Create `src/hooks/useDiagnostic.ts`**

```ts
import { useCallback, useMemo, useState } from 'react';
import { diagnosticQuestions } from '@/data/quizzes';
import { scoreDiagnostic, recommendations, type Answers, type DiagnosticResult } from '@/lib/scoring';

export interface UseDiagnostic {
  index: number;
  total: number;
  answers: Answers;
  current: typeof diagnosticQuestions[number];
  selected?: number;
  canPrev: boolean;
  canNext: boolean;
  isLast: boolean;
  select: (choice: number) => void;
  prev: () => void;
  next: () => void;
  result: DiagnosticResult & { recs: ReturnType<typeof recommendations> };
}

/** Drives the 12-question diagnostic with free back/forward navigation. */
export function useDiagnostic(): UseDiagnostic {
  const questions = diagnosticQuestions;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const current = questions[index];
  const isLast = index === questions.length - 1;

  const select = useCallback((choice: number) => {
    setAnswers((a) => ({ ...a, [current.id]: choice }));
  }, [current]);

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex((i) => Math.min(questions.length - 1, i + 1)), [questions.length]);

  const result = useMemo(() => {
    const base = scoreDiagnostic(questions, answers);
    return { ...base, recs: recommendations(base.byPillar) };
  }, [questions, answers]);

  return {
    index, total: questions.length, answers, current,
    selected: answers[current.id],
    canPrev: index > 0, canNext: answers[current.id] !== undefined,
    isLast, select, prev, next, result,
  };
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: PASS. If tsc flags the `useCallback` import casing in QuizProvider, fix it per the note in Step 1.

- [ ] **Step 5: Commit**

```bash
git add src/providers/QuizProvider.tsx src/hooks/useQuiz.ts src/hooks/useDiagnostic.ts
git commit -m "feat: add quiz provider + useQuiz/useDiagnostic hooks"
```

---

## Task 8: Track-aware progress

**Files:**
- Modify: `src/hooks/useProgress.ts`, `src/providers/ProgressProvider.tsx`

> Goal: progress for AI lessons persists with `track: 'ai'` so the platform can report per-track and consolidated completion. Read both files fully before editing. The localStorage keys (`sl_completed_lessons`, `sl_bookmarked_lessons`) stay; we add a `track` argument when writing to Supabase and a helper to count completion per track using `allLessons`.

- [ ] **Step 1: Add a per-track completion selector to `useProgress.ts`**

In the value returned by the progress hook, add a helper (adapt names to the actual file):
```ts
import { allLessons, type TrackId } from '@/data/lessons';

// inside the hook, after completedLessons is available:
const completionByTrack = useCallback((track: TrackId): { done: number; total: number; pct: number } => {
  const inTrack = allLessons.filter((l) => (l.track ?? 'stack') === track);
  const total = inTrack.length;
  const done = inTrack.filter((l) => completedLessons.includes(l.id)).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}, [completedLessons]);
```
Expose `completionByTrack` in the returned context value and its TypeScript interface.

- [ ] **Step 2: Tag Supabase writes with `track`**

Where the hook upserts a completed lesson into `user_progress`, look up the lesson's track and include it:
```ts
const lesson = allLessons.find((l) => l.id === lessonId);
const track = lesson?.track ?? 'stack';
// include `track` in the upsert payload, e.g.:
await supabase.from('user_progress').upsert({
  user_id: user.id, lesson_id: lessonId, completed: true, track,
});
```
(Match the existing upsert column names in the file; only add `track`.)

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useProgress.ts src/providers/ProgressProvider.tsx
git commit -m "feat: make progress track-aware (stack vs ai)"
```

---

## Task 9: Header redesign

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Replace `src/components/Header.tsx`**

```tsx
import { memo, useState } from 'react';
import Logo from '@/components/ds/Logo';
import Icon from '@/components/ds/Icon';

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const NAV = [
  { label: 'Início', page: 'home' as const, params: undefined },
  { label: 'Stack Sketchain', page: 'tech-path' as const, params: { id: 'React 19' } },
  { label: 'Engenharia de IA', page: 'ai-track' as const, params: undefined },
];

const Header = memo(function Header({ onNavigate }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      background: 'rgba(26,26,26,0.85)', padding: '14px 24px',
      borderBottom: '1px solid var(--border-default)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(8px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
        <Logo height={26} onClick={() => onNavigate('home')} />
        <nav className="hide-mobile header-nav" style={{ alignItems: 'center' }}>
          {NAV.map((n) => (
            <button key={n.label} onClick={() => onNavigate(n.page, n.params)} style={navStyle}>
              {n.label}
            </button>
          ))}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <button aria-label="Perfil" onClick={() => onNavigate('profile')} style={iconBtn}>
          <Icon name="user" size={22} />
        </button>
        <button aria-label="Menu" className="only-mobile" onClick={() => setOpen((o) => !o)} style={iconBtn}>
          <Icon name={open ? 'x' : 'menu'} size={22} />
        </button>
      </div>

      {open && (
        <div className="only-mobile" style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--surface-card)', borderBottom: '1px solid var(--border-default)',
          display: 'flex', flexDirection: 'column', padding: 'var(--space-2) var(--space-6)',
        }}>
          {NAV.map((n) => (
            <button key={n.label} onClick={() => { onNavigate(n.page, n.params); setOpen(false); }}
              style={{ ...navStyle, textAlign: 'left', padding: '12px 0' }}>
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
});

export default Header;

const navStyle: React.CSSProperties = {
  color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer',
  fontFamily: 'var(--font-brand)', fontSize: 'var(--text-sm)', fontWeight: 500,
};
const iconBtn: React.CSSProperties = {
  color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', padding: 4,
};
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: redesign header with logo, track nav, avatar + mobile menu"
```

---

## Task 10: TrackPoster + PillarCard

**Files:**
- Create: `src/components/TrackPoster.tsx`, `src/components/PillarCard.tsx`

- [ ] **Step 1: Create `src/components/TrackPoster.tsx`**

```tsx
import { memo } from 'react';
import type { TrackMeta } from '@/data/tracks';
import ProgressBar from '@/components/ds/ProgressBar';
import Icon from '@/components/ds/Icon';

interface Props {
  track: TrackMeta;
  progressPct: number;
  done: number;
  total: number;
  diagnosticPending?: boolean;   // ai track only
  onOpen: () => void;
}

const TrackPoster = memo(function TrackPoster({ track, progressPct, done, total, diagnosticPending, onOpen }: Props) {
  return (
    <div
      onClick={onOpen}
      className="card-hover"
      style={{
        position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        cursor: 'pointer', minHeight: 200, padding: 'var(--space-6)',
        background: track.gradient, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,15,15,0.45)' }} />
      <div style={{ position: 'relative' }}>
        <Icon name={track.id === 'ai' ? 'sparkle' : 'layers'} size={28} color="#fff" />
        <h3 style={{ color: '#fff', fontFamily: 'var(--font-brand)', fontSize: 'var(--text-h2)', fontWeight: 700, marginTop: 8 }}>
          {track.name}
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'var(--text-sm)', marginTop: 6, maxWidth: 360 }}>
          {track.tagline}
        </p>
      </div>
      <div style={{ position: 'relative', marginTop: 'var(--space-5)' }}>
        {diagnosticPending ? (
          <span style={{ color: '#fff', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
            Diagnóstico pendente · {total} aulas
          </span>
        ) : (
          <>
            <ProgressBar value={progressPct} color="#fff" />
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'var(--text-xs)', display: 'block', marginTop: 6 }}>
              {done}/{total} aulas concluídas
            </span>
          </>
        )}
      </div>
    </div>
  );
});

export default TrackPoster;
```

- [ ] **Step 2: Create `src/components/PillarCard.tsx`**

```tsx
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
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/TrackPoster.tsx src/components/PillarCard.tsx
git commit -m "feat: add TrackPoster and PillarCard components"
```

---

## Task 11: Home — Netflix redesign

**Files:**
- Modify: `src/pages/Home.tsx`

> Read the current [src/pages/Home.tsx](../../../src/pages/Home.tsx) first to reuse its `onNavigate` prop signature and any existing helpers (carousel refs). Replace its body with the sectioned layout below. Keep lazy-friendly default export.

- [ ] **Step 1: Replace `src/pages/Home.tsx`**

```tsx
import { useMemo } from 'react';
import { allLessons } from '@/data/lessons';
import { TRACKS, PILLARS } from '@/data/tracks';
import { useProgress } from '@/hooks/useProgress';
import { useQuizStore } from '@/providers/QuizProvider';
import TrackPoster from '@/components/TrackPoster';
import PillarCard from '@/components/PillarCard';
import Button from '@/components/ds/Button';
import Icon from '@/components/ds/Icon';
import Badge from '@/components/ds/Badge';

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const DIAGNOSTIC_ID = 'diagnostic-ai';

export default function Home({ onNavigate }: Props) {
  const { completedLessons, completionByTrack } = useProgress();
  const { latestFor } = useQuizStore();

  const aiTrack = TRACKS.find((t) => t.id === 'ai')!;
  const stackTrack = TRACKS.find((t) => t.id === 'stack')!;
  const diagnosticDone = !!latestFor(DIAGNOSTIC_ID);

  const stackStats = completionByTrack('stack');
  const aiStats = completionByTrack('ai');

  const continueLessons = useMemo(
    () => allLessons.filter((l) => completedLessons.includes(l.id)).slice(0, 10),
    [completedLessons],
  );

  const pillarStats = (pillarId: string) => {
    const inPillar = allLessons.filter((l) => l.pillar === pillarId);
    const done = inPillar.filter((l) => completedLessons.includes(l.id)).length;
    return { count: inPillar.length, done };
  };

  return (
    <div>
      {/* 1 — HERO */}
      <section style={{
        position: 'relative', padding: 'var(--space-15) var(--space-6)',
        background: 'linear-gradient(135deg, rgba(139,92,246,0.25), rgba(15,15,15,0.9))',
        borderBottom: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
          <Badge tone="ai"><Icon name="sparkle" size={14} /> Nova trilha</Badge>
          <h1 style={{
            fontFamily: 'var(--font-brand)', fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--text-primary)',
            margin: 'var(--space-4) 0', letterSpacing: 'var(--tracking-display)', lineHeight: 1.1,
          }}>
            Engenharia de IA
          </h1>
          <p style={{ color: 'var(--text-primary)', fontSize: 'var(--text-body-lg)', maxWidth: 560 }}>
            {aiTrack.tagline}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', margin: 'var(--space-5) 0' }}>
            {PILLARS.map((p) => <Badge key={p.id} tone="ai">{p.id}</Badge>)}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <Button variant="primary" size="lg" onClick={() => onNavigate(diagnosticDone ? 'diagnostic-result' : 'diagnostic')}>
              <Icon name="sparkle" size={18} /> {diagnosticDone ? 'Ver diagnóstico' : 'Iniciar diagnóstico'}
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate('ai-track')}>
              <Icon name="play" size={18} /> Ver trilha
            </Button>
          </div>
        </div>
      </section>

      {/* 2 — CONTINUAR */}
      {continueLessons.length > 0 && (
        <section className="section-gap" style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
          <h2 style={sectionTitle}>Continuar assistindo</h2>
          <div className="row-scroll">
            {continueLessons.map((l) => (
              <div key={l.id} onClick={() => onNavigate(l.track === 'ai' ? 'ai-lesson' : 'lesson', { id: l.id })}
                className="card-hover"
                style={{ width: 240, background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-default)', padding: 'var(--space-4)', cursor: 'pointer' }}>
                <Badge tone={l.track === 'ai' ? 'ai' : 'terracota'}>{l.track === 'ai' ? 'IA' : 'Stack'}</Badge>
                <h4 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-h3)', marginTop: 8 }}>{l.title}</h4>
                <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{l.technology}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3 — SUAS TRILHAS */}
      <section className="section-gap" style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <h2 style={sectionTitle}>Suas trilhas</h2>
        <div className="tracks-grid">
          <TrackPoster track={stackTrack} progressPct={stackStats.pct} done={stackStats.done} total={stackStats.total}
            onOpen={() => onNavigate('tech-path', { id: 'React 19' })} />
          <TrackPoster track={aiTrack} progressPct={aiStats.pct} done={aiStats.done} total={aiStats.total}
            diagnosticPending={!diagnosticDone} onOpen={() => onNavigate('ai-track')} />
        </div>
      </section>

      {/* 4 — PILARES IA */}
      <section className="section-gap" style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <h2 style={sectionTitle}>Pilares — Engenharia de IA</h2>
          <Button variant="ghost" size="sm" onClick={() => onNavigate(diagnosticDone ? 'diagnostic-result' : 'diagnostic')}>
            <Icon name="sparkle" size={16} /> {diagnosticDone ? 'Refazer diagnóstico' : 'Iniciar diagnóstico'}
          </Button>
        </div>
        <div className="pillars-grid" style={{ marginTop: 'var(--space-4)' }}>
          {PILLARS.map((p, i) => {
            const st = pillarStats(p.id);
            const prevDone = i === 0 ? true : (() => { const prev = PILLARS[i - 1]; const ps = pillarStats(prev.id); return ps.count > 0 && ps.done === ps.count; })();
            return (
              <PillarCard key={p.id} pillar={p} lessonCount={st.count} done={st.done}
                locked={!prevDone} onOpen={() => onNavigate('ai-track', { pillar: p.id })} />
            );
          })}
        </div>
      </section>

      {/* 5 — CONHECIMENTO CONSOLIDADO */}
      <section className="section-gap-full" style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        <h2 style={sectionTitle}>Conhecimento consolidado</h2>
        <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
          <KnowledgeRing label="Stack Sketchain" pct={stackStats.pct} color="var(--accent-primary)" />
          <KnowledgeRing label="Engenharia de IA" pct={aiStats.pct} color="var(--color-ai)" />
          <Button variant="outline" onClick={() => onNavigate('profile')}>Ver perfil completo</Button>
        </div>
      </section>
    </div>
  );
}

function KnowledgeRing({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 110, height: 110, borderRadius: '50%',
        background: `conic-gradient(${color} ${pct * 3.6}deg, var(--color-border) 0deg)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--bg-app)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-primary)', fontFamily: 'var(--font-brand)', fontWeight: 700, fontSize: 'var(--text-h2)' }}>
          {pct}%
        </div>
      </div>
      <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', display: 'block', marginTop: 8 }}>{label}</span>
    </div>
  );
}

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-brand)', fontSize: 'var(--text-h2)', fontWeight: 700,
  color: 'var(--text-primary)', marginBottom: 'var(--space-4)',
};
```

> If `useProgress()` does not currently expose `completedLessons`/`completionByTrack` under these exact names, adapt to the actual exported names (verify against the file). `completionByTrack` was added in Task 7/8.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: Netflix-style Home with hero, tracks, pillars, knowledge rings"
```

---

## Task 12: AITrackPage

**Files:**
- Create: `src/pages/AITrackPage.tsx`

- [ ] **Step 1: Create `src/pages/AITrackPage.tsx`**

```tsx
import { useState } from 'react';
import { allLessons } from '@/data/lessons';
import { PILLARS } from '@/data/tracks';
import { useProgress } from '@/hooks/useProgress';
import { useQuizStore } from '@/providers/QuizProvider';
import Button from '@/components/ds/Button';
import Badge, { difficultyTone } from '@/components/ds/Badge';
import Icon from '@/components/ds/Icon';
import ProgressBar from '@/components/ds/ProgressBar';

interface Props {
  initialPillar?: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const DIAGNOSTIC_ID = 'diagnostic-ai';

export default function AITrackPage({ initialPillar, onNavigate }: Props) {
  const { completedLessons } = useProgress();
  const { latestFor } = useQuizStore();
  const diag = latestFor(DIAGNOSTIC_ID);
  const [openPillar, setOpenPillar] = useState<string>(initialPillar ?? 'Fundamentos');

  const lessonsFor = (pillarId: string) =>
    allLessons.filter((l) => l.pillar === pillarId).sort((a, b) => (a.pillarOrder ?? 0) - (b.pillarOrder ?? 0));

  const isPillarComplete = (pillarId: string) => {
    const ls = lessonsFor(pillarId);
    return ls.length > 0 && ls.every((l) => completedLessons.includes(l.id));
  };

  const pillarLocked = (i: number) => i > 0 && !isPillarComplete(PILLARS[i - 1].id);

  return (
    <div>
      {/* Hero */}
      <section style={{
        padding: 'var(--space-15) var(--space-6)',
        background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(15,15,15,0.9))',
        borderBottom: '1px solid var(--border-default)',
      }}>
        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
          <Badge tone="ai"><Icon name="sparkle" size={14} /> Trilha</Badge>
          <h1 style={{ fontFamily: 'var(--font-brand)', fontWeight: 800, fontSize: 'clamp(1.8rem,4vw,3rem)',
            color: 'var(--text-primary)', margin: 'var(--space-4) 0' }}>Engenharia de IA</h1>
          <div style={{ marginTop: 'var(--space-4)' }}>
            {diag ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                <Badge tone="success">Diagnóstico: {diag.score}%</Badge>
                <Button variant="outline" size="sm" onClick={() => onNavigate('diagnostic')}>Refazer diagnóstico</Button>
              </div>
            ) : (
              <Button variant="primary" onClick={() => onNavigate('diagnostic')}>
                <Icon name="sparkle" size={16} /> Iniciar avaliação diagnóstica
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Pillars accordion */}
      <section className="section-gap-full" style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
        {PILLARS.map((p, i) => {
          const ls = lessonsFor(p.id);
          const done = ls.filter((l) => completedLessons.includes(l.id)).length;
          const locked = pillarLocked(i);
          const isOpen = openPillar === p.id;
          return (
            <div key={p.id} style={{ marginBottom: 'var(--space-4)', border: '1px solid var(--border-default)',
              borderTop: `3px solid ${p.color}`, borderRadius: 'var(--radius-lg)', overflow: 'hidden', opacity: locked ? 0.6 : 1 }}>
              <button
                onClick={() => !locked && setOpenPillar(isOpen ? '' : p.id)}
                style={{ width: '100%', background: 'var(--surface-card)', border: 'none',
                  cursor: locked ? 'not-allowed' : 'pointer', padding: 'var(--space-5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)' }}
              >
                <div style={{ textAlign: 'left' }}>
                  <span style={{ color: p.color, fontSize: 'var(--text-xs)', fontWeight: 700 }}>PILAR {p.order}</span>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-h2)', fontWeight: 700 }}>{p.id}</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', minWidth: 160 }}>
                  {locked ? <Icon name="lock" size={18} color="var(--text-muted)" />
                    : <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{done}/{ls.length}</span>}
                  <div style={{ flex: 1 }}><ProgressBar value={ls.length ? (done / ls.length) * 100 : 0} color={p.color} /></div>
                  <Icon name={isOpen ? 'chevron-left' : 'chevron-right'} size={18} />
                </div>
              </button>

              {isOpen && !locked && (
                <ul style={{ listStyle: 'none', padding: 'var(--space-2) var(--space-5) var(--space-5)' }}>
                  {ls.map((l) => {
                    const completed = completedLessons.includes(l.id);
                    return (
                      <li key={l.id} onClick={() => onNavigate('ai-lesson', { id: l.id })}
                        style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                          padding: '12px 0', borderBottom: '1px solid var(--border-default)', cursor: 'pointer' }}>
                        <Icon name={completed ? 'check-circle' : 'play'} size={18}
                          color={completed ? 'var(--color-success-bright)' : p.color} />
                        <span style={{ flex: 1, color: 'var(--text-primary)', fontSize: 'var(--text-body)' }}>{l.title}</span>
                        <Badge tone={difficultyTone(l.difficulty)}>{l.difficulty}</Badge>
                        <span className="hide-mobile" style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                          {l.estimatedTime} min
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/pages/AITrackPage.tsx
git commit -m "feat: add AI track page with pillar accordion + sequential unlock"
```

---

## Task 13: DiagnosticScreen + DiagnosticResult

**Files:**
- Create: `src/pages/DiagnosticScreen.tsx`, `src/pages/DiagnosticResult.tsx`

- [ ] **Step 1: Create `src/pages/DiagnosticScreen.tsx`**

```tsx
import { useDiagnostic } from '@/hooks/useDiagnostic';
import { useQuizStore } from '@/providers/QuizProvider';
import Button from '@/components/ds/Button';
import Badge from '@/components/ds/Badge';
import Icon from '@/components/ds/Icon';
import ProgressBar from '@/components/ds/ProgressBar';

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const DIAGNOSTIC_ID = 'diagnostic-ai';

export default function DiagnosticScreen({ onNavigate }: Props) {
  const d = useDiagnostic();
  const { saveResult } = useQuizStore();

  const finish = async () => {
    await saveResult({
      lessonId: DIAGNOSTIC_ID, quizType: 'diagnostic',
      score: d.result.overall, answers: d.answers,
    });
    onNavigate('diagnostic-result');
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-10) var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <ProgressBar value={((d.index + 1) / d.total) * 100} color="var(--color-ai)" />
        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', whiteSpace: 'nowrap' }}>
          {d.index + 1}/{d.total}
        </span>
      </div>

      {d.current.pillar && <Badge tone="ai">{d.current.pillar}</Badge>}
      <h2 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-brand)', fontSize: 'var(--text-h1)',
        fontWeight: 700, margin: 'var(--space-4) 0 var(--space-6)' }}>
        {d.current.prompt}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {d.current.options.map((opt, i) => {
          const active = d.selected === i;
          return (
            <button key={i} onClick={() => d.select(i)}
              style={{ textAlign: 'left', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)',
                border: `1px solid ${active ? 'var(--color-ai)' : 'var(--border-default)'}`,
                background: active ? 'var(--color-ai-soft)' : 'var(--surface-card)',
                color: 'var(--text-primary)', cursor: 'pointer', fontSize: 'var(--text-body)',
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ fontWeight: 700, color: 'var(--color-ai)' }}>{String.fromCharCode(65 + i)}</span>
              {opt}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-8)' }}>
        <Button variant="ghost" onClick={d.prev} disabled={!d.canPrev}>
          <Icon name="arrow-left" size={16} /> Anterior
        </Button>
        {d.isLast
          ? <Button variant="primary" onClick={finish} disabled={!d.canNext}>Finalizar</Button>
          : <Button variant="primary" onClick={d.next} disabled={!d.canNext}>Próxima <Icon name="arrow-right" size={16} /></Button>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/pages/DiagnosticResult.tsx`**

```tsx
import { recommendations } from '@/lib/scoring';
import { scoreDiagnostic } from '@/lib/scoring';
import { diagnosticQuestions } from '@/data/quizzes';
import { PILLARS, pillarMeta } from '@/data/tracks';
import { allLessons } from '@/data/lessons';
import { useQuizStore } from '@/providers/QuizProvider';
import Button from '@/components/ds/Button';
import Badge from '@/components/ds/Badge';
import Icon from '@/components/ds/Icon';
import ProgressBar from '@/components/ds/ProgressBar';
import type { Pillar } from '@/data/lessons';

interface Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

const DIAGNOSTIC_ID = 'diagnostic-ai';

export default function DiagnosticResult({ onNavigate }: Props) {
  const { latestFor } = useQuizStore();
  const record = latestFor(DIAGNOSTIC_ID);

  if (!record) {
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: 'var(--space-15) var(--space-6)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>Você ainda não realizou o diagnóstico.</p>
        <Button variant="primary" onClick={() => onNavigate('diagnostic')} style={{ marginTop: 16 }}>
          Iniciar diagnóstico
        </Button>
      </div>
    );
  }

  const base = scoreDiagnostic(diagnosticQuestions, record.answers);
  const recs = recommendations(base.byPillar);

  const startLesson = allLessons.find((l) => l.pillar === recs.startPillar && l.pillarOrder === 1);

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: 'var(--space-10) var(--space-6)' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', fontWeight: 800, fontSize: 'var(--text-h1)', color: 'var(--text-primary)' }}>
        Seu diagnóstico de IA
      </h1>

      {/* Ring */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', flexWrap: 'wrap', margin: 'var(--space-6) 0' }}>
        <div style={{ width: 140, height: 140, borderRadius: '50%',
          background: `conic-gradient(var(--color-ai) ${base.overall * 3.6}deg, var(--color-border) 0deg)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 106, height: 106, borderRadius: '50%', background: 'var(--bg-app)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: '2rem' }}>{base.overall}%</span>
            <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>geral</span>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 260, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {PILLARS.map((p) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ width: 110, color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{p.id}</span>
              <ProgressBar value={base.byPillar[p.id as Pillar]} color={pillarMeta(p.id).color} showLabel />
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)' }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-h3)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="bulb" size={18} color="var(--color-ai)" /> Recomendação personalizada
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-body)' }}>
          Comece pelo pilar <strong style={{ color: 'var(--text-primary)' }}>{recs.startPillar}</strong>.
        </p>
        {recs.focus.length > 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 8 }}>
            Foco recomendado: {recs.focus.map((p) => <Badge key={p} tone="ai">{p}</Badge>)}
          </p>
        )}
        {recs.canSkip.length > 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)', marginTop: 8 }}>
            Você já domina: {recs.canSkip.map((p) => <Badge key={p} tone="success">{p}</Badge>)}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)', flexWrap: 'wrap' }}>
        <Button variant="primary" onClick={() => startLesson ? onNavigate('ai-lesson', { id: startLesson.id }) : onNavigate('ai-track')}>
          <Icon name="play" size={16} /> Iniciar trilha personalizada
        </Button>
        <Button variant="outline" onClick={() => onNavigate('ai-track')}>Ver todos os pilares</Button>
        <Button variant="ghost" onClick={() => onNavigate('diagnostic')}>Refazer diagnóstico</Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/pages/DiagnosticScreen.tsx src/pages/DiagnosticResult.tsx
git commit -m "feat: add diagnostic screen + result with ring chart and recommendations"
```

---

## Task 14: LessonQuiz + KnowledgeComparison

**Files:**
- Create: `src/components/LessonQuiz.tsx`, `src/components/KnowledgeComparison.tsx`

- [ ] **Step 1: Create `src/components/KnowledgeComparison.tsx`**

```tsx
import { memo } from 'react';
import { deltaLabel } from '@/lib/scoring';
import Badge from '@/components/ds/Badge';
import ProgressBar from '@/components/ds/ProgressBar';

interface Props {
  before: number | null;   // prior score (diagnostic or last attempt); null if none
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
```

- [ ] **Step 2: Create `src/components/LessonQuiz.tsx`**

```tsx
import { useQuiz } from '@/hooks/useQuiz';
import { quizForLesson } from '@/data/quizzes';
import { useQuizStore } from '@/providers/QuizProvider';
import KnowledgeComparison from '@/components/KnowledgeComparison';
import Button from '@/components/ds/Button';
import Icon from '@/components/ds/Icon';
import ProgressBar from '@/components/ds/ProgressBar';
import { useState } from 'react';

interface Props {
  lessonId: string;
  lessonTitle: string;
  pillar?: string;
  priorScore: number | null;     // diagnostic score for the pillar, or last attempt
  onPass: (score: number) => void;  // called once quiz finished -> caller marks complete
  onClose: () => void;
}

export default function LessonQuiz({ lessonId, lessonTitle, pillar, priorScore, onPass, onClose }: Props) {
  const quiz = quizForLesson(lessonId, lessonTitle);
  const q = useQuiz(quiz.questions);
  const { saveResult } = useQuizStore();
  const [saved, setSaved] = useState(false);

  const handleFinishStep = async () => {
    q.next();
    if (q.isLast && !saved) {
      setSaved(true);
      await saveResult({ lessonId, quizType: 'lesson', pillar, score: q.score, answers: q.answers });
    }
  };

  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200,
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-4)',
  };
  const panel: React.CSSProperties = {
    background: 'var(--surface-card)', border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-lg)', padding: 'var(--space-6)', width: '100%', maxWidth: 560,
    maxHeight: '90vh', overflowY: 'auto',
  };

  return (
    <div style={overlay} onClick={onClose}>
      <div style={panel} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-h3)' }}>Quiz — {lessonTitle}</h3>
          <button onClick={onClose} aria-label="Fechar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <Icon name="x" size={20} />
          </button>
        </div>

        {!q.finished ? (
          <>
            <ProgressBar value={((q.index + 1) / q.total) * 100} color="var(--accent-primary)" />
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', margin: '6px 0 var(--space-4)' }}>
              Pergunta {q.index + 1}/{q.total}
            </p>
            <h4 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-body-lg)', marginBottom: 'var(--space-4)' }}>
              {q.current.prompt}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {q.current.options.map((opt, i) => {
                const isCorrect = i === q.current.correctIndex;
                const isChosen = q.selected === i;
                let border = 'var(--border-default)';
                let bg = 'var(--bg-app)';
                if (q.revealed) {
                  if (isCorrect) { border = 'var(--color-success)'; bg = 'rgba(39,174,96,0.12)'; }
                  else if (isChosen) { border = 'var(--color-danger)'; bg = 'rgba(231,76,60,0.12)'; }
                }
                return (
                  <button key={i} disabled={q.revealed} onClick={() => q.select(i)}
                    style={{ textAlign: 'left', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)',
                      border: `1px solid ${border}`, background: bg, color: 'var(--text-primary)',
                      cursor: q.revealed ? 'default' : 'pointer', fontSize: 'var(--text-body)' }}>
                    <strong style={{ marginRight: 8 }}>{String.fromCharCode(65 + i)}</strong>{opt}
                  </button>
                );
              })}
            </div>
            {q.revealed && (
              <div style={{ marginTop: 'var(--space-4)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
                  <Icon name="bulb" size={14} color="var(--accent-secondary)" /> {q.current.explanation}
                </p>
                <Button variant="primary" onClick={handleFinishStep} style={{ marginTop: 'var(--space-4)' }}>
                  {q.isLast ? 'Ver resultado' : 'Próxima'} <Icon name="arrow-right" size={16} />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: 'var(--text-h2)', marginBottom: 'var(--space-4)' }}>
              Você fez {q.score}%
            </h4>
            <KnowledgeComparison before={priorScore} after={q.score} />
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
              <Button variant="success" onClick={() => onPass(q.score)}>
                <Icon name="check" size={16} /> Concluir aula
              </Button>
              <Button variant="ghost" onClick={onClose}>Fechar</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/LessonQuiz.tsx src/components/KnowledgeComparison.tsx
git commit -m "feat: add lesson quiz modal + knowledge comparison panel"
```

---

## Task 15: LessonDetail — gate completion behind the quiz

**Files:**
- Modify: `src/pages/LessonDetail.tsx`

> Read [src/pages/LessonDetail.tsx](../../../src/pages/LessonDetail.tsx) fully first. It currently has a "Marcar como Concluída" button that calls the progress hook directly. The change: clicking it opens `LessonQuiz`; the lesson is only marked complete from the quiz's `onPass`. AI lessons come from `allLessons`, not `lessons`.

- [ ] **Step 1: Switch the lesson lookup to `allLessons`**

Find the import of lesson data and the `lessons.find(...)` lookup. Change:
```ts
import { lessons } from '@/data/lessons';
// →
import { allLessons } from '@/data/lessons';
```
and the lookup `lessons.find((l) => l.id === lessonId)` → `allLessons.find((l) => l.id === lessonId)`.

- [ ] **Step 2: Add quiz state + prior-score derivation near the top of the component**

```tsx
import { useState } from 'react';
import LessonQuiz from '@/components/LessonQuiz';
import { useQuizStore } from '@/providers/QuizProvider';
import { scoreDiagnostic } from '@/lib/scoring';
import { diagnosticQuestions } from '@/data/quizzes';

// inside the component, after `lesson` is resolved:
const [quizOpen, setQuizOpen] = useState(false);
const { latestFor } = useQuizStore();

const priorScore: number | null = (() => {
  const prev = latestFor(lesson?.id ?? '');
  if (prev) return prev.score;                       // previous attempt at this lesson
  const diag = latestFor('diagnostic-ai');
  if (diag && lesson?.pillar) {
    return scoreDiagnostic(diagnosticQuestions, diag.answers).byPillar[lesson.pillar];
  }
  return null;
})();
```

- [ ] **Step 3: Replace the "Marcar como Concluída" handler**

Find the button that marks completion (it calls something like `markComplete(lesson.id)` / `toggleComplete`). Change its `onClick` to open the quiz instead:
```tsx
<Button variant="success" onClick={() => setQuizOpen(true)}>
  <Icon name="check" size={16} /> Marcar como Concluída
</Button>
```
(Keep showing a "Concluída" state when the lesson is already complete — preserve existing conditional.)

- [ ] **Step 4: Render the quiz modal at the end of the component's JSX**

```tsx
{quizOpen && lesson && (
  <LessonQuiz
    lessonId={lesson.id}
    lessonTitle={lesson.title}
    pillar={lesson.pillar}
    priorScore={priorScore}
    onPass={() => { markComplete(lesson.id); setQuizOpen(false); }}
    onClose={() => setQuizOpen(false)}
  />
)}
```
Replace `markComplete(lesson.id)` with the actual completion function name used in the file (e.g. `toggleLesson`, `completeLesson`). Ensure `Button` and `Icon` are imported from `@/components/ds/*` if not already.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages/LessonDetail.tsx
git commit -m "feat: gate lesson completion behind quiz + show knowledge comparison"
```

---

## Task 16: App.tsx routing + providers

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add new pages to the `Page` type and lazy imports**

In `src/App.tsx`:
```tsx
const AITrackPage      = lazy(() => import('@/pages/AITrackPage'));
const DiagnosticScreen = lazy(() => import('@/pages/DiagnosticScreen'));
const DiagnosticResult = lazy(() => import('@/pages/DiagnosticResult'));
```
```tsx
type Page =
  | 'home' | 'login' | 'register' | 'profile' | 'lesson' | 'tech-path'
  | 'ai-track' | 'ai-lesson' | 'diagnostic' | 'diagnostic-result';
```

- [ ] **Step 2: Add cases to `renderPage()`**

```tsx
case 'ai-track':         return <AITrackPage initialPillar={pageParams.pillar} onNavigate={navigate} />;
case 'ai-lesson':        return <LessonDetail lessonId={pageParams.id ?? ''} onNavigate={navigate} />;
case 'diagnostic':       return <DiagnosticScreen onNavigate={navigate} />;
case 'diagnostic-result':return <DiagnosticResult onNavigate={navigate} />;
```

> `ai-lesson` reuses `LessonDetail` — it already resolves from `allLessons` after Task 15, so AI lessons render with the same component.

- [ ] **Step 3: Wrap the app tree with `QuizProvider`**

Ensure the provider hierarchy includes `QuizProvider` inside the authenticated tree (alongside the existing Progress/Auth providers). If providers are composed in `src/main.tsx`, add it there instead. Example in `App.tsx` authenticated return:
```tsx
import { QuizProvider } from '@/providers/QuizProvider';

return (
  <QuizProvider>
    <Header onNavigate={navigate} />
    <main style={{ background: 'var(--bg-app)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <Suspense fallback={<PageLoader />}>{renderPage()}</Suspense>
    </main>
  </QuizProvider>
);
```
(Confirm `useAuth` is available above `QuizProvider`; `QuizProvider` calls `useAuth()`, so it must sit inside the existing Auth provider — verify against `main.tsx`.)

- [ ] **Step 4: Replace remaining `--netflix-*` literals in App.tsx**

Update the two loader components and `<main>` to use `--bg-app`, `--text-muted`, `--text-primary` (the back-compat aliases keep old ones working, but migrate these for cleanliness).

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/main.tsx
git commit -m "feat: wire AI track, diagnostic routes + QuizProvider"
```

---

## Task 17: PWA icons + offline indicator

**Files:**
- Create: `scripts/generate-pwa-icons.mjs`, `src/components/OfflineBanner.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create `scripts/generate-pwa-icons.mjs`**

```js
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, '../public/ds/logo-symbol.svg');
const OUT = resolve(__dirname, '../public');

const sizes = [192, 512];
for (const size of sizes) {
  await sharp(SRC, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 15, g: 15, b: 15, alpha: 1 } })
    .png()
    .toFile(resolve(OUT, `logo-symbol-${size}.png`));
  console.log(`✓ logo-symbol-${size}.png`);
}
```

- [ ] **Step 2: Generate the icons**

Run: `npm run gen:pwa-icons`
Expected: prints `✓ logo-symbol-192.png` and `✓ logo-symbol-512.png`; both files exist in `public/`.

Run: `ls public/logo-symbol-*.png`
Expected: two PNG files listed.

- [ ] **Step 3: Create `src/components/OfflineBanner.tsx`**

```tsx
import { useEffect, useState } from 'react';

/** Thin banner shown when the browser goes offline. Progress is saved locally. */
export default function OfflineBanner() {
  const [offline, setOffline] = useState(!navigator.onLine);
  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);
  if (!offline) return null;
  return (
    <div style={{
      background: 'var(--color-warning)', color: '#1A1A1A', textAlign: 'center',
      padding: '8px 16px', fontSize: 'var(--text-sm)', fontWeight: 600,
      position: 'sticky', top: 0, zIndex: 150,
    }}>
      Você está sem conexão — seu progresso local está salvo.
    </div>
  );
}
```

- [ ] **Step 4: Mount `OfflineBanner` in `App.tsx`**

Add `import OfflineBanner from '@/components/OfflineBanner';` and render `<OfflineBanner />` directly above `<Header />` in the authenticated tree.

- [ ] **Step 5: Verify build (service worker emitted)**

Run: `npm run build`
Expected: PASS; `dist/sw.js` and `dist/manifest.webmanifest` exist.

Run: `ls dist/sw.js dist/manifest.webmanifest`
Expected: both files listed.

- [ ] **Step 6: Commit**

```bash
git add scripts/generate-pwa-icons.mjs public/logo-symbol-192.png public/logo-symbol-512.png src/components/OfflineBanner.tsx src/App.tsx
git commit -m "feat: generate PWA icons + offline banner"
```

---

## Task 18: Responsiveness + final token migration pass

**Files:**
- Modify: `src/pages/Login.tsx`, `src/pages/Register.tsx`, `src/pages/Profile.tsx`, `src/pages/TechPath.tsx`, `src/components/MarkdownRenderer.tsx` (and any file still using `--netflix-*`/`--sketchain-*` literally)

- [ ] **Step 1: Find every remaining legacy token reference**

Run: `grep -rl "netflix-\|sketchain-" src --include=*.tsx --include=*.ts`
Expected: a list of files still using legacy var names directly (excluding the alias definitions in `globals.css`).

- [ ] **Step 2: Migrate each listed file's literals to DS aliases**

Apply the token map (from File Structure) in each file:
`--netflix-black`→`--bg-app`, `--netflix-dark-gray`→`--surface-card`, `--netflix-gray`→`--text-muted`, `--netflix-light-gray`→`--text-primary`, `--sketchain-terracota`→`--accent-primary`, `--sketchain-gold`→`--accent-secondary`. Replace each occurrence; the back-compat aliases mean nothing breaks if one is missed, but aim for zero legacy references in `src` outside `globals.css`.

- [ ] **Step 3: Verify the three breakpoints on key pages**

Run: `npm run dev`
Then in the browser DevTools device toolbar, check at widths **375px**, **768px**, **1280px**:
- Header collapses to hamburger < 640px; full nav ≥ 640px
- Home: track posters stack to 1 column < 640px, 2 columns ≥ 640px; pillars 2×2 < 1024px, 4×1 ≥ 1024px
- "Continuar assistindo" scrolls horizontally with snap on mobile
- Diagnostic + LessonQuiz modals are usable (scrollable) on 375px
Expected: no horizontal overflow; all CTAs reachable.

- [ ] **Step 4: Verify legacy references are gone**

Run: `grep -rn "netflix-\|sketchain-" src --include=*.tsx --include=*.ts | grep -v globals.css`
Expected: no output (empty) — or only intentional back-compat alias lines.

- [ ] **Step 5: Commit**

```bash
git add src
git commit -m "refactor: migrate remaining screens to DS tokens + verify responsiveness"
```

---

## Task 19: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Run the full test + build**

Run: `npm test && npm run build`
Expected: scoring tests PASS; tsc + vite build PASS; PWA assets emitted.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no new errors introduced (pre-existing warnings acceptable).

- [ ] **Step 3: Manual smoke test**

Run: `npm run dev` and verify the end-to-end flow:
1. Home renders hero + both track posters + pillars + knowledge rings
2. "Iniciar diagnóstico" → 12-question flow → result with ring + recommendation
3. "Iniciar trilha personalizada" lands on the recommended first lesson
4. Open an AI lesson → "Marcar como Concluída" → quiz modal → finish → "Concluir aula" marks it complete
5. Reopen the same lesson → KnowledgeComparison shows prior vs new score with delta
6. AI track page: pillar 2 locked until pillar 1 fully complete
7. Go offline (DevTools) → offline banner appears; progress persists on reload
Expected: all steps work; Supabase `quiz_results` rows appear (check via Supabase MCP `execute_sql: select count(*) from quiz_results`).

- [ ] **Step 4: Update napkin + memory**

Add to `.claude/napkin.md` under a "Domain Behavior Guardrails" entry: AI lessons live in `aiLessons.ts` and are exposed via `allLessons` (not `lessons`); `ai-lesson` route reuses `LessonDetail`; quiz gating happens in `LessonDetail` → `LessonQuiz.onPass`. Update memory `project-overview.md` to note the dual-track model + quiz system.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final verification, napkin + memory updates for dual-track platform"
```

---

## Self-Review

**Spec coverage:**
- §2 DS refactor → Tasks 1–3, 18 ✓
- §2.3 Logo → Task 2 (Logo) + Task 8 (Header) ✓
- §2.4 Icons → Task 2 (Icon) + usage throughout ✓
- §3 Navigation / new pages → Task 16 ✓
- §3.2 Header → Task 8 ✓
- §4 Netflix Home (5 sections) → Task 11 ✓
- §5 AI track (types, data, page) → Tasks 4, 12 ✓
- §6.1 Diagnostic → Tasks 6, 7, 13 ✓
- §6.2 Lesson quiz + comparison → Tasks 6, 7, 14, 15 ✓
- §6.3 Nivelamento (revisit shows prior score) → Task 15 `priorScore` + Task 14 comparison ✓
- §6.4 DB (quiz_results + track column) → Task 5 ✓
- §7 PWA → Tasks 0, 17 ✓
- §8 Responsiveness → Tasks 1 (utils), 8, 11, 18 ✓
- §9 New components → all created across Tasks 2–3, 10, 12–14 ✓
- §10 Out of scope (full lesson copy) → respected (stub content) ✓

**Type consistency:** `scoreQuiz`, `scoreDiagnostic`, `recommendations`, `deltaLabel` signatures are defined in Task 6 and used identically in Tasks 7, 11, 13, 14. `QuizRecord`/`saveResult`/`latestFor` defined in Task 7 and consumed consistently in Tasks 11–15. `PILLARS`/`pillarMeta`/`TRACKS` defined in Task 4, used in 11–13. `completionByTrack` added in Task 8, used in Task 11.

**Known adaptation points (flagged inline for the implementer):** exact names in `useProgress`/`ProgressProvider` (`completedLessons`, completion-mark function) and the provider composition site (`App.tsx` vs `main.tsx`) must be confirmed against the actual files — each such step says so explicitly. The `useCallback` import casing note in Task 7 Step 1 must be honored.

**Placeholder scan:** No TBD/TODO. Every code step contains complete, runnable code. Stub lesson *content* is an intentional, spec-sanctioned product decision (not a plan placeholder) and is fully generated by the `buildPillar` helper.

---
name: stack-learning-design
description: Use this skill to generate well-branded interfaces and assets for Stack Learning (Sketchain Academy), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key files:
- `README.md` — full brand guide: product context, content/voice (pt-BR), visual foundations, iconography, manifest.
- `styles.css` — global entry point; `@import`s all design tokens (link this one file).
- `tokens/` — color, typography, spacing/radius/shadow/motion, animations, fonts.
- `assets/` — `logo.svg`, `logo-symbol.svg`, `favicon.svg`, `hero.png`, `icons/sprite.svg` (line-icon library; replaces emoji).
- `components/core/` — React primitives (Button, Badge, Card, Input, Tabs, ProgressBar, Icon) with `.d.ts` contracts.
- `ui_kits/sketchain-academy/` — interactive recreation of the learning app (Home / Lesson / Login).

Brand essentials: Netflix-dark surfaces (`#0F0F0F` bg, `#1A1A1A` cards, `#2A2A2A` borders), terracota `#D4A574` (primary) + gold `#F4A261` (secondary), Raleway UI face + Fira Code mono, 8px card radius, 300ms ease entrances, `scale(1.02)` hover lift, custom line icons (no emoji), and pt-BR copy in an encouraging instructor voice.

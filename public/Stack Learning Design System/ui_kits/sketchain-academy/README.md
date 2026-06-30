# Sketchain Academy — UI Kit

Interactive recreation of the **Stack Learning** product (in-app brand *Sketchain Academy*), a Netflix-dark learning platform. It composes the design system's core components (`Button`, `Card`, `Badge`, `Input`, `Tabs`, `ProgressBar`, `Icon`).

## Screens / flow
- **Login** (`LoginScreen.jsx`) — centered auth card with terracota border; "Entrar" routes into the app.
- **Home** (`HomeScreen.jsx`) — gradient hero, the "Trilha Sequencial" card carousel (with complete / available / locked states using custom icons), and the "Por Tecnologia" grid with per-track accent left-borders + progress.
- **Lesson detail** (`LessonScreen.jsx`) — breadcrumb, badges, Conteúdo / Mini-Lab / Recursos tabs, macOS-style code blocks, and a sticky sidebar (track progress, *Marcar como Concluída* / *Salvar* actions, next-lesson). State is live: mark complete unlocks "Ir para próxima".

`index.html` orchestrates navigation (default screen: Home; the avatar button opens Login; cards open the lesson). All copy is pt-BR, matching the product.

## Notes
- Loads the design-system bundle from `../../_ds_bundle.js` and tokens from `../../styles.css`.
- The Monaco editor is represented as a static styled code surface (not a live editor).
- `data.js` holds sample curriculum data mirroring `src/data/lessons.ts` in the source repo.

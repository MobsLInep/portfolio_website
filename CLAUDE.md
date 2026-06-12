# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint over the repo

There is no test runner configured in this project.

## Architecture

Single-page personal portfolio built with **React 18 + TypeScript + Vite**, styled with **Tailwind CSS** and animated with **Framer Motion**. It renders one scrolling page; there is no router.

- `src/main.tsx` mounts `<App>` into `#root`.
- `src/App.tsx` is the composition root. It shows a 2-second fake loading screen, then renders a fixed full-screen `BackgroundCanvas` behind the stacked sections: `Header → Hero → About → Projects → Skills → Contact → Footer`. Navigation is anchor-based — `Header` links point to section `id`s (`#home`, `#about`, `#projects`, `#skills`, `#contact`).

### 3D / WebGL (`src/components/three/`)
Two distinct Three.js integration styles coexist — match whichever a file already uses:
- `BackgroundCanvas.tsx` uses the **raw Three.js imperative API** inside a `useEffect` (manual scene/renderer/animation loop, custom GLSL CRT-glitch shader on a holographic octahedron, particle field, and a disintegrating granular sphere). It manually disposes all geometries/materials/renderer on cleanup — preserve this disposal logic when editing.
- `Avatar.tsx` and `SkillCube.tsx` use **`@react-three/fiber` + `@react-three/drei`** declarative components (`<Canvas>`, `useFrame`, `useTexture`, `OrbitControls`, `Html`).

### Styling
- Tailwind is the primary styling mechanism. `tailwind.config.js` defines the design system: a dark cyberpunk/terminal theme (`background`, `primary` cyan, `accent` magenta, `success`/`terminal` greens) and `float` animations. Use these theme tokens rather than hardcoding hex values.
- `src/index.css` defines reusable component classes inside `@layer components` (`.section-container`, `.section-heading`, `.project-card` flip-card styles, `.skill-item`, `.neon-border`/`.accent-border`/`.success-border` glow effects). Reuse these classes for layout/section consistency.
- Font is JetBrains Mono (loaded in `index.html`, set as `font-mono` default on `body`).

### Patterns to follow
- Scroll-triggered section reveals use `react-intersection-observer`'s `useInView` driving Framer Motion variants (`hidden`/`visible`/`exit`). See `Contact.tsx` and `Projects.tsx` for the canonical `containerVariants` + `itemVariants` stagger pattern.
- Content (projects, skills, social links, nav) is hardcoded as in-component arrays/objects, not loaded from data files or a CMS.

### Contact form
`Contact.tsx` submits via `fetch` POST to a **Formspree** endpoint (`https://formspree.io/f/...`). Note: `@emailjs/browser` is listed as a dependency but the form currently uses Formspree, not EmailJS.

## TypeScript / lint notes
- `tsconfig.app.json` enables `strict`, `noUnusedLocals`, and `noUnusedParameters` — unused imports/vars will fail typechecking.
- ESLint flat config (`eslint.config.js`) includes `react-hooks` and `react-refresh` rules.

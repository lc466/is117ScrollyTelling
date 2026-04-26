Project: Building Human-Centered AI Products — Scrollytelling

Purpose
-------
Document the design and development process for the one-page scrollytelling submission. This file captures goals, interaction design, technical notes, accessibility considerations, and next steps.

Goals
-----
- Communicate concise, practical guidance on designing human-centered AI features.
- Implement a single, polished scroll-linked interaction to illustrate a design tradeoff.
- Keep scope small and deliverable for a class assignment (one page, no backend).

Target audience
---------------
Students and instructors in design/CS courses, product designers, and curious classmates.

Content outline
---------------
- Hero: tagline + hero image (placed in `public/images` by author)
- Problem: a short scenario motivating human-centered AI
- Principles: 4–6 bite-sized principles (trust, control, transparency, evaluation)
- Micro case study: a simple product example (e.g., suggestion UI)
- Interactive demo: scroll-linked micro-interaction illustrating a tradeoff
- Takeaways & Resources
- About & Process (this file)

Interaction spec
----------------
- Primary effect: Sticky narrative panel on the left, visual area on the right.
- Scroll triggers: Use the IntersectionObserver API to detect which section is active and update the visual area accordingly.
- Animation: Subtle fades/slides and a smooth transform for visuals; prefer CSS transitions over heavy JS.
- Mobile fallback: Sticky layout collapses to stacked content; reveal animations use simple fades.

Visual assets
-------------
- Place hero and illustration images in `public/images` (you will add these later).
- Prefer simple SVGs or lightweight PNGs. Include descriptive `alt` text in the markup.

Implementation notes
--------------------
- Stack: Next.js + React. Implement page as a single route (`pages/index.js` or `app/page.js` depending on template).
- Components:
  - `StickyNarrative` — left column with headings and paragraph blocks, manages active index.
  - `VisualArea` — right column that responds to the active index and renders illustrations/diagrams.
  - `ScrollSection` — wrapper for each narrative block that registers with IntersectionObserver.
- Use React refs + a small hook (`useIntersection`) that exposes the current visible index.
- Keep styles scoped and simple: CSS modules or inline styles; Tailwind optional if present in template.
- No backend; interactions are client-side only — ensure `useEffect` guards against SSR (check for `window`).

Accessibility
-------------
- Use semantic HTML (`<main>`, `<section>`, heading levels).
- Provide `alt` for images and text alternatives for interactive visuals.
- Ensure color contrast and readable font sizes.
- Ensure the page is keyboard-navigable; reveal content should not trap focus.

Build & deploy
--------------
- Development: `npm install` then `npm run dev`.
- Production build: `npm run build` (and `npm run export` if using static export for GitHub Pages).

Success checks
--------------
- All key sections present and readable.
- The scroll-linked effect updates the visual area reliably on desktop.
- The layout degrades gracefully on small screens.
- `PROCESS.md` and `README.md` are in the repo; `public/images` contains at least one image (to be added).

Notes & next steps
------------------
- You will add images to `public/images` when ready; include filenames and alt text in your commit message.
- After images are added I can implement the minimal scroll-linked components, wire up the IntersectionObserver, and populate the content sections.

Technical implementation plan (Vite + React + TypeScript)
-------------------------------------------------------

1) Recommended folder structure

- `public/`
  - `images/` — place hero and other images here (referenced at `/images/...`).
- `src/`
  - `assets/` — optional local SVGs or small static files
  - `components/` — `StickyNarrative.tsx`, `VisualArea.tsx`, `ScrollSection.tsx`, `hooks/useIntersection.ts`
  - `pages/` or `App.tsx` — single-page entry (depending on routing choice)
  - `styles/` — global and component CSS files
  - `main.tsx` — Vite entry mounting the app
- `index.html` — Vite HTML template
- `vite.config.ts` — Vite configuration (set `base` for GitHub Pages)
- `tsconfig.json`, `package.json`, `README.md`, `PROCESS.md`

2) Main files to create

- `index.html`, `src/main.tsx`, `src/App.tsx` (single-page layout)
- `src/components/StickyNarrative.tsx`
- `src/components/VisualArea.tsx`
- `src/components/ScrollSection.tsx`
- `src/hooks/useIntersection.ts` (small hook wrapping IntersectionObserver)
- `src/styles/global.css` and component CSS files
- `vite.config.ts` (set `base` to your repo name for GitHub Pages)
- `package.json` scripts for `dev`, `build`, `preview`, and optional `deploy` workflow

3) How `public/images/` will be referenced

- In Vite apps, files in `public/` are served at the site root. Reference them with absolute paths beginning with `/`, for example:

  - Hero image: `/images/hero.png`
  - Illustration: `/images/principle-1.svg`

- In JSX: `<img src="/images/hero.png" alt="..." />` or use CSS `background-image: url('/images/bg.png')`.
- This keeps image paths simple and decoupled from build tooling.

4) GitHub Pages deployment strategy

- Recommended: use GitHub Actions to build and publish the static `dist/` (Vite output) to the `gh-pages` branch. This avoids adding runtime dependencies to the project and is reproducible.
- Key points:
  - Set `base` in `vite.config.ts` to `/<repo-name>/` so relative paths work on GitHub Pages.
  - Create a GitHub Actions workflow (`.github/workflows/deploy.yml`) that runs `npm ci`, `npm run build`, then `peaceiris/actions-gh-pages@v3` (or another deploy action) to push `dist/` to `gh-pages`.
  - Alternatively, use the `gh-pages` npm package for a local `npm run deploy` script if you prefer a simpler, local-only approach (this adds a small dev dependency).

5) Development commands

- Install dependencies:

  ```bash
  npm install
  ```

- Start dev server (Vite):

  ```bash
  npm run dev
  ```

6) Build commands

- Build production assets:

  ```bash
  npm run build
  ```

- Preview the production build locally (optional):

  ```bash
  npm run preview
  ```

7) Final submission checklist

- Single-page scrollytelling implemented and reachable at site root.
- Images placed in `public/images` and referenced with `/images/...` paths.
- At least one sticky scroll section implemented (left narrative sticky, right visual area).
- Responsive layout tested on desktop and mobile (stacked mobile fallback).
- Minimal dependencies: only Vite, React, TypeScript, and small deploy action or `gh-pages` package.
- `README.md` contains run and build instructions; `PROCESS.md` documents the process (this file).
- GitHub Actions (or other deploy method) configured to publish the built site to GitHub Pages.

Notes: avoid heavy animation libraries; prefer CSS transitions and a small `useIntersection` hook. Keep the interaction simple so it is robust and accessible.

Chat saved here on 2026-04-26: technical implementation plan created per request.

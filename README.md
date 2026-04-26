# Building Human-Centered AI Products — Scrollytelling

A single-page scrollytelling portfolio on designing human-centered AI features. This project demonstrates simple, accessible scroll-linked interactions and documents the design and implementation process.

## My submission

- **Live site:** https://lc466.github.io/is117ScrollyTelling/
- **Author:** Liyan Chen
- **Topic:** Building Human-Centered AI Products

## Short description

This is a one-page scrollytelling site that walks readers through why generic AI tools can fall short, a human-centered design process, a compact prototype highlight, and practical takeaways. The page includes a sticky visual panel and scroll-triggered reveals to illustrate tradeoffs and design decisions.

## How to run locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
```

This produces a production-ready `dist/` folder.

## Deployment note

This project is configured for GitHub Pages using a GitHub Actions workflow (`.github/workflows/deploy.yml`). Before deploying:

- If your repo is served from a subpath (e.g., `https://<user>.github.io/<repo>/`), set `base` in `vite.config.ts` appropriately (for example `base: '/is117Scrollytelling/'`).
- The workflow builds the site and publishes the `dist/` folder to GitHub Pages.

## Scrollytelling interaction (short explanation)

The page uses a two-column layout on desktop: a sticky left column (narrative) and a right column (visual panel). As you scroll, each narrative section enters view and triggers a reveal animation using the IntersectionObserver API. The visual panel updates to match the active section, illustrating the idea or tradeoff being discussed. On smaller screens the layout stacks vertically and the interaction degrades gracefully.

## Images

All images are stored in `public/images/`. The app looks for an optional `/images/gallery.json` file (an array of filenames) to populate the visual panel; if not present it falls back to a placeholder image. Add your images to `public/images/` and optionally update or create `gallery.json` with the filenames.

## Process and AI-assisted development

The `PROCESS.md` file documents the design and development process, including notes about AI assistance, decision rationale, and next steps.

---

If you want, I can now populate the copy for each section or help add your images to `public/images/` and tune the visuals.

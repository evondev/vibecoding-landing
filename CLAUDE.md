# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at http://localhost:3000
npm run build    # production build
npm run lint     # run ESLint
```

No test runner is configured.

## Stack

- **Next.js 16.2.4** (App Router) with **React 19**
- **TypeScript 5**
- **Tailwind CSS v4** — imported via `@import "tailwindcss"` in `globals.css`, configured through `@theme inline` blocks (no `tailwind.config.*` file)
- **Geist** font family loaded via `next/font/google`

## Architecture

This is a Next.js App Router project. All routes live under `app/`:

- `app/layout.tsx` — root layout: sets up Geist fonts as CSS variables (`--font-geist-sans`, `--font-geist-mono`) and applies them via `@theme inline` in `globals.css`
- `app/globals.css` — global styles; Tailwind v4 is configured here with CSS custom properties, not a JS config file
- `app/page.tsx` — home route (`/`)

## Key differences in this Next.js version

Per `AGENTS.md`: this version has breaking changes. **Read `node_modules/next/dist/docs/` before writing any code.** The docs are organized as:

- `01-app/` — App Router guides and API reference
- `02-pages/` — Pages Router
- `03-architecture/` — internals

Notable hint from the docs index: for slow client-side navigations, `Suspense` alone is not enough — you must also export `unstable_instant` from the route. Read `docs/01-app/02-guides/instant-navigation.mdx` before making changes to navigation behavior.

## Tailwind v4 usage

Tailwind v4 uses a CSS-first config approach — no `tailwind.config.js`. Customize the theme with `@theme` blocks in CSS files. The `@tailwindcss/postcss` plugin handles processing.

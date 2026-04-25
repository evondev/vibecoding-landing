# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static Vietnamese-language landing page for **VibeCoding** — an AI-assisted coding course. No build tools, bundlers, or package managers. Open `index.html` directly in a browser or serve with any static file server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

## File Structure

- [index.html](index.html) — Single-page HTML with all sections: nav, hero, features, pain points, solution, benefits, curriculum, testimonials, pricing, FAQ, footer
- [style.css](style.css) — All styles; uses CSS custom properties defined in `:root` for the color palette
- [script.js](script.js) — Three behaviors: countdown timer (persisted via `localStorage`), FAQ accordion toggle, scroll-reveal via `IntersectionObserver`, and active nav link on scroll
- [images/hero.png](images/hero.png) — Hero section image

## Design System

Colors are defined as CSS variables in `:root` ([style.css:3-17](style.css#L3-L17)). The palette: `--purple` (#7c3aed), `--purple-light` (#a855f7), `--pink` (#ec4899), `--cyan` (#06b6d4), `--green` (#10b981), `--bg-primary` (#080810), `--bg-card` (#0f0f1a).

Fonts: **Inter** (body) and **Space Grotesk** (headings/logo/prices) — both loaded from Google Fonts.

Responsive breakpoints: `max-width: 1200px` (hero stacks) and `max-width: 900px` (all grids collapse to single column, nav links hidden).

## Key Behaviors

**Countdown timer** ([script.js:2-30](script.js#L2-L30)): Deadline stored in `localStorage` as `vc_deadline`. First visit sets it to ~24h from now; subsequent visits continue from the same deadline. Clears to `00:00:00` when expired.

**FAQ accordion** ([script.js:33-38](script.js#L33-L38)): Only one item open at a time. Toggled via `toggleFaq()` called inline from HTML. Open state is `.faq-item.open`; the answer height transition uses `max-height` in CSS.

**Scroll-reveal** ([script.js:41-55](script.js#L41-L55)): Elements matching `.card, .benefit-card, .week-card, .testi-card, .pain-item, .step` start at `opacity:0; translateY(24px)` and animate in when intersecting. New components that should animate on scroll must be added to this selector list.

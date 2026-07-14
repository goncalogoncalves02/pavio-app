# Pavio Luxo Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the "Pavio Luxo" redesign (imported from claude.ai/design project "Design profissional para velas") on the existing Next.js landing page, keeping the project's structure and conventions.

**Architecture:** The site keeps its existing pattern: server components in `components/` styled by semantic CSS classes in `app/globals.css` (Tailwind v4 is imported as the base layer only — the project does NOT use utility classes in JSX; keep it that way). Copy lives in `content/site.ts` typed by `types/content.ts`; env-driven config in `config/site.ts`. The redesign adds Google fonts via `next/font/google`, a new color palette, three new sections (Selos BIO, História, Testemunhos), an animated flame logo, and scroll-reveal animations via one small client component.

**Tech Stack:** Next.js 16.2.10 (App Router), React 19, TypeScript, Tailwind v4 (base import only), vitest.

## Global Constraints

- **Read the bundled Next.js docs before using any Next.js API you touch** — this Next.js version may differ from your training data (see `AGENTS.md`). For fonts read `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` and `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md`.
- No new dependencies. `package.json` must not change.
- All user-facing copy is pt-PT and must be copied **verbatim** from the code blocks in this plan (they were extracted from the design file).
- All components stay React Server Components **except** `components/scroll-reveal.tsx` which is `"use client"`.
- Styling goes into `app/globals.css` as semantic classes (project convention). Do not add Tailwind utility classes to JSX.
- Animations must respect `prefers-reduced-motion` (the existing media query at the bottom of `globals.css` handles CSS animations; the ScrollReveal component checks it in JS).
- Commit messages: conventional commits in English (`feat: …`, `style: …`, `test: …`), matching existing history.
- Verification commands (run from `/home/goncalo/projects/pavio/pavio-app`): `npm test`, `npm run lint`, `npm run build`.
- Work on branch `feature/pavio-luxo-redesign` (already created).

---

### Task 1: Fonts + design tokens + full stylesheet

**Files:**
- Modify: `app/layout.tsx` (add next/font/google fonts, set variables on `<html>`)
- Modify: `app/globals.css` (replace entire file with the redesigned stylesheet)

**Interfaces:**
- Produces: CSS custom properties (`--paper`, `--ink`, `--terracotta`, `--gold`, `--gold-soft`, `--gold-muted`, `--forest`, `--forest-deep`, `--paper-warm`, `--line`, `--line-light`, `--serif`, `--sans`) and all semantic classes used by Tasks 3–8: `.accent`, `.eyebrow`, `.eyebrow--plain`, `.nav-cta`, `.brand-halo`, `.seals-section`, `.seal-grid`, `.seal`, `.seal-label`, `.seal-title`, `.seal-note`, `.story-section`, `.story-artwork`, `.story-image-frame`, `.story-copy`, `.story-signature`, `.testimonials-section`, `.testimonial-grid`, `.testimonial`, `.testimonial-mark`, `.button--gold`, `.text-link--light`, `.contact-flame`, `.contact-flame-halo`, `.contact-flame-fire`.

- [ ] **Step 1: Read the bundled font docs**

Read `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` and the `weight`/`style`/`variable` sections of `node_modules/next/dist/docs/01-app/03-api-reference/02-components/font.md`. Confirm the `Cormorant_Garamond` / `Karla` import style below matches the documented API; if the docs differ, follow the docs.

- [ ] **Step 2: Update `app/layout.tsx`**

Only the imports, the two font constants, and the `<html>` element change; metadata stays exactly as-is:

```tsx
import type { Metadata } from "next";
import { Cormorant_Garamond, Karla } from "next/font/google";

import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";

import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Karla({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
```

(keep the existing `description` const and `metadata` export unchanged)

```tsx
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Replace `app/globals.css` entirely with:**

```css
@import "tailwindcss";

:root {
  --paper: #f4eee1;
  --paper-deep: #e7dcc8;
  --paper-warm: #eaddc6;
  --ink: #1f2a22;
  --ink-soft: #5c675c;
  --forest: #1c2721;
  --forest-deep: #22332a;
  --terracotta: #9a4a2c;
  --terracotta-dark: #7c3a22;
  --gold: #a98a5b;
  --gold-soft: #c9a97a;
  --gold-muted: #c2a678;
  --line: rgba(31, 42, 34, 0.14);
  --line-soft: rgba(31, 42, 34, 0.12);
  --line-strong: rgba(31, 42, 34, 0.35);
  --line-light: rgba(244, 238, 225, 0.18);
  --serif: var(--font-serif), Georgia, "Times New Roman", serif;
  --sans: var(--font-sans), Arial, Helvetica, sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 2rem; }
body {
  margin: 0;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 16px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
body::before {
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.028'/%3E%3C/svg%3E");
  content: "";
  pointer-events: none;
}
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; height: auto; }
button, a, summary { -webkit-tap-highlight-color: transparent; }
:focus-visible { outline: 3px solid var(--terracotta); outline-offset: 4px; }

@keyframes flicker {
  0%, 100% { transform: rotate(6deg) scaleY(1); }
  25% { transform: rotate(10deg) scaleY(1.08); }
  50% { transform: rotate(4deg) scaleY(.94); }
  75% { transform: rotate(9deg) scaleY(1.05); }
}
@keyframes halo {
  0%, 100% { opacity: .5; transform: scale(1); }
  50% { opacity: .85; transform: scale(1.12); }
}

.skip-link {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 100;
  padding: .75rem 1rem;
  background: var(--ink);
  color: white;
  transform: translateY(-160%);
}
.skip-link:focus { transform: translateY(0); }

.site-header {
  width: min(1380px, calc(100% - 96px));
  min-height: 112px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  border-bottom: 1px solid var(--line);
}
.brand { display: inline-flex; align-items: center; gap: .9rem; flex: none; }
.brand > span:last-child { display: flex; flex-direction: column; line-height: 1; }
.brand strong { font-family: var(--serif); font-size: 1.7rem; font-weight: 500; letter-spacing: .02em; }
.brand small { margin-top: .4rem; color: var(--gold); font-size: .58rem; letter-spacing: .3em; text-transform: uppercase; }
.brand-mark { position: relative; width: 30px; height: 42px; border: 1px solid var(--ink); border-radius: 50% 50% 46% 46%; flex: none; }
.brand-halo { position: absolute; top: 6px; left: 8px; width: 12px; height: 16px; background: radial-gradient(circle at 50% 80%, rgba(169, 138, 91, .55), transparent 70%); border-radius: 50%; animation: halo 3.2s ease-in-out infinite; }
.brand-flame { position: absolute; top: 7px; left: 11px; width: 8px; height: 14px; background: var(--terracotta); border-radius: 70% 30% 60% 40%; transform-origin: 50% 100%; animation: flicker 2.8s ease-in-out infinite; }
.site-nav { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 2rem; margin: 0; padding: 0; list-style: none; }
.site-nav a { position: relative; padding: .6rem 0; font-size: .72rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
.site-nav a:not(.nav-cta)::after { position: absolute; right: 0; bottom: .35rem; left: 0; height: 1px; background: var(--terracotta); content: ""; transform: scaleX(0); transform-origin: right; transition: transform .25s ease; }
.site-nav a:not(.nav-cta):hover::after, .site-nav a:not(.nav-cta):focus-visible::after { transform: scaleX(1); transform-origin: left; }
.site-nav .nav-cta { padding: .6rem 1.4rem; border: 1px solid var(--line-strong); transition: border-color .25s ease; }
.site-nav .nav-cta:hover, .site-nav .nav-cta:focus-visible { border-color: var(--ink); color: var(--ink); }

.hero {
  width: min(1380px, calc(100% - 96px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(380px, .78fr);
  align-items: center;
  gap: clamp(3rem, 7vw, 7.5rem);
  padding: clamp(4rem, 8vw, 8rem) 0 clamp(4.5rem, 9vw, 8.5rem);
}
.hero-copy { max-width: 700px; }
.eyebrow { margin: 0 0 1.6rem; display: flex; align-items: center; gap: .9rem; color: var(--gold); font-size: .68rem; font-weight: 700; letter-spacing: .28em; line-height: 1.4; text-transform: uppercase; }
.eyebrow::before { width: 36px; height: 1px; background: currentColor; content: ""; flex: none; }
.eyebrow--plain { display: block; }
.eyebrow--plain::before { display: none; }
h1, h2, h3, p { margin-top: 0; }
h1, h2 { font-family: var(--serif); font-weight: 500; letter-spacing: -.02em; }
h1 { max-width: 700px; margin-bottom: 1.8rem; font-size: clamp(3.4rem, 6.4vw, 6.6rem); line-height: .98; }
h2 { margin-bottom: 1.5rem; font-size: clamp(2.6rem, 4.8vw, 4.5rem); line-height: 1.02; }
.accent { font-style: italic; font-weight: 400; color: var(--terracotta); }
.hero-intro { max-width: 600px; margin-bottom: 2.4rem; color: var(--ink-soft); font-size: clamp(1.05rem, 1.4vw, 1.22rem); line-height: 1.8; }
.contact-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 1.4rem; }
.button { min-height: 56px; display: inline-flex; align-items: center; justify-content: center; gap: .75rem; padding: 1rem 2.1rem; border: 1px solid transparent; font-size: .74rem; font-weight: 700; letter-spacing: .16em; line-height: 1.2; text-transform: uppercase; transition: background .25s ease, transform .25s ease; }
.button:hover { transform: translateY(-2px); }
.button--primary { background: var(--terracotta); border-color: var(--terracotta); color: #f6f0e3; }
.button--primary:hover { background: var(--terracotta-dark); border-color: var(--terracotta-dark); }
.button--gold { background: var(--gold-soft); border-color: var(--gold-soft); color: var(--forest); }
.button--gold:hover { background: #d8bc8f; border-color: #d8bc8f; }
.text-link { display: inline-flex; align-items: center; gap: .5rem; padding: .5rem 0; border-bottom: 1px solid var(--ink); color: var(--ink); font-size: .76rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; transition: color .25s ease, border-color .25s ease; }
.text-link:hover { color: var(--terracotta); border-color: var(--terracotta); }
.text-link--light { border-color: rgba(244, 238, 225, .6); color: var(--paper); }
.text-link--light:hover { color: var(--gold-soft); border-color: var(--gold-soft); }
.hero-note { margin: 2rem 0 0; color: var(--ink-soft); font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; }
.hero-artwork { position: relative; }
.hero-image-frame { position: relative; overflow: hidden; border-radius: 280px 280px 12px 12px; background: var(--paper-deep); box-shadow: 0 44px 110px rgba(64, 45, 31, .22); }
.hero-image-frame::after { position: absolute; inset: 14px; border: 1px solid rgba(246, 240, 227, .55); border-radius: 266px 266px 6px 6px; content: ""; pointer-events: none; }
.artwork-caption { display: flex; justify-content: space-between; gap: 1.5rem; margin: 1.2rem .2rem 0; color: var(--ink-soft); font-family: var(--serif); font-size: 1.05rem; font-style: italic; }
.artwork-caption span { font-family: var(--sans); font-size: .66rem; font-style: normal; letter-spacing: .2em; color: var(--gold); }

.section { width: min(1220px, calc(100% - 96px)); margin: 0 auto; padding: clamp(5.5rem, 10vw, 9.5rem) 0; }
.section-heading { max-width: 780px; margin-bottom: 4.5rem; }
.section-heading > p:last-child { max-width: 640px; color: var(--ink-soft); font-size: 1.05rem; }
.section-heading--split { max-width: none; display: grid; grid-template-columns: 1.2fr .8fr; align-items: end; gap: 5rem; }
.section-heading--split > p { margin-bottom: .5rem; }

.seals-section { width: min(1380px, calc(100% - 96px)); margin: 0 auto; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.seal-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.seal { display: flex; flex-direction: column; gap: .7rem; padding: 2.6rem clamp(1.2rem, 2.5vw, 2.5rem); border-right: 1px solid var(--line-soft); }
.seal:first-child { padding-left: 0; }
.seal:last-child { padding-right: 0; border-right: 0; }
.seal-label { color: var(--gold); font-size: .62rem; font-weight: 700; letter-spacing: .26em; text-transform: uppercase; }
.seal-title { font-family: var(--serif); font-size: 1.55rem; line-height: 1.15; }
.seal-note { color: var(--ink-soft); font-size: .85rem; }

.materials { width: 100%; max-width: none; padding-right: max(48px, calc((100% - 1220px) / 2)); padding-left: max(48px, calc((100% - 1220px) / 2)); background: var(--forest); color: var(--paper); }
.materials .eyebrow { color: var(--gold-muted); }
.materials .accent { color: var(--gold-muted); }
.materials .section-heading > p:last-child { color: #b7c0b4; }
.benefit-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line-light); border-bottom: 1px solid var(--line-light); }
.benefit-card { min-height: 300px; padding: 2.4rem clamp(1.5rem, 3vw, 3rem); border-right: 1px solid var(--line-light); }
.benefit-card:first-child { padding-left: 0; }
.benefit-card:last-child { padding-right: 0; border-right: 0; }
.benefit-topline { display: flex; justify-content: space-between; margin-bottom: 3.6rem; color: var(--gold-muted); font-size: .64rem; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; }
.benefit-card h3 { margin-bottom: 1.2rem; font-family: var(--serif); font-size: 1.9rem; font-weight: 500; line-height: 1.15; }
.benefit-card p { margin-bottom: 0; color: #b7c0b4; }

.gallery-section { width: min(1380px, calc(100% - 96px)); }
.gallery-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.gallery-card { display: flex; flex-direction: column; gap: 1.3rem; }
.gallery-card:nth-child(even) { margin-top: 4rem; }
.gallery-image { position: relative; overflow: hidden; background: var(--paper-deep); }
.gallery-image img { width: 100%; transition: transform .5s ease; }
.gallery-card:hover .gallery-image img { transform: scale(1.025); }
.gallery-number { position: absolute; top: .8rem; right: .8rem; width: 36px; height: 36px; display: grid; place-items: center; border-radius: 50%; background: rgba(244, 238, 225, .9); font-size: .62rem; letter-spacing: .1em; }
.gallery-copy { display: flex; flex-direction: column; gap: .6rem; padding: 0 .2rem; }
.gallery-copy h3 { margin-bottom: 0; font-family: var(--serif); font-size: 1.75rem; font-weight: 500; }
.gallery-copy p { min-height: 4.4rem; margin-bottom: 0; color: var(--ink-soft); font-size: .9rem; }
.gallery-copy .text-link { align-self: flex-start; align-items: flex-start; padding: .4rem 0; font-size: .68rem; letter-spacing: .08em; line-height: 1.5; }

.story-section { width: min(1220px, calc(100% - 96px)); margin: 0 auto; border-top: 1px solid var(--line); padding: clamp(5.5rem, 10vw, 9.5rem) 0; display: grid; grid-template-columns: .72fr 1fr; gap: clamp(3rem, 7vw, 7rem); align-items: center; }
.story-image-frame { position: relative; overflow: hidden; border-radius: 240px 240px 10px 10px; background: var(--paper-deep); box-shadow: 0 32px 80px rgba(64, 45, 31, .18); }
.story-image-frame::after { position: absolute; inset: 12px; border: 1px solid rgba(246, 240, 227, .55); border-radius: 228px 228px 5px 5px; content: ""; pointer-events: none; }
.story-copy p:not(.eyebrow):not(.story-signature) { max-width: 560px; margin-bottom: 1.4rem; color: var(--ink-soft); font-size: 1.05rem; line-height: 1.8; }
.story-signature { margin: 2.2rem 0 0; font-family: var(--serif); font-size: 1.3rem; font-style: italic; color: var(--ink); }

.process-section { border-top: 1px solid var(--line); }
.process-list { margin: 0; padding: 0; border-top: 1px solid var(--line); list-style: none; }
.process-list li { display: grid; grid-template-columns: 120px 1fr; gap: 2rem; padding: 2.6rem 0; border-bottom: 1px solid var(--line); }
.process-number { font-family: var(--serif); font-size: 2.6rem; font-weight: 400; color: var(--gold-soft); line-height: 1; }
.process-list h3 { margin-bottom: .6rem; font-family: var(--serif); font-size: 1.95rem; font-weight: 500; }
.process-list p { max-width: 680px; margin-bottom: 0; color: var(--ink-soft); }
.shipping-note { margin-top: 3rem; display: grid; grid-template-columns: 72px 1fr; gap: 1.6rem; align-items: center; padding: 2.2rem; background: var(--paper-warm); }
.shipping-icon { width: 60px; height: 60px; display: grid; place-items: center; border: 1px solid var(--ink); border-radius: 50%; font-family: var(--serif); font-size: 1.9rem; }
.shipping-note h3 { margin-bottom: .4rem; font-family: var(--serif); font-size: 1.4rem; font-weight: 500; }
.shipping-note p { margin-bottom: 0; color: var(--ink-soft); }

.testimonials-section { border-top: 1px solid var(--line); }
.testimonial-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(2rem, 4vw, 4rem); }
.testimonial { margin: 0; display: flex; flex-direction: column; gap: 1.4rem; border-top: 1px solid rgba(31, 42, 34, .2); padding-top: 1.8rem; }
.testimonial-mark { font-family: var(--serif); font-size: 3.4rem; line-height: .6; color: var(--gold-soft); }
.testimonial blockquote { margin: 0; font-family: var(--serif); font-size: 1.35rem; font-style: italic; line-height: 1.5; }
.testimonial figcaption { font-size: .7rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--ink-soft); }

.faq-section { display: grid; grid-template-columns: .75fr 1fr; gap: clamp(3rem, 8vw, 8rem); border-top: 1px solid var(--line); }
.faq-list { border-top: 1px solid var(--line); }
.faq-list details { border-bottom: 1px solid var(--line); }
.faq-list summary { display: flex; justify-content: space-between; gap: 2rem; padding: 1.7rem 0; cursor: pointer; font-family: var(--serif); font-size: 1.4rem; line-height: 1.3; list-style: none; }
.faq-list summary::-webkit-details-marker { display: none; }
.faq-list details p { max-width: 640px; margin: -.2rem 3rem 1.8rem 0; color: var(--ink-soft); }
.faq-symbol { flex: none; color: var(--terracotta); font-family: var(--sans); font-size: 1.4rem; transition: transform .25s ease; }
.faq-list details[open] .faq-symbol { transform: rotate(45deg); }

.contact-section { position: relative; min-height: 640px; display: grid; place-items: center; overflow: hidden; padding: 6rem 48px; background: var(--forest-deep); color: var(--paper); text-align: center; }
.contact-section::before, .contact-section::after { position: absolute; width: 260px; height: 420px; border: 1px solid var(--line-light); border-radius: 50%; content: ""; transform: rotate(28deg); }
.contact-section::before { left: -90px; bottom: -190px; }
.contact-section::after { top: -210px; right: -80px; }
.contact-orbit { position: absolute; width: min(640px, 85vw); aspect-ratio: 1; border: 1px solid rgba(201, 169, 122, .28); border-radius: 50%; }
.contact-inner { position: relative; z-index: 1; max-width: 800px; display: flex; flex-direction: column; align-items: center; gap: 1.6rem; }
.contact-inner .eyebrow, .contact-inner h2, .contact-inner p { margin: 0; }
.contact-inner .eyebrow { color: var(--gold-muted); letter-spacing: .3em; }
.contact-inner .accent { color: var(--gold-soft); }
.contact-inner h2 { font-size: clamp(3rem, 6.5vw, 5.8rem); line-height: 1; }
.contact-inner > p:not(.eyebrow):not(.contact-fallback) { max-width: 620px; font-size: 1.08rem; color: #c9d1c6; }
.contact-inner .contact-actions { justify-content: center; margin-top: .6rem; }
.contact-flame { position: relative; width: 34px; height: 48px; border: 1px solid rgba(244, 238, 225, .6); border-radius: 50% 50% 46% 46%; }
.contact-flame-halo { position: absolute; top: 7px; left: 9px; width: 14px; height: 18px; background: radial-gradient(circle at 50% 80%, rgba(201, 169, 122, .6), transparent 70%); border-radius: 50%; animation: halo 3.2s ease-in-out infinite; }
.contact-flame-fire { position: absolute; top: 8px; left: 13px; width: 9px; height: 16px; background: var(--gold-soft); border-radius: 70% 30% 60% 40%; transform-origin: 50% 100%; animation: flicker 2.8s ease-in-out infinite; }
.contact-fallback { max-width: 620px; margin: .6rem 0 0; padding: .8rem 1.2rem; border: 1px solid rgba(244, 238, 225, .3); font-size: .8rem; color: #c9d1c6; }

.site-footer { width: min(1380px, calc(100% - 96px)); margin: 0 auto; display: grid; grid-template-columns: 1fr auto; gap: 3rem; padding: 4rem 0 2rem; }
.footer-brand strong { font-family: var(--serif); font-size: 1.55rem; font-weight: 500; }
.footer-brand p { margin: .4rem 0 0; color: var(--ink-soft); font-size: .85rem; }
.site-footer nav { display: flex; flex-wrap: wrap; justify-content: flex-end; align-items: flex-start; gap: 1.4rem; font-size: .7rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.site-footer nav a { border-bottom: 1px solid transparent; }
.site-footer nav a:hover { border-color: var(--terracotta); color: var(--terracotta); }
.footer-meta { grid-column: 1 / -1; margin: 1rem 0 0; padding-top: 1.5rem; border-top: 1px solid var(--line); color: var(--ink-soft); font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; }

.privacy-page { min-height: 100vh; padding: 2rem max(24px, calc((100% - 1000px) / 2)) 6rem; }
.privacy-brand { display: inline-flex; flex-direction: column; margin-bottom: 6rem; font-family: var(--serif); font-size: 1.5rem; line-height: 1; }
.privacy-brand span { margin-top: .3rem; font-family: var(--sans); font-size: .55rem; letter-spacing: .2em; text-transform: uppercase; }
.privacy-page article { max-width: 760px; }
.privacy-page h1 { font-size: clamp(3rem, 7vw, 5.5rem); }
.privacy-lead { margin-bottom: 4rem; color: var(--ink-soft); font-size: 1.2rem; }
.privacy-page h2 { margin: 3rem 0 .8rem; font-size: 2rem; }
.privacy-page article > .button { margin-top: 3rem; }

@media (max-width: 1050px) {
  .site-header { align-items: flex-start; padding: 1.5rem 0; }
  .site-nav { gap: .5rem 1.2rem; }
  .hero { grid-template-columns: 1fr .72fr; gap: 3rem; }
  .seal-grid { grid-template-columns: repeat(2, 1fr); }
  .seal, .seal:first-child, .seal:last-child { padding: 2rem clamp(1.2rem, 2.5vw, 2.5rem); }
  .seal:nth-child(even) { border-right: 0; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 3rem 1.5rem; }
  .gallery-card:nth-child(even) { margin-top: 3rem; }
  .gallery-copy p { min-height: 0; }
  .testimonial-grid { grid-template-columns: 1fr; gap: 2.5rem; }
}

@media (max-width: 760px) {
  .site-header { width: min(100% - 32px, 680px); display: block; }
  .site-nav { margin-top: 1.25rem; justify-content: flex-start; gap: .5rem 1rem; }
  .site-nav a { font-size: .64rem; }
  .site-nav .nav-cta { padding: .5rem 1rem; }
  .hero { width: min(100% - 32px, 680px); grid-template-columns: 1fr; padding: 4.5rem 0 5rem; }
  h1 { font-size: clamp(3rem, 15vw, 4.7rem); }
  .hero-artwork { margin-top: 1rem; }
  .section, .gallery-section { width: min(100% - 32px, 680px); padding: 5.5rem 0; }
  .seals-section { width: min(100% - 32px, 680px); }
  .seal-grid { grid-template-columns: 1fr; }
  .seal, .seal:first-child, .seal:last-child { padding: 1.8rem 0; border-right: 0; border-bottom: 1px solid var(--line-soft); }
  .seal:last-child { border-bottom: 0; }
  .materials { width: 100%; padding-right: 16px; padding-left: 16px; }
  .section-heading--split { grid-template-columns: 1fr; gap: .5rem; }
  .benefit-grid { grid-template-columns: 1fr; }
  .benefit-card, .benefit-card:first-child, .benefit-card:last-child { min-height: 0; padding: 2.2rem 0; border-right: 0; border-bottom: 1px solid var(--line-light); }
  .benefit-card:last-child { border-bottom: 0; }
  .benefit-topline { margin-bottom: 2.5rem; }
  .gallery-grid { grid-template-columns: 1fr; gap: 3.5rem; }
  .gallery-card:nth-child(even) { margin-top: 0; }
  .story-section { width: min(100% - 32px, 680px); grid-template-columns: 1fr; gap: 3rem; }
  .faq-section { grid-template-columns: 1fr; gap: 1rem; }
  .process-list li { grid-template-columns: 64px 1fr; gap: 1rem; }
  .process-number { font-size: 2rem; }
  .shipping-note { grid-template-columns: 1fr; }
  .site-footer { width: min(100% - 32px, 680px); grid-template-columns: 1fr; }
  .site-footer nav { justify-content: flex-start; }
  .footer-meta { grid-column: 1; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
}
```

- [ ] **Step 4: Verify**

Run: `npm run lint && npm test && npm run build`
Expected: all pass. (The site will look partially restyled — components are updated in later tasks; that's expected.)

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "style: adopt Pavio Luxo palette, fonts and stylesheet"
```

---

### Task 2: Content types, copy and content tests (TDD)

**Files:**
- Modify: `types/content.ts`
- Modify: `content/site.ts`
- Create: `tests/content.test.ts`
- Create: `public/gallery/retrato-artesa.svg`

**Interfaces:**
- Produces: types `Seal { label, title, description }`, `Testimonial { quote, author }`, `Story { paragraphs, signature, portrait: { src, alt } }`; `siteContent.seals: Seal[]`, `siteContent.testimonials: Testimonial[]`, `siteContent.story: Story`; navigation gains `{ label: "História", href: "#historia" }` and "Como encomendar" is renamed "Encomendar". Consumed by Tasks 5, 6, 7 and the Header (Task 4).

- [ ] **Step 1: Write the failing test at `tests/content.test.ts`**

```ts
import { describe, expect, it } from "vitest";

import { siteContent } from "@/content/site";

describe("siteContent", () => {
  it("expõe quatro selos com textos completos", () => {
    expect(siteContent.seals).toHaveLength(4);
    for (const seal of siteContent.seals) {
      expect(seal.label).toMatch(/^Selo · 0[1-4]$/);
      expect(seal.title).not.toBe("");
      expect(seal.description).not.toBe("");
    }
  });

  it("inclui a secção da história na navegação", () => {
    const hrefs = siteContent.navigation.map((item) => item.href);
    expect(hrefs).toContain("#historia");
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("expõe a história da artesã com retrato local", () => {
    expect(siteContent.story.paragraphs.length).toBeGreaterThanOrEqual(2);
    expect(siteContent.story.portrait.src).toMatch(/^\/gallery\/.+\.svg$/);
    expect(siteContent.story.portrait.alt).not.toBe("");
    expect(siteContent.story.signature).not.toBe("");
  });

  it("expõe três testemunhos com citação e autor", () => {
    expect(siteContent.testimonials).toHaveLength(3);
    for (const testimonial of siteContent.testimonials) {
      expect(testimonial.quote).not.toBe("");
      expect(testimonial.author).toContain("·");
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/content.test.ts`
Expected: FAIL — `siteContent.seals` is `undefined` at runtime, so the first assertion throws (vitest strips types without checking them).

- [ ] **Step 3: Extend `types/content.ts`**

Add these types (keep every existing type unchanged):

```ts
export type Seal = {
  label: string;
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  author: string;
};

export type Story = {
  paragraphs: string[];
  signature: string;
  portrait: {
    src: string;
    alt: string;
  };
};
```

And extend `SiteContent`:

```ts
export type SiteContent = {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
  };
  navigation: NavigationItem[];
  seals: Seal[];
  benefits: Benefit[];
  story: Story;
  orderSteps: OrderStep[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
  defaultWhatsAppMessage: string;
};
```

- [ ] **Step 4: Extend `content/site.ts`**

Replace `navigation` with:

```ts
navigation: [
  { label: "Atelier", href: "#atelier" },
  { label: "Galeria", href: "#galeria" },
  { label: "História", href: "#historia" },
  { label: "Encomendar", href: "#encomendas" },
  { label: "Perguntas", href: "#perguntas" },
  { label: "Contactos", href: "#contactos" },
],
```

Add after `navigation` (all copy verbatim from the design):

```ts
seals: [
  {
    label: "Selo · 01",
    title: "Ceras 100% naturais",
    description: "Soja, colza e ceras vegetais certificadas.",
  },
  {
    label: "Selo · 02",
    title: "Zero parafina",
    description: "Sem derivados de petróleo, do pavio à cera.",
  },
  {
    label: "Selo · 03",
    title: "Óleos naturais",
    description: "Fragrâncias delicadas, de origem botânica.",
  },
  {
    label: "Selo · 04",
    title: "Feito à mão em Portugal",
    description: "Pequenos lotes, moldados no nosso atelier.",
  },
],
```

Add after `benefits`:

```ts
story: {
  paragraphs: [
    "O Pavio nasceu de uma mesa de cozinha, de tardes a experimentar ceras vegetais e a perseguir uma ideia simples: que uma vela pode ser, ao mesmo tempo, objeto de arte e gesto de afeto.",
    "Hoje, cada peça continua a ser moldada uma a uma — sem moldes industriais, sem pressa. Escolhemos matérias que respeitam a natureza e desenhamos cada encomenda em conversa com quem a vai receber.",
  ],
  signature: "— do atelier Pavio, com as mãos na cera",
  portrait: {
    src: "/gallery/retrato-artesa.svg",
    alt: "Ilustração de uma artesã a segurar uma vela artesanal no atelier",
  },
},
```

Add after `orderSteps`:

```ts
testimonials: [
  {
    quote:
      "A vela que encomendei para o casamento da minha irmã fez toda a gente perguntar de onde vinha. Uma peça única, mesmo.",
    author: "Marta S. · Lisboa",
  },
  {
    quote:
      "Chegou embalada como um presente de joalharia. O aroma é subtil e a chama dura horas.",
    author: "Rui P. · Porto",
  },
  {
    quote:
      "Pedi uma cor impossível e acertaram à primeira. Sente-se o cuidado em cada detalhe.",
    author: "Inês C. · Braga",
  },
],
```

- [ ] **Step 5: Create `public/gallery/retrato-artesa.svg`**

Placeholder illustration in the same hand-drawn gradient style as the existing gallery SVGs (viewBox 800×1000 to match the .8 aspect ratio):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
  <defs>
    <linearGradient id="d" x2="0" y2="1"><stop stop-color="#d9c9ae"/><stop offset="1" stop-color="#a98f6d"/></linearGradient>
    <filter id="s"><feDropShadow dy="18" stdDeviation="16" flood-color="#3a2c1e" flood-opacity=".25"/></filter>
  </defs>
  <rect width="800" height="1000" fill="url(#d)"/>
  <circle cx="620" cy="190" r="160" fill="#f4eee1" opacity=".24"/>
  <ellipse cx="400" cy="890" rx="300" ry="58" fill="#26332a" opacity=".18"/>
  <g filter="url(#s)">
    <circle cx="392" cy="392" r="112" fill="#c98d6b"/>
    <path d="M392 340c-64 0-104 44-104 96 0 14 4 28 10 40 8-52 46-84 94-84s86 32 94 84c6-12 10-26 10-40 0-52-40-96-104-96z" fill="#4c3a2a"/>
    <path d="M392 528c-142 0-238 88-238 224v168h476V752c0-136-96-224-238-224z" fill="#54654f"/>
    <path d="M330 560c18 44 42 66 62 66s44-22 62-66c-20-8-41-12-62-12s-42 4-62 12z" fill="#e9dfcb"/>
  </g>
  <g filter="url(#s)">
    <rect x="546" y="600" width="96" height="170" rx="12" fill="#f0e6d2"/>
    <rect x="588" y="576" width="8" height="26" rx="4" fill="#6b5b45"/>
    <path d="M592 540c10 14 24 17 24 34 0 13-10 22-22 22s-22-9-22-22c0-17 10-20 20-34z" fill="#9a4a2c"/>
    <ellipse cx="594" cy="580" rx="26" ry="14" fill="#c9a97a" opacity=".35"/>
  </g>
</svg>
```

- [ ] **Step 6: Run test to verify it passes**

Run: `npx vitest run tests/content.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 7: Run the whole suite + lint**

Run: `npm test && npm run lint`
Expected: all existing tests still pass.

- [ ] **Step 8: Commit**

```bash
git add types/content.ts content/site.ts tests/content.test.ts public/gallery/retrato-artesa.svg
git commit -m "feat: add seals, story and testimonials content"
```

---

### Task 3: ScrollReveal client component

**Files:**
- Create: `components/scroll-reveal.tsx`
- Modify: `app/page.tsx` (mount `<ScrollReveal />`)

**Interfaces:**
- Produces: `<ScrollReveal />` — a render-null client component that animates every element carrying a `data-reveal` attribute (fade + rise on first intersection). Later tasks add `data-reveal` attributes to server components; no other wiring needed.

- [ ] **Step 1: Create `components/scroll-reveal.tsx`**

Mirrors the design's behavior: skips entirely under `prefers-reduced-motion`, skips elements already in the viewport, reveals at 12% intersection:

```tsx
"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          element.style.opacity = "1";
          element.style.transform = "none";
          observer.unobserve(element);
        }
      },
      { threshold: 0.12 },
    );

    for (const element of elements) {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.85) {
        continue;
      }
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition =
        "opacity .9s ease, transform .9s cubic-bezier(.2,.6,.2,1)";
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
```

- [ ] **Step 2: Mount it in `app/page.tsx`**

Add the import (alphabetical order with the other `@/components` imports):

```tsx
import { ScrollReveal } from "@/components/scroll-reveal";
```

and render it as the first child inside the fragment, before the JSON-LD `<script>`:

```tsx
return (
  <>
    <ScrollReveal />
    <script
      type="application/ld+json"
      ...
```

- [ ] **Step 3: Verify**

Run: `npm run lint && npm run build`
Expected: pass (no `data-reveal` elements exist yet; the component is a safe no-op).

- [ ] **Step 4: Commit**

```bash
git add components/scroll-reveal.tsx app/page.tsx
git commit -m "feat: add scroll reveal animations"
```

---

### Task 4: Header, ContactActions and Hero

**Files:**
- Modify: `components/header.tsx`
- Modify: `components/contact-actions.tsx`
- Modify: `components/hero.tsx`

**Interfaces:**
- Consumes: `.brand-halo`, `.nav-cta`, `.accent`, `.hero-image-frame` classes (Task 1); navigation content (Task 2).
- Produces: `ContactActions` with props `{ message?: string; showWhatsAppFallback?: boolean; variant?: "default" | "gold"; secondary?: { href: string; label: string; symbol: string; external?: boolean } }`. When `secondary` is omitted it falls back to the Instagram link if configured (current behavior). Task 8 (Contacts) consumes `variant="gold"` and a `secondary` link.

- [ ] **Step 1: Update `components/header.tsx`**

The last navigation item renders as an outlined CTA; the brand mark gains the animated halo+flame:

```tsx
import { siteContent } from "@/content/site";

export function Header() {
  const lastIndex = siteContent.navigation.length - 1;

  return (
    <>
      <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Pavio Atelier Natural — início">
          <span className="brand-mark" aria-hidden="true"><span className="brand-halo" /><span className="brand-flame" /></span>
          <span><strong>{siteContent.brand.shortName}</strong><small>Atelier Natural</small></span>
        </a>
        <nav aria-label="Navegação principal">
          <ul className="site-nav">
            {siteContent.navigation.map((item, index) => (
              <li key={item.href}>
                <a className={index === lastIndex ? "nav-cta" : undefined} href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
```

- [ ] **Step 2: Update `components/contact-actions.tsx`**

Drop the unused `compact` prop (no caller uses it); add `variant` and `secondary`:

```tsx
import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/contact";

type SecondaryAction = {
  href: string;
  label: string;
  symbol: string;
  external?: boolean;
};

type ContactActionsProps = {
  message?: string;
  showWhatsAppFallback?: boolean;
  variant?: "default" | "gold";
  secondary?: SecondaryAction;
};

export function ContactActions({
  message = siteContent.defaultWhatsAppMessage,
  showWhatsAppFallback = true,
  variant = "default",
  secondary,
}: ContactActionsProps) {
  const whatsappUrl = buildWhatsAppUrl(siteConfig.whatsappNumber ?? undefined, message);
  const buttonClass = `button ${variant === "gold" ? "button--gold" : "button--primary"}`;
  const linkClass = `text-link${variant === "gold" ? " text-link--light" : ""}`;

  return (
    <div className="contact-actions">
      {whatsappUrl ? (
        <a className={buttonClass} href={whatsappUrl} target="_blank" rel="noreferrer">
          Falar pelo WhatsApp <span aria-hidden="true">↗</span>
        </a>
      ) : showWhatsAppFallback ? (
        <a className={buttonClass} href="#contactos">
          Ver formas de contacto <span aria-hidden="true">↓</span>
        </a>
      ) : null}
      {secondary ? (
        <a
          className={linkClass}
          href={secondary.href}
          {...(secondary.external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {secondary.label} <span aria-hidden="true">{secondary.symbol}</span>
        </a>
      ) : siteConfig.instagramUrl ? (
        <a className={linkClass} href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
          Acompanhar no Instagram <span aria-hidden="true">↗</span>
        </a>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 3: Update `components/hero.tsx`**

New eyebrow copy, italic accent in the title, gallery secondary link, `data-reveal` on the artwork:

```tsx
import Image from "next/image";

import { ContactActions } from "@/components/contact-actions";

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Feitas à mão · Ceras 100% naturais</p>
        <h1 id="hero-title">A luz de uma peça única, <em className="accent">criada</em> para a sua história.</h1>
        <p className="hero-intro">
          Velas artísticas e personalizadas, moldadas em ceras naturais sem parafina e perfumadas com óleos naturais — para oferecer, celebrar ou transformar um espaço.
        </p>
        <ContactActions secondary={{ href: "#galeria", label: "Ver a galeria", symbol: "↓" }} />
        <p className="hero-note">Orçamento personalizado · Envio para Portugal continental</p>
      </div>
      <div className="hero-artwork" data-reveal>
        <div className="hero-image-frame">
          <Image src="/gallery/hero-atelier.svg" alt="Composição artística de velas artesanais em tons naturais num atelier luminoso" width={960} height={1120} priority sizes="(max-width: 760px) 92vw, 42vw" />
        </div>
        <p className="artwork-caption"><span>Nº 01</span> Cada encomenda começa numa conversa.</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add components/header.tsx components/contact-actions.tsx components/hero.tsx
git commit -m "feat: redesign header and hero for Pavio Luxo"
```

---

### Task 5: Seals section (new) + Materials restyle

**Files:**
- Create: `components/seals.tsx`
- Modify: `components/materials.tsx`
- Modify: `app/page.tsx` (mount `<Seals />` between `<Hero />` and `<Materials />`)

**Interfaces:**
- Consumes: `siteContent.seals` (Task 2); `.seals-section`/`.seal*` and `.accent` classes (Task 1).
- Produces: `Seals()` server component exported from `components/seals.tsx`.

- [ ] **Step 1: Create `components/seals.tsx`**

```tsx
import { siteContent } from "@/content/site";

export function Seals() {
  return (
    <section className="seals-section" aria-label="Compromisso natural">
      <div className="seal-grid">
        {siteContent.seals.map((seal) => (
          <div className="seal" data-reveal key={seal.title}>
            <span className="seal-label">{seal.label}</span>
            <span className="seal-title">{seal.title}</span>
            <span className="seal-note">{seal.description}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `components/materials.tsx`**

Italic accent on the second line of the heading, `data-reveal` on heading and cards:

```tsx
import { siteContent } from "@/content/site";

export function Materials() {
  return (
    <section className="section materials" id="atelier" aria-labelledby="atelier-title">
      <div className="section-heading section-heading--split" data-reveal>
        <div><p className="eyebrow">O nosso atelier</p><h2 id="atelier-title">Matéria natural.<br /><em className="accent">Gesto artístico.</em></h2></div>
        <p>Acreditamos em objetos com intenção: peças que guardam a marca das mãos, respeitam o ritmo do processo e encontram lugar nas histórias de quem as recebe.</p>
      </div>
      <div className="benefit-grid">
        {siteContent.benefits.map((benefit, index) => (
          <article className="benefit-card" data-reveal key={benefit.title}>
            <div className="benefit-topline"><span>{benefit.eyebrow}</span><span aria-hidden="true">0{index + 1}</span></div>
            <h3>{benefit.title}</h3><p>{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Mount `<Seals />` in `app/page.tsx`**

Add `import { Seals } from "@/components/seals";` (alphabetical order) and render inside `<main id="conteudo">`:

```tsx
<main id="conteudo">
  <Hero />
  <Seals />
  <Materials />
  ...
```

- [ ] **Step 4: Verify**

Run: `npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add components/seals.tsx components/materials.tsx app/page.tsx
git commit -m "feat: add natural-commitment seals and restyle atelier section"
```

---

### Task 6: Gallery restyle + Story section (new)

**Files:**
- Modify: `components/gallery.tsx`
- Create: `components/story.tsx`
- Modify: `app/page.tsx` (mount `<Story />` between `<Gallery />` and `<OrderProcess />`)

**Interfaces:**
- Consumes: `siteContent.story` (Task 2); `.story-*` and `.accent` classes (Task 1); `getGalleryItems()` from `@/data/gallery` (unchanged).
- Produces: `Story()` server component exported from `components/story.tsx`.

- [ ] **Step 1: Update `components/gallery.tsx`**

Accent in heading, `data-reveal` on heading and cards (everything else unchanged):

```tsx
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { getGalleryItems } from "@/data/gallery";
import { buildWhatsAppUrl } from "@/lib/contact";

export function Gallery() {
  return (
    <section className="section gallery-section" id="galeria" aria-labelledby="gallery-title">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Peças &amp; possibilidades</p><h2 id="gallery-title">Inspirações para <em className="accent">imaginar</em> a sua.</h2>
        <p>Estas imagens representam direções criativas do atelier. Cada pedido é afinado consigo e pode ganhar outras cores, formas e detalhes.</p>
      </div>
      <div className="gallery-grid">
        {getGalleryItems().map((item, index) => {
          const whatsappUrl = buildWhatsAppUrl(siteConfig.whatsappNumber ?? undefined, item.whatsAppMessage);
          return (
            <article className="gallery-card" data-reveal key={item.id}>
              <div className="gallery-image">
                <Image src={item.artworkPath} alt={item.alt} width={800} height={980} sizes="(max-width: 680px) 92vw, (max-width: 1100px) 45vw, 23vw" />
                <span className="gallery-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="gallery-copy">
                <h3>{item.title}</h3><p>{item.description}</p>
                {whatsappUrl ? (
                  <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">Pedir algo inspirado nesta peça <span aria-hidden="true">↗</span></a>
                ) : (
                  <a className="text-link" href="#contactos">Consultar disponibilidade <span aria-hidden="true">↓</span></a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/story.tsx`**

```tsx
import Image from "next/image";

import { siteContent } from "@/content/site";

export function Story() {
  const { story } = siteContent;

  return (
    <section className="story-section" id="historia" aria-labelledby="historia-title">
      <div className="story-artwork" data-reveal>
        <div className="story-image-frame">
          <Image src={story.portrait.src} alt={story.portrait.alt} width={800} height={1000} sizes="(max-width: 760px) 92vw, 34vw" />
        </div>
      </div>
      <div className="story-copy" data-reveal>
        <p className="eyebrow">A artesã</p>
        <h2 id="historia-title">Mãos que <em className="accent">moldam</em> a luz.</h2>
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="story-signature">{story.signature}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Mount `<Story />` in `app/page.tsx`**

Add `import { Story } from "@/components/story";` (alphabetical order) and render after `<Gallery />`:

```tsx
<Gallery />
<Story />
<OrderProcess />
```

- [ ] **Step 4: Verify**

Run: `npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add components/gallery.tsx components/story.tsx app/page.tsx
git commit -m "feat: add artisan story section and restyle gallery"
```

---

### Task 7: OrderProcess restyle + Testimonials (new) + FAQ accent

**Files:**
- Modify: `components/order-process.tsx`
- Create: `components/testimonials.tsx`
- Modify: `components/faq.tsx`
- Modify: `app/page.tsx` (mount `<Testimonials />` between `<OrderProcess />` and `<Faq />`)

**Interfaces:**
- Consumes: `siteContent.testimonials` (Task 2); `.testimonial*` and `.accent` classes (Task 1).
- Produces: `Testimonials()` server component exported from `components/testimonials.tsx`.

- [ ] **Step 1: Update `components/order-process.tsx`**

Accent in heading, `data-reveal` on heading, list items and shipping note:

```tsx
import { siteConfig } from "@/config/site";
import { siteContent } from "@/content/site";

export function OrderProcess() {
  return (
    <section className="section process-section" id="encomendas" aria-labelledby="process-title">
      <div className="section-heading section-heading--split" data-reveal>
        <div><p className="eyebrow">Como encomendar</p><h2 id="process-title">Da primeira ideia à <em className="accent">luz acesa</em>.</h2></div>
        <p>Um processo próximo e simples, pensado para chegar a uma peça que faça sentido para si.</p>
      </div>
      <ol className="process-list">
        {siteContent.orderSteps.map((step) => (
          <li data-reveal key={step.number}><span className="process-number">{step.number}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>
        ))}
      </ol>
      <div className="shipping-note" data-reveal>
        <span className="shipping-icon" aria-hidden="true">⌁</span>
        <div><h3>Do atelier até si</h3><p>Fazemos envios para Portugal continental. A entrega local ou recolha é combinada consoante a zona{siteConfig.serviceArea ? ` — atualmente, ${siteConfig.serviceArea}` : " e a disponibilidade do atelier"}.</p></div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/testimonials.tsx`**

```tsx
import { siteContent } from "@/content/site";

export function Testimonials() {
  return (
    <section className="section testimonials-section" aria-label="Testemunhos">
      <div className="section-heading" data-reveal>
        <p className="eyebrow">Testemunhos</p>
        <h2>Histórias que já <em className="accent">acendemos</em>.</h2>
      </div>
      <div className="testimonial-grid">
        {siteContent.testimonials.map((testimonial) => (
          <figure className="testimonial" data-reveal key={testimonial.author}>
            <span className="testimonial-mark" aria-hidden="true">“</span>
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption>{testimonial.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update `components/faq.tsx`**

Accent in heading, `data-reveal` on heading and list:

```tsx
import { siteContent } from "@/content/site";

export function Faq() {
  return (
    <section className="section faq-section" id="perguntas" aria-labelledby="faq-title">
      <div className="section-heading" data-reveal><p className="eyebrow">Perguntas frequentes</p><h2 id="faq-title">Antes de acendermos a <em className="accent">conversa</em>.</h2></div>
      <div className="faq-list" data-reveal>
        {siteContent.faqs.map((item) => (
          <details key={item.question}><summary><span>{item.question}</span><span className="faq-symbol" aria-hidden="true">+</span></summary><p>{item.answer}</p></details>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Mount `<Testimonials />` in `app/page.tsx`**

Add `import { Testimonials } from "@/components/testimonials";` (alphabetical order) and render after `<OrderProcess />`:

```tsx
<OrderProcess />
<Testimonials />
<Faq />
```

- [ ] **Step 5: Verify**

Run: `npm run lint && npm test && npm run build`
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add components/order-process.tsx components/testimonials.tsx components/faq.tsx app/page.tsx
git commit -m "feat: add testimonials and restyle order process and faq"
```

---

### Task 8: Contacts redesign + OG image palette + final verification

**Files:**
- Modify: `components/contacts.tsx`
- Modify: `components/footer.tsx` (copyright suffix only)
- Modify: `app/opengraph-image.tsx` (palette values only)

**Interfaces:**
- Consumes: `ContactActions` `variant`/`secondary` props (Task 4); `.contact-flame*`, `.button--gold`, `.text-link--light`, `.eyebrow--plain` classes (Task 1).

- [ ] **Step 1: Update `components/contacts.tsx`**

Dark green section with animated candle icon, gold button, gallery link:

```tsx
import { ContactActions } from "@/components/contact-actions";
import { siteConfig } from "@/config/site";

export function Contacts() {
  return (
    <section className="contact-section" id="contactos" aria-labelledby="contact-title">
      <div className="contact-orbit" aria-hidden="true" />
      <div className="contact-inner" data-reveal>
        <span className="contact-flame" aria-hidden="true"><span className="contact-flame-halo" /><span className="contact-flame-fire" /></span>
        <p className="eyebrow eyebrow--plain">Comecemos por uma ideia</p>
        <h2 id="contact-title">Que luz gostaria de <em className="accent">criar</em>?</h2>
        <p>Conte-nos a ocasião, o ambiente ou a pessoa que tem em mente. Respondemos com disponibilidade e um orçamento à medida.</p>
        <ContactActions variant="gold" showWhatsAppFallback={false} secondary={{ href: "#galeria", label: "Rever a galeria", symbol: "↑" }} />
        {!siteConfig.whatsappNumber ? (
          <p className="contact-fallback" role="status">O contacto de WhatsApp ainda não está disponível. Não apresentamos números provisórios; volte em breve{siteConfig.instagramUrl ? " ou acompanhe as novidades no Instagram" : " para conhecer os canais oficiais"}.</p>
        ) : null}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update the footer copyright line in `components/footer.tsx`**

Only the `.footer-meta` line changes (nav and brand block stay as-is, including the privacy-policy and Instagram links):

```tsx
<p className="footer-meta">© {new Date().getFullYear()} Pavio Atelier Natural · Ceras naturais, sem parafina</p>
```

- [ ] **Step 3: Align `app/opengraph-image.tsx` with the new palette**

Change only these style values (structure and copy stay identical):
- root `color: "#27372d"` → `"#1f2a22"`; root `background: "#eee7d9"` → `"#f4eee1"`
- eyebrow `color: "#8a4f39"` → `"#a98a5b"`
- subtitle `color: "#56675c"` → `"#5c675c"`
- candle body `background: "#d6b48d"` → `"#e7dcc8"`
- flame `background: "#c5683f"` → `"#9a4a2c"`

- [ ] **Step 4: Full verification**

Run: `npm test && npm run lint && npm run build`
Expected: all tests pass, no lint errors, build succeeds.

- [ ] **Step 5: Visual smoke check**

Run `npm run dev` in the background, fetch `http://localhost:3000` with `curl -s http://localhost:3000 | grep -o 'id="[a-z]*"'` and confirm the section ids appear in order: `inicio`, `atelier`, `galeria`, `historia`, `encomendas`, `perguntas`, `contactos`. Stop the dev server afterwards.

- [ ] **Step 6: Commit**

```bash
git add components/contacts.tsx components/footer.tsx app/opengraph-image.tsx
git commit -m "feat: redesign contacts section and refresh og image palette"
```

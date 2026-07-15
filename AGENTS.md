<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Pavio project context

## Product

- Pavio Atelier Natural is a Portuguese institutional and lead-generation site for handmade artistic candles made with natural waxes.
- The public experience is intentionally simple: a single-page presentation plus `/politica-de-privacidade`. There is no shop, checkout, backend, form, account system, or price catalogue.
- Conversion happens through WhatsApp or Instagram so each personalised request can be discussed and quoted directly.
- The business is based in Setúbal. It has no public customer-facing address; collection in Setúbal is arranged directly, and orders can be shipped to mainland Portugal. Never invent or expose an address, postcode, map pin or opening hours.
- All public-facing copy must be European Portuguese (`pt-PT`). Do not introduce Brazilian Portuguese wording.
- The current visual baseline is the “Pavio Luxo” redesign merged in PR #1. Preserve its editorial, artisanal and premium direction unless the user requests a redesign.

## Stack and architecture

- Next.js `16.2.10` App Router, React `19.2.4`, strict TypeScript, Vitest and ESLint.
- Prefer React Server Components. `components/scroll-reveal.tsx` is currently the only client component and exists solely for progressive reveal animation.
- `app/page.tsx` composes the home page in this order: Hero, Seals, Materials, Gallery, Story, OrderProcess, Testimonials, FAQ and Contacts.
- `content/site.ts` is the source of truth for reusable pt-PT content and is typed by `types/content.ts`. Gallery entries live in `data/gallery.ts`.
- Contact and deployment configuration is read through `config/site.ts`; normalization and URL construction belong in `lib/site-config.ts` and `lib/contact.ts`.
- Keep components focused and semantic. Do not move reusable copy back into JSX without a presentational reason; stylised heading fragments such as `<em className="accent">` may remain in components.

## Styling and assets

- Tailwind CSS v4 is imported in `app/globals.css`, but JSX uses semantic class names rather than utility classes. Continue styling through the global semantic stylesheet unless a deliberate migration is agreed.
- Fonts are Cormorant Garamond and Karla, loaded with `next/font/google` and exposed as `--font-serif` and `--font-sans`.
- Preserve the established paper, forest, terracotta and gold design tokens in `:root`. `--gold: #7e6539` was chosen to achieve approximately 4.8:1 contrast on `--paper`; do not lighten it without measuring WCAG contrast again.
- Gallery and atelier artwork is served locally from `public/gallery/` through `next/image`. Keep meaningful pt-PT alternative text.
- `.story-artwork` is an intentional semantic wrapper and does not require a CSS rule.

## Accessibility and resilience

- Preserve the skip link, semantic landmarks, labelled sections, visible focus states and native `<details>` FAQ interaction.
- Motion must respect `prefers-reduced-motion`.
- Reveal effects are progressive enhancement: content must remain visible and usable when JavaScript is disabled or `IntersectionObserver` is unavailable.
- External links opened in a new tab must keep an appropriate `rel` value.

## SEO and production configuration

- SEO surfaces include metadata and canonicals in `app/layout.tsx`, JSON-LD in `app/page.tsx`, the generated Open Graph image, `robots.ts` and `sitemap.ts`. Keep them aligned when the brand, URL or page structure changes.
- `NEXT_PUBLIC_SITE_URL` must be a valid HTTPS origin. When it is absent or invalid, the app deliberately falls back to localhost and disables indexing; set the real value before production launch.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_INSTAGRAM_URL` and `NEXT_PUBLIC_SERVICE_AREA` are optional. `NEXT_PUBLIC_SERVICE_AREA` controls only the local service/discovery area shown in Contacts; it must never change the Setúbal collection point in Hero, OrderProcess, FAQ or JSON-LD. Never invent placeholder contact details; preserve the current honest UI fallbacks.
- The privacy page states that there are no forms or first-party analytics. Update it before adding tracking, forms or any new personal-data processing.
- Environment variable names and safe empty examples belong in `.env.example`; never commit real secrets or local `.env` files.

## Quality checks

- Run `npm test`, `npm run lint` and `npm run build` before declaring implementation work complete.
- Current tests cover contact URL handling, secure site-origin configuration, content structure and gallery data. Add or update tests whenever those contracts change.
- Check responsive layouts and keyboard behaviour when changing UI, not only the desktop appearance.

## Git and agent workflow

- Use conventional commit subjects in English, for example `feat:`, `fix:`, `style:`, `test:`, `docs:` and `chore:`.
- Do not create Git worktrees. Create a normal feature branch, publish it to GitHub early with an upstream, and keep subsequent work on that branch until review or merge.
- Never identify an AI tool or agent as an author or co-author in commits, commit trailers, PR titles, PR bodies or review messages. Do not add `Co-Authored-By` or similar AI attribution. Use only the repository owner's configured Git identity.
- `AI_HANDOFF.md` and `.superpowers/` are local, ignored working artefacts. Do not commit them.
- Do not rewrite published history, force-push, merge to `main`, or remove remote branches unless the user explicitly requests it.

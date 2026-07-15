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
- The current visual baseline combines the “Pavio Luxo” redesign merged in PR #1 with the transparent-logo and Setúbal discovery work merged in PR #2. Preserve its editorial, artisanal and premium direction unless the user requests a redesign.
- The approved header identity uses `public/brand/pavio-logo.png` through `next/image`. Its transparent asset, visible tagline and responsive crop are approved together; do not replace, recolour or recrop them without visual validation.

## Stack and architecture

- Next.js `16.2.10` App Router, React `19.2.4`, strict TypeScript, Vitest and ESLint.
- Prefer React Server Components. `components/scroll-reveal.tsx` is currently the only client component and exists solely for progressive reveal animation.
- `app/page.tsx` composes the home page in this order: Hero, Seals, Materials, Gallery, Story, OrderProcess, Testimonials, FAQ and Contacts.
- `content/site.ts` is the source of truth for reusable pt-PT content and is typed by `types/content.ts`. Gallery entries live in `data/gallery.ts`.
- Contact and deployment configuration is read through `config/site.ts`; normalization and URL construction belong in `lib/site-config.ts` and `lib/contact.ts`.
- `lib/structured-data.ts` builds the homepage `Organization`, `WebSite` and `FAQPage` graph from typed, verified content. Keep structured FAQs identical to the visible FAQ source.
- Keep components focused and semantic. Do not move reusable copy back into JSX without a presentational reason; stylised heading fragments such as `<em className="accent">` may remain in components.

## Styling and assets

- Tailwind CSS v4 is imported in `app/globals.css`, but JSX uses semantic class names rather than utility classes. Continue styling through the global semantic stylesheet unless a deliberate migration is agreed.
- Fonts are Cormorant Garamond and Karla, loaded with `next/font/google` and exposed as `--font-serif` and `--font-sans`.
- Preserve the established paper, forest, terracotta and gold design tokens in `:root`. `--gold: #7e6539` was chosen to achieve approximately 4.8:1 contrast on `--paper`; do not lighten it without measuring WCAG contrast again.
- Gallery and atelier artwork is served locally from `public/gallery/` through `next/image`. Keep meaningful pt-PT alternative text.
- The header logo is `public/brand/pavio-logo.png`, an approved transparent 1254×1254 PNG cropped responsively by `.brand-logo`. Preserve the current desktop and mobile crop unless a new visual review approves different coordinates.
- `.story-artwork` is an intentional semantic wrapper and does not require a CSS rule.

## Accessibility and resilience

- Preserve the skip link, semantic landmarks, labelled sections, visible focus states and native `<details>` FAQ interaction.
- Motion must respect `prefers-reduced-motion`.
- Reveal effects are progressive enhancement: content must remain visible and usable when JavaScript is disabled or `IntersectionObserver` is unavailable.
- External links opened in a new tab must keep an appropriate `rel` value.

## SEO and production configuration

- SEO surfaces include metadata and canonicals in `app/layout.tsx`, JSON-LD in `app/page.tsx`, the generated Open Graph image, `robots.ts` and `sitemap.ts`. Keep them aligned when the brand, URL or page structure changes.
- The verified local schema uses `Organization`, not `LocalBusiness`, with Setúbal as a served city and mainland Portugal as the wider shipping area. Do not emit `PostalAddress`, `address`, postcode, map, `geo`, latitude/longitude or opening hours unless the owner confirms new public business facts.
- Brand name, logo, business facts, reusable SEO copy and visible FAQs come from `content/site.ts`; metadata, Open Graph output and JSON-LD must remain aligned with that source.
- `NEXT_PUBLIC_SITE_URL` must be a valid HTTPS origin. When it is absent or invalid, the app deliberately falls back to localhost and disables indexing; set the real value before production launch.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_INSTAGRAM_URL` and `NEXT_PUBLIC_SERVICE_AREA` are optional. `NEXT_PUBLIC_SERVICE_AREA` controls only the local service/discovery area shown in Contacts; it must never change the Setúbal collection point in Hero, OrderProcess, FAQ or JSON-LD. Never invent placeholder contact details; preserve the current honest UI fallbacks.
- The privacy page states that there are no forms or first-party analytics. Update it before adding tracking, forms or any new personal-data processing.
- Environment variable names and safe empty examples belong in `.env.example`; never commit real secrets or local `.env` files.

## Quality checks

- The current baseline has 25 Vitest tests across eight files. Treat the count as a snapshot, not a target; update tests whenever contracts change.
- Before declaring implementation complete, run fresh `npm test`, `npm run lint`, `npx tsc --noEmit --incremental false`, `npm run build` and `git diff --check` evidence.
- The production build may require network access for the existing Google Fonts. A sandbox network failure is not a product failure; rerun with approved network access and report both outcomes accurately.
- Check responsive layouts, keyboard navigation, focus, accessible names and reduced-motion behaviour when changing UI, not only the desktop appearance.

## Git and agent workflow

- Start each session by reading this file, inspecting `git status`, the active branch and recent commits, and confirming what has already been merged.
- Work from an up-to-date `main` on a normal Git branch. Do not create Git worktrees. Publish the branch to GitHub early with an upstream and keep subsequent work on that branch.
- Preserve user changes and keep unrelated work out of the branch. Use `apply_patch` for intentional file edits and inspect the complete diff before committing.
- Use conventional commit subjects in English, for example `feat:`, `fix:`, `style:`, `test:`, `docs:` and `chore:`.
- Use only the repository owner's configured Git identity. Never identify an AI tool or agent as author or co-author in commits, trailers, PR titles, PR bodies, comments or reviews.
- For non-trivial work, agree a verifiable design and plan before implementation. Apply TDD to features and fixes: demonstrate a relevant RED failure, implement the minimum change and confirm GREEN.
- When the owner requests subagents, or when bounded delegation clearly helps, give each subagent explicit scope, constraints, tests and deliverables. Review every result before accepting it.
- For substantial changes, use independent task reviews and finish with a complete branch code review by the primary agent. Fix Critical and Important findings and re-review them; ask the owner before contradicting an approved decision.
- Push only after fresh verification. Open a PR to `main` with summary, rationale, impact and checks. When validation is complete and the owner intends to merge, mark the PR ready for review; the owner performs the merge by default.
- Do not rewrite published history, force-push, merge to `main`, delete remote branches or discard work unless the owner explicitly authorises it.
- `AI_HANDOFF.md` and `.superpowers/` are local ignored working artefacts. Do not commit them; durable context belongs here or in appropriate versioned documentation under `docs/`.

## Documentation and communication

- Write all user-facing communication and all public copy in European Portuguese (`pt-PT`) unless the owner explicitly requests another language.
- For Next.js APIs, read the relevant installed-version documentation in `node_modules/next/dist/docs/` before coding. For other libraries, frameworks, SDKs, APIs, CLI tools or cloud services, consult current documentation through Context7 when available.
- Prefer concise, evidence-backed progress updates. Report blockers, failed checks and residual manual verification honestly.

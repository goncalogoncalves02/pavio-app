# Pavio Logo and Setúbal SEO Design

**Date:** 2026-07-15
**Status:** Approved direction, pending implementation plan
**Branch:** `feat/logo-setubal-seo`

## Goal

Integrate the approved transparent Pavio logo into the existing Pavio Luxo design and improve the site's relevance for searches about handmade and personalised candles in Setúbal, without publishing or inventing a physical business address.

## Confirmed business facts

- The business is based in Setúbal, Portugal.
- It does not have a public shop or atelier address where customers can arrive unannounced.
- Orders are discussed and quoted through WhatsApp or Instagram.
- Orders can be collected in Setúbal at a time and place agreed with the client.
- Orders can also be shipped to mainland Portugal.
- The website remains an institutional lead-generation site, not an online shop.

## Approved visual direction

### Logo placement

- Use the user-provided transparent `logo.png` as the primary brand lockup in the site header.
- Preserve the logo artwork and its tagline, “Velas que acendem momentos”; do not redraw, recolour or recreate it with a font.
- Move the implementation asset to `public/brand/pavio-logo.png` so it has a stable public URL and can be referenced by both `next/image` and structured data.
- The source image is 1254 by 1254 pixels. Its non-transparent content occupies approximately `(211, 368)–(1119, 844)`. Use an overflow-hidden wrapper and image positioning to remove the transparent margins visually without modifying the source pixels.
- Target an approximately 190 by 100 pixel visible lockup on desktop and 150 by 79 pixels on mobile. The mobile version must not be made smaller because the tagline becomes unreadable.
- Keep the current page background token `--paper: #f4eee1`. The transparent logo already harmonises with the paper, dark-brown and gold palette.
- Use the logo only on light paper backgrounds. Do not place the current dark-gradient artwork directly on forest sections because its darker strokes lose contrast there.
- Replace the existing generated flame-and-text header mark. The decorative flame in the contact section may remain because it is part of the page's visual language rather than a competing logo.
- Keep the existing navigation and contact CTA hierarchy. On narrow screens, ensure the logo and navigation wrap without overlap; this scope does not introduce a JavaScript hamburger menu.

### Accessible image treatment

- Render the brand link with `next/image` and a concise accessible name equivalent to “Pavio — Velas que acendem momentos”.
- Keep the link's destination as `#inicio` and preserve the existing skip link.
- Set intrinsic dimensions and responsive CSS to prevent layout shift.
- The logo is a brand mark, so surrounding navigation and headings must continue to carry the page's semantic structure; the image must not replace the page `<h1>`.

## Approved local-search strategy

Use a balanced homepage strategy. Do not create a separate Setúbal landing page in this iteration: the current single-page site already has the right scope, while a new route would risk thin or duplicated content.

### Search metadata

- Change the default title to: `Velas artesanais personalizadas em Setúbal | Pavio`.
- Use the same title for Open Graph and Twitter metadata.
- Change the main description to: `Velas artísticas e personalizadas em ceras naturais, feitas à mão em Setúbal. Recolha a combinar e envios para Portugal continental.`
- Preserve `pt-PT`, the canonical URL, the generated Open Graph image, the HTTPS-origin requirement and the current no-index behaviour when no public origin is configured.
- Do not add a keywords meta tag or repeat “Setúbal” unnaturally; visible content and structured facts are the source of local relevance.

### Visible pt-PT content

Keep the current hero heading. Add location information in short, factual places:

- Hero eyebrow: `Atelier em Setúbal · Ceras 100% naturais`.
- Hero note: `Recolha em Setúbal a combinar · Envio para Portugal continental`.
- Add one natural reference to the Setúbal atelier in the story or atelier section.
- Update the shipping/recollection note to name Setúbal explicitly.
- Add or replace one FAQ item with:
  - Question: `Posso recolher a encomenda em Setúbal?`
  - Answer: `Sim. A recolha em Setúbal pode ser combinada diretamente com o atelier, de acordo com a disponibilidade e após confirmação da encomenda.`
- Update the contacts introduction so it is clear that enquiries are welcome from Setúbal and from the rest of mainland Portugal.
- Avoid wording that implies a public shop, fixed collection point, published address or guaranteed same-day availability.

Reusable business-location copy and facts belong in `content/site.ts` and must be represented in `types/content.ts`. Components should consume those values instead of independently inventing variations.

## Structured data for SEO, AEO, GEO and AIO

### Organization graph

Keep the existing `WebSite` and `Organization` graph, then enrich `Organization` with only verified information:

- `name` and canonical `url`.
- Absolute `logo` URL: `${origin}/brand/pavio-logo.png`.
- The approved metadata description.
- `sameAs` only when a valid Instagram URL is configured.
- `telephone` and `contactPoint` only when a valid WhatsApp number is configured.
- `areaServed` containing Setúbal as a `City` and `Portugal continental` as an `AdministrativeArea` for the wider shipping area.

Do not emit `LocalBusiness`, `PostalAddress`, `geo`, `openingHoursSpecification` or a map URL. Google requires a physical address for `LocalBusiness` rich-result eligibility, and this business has no public customer-facing address.

### FAQ graph

- Add a `FAQPage` node whose `mainEntity` values are generated from the exact visible questions and answers in `siteContent.faqs`.
- Structured answers must never contain claims that are absent from the visible page.
- Treat this markup as machine-readable context, not a promise of a Google FAQ rich result.

### Implementation boundary

- Extract construction of the homepage JSON-LD graph from `app/page.tsx` into a small pure helper in `lib/structured-data.ts`.
- The helper must accept explicit content/config values and return a serialisable object so its output can be unit-tested.
- Continue rendering JSON-LD with a native `<script type="application/ld+json">` and escape `<` as `\u003c` before using `dangerouslySetInnerHTML`.
- Do not add another client component or any third-party SEO/schema dependency.

## Configuration

- Preserve the existing environment variables and their validation.
- Use Setúbal as the verified default service area when `NEXT_PUBLIC_SERVICE_AREA` is empty; the environment variable may still override the display value if the business's collection/delivery area changes.
- Update `.env.example` to show `Setúbal` as the non-secret example/default service area.
- Never add a street address, postcode or coordinates unless the user later supplies verified public information and explicitly asks for it to be published.

## Validation

### Automated

- Extend content tests to cover the Setúbal business facts and collection FAQ.
- Add tests for the structured-data helper:
  - includes the absolute logo URL;
  - identifies Setúbal in `areaServed`;
  - omits address and local-business-only claims;
  - includes configured Instagram and contact information conditionally;
  - mirrors the visible FAQ content.
- Keep all existing contact, origin, gallery and content tests passing.
- Run `npm test`, `npm run lint` and `npm run build`.

### Manual

- Inspect the header at desktop, tablet and narrow mobile widths.
- Confirm the tagline remains recognisable and the navigation does not overlap the logo.
- Navigate by keyboard from the skip link through the header and contact actions.
- Inspect the rendered title, description, canonical, robots and JSON-LD.
- After deployment with a real HTTPS origin, validate the page with Google's Rich Results Test and URL Inspection, then submit the sitemap in Search Console.

## External local-presence follow-up

If the business makes in-person deliveries or collection hand-offs and is eligible for a Google Business Profile, configure it as a service-area business, hide the private address and list accurate service areas such as Setúbal. Google states that businesses that do not receive customers at their address should remove/hide that address and show their service area instead:

- https://support.google.com/business/answer/2853879
- https://support.google.com/business/answer/9157481

This is a client-owned launch task and is not automated by this code change.

## Non-goals

- No physical-address publication, embedded map or fabricated coordinates.
- No separate Setúbal landing page in this iteration.
- No shop, checkout, catalogue, fixed pricing, forms or analytics.
- No change to the main paper background or the established Pavio Luxo palette.
- No AI-generated replacement or visual modification of the supplied logo.
- No unrelated component or CSS refactor.

# Pavio Logo and Setúbal SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the approved transparent Pavio logo in the header and improve local discovery for handmade personalised candles in Setúbal without publishing a physical address.

**Architecture:** Extend the typed content model with verified brand, location and SEO facts; keep presentation in Server Components and semantic CSS; move JSON-LD construction into a pure tested helper. The existing single-page structure, environment validation and no-index safety remain unchanged.

**Tech Stack:** Next.js 16.2.10 App Router, React 19.2.4 Server Components, TypeScript 5 strict mode, semantic CSS with Tailwind v4 imported globally, Vitest 4.1.6, ESLint 9.

## Global Constraints

- All public copy is European Portuguese (`pt-PT`).
- The business is based in Setúbal, has no public customer-facing address, offers collection in Setúbal by prior arrangement and ships to mainland Portugal.
- Do not emit `LocalBusiness`, `PostalAddress`, coordinates, opening hours or a map URL.
- Preserve the Pavio Luxo palette, including `--paper: #f4eee1` and `--gold: #7e6539`.
- Preserve the supplied transparent logo pixels and tagline; do not recolour, redraw or AI-edit the artwork.
- Keep React Server Components as the default. Do not add a client component or third-party SEO/schema package.
- Use semantic classes in `app/globals.css`; do not introduce Tailwind utility classes in JSX.
- Use a normal Git branch already published as `feat/logo-setubal-seo`; do not create a worktree.
- Commits use conventional English subjects and only the repository owner's configured identity. Never add AI authorship or co-authorship.
- Required final checks: `npm test`, `npm run lint`, `npm run build`, `git diff --check`.

## File map

- `types/content.ts`: typed contracts for brand assets, business location and SEO copy.
- `content/site.ts`: single source of truth for verified Setúbal facts and public pt-PT copy.
- `lib/site-config.ts`: pure service-area fallback resolver.
- `config/site.ts`: validated environment configuration with Setúbal fallback.
- `.env.example`: safe, non-secret service-area default.
- `AGENTS.md`: durable warning that the business has no public address.
- `public/brand/pavio-logo.png`: approved transparent logo served at a stable URL.
- `components/header.tsx`: accessible `next/image` logo integration.
- `app/globals.css`: responsive crop and header sizing for the square source PNG.
- `components/hero.tsx`, `components/order-process.tsx`, `components/contacts.tsx`: visible Setúbal and shipping copy.
- `app/layout.tsx`: local-search title and description from typed content.
- `lib/structured-data.ts`: pure homepage Organization/WebSite/FAQ graph builder.
- `app/page.tsx`: renders the helper output through the existing safe JSON-LD script.
- `tests/content.test.ts`, `tests/site-config.test.ts`: business and fallback contracts.
- `tests/header.test.tsx`, `tests/local-seo.test.tsx`: server-rendered UI contracts.
- `tests/structured-data.test.ts`: JSON-LD inclusion and omission rules.
- `vitest.config.ts`: include TSX test files.

---

### Task 1: Add typed Setúbal business and SEO facts

**Files:**
- Modify: `types/content.ts`
- Modify: `content/site.ts`
- Modify: `lib/site-config.ts`
- Modify: `config/site.ts`
- Modify: `.env.example`
- Modify: `AGENTS.md`
- Test: `tests/content.test.ts`
- Test: `tests/site-config.test.ts`

**Interfaces:**
- Produces: `siteContent.brand.logoPath`, `siteContent.brand.logoAlt`, `siteContent.business`, `siteContent.seo`.
- Produces: `resolveServiceArea(value: string | undefined, fallback: string): string`.
- Consumers: Tasks 2–4 use these values for the header, visible copy, metadata and JSON-LD.

- [ ] **Step 1: Add failing content and service-area tests**

Apply these exact test changes:

```diff
diff --git a/tests/content.test.ts b/tests/content.test.ts
--- a/tests/content.test.ts
+++ b/tests/content.test.ts
@@
 describe("siteContent", () => {
+  it("expõe a identidade e os factos locais verificados", () => {
+    expect(siteContent.brand.logoPath).toBe("/brand/pavio-logo.png");
+    expect(siteContent.brand.logoAlt).toBe(
+      "Pavio — Velas que acendem momentos",
+    );
+    expect(siteContent.business).toEqual({
+      locality: "Setúbal",
+      countryName: "Portugal",
+      shippingArea: "Portugal continental",
+      pickupLabel: "Recolha em Setúbal a combinar",
+    });
+    expect(siteContent.seo.title).toBe(
+      "Velas artesanais personalizadas em Setúbal | Pavio",
+    );
+    expect(siteContent.seo.description).toContain("feitas à mão em Setúbal");
+  });
+
   it("expõe quatro selos com textos completos", () => {
diff --git a/tests/site-config.test.ts b/tests/site-config.test.ts
--- a/tests/site-config.test.ts
+++ b/tests/site-config.test.ts
@@
 import {
   normalizeExternalUrl,
+  resolveServiceArea,
   resolveSiteOrigin,
 } from "@/lib/site-config";
+
+describe("resolveServiceArea", () => {
+  it("usa Setúbal quando a configuração está vazia", () => {
+    expect(resolveServiceArea(undefined, "Setúbal")).toBe("Setúbal");
+    expect(resolveServiceArea("   ", "Setúbal")).toBe("Setúbal");
+  });
+
+  it("preserva uma área de serviço configurada", () => {
+    expect(resolveServiceArea(" Palmela e Setúbal ", "Setúbal")).toBe(
+      "Palmela e Setúbal",
+    );
+  });
+});
```

- [ ] **Step 2: Run the focused tests and confirm the red state**

Run:

```bash
npm test -- tests/content.test.ts tests/site-config.test.ts
```

Expected: FAIL because the new content fields and `resolveServiceArea` do not exist.

- [ ] **Step 3: Extend the typed content model**

Apply this exact type patch:

```diff
diff --git a/types/content.ts b/types/content.ts
--- a/types/content.ts
+++ b/types/content.ts
@@
 export type Story = {
@@
 };
+
+export type BusinessDetails = {
+  locality: string;
+  countryName: string;
+  shippingArea: string;
+  pickupLabel: string;
+};
+
+export type SeoContent = {
+  title: string;
+  description: string;
+};

export type SiteContent = {
   brand: {
     name: string;
     shortName: string;
     tagline: string;
+    logoPath: `/${string}`;
+    logoAlt: string;
   };
+  business: BusinessDetails;
+  seo: SeoContent;
   navigation: NavigationItem[];
```

- [ ] **Step 4: Add the verified content values**

Apply this exact content patch:

```diff
diff --git a/content/site.ts b/content/site.ts
--- a/content/site.ts
+++ b/content/site.ts
@@
   brand: {
     name: "Pavio Atelier Natural",
     shortName: "Pavio",
-    tagline: "Velas artísticas, feitas para cada história.",
+    tagline: "Velas que acendem momentos.",
+    logoPath: "/brand/pavio-logo.png",
+    logoAlt: "Pavio — Velas que acendem momentos",
+  },
+  business: {
+    locality: "Setúbal",
+    countryName: "Portugal",
+    shippingArea: "Portugal continental",
+    pickupLabel: "Recolha em Setúbal a combinar",
+  },
+  seo: {
+    title: "Velas artesanais personalizadas em Setúbal | Pavio",
+    description:
+      "Velas artísticas e personalizadas em ceras naturais, feitas à mão em Setúbal. Recolha a combinar e envios para Portugal continental.",
   },
   navigation: [
```

- [ ] **Step 5: Add the pure service-area fallback and use it in configuration**

Apply:

```diff
diff --git a/lib/site-config.ts b/lib/site-config.ts
--- a/lib/site-config.ts
+++ b/lib/site-config.ts
@@
 export type ResolvedSiteOrigin = {
@@
 };
+
+export function resolveServiceArea(
+  value: string | undefined,
+  fallback: string,
+): string {
+  return value?.trim() || fallback;
+}

export function resolveSiteOrigin(_value?: string): ResolvedSiteOrigin {
diff --git a/config/site.ts b/config/site.ts
--- a/config/site.ts
+++ b/config/site.ts
@@
 import { normalizeWhatsAppNumber } from "@/lib/contact";
-import { normalizeExternalUrl, resolveSiteOrigin } from "@/lib/site-config";
+import { siteContent } from "@/content/site";
+import {
+  normalizeExternalUrl,
+  resolveServiceArea,
+  resolveSiteOrigin,
+} from "@/lib/site-config";

const resolvedOrigin = resolveSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL);
-const serviceArea = process.env.NEXT_PUBLIC_SERVICE_AREA?.trim() || null;
+const serviceArea = resolveServiceArea(
+  process.env.NEXT_PUBLIC_SERVICE_AREA,
+  siteContent.business.locality,
+);
```

- [ ] **Step 6: Update the safe environment example and durable agent context**

Apply:

```diff
diff --git a/.env.example b/.env.example
--- a/.env.example
+++ b/.env.example
@@
-# Zona real onde pode existir entrega local ou recolha (por exemplo: "Coimbra e arredores").
-NEXT_PUBLIC_SERVICE_AREA=
+# Zona real onde pode existir entrega local ou recolha.
+NEXT_PUBLIC_SERVICE_AREA=Setúbal
diff --git a/AGENTS.md b/AGENTS.md
--- a/AGENTS.md
+++ b/AGENTS.md
@@
 - Conversion happens through WhatsApp or Instagram so each personalised request can be discussed and quoted directly.
+- The business is based in Setúbal. It has no public customer-facing address; collection in Setúbal is arranged directly, and orders can be shipped to mainland Portugal. Never invent or expose an address, postcode, map pin or opening hours.
 - All public-facing copy must be European Portuguese (`pt-PT`). Do not introduce Brazilian Portuguese wording.
```

- [ ] **Step 7: Run focused and full tests**

Run:

```bash
npm test -- tests/content.test.ts tests/site-config.test.ts
npm test
```

Expected: focused tests PASS; all 14 existing tests plus the 3 new tests PASS (17 total).

- [ ] **Step 8: Commit the typed business context**

```bash
git add types/content.ts content/site.ts lib/site-config.ts config/site.ts .env.example AGENTS.md tests/content.test.ts tests/site-config.test.ts
git commit -m "feat: add Setubal business context"
```

---

### Task 2: Integrate the transparent logo in the header

**Files:**
- Move: `logo.png` → `public/brand/pavio-logo.png`
- Modify: `vitest.config.ts`
- Modify: `components/header.tsx`
- Modify: `app/globals.css`
- Create: `tests/header.test.tsx`

**Interfaces:**
- Consumes: `siteContent.brand.logoPath` and `siteContent.brand.logoAlt` from Task 1.
- Produces: `.brand-logo` wrapper and responsive positioning for the 1254×1254 transparent PNG.

- [ ] **Step 1: Enable TSX tests and add the failing server-render test**

Apply:

```diff
diff --git a/vitest.config.ts b/vitest.config.ts
--- a/vitest.config.ts
+++ b/vitest.config.ts
@@
-    include: ["tests/**/*.test.ts"],
+    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
```

Create `tests/header.test.tsx` with:

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/header";

describe("Header", () => {
  it("usa o logótipo Pavio acessível como identidade principal", () => {
    const html = renderToStaticMarkup(<Header />);

    expect(html).toContain('class="brand-logo"');
    expect(html).toContain('alt="Pavio — Velas que acendem momentos"');
    expect(html).toMatch(/pavio-logo\.png/);
    expect(html).not.toContain("brand-mark");
  });
});
```

- [ ] **Step 2: Run the header test and confirm it fails**

```bash
npm test -- tests/header.test.tsx
```

Expected: FAIL because the current header still renders `.brand-mark` and has no logo image.

- [ ] **Step 3: Move the user-provided transparent asset into public**

Run:

```bash
mkdir -p public/brand
mv logo.png public/brand/pavio-logo.png
file public/brand/pavio-logo.png
```

Expected `file` output: PNG image data, 1254 x 1254, 8-bit/color RGBA.

- [ ] **Step 4: Replace the generated header mark with `next/image`**

Replace `components/header.tsx` with:

```tsx
import Image from "next/image";

import { siteContent } from "@/content/site";

export function Header() {
  const lastIndex = siteContent.navigation.length - 1;

  return (
    <>
      <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>
      <header className="site-header">
        <a className="brand" href="#inicio">
          <span className="brand-logo">
            <Image
              src={siteContent.brand.logoPath}
              alt={siteContent.brand.logoAlt}
              width={1254}
              height={1254}
              sizes="(max-width: 760px) 150px, 190px"
              loading="eager"
            />
          </span>
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

- [ ] **Step 5: Replace obsolete brand CSS with the approved crop**

In `app/globals.css`, replace the declarations from `.brand` through `.brand-flame` with:

```css
.brand { display: inline-flex; align-items: center; flex: none; }
.brand-logo { position: relative; width: 190px; height: 100px; display: block; overflow: hidden; flex: none; }
.brand-logo img { position: absolute; top: -77px; left: -44px; width: 262px; max-width: none; height: auto; }
```

Inside the existing `@media (max-width: 760px)` block, add directly after the `.site-header` rule:

```css
  .brand-logo { width: 150px; height: 79px; }
  .brand-logo img { top: -61px; left: -35px; width: 207px; }
```

- [ ] **Step 6: Run the header test, lint and full tests**

```bash
npm test -- tests/header.test.tsx
npm run lint
npm test
```

Expected: header test PASS, lint exits 0, all 18 tests PASS.

- [ ] **Step 7: Commit the logo integration**

```bash
git add public/brand/pavio-logo.png vitest.config.ts components/header.tsx app/globals.css tests/header.test.tsx
git commit -m "feat: integrate Pavio logo in header"
```

---

### Task 3: Add visible Setúbal copy and local-search metadata

**Files:**
- Modify: `content/site.ts`
- Modify: `components/hero.tsx`
- Modify: `components/order-process.tsx`
- Modify: `components/contacts.tsx`
- Modify: `app/layout.tsx`
- Create: `tests/local-seo.test.tsx`
- Modify: `tests/content.test.ts`

**Interfaces:**
- Consumes: typed `siteContent.business`, `siteContent.seo` and `siteConfig.serviceArea`.
- Produces: visible local facts that match metadata and later JSON-LD.

- [ ] **Step 1: Add failing copy and metadata-source tests**

Create `tests/local-seo.test.tsx`:

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Contacts } from "@/components/contacts";
import { Hero } from "@/components/hero";
import { OrderProcess } from "@/components/order-process";
import { Story } from "@/components/story";

describe("conteúdo local visível", () => {
  it("explica Setúbal, recolha combinada e área de envio", () => {
    const html = renderToStaticMarkup(
      <>
        <Hero />
        <Story />
        <OrderProcess />
        <Contacts />
      </>,
    );

    expect(html).toContain("Atelier em Setúbal");
    expect(html).toContain("Recolha em Setúbal a combinar");
    expect(html).toContain("Envio para Portugal continental");
    expect(html).toContain("atelier em Setúbal");
    expect(html).not.toContain("morada");
  });
});
```

Add inside `describe("siteContent")` in `tests/content.test.ts`:

```tsx
  it("responde de forma explícita sobre a recolha em Setúbal", () => {
    const pickupFaq = siteContent.faqs.find(
      (item) => item.question === "Posso recolher a encomenda em Setúbal?",
    );

    expect(pickupFaq?.answer).toContain("recolha em Setúbal");
    expect(pickupFaq?.answer).toContain("após confirmação da encomenda");
  });
```

- [ ] **Step 2: Run focused tests and confirm they fail**

```bash
npm test -- tests/local-seo.test.tsx tests/content.test.ts
```

Expected: FAIL because the visible copy and collection FAQ do not yet exist.

- [ ] **Step 3: Update reusable content with exact local facts**

Apply these hunks to `content/site.ts`:

```diff
diff --git a/content/site.ts b/content/site.ts
--- a/content/site.ts
+++ b/content/site.ts
@@
     {
       label: "Selo · 04",
-      title: "Feito à mão em Portugal",
+      title: "Feito à mão em Setúbal",
       description: "Pequenos lotes, moldados no nosso atelier.",
@@
     paragraphs: [
       "O Pavio nasceu de uma mesa de cozinha, de tardes a experimentar ceras vegetais e a perseguir uma ideia simples: que uma vela pode ser, ao mesmo tempo, objeto de arte e gesto de afeto.",
-      "Hoje, cada peça continua a ser moldada uma a uma — sem moldes industriais, sem pressa. Escolhemos matérias que respeitam a natureza e desenhamos cada encomenda em conversa com quem a vai receber.",
+      "Hoje, no nosso atelier em Setúbal, cada peça continua a ser moldada uma a uma — sem moldes industriais, sem pressa. Escolhemos matérias que respeitam a natureza e desenhamos cada encomenda em conversa com quem a vai receber.",
@@
     {
       question: "Fazem envios?",
       answer:
-        "Sim, fazemos envios para Portugal continental. A entrega local ou recolha pode estar disponível consoante a zona e é combinada antes da confirmação.",
+        "Sim, fazemos envios para Portugal continental. As condições e o valor do envio são confirmados antes de concluir a encomenda.",
+    },
+    {
+      question: "Posso recolher a encomenda em Setúbal?",
+      answer:
+        "Sim. A recolha em Setúbal pode ser combinada diretamente com o atelier, de acordo com a disponibilidade e após confirmação da encomenda.",
```

- [ ] **Step 4: Bind visible sections to the typed business values**

Apply:

```diff
diff --git a/components/hero.tsx b/components/hero.tsx
--- a/components/hero.tsx
+++ b/components/hero.tsx
@@
 import { ContactActions } from "@/components/contact-actions";
+import { siteContent } from "@/content/site";
@@
-        <p className="eyebrow">Feitas à mão · Ceras 100% naturais</p>
+        <p className="eyebrow">Atelier em {siteContent.business.locality} · Ceras 100% naturais</p>
@@
-        <p className="hero-note">Orçamento personalizado · Envio para Portugal continental</p>
+        <p className="hero-note">{siteContent.business.pickupLabel} · Envio para {siteContent.business.shippingArea}</p>
diff --git a/components/order-process.tsx b/components/order-process.tsx
--- a/components/order-process.tsx
+++ b/components/order-process.tsx
@@
-        <div><h3>Do atelier até si</h3><p>Fazemos envios para Portugal continental. A entrega local ou recolha é combinada consoante a zona{siteConfig.serviceArea ? ` — atualmente, ${siteConfig.serviceArea}` : " e a disponibilidade do atelier"}.</p></div>
+        <div><h3>Do atelier até si</h3><p>Fazemos envios para {siteContent.business.shippingArea}. A recolha em {siteConfig.serviceArea} é combinada diretamente com o atelier após confirmação da encomenda.</p></div>
diff --git a/components/contacts.tsx b/components/contacts.tsx
--- a/components/contacts.tsx
+++ b/components/contacts.tsx
@@
 import { ContactActions } from "@/components/contact-actions";
 import { siteConfig } from "@/config/site";
+import { siteContent } from "@/content/site";
@@
-        <p>Conte-nos a ocasião, o ambiente ou a pessoa que tem em mente. Respondemos com disponibilidade e um orçamento à medida.</p>
+        <p>Esteja em {siteContent.business.locality} ou noutra zona de {siteContent.business.shippingArea}, conte-nos a ocasião, o ambiente ou a pessoa que tem em mente. Respondemos com disponibilidade e um orçamento à medida.</p>
```

- [ ] **Step 5: Source all homepage metadata from typed SEO content**

Apply:

```diff
diff --git a/app/layout.tsx b/app/layout.tsx
--- a/app/layout.tsx
+++ b/app/layout.tsx
@@
-const description =
-  "Velas artísticas e personalizadas em ceras naturais sem parafina, criadas à mão para presentes, celebrações e decoração.";
-
 export const metadata: Metadata = {
@@
-    default: "Pavio Atelier Natural | Velas artísticas personalizadas",
+    default: siteContent.seo.title,
@@
-  description,
+  description: siteContent.seo.description,
@@
-    title: "Pavio Atelier Natural | Velas artísticas personalizadas",
-    description,
+    title: siteContent.seo.title,
+    description: siteContent.seo.description,
@@
-    title: "Pavio Atelier Natural | Velas artísticas personalizadas",
-    description,
+    title: siteContent.seo.title,
+    description: siteContent.seo.description,
```

- [ ] **Step 6: Run focused tests, full tests and lint**

```bash
npm test -- tests/local-seo.test.tsx tests/content.test.ts
npm test
npm run lint
```

Expected: focused tests PASS, all 20 tests PASS, lint exits 0.

- [ ] **Step 7: Commit visible local discovery changes**

```bash
git add content/site.ts components/hero.tsx components/order-process.tsx components/contacts.tsx app/layout.tsx tests/local-seo.test.tsx tests/content.test.ts
git commit -m "feat: add Setubal local discovery copy"
```

---

### Task 4: Build tested Organization and FAQ structured data

**Files:**
- Create: `lib/structured-data.ts`
- Modify: `app/page.tsx`
- Create: `tests/structured-data.test.ts`

**Interfaces:**
- Produces: `HomeStructuredDataInput` and `buildHomeStructuredData(input)`.
- Consumes: explicit origin, content, optional Instagram/WhatsApp configuration and visible FAQ content.
- Produces: serialisable `@graph` containing `Organization`, `WebSite` and `FAQPage`, with no physical-address claims.

- [ ] **Step 1: Add failing structured-data tests**

Create `tests/structured-data.test.ts`:

```ts
import { describe, expect, it } from "vitest";

import { buildHomeStructuredData } from "@/lib/structured-data";

const baseInput = {
  origin: "https://pavio.example",
  name: "Pavio Atelier Natural",
  description: "Velas feitas à mão em Setúbal.",
  logoPath: "/brand/pavio-logo.png",
  instagramUrl: null,
  whatsappNumber: null,
  locality: "Setúbal",
  countryName: "Portugal",
  shippingArea: "Portugal continental",
  faqs: [
    {
      question: "Posso recolher a encomenda em Setúbal?",
      answer: "Sim. A recolha é combinada após confirmação.",
    },
  ],
};

describe("buildHomeStructuredData", () => {
  it("descreve a organização e as áreas servidas sem morada física", () => {
    const data = buildHomeStructuredData(baseInput);
    const graph = data["@graph"] as Array<Record<string, unknown>>;
    const organization = graph.find(
      (node) => node["@type"] === "Organization",
    );
    const serialized = JSON.stringify(data);

    expect(organization?.logo).toBe(
      "https://pavio.example/brand/pavio-logo.png",
    );
    expect(organization?.areaServed).toEqual([
      {
        "@type": "City",
        name: "Setúbal",
        containedInPlace: { "@type": "Country", name: "Portugal" },
      },
      { "@type": "AdministrativeArea", name: "Portugal continental" },
    ]);
    expect(serialized).not.toContain("LocalBusiness");
    expect(serialized).not.toContain("PostalAddress");
    expect(serialized).not.toContain("streetAddress");
    expect(serialized).not.toContain("openingHours");
    expect(serialized).not.toContain("geo");
  });

  it("inclui contactos apenas quando foram validados", () => {
    const withoutContacts = buildHomeStructuredData(baseInput);
    const withContacts = buildHomeStructuredData({
      ...baseInput,
      instagramUrl: "https://instagram.com/pavio/",
      whatsappNumber: "351912345678",
    });
    const withoutOrganization = withoutContacts["@graph"].find(
      (node) => node["@type"] === "Organization",
    );
    const withOrganization = withContacts["@graph"].find(
      (node) => node["@type"] === "Organization",
    );

    expect(withoutOrganization).not.toHaveProperty("sameAs");
    expect(withoutOrganization).not.toHaveProperty("telephone");
    expect(withOrganization).toMatchObject({
      sameAs: ["https://instagram.com/pavio/"],
      telephone: "+351912345678",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+351912345678",
        contactType: "customer service",
        availableLanguage: "pt-PT",
      },
    });
  });

  it("espelha as perguntas frequentes visíveis", () => {
    const data = buildHomeStructuredData(baseInput);
    const faqPage = data["@graph"].find(
      (node) => node["@type"] === "FAQPage",
    );

    expect(faqPage?.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "Posso recolher a encomenda em Setúbal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sim. A recolha é combinada após confirmação.",
        },
      },
    ]);
  });
});
```

- [ ] **Step 2: Run the focused test and confirm it fails**

```bash
npm test -- tests/structured-data.test.ts
```

Expected: FAIL because `@/lib/structured-data` does not exist.

- [ ] **Step 3: Implement the pure graph builder**

Create `lib/structured-data.ts`:

```ts
import type { FaqItem } from "@/types/content";

export type HomeStructuredDataInput = {
  origin: string;
  name: string;
  description: string;
  logoPath: `/${string}`;
  instagramUrl: string | null;
  whatsappNumber: string | null;
  locality: string;
  countryName: string;
  shippingArea: string;
  faqs: FaqItem[];
};

type StructuredDataNode = Record<string, unknown>;

export function buildHomeStructuredData(input: HomeStructuredDataInput) {
  const telephone = input.whatsappNumber
    ? `+${input.whatsappNumber}`
    : null;
  const organization: StructuredDataNode = {
    "@type": "Organization",
    "@id": `${input.origin}/#organization`,
    name: input.name,
    url: input.origin,
    description: input.description,
    logo: `${input.origin}${input.logoPath}`,
    areaServed: [
      {
        "@type": "City",
        name: input.locality,
        containedInPlace: {
          "@type": "Country",
          name: input.countryName,
        },
      },
      {
        "@type": "AdministrativeArea",
        name: input.shippingArea,
      },
    ],
  };

  if (input.instagramUrl) {
    organization.sameAs = [input.instagramUrl];
  }

  if (telephone) {
    organization.telephone = telephone;
    organization.contactPoint = {
      "@type": "ContactPoint",
      telephone,
      contactType: "customer service",
      availableLanguage: "pt-PT",
    };
  }

  const website: StructuredDataNode = {
    "@type": "WebSite",
    "@id": `${input.origin}/#website`,
    name: input.name,
    url: input.origin,
    inLanguage: "pt-PT",
    publisher: { "@id": `${input.origin}/#organization` },
  };

  const faqPage: StructuredDataNode = {
    "@type": "FAQPage",
    "@id": `${input.origin}/#faq`,
    mainEntity: input.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website, faqPage],
  };
}
```

- [ ] **Step 4: Replace inline graph construction in the homepage**

In `app/page.tsx`, add:

```ts
import { buildHomeStructuredData } from "@/lib/structured-data";
```

Replace the current `organization` and `jsonLd` declarations with:

```ts
  const jsonLd = buildHomeStructuredData({
    origin: siteConfig.origin,
    name: siteContent.brand.name,
    description: siteContent.seo.description,
    logoPath: siteContent.brand.logoPath,
    instagramUrl: siteConfig.instagramUrl,
    whatsappNumber: siteConfig.whatsappNumber,
    locality: siteContent.business.locality,
    countryName: siteContent.business.countryName,
    shippingArea: siteContent.business.shippingArea,
    faqs: siteContent.faqs,
  });
```

Keep the existing native script and exact safe serialization:

```tsx
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
```

- [ ] **Step 5: Run focused tests, full tests and lint**

```bash
npm test -- tests/structured-data.test.ts
npm test
npm run lint
```

Expected: structured-data tests PASS, all 23 tests PASS, lint exits 0.

- [ ] **Step 6: Commit structured data**

```bash
git add lib/structured-data.ts app/page.tsx tests/structured-data.test.ts
git commit -m "feat: enrich structured data for local discovery"
```

---

### Task 5: Verify the complete implementation and publish the branch

**Files:**
- Verify: all files changed by Tasks 1–4
- No planned source edits; create a fix commit only if verification exposes a real defect.

**Interfaces:**
- Consumes: complete logo, local-copy, metadata and JSON-LD implementation.
- Produces: verified remote branch ready for code review and PR.

- [ ] **Step 1: Run the full automated verification from a clean dependency state**

```bash
npm test
npm run lint
npm run build
git diff --check
```

Expected:

- Vitest reports 23 passing tests and 0 failures.
- ESLint exits 0 with no errors.
- Next.js 16.2.10 completes TypeScript checking and static generation.
- `git diff --check` prints no output.

- [ ] **Step 2: Inspect repository and commit scope**

```bash
git status --short --branch
git log --format='%h | %an <%ae> | %s%n%b' origin/main..HEAD
git diff --stat origin/main...HEAD
```

Expected:

- Working tree is clean.
- Commits use only the repository owner's identity and contain no AI/co-author trailers.
- The branch contains the existing `AGENTS.md` context commit, the approved design/plan documents and the four implementation commits.

- [ ] **Step 3: Perform the manual responsive and semantic review**

Run:

```bash
npm run dev
```

Inspect `http://localhost:3000` at approximately 1440 px, 1024 px, 760 px and 375 px widths. Confirm:

- the logo shows its full wordmark and tagline with no visible square background;
- the desktop lockup is approximately 190×100 px and the mobile lockup approximately 150×79 px;
- navigation never overlaps the logo and remains keyboard accessible;
- the existing H1, skip link and focus styles remain present;
- Setúbal, arranged collection and mainland-Portugal shipping are visible but not repetitive;
- the page contains no public address, map, coordinates or opening hours.

Stop the development server after inspection.

- [ ] **Step 4: Inspect generated metadata and structured data**

With the development server running, inspect the returned HTML:

```bash
curl -s http://localhost:3000 | rg -o '<title>[^<]+|name="description" content="[^"]+|application/ld\+json|Setúbal|pavio-logo\.png' | sort -u
```

Expected output includes:

- `Velas artesanais personalizadas em Setúbal | Pavio`;
- the approved local description;
- `application/ld+json`;
- `Setúbal`;
- `pavio-logo.png`.

- [ ] **Step 5: Push the verified branch**

```bash
git push
git ls-remote origin refs/heads/feat/logo-setubal-seo
git rev-parse HEAD
```

Expected: the remote and local commit hashes are identical.

- [ ] **Step 6: Request code review before opening or merging a PR**

Review the complete diff against `docs/superpowers/specs/2026-07-15-logo-setubal-seo-design.md`, prioritising correctness, accessibility, truthful local claims, responsive behaviour and regressions. Do not merge to `main` or rewrite history without explicit user approval.

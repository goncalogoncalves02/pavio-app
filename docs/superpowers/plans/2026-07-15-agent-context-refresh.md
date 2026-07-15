# Agent Context Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Atualizar o `AGENTS.md` com o estado atual da Pavio e o fluxo de trabalho durável acordado com o proprietário.

**Architecture:** A alteração é exclusivamente documental e mantém o `AGENTS.md` como fonte versionada de contexto durável. O conteúdo existente será atualizado por secção, preservando as regras ainda válidas e acrescentando apenas factos confirmados após as PRs #1 e #2.

**Tech Stack:** Markdown, Git e GitHub.

## Global Constraints

- Todo o texto dirigido ao proprietário e todo o copy público deve usar português de Portugal (`pt-PT`).
- Não alterar código de produção, configuração, estilos, assets ou testes.
- Não criar worktrees; trabalhar no branch Git normal `agent/refresh-project-context`.
- Usar conventional commits em inglês e apenas a identidade Git configurada do proprietário.
- Nunca incluir atribuição, autoria ou coautoria de ferramentas ou agentes em commits ou PRs.
- O proprietário faz o merge para `main`; não fazer merge sem autorização explícita.
- `AI_HANDOFF.md` e `.superpowers/` continuam a ser artefactos locais ignorados, exceto os documentos de spec/plano versionados em `docs/superpowers/`.

---

### Task 1: Atualizar o manual durável do repositório

**Files:**
- Modify: `AGENTS.md`
- Verify: `docs/superpowers/specs/2026-07-15-agent-context-refresh-design.md`

**Interfaces:**
- Consumes: estado de `main` após as PRs #1 e #2 e decisões aprovadas no design.
- Produces: um `AGENTS.md` autocontido para orientar sessões futuras.

- [ ] **Step 1: Confirmar a baseline antes da edição**

Run:

```bash
git status -sb
git log -3 --oneline
rg -n "Pavio Luxo|public/brand/pavio-logo.png|25 testes|subagentes|Context7" AGENTS.md
```

Expected:

- o branch é `agent/refresh-project-context` e não existem alterações alheias;
- `main` contém o merge da PR #2;
- o `AGENTS.md` menciona Pavio Luxo, mas ainda não contém todos os restantes marcadores duráveis.

- [ ] **Step 2: Atualizar o estado atual do produto**

Em `## Product`, substituir a referência isolada ao redesign por este bloco:

```markdown
- The current visual baseline combines the “Pavio Luxo” redesign merged in PR #1 with the transparent-logo and Setúbal discovery work merged in PR #2. Preserve its editorial, artisanal and premium direction unless the user requests a redesign.
- The approved header identity uses `public/brand/pavio-logo.png` through `next/image`. Its transparent asset, visible tagline and responsive crop are approved together; do not replace, recolour or recrop them without visual validation.
```

Ainda em `## Product`, preservar sem alterações a regra de que não existe morada pública e que a recolha em Setúbal é combinada.

- [ ] **Step 3: Atualizar arquitetura e SEO**

Em `## Stack and architecture`, acrescentar:

```markdown
- `lib/structured-data.ts` builds the homepage `Organization`, `WebSite` and `FAQPage` graph from typed, verified content. Keep structured FAQs identical to the visible FAQ source.
```

Em `## Styling and assets`, acrescentar:

```markdown
- The header logo is `public/brand/pavio-logo.png`, an approved transparent 1254×1254 PNG cropped responsively by `.brand-logo`. Preserve the current desktop and mobile crop unless a new visual review approves different coordinates.
```

Em `## SEO and production configuration`, acrescentar depois da lista de superfícies SEO:

```markdown
- The verified local schema uses `Organization`, not `LocalBusiness`, with Setúbal as a served city and mainland Portugal as the wider shipping area. Do not emit `PostalAddress`, `address`, postcode, map, `geo`, latitude/longitude or opening hours unless the owner confirms new public business facts.
- Brand name, logo, business facts, reusable SEO copy and visible FAQs come from `content/site.ts`; metadata, Open Graph output and JSON-LD must remain aligned with that source.
```

- [ ] **Step 4: Atualizar verificações e fluxo de trabalho**

Substituir `## Quality checks` por:

```markdown
## Quality checks

- The current baseline has 25 Vitest tests across eight files. Treat the count as a snapshot, not a target; update tests whenever contracts change.
- Before declaring implementation complete, run fresh `npm test`, `npm run lint`, `npx tsc --noEmit --incremental false`, `npm run build` and `git diff --check` evidence.
- The production build may require network access for the existing Google Fonts. A sandbox network failure is not a product failure; rerun with approved network access and report both outcomes accurately.
- Check responsive layouts, keyboard navigation, focus, accessible names and reduced-motion behaviour when changing UI, not only the desktop appearance.
```

Substituir `## Git and agent workflow` por:

```markdown
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
```

Acrescentar a secção final:

```markdown
## Documentation and communication

- Write all user-facing communication and all public copy in European Portuguese (`pt-PT`) unless the owner explicitly requests another language.
- For Next.js APIs, read the relevant installed-version documentation in `node_modules/next/dist/docs/` before coding. For other libraries, frameworks, SDKs, APIs, CLI tools or cloud services, consult current documentation through Context7 when available.
- Prefer concise, evidence-backed progress updates. Report blockers, failed checks and residual manual verification honestly.
```

- [ ] **Step 5: Rever o conteúdo documental**

Run:

```bash
rg -n "worktree|25 Vitest|LocalBusiness|Context7|owner performs the merge" AGENTS.md
git diff -- AGENTS.md
git diff --check
```

Expected:

- nenhum placeholder;
- referências explícitas ao estado atual, restrições locais, verificações, subagentes, code review, Context7 e merge pelo proprietário;
- nenhuma regra permite worktrees, atribuição de agentes, morada pública ou merge autónomo;
- `git diff --check` não apresenta output.

- [ ] **Step 6: Confirmar scope e commit**

Run:

```bash
git status --short
git diff --stat
```

Expected: apenas `AGENTS.md` está modificado nesta fase de implementação.

Commit:

```bash
git add AGENTS.md
git diff --cached --check
git commit -m "docs: refresh durable project context"
```

- [ ] **Step 7: Publicar e abrir PR documental**

Run:

```bash
git push
git status -sb
```

Expected: branch sincronizado com `origin/agent/refresh-project-context` e working tree limpo.

Abrir uma PR para `main` com resumo do contexto atualizado, motivo, impacto nas sessões futuras e verificações documentais. Deixá-la pronta para revisão, porque o proprietário fará o merge.

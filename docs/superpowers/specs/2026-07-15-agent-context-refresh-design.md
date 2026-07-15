# Atualização do contexto durável do projeto

## Objetivo

Atualizar o `AGENTS.md` para que uma sessão futura consiga compreender rapidamente o estado atual da Pavio, as decisões de produto já validadas e o fluxo de trabalho acordado com o proprietário, sem depender do historial da conversa nem do ficheiro local `AI_HANDOFF.md`.

## Princípio editorial

O `AGENTS.md` deve funcionar como manual durável do repositório, não como diário de sessões. Deve guardar apenas factos atuais, restrições vinculativas e procedimentos que deverão continuar a ser aplicados. Referências históricas só permanecem quando explicam uma decisão que seria fácil desfazer por engano.

## Estado do produto a registar

- O redesign editorial “Pavio Luxo” foi integrado em `main` através da PR #1.
- O logótipo transparente, o contexto local de Setúbal e as melhorias de SEO/AEO/GEO/AIO foram integrados através da PR #2.
- O cabeçalho usa `public/brand/pavio-logo.png` através de `next/image`, com um recorte responsivo já aprovado. O asset, a tagline e as coordenadas do recorte não devem ser alterados sem nova validação visual.
- O conteúdo público identifica o atelier em Setúbal, a recolha em Setúbal mediante combinação e os envios para Portugal continental. Não existe loja nem morada pública.
- A origem da marca, dos factos empresariais e do conteúdo SEO reutilizável é `content/site.ts`, tipado por `types/content.ts`.
- Os dados estruturados da homepage são construídos em `lib/structured-data.ts` e limitam-se a `Organization`, `WebSite` e `FAQPage`. Não devem ser introduzidos morada, coordenadas, mapa, horários ou o tipo `LocalBusiness` sem factos novos confirmados pelo proprietário.
- A imagem Open Graph consome a tagline tipada da marca.
- A suite atual contém 25 testes distribuídos por oito ficheiros.

## Fluxo de trabalho a registar

### Preparação e Git

1. Ler `AGENTS.md`, inspecionar o estado do repositório e o historial recente antes de alterar ficheiros.
2. Sincronizar `main` e criar um branch Git normal para cada alteração. Não criar worktrees.
3. Publicar o branch no GitHub cedo e continuar a trabalhar no mesmo branch até à revisão.
4. Preservar alterações do proprietário e não misturar mudanças sem relação com a tarefa.
5. Usar conventional commits em inglês e apenas a identidade Git configurada do proprietário. Nunca incluir atribuição, autoria ou coautoria de ferramentas ou agentes.
6. Não fazer merge para `main`, force-push, reescrita de historial ou remoção de branches sem autorização explícita. Por defeito, o proprietário faz o merge da PR.

### Implementação e delegação

1. Para alterações não triviais, clarificar o resultado pretendido e manter um plano verificável antes da implementação.
2. Aplicar TDD a funcionalidades e correções: produzir uma falha RED relevante, implementar a mudança mínima e confirmar GREEN.
3. Usar subagentes para tarefas delimitadas quando o proprietário o pedir ou quando a decomposição trouxer benefício claro. Cada agente deve receber scope, restrições, testes e formato de entrega explícitos.
4. Rever cada entrega antes de a aceitar. Para trabalho relevante, usar uma revisão independente e terminar com code review integral do branch pelo agente principal.
5. Findings Critical ou Important devem ser corrigidos e novamente revistos. Divergências que alterem decisões aprovadas exigem validação do proprietário.

### Verificação e publicação

1. Antes de declarar conclusão, executar evidência fresca: `npm test`, `npm run lint`, `npx tsc --noEmit --incremental false`, `npm run build` e `git diff --check`.
2. Para alterações visuais, verificar também breakpoints relevantes, navegação por teclado, foco e acessibilidade. O build pode necessitar de rede para obter as Google Fonts existentes.
3. Inspecionar o diff completo, o scope dos commits e a identidade dos autores antes do push final.
4. Abrir uma PR para `main` com resumo, motivo, impacto e verificações. Quando todo o trabalho já estiver validado e o proprietário pretender fazer merge, deixar a PR pronta para revisão, não em draft.

## Documentação e comunicação

- Todo o copy público e toda a comunicação dirigida ao proprietário devem usar português de Portugal (`pt-PT`).
- Para APIs de Next.js, consultar primeiro a documentação local da versão instalada. Para outras bibliotecas, frameworks, SDKs, APIs, CLIs ou serviços cloud, consultar documentação atual através do Context7 quando estiver disponível.
- `AI_HANDOFF.md` e `.superpowers/` continuam a ser artefactos locais ignorados. O contexto necessário para outra sessão deve ficar no `AGENTS.md` ou em documentação versionada apropriada.

## Fora de scope

- Não alterar código de produção, copy público, estilos, configuração, assets ou testes nesta tarefa.
- Não transformar o `AGENTS.md` num registo completo de commits ou num resumo cronológico de todas as sessões.
- Não guardar nomes de modelos, ferramentas temporárias ou detalhes de execução que possam ficar rapidamente desatualizados.

## Verificação da atualização

- Comparar o novo `AGENTS.md` com o estado de `main` após a PR #2.
- Confirmar que não existem contradições entre as regras de Git, a preferência por branches normais, o uso de subagentes e a responsabilidade do proprietário pelo merge.
- Confirmar que todos os comandos, caminhos e contagens indicados existem no repositório atual.
- Executar `git diff --check` e rever o diff documental completo antes do commit e da PR.

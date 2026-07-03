# Portal Institucional e Transparência — Capela de Santana/RS

Protótipo de demonstração para proposta comercial: site institucional + Portal da
Transparência para a Prefeitura Municipal de Capela de Santana (RS).

> **Ambiente de demonstração.** Todo o conteúdo (notícias, secretarias, dados
> orçamentários, servidores, obras, licitações etc.) é **fictício e ilustrativo**,
> usado apenas para validar layout, navegação e arquitetura. Nenhum valor deve ser
> interpretado como dado oficial real da Prefeitura.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Exportação estática (`output: "export"` em `next.config.ts`) — o site roda como
  arquivos estáticos, sem servidor Node em produção
- Leaflet + OpenStreetMap (mapa de obras, sem chave de API)
- `lucide-react` para ícones

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

Para gerar o build estático (usado em produção):

```bash
npm run build
```

Os arquivos estáticos são gerados em `out/`.

## Estrutura do projeto

```
src/
  app/                 # rotas (App Router)
    transparencia/      # Portal da Transparência (rota /transparencia/**)
  components/
    layout/             # Header, Footer, AccessibilityBar, Drawer, Breadcrumbs
    shared/              # ServiceCard, NewsCard, Badge, SearchBar, Pagination, WhatsAppButton, Brasao
    transparencia/       # TransparencyTable, FilterBar, ObrasMap
  data/                 # JSON mock — um arquivo por domínio
  services/             # camada de acesso a dados (assinatura final da API real)
  types/                # contratos de dados (TypeScript) por domínio
  lib/                  # constantes institucionais (endereço, telefone, WhatsApp etc.)
```

## Onde ficam os dados mock e como trocar por API real

Todo conteúdo dinâmico é lido de arquivos JSON em `src/data/` através de funções
tipadas em `src/services/`. **Nenhum componente ou página lê os JSONs diretamente**
— todos passam pela camada de serviço. Isso significa que substituir os dados mock
por uma API real é uma mudança isolada: basta reescrever o corpo das funções em
`src/services/*.ts` para fazer `fetch` em vez de ler o JSON local. As assinaturas
(nome da função, parâmetros, tipo de retorno) já são as que o back-end deverá
implementar — nenhuma página ou componente precisa mudar.

Exemplo (`src/services/receitas.service.ts`):

```ts
// Hoje (mock):
export async function getReceitas(filtro?: FiltroAnoOrgao): Promise<Receita[]> {
  return receitas.filter(/* ... */);
}

// Amanhã (API real) — mesma assinatura, corpo diferente:
export async function getReceitas(filtro?: FiltroAnoOrgao): Promise<Receita[]> {
  const params = new URLSearchParams();
  if (filtro?.ano) params.set("ano", String(filtro.ano));
  if (filtro?.orgao) params.set("orgao", filtro.orgao);
  const res = await fetch(`${API_BASE_URL}/receitas?${params}`);
  return res.json();
}
```

## Contrato de integração para o time de back-end

Cada tipo TypeScript em `src/types/` é o contrato exato que a tela espera. A tabela
abaixo mapeia cada domínio ao endpoint que o back-end deverá expor para substituir o
mock (método, filtros e formato de resposta = o tipo TypeScript correspondente).

| Domínio | Tipo (`src/types/`) | Serviço (`src/services/`) | Endpoint esperado | Filtros |
|---|---|---|---|---|
| Notícias | `Noticia` | `noticias.service.ts` | `GET /api/noticias` | — |
| Notícia (detalhe) | `Noticia` | `getNoticiaBySlug` | `GET /api/noticias/:slug` | — |
| Secretarias | `Secretaria` | `secretarias.service.ts` | `GET /api/secretarias` | — |
| Serviços ao cidadão | `Servico` | `servicos.service.ts` | `GET /api/servicos` | — |
| Serviço (detalhe) | `Servico` | `getServicoBySlug` | `GET /api/servicos/:slug` | — |
| Eventos/Agenda | `Evento` | `eventos.service.ts` | `GET /api/eventos` | — |
| Receitas | `Receita` | `receitas.service.ts` | `GET /api/transparencia/receitas` | `ano`, `orgao` |
| Despesas | `Despesa` | `despesas.service.ts` | `GET /api/transparencia/despesas` | `ano`, `orgao` |
| Servidores/Pessoal | `Servidor` | `servidores.service.ts` | `GET /api/transparencia/servidores` | `mesReferencia` |
| Patrimônio | `BemPatrimonial` | `patrimonio.service.ts` | `GET /api/transparencia/patrimonio` | — |
| Licitações | `Licitacao` | `licitacoes.service.ts` | `GET /api/transparencia/licitacoes` | `ano`, `orgao` |
| Contratos | `Contrato` | `contratos.service.ts` | `GET /api/transparencia/contratos` | `ano` |
| Obras | `Obra` | `obras.service.ts` | `GET /api/transparencia/obras` | `status` |
| Parcerias/Convênios | `Parceria` | `parcerias.service.ts` | `GET /api/transparencia/parcerias` | — |
| Orçamento (PPA/LDO/LOA/RREO/RGF) | `DocumentoOrcamentario` | `orcamento.service.ts` | `GET /api/transparencia/orcamento` | `tipo`, `ano` |
| Dados abertos | `ConjuntoDadosAbertos` | `dadosAbertos.service.ts` | `GET /api/transparencia/dados-abertos` | — |
| FAQ da LAI | `FaqItem` | `faq.service.ts` | `GET /api/transparencia/faq` | — |
| e-SIC (solicitação) | `SolicitacaoESic` | simulado no cliente | `POST /api/esic` | — |
| Ouvidoria (manifestação) | `ManifestacaoOuvidoria` | simulado no cliente | `POST /api/ouvidoria` | — |

Todo endpoint de listagem deve retornar um array no formato exato do tipo TypeScript
correspondente (ver `src/types/*.ts`). Os campos são todos obrigatórios, exceto os
marcados como opcionais (`?`) na definição do tipo.

**e-SIC e Ouvidoria** hoje rodam 100% no cliente (sem backend): ao enviar o
formulário, o número de protocolo é gerado no navegador e não persiste em lugar
nenhum. Para produção, essas telas precisam de um `POST` real que grave a
solicitação e retorne um protocolo definitivo, com uma tela de consulta por
protocolo (`GET /api/esic/:protocolo`, `GET /api/ouvidoria/:protocolo`).

## O que precisa de dado/integração real antes de produção

- [x] Brasão oficial do município aplicado (`public/brasao/brasao-capela-de-santana.png`,
      componente `src/components/shared/Brasao.tsx`).
- [ ] Substituir o número de WhatsApp placeholder em `src/lib/constants.ts`
      (`WHATSAPP_NUMERO`) pelo número oficial da Prefeitura.
- [ ] Trocar todos os arquivos em `src/data/*.json` por integração real com os
      sistemas da Prefeitura (contabilidade, RH, licitações, etc.), seguindo o
      contrato de tipos documentado acima.
- [ ] Implementar backend real para e-SIC e Ouvidoria (hoje simulados no cliente).
- [ ] Revisar textos institucionais ilustrativos (história do município, dados
      gerais em `/municipio`) com informações oficiais confirmadas pela Prefeitura.
- [ ] Habilitar a integração oficial do VLibras, hoje comentada em
      `src/components/layout/AccessibilityBar.tsx` (desabilitada por padrão pois
      carrega script de terceiro, que pode ser bloqueado em alguns ambientes de
      demonstração).
- [ ] Configurar `SITE_URL` em `src/lib/constants.ts` com o domínio final (usado em
      metadata, Open Graph, sitemap e robots.txt).
- [ ] Substituir as imagens ilustrativas de notícias (`public/images/noticias/`) por
      fotos reais.

## Acessibilidade

O projeto segue diretrizes do eMAG e WCAG 2.1 nível AA: skip links, barra de
acessibilidade (aumento/diminuição de fonte, alto contraste, VLibras), navegação
100% por teclado, `aria-label` em ícones-botão, contraste mínimo 4.5:1, foco visível
e HTML semântico. Tabelas do Portal da Transparência viram cards empilhados em telas
menores que 768px (nunca estouram a largura da tela).

## Responsividade

Mobile-first, testado mentalmente contra os breakpoints 360, 390, 768, 1024, 1280 e
1440px. Menu principal usa drawer com foco preso (focus trap) em telas menores que
1024px.

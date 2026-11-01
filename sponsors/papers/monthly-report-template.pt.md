<!-- title: Relatório mensal do patrocinador · modelo -->
# Relatório mensal do patrocinador: modelo

Um relatório por patrocinador e por mês, na língua do patrocinador (português ou inglês), entregue em PDF nos primeiros dez dias úteis do mês seguinte (contrato, cláusula 2.ª, n.º 2.1). Só números agregados: sem nome, contacto ou outro elemento que identifique um leitor (cláusula 6.ª, n.º 6.4). Cada secção indica a fonte e o período; uma secção sem dados diz "sem dados ainda", nunca uma estimativa.

**Como se gera:** `/sponsor-report <empresa> <mês>`, que corre

`node scripts/sponsor-report.mjs "<empresa>" <AAAA-MM> --in dados.json [--lang pt|en] [--out ficheiro.pdf] [--md]`

e escreve, por omissão, `sponsors/reports/<empresa>_<AAAA-MM>_<língua>.pdf`. O Cloudflare Web Analytics, a plataforma da carta e o registo de pedidos ainda não estão ligados, por isso os números vêm do ficheiro JSON; há um exemplo em `sponsors/papers/monthly-report.sample.json`.

## As secções

### Cabeçalho

O mês, o patrocinador, o empreendimento e o município, com a linha "Números agregados, sem dados pessoais".

### 1. Alcance por edição

Uma linha por edição (Luxemburgo, França, Suíça, Brasil, Estados Unidos, Israel) e o total: subscritores da carta no fim do mês, cartas enviadas, aberturas, visitas ao site. Fonte: a plataforma da carta e o Cloudflare Web Analytics.

### 2. A página do empreendimento

Visualizações da página do empreendimento, aberturas do pin no mapa, visualizações do cartão no Concierge e na pesquisa, cliques no cartão; depois as visualizações da página por edição. Fonte: Cloudflare Web Analytics.

### 3. Pedidos e resumos qualificados

O número de pedidos no mês e por edição e, depois, uma linha por pedido com o resumo qualificado: data, edição, tipologia, escalão de orçamento, forma de pagamento, prazo, tipo de visita, estado. Cada pedido foi apenas para o consultor qualificado da agência parceira (D66). O script recusa qualquer outro campo e qualquer valor que pareça um endereço de correio ou um número de telefone.

### 4. O cartão do índice do município

A pontuação do município em 100, a posição entre os 308 municípios, a pontuação de cada pilar e a data dos dados, com a linha "O índice e a sua pontuação nunca são influenciados pelo patrocínio". Fonte: o índice (content/data/INDEX_METHOD.md).

### 5. Disponibilidade

Frações listadas, disponíveis, reservadas e vendidas no fim do mês, segundo a tabela de disponibilidade do promotor.

### Notas

Linhas opcionais do operador (por exemplo, uma alteração de disponibilidade ou uma data de carta adiada).

## O ficheiro JSON

| Campo | Conteúdo |
| --- | --- |
| `company`, `project`, `municipality`, `month`, `lang` | o cabeçalho; `company` e `month` são comparados com a linha de comando |
| `reach.editions.<lu,fr,ch,br,us,il>` | `subscribers`, `letters_sent`, `opens`, `site_visits` |
| `showcase` | `page_views`, `pin_opens`, `card_views`, `card_clicks`, `by_edition.<edição>` |
| `requests` | `total`, `by_edition.<edição>`, `summaries[]` apenas com `date`, `edition`, `typology`, `budget_band`, `payment`, `timeline`, `visit`, `status` |
| `index_card` | `municipality`, `score`, `rank`, `of`, `pillars[]` (`name`, `score`), `as_of`, `url` |
| `availability` | `listed`, `available`, `reserved`, `sold` |
| `notes[]` | linhas livres, sem dados pessoais |
| `<secção>.source` | substitui a linha de fonte por omissão dessa secção |

Uma secção que falte imprime "sem dados ainda".

## O que o relatório nunca contém

Nomes, endereços de correio, telefones ou mensagens dos leitores; estimativas apresentadas como medições; qualquer promessa de pedidos ou de vendas. O relatório mostra o que foi medido, com a fonte.

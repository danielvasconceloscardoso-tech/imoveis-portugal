# Issue 10 — Câmbio e distribuição

## Câmbio usado pelo protótipo

O visitante declara o seu **líquido**, na moeda do país. Não é calculado nenhum imposto estrangeiro.

| País | Moeda | Unidades por 1 EUR | Data da observação |
| --- | --- | ---: | --- |
| Luxemburgo, França, Portugal, Alemanha, Bélgica, Espanha, Irlanda, Países Baixos, Áustria e Itália | EUR | 1 | Conversão identidade; não depende de câmbio |
| Suíça | CHF | 0,9227 | 23-10-2026 |
| Estados Unidos | USD | 1,1193 | 23-10-2026 |
| Brasil | BRL | 5,6485 | 23-10-2026 |
| Israel | ILS | 3,4939 | 23-10-2026 |

Estes valores vêm dos registos `ecb-eur-chf`, `ecb-eur-usd`, `ecb-eur-brl` e `ecb-eur-ils` de [facts.csv](../content/facts/facts.csv), que indicam consulta em **25-10-2026**. São um snapshot herdado, **não uma cotação de novembro nem uma observação obtida nesta sessão**. A fonte original é o [XML diário do BCE](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml); a série com datas pode ser consultada no [XML histórico do BCE](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.xml). A configuração de rede desta sessão não autoriza o domínio do BCE; não se contornou essa restrição.

A interface deve sempre mostrar a data da cotação quando a moeda não é EUR. A proveniência no repositório não substitui uma nova verificação do arquivo do BCE antes de uma publicação que anuncie câmbio atualizado.

Fórmula: `líquido em EUR = líquido declarado / unidades de moeda local por EUR`. A anualização e o cálculo inverso fiscal conservam os decimais; o arredondamento pertence à apresentação. O módulo não envia, guarda nem regista salários.

Reprodução: `cd site && node --import tsx scripts/test-regressar-fx.mjs`. Seis contratos verificam a direção da conversão, EUR sem falsa data de câmbio, as quatro moedas, valores decimais, snapshot explícito e rejeição de entradas inválidas.

## Distribuição: o que está documentado e o que falta verificar

Não foram enviados emails, mensagens ou convites. Não se recolheram contactos pessoais nem se estimaram audiências.

Existe uma pista documental no repositório para a comunidade empresarial portuguesa no Luxemburgo: o evento [Paperjam 10×6 Decisão — The Portuguese business community in action](https://en.paperjam.lu/club/event/paperjam-10x6-decisao-the-portuguese-business-community-in-action), referido como consultado em `sponsors/pipeline.csv` nos registos S019, S058 e S059. A data do evento registada é 10-11-2026. Isto demonstra uma pista de distribuição já pesquisada, **não uma parceria, contacto atual confirmado ou acesso à audiência**.

“Clube do Luxemburgo”, no briefing, não identifica inequivocamente uma entidade jurídica ou um URL. Não se associou esse nome a uma organização por suposição. Também não se apresentaram listas de associações suíças ou francesas como verificadas sem abrir as suas páginas oficiais.

Para preparar distribuição real: confirmar primeiro o organizador e o canal institucional no evento luxemburguês; depois validar, em diretórios oficiais, os sites e canais das associações portuguesas na Suíça e em França. Registar URL, data de consulta e evidência concreta de atividade. Só depois preparar a mensagem e pedir aprovação para o envio. Esta validação externa continua pendente por limitação de rede; o protótipo funcional não depende dela.

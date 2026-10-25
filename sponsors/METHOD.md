# Sponsor list v2: method

Built 24 Oct 2026 by the CEO. Refresh monthly. Files: `pipeline.csv` (source of truth for tools), `Sponsors_v2.xlsx` (working file with formulas).

## Principle: follow the money

A good sponsor already pays to reach our readers. Evidence beats assumptions.

| Tier | Definition | Example evidence |
| --- | --- | --- |
| A | Proven spend on our audience | Ad in LusoJornal or Lusopress, stand at a Portuguese property fair abroad, office abroad for the community, affiliate or partner deal with a diaspora site, sponsored articles, influencer launch aimed at Brazilians |
| B | Serves our audience, no proof of spend | Dedicated page for emigrants, non-residents, French or Brazilian buyers |
| C | Large or generic, long cycle | No evidence; parked in "Later" until we have 1,000 subscribers or a warm intro |
| Excluded | Other real-estate agencies and networks (decision D9) | They compete with the partner agency; never contacted |

Every A and B row has an evidence URL. "Fetched" means the page was opened and read; "Search result" means the page title and URL match but the page was not read in full. A rows with evidence before 2022 get a lower close probability and must be re-checked before outreach.

## Scoring

1. Deal value: price of the offer type in the Settings sheet (founding prices: list price minus 40%).
2. Close probability: A recent 25%, A older 15%, B 12%, C 4%, plus 5 points for small companies.
3. Expected value = deal value × close probability.
4. Priority score = expected value × speed factor (small 1.5, mid 1.0, large 0.6).

Change the yellow cells in Settings and everything recalculates. If decision D3 (pricing) changes, update the price column there.

## Monthly refresh (about 2 hours)

1. **Diaspora media ads.** Open LusoJornal (any article page), the latest Lusopress PDF, Contacto and Rádio Latina sites. Add every new advertiser as tier A.
2. **Meta Ad Library.** Search active ads by country. Open each link, then change the keyword:
   - Luxembourg: https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=LU&q=casa%20em%20portugal&search_type=keyword_unordered
   - France: https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=FR&q=maison%20au%20portugal&search_type=keyword_unordered
   - Switzerland: https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=CH&q=casa%20em%20portugal&search_type=keyword_unordered
   - Brazil: https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=BR&q=im%C3%B3vel%20em%20portugal&search_type=keyword_unordered
   - Other keywords: "crédito habitação emigrante", "crédit immobilier Portugal", "2.º pilar", "visto Portugal", "mudanças Portugal", "construção moradia".
3. **Fairs.** Ask the Paris Portuguese property fair (~150 exhibitors per edition) and the Swiss–Portuguese chamber for exhibitor lists.
4. **Brazilian sites.** Check partner and affiliate links on Eurodicas and similar sites.
5. Re-run the build script (or edit the CSV) and recalculate.

## Known gaps

1. Luxembourg (19 A/B companies) and Switzerland (17) are thinner than France (46) and Brazil (29). The first Meta Ad Library pass and the Contacto / Rádio Latina ad check should focus there.
2. Decision-maker names are not in the file on purpose. Find the named role on LinkedIn at the moment of outreach; do not store personal emails in the repo.

## Outreach rules

1. Company or published business contacts only, one-to-one emails (no bulk sends), and an easy opt-out line in every email.
2. Legal bases to confirm by Daniel before the first send: GDPR art. 6(1)(f) legitimate interest and art. 21 (right to object); Portugal Lei 41/2004 as amended (unsolicited communications to legal persons); France CNIL guidance on B2B prospecting; Luxembourg law of 30 May 2005; Switzerland UWG art. 3(1)(o) on mass advertising.
3. Sequence: day 0 email, day 2 LinkedIn request with no pitch, day 5 two-line follow-up, day 9 last follow-up with a date for a call.
4. Log every touch in the Status column.

## Email 1 templates

**Portuguese (LU, CH)**

Assunto: Leitores no [Luxemburgo / na Suíça] a comprar casa em Portugal

Olá [Nome], estamos a lançar o Imóveis Portugal, um guia com newsletter semanal para portugueses no Luxemburgo, em França e na Suíça e para brasileiros que querem comprar casa em Portugal. Vi que a [Empresa] já fala com este público [evidência: anúncio no LusoJornal / stand no salão de Paris / página para emigrantes] e queremos ter um parceiro por categoria. Os primeiros dez parceiros têm 40% de desconto no primeiro ano e o preço fica fixo no segundo. Tem 15 minutos na próxima semana para lhe mostrar o formato? Se preferir não receber mais emails nossos, basta responder a dizer.

**French (FR)**

Objet : Vos clients portugais en France qui achètent au Portugal

Bonjour [Prénom], nous lançons Imóveis Portugal, un guide avec une newsletter hebdomadaire pour les Portugais et lusodescendants en France, au Luxembourg et en Suisse qui veulent acheter au Portugal. J'ai vu que [Entreprise] s'adresse déjà à ce public [preuve]. Les dix premiers partenaires ont 40 % de remise la première année et un prix bloqué la deuxième. Auriez-vous 15 minutes la semaine prochaine pour voir le format ? Si vous préférez ne plus recevoir nos messages, il suffit de répondre.

**Brazilian Portuguese (BR)**

Assunto: Brasileiros comprando imóvel em Portugal

Olá [Nome], estamos lançando o Imóveis Portugal, um guia com newsletter semanal para brasileiros que querem comprar imóvel em Portugal, com custos reais, financiamento, vistos e câmbio. Vi que a [Empresa] já fala com esse público [evidência] e estamos escolhendo um parceiro por categoria. Os dez primeiros parceiros têm 40% de desconto no primeiro ano e preço travado no segundo. Você tem 15 minutos na próxima semana para eu mostrar o formato? Se preferir não receber mais nossos emails, é só responder.

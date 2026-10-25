# Prompt 12 — "What it buys" comparisons, simulators, newsletter format

To run: "Read ops/prompts/12_compare_simulators_newsletter.md and execute it." Work on your branch, after prompt 11. Nothing is merged, published or sent without Daniel's approval. Everything in PT, EN and FR, written natively (content/VOICE.md, content/GLOSSARY.md). Same design rules as prompt 11: clean, calm, no AI look.

## 1. "O que compra" — comparisons people share

1. One page and one home-page block: **what a budget buys in Portugal vs where the reader lives**, in m² of housing, by range: 250 000 €, 500 000 €, 1 000 000 €.
2. Places: in Portugal, Lisbon, Porto, Gondomar, Braga, Algarve (Faro) and one inland town. Abroad, per edition: Luxembourg City (LU), Paris and Lyon (FR), Geneva and Lausanne (CH), São Paulo (BR), New York, Boston and Newark (US), Tel Aviv (IL).
3. Method: m² = budget ÷ median price per m² of sales. Primary sources only, with date, recorded in content/facts/facts.csv:
   - PT: INE, median sale price per m² by municipality (quarterly)
   - LU: Observatoire de l'Habitat / STATEC (data.public.lu)
   - FR: DVF, actual sales (data.gouv.fr) or Notaires de France
   - CH: Federal Statistical Office (if only an index exists, say so and use the official cantonal figure)
   - US: Census / FHFA; city figures only from an official or clearly cited source
   - BR: FipeZap (Fipe)
   - IL: Central Bureau of Statistics
   - Currency: ECB reference rate, with its date
4. Show it as one striking line per city ("Com 500 000 € compra cerca de 52 m² no Luxemburgo e 170 m² em Gondomar"), plus a shareable image per edition for social media. Medians, not specific homes: say so in one line.
5. If a figure has no primary source, leave that city out and list it for Daniel.

## 2. Simulators (they run in the browser; nothing is stored unless the reader asks)

1. **Custo total da compra:** price, own home or not, resident or not → IMT, stamp duty, notary and registration (from facts.csv) and the total.
2. **Prestação do crédito:** price, deposit, term, rate → monthly payment. Default rate = Banco de Portugal's latest average rate for new mortgages, with source and date; the reader can change it. Show the Banco de Portugal LTV cap and the DSTI limit (verify both). Label it an estimate, not a credit offer.
3. **Rendimento do arrendamento:** price, monthly rent, costs (IMI, condominium, insurance, management) → gross and net yield, with the 25% rate for non-residents (CIRS art. 72.º) and the note that tax may also be due where the reader lives.
4. Each result ends with the matching call to action: sponsor bank or credit intermediary (financing), tax adviser (rental tax), Habinedita Gondomar (find a home, D19 calls).
5. **Partners and data (legal frame):**
   - Each simulator can carry one sponsor: "Simulador oferecido por [Banco X]" (flat sponsorship, D6). An embeddable version for the sponsor's own site is a sponsor perk.
   - After the result, an optional form: "Quer que [named sponsor] o contacte com esta simulação?" with an unticked consent box naming that one recipient, double opt-in, and a privacy notice (GDPR arts. 6(1)(a), 7 and 13; Lei 58/2019). Data goes straight to the named sponsor and the brand mailbox, never into the repo.
   - We never sell or rent reader data and never pass it to anyone not named at the moment of consent. No per-lead fees (D6).
   - Credit intermediaries shown must be registered with Banco de Portugal (check the public register). We present partners; we never propose or negotiate credit (DL 81-C/2017). Simulator wording must not read as a credit advertisement (DL 74-A/2017): no promised rate, and no TAEG unless the sponsor bank provides its representative example.
6. A shareable link keeps the inputs (no personal data), so readers and partners can send a simulation.

## 3. Newsletter format (content/NEWSLETTER_FORMAT.md + week 1 draft per edition)

Daniel's rule: interesting, not nerdy facts that expire. At least 80% evergreen. A 5-minute read every Thursday.

1. **A casa da semana:** one real listing (from the partner agency, with permission), the full cost and what it would cost in the reader's currency.
2. **A história:** a real buyer's journey (anonymised, with permission) or a place story ("why emigrants from Luxembourg are buying in Ponte de Lima"). Facts sourced; no invented people.
3. **Aqui vs lá:** one comparison from section 1, as an image.
4. **A pergunta do leitor:** a real question, a short answer with source, then the partner call to action.
5. **Um número:** one sourced figure of the week. The only "data" item.
6. **Do parceiro:** labelled sponsored block.
7. Close with "Responda a este email com a sua pergunta": every reply is answered, and the best questions become next week's content.

Subject lines are specific and curious ("O que 250 000 € compram em Gondomar e no Luxemburgo"). No clickbait, no banned words. Write week 1 for each edition in PT, EN and FR as a beehiiv-ready draft (not sent).

## Review

Push after each section. Reply with the preview link, mobile screenshots of the comparison page and the three simulators, the week 1 newsletter for LU (PT), and anything you couldn't verify. Keep it short. Don't merge.

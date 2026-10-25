# Prompt 10 — Copy, FAQ, translations and mobile: trust and belonging

To run: "Read ops/prompts/10_copy_mobile_belonging.md and execute it." Work on your branch. Nothing is merged, published or sent without Daniel's approval.

Daniel's verdict on v2: better. He likes the sources and the calls to action, so keep them. Still not good enough: the copy and text, the FAQ wording, the translations, and the mobile experience. Target feeling: **reliable, trustworthy, and "I want to belong to this"**.

## 1. Learn from five references: voice, design, aesthetics, and what they answer (short)

For each reference, write four lines in design/v2/REFERENCES_10.md: **voice** (how they talk), **design** (layout, type, colour, photography, mobile), **aesthetic** (the feeling), and **content** (what questions they answer and how they lead to a call to action). Don't copy their text or visuals.

| Reference | What to look for |
| --- | --- |
| Ryan Serhant (serhant.com) | Sell the life, then prove it with numbers. Confident, warm, a call to action on every screen. Bold photography, strong hierarchy |
| Gary Vaynerchuk (garyvee.com) | Document, don't invent. Talk like a person, native to each format, empathy first. Content hub structure |
| Lucas Valente da Silva (forbespt.com/forca-determinacao-e-resiliencia-a-historia-inspiradora-de-lucas-valente-da-silva ; idealista.pt/news/node/76778) | Portuguese real estate built on a personal, consistent, humble-expert brand and video (drone, social). Style reference only: agencies are never sponsors or outreach targets (D9) |
| Amorim family in Comporta (idealista.pt/news/node/38048) | Quiet luxury: few words, place and lifestyle, nature, calm confidence, premium photography, lots of white space |
| José Cardoso Botelho / Vanguard Properties (essential-business.pt/?p=8092 ; idealista.pt/news/node/68654) | International buyers, design-led projects, an assured voice about Portugal |

## 1b. Country benchmarks: who already helps people buy in Portugal from each country

For each edition, open the guides below plus the top 3 Google results for "buy a house in Portugal from [country]" in that edition's languages. In design/v2/BENCHMARK.md, record per edition: every question they answer, what they do well (design and content), what they miss, and how they make money.

| Edition | Starting points |
| --- | --- |
| USA | wise.com/us/blog/buy-house-in-portugal ; brighttax.com/blog/can-americans-buy-property-in-portugal ; remitly.com/blog/immigration/buying-property-in-portugal |
| France | idealista.pt/fr/news/propriete-a-vendre-en-portugal/2025/09/23/71727-acheter-une-maison-au-portugal-en-tant-que-francais-le-guide-complet-pour ; expat.com/fr/forum/europe/portugal (questions buyers really ask) |
| Switzerland | letemps.ch/economie/portugal-une-fiscalite-or-attire-retraites-suisses-cote-atlantique ; Swiss pillar-2/3a withdrawal guides from Swiss banks and the federal administration |
| Luxembourg | justarrived.lu (model for a clean multilingual expat guide) ; contacto.lu (the Portuguese community's media in Luxembourg) |
| Brazil | eurodicas.com.br/comprar-casa-em-portugal ; eurodicas.com.br/erros-dos-brasileiros-ao-comprar-imovel-em-portugal ; cidadaniaevisto.com.br/blog/comprar-imovel-em-portugal-estrangeiros ; br.ebury.com/blog/vou-comprar-um-imovel-em-portugal-e-agora-como-faco-o-pagamento |
| Israel | find the top 3 guides in English and Hebrew for Israelis buying in Portugal |

Rules that follow from the benchmark:
1. Our FAQ and guides must answer **every question the benchmarks answer**, more clearly and with sources, plus the gaps they leave.
2. Money-transfer and tax firms that publish these guides (Wise, Remitly, Ebury, BrightTax and similar) are potential sponsors: add them to sponsors/pipeline.csv as tier B with the guide URL as evidence (no agencies, D9; no Russian-capital firms, D11).
3. Our design must look more trustworthy than all of them on a phone.

## 2. Voice rules (put them in content/VOICE.md and apply them everywhere)

1. **Belonging first.** Talk to people who live abroad with Portugal at heart: "a sua casa em Portugal, mesmo a viver lá fora". Use "we" and "you", never "users" or "clients".
2. **Trust through proof.** Every figure has its source (keep the current source style). The licensed partner agency is named with its AMI licence (13250). Sponsored content is labelled. Never call the platform independent.
3. **Short and specific.** Headlines under 8 words, with a number or a place where possible. One idea per paragraph, one action per screen.
4. **Describe, never advise** (content/EDITORIAL_POLICY.md). No promises of returns. Banned words: "paraíso", "oportunidade única", "investimento garantido" and their FR/EN equivalents.
5. **No invented proof:** no fake numbers, testimonials, logos or "as seen in" (Código da Publicidade, DL 330/90).

## 3. Rewrite the copy

1. Rewrite every page (home, partners, buy, talk to a partner, free guide, FAQ, legal intros) for all editions in PT (European Portuguese), EN and FR. Write each language natively instead of translating word for word; follow content/GLOSSARY.md.
2. **FAQ:** keep the questions, sources and calls to action. Rewrite the answers so a 60-year-old emigrant and a 35-year-old American both get it on first read: 40–70 words, the answer in the first sentence, then the detail, then the call to action.
3. Put every text in one copy deck, **content/copy/COPY_DECK.md** (page → block → PT / EN / FR), and make the site read from it or keep it in sync. Daniel and the CEO will edit the deck directly; you apply it.

## 4. Mobile (most visitors arrive from social media on a phone)

1. Design at 375 px first: body text 17–18 px, generous spacing, thumb-reachable buttons, a compact header with the language switch, and a sticky bottom call to action ("Falar com um parceiro" / "Receber o guia").
2. No wide tables on mobile: use cards or accordions. The FAQ is an accordion with search.
3. Trust is visible on the first screen: what we are, the partner agency with AMI 13250, and "fontes oficiais" under the figures.
4. Use real, warm photography of Portuguese places and homes; never imply a photo is a specific property for sale.
5. Run Lighthouse mobile at 95 or above, and screenshot each page type on iPhone and Android sizes.

## 5. Photo credits

Remove every visible "Unsplash" credit from the site and the e-books (the Unsplash licence does not require attribution). Keep the full list of photo sources in site/public/photos/CREDITS.md in the repo, not linked from the site. Keep all other source citations.

## Review

Push to the same branch after each section so the preview link stays current. When done, reply with: the preview link, mobile screenshots per page type, the path to COPY_DECK.md, and the list of anything you couldn't verify. Keep it short. Don't merge.

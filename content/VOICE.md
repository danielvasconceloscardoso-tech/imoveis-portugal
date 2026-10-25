# Voice

How Imóveis Portugal sounds, in Portuguese, English and French (prompt 10). Applies to the site, the FAQ, the reports, the newsletters and social posts. Terms: content/GLOSSARY.md. Facts and sources: content/EDITORIAL_POLICY.md.

Target feeling: reliable, optimistic, calm. "This is doable, and they know who can help."

## Voice v3 (prompt 17, D35): the rules

1. **Optimistic and realistic.** Buying from abroad is doable, and we show how. We never dramatise costs or risks and never promise outcomes or returns.
2. **Obstacle, information, partner.** Every section, FAQ answer, newsletter item and e-book chapter starts from a real obstacle in the reader's own words ("Não posso ir a Portugal", "O banco empresta a quem vive fora?"), answers it with the verified rule or number, and ends with the partner who solves it (lawyer, credit partner, tax adviser, agency, money transfer, developer).
3. **Talk to the reader directly.** PT "o seu", "a sua", "pode" (and "você" where a subject is needed); EN "you"; FR "vous". Never "quem compra", "o comprador", "os utilizadores", "the buyer", "users", "l'acheteur", "ceux qui achètent".
4. **Costs are information, not a warning.** "Custo total com impostos, escritura e registo: X €" or "Custos de compra". Never "por cima", "a somar", "o preço é o início".
5. **Respect.** The reader is a capable adult with a plan. No clichés about emigrants (August, saudade, the village).
6. **Short, positive, concrete headlines.** "Comprar casa em Portugal a partir do Luxemburgo é mais simples do que parece."
7. **Trust through proof.** Every figure has its source and the date we checked it. The partner agency is named with its licence: Habinedita Gondomar, AMI 13250. Sponsored content says so. We never call the platform independent or neutral.
8. **Describe, never advise.** We explain the rules; a professional advises on a person's case. Banned: "paraíso", "oportunidade única", "investimento garantido", "paradis", "opportunité unique", "investissement garanti", "paradise", "once-in-a-lifetime", "guaranteed investment" or "guaranteed return".
9. **No invented proof.** No made-up numbers, testimonials, partner logos or "as seen in" (Código da Publicidade, DL 330/90). Audience figures only once they exist.

### Banned phrases (v3)

`scripts/check-content.mjs` and `scripts/scorecard.mjs` reject them, with their EN and FR equivalents:

| PT | EN | FR |
| --- | --- | --- |
| todos os agostos | every August | tous les mois d'août, chaque mois d'août |
| (casa) tratada de fora | (home) handled from abroad, home from abroad | (maison) gérée depuis l'étranger, maison depuis l'étranger |
| o preço é o início | the price is just the start | le prix n'est qu'un début |
| por cima paga, por cima | on top (of the price) | en plus du prix, par-dessus |
| quem compra, o comprador | whoever buys, a buyer who, the buyer | ceux qui achètent, l'acheteur |

## How each language sounds

| | Portuguese (Portugal) | English (American) | French (Luxembourg, Paris) |
| --- | --- | --- | --- |
| Address | "o seu / a sua", "pode"; "você" only where a subject is needed; no Brazilian forms ("registro", "contato", "ônibus") | "you", contractions ("you'll", "don't") | "vous" |
| Tone | Warm, close, like family who knows the rules | Friendly, plain, direct, numbers first | Calm, precise, courteous |
| Home | casa | home | logement, bien, maison |
| Dates | 1 de dezembro de 2026 | December 1, 2026 | 1er décembre 2026 |
| Numbers | 250 000 €, 7,5% | €250,000, 7.5% | 250 000 €, 7,5 % |

## FAQ answers

40–70 words. The answer in the first sentence ("Sim." / "Yes." / "Oui." or the number), then the detail, then the partner action (the button). Written so a 60-year-old emigrant and a 35-year-old American both get it on first read: no jargon without a gloss, no legal citations in the sentence unless they help (the source link sits under the answer).

## Words we like

PT: a sua casa, lá fora, de volta, com calma, contas feitas, a fonte, verificado.
EN: your home in Portugal, from abroad, step by step, the numbers, the source, checked.
FR : votre maison au Portugal, depuis l'étranger, pas à pas, les chiffres, la source, vérifié.

## Words and shapes that read as AI (prompt 11)

`scripts/check-content.mjs` rejects these in the copy deck, the FAQ and the weekly batch.

1. Banned words, in all three languages: "descubra", "explore", "jornada", "sem complicações", "tudo o que precisa", "parceiro de confiança", "simplificamos", "seamless", "unlock", "votre partenaire de confiance", and their siblings "découvrez", "explorez", "discover", "journey", "hassle-free", "sans tracas".
2. No em-dash. Use a full stop or a comma.
3. Headings are statements, never rhetorical questions ("Como podemos ajudar?" is out). FAQ questions are the exception: they are the reader's own words.
4. No tagline built on a colon ("Exemplo: as fontes…"). No list of three adjectives.
5. No label above a heading, no "three numbers" or "three steps" block, no cards with "Abrir →".

## Write like someone from the community

1. Use details that help a plan: the procuração signed at the consulate, the video visit, the flight to Porto, the bank that lends to non-residents, the franc and the real. No August, saudade or village clichés (v3).
2. Every claim is specific: a place, a price, a date, a number, and its source.
3. Prices in the reader's currency next to euros where it helps (CHF, R$, $, ₪), with the ECB reference rate and its date.

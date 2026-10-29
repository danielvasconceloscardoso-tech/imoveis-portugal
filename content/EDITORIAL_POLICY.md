# Editorial policy

Decided by Daniel on 24 Oct 2026 (D12). Applies to every article, newsletter, social post, video script and e-book, in every edition.

## What we are

We compile reliable information that already exists online, is easy to verify, and is hard for a reader to put together alone: rules spread across Portuguese and home-country official sites, explained in one place, in the reader's language, with the sources linked. We do not give advice. When a reader needs advice, we connect them with our sponsors.

## Rules

1. **Primary sources first.** Facts on tax, law, residency and procedures come from official sources (laws in Diário da República, Portal das Finanças, AIMA, Banco de Portugal, INE, and the tax and government sites of each reader's country). Press and portals are used only for market data and news, and always named.
2. **Every fact is traceable.** Each number, rate, deadline or rule links to its source and carries the date it was checked. Facts live in `content/facts/facts.csv` (claim, value, jurisdiction, source URL, checked on) so they can be refreshed in one place.
3. **Compile, never copy.** We summarise in our own words and link to the source. No copied paragraphs, tables or images from other sites.
4. **Describe, do not advise.** We explain what the rules say and what people usually do ("buyers pay IMT on…", "non-residents must…"). No "you should", no recommendations on individual situations, no promises of returns or savings.
5. **Disclaimer everywhere.** The disclaimer below appears at the end of every article, newsletter and e-book, and in the site footer.
6. **Reader questions.** We answer with general information and links. A question about someone's own situation goes to a sponsor ("we can put you in touch with a partner lawyer / bank / tax adviser"). Individual legal advice is reserved to lawyers and solicitadores in Portugal (Lei 49/2004).
7. **Sponsors may advise.** Sponsored posts and guest posts by sponsors can contain their professional advice, under their responsibility, always labelled as sponsored.
8. **Freshness.** Every page shows "checked on [date]". Tax and legal facts are re-checked every quarter and whenever the State Budget or a relevant law changes.
9. **Human review.** Daniel reviews legal and tax content; the partner agency reviews market content. Nothing is published without that review.
10. **Positive, never deficit** (prompt 43, 30 Oct 2026). We say what the reader can do, never what they can't. Not "if you can't go to Portugal", but "You don't need to be in Portugal to buy a home. Here's how it works." Then we explain.
11. **Written for a foreigner** (prompt 43). About B1 level: short sentences, one idea per paragraph, every Portuguese term explained once the first time it appears (the NIF, your Portuguese tax number; the escritura, the deed signed before a notary). Legal terms only when the reader will meet them at the notary, and then explained.
12. **No AI tells** (prompt 43). No "in today's market", "navigate", "landscape", "seamless", "dive in", "it's worth noting", "whether you're… or…" (nor their Portuguese and French equivalents), no rhetorical questions in a row, no lists of three adjectives, no closing summary, no piles of hedges. Read each paragraph aloud: if a person wouldn't say it, rewrite it. `scripts/check-content.mjs` rejects the listed phrases.
13. **Articles that answer first** (prompt 43). One target phrase from the keyword map in the title (60 characters at most), the H1, the slug, the meta description (155 at most) and the first sentence; the answer in the first two sentences; H2s as the questions people search; three FAQ follow-ups as structured data; 600 to 1,200 words; three or four internal links; external links only to official sources.

## Disclaimers

**PT (LU, CH):** Este conteúdo é informativo e não constitui aconselhamento jurídico, fiscal ou financeiro. As regras mudam e cada situação é diferente: confirme junto de um profissional antes de decidir. Podemos pô-lo em contacto com os nossos parceiros.

**FR:** Ce contenu est informatif et ne constitue pas un conseil juridique, fiscal ou financier. Les règles évoluent et chaque situation est différente : vérifiez auprès d'un professionnel avant de décider. Nous pouvons vous mettre en relation avec nos partenaires.

**PT-BR:** Este conteúdo é informativo e não constitui assessoria jurídica, tributária ou financeira. As regras mudam e cada caso é diferente: confirme com um profissional antes de decidir. Podemos colocar você em contato com nossos parceiros.

**EN (future US and Israel editions):** This content is for information only and is not legal, tax or financial advice. Rules change and every situation is different: check with a qualified professional before you decide. We can put you in touch with our partners.

## Sponsored content label

**PT:** Conteúdo patrocinado por [Parceiro]. As opiniões e recomendações são da responsabilidade do parceiro.
**FR :** Contenu sponsorisé par [Partenaire]. Les avis et recommandations relèvent de la responsabilité du partenaire.
**PT-BR:** Conteúdo patrocinado por [Parceiro]. As opiniões e recomendações são de responsabilidade do parceiro.
**EN:** Sponsored by [Partner]. Views and recommendations are the partner's own.

# Prompt 04 — Free e-books (lead magnets) and the facts base

To run: in Claude Code, plan mode, type "Read ops/prompts/04_free_ebooks.md and execute it."

Can run in parallel with prompts 02 and 03. Nothing is published, sent or merged without Daniel's approval.

---

You are the CTO. Read CLAUDE.md and **content/EDITORIAL_POLICY.md** first. The policy is binding: compile verifiable facts from primary sources, describe and never advise, disclaimer everywhere, connect readers with sponsors.

## Why

A free e-book in exchange for an email is how each edition gets its first subscribers before 1 December. Subscribers are what sponsors pay for. Each e-book also carries a labelled "Partner of this guide" slot that can be sold.

## Part 1 — The facts base

1. Create `content/facts/facts.csv` with columns: id, topic, claim, value, jurisdiction, source_title, source_url, source_type (official / press / portal), checked_on, notes.
2. Fill it from primary sources for the topics below. Open each page you cite; a search snippet is not a source.
3. Portugal: IMT rates and brackets for own home, second home and non-residents, and the rules for buyers residing outside the EU; Imposto do Selo on purchase and mortgage; registration and notary or Casa Pronta costs; IMI and AIMI; NIF and fiscal representative for non-residents; tax on rental income and on capital gains for non-residents; mortgages for non-residents (Banco de Portugal rules, typical loan-to-value); residency routes relevant to buyers (EU citizens, D7 and others for Brazilians); inheritance basics (Imposto do Selo on inheritance, forced heirship).
4. Home countries: how each country treats Portuguese property owned by its residents, at the level of "declared / taxed / credited", with the official source: Luxembourg, France, Switzerland (including using 2nd-pillar money to buy a main home abroad), Brazil (declaration and capital gains on assets abroad, sending money). Where the treaty with Portugal matters, name the treaty and link it.
5. Mark anything uncertain or recently changed (for example the 2026 State Budget) in `notes`, and never use it in an e-book until Daniel confirms.

## Part 2 — The e-books

| # | Title (working) | Edition | Language |
| --- | --- | --- | --- |
| 1 | Quanto custa mesmo comprar casa em Portugal | LU, CH | PT |
| 1 | Combien coûte vraiment un achat au Portugal | FR | FR |
| 1 | Quanto custa de verdade comprar imóvel em Portugal | BR | PT-BR |
| 2 | Comprar em Portugal a viver no Luxemburgo: crédito, impostos e regresso | LU | PT |
| 3 | Acheter au Portugal depuis la France : crédit, fiscalité, succession | FR | FR |
| 4 | Usar o 2.º pilar para comprar casa em Portugal | CH | PT |
| 5 | Comprar imóvel em Portugal morando no Brasil: vistos, câmbio, financiamento e impostos | BR | PT-BR |

Start with e-book 1 in the three languages (it is the main lead magnet), then 2–5.

Each e-book, 12–20 pages:
1. Cover; one-page summary of what the reader will know at the end.
2. The process step by step (a real sequence, so numbered steps are right here).
3. Worked cost examples with real numbers (for example a 250,000 € second home and a 400,000 € home for a non-resident), every figure traceable to facts.csv.
4. Checklists the reader can tick: documents, deadlines, who does what.
5. Glossary (IMT, IMI, NIF, CPCV, escritura, etc.).
6. "Partner of this guide": one labelled sponsor slot, empty placeholder until sold.
7. "Need advice for your case?": we connect readers with partner lawyers, banks, tax advisers (link to the edition's partners page).
8. Sources page (title, link, checked on) and the disclaimer from EDITORIAL_POLICY.md.

Format: HTML/CSS in the visual direction chosen in prompt 02 (wait for that choice before final styling; write the text first), exported to PDF with a script (`npm run ebooks`) into `content/ebooks/`. Screenshot every page and check it.

## Part 3 — Wiring (prepare, do not activate)

1. Download page per edition on the site with the cover, three lines on what is inside, and the newsletter signup (the e-book is delivered by the welcome email; double opt-in stays on).
2. Add the disclaimer to the site footer and to the article template in all editions.
3. Document in ops/SETUP.md the one manual step in beehiiv: attach the PDF to the welcome email per edition.

## Review and approval

1. Open a PR with the PDFs, facts.csv and a list of every fact marked uncertain.
2. Daniel reviews legal and tax content, the partner agency reviews market content. Nothing goes live before both approve.
3. End the session with the summary in ops/TASKS.md under "Last session".

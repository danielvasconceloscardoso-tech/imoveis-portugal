# Prompt 45: the Index, the cover, the collections, the assessment (D69)

CEO, 30 Oct 2026, 13:00. Direction approved by the operator (D69): the site works like Wine Spectator and Cigar Aficionado work. A rating is the spine, an annual list is the event, the lifestyle around the house brings the advertisers, and a published policy guards the credibility. Build in the order below; ship each stage live per D67 as soon as it is green. **Prompt 44 stays parked.**

## 1. The Index (first)

Build it exactly as `content/data/INDEX_METHOD.md` describes: pipeline, computation, missing data, validation, independence page, site display, "O seu índice" sliders, edition overlay, search.

1. Stage 1a: the pipeline and `index.json`, with the back-test, face-validity list (top 20 and bottom 20 with the indicator that drives each) and the sensitivity table sent to the CEO **before anything shows on the site**. The operator reviews the top 20.
2. Stage 1b, after the CEO's go: the index on the map and cards, the pillar bars, "O seu índice", the "Como avaliamos" page (PT, EN, FR) with every source and date, and the search returning the card with the score first.
3. If a source turns out not to exist at municipality level, say so in one line and drop the indicator with the pillar reweighted; never substitute an unofficial source.
4. The name is "Índice Imóveis Portugal" until the operator confirms it; keep it in one config value.

## 2. The cover

1. Below the hero film on every edition home: one cover story a week. Full-bleed photograph, one headline (at most eight words), one line, one tap. Nothing else in that section.
2. The newsletter of the week carries the same cover and headline: the site and the letter are the same issue.
3. The cover is set in `content/covers/{week}.md` (headline, line, article, photo, editions, languages); `/publish-week` validates it.
4. On the phone it is the first thing after the film.

## 3. Collections

1. Artigos becomes collections with covers: **Comprar do estrangeiro · Vender e herdar · Golfe · Vinho · Mar · Madeira**. Each collection has one cover, one line and its articles; each article belongs to one collection.
2. Each collection can carry one labelled sponsor slot (header, "Patrocinador da coleção", Código da Publicidade art. 8); empty until signed. The slot reads from `content/sponsors/collections.yaml`.
3. The navigation does not change (Artigos stays the entry point).

## 4. The assessment panel for developments

1. On every development showcase page, an "Avaliação Imóveis Portugal" panel: the criteria, each marked met or not met, the date checked, and the dated badge when all are met. Criteria v1 (`content/developers/CRITERIA.md`, public page too):
   - visits by video call offered;
   - a sales contact who answers in the buyer's language (PT and at least EN or FR);
   - availability published and kept current;
   - the documents a buyer's lawyer needs available on request (licence, energy certificate, plans);
   - a process that works by power of attorney, from reservation to deed;
   - prices or "sob consulta" with a written reply within a stated time;
   - no per-lead fee anywhere in the relationship (D6).
2. Marble Terrace is assessed first, from what the developer has already published and told us; unmet or unknown criteria show as "a confirmar".
3. The badge is an SVG with the date and a link back to the showcase page, downloadable by the developer once all criteria are met. No fee is shown anywhere until the operator sets it (task 45b).
4. Wording: "avaliado", never "recomendado" or "melhor" (D12).

## 5. Phone: search first

On a phone, the first screen after the hero film is "Onde em Portugal?" with the search field; typing returns the card with the score. Nothing else competes for the thumb. Desktop keeps the map as today with the index as its colour.

## 6. Portugal 100 (prepare, do not publish)

1. Build the page `/portugal-100/2027/` (PT, EN, FR) behind the noindex switch and a preview flag: the ranked list with change against last year, a share card per municipality (1200×630 and 1080×1350), and the reveal mechanics (ten places a day from #100 to #11, then #1 to #10 on 1 December).
2. The reveal schedule and the first publication wait for the operator's go and the D4 switch.

## 7. Ship (D67) and report

1. Order: §1a (report only) → §1b → §2 → §3 → §5 → §4 → §6.
2. Keep: the hero film; Marble Terrace visible (D68); the 308/308 test; prompts 40–43; noindex until the operator's go.
3. Report after each stage: commit hash, "live", the URLs, and one line on anything not done. After §1a: the back-test, the face-validity list and the sensitivity table as one PDF. No screenshots.

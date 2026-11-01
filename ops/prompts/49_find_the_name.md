# Prompt 49: find the name. International, .com free, ownable, sellable

CEO, 1 Nov 2026, 22:00. Operator's brief: a more international name, available online, a valuable domain, easy to sell at exit, marketable. "Imóveis Portugal" stays as the descriptor line under it (and "Portugal Home Guides" for US and Israel). This replaces the shortlist in prompt 47 §1: the operator rejected Miradouro, Morada, Mirante, Farol. Run it to the end; the deliverable is three finalists that pass every gate, not a list of ideas.

## 1. The bar every finalist must clear

1. **The `.com` is free at the standard registration price** (not premium, not aftermarket). Non-negotiable: it is the asset a buyer pays for.
2. **Short and spoken the same everywhere:** 4–9 letters, at most 3 syllables, one obvious spelling when heard, pronounced the same by a speaker of PT, BR, FR, EN, DE and HE. No letters that change sound across these languages (avoid ç, ã, nh, lh, j, x, w), no double letters that get misspelled.
3. **No meaning to avoid** in PT, ES, FR, EN, DE, IT, HE (slang, insults, brands, political or religious terms). Check each finalist in Wiktionary and a slang search per language.
4. **Ownable:** no identical or confusingly similar word mark in classes 35, 36, 41, 42 in the EU, Portugal, Brazil, the US or Israel (TMview, EUIPO, INPI, USPTO via TMview, WIPO Global Brand Database). Not descriptive of property or media in any EU language.
5. **The handle is free** on Instagram and TikTok in the exact form, or with one neutral suffix (`hq`, `pt`, `.portugal`); YouTube, X and LinkedIn noted.
6. **No dominant Google collision** in the five languages (a company, a product, a place with strong search presence).
7. **Fits the concept** and stretches to the product family: "{Name} 100" (the annual list), "Índice {Name}" (the score), "{Name} Private" (the US/Brazil/Israel high-budget series). Suggests one or more of: Portugal, the Atlantic, home, arrival, a view or a measure, light. Never "estate", "realty", "homes", "property" in the name (generic, and it makes us look like an agency, D9).

## 2. Generate (at least 400 candidates)

1. **Real words, short, international:** Atlantic and Portuguese geography and light (e.g. Cabo, Costa, Luz, Sol, Mar, Lume, Alva, Doura, Tejo), arrival and home (Porto as a word, Cais, Casa, Lar), measure and view (Vista, Mira, Norte, Índex), Latin roots (Lusa, Lusia, Ibera, Alma, Terra, Aura).
2. **Coined and blended names**, the way Zillow, Rightmove, Idealista, Airbnb, Etsy were made: two roots blended (Lus+ora, Alt+ia, Cas+ola), a root plus a light suffix (-a, -o, -ia, -io, -ora, -ana, -ly, -ix), vowel-consonant alternation for easy speech. Write a small generator, `scripts/brand/generate.py`, seeded with the roots above and your own; keep the seed list in the repo.
3. **Two-word compounds** that read as one: "{root}house", "{root}point", "go{root}", "{root}hq" only as fallback domains, never as the brand.
4. Deduplicate; drop anything that fails §1.2 automatically (letter rules, length, syllable count by a simple vowel-group heuristic).

## 3. Gate, in this order (cheap checks first)

1. **`.com` availability through RDAP**, Verisign (`rdap.verisign.com/com/v1/domain/{name}.com`): 404 = free. Back up every "free" with a DNS lookup (no NS record). Rate-limit politely (one request a second). Keep only free names.
2. **Premium check:** Porkbun's public pricing API gives the standard `.com` price. For the free names, if the operator later finds a premium price at checkout, the name drops; note in the report that premium status can only be confirmed at a registrar's checkout.
3. **`.pt` through the IANA RDAP bootstrap (DNS.pt).** Not required, but a free `.pt` scores higher; note `.lu`, `.fr`, `.ch`, `.com.br`, `.co.il`, `.us` for the top 30.
4. **Handles** (Instagram, TikTok, YouTube, X, LinkedIn): free / taken / unverified. Unverified goes to the operator's manual list for the finalists only.
5. **Trademarks** in TMview, EUIPO eSearch and WIPO: identical and near-identical marks (one letter off, same sound) in classes 35, 36, 41, 42. Any live conflict drops the name.
6. **Meaning and Google:** Wiktionary in the seven languages, a slang search per language, and a web search for collisions.
7. **Pronunciation:** for the top 20, write how a speaker of each language would read it aloud; drop any that split into two readings.

## 4. Score and choose

1. Score the survivors 0–5 on: memorability (say it once, remember it), spelling from hearing, international neutrality, fit with the concept and the product family, visual (how it sets in Playfair Display and as a one-letter app icon), exit value (would a portal or a media group want to own the `.com`).
2. Deliver `ops/NAME_FINDER.pdf`: the funnel (generated → free `.com` → handles → trademark → meaning → final), the top 10 with every check and its source, and **three finalists**, each with a one-paragraph case, the logo set as plain type in Playfair Display, the exact domains and handles to buy (with standard prices), and the trademark classes to file.
3. Also write the full results to `content/brand/name_candidates.csv` (every name, every check, every result, the date).

## 5. Rules

- Buy nothing, file nothing, register no handle. The operator buys the chosen one within minutes of seeing the report, because a free name can go.
- Don't put the finalists anywhere public (repo is private; no social posts, no searches typed into registrar sites that sell "suggested" domains). RDAP and the trademark databases don't leak interest; registrar search boxes can.
- If fewer than three names survive, widen the generator and run again before reporting. Report only when three pass every gate.

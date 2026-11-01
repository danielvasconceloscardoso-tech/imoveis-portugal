# Name finder (prompt 49), 1 Nov 2026 · private

Brief: an international name, easy to market and to sell at exit; "Imóveis Portugal" stays as the line under it ("Portugal Home Guides" in the US and Israel). Rejected: Miradouro, Morada, Mirante, Farol. Nothing bought, filed or registered; no candidate typed into a registrar's search box.

## The funnel

| Step | Names | Source |
| --- | --- | --- |
| Generated (`scripts/brand/generate.py`, seeds in `content/brand/seeds.txt`: real words, root + light ending, two meaningful roots blended) | 23,488 | — |
| Pass the spoken-name rules: 4–9 letters, at most 3 syllables, no ç, ã, nh, lh, j, x, w (nor k, y, q, h), no double letters, no soft c/g, no s between vowels, no silent final e, only consonant pairs every language says | 12,670 | the generator |
| Ranked for checking: a concept root first (light, sea, north, view, course), 5–8 letters, no vowel clash | 3,691 | — |
| `.com` checked, best-ranked first, one request a second | 1,159 | Verisign RDAP (404 = free), every "free" confirmed by a second request |
| **`.com` free** at the standard price | **90** | Porkbun pricing API: .com 11.81 USD |
| `.pt` free as well | 90 | DNS.pt public WHOIS (.pt has no RDAP in the IANA bootstrap) |
| No meaning in PT, ES, FR, EN, DE, IT, HE | 90 | Wiktionary (no entry in any of the seven); slang search |
| Web search: no dominant collision | 12 of 13 searched | web search (Velalto drops: Veralto Corp., NYSE: VLTO) |
| Read aloud in PT, BR, FR, EN, DE, HE: one reading only | 3 of the top 20 clean; Rumamar splits; the "-alto" names end in an [u] in European Portuguese | our reading, below |
| **Finalists** | **3** | |

**Checked by the operator before buying (15 minutes, phone and browser):** Instagram, TikTok and X handles (login walls; scripted checks were refused), and the trademark registers (TMview fails from this environment, EUIPO eSearch returns nothing, WIPO's Global Brand Database sits behind a CAPTCHA). A DNS lookup as a second source for `.com` was not available here; each free `.com` was confirmed by two RDAP requests instead. Premium status is only certain at a registrar's checkout: a name that shows a premium price drops.

## Top 10

Score 0–5 on memorability, spelling from hearing, neutrality, fit, visual, exit value (30 max). All ten: `.com` free (RDAP, twice), standard price 11.81 USD (Porkbun), `.pt` free (DNS.pt, 17.38 € a year at Gandi, excl. VAT), no Wiktionary entry, LinkedIn company page free unless noted.

| Name | Score | YouTube | Google (web search) | Read aloud | Note |
| --- | --- | --- | --- | --- | --- |
| **Clarmar** | **28** | @clarmar taken (use @clarmarhq) | no exact match; near: Hotel Claramar (Spain, hotels), Carmar (yacht services) | one reading, klar-MAR | light + sea |
| **Nortamar** | **25** | free | no exact match; near: Noramar AS (Norway, holding), Nortemar (a 1941 ship) | one reading, nor-ta-MAR | north + sea |
| **Clarluma** | **24** | free | no match | one reading, klar-LOO-ma | light + light |
| Claralto | 23 | free | no match | kla-RAL-to; [u] ending in PT | |
| Ondalto | 23 | free | no match | on-DAL-to; [u] ending in PT; LinkedIn unverified | high wave |
| Rumavia | 21 | free | no match | EN may say "RUM-a-via" | course + way |
| Nortalto | 21 | free | no match | [u] ending in PT | |
| Liralto | 21 | free | no match | [u] ending in PT | |
| Orlalto | 19 | free | no match | l-l sounds awkward | |
| Costolia | 18 | free | no match | 4 syllables when spoken | |

Full results for every name, every check and its date: `content/brand/name_candidates.csv`.

## The three finalists

<div style="font-family:P,'Playfair Display',serif;font-size:40pt;line-height:1.05;margin:14pt 0 2pt">Clarmar</div>
<div style="font-size:9pt;letter-spacing:.18em;text-transform:uppercase;color:#5d6066;margin:0 0 8pt">Imóveis Portugal</div>

**The case.** Two syllables, *clar* and *mar*: the clear light on the Atlantic that every Portuguese abroad remembers, said the same way in Lisbon, São Paulo, Paris, New York, Berlin and Tel Aviv, spelt the way it sounds. It is not a word anywhere, so it can be owned; it does not say "property", so it can grow into data, a letter and services without looking like an agency. It carries the family well: *Clarmar 100*, *Índice Clarmar*, *Clarmar Private*; the C makes a clean app icon. For a buyer at exit, a seven-letter coined `.com` with no history is the asset.

- **Buy:** clarmar.com (11.81 USD a year, Porkbun standard); clarmar.pt (17.38 € a year at Gandi, excl. VAT).
- **Handles:** Instagram @clarmar, TikTok @clarmar, X @clarmar (operator checks; fallback @clarmar.pt or @clarmarhq); LinkedIn /company/clarmar (free); YouTube @clarmar is taken: use @clarmarhq.

<div style="font-family:P,'Playfair Display',serif;font-size:40pt;line-height:1.05;margin:16pt 0 2pt">Nortamar</div>
<div style="font-size:9pt;letter-spacing:.18em;text-transform:uppercase;color:#5d6066;margin:0 0 8pt">Imóveis Portugal</div>

**The case.** *Norte* and *mar*: a bearing, north to the sea, Portugal's own direction home. Three open syllables that every speaker reads the same, nor-ta-MAR. It reads as a measure and an arrival, which is the index and the letter. *Nortamar 100*, *Índice Nortamar*, *Nortamar Private*.

- **Buy:** nortamar.com (11.81 USD); nortamar.pt (17.38 €).
- **Handles:** Instagram, TikTok, X @nortamar (operator checks); YouTube @nortamar and LinkedIn /company/nortamar free.

<div style="font-family:P,'Playfair Display',serif;font-size:40pt;line-height:1.05;margin:16pt 0 2pt">Clarluma</div>
<div style="font-size:9pt;letter-spacing:.18em;text-transform:uppercase;color:#5d6066;margin:0 0 8pt">Imóveis Portugal</div>

**The case.** *Claro* and *lume*: clear light, the brightest of the three and the softest to say, klar-LOO-ma. Strong for the letter and the guides, a little less for an index than Clarmar. *Clarluma 100*, *Índice Clarluma*, *Clarluma Private*.

- **Buy:** clarluma.com (11.81 USD); clarluma.pt (17.38 €).
- **Handles:** Instagram, TikTok, X @clarluma (operator checks); YouTube @clarluma and LinkedIn /company/clarluma free.

**Trademark, for the chosen name:** after a clean TMview search (identical and similar signs, classes 35, 36, 41, 42; offices EUIPO, Portugal, Brazil, the US, Israel), file a word mark at the EUIPO (850 € for the first class, 50 € for the second, 150 € for each further class: 1,200 € for the four) and at INPI Portugal (per its fee table), the logo later as a figurative mark; Brazil (INPI) and the US (USPTO) next. Classes: 35 advertising and online advertising space; 36 real-estate and financial information; 41 publication of guides and online information (not news); 42 data platforms and software as a service.

**Before buying (the operator, minutes):** the three handles on the phone; TMview and WIPO for the four classes; the registrar checkout shows the standard price, not premium. Buy the `.com` and `.pt` of the chosen name the same hour.

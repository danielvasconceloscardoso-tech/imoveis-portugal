# Prompt 30: the content engine (newsletter and posts on every platform, built like an SEO engine)

CEO, 26 Oct 2026. Run it after the demo fixes and before prompt 23. It delivers prompt 22 §1.3 (templates), §2 (content system) and §4.5 (Reddit and Quora drafts). Account setup in prompt 22 §5 stays with the operator.

Nothing is posted, scheduled, sent or merged without the operator's "go". All copy follows:
- content/VOICE.md, content/EDITORIAL_POLICY.md and content/NEWSLETTER_FORMAT.md;
- D35 (optimistic, realistic), D50 (identity), D52 (no "Private", high budgets handled quietly), D9 (no agencies);
- the rule from prompt 29: if a person would not say a line out loud, it is wrong.

## 0. The idea in one paragraph

Every week has one pillar: the most-searched real question for that week's theme. The pillar becomes:
- the canonical page on the site, which Google and AI assistants quote;
- the newsletter for each edition and language;
- about 30 native posts across Instagram, Facebook and LinkedIn;
- stories, and two human-posted answers on Reddit or Quora.

Every piece targets a search phrase and links back to the page, map area, simulator or path station that answers it. The posts earn attention, the page earns the ranking, the newsletter earns the subscriber, and the subscriber is what sponsors pay for.

The existing drafts in content/inbox/week-01 and week-02 are too dry. Move them to content/archive/ and replace them.

## 1. Keyword map (content/SEO_ENGINE.md)

1. **Collect the questions.** For each edition (LU, FR, CH, BR, US, IL) and each language (pt-PT, en, fr), collect the 40 questions people actually search about buying, selling, inheriting, renting out and moving to Portugal from that country.
   - Free sources only: search autocomplete, "People also ask", AlsoAsked, AnswerThePublic, Google Trends, Reddit, Quora and Facebook group questions.
   - Record the exact wording, the source and a demand signal (Trends index, autocomplete rank, number of threads).
2. **Cluster and map them.** Group the questions into clusters. Map each cluster to:
   - one site page (existing or to build, answer-first with FAQPage schema and hreflang);
   - one map area or simulator;
   - one path station;
   - the partner category that solves it.
3. **Calendar for 12 weeks,** starting week 1 (Mon 9 Nov 2026):
   - weeks 1–3: teasers and the welcome sequence;
   - week 4: launch, Tue 1 Dec, first Thursday issue on 3 Dec;
   - weeks 5–12: the weekly rhythm.

   Each week has one pillar, one target phrase per language, and the page it points to.
4. **Measurement,** in ops/METRICS.md, weekly: impressions and clicks from Search Console and Bing, subscribers per edition, saves and shares per post. Monthly: the AI-assistant test from prompt 22 §4.6.

## 2. One pillar, all formats (per week)

| Output | Volume | Rules |
| --- | --- | --- |
| Pillar page on the site | 1 per language | Opens with a 2–3 sentence answer containing the number, its official source, "last checked" date and the brand name. Links to the map area, simulator, station and partner. Added to sitemaps and llms.txt; IndexNow ping. |
| Newsletter | 1 per edition and language | The seven blocks of NEWSLETTER_FORMAT.md. Three subject-line options each, with a place, a price or a number. Weeks 1–3 are welcome emails (no sends before 1 Dec). |
| Instagram | 14 feed posts (one reel and one carousel or data card per day), 3–5 stories a day | Captions PT, then EN, then FR. One call to action. 3–5 relevant hashtags. Alt text carrying the target phrase. |
| Facebook | 7–10 | The Instagram set, plus community posts in Portuguese for the diaspora (questions people answer in the comments). |
| LinkedIn | 5 weekday posts, plus one document carousel a month | EN or FR. Data-led, written for developers, banks, advisers and wealth managers: it also sells sponsorship. |
| Reddit / Quora | 2 drafts | Full answers that stand on their own, affiliation in the profile, the community's self-promotion rules followed. A person posts them. |

**Links:** every link carries UTM tags, for example `utm_source=instagram&utm_medium=social&utm_campaign=w04-real-cost`.

## 3. The format library (witty, visual, built on our data)

The wit is in the framing, never in the numbers. Every figure has a fact id in content/facts/facts.csv, or comes from site/public/data/prices.json (INE). Comparisons say in one small line what they compare (median or mean, which dwellings, which period). Add sourced foreign prices to facts.csv before using them:
- New York: NYC Department of Finance rolling sales, or another official source;
- Tel Aviv: Israel CBS;
- São Paulo and Rio: FipeZAP, labelled as such.

If no reliable source exists, don't compare that city.

The seed numbers below are examples; check each one against its source before use.

1. **Here vs there.** One square metre at home against the m² it buys in Portugal, drawn as squares to scale.
   - Seed: 1 m² in Luxembourg-Ville (10,269 €, mean, existing apartments, lu-m2-2026q2) ≈ 2.0 m² in Lisboa, 2.8 m² in Porto, 4.4 m² in Gondomar (5,192 / 3,631 / 2,348 €, INE median, ine-m2-2026q2).
   - Paris 9,692 € (fr-m2-2026q3) ≈ 1.9 m² in Lisboa.
   - Geneva canton 10,853 CHF (ch-ge-m2-2024, ECB rate) ≈ 2.3 m² in Lisboa.
2. **What your budget buys.** One budget in the reader's currency, then the m² it buys in five places, drawn as floor-plan outlines to scale. Use the budget field's own figures.
3. **Then and now.** The same money in 2016 and in 2026.
   - Seed: 100,000 € bought 53 m² in Lisboa in Q1 2016 and 19 m² in Q2 2026; in Porto, 92 m² then 28 m².
   - Example headline: "Your 2016 budget would like a word."
4. **Ten years in one line.** A place's price line, 2016 to 2026, animated for reels.
   - Seed: Sintra +311%, Setúbal +293%, Porto +234%, Grândola +230% (gross yield 5.3%), Lisboa +177%.
   - Say "municipality median" when the place is a resort such as Comporta or Quinta do Lago.
5. **The cost sheet.** What a home really costs a non-resident: price, IMT, stamp duty, Casa Pronta, total in the reader's currency. Clearly an illustrative calculation, in our own design. Never styled as a receipt or document from any real organisation.
6. **Myth vs the law.** One belief people repeat, then the article that answers it (for example the power of attorney with apostille, pt-poa-apostille).
7. **One number.** A big figure, one line of context, the source.
8. **Place postcard.** A real photograph of the place (Unsplash or Pexels, checked to show that place, no credit on the image) and three numbers from the map card.
9. **Reader's question.** A real searched question and the 40–70-word answer from the FAQ.
10. **Map reels.** Fly-overs and the 2016→2026 time-lapse. Built from map v1 until the operator approves v2.

**Tone.** Dry, warm, specific: details people recognise (the August holidays, the flight to Porto, the parents' house, the procuração signed at the consulate). Headline register, as examples:
- "One square metre in Luxembourg City. Four in Gondomar."
- "The 7.5% nobody puts in the spreadsheet."
- "Same budget. Different view." · "O mesmo dinheiro. Outra vista." · "Même budget. Autre vue."

**Never:** puns for their own sake, emojis in images, more than one emoji in a caption, rhetorical questions as headlines, banned words, advice, return promises, invented people or quotes, mocking any place or any reader.

## 4. Design (design/social/)

- **Identity (D50):** white and near-black, Playfair Display and Manrope, deep green #2F5D50 as the only accent, real photographs, nothing that looks AI-made.
- **Sizes:**
  - Instagram and Facebook carousel or card: 1080×1350.
  - Reel and story: 1080×1920.
  - LinkedIn image: 1200×1500.
  - LinkedIn document: 1080×1350 PDF.
  - Newsletter header: 1200×600.
- **Templates:** one template per format in §3, rendered from data with Playwright, so a new number is a new image without hand work.
- **Languages:** visuals stay language-neutral where possible; text versions in PT, EN and FR.
- **Reels:** subtitles burned in. For voice, use the Kokoro engine from prompt 29 only if a reel needs one.

## 5. Output and checks

1. **Files:** social goes in the platform folders at the repo root (created by the CEO; see `social/README.md` for the naming and front matter):
   - `social/instagram/posts/`, `social/instagram/reels/`, `social/instagram/stories/`;
   - `social/facebook/`, `social/linkedin/`, `social/reddit/`, `social/quora/`;
   - `social/exports/`.

   Pillar pages and newsletters stay in `content/inbox/week-NN/` (`pillar.md`, `newsletter/{edition}-{lang}.md`). Front matter as in content/inbox/README.md, plus `keyword:` and `utm:`.
2. **Exports per week:**
   - a contact-sheet PDF (each image with its caption, in posting order);
   - the Meta Business Suite bulk-upload CSV (verify the current format first and say how you verified it);
   - a LinkedIn schedule sheet;
   - the newsletters as beehiiv drafts. Use the API if the free plan allows it; otherwise paste-ready HTML plus the exact steps.
3. **Gates:**
   - `node scripts/check-content.mjs` extended to: fact ids present, disclaimer on every newsletter, sponsored label where needed, banned words, UTM on every link, alt text on every image;
   - `scripts/check-parity.mjs` across PT, EN and FR.
4. **Order of work:**
   - **Samples first.** Before writing everything, send the CEO and the operator one US-EN newsletter (week 4, launch issue) and eight post images, one per format 1–8, with their captions in PT, EN and FR, plus the keyword map's top 10 per edition. Wait for the "go".
   - **After the go:** weeks 1–4 in full; weeks 5–12 as pillar outlines with their target phrases.
5. **Report back:** preview link, the samples, anything you could not verify. Keep it short. Do not post, schedule, send or merge anything.

# Writing brief for weeks 1–4: pillar pages and newsletters (prompt 30, CTO, 27 Oct 2026)

For whoever writes a week's pillar page and newsletters. Read, in this order, before writing a line:
content/VOICE.md, content/EDITORIAL_POLICY.md, content/NEWSLETTER_FORMAT.md, social/PLAYBOOK.md §1,
ops/prompts/30_content_engine_newsletter_social.md, the calendar at the end of content/SEO_ENGINE.md, and the sample
launch issue content/inbox/week-04/newsletter/us-en.md (the register to match).

## Hard rules

1. **Every figure comes from content/facts/facts.csv** (cite its id in `sources:`; in pillar pages also inline as `[[fact-id]]`) **or from site/public/data/prices.json** (INE medians per m² by municipality, key `munis.<slug>.m2[-1]` for Q2 2026, `[0]` for Q1 2016; `g10` is the ten-year change in %, `yield` the gross yield). Read the fact's value and notes before using it. If a number you want is not there, do not use it. Never invent a number, a person, a quote, a reader question or a listing.
2. **Currency:** amounts in euros, plus the reader's currency where it helps: CHF (ecb-eur-chf), USD (ecb-eur-usd), BRL (ecb-eur-brl), ILS (ecb-eur-ils), with the ECB reference rate and its date from facts.csv. Compute with Python; round sensibly.
3. **D34:** no town-against-town punchlines. When places are compared, use Lisbon, Porto, Cascais, Comporta (say "Grândola, Comporta's municipality, municipality median"), the Algarve (Loulé) and Madeira (Funchal). Never Gondomar as a comparison.
4. **D52:** never the word "private" / "privado" / "privé" for our services; no "luxury", "premium", "exclusive".
5. **D9, D14:** the only agency is Habinedita Gondomar (AMI 13250), and it has not signed yet. Any block that names it carries, right under the heading: `> PENDING AGREEMENT. Habinedita has not signed the partner agreement yet (tasks 9g, 12d). This block is not sent until it has; if it is still unsigned on send day, the block is left out.` Other partner categories (lawyer, bank, tax, fx) are not named: link to "talk to a partner" with `?cat=lawyer|bank|tax|fx` and say "a partner lawyer", etc.
6. **Describe, never advise** (no "you should", "we recommend"). Obstacle in the reader's words, then the rule or number, then the partner who solves it (VOICE.md rule 2). Talk to the reader directly (o seu / you / vous). No em-dash. No banned words (VOICE.md; scripts/check-content.mjs lists them). No rhetorical-question headings. No emigrant clichés (August, saudade, the village).
7. **The open legal point** (content/inbox/README.md): how exception (a) to the flat 7.5% IMT applies to emigrants who were once Portuguese tax residents. Quote the law as facts.csv states it and send that question to a partner lawyer or tax adviser. Do not resolve it yourself.
8. **Native writing.** PT is European Portuguese (no Brazilian forms) for LU, FR, CH, US, IL; the Brazilian edition's Portuguese is pt-BR (você, "imóvel", "cartório", Brazilian spelling). EN is American English. FR is French as written in Luxembourg, Paris and Geneva (vous). Each language is written natively, never translated word for word. Dates and numbers per VOICE.md ("250 000 €", "€250,000", "250 000 €", "7,5%", "7.5%", "7,5 %").
9. Do not run git. Do not touch files outside the folders you are given.

## Links

Every link to our site goes to the edition's own domain and section and carries UTM tags:
`https://{domain}/{lang}/{edition}/{path}?utm_source=newsletter&utm_medium=email&utm_campaign=w{NN}-{slug}-{edition}` (add `#form` or `#{faq-id}` after the query). Pillar pages use relative site paths, no UTM.

Domains: lu imoveisportugal.lu · fr imoveisportugal.fr · ch imoveisportugal.ch · br imoveisportugal.com.br · us imoveisportugal.us · il imoveisportugal.co.il. Language segment: pt, en, fr (pt also for Brazil).

| Page | pt | en | fr |
| --- | --- | --- | --- |
| FAQ (anchor = question id, e.g. #pt-nif, #en-sign, #fr-deed) | perguntas-frequentes/ | faq/ | questions-frequentes/ |
| Total-cost calculator (`?price=…&resident=0`) | simuladores/custo-total/ | calculators/total-cost/ | simulateurs/cout-total/ |
| Monthly payment | simuladores/prestacao/ | calculators/monthly-payment/ | simulateurs/mensualite/ |
| The map (`?budget=` in euros) | mapa/ | map/ | carte/ |
| House prices (10 years, INE) | precos-das-casas/ | house-prices/ | prix-des-logements/ |
| The path (`?door=buy&step=N`) | o-seu-percurso/ | your-path/ | votre-parcours/ |
| Talk to a partner (`?cat=lawyer` etc., then `#form`) | falar-com-um-parceiro/ | talk-to-a-partner/ | parler-a-un-partenaire/ |
| Free guide | guia-gratuito/ | free-guide/ | guide-gratuit/ |
| Blog article | blog/{slug}/ | blog/{slug}/ | blog/{slug}/ |

Path steps (buy): 1 where, 2 NIF and tax representative, 3 power of attorney, 4 finance, 5 cost, 6 promissory contract (CPCV), 7 deed, 8 registration, 9 after the purchase.

## The pillar page (one per language: PT, EN, FR)

File: `content/inbox/week-NN/pillar/{id}.{pt|en|fr}.md`, in the blog format of content/blog/imt-nonresidents.en.md (front matter: id, lang, slug (native per language), title ≤ 70 chars, description 80–160 chars, tldr 25–60 words, published and updated = the week's Monday, cta (lawyer|bank|tax|fx|agency), related, sources, plus `keyword:` with the language's target phrase). Body ≥ 700 words, `##` headings that are statements, at least 5 `[[fact-id]]` citations.
- The tldr and the first paragraph are the answer in 2–3 sentences: the number, its official source, "last checked" with the fact's checked date, and the brand name ("Imóveis Portugal").
- Then: what it is, how it works step by step, the edition differences that matter (a short section per country where the rule differs: LU, FR, CH, BR, US, IL), the cost or time it takes, then the partner who solves it.
- Link to the map area, simulator, path station and partner page that answer it (relative paths like `/en/us/calculators/total-cost/`; write them for the US edition in EN, LU in PT, FR in FR; the site swaps the edition).
- End with a short FAQ (`## Questions` then `**Question?**` + 40–70-word answer, 3–5 of them, the reader's own words) for the FAQPage schema.
- Run `node scripts/check-content.mjs` and fix every error in your files.

## Newsletters (one per edition and language: 6 editions × PT, EN, FR = 18 per week)

File: `content/inbox/week-NN/newsletter/{edition}-{pt|en|fr}.md`. Front matter: edition, lang (`pt-PT`, `pt-BR` for br-pt, `en`, `fr`), type: newsletter, week, date, title (= the first subject line), subjects (three options, each with a place, a price or a number, under 60 characters, no question-bait, no emoji), keyword (the edition-language target phrase), utm, sources (fact ids), sponsored (true only when the partner block is in), partner_status: pending-agreement (when it names the agency), status: draft. Personalisation: `{{first name | Olá}}` / `{{first name | Olá}}` (pt-BR) / `{{first name | Hi}}` / `{{first name | Bonjour}}`. End with the language's disclaimer copied exactly from EDITORIAL_POLICY.md (PT for pt-PT, PT-BR for pt-BR, EN, FR), then the line "[Unsubscribe: beehiiv adds the link]" in the language.

Each edition gets its own details, not a currency swap: Luxembourg (Portuguese community, the euro, lu-pt-treaty-property), France (fr-3916, the euro), Switzerland (CHF, the 2nd and 3rd pillar facts ch-*), Brazil (BRL, br-bens-exterior, br-cbe, br-pt-treaty-property), USA (USD, us-fbar, us-8938-abroad, us-pt-treaty-gains), Israel (ILS, il-pt-treaty-property). Use only the ones that touch the week's subject.

**Weeks 1–3: the welcome sequence** (no newsletter is sent before Tue 1 Dec; these are the three automated emails a new subscriber receives during the pre-launch, one built on each week's pillar). Add `welcome: 1|2|3` and `send: "automation: on signup" | "automation: day 3" | "automation: day 7"` to the front matter. 300–450 words. Shape: a warm two-line opening (who we are, the first issue arrives Thursday 3 December, a person reads every reply); the week's obstacle and its answer with one number and its source; one link to the pillar page and one to the matching tool or path station; the partner line; "Reply with your question"; sign-off "Imóveis Portugal"; disclaimer. No sponsor block in welcome emails.

**Week 4: the launch issue**, Thursday 3 December, the seven blocks of NEWSLETTER_FORMAT.md in order, 600–800 words. Block 1 runs the cost example (the agency has no listing with permission yet) and says so; block 3 is the map (D34: one budget on the map, linked with `?budget=`, no town against town); block 6 is the partner block with the PENDING AGREEMENT line and the sponsored label (`sponsored: true`, `sponsor: Habinedita Gondomar`, `partner_status: pending-agreement`). Keep the US-EN sample as the model; you may improve it if it breaks a rule here.

## When you finish

Run `node scripts/check-content.mjs` (it must pass for your files) and report: files written, word counts, any fact you wanted and did not find, any rule you could not meet.

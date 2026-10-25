# Imóveis Portugal — project briefing

For anyone joining the project in their own Claude session. Read this first, then the repo files it points to. Updated 25 Oct 2026 (end of session 2).

## The idea

A free media brand for people living abroad who want to buy a home in Portugal: emigrants, Brazilians, French, Swiss, Americans and Israelis. Positioning (D23): **the Doutor Finanças of people abroad buying in Portugal**. Free content, FAQ and simulators build traffic and trust; readers who need help are sent to licensed partners.

- **Six editions**, all launching **Tue 1 Dec 2026**: Luxembourg, France, Switzerland, Brazil, USA, Israel.
- **Three languages on every page** (D18): Portuguese (Portugal), English, French, with a language switch.
- **Core asset:** one free weekly newsletter per edition (Thursdays), plus the website and social media. Social starts as one account, "Imóveis Portugal", on Instagram and Facebook, posting in English first (D26, which overrides D13).
- **Goal:** profitable in year 1, then sell the brand within 12 months to a portal, an agency network, a bank or a media group.

## How it makes money

1. **Flat annual sponsorships** (D6, never per-lead fees). Founding prices for the first 10 sponsors: Gold 4,800 €, Silver 1,800 €, Bronze 540 € (year 1, price locked for year 2).
2. **Developer campaigns** (from 1,500 €), **paid guides** (29–49 €), a **paid personalised report** at 5,99 € after the simulators (D22; switched on once the billing entity exists).
3. **The partner group** (agency, credit intermediary, insurance) earns its own commissions; the brand earns its sponsorship:
   - **Habinedita Gondomar** (AMI 13250, habineditagondomar.pt) is the only real-estate agency on the platform (D14, D17), shown as **Gold sponsor** (D20). Calls: free 15-minute first call; paid 45-minute "Plano de compra" at 150 €, credited against the agency's fee if the client buys (D19).
   - The group's **credit intermediary** is the default financing partner on the simulators (D21); its name and Banco de Portugal registration number are still to come.
   - **Insurance** through the group's brokerage, never tied to the mortgage.

## Hard rules

1. **Anonymity:** no founder or team names anywhere (site, metadata, commits, emails, legal pages). The brand only. Commits as `Imoveis Portugal <ops@imoveisportugal.lu>`.
2. **Nothing goes public without the operator's approval:** no publishing, sending, merging or deploying to main without an explicit "go".
3. **No personal data or secrets in the repo.** A pre-commit hook blocks secrets and non-brand emails (`git config core.hooksPath .githooks`).
4. **GDPR:** double opt-in, unticked consent boxes, a privacy policy per edition, cookie-free analytics. Reader data goes only to the partner named at consent and is never sold.
5. **Sponsored content is always labelled.** Never call the platform "independent".
6. **Describe, never advise** (content/EDITORIAL_POLICY.md): primary sources for every fact, a disclaimer on every piece, no invented numbers or testimonials (Código da Publicidade).
7. **No other real-estate agencies** as sponsors or outreach targets (D9). **No Russian-capital companies** (D11). Developers, banks, lawyers, tax advisers, money-transfer firms and insurers are in scope.
8. **Free tools first:** no paid tool until a sponsor has paid.

## Inspirations

The brand DNA is **success and trust**: clean, calm, easy on a phone, and a feeling of "I want to belong to this". Take the lesson from each reference, never copy its text or visuals.

**Business model**
- **Doutor Finanças** (doutorfinancas.pt): the model (D23). Free content and 22 simulators lead into credit, insurance and home services; 24 M€ revenue in 2025. See their "Ecossistema Casa" one-stop page and their simulators.
- **Morning Brew, The Hustle:** newsletters built into sponsor businesses and then sold. That's our exit model.

**Voice and content**
- **Ryan Serhant** (serhant.com): sell the life, then prove it with numbers; a call to action on every screen.
- **Gary Vaynerchuk** (garyvee.com, vaynermedia.com): document, don't invent; native to each platform; reply to everyone.
- **Lucas Valente da Silva** (Forbes PT, idealista): a Portuguese real-estate personal brand built on consistency and video. Style only: agencies are never sponsors (D9).
- **Fanatics / Michael Rubin:** founder-led, high-energy brand building.

**Design and aesthetic**
- **Y Combinator, Stripe, Linear:** confidence, plain words, numbers, lots of white space.
- **Amorim family in Comporta:** quiet luxury. Few words, place and lifestyle, nature, premium photography.
- **Vanguard Properties / José Cardoso Botelho:** design-led projects for international buyers, an assured voice about Portugal.
- **Sotheby's Realty, Mansion Global:** premium real-estate media.
- **Monocle:** European editorial trust.
- **Wise:** the model for the language switch, transparent numbers and the FAQ/help pages.
- **Knight Frank Wealth Report, Stripe Press:** the model for our e-books as short premium reports.

**Country benchmarks (what people already read)**
- USA: Wise, BrightTax and Remitly guides on buying in Portugal.
- France: idealista's French guide and expat.com forums.
- Switzerland: Le Temps on Swiss retirees in Portugal; 2nd/3rd pillar guides.
- Luxembourg: justarrived.lu, Contacto.
- Brazil: Euro Dicas, Cidadania e Visto, Ebury.

**What to avoid:** the generic AI landing page: small labels above every heading, "three numbers / three steps" blocks, check-mark bullets, stock postcards, filler words ("descubra", "jornada", "sem complicações", "seamless"). See ops/prompts/11_anti_slop.md.

## Team and how we work

- **CEO/COO:** Claude in claude.ai: strategy, sponsors, copy, content plan, writes the prompts.
- **CTO:** Claude Code: builds and runs the site, e-books, newsletter drafts, social exports.
- **Operator:** relays between both and approves everything public. Partner and Father review content (legal/tax and market facts).
- The CEO writes numbered task prompts in `ops/prompts/`; the operator tells Claude Code "Read ops/prompts/NN_... and execute it". Claude Code works on its branch and opens a PR; nothing reaches main without approval.

## Where things are

- **Repo (private):** github.com/danielvasconceloscardoso-tech/imoveis-portugal
- **Live beta (main, older design):** https://imoveis-portugal.geralportugalimoveis.workers.dev
- **Preview of the work in progress (Claude Code's branch):** https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev
- **Brand mailbox:** geralportugalimoveis@gmail.com
- **Hosting:** Cloudflare Workers, free (site/wrangler.jsonc). Each push to the branch updates the preview; main updates the live link.

| File | What it is |
| --- | --- |
| CLAUDE.md | The CTO brief: business, rules, stack, slash commands |
| ops/DECISIONS.md | Every decision, dated (D1–D23) |
| ops/TASKS.md | Task board with owners and due dates |
| ops/PLAN.md | 90-day cash plan and the Doutor Finanças benchmark |
| ops/prompts/ | Task prompts 01–13 for Claude Code |
| content/EDITORIAL_POLICY.md | Sources, disclaimers, sponsored labels |
| content/VOICE.md, content/GLOSSARY.md | Voice rules and fixed terms (NIF, IMT, CPCV…) |
| content/copy/COPY_DECK.md | Every text on the site in PT, EN, FR: edit here |
| content/copy/CEO_EDITS.md | Copy corrections waiting to be applied |
| content/faq/, content/facts/facts.csv | FAQ answers and the verified facts behind them |
| sponsors/pipeline.csv, sponsors/Sponsors_v2.xlsx | Sponsor CRM (~130 companies, tiers A/B/C) |
| site/ | The Astro site (all editions and languages) |

## Status (25 Oct 2026, end of session 2)

Done and on `main` (live link, still noindex):
- Site v2 in PT, EN and FR: home, FAQ (including "Habitação Própria Permanente"), partner pages, 10 calculators, "what a budget buys", house prices, "home from abroad", paid report (switched off, D22).
- 18 free e-books, now 15 pages with chapters on main home versus other home and on the mortgage from offer to deed.
- **Blog** (task 15): index, article pages, SEO data, per-edition sitemaps, two articles in PT, EN, FR (non-resident IMT at 7.5%; buying from abroad step by step), linked from the menu, footer and home page.
- Prompt 03: five Israeli-capital developers in the pipeline, a "Chambers & embassies" tab, `sponsors/INTERNATIONAL.md`, seven English outreach drafts (not sent).
- Content and publishing plan: `ops/PLAN_CONTENT.md`. Decisions D24 to D30 (blog canonicals, one newsletter per language, one social account, faceless AI video, Meta Business portfolio).
- Quality gates: `scripts/check-content.mjs` and `scripts/check-parity.mjs`.

Open, in order of what blocks money:
1. **D4, the billing entity**: blocks sign-ups (data controller), legal pages and payments.
2. **Operator setup**: beehiiv, Tally, Cal.com, Meta Business portfolio with one Facebook Page and one Instagram account, domains, Unsplash key (tasks 17d, 2b, 5, 8t). Every form ID in `site/src/config.ts` is still empty.
3. **Who is the Meta admin profile** (a real personal profile is required; do not create a fake one).
4. From the agency: profile text, one real listing with permission, the credit intermediary's name and registration number, a signed Gold agreement.
5. Build `/publish-week`, the social export and the card generator (prompt 14).
6. Outreach: approve the week-1 drafts and the seven international drafts once the legal bases are confirmed (tasks 8p, 8q, 16b).
7. 42 lines of unverified facts in `content/faq/UNVERIFIED.md`, plus the items added from the Doutor Finanças guide.

## Where help is most useful now

1. **Copywriting:** review content/copy/COPY_DECK.md page by page. It must sound human, specific and trustworthy, never generic AI text. Put corrections in content/copy/CEO_EDITS.md.
2. **Facts:** close items in content/faq/UNVERIFIED.md with primary sources.
3. **Sponsors:** work through "This week's 40" in sponsors/Sponsors_v2.xlsx using the templates in sponsors/METHOD.md. Drafts only until the operator approves.

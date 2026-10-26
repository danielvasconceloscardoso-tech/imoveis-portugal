# Imóveis Portugal: handover briefing

For anyone joining the project in their own Claude session. Read this first, then `ops/CONVERSATION_LOG.md` (how we got here, in the operator's own words), `ops/DECISIONS.md` and `ops/TASKS.md`. Updated Mon 26 Oct 2026, evening.

## 1. What it is

1. A media and data brand for people living abroad who want to buy, sell or inherit a home in Portugal.
2. Six editions, all launching **Tue 1 Dec 2026**: Luxembourg, France, Switzerland, Brazil, USA, Israel. The site is in Portuguese (Portugal), English and French, with a language switch (D18).
3. Core assets:
   - one free weekly newsletter per edition, sent on Thursdays;
   - the website: the 3D map with ten years of official prices, the buying and selling paths, the FAQ and the simulators;
   - daily social posting (D42, D43).
4. Goal: profitable in year 1, then sell the brand to a portal, an agency network, a bank or a media group.
5. Register: **Claridge's**. Calm, discreet, impeccable, concierge-like. The reader should feel they are walking into a great hotel, not a property portal (D37).

## 2. How we work

1. **Operator (Daniel):** decides and approves everything. Nothing is published, sent, posted or merged without his explicit "go".
2. **CEO/COO:** Claude in a claude.ai chat. Covers strategy, monetisation, copy, sponsor lists and brochures. Writes numbered task prompts into `ops/prompts/` and gives the operator a short paste script for Claude Code.
3. **CTO:** Claude Code, working on branch `claude/brave-gauss-cwafi6`.
   - Builds the site, map, demos, PDFs and films.
   - Pushes after each section, so the preview link updates on its own.
   - Never merges without a "go".
4. **Run order:** `ops/prompts/00_MASTER_RUN.md`. Prompt 29 (done today) came before 23; next come 23 (identity), 21, 24, 22, then whatever is left of 15–20.
5. **For a new collaborator:**
   - Ask the operator for access to the private GitHub repo.
   - Run `git config user.name "Imoveis Portugal"`, `git config user.email ops@imoveisportugal.lu` and `git config core.hooksPath .githooks` before any commit.
   - Never commit as a person.
   - Put proposals in a file or a branch and let the operator relay them; don't push to the branch Claude Code is working on.

## 3. Hard rules

1. **Anonymity:** no founder or family names on anything public: site, metadata, commits, emails, legal pages. The brand only.
2. **Approval:** nothing public without the operator's "go". Newsletters go to beehiiv as drafts; social posts are exported, never auto-posted; comments are never answered automatically.
3. **No personal data or secrets in the repo.** The pre-commit hook blocks secrets and non-brand emails.
4. **GDPR:** double opt-in, unticked consent boxes, consent per named recipient, a privacy policy per edition, cookie-free analytics.
5. **Describe, never advise.** Primary sources for every fact and a disclaimer on every piece (`content/EDITORIAL_POLICY.md`). Sponsored content is always labelled.
6. **Leads:** buyer requests go only to the licensed partner agency, Habinedita Gondomar (AMI 13250) (D14, D17). We never act as an intermediary. Where developer-project enquiries go is still open (task 8z).
7. **Sponsor scope:**
   - No other real-estate agencies (D9).
   - No Russian-capital companies (D11).
   - Credit brokers and insurers are parked as sponsors (D41).
   - Competitors such as Doutor Finanças, idealista and Casafari are sources and benchmarks only. We learn from them; we never copy their data or design.
8. **Free tools first.** No paid tool until a sponsor has paid.

## 4. How it makes money (D38–D40, D45, D52)

Prices live only in the sponsor brochure used on calls, never on the website.

1. **Area placements for developers:** per slot per year, max 3 per area. Prime 24,000 €, Strong 12,000 €, Standard 6,000 €. They cover the map, price trends and area pages.
2. **Project launches:** 7,500 €, or 15,000 € for prime.
3. **Journey checkpoints for advisers** (banks, lawyers, tax advisers, wealth managers): per step per country per year. CH, LU and US 12,000 €; FR and IL 8,000 €; BR 5,000 €. The structuring step is ×1.5.
4. **Wealth Partner:** 48,000 €. International private banks, wealth managers, tax planners and private-client lawyers. Brochure only.
5. **Founding Partners:** the first 10 get 40% off year 1, with the price locked for year 2.
6. **Referral commissions,** only in unregulated categories (money transfer, NIF and tax representation, translation, moving, furniture, rental management), always labelled (D45).
7. **Paid information products:** dossiers at 190 €, 90 € and 950 €. The buttons stay off until the billing entity exists (D4).
8. **Later:** licensing the map and data (embeds "Powered by Imóveis Portugal") and the Data line (D47).
9. **The first sale is the developer demo:** a private page and film showing a developer how a buyer abroad finds their homes through us. Four are ready: Vanguard Properties, Vale do Lobo, Shalu Investments and VIC Properties.

## 5. What exists today (26 Oct 2026, end of day)

**Links** (private previews, noindex):
- Work in progress (Claude Code's branch): https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev
- Saved version of the map and path the operator likes (never changes): https://freeze-map-path-v1-imoveis-portugal.geralportugalimoveis.workers.dev
- Map v2 to compare against it (time slider, compare two places, Islands filter, coastal glide; coastal photos pending): https://map-v2-imoveis-portugal.geralportugalimoveis.workers.dev
- Developer demos:
  - [Vanguard](https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/34c86306cf/)
  - [Vale do Lobo](https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/65bf930b11/)
  - [Shalu](https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/f658bd1eef/)
  - [VIC Properties](https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev/d/7c1e5a90d4/)
- Older live beta (main): https://imoveis-portugal.geralportugalimoveis.workers.dev

**Built:**
1. **Site** in three languages:
   - the path ("O seu percurso": buy or sell as a route of stations, like a game);
   - the 3D map (all 308 municipalities clickable, search, parishes, one budget field, a place card with the 10-year chart, yield, momentum and comparables);
   - the FAQ as a top section;
   - the simulators;
   - partner pages;
   - the "Your team for this purchase" panel and the qualified summary on every enquiry (D54);
   - partner showcase pages with developers' published homes (D53).
2. **Demos v3** (D56, D57):
   - each page opens with "How a buyer reaches you" in seven steps and a "Walk the path as this buyer" button;
   - each has a 72-second film from the buyer's side: one woman's voice thinking out loud about her problems while the screen shows the site solving each one, ending with the developer opening her request the next morning;
   - files are in `sponsors/demos/` on the branch (films with and without subtitles, voice, loops, PDFs, frames).
3. **Sponsor material:**
   - `sponsors/pipeline.csv` and `Sponsors_v2.xlsx` (built with `python3 sponsors/build/build_v2.py`);
   - the Partner Prospects PDF (`sponsors/prospects/`);
   - the brochure (Wealth Partner naming).
4. **Accounts:** beehiiv publication and Tally forms are set up (`ops/ACCOUNTS.md`).

**Being fixed now** (CEO review, 26 Oct evening):
1. The numbers in the films must agree. Her budget is $3.5 M including taxes; the cost screen should work back to the price she can afford, and the request must show the same budget.
2. In demo mode, hide every partner-agency button until task 8z is decided.
3. Zoom into what she is asking about, so the text reads on a phone.
4. Add licensed stock footage and music. This waits on the operator adding Unsplash, Pexels and Pixabay to Claude Code's network list.

## 6. The operator's taste (read this before writing or designing anything)

**He likes:**
- Claridge's, the concierge feel, OneMark Properties (José Cardoso Botelho) as the design reference;
- white, near-black, a large Playfair serif with Manrope, numbered sections, our deep green #2F5D50 as the only accent (D50);
- real photographs of real places;
- optimistic but realistic copy;
- clear numbers;
- the current map and path (saved as v1; only change them on a separate branch he can compare).

**He rejects:**
- anything that looks AI-made: generic landing pages, labels over every heading, "three steps" blocks, check-mark bullets, cream/beige AI palettes, stock-photo credits on images;
- clichés: "paraíso", "oportunidade única", "todos os agostos", "casa tratada de fora", "jornada", "descubra", "seamless";
- Bodoni-and-brass and Serhant-style designs (tried and rejected);
- a "Private" label: high budgets are handled quietly, with no tiers named (D52);
- copy no real person would say out loud. Write the way people talk;
- events, webinars, roundtables or services added without asking him (D36);
- demos in any language but English (D51).

**How he works:**
- Fast, direct, critical.
- Wants complete lists and ready-to-paste scripts, not partial ones.
- Wants the CEO to act like a CEO: anticipate, check Claude Code's work, catch mistakes before he does.
- Prefers documents as PDF.
- Business decisions (prices, partners, positioning) are his: propose, don't decide.

## 7. Open items

**Operator:**
1. Add the network lines for Unsplash, Pexels, Pixabay and GitHub release downloads to Claude Code's environment.
2. **D4:** the billing entity. It blocks invoicing, the beehiiv footer, grants and Google indexing.
3. **8z:** where developer-project enquiries go: to the developer, through the partner agency, or the buyer chooses.
4. **26a:** approve the demos before any developer sees them.
5. **28a:** add the Tally hidden fields `brief` and `team`.
6. **29a:** approve the buyer voice.
7. **29b:** compare map v1 and v2.
8. **8x:** ask DGT about the CAOP licence.
9. **8y:** decide on agency licensing of the map.
10. **From the partner group:** the credit business's name and Banco de Portugal number, one real listing with photos, the Gold agreement, Cal.com.

**CEO, once the demos are approved:** four short English approach emails (Vanguard, Vale do Lobo, Shalu, VIC) with the demo links.

**CTO:** the demo fixes above, then prompt 23, 21, 24, 22.

## 8. Where things are

| File | What it is |
| --- | --- |
| CLAUDE.md | The CTO brief: business, rules, stack, slash commands |
| ops/CONVERSATION_LOG.md | How we got here: the operator's requests in order, and what each one changed |
| ops/DECISIONS.md | Every decision, dated (D1–D57) |
| ops/TASKS.md | Task board with owners and due dates; "Last session" summaries from Claude Code |
| ops/prompts/ | Task prompts 01–29 and 00_MASTER_RUN.md |
| ops/NETWORK_ALLOWLIST.txt | Every domain Claude Code may reach |
| ops/ACCOUNTS.md | beehiiv and Tally IDs (no passwords) |
| ops/PLAN.md, ops/PLAN_CONTENT.md | Cash plan, Doutor Finanças benchmark, content plan |
| content/VOICE.md, content/EDITORIAL_POLICY.md | Voice rules, sources and disclaimers |
| content/copy/ | Copy deck and CEO edits |
| content/developers/projects.json | Developers' published homes, with source URL and date for every item (branch) |
| sponsors/ | Pipeline, workbook, prospects PDF, brochure, demos (branch) |
| site/ | The Astro site (Cloudflare Workers, free) |

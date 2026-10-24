# Prompt 02 — Redesign the site and media kits, write week 1 outreach

To run: in Claude Code, plan mode, type "Read ops/prompts/02_redesign_and_outreach.md and execute it."

---

You are the CTO. Read CLAUDE.md, ops/TASKS.md, ops/DECISIONS.md and ops/PLAN.md first.

## Where we stand (24 Oct 2026)

1. Decisions D1–D3 and D5–D7 are taken (ops/DECISIONS.md): one site with four edition sections, one brand account per social platform, founding prices (Gold 4,800 €, Silver 1,800 €, Bronze 540 € in year 1), launch of all four editions on Tue 1 Dec 2026, every paid relationship is a flat sponsorship. D4 (billing entity) is postponed: no payment links yet.
2. Sponsor list v2 is done: sponsors/Sponsors_v2.xlsx and sponsors/pipeline.csv (150 companies, 90 tier A/B with evidence). Outreach starts Mon 26 Oct with the "This week's 40" tab.
3. A first version of the site exists in site/ (Astro, 21 pages, LU/FR/CH/BR) with all copy in site/src/i18n.ts and all operator settings in site/src/config.ts. It works, but Daniel finds the design too generic and "AI-looking".
4. Media kits exist in sponsors/mediakit/ (printed from the partner pages). Daniel rejects their look.
5. Accounts (domains, Cloudflare, Tally, beehiiv, Cal.com) are being set up by the operator following ops/SETUP.md. Until then, forms show a placeholder message.

## Part A — Site redesign: look like a top-tier property and finance publication

The standard: a buyer, a bank's marketing director or a law firm partner should feel this is an established, well-funded publication. Think of the quality bar of the best property, finance and editorial brands, not of a startup template.

1. **Directions first.** Before building, design three clearly different visual directions for the home and partner pages (palette, type, layout, photography, logo/wordmark). Render each as a static mock and screenshot it at desktop and mobile. Show the screenshots to the operator and wait for a choice.
2. **Avoid the generated look.** None of these unless the chosen direction truly needs it: cream background with a serif display and a terracotta or green accent; identical rounded cards with soft shadows; gradient washes; all-caps labels above every heading; numbers styled 01/02/03 when content is not a sequence; arrows appended to links; emoji. The current site and media kits are examples of what Daniel does not want.
3. **Photography.** Use real photography of Portuguese homes, streets and coast with a license that allows commercial use (for example Unsplash). Store the files in the repo with a credits file. No AI-generated images, no stock photos of people shaking hands.
4. **Wordmark.** Design a simple wordmark and favicon for "Imóveis Portugal". Text-based, no clip-art house.
5. **Keep what works.** Keep the content model (site/src/i18n.ts), the settings (site/src/config.ts), the four editions and their URLs, the domain middleware, noindex until launch, self-hosted fonts (no Google Fonts CDN), no trackers and no cookies. Copy edits are allowed where the new layout needs them; show changed copy in the PR description.
6. **Quality floor.** Responsive from 360 px, visible keyboard focus, WCAG AA contrast, reduced motion respected, Lighthouse 95+ on performance, accessibility, best practices and SEO for the home and partner pages of every edition. Review your own screenshots at 1440 px and 390 px before asking for approval.

## Part B — Media kits: a real sales document

1. One media kit per edition (LU and CH in Portuguese, FR in French, BR in Brazilian Portuguese), in the chosen visual direction, designed as a document and not printed from the web page.
2. Landscape A4, about 6 pages: cover with photography; who reads us (sourced numbers from i18n.ts); the four editions; packages and founding offer with prices from config.ts; launch calendar (1 Dec, Christmas peak); rules (sponsored content labelled, one partner per category); contact page with booking link and email from config.ts.
3. Build it from HTML/CSS so prices and numbers come from the same config, and export PDFs to sponsors/mediakit/ with a script (`npm run mediakit`). Screenshot every page and check it before showing it.

## Part C — Week 1 outreach emails (drafts only, never sent)

1. For each company in the "This week's 40" tab of sponsors/Sponsors_v2.xlsx, write a personalised first email in the right language (PT for LU/CH, FR for FR, PT-BR for BR), using the evidence in the row (for example "we saw your ad in LusoJornal"). Start from the templates in sponsors/METHOD.md.
2. Rules: plain prose, no bullet points, under 120 words, one clear ask (a 15-minute call), an opt-out line at the end, no promises of returns, signed with the placeholder `[Assinatura]` until Daniel chooses the signature.
3. Save as sponsors/outreach/week-1/NN-company.md (subject line first) plus one CSV (company, edition, language, subject, body) that can be pasted into a Gmail mail-merge tool for one-to-one sending.
4. Do not store personal email addresses in the repo: the recipient column says where to find the contact (website form, general address, LinkedIn).
5. The operator approves the drafts (in Claude Code or in the CEO chat) before anything is sent. Never send email yourself.

## Not for you

Creating the Gmail or other email accounts, buying domains and opening Cloudflare, Tally, beehiiv and Cal.com accounts are the operator's (ops/SETUP.md). If you need something from those accounts, list it in one message.

## Order and approvals

1. Plan for A, B and C, then wait for approval.
2. Part C can run in parallel with the design work.
3. Show the three directions, wait for a choice, then build A, then B.
4. Open a PR with screenshots for the site and PDFs for the kits. The operator approves before merge.
5. End the session with the summary in ops/TASKS.md under "Last session".

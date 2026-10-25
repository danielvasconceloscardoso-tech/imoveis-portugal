# Prompt 15 — Growth engine: monetisation, outreach, SEO, media push, quality scorecard

To run: "Read ops/prompts/15_growth_engine.md and execute it." Work on a branch and open a PR. Nothing is published, sent, posted or merged without the operator's explicit "go". Everything in PT, EN and FR. Read CLAUDE.md, ops/DECISIONS.md (to D31), ops/PLAN.md, ops/PLAN_CONTENT.md and sponsors/METHOD.md first. Don't reopen decisions.

CEO view: the site is good enough to sell. Revenue is now blocked by four things: no billing entity (D4), no live forms, outreach not started, and no proof of audience. This prompt builds everything that turns the site into signed sponsors by 1 Dec and traffic after launch.

## 1. Sponsor offer v3 (sponsors/OFFER_V3.md + partner pages + media kits)

Items marked *proposal* are prices or positioning for Daniel to confirm: build them, and list them in the PR as decisions for Daniel.

1. **Sell categories, not just tiers.** One partner per category per edition, so exclusivity is the product: bank, lawyer, tax adviser, money transfer, insurer, developer (one per region). The partner group holds real estate, credit and insurance as defaults (D14, D20, D21). *Proposal:* category exclusivity = Gold.
2. **Inventory a sponsor can see**, listed on the partner page with what each tier gets:
   - simulator "oferecido por";
   - the labelled sponsor answer on the FAQ questions in its category;
   - a newsletter slot;
   - an e-book chapter;
   - a monthly live webinar ("Comprar casa em Portugal a partir de [país]", co-hosted with the partner agency and one bank and one lawyer, with consented sign-ups going to the named co-hosts).
3. **Founding Partner scarcity:** 10 slots, a counter on the partner page, deadline 1 Dec.
4. **Pre-launch proof without invented numbers:** community size per country (official statistics), Google search interest (Trends), the partner group's reach, launch plan. Audience figures are added only once real (METRICS.md).
5. Update the per-edition media kit (PDF, design C rules from prompt 11) and the partner page.

## 2. Outreach system (sponsors/outreach/, drafts only)

1. **Segments and order:** (a) warm intros first: banks the partner group's credit intermediary already works with. List them as "warm, via partner" (operator fills in names). (b) Tier A from pipeline.csv, then the banks added in prompt 13. (c) Bilateral chambers and diaspora associations (prompt 03).
2. **Three-touch sequence per segment and language:** day 0 email, day 3 LinkedIn connection note (manual, written for the operator), day 7 short follow-up. First line personalised from the evidence column (their ad, their guide, their non-resident page). One clear ask: a 15-minute call. Founding offer and 1 Dec deadline in touch 3.
3. **Tracking:** add columns to pipeline.csv: touch1, touch2, touch3 dates, reply, call date, outcome. `/status` reads them.
4. **Limits:** max 30 emails a day from the brand mailbox, plain text, an opt-out line in every email. Sending waits for Daniel's confirmation of the legal grounds for B2B emails per country (task already open).
5. **Free tooling only (D30):** Gmail plus a mail-merge from Google Sheets on a free plan. Document the steps for the operator in sponsors/outreach/HOWTO.md.

## 3. SEO (site + content/SEO_PLAN.md)

1. **Keyword map per language** from free sources: Google autocomplete and "People also ask" via web search, Google Trends, AlsoAsked or AnswerThePublic free tiers, Reddit and Facebook-group questions. Group by intent: costs, process, tax, mortgage, places, inheritance, returning home. Each cluster gets one pillar page and supporting articles. Map each cluster to its simulator and partner.
2. **Programmatic pages with real data:** "Comprar casa em [concelho]" for the 30 municipalities our readers buy in most (North and Centre first): INE median price per m², what 250k/500k € buy there, IMI rate set by the municipality, the cost simulator prefilled, the agency call to action. Only where the data exists; no thin pages.
3. **Technical:** schema (Organization, FAQPage, Article, BreadcrumbList, HowTo where it fits), hreflang already done (D24), sitemaps, internal links from every article to its pillar, simulator and FAQ. An llms.txt and clear answer-first paragraphs so AI search tools (Google AI Overviews, ChatGPT, Perplexity) can cite us.
4. **Launch-day checklist (ops/LAUNCH_SEO.md):** switch launchReady, Google Search Console and Bing Webmaster Tools for each domain, submit sitemaps, request indexing of pillars, Cloudflare Web Analytics on.

## 4. Media push for 1 Dec (ops/LAUNCH_MEDIA.md + content/press/)

1. **Data story as the launch hook:** "O que 500 000 € compram no Luxemburgo, em Paris, em Genebra, em São Paulo e em Nova Iorque vs em Portugal" from prompt 12's comparisons, with official sources and a shareable image per country.
2. **Press kit** in PT, EN and FR: release, the data story, logo, screenshots, brand facts, contact = brand mailbox. Quotes are signed "a redação" (anonymity).
3. **Diaspora and property media list** (name, country, language, section, public contact page, no personal emails): Contacto (LU), LusoJornal (FR), Gazeta Lusófona (CH), Mundo Lusíada and Portugal-focused Brazilian outlets (BR), Portugal Resident and The Portugal News (EN), idealista news, ECO, Expresso, Público and Jornal de Negócios property sections, Lusa. Add any community associations and consulate newsletters that publish community news.
4. **Launch calendar, 10 Nov to 15 Dec:** teasers on social (D26, D27), founding partners announced, press release on launch day, data story the following week, the first webinar mid-December. Community groups: contribute answers with permission, never spam links.

## 5. Quality scorecard per page and language (scripts/scorecard + design/SCORECARD.md)

Build one command that scores every page in PT, EN and FR and fails below the thresholds:
1. **Grammar and style:** LanguageTool public API (pt-PT, fr, en-US; free, rate-limited). Zero errors on headings and buttons.
2. **Readability:** Flesch Reading Ease for EN (target 60+), the Fernandes adaptation for PT, and the Kandel-Moles formula for FR. Average sentence length under 20 words.
3. **Voice checks:** banned and AI words (content/VOICE.md), em-dashes, headings phrased as questions, three-item lists, repeated openings.
4. **Accessibility:** axe-core via Playwright (zero serious issues).
5. **Performance and SEO:** Lighthouse mobile (95+ on all four categories).
6. **Parity:** the same blocks exist in all three languages, with no English left in PT or FR pages.
7. Fix everything below threshold, then commit the scorecard.

## 6. Real-people test kit (ops/USER_TEST.md + a Tally questionnaire spec)

AI scores can't tell us whether a Luxembourg emigrant trusts the site. Build a 10-minute test for five people per audience (LU emigrant, French buyer, Brazilian, American, a sponsor's marketing manager):
1. 5-second test: "what is this site and who is it for?"
2. Find a task (the cost of a 250k € home, book the free call).
3. Three questions: what would stop you trusting it, which words felt odd or machine-written, would you subscribe.
4. Collect answers through a Tally form (spec only; the operator creates it). Results go into CEO_EDITS.md.

## Review

Push after each section. In the PR: the preview link, OFFER_V3.md, the outreach drafts for the first 10 tier-A companies, the SEO plan and the first 5 programmatic pages, the press kit, the scorecard results per language, and a short list of decisions for Daniel. Keep it short. Don't merge.

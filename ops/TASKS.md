# Tasks

Owners: CEO (Claude, claude.ai) · CTO (Claude Code) · Operator · Partner · Father
Status: To do · Doing · Blocked · Done

## Decisions for Daniel

| # | Decision | Options | CEO recommendation | Status |
| --- | --- | --- | --- | --- |
| D1 | Site structure | One site, four edition sections; country domains point to their section | — | Decided |
| D2 | Social accounts | One brand account per platform to start | — | Decided |
| D3 | Pre-launch pricing | Founding prices: Gold 4,800 €, Silver 1,800 €, Bronze 540 € in year 1; lower if more than half of the first 10 calls object | — | Decided |
| D4 | Billing entity | Which entity invoices sponsors and receives payments | Brand-only entity, not in Daniel's name | Postponed: no payment links until set |
| D5 | Launch date | All four editions on Tue 1 Dec 2026 | — | Decided |
| D6 | Legal frame | Every paid relationship (sponsors and agency) is a flat sponsorship, as for conferences; no per-lead fees | — | Decided |
| D7 | Decisão / Paperjam event, 10 Nov 2026 | Brand does not attend; Daniel attends in his own professional capacity and reports back | — | Decided |
| D10 | International editions | USA and Israel launch on 1 Dec with the other four (six editions), in English; Hebrew later when a sponsor pays for translation | — | Decided |
| D13 | English editions: name and domains | Sites keep the Imóveis Portugal brand on country domains (for example imoveisportugal.us and an Israeli domain; check availability and eligibility); social accounts named "Portugal Home Guides" | — | Decided; domains to buy |
| D11 | Russia | Exclude Russian-capital companies and Russian bodies (EU sanctions: Reg. 269/2014, Reg. 833/2014) | Exclude | Decided |

## Board

| # | Task | Owner | Status | Due |
| --- | --- | --- | --- | --- |
| 1 | Prompt 01, Parts 1–2: rebuild sponsor list and 90-day plan | CEO | Done | 2026-10-24 |
| 2 | Prompt 01, Part 3: Sprint 0 site (site/: four editions, partner page with prices and founding counter, buyer form, newsletter signup, legal drafts, domain middleware) | CEO (in place of CTO) | Done | 2026-10-24 |
| 2b | Operator setup: follow ops/SETUP.md (mailbox, domains, Cloudflare Pages, Tally, beehiiv, Cal.com) and send the IDs to the CEO chat | Operator | To do | 2026-10-28 |
| 2c | Put form IDs, embeds, booking link and contact email into site/src/config.ts | CEO or CTO | Blocked: waits for 2b | 2026-10-28 |
| 3 | Answer D1–D7 (D4 postponed) | Operator | Done | 2026-10-24 |
| 3b | Report back from the Decisão/Paperjam event (contacts, companies worth adding) | Operator | To do | 2026-11-11 |
| 4 | Create brand email (forwarding via Cloudflare Email Routing once a domain is on Cloudflare) | Operator | To do | 2026-10-27 |
| 5 | Buy domains .lu, .fr, .ch, .com.br; check WHOIS privacy for .com.br before using a personal CPF | Operator | To do | 2026-10-27 |
| 6 | Create free accounts with the brand email: Cloudflare, beehiiv, Tally, Cal.com | Operator | To do | 2026-10-28 |
| 7 | Confirm the agency receives buyer leads and the commission split, in writing | Father | To do | 2026-10-31 |
| 8 | Media kit per edition (sponsors/mediakit/*.pdf, generated from the partner pages) | CEO | Done (v1, rejected on design) | 2026-10-24 |
| 8b | Run ops/prompts/02_redesign_and_outreach.md: three design directions, redesign site and media kits, draft week-1 outreach emails | CTO | Directions and outreach done; site and media kit build continues in prompt 07 (8n) | 2026-10-26 |
| 8c | Create the brand Gmail mailbox | Operator | Done (geralportugalimoveis@gmail.com) | 2026-10-24 |
| 8d | Decide the outreach email signature (Partner's first name, a pen name, or "Equipa Imóveis Portugal") | Operator | To do | 2026-10-25 |
| 8e | Redo week-1 drafts for the new "This week's 40" (agencies removed, D9): rebase branch claude/brave-gauss-cwafi6 on main, delete drafts for companies no longer in the list, write the missing ones | CTO | Done (branch claude/brave-gauss-cwafi6) | 2026-10-25 |
| 8f | Branch claude/keen-pasteur-epzzfr is from the stuck first session and deletes current files: never merge, delete it | Operator | To do | 2026-10-25 |
| 8p | Approve the week-1 drafts in sponsors/outreach/week-1/ (README there lists what to check); nothing is sent before 8q | Operator | To do | 2026-10-26 |
| 8q | Confirm the legal bases for B2B outreach per country (sponsors/METHOD.md, Outreach rules point 2); until then the drafts stay drafts | Operator (Daniel) | To do | 2026-10-26 |
| 8r | Remessa Online, Bordr and e-residence are listed as affiliate offers: decide whether an affiliate commission fits D6 (flat sponsorships only); drafts pitch sponsorship only | CEO | To do | 2026-10-28 |
| 8s | Choose one of the three design directions | Operator | Done: direction C with colour photos (D15) | 2026-10-24 |
| 8t | Create a free Unsplash developer app (unsplash.com/developers, brand mailbox) and add its Access Key to this cloud environment as the environment variable UNSPLASH_ACCESS_KEY (environment menu > Edit > Environment variables), never in the repo. Needed to search more photos and to fill in the photographer credits | Operator | To do | 2026-10-27 |
| 9 | Send "This week's 40" (sponsors/Sponsors_v2.xlsx), 8 per day, templates in sponsors/METHOD.md; log status | Partner | To do | 2026-10-30 |
| 10 | Meta Ad Library pass for Luxembourg and Switzerland (links in sponsors/METHOD.md); add advertisers as tier A | Partner | To do | 2026-11-06 |
| 11 | Get the latest exhibitor list of the Paris Portuguese property fair | Partner | To do | 2026-11-06 |
| 12 | Optional: move repo to a brand GitHub organisation (current account name contains the founder's name) | Operator | To do | 2026-11-07 |
| 8g | Run ops/prompts/03_international_sponsors.md (foreign-capital developers, bilateral chambers, embassy economic sections; drafts only) | CTO | To do | 2026-10-30 |
| 8h | Run ops/prompts/04_free_ebooks.md (facts base + free e-books per edition; drafts for review) | CTO | To do | 2026-11-06 |
| 8i | Review legal and tax facts flagged in the e-book PR | Operator | To do | 2026-11-10 |
| 8j | Apply ops/prompts/05_usa_israel_editions.md to prompts 02–04 (USA and Israel editions for 1 Dec) | CTO | To do | 2026-10-26 |
| 8k | Run ops/prompts/06_faq_and_topics.md (FAQ pages per edition, 10-week content plan, week 1–2 drafts) | CTO | Done: PR open for review | 2026-11-06 |
| 8l | Buy the USA and Israel domains: options in ops/DOMAINS_US_IL.md (.us has no WHOIS privacy and needs a US presence; .co.il rules unclear); availability still to check | Operator (decision CEO and Daniel) | To do | 2026-11-06 |
| 8m | Switzerland edition in Portuguese and French (site language switch, FAQ, e-books, media kit, newsletter): apply in prompts 02, 04, 06 | CTO | To do | 2026-11-06 |
| 8n | Run ops/prompts/07_build_direction_c_beta.md (build design C with colour photos, six editions, media kits, free beta preview) | CTO | To do | 2026-10-31 |
| 8o | Create the free Cloudflare account and connect the repo, following Claude Code's steps (no domain needed) | Operator | To do | 2026-10-27 |
| 8u | Confirm two points on the new flat 7.5% IMT for non-residents (DL 97/2026): its start date (no specific rule; general rule gives 25 May 2026) and whether exception (a) "tenha sido considerado residente" covers emigrants who were once Portuguese tax residents. All FAQ and week 1–2 drafts depend on it | Daniel | To do | 2026-10-30 |
| 8v | Review the items left out or kept narrow in content/faq/UNVERIFIED.md (EU succession rule, France treaty method for rental income, AIMI rates, DL 97/2026 rent regimes) | Daniel | To do | 2026-11-04 |
| 8w | Review the FAQ pages and the week 1–2 drafts in content/inbox (legal and tax: Daniel; market: partner agency) before anything is published | Daniel, Father | To do | 2026-11-06 |
| 8x | Create the "Falar com um parceiro" request forms in Tally (fields in ops/SETUP.md) and send the IDs | Operator | To do | 2026-11-06 |
| 8y | Developers are a "talk to a partner" category: decide whether a reader asking a developer about a specific new home counts as a buying request that must go to the partner agency (D14) | CEO | To do | 2026-11-04 |
| 9c | D18 done on the branch: site in PT, EN and FR (URLs /{lang}/{edition}/, language switch saved in the browser, no cookies); PT-BR and the Swiss PT/FR split removed from the site. Decide whether Brazil social posts and the week 1–2 BR drafts (content/inbox, PT-BR) move to PT-PT | CEO | To do | 2026-11-04 |
| 9d | Review the free e-book "Quanto custa mesmo comprar casa em Portugal", one per edition (LU, FR, CH, BR, US, IL) in PT, EN and FR; the country chapter is site/ebooks/countries.ts; PDFs in site/public/ebooks/, built by npm run ebooks from facts.csv | Daniel | To do | 2026-11-06 |
| 9e | Decide whether the e-book PDF stays a direct download or is sent only by the welcome email after sign-up (lead capture) | CEO | To do | 2026-11-06 |

| 9a | Apply ops/prompts/08_partner_agency_habinedita.md (partner agency on buyer, partner and FAQ pages) | CTO | Done on branch (2026-10-25); logo pending, see 9g | 2026-10-31 |
| 9b | Get a business email for buyer requests from the agency (logo is taken from its website by the CTO) | Operator | To do | 2026-10-31 |

| 9f | Check the FAQ ranking (content/FAQ_SOURCES.md) in Google Trends and "People also ask" for each edition; change `rank` in content/faq/*.yaml where needed | Operator | To do | 2026-11-06 |
| 9g | Confirm with Habinedita Gondomar its profile text (report page 3, "Talk to a partner") and send its logo file (the site blocks downloads from here) | Daniel | To do | 2026-11-06 |
| 9h | Open the reference sites that did not load here (design/v2/REFERENCES.md) and note anything to add to the brief | Daniel | To do | 2026-11-06 |
| 12a | Find official price-per-m² figures for the cities left out of "O que compra": Lausanne (Statistique Vaud), New York, Boston, Newark (Census/FHFA blocked here), São Paulo (FipeZap blocked here), Tel Aviv (CBS publishes prices per dwelling, not per m²). Send the table or PDF and the CTO adds them to facts.csv | Daniel | To do | 2026-11-13 |
| 12b | Create the Tally form "Pedido de análise de crédito" per language (hidden fields: tool and inputs; unticked consent naming the credit partner; confirmation email = double opt-in) and send the IDs for config.forms.credit | Operator | To do | 2026-11-13 |
| 12c | Paid Plano de compra (D22): once the billing entity exists (D4), register for EU VAT OSS, create the Stripe Payment Link (5,99 €, receipt on) and send it; the CTO then switches config.plan.live on | Operator | To do | after D4 |
| 12d | Approve the newsletter format (content/NEWSLETTER_FORMAT.md) and the week 1 drafts (content/inbox/week-01-newsletter/, 6 editions × PT/EN/FR); ask Habinedita for the first listing with written permission | Daniel | To do | 2026-11-20 |

| 8r | Send the credit-intermediary business name and its Banco de Portugal registration number (for the simulators, D21), confirm video visits, one real listing with photos, and sign the Gold sponsorship agreement (D20) | Father via Operator | To do | 2026-11-01 |

## Last session

2026-10-25 (CTO): prompt 10 done on branch claude/brave-gauss-cwafi6, nothing merged. References (design/v2/REFERENCES_10.md) and country benchmarks (design/v2/BENCHMARK.md; six guide publishers added to sponsors/pipeline.csv as tier B). Voice rules in content/VOICE.md. Every site text now lives in content/copy/COPY_DECK.md, which the site reads at build time; Daniel and the CEO edit the deck directly. FAQ answers rewritten (40–69 words, answer first), plus three benchmark questions on four newly verified facts (Golden Visa, Casa Pronta fees and documents, IFICI). Mobile first: sticky action, proof on the first screen, Lighthouse mobile 96–99 performance and 100 accessibility (design/v2/LIGHTHOUSE.md). No visible photo credits; sources in site/public/photos/CREDITS.md. Open: content/faq/UNVERIFIED.md, tasks 9f–9h.

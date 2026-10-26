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
| 2b | Operator setup: follow ops/SETUP.md (mailbox, domains, Tally, beehiiv, Cal.com) and send the IDs to the CEO chat. Cloudflare is done (both workers.dev links answer 200); the rest is open and every form ID in site/src/config.ts is still empty | Operator | Partly done: Cloudflare only | 2026-10-28 |
| 2c | Put form IDs, embeds, booking link and contact email into site/src/config.ts (forms.*, bookingUrl, calls, ebooksLive all still empty or false on the branch) | CEO or CTO | Blocked: waits for 2b, 8x, 12b | 2026-10-28 |
| 3 | Answer D1–D7 (D4 postponed) | Operator | Done | 2026-10-24 |
| 3b | Report back from the Decisão/Paperjam event (contacts, companies worth adding) | Operator | To do | 2026-11-11 |
| 4 | Create brand email (forwarding via Cloudflare Email Routing once a domain is on Cloudflare) | Operator | To do | 2026-10-27 |
| 5 | Buy domains .lu, .fr, .ch, .com.br; check WHOIS privacy for .com.br before using a personal CPF | Operator | To do | 2026-10-27 |
| 6 | Create free accounts with the brand email: Cloudflare, beehiiv, Tally, Cal.com | Operator | To do | 2026-10-28 |
| 7 | Confirm the agency receives buyer leads and the commission split, in writing | Father | To do | 2026-10-31 |
| 8 | Media kit per edition (sponsors/mediakit/*.pdf, generated from the partner pages) | CEO | Done (v1, rejected on design) | 2026-10-24 |
| 8b | Run ops/prompts/02_redesign_and_outreach.md | CTO | Done: directions, week-1 drafts and site build (via prompts 07 and 09) | 2026-10-26 |
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
| 8g | Run ops/prompts/03_international_sponsors.md. Done on branch (25 Oct): 5 Israeli-capital developers (S151 to S155), tab "Chambers & embassies", sponsors/INTERNATIONAL.md, 7 English drafts in sponsors/outreach/international/. No US, UK or Chinese-capital residential developer found. Same as task 16 | CTO | Done on branch, drafts not sent | 2026-10-30 |
| 8h | Run ops/prompts/04_free_ebooks.md (facts base + free e-books per edition) | CTO | Done on branch: content/facts/facts.csv (54 facts), 18 e-book PDFs; review in 8i and 9d | 2026-11-06 |
| 8i | Review legal and tax facts flagged in the e-book PR | Operator | To do | 2026-11-10 |
| 8j | Apply ops/prompts/05_usa_israel_editions.md to prompts 02–04 | CTO | Done on branch for FAQ, plans, drafts, e-books, domain options; sponsor targets for US and IL still missing (see 8g) | 2026-10-26 |
| 8k | Run ops/prompts/06_faq_and_topics.md (FAQ pages per edition, content plan, week 1–2 drafts) | CTO | Done on branch, not merged | 2026-11-06 |
| 8l | Buy the USA and Israel domains: options in ops/DOMAINS_US_IL.md (.us has no WHOIS privacy and needs a US presence; .co.il rules unclear); availability still to check | Operator (decision CEO and Daniel) | To do | 2026-11-06 |
| 8m | Switzerland edition in Portuguese and French | CTO | Done: superseded by D18 (whole site in PT, EN, FR) | 2026-11-06 |
| 8n | Run ops/prompts/07_build_direction_c_beta.md (design C, six editions, free beta) | CTO | Done: beta live on workers.dev; design replaced by v2 (prompts 09–13) | 2026-10-31 |
| 8o | Create the free Cloudflare account and connect the repo | Operator | Done: main and branch previews both deployed | 2026-10-27 |
| 8u | Confirm two points on the new flat 7.5% IMT for non-residents (DL 97/2026): its start date (no specific rule; general rule gives 25 May 2026) and whether exception (a) "tenha sido considerado residente" covers emigrants who were once Portuguese tax residents. All FAQ and week 1–2 drafts depend on it | Daniel | To do | 2026-10-30 |
| 8v | Review the items left out or kept narrow in content/faq/UNVERIFIED.md (EU succession rule, France treaty method for rental income, AIMI rates, DL 97/2026 rent regimes) | Daniel | To do | 2026-11-04 |
| 8w | Review the FAQ pages and the week 1–2 drafts in content/inbox (legal and tax: Daniel; market: partner agency) before anything is published | Daniel, Father | To do | 2026-11-06 |
| 8x | Create the "Falar com um parceiro" request forms in Tally (fields in ops/SETUP.md) and send the IDs | Operator | To do | 2026-11-06 |
| 8y | Developers are a "talk to a partner" category: decide whether a reader asking a developer about a specific new home counts as a buying request that must go to the partner agency (D14) | CEO | To do | 2026-11-04 |
| 9c | D18 done on the branch: site in PT, EN and FR (URLs /{lang}/{edition}/, language switch saved in the browser, no cookies); PT-BR and the Swiss PT/FR split removed from the site. Decide whether Brazil social posts and the week 1–2 BR drafts (content/inbox, PT-BR) move to PT-PT | CEO | To do | 2026-11-04 |
| 9d | Review the free e-book "O custo total de comprar casa em Portugal", one per edition (LU, FR, CH, BR, US, IL) in PT, EN and FR; the country chapter is site/ebooks/countries.ts; PDFs in site/public/ebooks/, built by npm run ebooks from facts.csv | Daniel | To do Now 15 pages: new chapters 05 (main home or other home) and 06 (mortgage, from offer to deed), added 25 Oct from the Doutor Finanças topics; items left out are in content/faq/UNVERIFIED.md | 2026-11-06 |
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
| 13a | Insurance partner for "Comprar a partir de fora, passo a passo" (life cover for the mortgage, home insurance): choose one and send its name and ASF registration for config.insurancePartner; lawyer and money-transfer partners likewise | CEO | To do | 2026-11-20 |
| 13b | Open the Doutor Finanças social channels (YouTube, Instagram, TikTok, Facebook, LinkedIn, podcast), blocked from here, and note posting rhythm and best formats in design/v2/DOUTOR_FINANCAS.md | Partner | To do | 2026-11-13 |
| 13c | Confirm whether Banco BIC Português (S132) now belongs to ABANCA (S001) and find the non-resident mortgage pages of S132 and S133 (their sites are blocked from here) | Partner | To do | 2026-11-13 |

| 13d | Send the credit-intermediary business name and its Banco de Portugal registration number (for the simulators, D21), confirm video visits, one real listing with photos, and sign the Gold sponsorship agreement (D20) | Father via Operator | To do | 2026-11-01 |

| 14 | Merge claude/brave-gauss-cwafi6 into main so the live link shows the current design. Done 25 Oct (D31); site stays noindex | CTO | Done | 2026-10-25 |
| 14b | D4: set the billing entity, then fill config.entity, switch launchReady and complete the legal pages (site stays noindex until then) | Operator | Blocked: D4 | 2026-11-13 |
| 14c | ops/METRICS.md created as a stub (25 Oct); the weekly numbers script and the /status command are still to build (prompt 14, step 6) | CTO | Stub done; script to do | 2026-11-13 |

| 14d | Review the new FAQ answer "Habitação Própria Permanente" (all languages) and UNVERIFIED items 1, 2 and 6 from the Doutor Finanças guide | Daniel | To do | 2026-11-06 |

| 15 | Blog on the site (all editions, PT, EN, FR): article template and collection, index page, SEO (title and description, hreflang, canonical, sitemap, Article and FAQ structured data, short answer-first intro for featured snippets and AI answers), sources and disclaimer per the editorial policy. Two launch articles chosen by the CTO from the most searched and most important topics (proposed: the 7.5% non-resident IMT and what changes for emigrants; the buying process step by step from abroad), drafted in all three languages from content/facts/facts.csv. Requested by Daniel 25 Oct | CTO | Done on branch (25 Oct): blog index and article pages in PT, EN, FR, SEO data, per-edition sitemaps; two articles (non-resident IMT at 7.5%; buying from abroad step by step); checks in scripts/check-content.mjs and check-parity.mjs. Not merged | 2026-11-06 |
| 15b | Review the two blog articles (legal and tax: Daniel; market: partner agency) before anything is published | Daniel, Partner | To do | 2026-11-13 |
| 16 | Run prompt 03 (requested again by Daniel 25 Oct): see 8g | CTO | Done on branch | 2026-10-30 |
| 17 | Social media and content automation plan, from creation to posting and monitoring. Written 25 Oct: ops/PLAN_CONTENT.md. Needs Daniel's answers to its six decisions (section 9) | CEO | Plan written, awaiting decisions | 2026-10-30 |
| 17b | Approve the social plan, then create the brand accounts (D2, English ones named "Portugal Home Guides") | Operator | To do | 2026-11-13 |

| 15c | Blog next steps once the first two are approved: two articles a month from content/plan topics; link the blog from the weekly newsletter; add internal links from FAQ answers to articles; submit each domain's sitemap-{ed}.xml in Google Search Console after launch | CTO | To do | 2026-12-01 |

| 16b | Approve the 7 international drafts (sponsors/outreach/international/); nothing is sent before task 8q. Holds listed in international.csv: Youropa (check D9), the Israeli chamber (confirm it exists), AmCham (check member claim) | Operator | To do | 2026-10-30 |
| 16c | Confirm the Portuguese-Israeli chamber exists; find the economic section of the Israeli embassy in Lisbon; open the idealista pages that blocked automated access (S151 to S155, INE figure for non-EU buyers) | Daniel, Partner | To do | 2026-11-06 |
| 16d | Brazilian-capital developers pass for the BR edition (same method as prompt 03) | CTO | To do | 2026-11-13 |

| 17c | Answered 25 Oct (D25 to D30). Open: a date for Portuguese and French posts on the Imóveis Portugal account | Daniel | Mostly done | 2026-10-28 |
| 17d | Operator setup batch for publishing: steps A1 to A6 and A9 to A12 of ops/PLAN_CONTENT.md section 5 (D4 entity, beehiiv, Tally, Cal.com, Meta Business portfolio with one Facebook Page and one Instagram account, Unsplash key, domains, merge approval). LinkedIn and YouTube dropped by D26 | Operator | To do | 2026-10-30 |
| 17e | Build the publishing plumbing: steps B1 to B10 of ops/PLAN_CONTENT.md section 5 (/publish-week, social export, card generator, post checks, Meta app review request, metrics) | CTO | To do: starts after 17c | 2026-11-13 |
| 17f | Partner agency: one real listing a week with written permission, profile text, credit partner name (items C1, C2 of the plan) | Partner, Father | To do | 2026-11-06 |

| 17g | Choose the Meta admin profile (see the open item in DECISIONS.md): an existing real profile kept private plus a second trusted admin, Instagram first, or wait for D4 | Daniel, Operator | To do | 2026-10-28 |
| 18 | Run ops/prompts/14_publishing_plumbing.md in a new Claude Code session: /publish-week, social export, card generator, post checks, metrics script, /status | CTO | To do: start Mon 26 Oct | 2026-11-06 |
| 18b | Check the Cloudflare build of main succeeded and that the live link shows the blog (/pt/lu/blog/) | Operator | To do | 2026-10-26 |

| 8s | Confirm price list v3 (Verified 1,800/4,800 €, Featured 4,800/12,000 €, Bank 9–15k €, developer campaign from 2,500 €; founding 40% off) in ops/prompts/15_growth_engine.md | Operator | Superseded by D40 | 2026-10-27 |

| 8t | Confirm Private tier price (Private Partner 25–50k € a year) in ops/prompts/15_growth_engine.md | Operator | Superseded by D40 | 2026-10-27 |

| 8u | Wire beehiiv form and Tally forms (ops/ACCOUNTS.md) into site/src/config.ts and pages; create EN and FR versions of the forms' text for the operator | CTO | To do | 2026-10-28 |
| 8v | Set beehiiv footer postal address (billing entity or business address, never personal) before the first send | Operator | Blocked: waits for D4 | 2026-11-25 |

| 8w | Decide the monetisation model (area slots for developers, journey-checkpoint slots for advisers, the partner group, paid call dropped or not, price ranges); CEO proposal in chat 25 Oct | Operator | Done (D38–D40) | 2026-10-28 |

| 19a | Outreach v3: approve sponsors/outreach/v3 (3 sequences, 10 personalised drafts), then set up the drafts-only Apps Script in sponsors/outreach/HOWTO.md (30 drafts a day, nothing sent without approval) | Operator | To do | 2026-11-02 |
| 19b | Media push: approve content/press (releases PT/EN/FR, brand facts) and ops/LAUNCH_MEDIA.md; nothing sent before launch week | Daniel, Operator | To do | 2026-11-16 |
| 19c | User test: run ops/USER_TEST.md with five readers (two emigrants, one Brazilian, one US/IL buyer, one 1 M€+ buyer) and file the notes | Operator, Partner | To do | 2026-11-20 |
| 19d | IMI rates per municipality: the AT service was down from here; open https://www.portaldasfinancas.gov.pt (Taxas IMI) and export the 2026 table, or approve using a third-party copy with the AT link | Partner | To do | 2026-11-06 |
| 19e | Map photos (prompt 16): 3 to 5 licensed photos per region (North, Centre, Alentejo, Algarve, Madeira, Azores; Lisbon and Porto done). Unsplash pages are blocked from here: either a free Unsplash API key in an environment variable, or the partner sends its own photos with written permission | Operator, Partner | To do | 2026-11-13 |
| 19f | Community size abroad (FR, CH, BR, US, IL) and Google Trends per country for the media kit: sources blocked from here | Partner | To do | 2026-11-13 |

| 19g | Decide: price list v3 and Private tier (8s, 8t) are still "proposal" on the partner pages and media kits | Daniel | Superseded by D38–D40 (prices only in the brochure) | 2026-10-27 |
| 19h | Decide: the 5 M€ and 10 M€ examples cite Knight Frank listings (another agency) as data, no contact route; keep (D14 reading) or replace with partner agency or developer listings | Daniel | To do | 2026-10-30 |
| 19i | Credit partner wording: "sem custos para si" removed until the partner confirms its fees in writing (13d) | Father via Operator | To do | 2026-11-06 |

| 21a | Tally: extend form BEEzgN into "Consulta privada" with the fields, options and redirect rule in ops/TALLY_CONSULTA.md; duplicate it in EN and FR and send the three IDs to the CTO | Operator | To do | 2026-10-30 |
| 21b | Tally: create EN and FR copies of the partner form KppYG8 (same fields) and send the IDs | Operator | To do | 2026-10-30 |
| 21c | Agency: approve the consultation emails in content/consulta/EMAILS.md and send them from its own mailbox; forward every request the same day | Partner | To do | 2026-11-06 |
| 21d | Dossiers: switch on sales once D4 exists (invoicing, OSS VAT, Stripe Payment Links in config.dossiers); confirm the express-consent wording for immediate delivery (DL 24/2014, art. 17.º) and the Lei 49/2004 reference (DRE did not render here) | Daniel, Operator | Blocked: D4 | 2026-11-25 |
| 21e | Journey answers left to a partner (content/journeys/UNVERIFIED.md): France's side of the treaty since 2016, Israel on gains, bank account for cash purchases, home-bank financing (LU, IL) | Daniel | To do | 2026-11-13 |
| 21f | Brochure screenshots are in English; FR and PT screenshots before the first French or Portuguese send (ops/BROCHURE.md) | CTO | To do | 2026-11-06 |
| 8x | Ask DGT in writing whether CAOP boundaries may be used commercially (licensed map embeds); until then the map uses OpenStreetMap boundaries | Operator | To do | 2026-11-06 |

| 8y | Decide whether the map and data tools may be licensed to real-estate agencies (conflicts with D9; options in CEO chat 26 Oct) | Operator | To do | 2026-10-30 |
| 25a | Network: allow overpass-api.de in the cloud environment (environment settings → Network access → Allowed domains), so the map can use current OpenStreetMap boundaries for the Madeira and Azores concelhos and the 2025 parishes (now 30 island concelhos from geoBoundaries and 215 of 584 INE parishes without a boundary; content/facts/map/MISMATCHES.md) | Operator | To do | 2026-11-06 |
| 25b | Area briefs: read the 304 generated briefs in content/map/briefs/2026-Q2.json and set "reviewed": true on each one approved (edit first if needed); only reviewed briefs appear on the map | Operator, Father | To do | 2026-11-20 |
| 25c | Map photos: the place card shows a photo only for the North and Lisbon regions (task 19e); add licensed photos per region | Partner | To do | 2026-11-13 |
| 25d | Embed licensing: terms, price and who may embed (depends on the agency question in 8y above and D9); demos in design/embed-demos/ use invented brands and are not published | CEO | To do | 2026-11-13 |
| 25e | Mortgage rate on the map: update fact bdp-mortgage-rate-2026-08 (and prices.json "mortgage") when Banco de Portugal publishes September 2026 (BPstat 12533735) | CTO | To do | 2026-11-03 |

| 8z | Decide where enquiries about a specific developer project go: (a) straight to the developer's sales team, (b) via Habinedita as the broking agency, or (c) the buyer chooses; D14 covers general buyer requests only | Operator | To do | 2026-10-30 |

## Last session

2026-10-26 (CTO, session 5): main merged into claude/brave-gauss-cwafi6 (pipeline.csv conflict: main's rows kept, the 25 prompt-15 private-tier rows renumbered S178 to S202, 6 duplicates folded into main's IDs, outreach v3 drafts re-pointed), then prompt 25 built, pushed after each section, nothing merged or published. §1: INE prices per m² by quarter from 2016 and rents per m² from Q1 2020 (earlier semi-annual series from 2nd half 2017 recorded), concelhos and parishes; OpenStreetMap boundaries (D49) from the GitHub osm-boundaries export, as the OSM servers are blocked here (25a); scripts/map-data/ fetch, build, briefs and clicktest; content/facts/map/. §2: four metrics, budget presets, search box, every concelho clickable (click check 308/308 flat, 307/308 in 3D), parishes from zoom 8.2 where INE publishes them, place card with the 10-year chart, yield against the BdP rate, momentum, comparables, share link and image, mobile bottom sheet, area briefs held for review (25b). §3: /embed/map/{pt,en,fr}/, public/embed/map.js, frame headers for /embed/* only, three demo pages in design/embed-demos/.

2026-10-26 (CTO, session 4): main merged into claude/brave-gauss-cwafi6, then prompts 20 and 21 run straight through, pushed after each section, nothing merged, sent or published. 20: country selector (header, home, menu); one path per country with nine checkpoints answered from facts.csv (new treaty facts for CH, BR, FR, LU gains) and partner slots; ten years of INE prices, rents (Metodologia 2026) and gross yield for every municipality, a nav item and a home section; developer slots on the map card and municipality pages. 21: no prices or packages on the site (D38), Tally IDs wired; Consulta privada with three confirmation pages, Tally field list and agency emails; dossier generator (purchase, area, Private) with LU/PT samples and order pages with buying off (D4); the private sponsor brochure in FR, EN and PT with the D40 prices. Scorecard all green. Open: 21a to 21f, D4.

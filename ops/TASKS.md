# Tasks

Owners: CEO (Claude, claude.ai) · CTO (Claude Code) · Operator · Partner · Father
Status: To do · Doing · Blocked · Done

## Decisions for Daniel

| # | Decision | Options | CEO recommendation | Status |
| --- | --- | --- | --- | --- |
| D1 | Site structure | (a) one site, four edition sections, country domains redirect to their section · (b) four separate sites | (a): one domain builds SEO authority faster, one thing to maintain and to sell; country domains still used in local marketing | To do |
| D2 | Social accounts | (a) one account per platform for the brand · (b) one per edition (12 accounts) | (a) to start: 4x the posting frequency per account and 4x less work; split an edition off when it passes ~5,000 followers or a sponsor pays for it | To do |
| D3 | Pre-launch pricing | (a) founding prices from the plan: Gold 4,800 €, Silver 1,800 €, Bronze 540 € in year 1 · (b) cheaper founding slots (~990 €) · (c) add pay-per-lead pilots where legal | (a) to start, drop to (b) if more than half of the first 10 calls object on price; (c) only after D6 | To do |
| D4 | Billing entity | Which entity invoices sponsors and receives payments (needed for Stripe and invoices) | Brand-only entity, not in Daniel's name | Blocked: needed before any payment link |
| D5 | Launch date (all four editions, same day) | (a) Tue 1 Dec 2026 · (b) January 2027 | (a): catches the Christmas peak, when emigrants are home and visit houses | To do |
| D6 | Pay-per-lead legality | Check Lei 145/2015 (lawyers), DL 81-C/2017 (credit intermediation), Lei 15/2013 (mediation) for lead fees and the agency commission share | Until checked: flat sponsorship only for lawyers, banks and credit brokers | To do (Daniel) |
| D7 | Decisão / Paperjam event, 10 Nov 2026, Kinepolis Kirchberg | (a) Partner attends · (b) skip | (a): Portuguese business community in Luxembourg in one room; anonymity kept | To do |

## Board

| # | Task | Owner | Status | Due |
| --- | --- | --- | --- | --- |
| 1 | Prompt 01, Parts 1–2: rebuild sponsor list and 90-day plan | CEO | Done | 2026-10-24 |
| 2 | Prompt 01, Part 3 only: Sprint 0 (offer page per edition, Cal.com booking, payment links once D4 is settled, buyer lead form) | CTO | To do | 2026-10-30 |
| 3 | Answer D1–D7 | Operator | To do | 2026-10-26 |
| 4 | Create brand email (forwarding via Cloudflare Email Routing once a domain is on Cloudflare) | Operator | To do | 2026-10-27 |
| 5 | Buy domains .lu, .fr, .ch, .com.br; check WHOIS privacy for .com.br before using a personal CPF | Operator | To do | 2026-10-27 |
| 6 | Create free accounts with the brand email: Cloudflare, beehiiv, Tally, Cal.com | Operator | To do | 2026-10-28 |
| 7 | Confirm the agency receives buyer leads and the commission split, in writing | Father | To do | 2026-10-31 |
| 8 | Media kit text (1 page per edition) | CEO | To do | 2026-10-27 |
| 9 | Send "This week's 40" (sponsors/Sponsors_v2.xlsx), 8 per day, templates in sponsors/METHOD.md; log status | Partner | To do | 2026-10-30 |
| 10 | Meta Ad Library pass for Luxembourg and Switzerland (links in sponsors/METHOD.md); add advertisers as tier A | Partner | To do | 2026-11-06 |
| 11 | Get the latest exhibitor list of the Paris Portuguese property fair | Partner | To do | 2026-11-06 |
| 12 | Optional: move repo to a brand GitHub organisation (current account name contains the founder's name) | Operator | To do | 2026-11-07 |

## Last session

2026-10-24 (CEO): ran prompt 01 Parts 1–2 in place of the CTO. Sponsor list rebuilt around proof of spend: 150 companies, 44 tier A, 46 tier B, 60 parked tier C; 62 of 90 A/B evidence pages opened and read, 6 spot-checks all confirmed. Top 10 by priority: ABANCA, Banque BCP, Cabinet d'Architecture Marcelo Moledo, Campara, Conexão Europa Imóveis, MC Avocats, Madeira Estate, Maia International Properties, Oliveira Imóveis, Pedro Emanuel de Oliveira. Gaps: Luxembourg and Switzerland are thin (20 and 19 A/B), fixed by tasks 10–11. 90-day cash plan in ops/PLAN.md. Decisions waiting for Daniel: D1–D7.

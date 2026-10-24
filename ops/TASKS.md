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

## Board

| # | Task | Owner | Status | Due |
| --- | --- | --- | --- | --- |
| 1 | Prompt 01, Parts 1–2: rebuild sponsor list and 90-day plan | CEO | Done | 2026-10-24 |
| 2 | Prompt 01, Part 3 only: Sprint 0 (one site with four edition sections, offer page per edition, Cal.com booking, buyer lead form; payment links wait for D4) | CTO | To do | 2026-10-30 |
| 3 | Answer D1–D7 (D4 postponed) | Operator | Done | 2026-10-24 |
| 3b | Report back from the Decisão/Paperjam event (contacts, companies worth adding) | Operator | To do | 2026-11-11 |
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

2026-10-24 (CEO): ran prompt 01 Parts 1–2 in place of the CTO. Sponsor list rebuilt around proof of spend: 150 companies, 44 tier A, 46 tier B, 60 parked tier C; 62 of 90 A/B evidence pages opened and read, 6 spot-checks all confirmed. Top 10 by priority: ABANCA, Banque BCP, Cabinet d'Architecture Marcelo Moledo, Campara, Conexão Europa Imóveis, MC Avocats, Madeira Estate, Maia International Properties, Oliveira Imóveis, Pedro Emanuel de Oliveira. Gaps: Luxembourg and Switzerland are thin (20 and 19 A/B), fixed by tasks 10–11. 90-day cash plan in ops/PLAN.md. Later the same day Daniel decided D1–D3 and D5–D7 (see ops/DECISIONS.md); D4 postponed, so Sprint 0 ships without payment links.

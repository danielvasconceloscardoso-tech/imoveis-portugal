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
| 8b | Run ops/prompts/02_redesign_and_outreach.md: three design directions, redesign site and media kits, draft week-1 outreach emails | CTO | To do | 2026-10-26 |
| 8c | Create the brand Gmail mailbox | Operator | Done (geralportugalimoveis@gmail.com) | 2026-10-24 |
| 8d | Decide the outreach email signature (Partner's first name, a pen name, or "Equipa Imóveis Portugal") | Operator | To do | 2026-10-25 |
| 9 | Send "This week's 40" (sponsors/Sponsors_v2.xlsx), 8 per day, templates in sponsors/METHOD.md; log status | Partner | To do | 2026-10-30 |
| 10 | Meta Ad Library pass for Luxembourg and Switzerland (links in sponsors/METHOD.md); add advertisers as tier A | Partner | To do | 2026-11-06 |
| 11 | Get the latest exhibitor list of the Paris Portuguese property fair | Partner | To do | 2026-11-06 |
| 12 | Optional: move repo to a brand GitHub organisation (current account name contains the founder's name) | Operator | To do | 2026-11-07 |

| 8e | Redo week-1 drafts for the new "This week's 40" (agencies removed, D9): rebase branch claude/brave-gauss-cwafi6 on main, delete drafts for companies no longer in the list, write the missing ones | CTO | To do | 2026-10-25 |
| 8f | Branch claude/keen-pasteur-epzzfr is from the stuck first session and deletes current files: never merge, delete it | Operator | To do | 2026-10-25 |

## Last session

2026-10-24 (CEO): ran prompt 01 Parts 1–2 in place of the CTO. Sponsor list rebuilt around proof of spend: 150 companies, 44 tier A, 46 tier B, 60 parked tier C; 62 of 90 A/B evidence pages opened and read, 6 spot-checks all confirmed. Top 10 by priority: ABANCA, Banque BCP, Cabinet d'Architecture Marcelo Moledo, Campara, Conexão Europa Imóveis, MC Avocats, Madeira Estate, Maia International Properties, Oliveira Imóveis, Pedro Emanuel de Oliveira. Gaps: Luxembourg and Switzerland are thin (20 and 19 A/B), fixed by tasks 10–11. 90-day cash plan in ops/PLAN.md. Later the same day Daniel decided D1–D3 and D5–D7 (see ops/DECISIONS.md); D4 postponed, so Sprint 0 ships without payment links. CEO then built Sprint 0: Astro site in site/ (21 pages, LU/FR/CH/BR), media kit PDFs in sponsors/mediakit/, commit check in .githooks/, operator guide in ops/SETUP.md. The site stays "noindex" until D4 and the legal pages are done; the French legal notice needs the publisher's identity, so anonymity relies on the billing entity.

2026-10-24 (CEO, later): Daniel decided D9: no other real-estate agencies as sponsors or outreach targets. 25 agencies moved to an "Excluded (agencies)" tab; pipeline now 125 companies (29 A, 41 B, 55 C); "This week's 40" recomputed; featured-listings package removed from site, plan and brief.

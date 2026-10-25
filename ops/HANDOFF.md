# Handoff: read this, then start a new Claude session

Written 25 Oct 2026 at the end of session 2. For a colleague joining the project, and for the next Claude session. No personal data in this file.

## How to use it (2 minutes)

1. Get the repo (private): `github.com/danielvasconceloscardoso-tech/imoveis-portugal`. Clone it, then in the folder run:
   ```
   git checkout main
   git config user.name "Imoveis Portugal"
   git config user.email ops@imoveisportugal.lu
   git config core.hooksPath .githooks
   cd site && npm ci && cd ..
   ```
   The first two lines matter: we never commit under a person's name (hard rule 1).
2. Open Claude Code in the repo folder, switch to plan mode, and paste the prompt below.
3. When Claude shows its plan, read it and approve it, or correct it. Nothing is merged, posted or sent without your explicit "go".

## The prompt to paste

```
Read ops/prompts/14_publishing_plumbing.md and execute it. Before anything else, set git config user.name "Imoveis Portugal" and user.email ops@imoveisportugal.lu, and git config core.hooksPath .githooks. Read CLAUDE.md, ops/BRIEFING.md, ops/TASKS.md, ops/DECISIONS.md (D24 to D31) and ops/PLAN_CONTENT.md first, show a short plan, and wait for approval. Work on a branch and open a PR. Nothing is merged to main, published, sent or posted without the operator's explicit go. Free tools only.
```

If you want a Claude session to act as CEO (strategy, copy, sponsors) instead, paste: `Read ops/BRIEFING.md, ops/PLAN_CONTENT.md and ops/TASKS.md, then tell me what the CEO should decide this week.`

## The project in six lines

1. A free media brand for people living abroad who want to buy a home in Portugal: Luxembourg, France, Switzerland, Brazil, USA and Israel editions, all launching Tue 1 Dec 2026.
2. Site in Portuguese, English and French (Astro, hosted free on Cloudflare). Weekly newsletter, blog, FAQ, calculators, free e-books.
3. Money: flat annual sponsorships (Gold 4,800 €, Silver 1,800 €, Bronze 540 € founding prices for the first 10), developer campaigns from 1,500 €, a paid report, paid calls. Never a fee per lead.
4. The only real-estate agency on the platform is the partner, Habinedita Gondomar (AMI 13250). Buyer requests go to it.
5. Goal: profitable in year 1, sell the brand within 12 months.
6. Team: CEO (Claude in claude.ai: strategy, sponsors, copy), CTO (Claude Code: build and run), the operator (accounts, approvals), the partner agency, and Daniel (legal and tax review).

## Rules that never bend

1. **Anonymity.** No person's name, voice or face anywhere: site, posts, commits, emails, legal pages. Commits as `Imoveis Portugal <ops@imoveisportugal.lu>`.
2. **Nothing goes public without the operator's approval.** No posting, sending, merging or deploying on a Claude's own initiative.
3. **No personal data or secrets in the repo.** Keys go in environment variables.
4. **GDPR:** double opt-in, unticked consent, cookie-free analytics, sponsored content always labelled.
5. **Describe, never advise.** Every fact is an id in `content/facts/facts.csv` with a primary source. No promises of returns.
6. **Free tools only** until a sponsor has paid.
7. **No other real-estate agencies** as sponsors or outreach targets (D9). No Russian-capital companies (D11).

## What was done in session 2 (25 Oct)

All on `main`. The site is live on a workers.dev link but hidden from search engines (noindex) until the billing entity and legal pages exist.

1. Task board reconciled with the code.
2. E-book now 15 pages (18 PDFs): new chapters on main home versus other home, and on the mortgage from offer to deed.
3. FAQ answer "Habitação Própria Permanente: o que é e serei elegível?" in all three languages, and a parity check that keeps the languages identical (`scripts/check-parity.mjs`).
4. Blog: index, article pages, SEO data, per-edition sitemaps, home page section, two articles in three languages (the 7.5% non-resident transfer tax; buying from abroad step by step).
5. International sponsors (prompt 03): five Israeli-capital developers, a chambers and embassies list, findings in `sponsors/INTERNATIONAL.md`, seven English outreach drafts. Not sent.
6. Content and publishing plan: `ops/PLAN_CONTENT.md`.
7. Decisions D24 to D31 in `ops/DECISIONS.md`: one newsletter per language per week; one social account "Imóveis Portugal" on Instagram and Facebook, English first; 5 feed posts a week on each, 3 reels a week from December; faceless AI video allowed (no AI people or invented homes); Meta Business portfolio on the brand mailbox; no paid tools before the first sponsor pays; merge to main with the site still hidden.
8. One mistake, fixed: an early commit carried a personal name and was rewritten. If you have an old copy of the working branch, fetch fresh.

## What needs to happen next, in order

| # | What | Who | By |
| --- | --- | --- | --- |
| 1 | **Decide D4, the billing entity** (the data controller named in the privacy policy). Without it no sign-up form can go live | Daniel | Fri 30 Oct |
| 2 | **Choose the Meta admin profile** (task 17g). A Facebook Page needs a real personal profile as admin; never create a made-up one. Options: an existing real profile kept private plus a second trusted admin (recommended); Instagram first; wait for D4 | Daniel, operator | Wed 28 Oct |
| 3 | **Setup batch** (task 17d): brand mailbox and domains; beehiiv (double opt-in, API key as an environment variable); Tally forms; Cal.com links; Meta Business portfolio with one Facebook Page and one Instagram account named "Imóveis Portugal"; Unsplash key. Put the IDs in `site/src/config.ts`, where every form ID is still empty | Operator | Fri 30 Oct |
| 4 | Check that the Cloudflare build of main succeeded and `/pt/lu/blog/` shows on the live link (task 18b) | Operator | Mon 26 Oct |
| 5 | **Run prompt 14** in a new Claude session (the prompt above): `/publish-week`, social export, card generator, post checks, weekly metrics, `/status`, and a dry run for the week of 9 Nov | CTO session | Fri 6 Nov |
| 6 | Agency items: profile text, one real listing with written permission, credit intermediary name and registration number, signed Gold agreement (tasks 9g, 13d, 17f) | Partner, Father | Fri 6 Nov |
| 7 | Outreach: approve the 40 week-1 drafts and the 7 international drafts once the legal bases are confirmed. Nothing is sent before that (tasks 8p, 8q, 16b) | Operator, Daniel | Fri 30 Oct |
| 8 | Reviews: Daniel on legal and tax facts (tasks 8u, 8v, 14d, 15b); the partner agency on market facts | Daniel, partner | Fri 13 Nov |
| 9 | Open choice: a date for Portuguese and French posts on the same account | Daniel | When ready |

Dates to hold: first public posts Mon 9 Nov (pre-launch week), 300 sign-ups by 22 Nov, launch Tue 1 Dec. If item 1 slips, the sign-up push moves with it; everything else can go on.

## Where things are

| File | What it is |
| --- | --- |
| `CLAUDE.md` | The CTO brief: rules, stack, slash commands |
| `ops/BRIEFING.md` | One-page project briefing |
| `ops/TASKS.md` | Every task with owner and date; "Last session" at the bottom |
| `ops/DECISIONS.md` | Every decision, D1 to D31 |
| `ops/PLAN_CONTENT.md` | The content and publishing plan |
| `ops/PLAN.md` | The 90-day cash plan |
| `ops/METRICS.md` | Weekly numbers (a stub for now) |
| `ops/prompts/` | Numbered task prompts for Claude Code (01 to 14) |
| `content/` | Facts, FAQ, blog, plans, drafts, copy deck, editorial policy |
| `site/` | The Astro site and the e-book builder |
| `sponsors/` | Pipeline, workbook, outreach drafts, international findings |
| `scripts/` | `check-content.mjs`, `check-parity.mjs` |

Before any pull request: `node scripts/check-content.mjs`, `node scripts/check-parity.mjs`, and `cd site && npm run build`.

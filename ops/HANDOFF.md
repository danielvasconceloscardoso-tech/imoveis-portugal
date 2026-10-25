# Handoff: where we are and what Claude does next

Written 25 Oct 2026, end of session 2. No personal data in this file.

**To start:** `git checkout main && git pull`, open Claude Code in the repo folder, plan mode, and type:

> Read ops/HANDOFF.md and follow it.

This file is both the briefing for you and the instructions for Claude. Claude: everything from "Instructions for Claude" is addressed to you. Colleague: read "Status" and "What is next"; the rest is for Claude.

---

## Status (for the colleague)

Everything is on `main`. The site is live on a workers.dev link but hidden from search engines (noindex) until the billing entity and legal pages exist. Nothing has been posted, sent or published to the public.

**Done in session 2**
1. Task board reconciled with the code (prompts 02 and 04 to 13 were built; 03 was not).
2. E-book now 15 pages, 18 PDFs: new chapters on main home versus other home, and on the mortgage from offer to deed.
3. FAQ answer "Habitação Própria Permanente" in PT, EN, FR, and a parity check that keeps the languages identical.
4. Blog: index, article pages, SEO data, sitemaps, home page section, two articles in three languages.
5. International sponsors (prompt 03): five Israeli-capital developers, a chambers and embassies list (`sponsors/INTERNATIONAL.md`), seven English outreach drafts, none sent.
6. Content and publishing plan (`ops/PLAN_CONTENT.md`) and decisions D24 to D31 (`ops/DECISIONS.md`): one newsletter per language per week; one social account "Imóveis Portugal" on Instagram and Facebook, English first; 5 feed posts a week on each, 3 reels a week from December; faceless AI video allowed (no AI people or invented homes); Meta Business portfolio on the brand mailbox; no paid tools before the first sponsor pays.
7. One mistake, fixed: an early commit carried a personal name and was rewritten. If your copy of the working branch is old, fetch fresh.

**What is next, in order**

| # | What | Who | By |
| --- | --- | --- | --- |
| 1 | **Decide D4, the billing entity** (the data controller in the privacy policy). Without it no sign-up form can go live | Daniel | Fri 30 Oct |
| 2 | **Choose the Meta admin profile** (task 17g). A Facebook Page needs a real personal profile as admin; never a made-up one. Options: an existing real profile kept private plus a second trusted admin (recommended); Instagram first; wait for D4 | Daniel, operator | Wed 28 Oct |
| 3 | **Setup batch** (task 17d): brand mailbox and domains; beehiiv (double opt-in, API key in an environment variable); Tally forms; Cal.com links; Meta Business portfolio with one Facebook Page and one Instagram account named "Imóveis Portugal"; Unsplash key. IDs go in `site/src/config.ts`, where every form ID is still empty | Operator | Fri 30 Oct |
| 4 | Check the Cloudflare build of main and that `/pt/lu/blog/` shows on the live link (task 18b) | Operator | Mon 26 Oct |
| 5 | **Claude runs prompt 14** (below): `/publish-week`, social export, card generator, post checks, weekly metrics, `/status`, a dry run for the week of 9 Nov | Claude, from this file | Fri 6 Nov |
| 6 | Agency items: profile text, one real listing with written permission, credit intermediary name and registration number, signed Gold agreement (tasks 9g, 13d, 17f) | Partner, Father | Fri 6 Nov |
| 7 | Approve the 40 week-1 and 7 international outreach drafts once the legal bases are confirmed. Nothing is sent before (tasks 8p, 8q, 16b) | Operator, Daniel | Fri 30 Oct |
| 8 | Reviews: Daniel on legal and tax facts (tasks 8u, 8v, 14d, 15b); the partner agency on market facts | Daniel, partner | Fri 13 Nov |
| 9 | Open choice: a date for Portuguese and French posts on the same account | Daniel | When ready |

Dates to hold: first public posts Mon 9 Nov, 300 sign-ups by 22 Nov, launch Tue 1 Dec. If item 1 slips, the sign-up push moves with it; the rest can continue. Items 1 to 4 are not Claude's to do; Claude can start item 5 now.

---

## Instructions for Claude

You are the CTO of Imóveis Portugal, working in Claude Code.

**Before anything else**
1. Run `git config user.name "Imoveis Portugal"`, `git config user.email ops@imoveisportugal.lu` and `git config core.hooksPath .githooks`. Never commit as a person.
2. Run `git checkout main && git pull`, then `cd site && npm ci`.
3. Read, in this order: `CLAUDE.md`, `ops/BRIEFING.md`, `ops/TASKS.md` (including "Last session"), `ops/DECISIONS.md` (D24 to D31), `ops/PLAN_CONTENT.md`.

**Your task:** run `ops/prompts/14_publishing_plumbing.md`. Show a short plan first and wait for the operator's approval. Work on a branch and open a pull request. Items 1 to 4 in the table above are the operator's: where a step needs an account, a key, a domain or a decision, give exact step-by-step instructions in one batch and carry on with what does not depend on them.

**Rules that never bend**
1. Anonymity: no person's name, voice or face anywhere, including commits.
2. Nothing is merged to main, published, posted or sent without the operator's explicit "go".
3. No personal data or secrets in the repo; keys go in environment variables.
4. GDPR: double opt-in, unticked consent, cookie-free analytics, sponsored content labelled.
5. Describe, never advise. Every fact is an id in `content/facts/facts.csv` with a primary source; no promises of returns.
6. Free tools only until a sponsor has paid. If a step needs a paid tool, stop and add a task for the CEO.
7. No other real-estate agencies as sponsors or outreach targets (D9); no Russian-capital companies (D11).
8. Do not edit `sponsors/Sponsors_v2.xlsx` by hand; use `python3 sponsors/build/build_v2.py`.

**Before every pull request:** `node scripts/check-content.mjs`, `node scripts/check-parity.mjs`, `cd site && npm run build`.

**At the end:** write a one-paragraph summary under "Last session" in `ops/TASKS.md`, log decisions in `ops/DECISIONS.md`, update the Status and "What is next" sections of this file, and tell the operator what is left.

**If asked to act as CEO** (strategy, copy, sponsors, content plan) instead: read `ops/BRIEFING.md`, `ops/PLAN_CONTENT.md`, `ops/PLAN.md` and `ops/TASKS.md`, and say what the CEO should decide this week.

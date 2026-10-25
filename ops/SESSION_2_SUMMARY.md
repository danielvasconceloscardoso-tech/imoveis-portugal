# Imóveis Portugal: summary of session 2 (25 Oct 2026) and what comes next

Everything below is on main in the private repo (github.com/danielvasconceloscardoso-tech/imoveis-portugal). The live link is https://imoveis-portugal.geralportugalimoveis.workers.dev. The site is still hidden from search engines (noindex) until the billing entity and legal pages are done. Nothing has been posted, sent or published to the public.

WHAT WAS DONE

1. Task board reconciled with the code. Prompts 02 and 04 to 13 were already built; prompt 03 was not. Duplicate task numbers fixed.
2. Free e-book (18 PDFs) extended to 15 pages: new chapters on "main home or other home" (HPP) and on the mortgage from offer to deed, based on the topics of the Doutor Finanças buying guide but checked against primary sources. Items that could not be checked are logged in content/faq/UNVERIFIED.md.
3. New FAQ answer "Habitação Própria Permanente: o que é e serei elegível?" in PT, EN and FR. A parity check now keeps the three languages identical in structure (scripts/check-parity.mjs).
4. Blog (task 15): index, article pages, SEO data, per-edition sitemaps, a home page section, and two articles in PT, EN and FR: the 7.5% transfer tax for non-residents, and buying from abroad step by step.
5. Prompt 03 (international sponsors): five Israeli-capital developers added to the pipeline (S151 to S155), a "Chambers & embassies" tab, sponsors/INTERNATIONAL.md, and seven English outreach drafts. No US, UK or Chinese-capital residential developer was found. The sponsor builder was made safe: pipeline.csv is the source of truth, IDs and the week-1 list stay stable.
6. Content and publishing plan: ops/PLAN_CONTENT.md. Decisions D24 to D31 are in ops/DECISIONS.md: blog canonicals (D24); one newsletter per language per week (D25); one social account "Imóveis Portugal" on Instagram and Facebook, English first, overriding D13 (D26); 5 feed posts a week on each platform plus 3 reels from December (D27); faceless, AI-generated video allowed, no AI people or invented homes (D28); Meta Business portfolio on the brand mailbox (D29); approval roles and no paid tools before the first sponsor pays (D30); merge to main with the site still noindex (D31).
7. Briefing (ops/BRIEFING.md), CLAUDE.md, ops/TASKS.md, ops/METRICS.md (stub) and a new prompt 14 for the next session.
8. One mistake, fixed: an early commit carried a personal name as author. It was rewritten to the brand identity and force-pushed on the working branch. Anyone with an old copy of that branch should fetch fresh. Commit identity for every clone: git config user.name "Imoveis Portugal" and git config user.email ops@imoveisportugal.lu.

WHAT NEEDS TO HAPPEN NEXT (in this order)

A. Decide D4, the billing entity, by Fri 30 Oct. Without a named data controller no sign-up form can go live, and the 9 Nov push moves.
B. Choose the Meta admin profile (task 17g). A Facebook Page needs a real personal profile as admin; do not create a made-up one. Options: an existing real profile kept private plus a second trusted admin (recommended); Instagram first and Facebook later; or wait for the D4 entity.
C. Operator setup batch (task 17d), by Fri 30 Oct: brand mailbox and domains; beehiiv account (double opt-in, API key as an environment variable); Tally forms; Cal.com event links; Meta Business portfolio with one Facebook Page and one Instagram account named "Imóveis Portugal"; Unsplash key. The form IDs go into site/src/config.ts (all still empty).
D. Check that the Cloudflare build of main succeeded and /pt/lu/blog/ shows on the live link (task 18b).
E. Agency items: profile text, one real listing with written permission, credit intermediary name and registration number, signed Gold agreement (tasks 9g, 13d, 17f).
F. Outreach: approve the 40 week-1 drafts and the 7 international drafts once the legal bases are confirmed (tasks 8p, 8q, 16b). Nothing is sent before that. Partner sends 8 a day from the week-1 list.
G. Reviews: Daniel on legal and tax facts (tasks 8u, 8v, 14d, 15b); the partner agency on market facts.
H. Open choice: a start date for Portuguese and French posts on the same account (English first was chosen).
I. In a new Claude Code session: run prompt 14 (/publish-week, social export, card generator, post checks, weekly metrics, /status, and a week-1 dry run).

THE PROMPT FOR THE NEXT CLAUDE SESSION (Claude Code, in the repo folder, plan mode)

Read ops/prompts/14_publishing_plumbing.md and execute it. Before anything else, set git config user.name "Imoveis Portugal" and user.email ops@imoveisportugal.lu, and git config core.hooksPath .githooks. Read CLAUDE.md, ops/TASKS.md, ops/DECISIONS.md (D24 to D31) and ops/PLAN_CONTENT.md first, show a short plan, and wait for approval. Work on a branch and open a PR. Nothing is merged to main, published, sent or posted without the operator's explicit go. Free tools only.

For a Claude session acting as CEO or reviewer, the starting point is ops/BRIEFING.md and ops/PLAN_CONTENT.md.

HOW TO SET UP A COPY

git clone the repo, git checkout main, run the two git config lines above, then cd site and npm ci. Build with npm run build. Checks: node scripts/check-content.mjs and node scripts/check-parity.mjs.

This email was written by Claude Code at the operator's request.

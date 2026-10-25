# Prompt 14: Publishing plumbing (weekly content loop, social export, metrics)

To run: in Claude Code, plan mode, type "Read ops/prompts/14_publishing_plumbing.md and execute it." Work on a branch, open a PR, never push to main without the operator's explicit "go".

---

You are the CTO. First read CLAUDE.md, ops/TASKS.md, ops/DECISIONS.md (D24 to D31), ops/PLAN_CONTENT.md, ops/BRIEFING.md and content/NEWSLETTER_FORMAT.md. Set the commit identity before anything else: `git config user.name "Imoveis Portugal"` and `git config user.email ops@imoveisportugal.lu`, and `git config core.hooksPath .githooks`.

## Where we are

The site, blog, FAQ, calculators, e-books, plans, drafts and quality gates exist and are on main (site noindex). Nothing is posted or sent. No platform account exists yet. The operator is creating the accounts (task 17d); every form ID in `site/src/config.ts` is empty until then.

Decisions already taken (do not reopen):
1. Newsletter: one issue per language per week (PT, EN, FR), Thursdays (D25).
2. Social: one account named "Imóveis Portugal", Instagram and Facebook only, English first (D26). Volume: 5 feed posts a week, each on both platforms (10 slots), plus 3 reels a week from December (D27).
3. Video: faceless, AI generation allowed, no AI people, testimonials or invented homes, every figure with its fact id, label AI content as Meta requires (D28).
4. Accounts sit in a Meta Business portfolio on the brand mailbox (D29).
5. No paid tool and no paid model credits before the first sponsor pays (D30). Nothing is published, sent or merged without the operator's approval (hard rule 2).

## Do, in this order

1. **Plan first.** Show a short plan and wait for approval (CLAUDE.md "How to work", point 2).
2. **`/publish-week`** (a project slash command in `.claude/commands/`, backed by a script in `scripts/`): reads the next unpublished row of `content/plan/*.csv`, validates `content/inbox/` (front matter, sources, disclaimer, sponsored label, banned and AI wording, three languages), builds the site, writes the newsletter files, writes the social export (step 3) and opens one PR. It never sends or posts anything.
3. **Social export.** One file per week, `content/social/week-NN/export.csv` plus the images, with for each post: platform, date and time (UTC and local), caption, image file, link with UTM tags, fact ids, status `draft`. Ten posts a week in English first; the Portuguese and French versions are generated in the same file with `status: hold` until Daniel gives a start date. Format check first: confirm what Meta Business Suite accepts and say so (no native CSV upload was found on 25 Oct); if there is none, the export is a printable checklist the operator schedules from.
4. **Card and carousel generator.** Images from templates in the site's fonts and photos (`site/public/img`, `design/v2/BRIEF.md`), in EN, PT and FR, with the fact and its source on the card. Output to `content/social/week-NN/`. Use Playwright as `site/ebooks/build.ts` does.
5. **Post checks**, added to `scripts/check-content.mjs`: every post cites fact ids that exist, every figure in a caption equals the fact value, the disclaimer or sponsored label where needed, banned words and AI wording, no names of people, caption length per platform, no em-dash.
6. **Metrics.** `scripts/weekly-metrics.mjs` writes the week into `ops/METRICS.md` (the stub exists). Check first whether the Cloudflare Web Analytics API can be read and whether beehiiv's free API can read subscriber counts; where it cannot, the script reads a small CSV the operator pastes. Also build the `/status` command (reads TASKS, METRICS and `sponsors/pipeline.csv`).
7. **Newsletter issues.** Generate the three weekly issues (PT, EN, FR) from `content/NEWSLETTER_FORMAT.md` as paste-ready files. First test whether the free beehiiv plan can create a draft by API (the account must exist: if it does not, skip and write the manual step in `ops/SETUP.md`). Show the edition-specific items as labelled lines in each issue.
8. **Week 1 dry run** (pre-launch week of Mon 9 Nov): run `/publish-week` end to end into a PR for the operator to review.
9. **Meta publishing (phase 2, after the operator has the accounts):** write the application text and the steps for Meta App Review for content publishing, and a design note for the approved-post publisher on Cloudflare Workers (only posts with `status: approved` in the repo are sent). Do not build the publisher before the review passes.
10. **Write the end-of-session summary** in ops/TASKS.md under "Last session" and log decisions in ops/DECISIONS.md.

## What you cannot do, so tell the operator in one batch

Create accounts, enter passwords or API keys, buy domains, press send or publish. Give exact step-by-step instructions for each, in one message.

## Guardrails

1. Anonymity: no person's name, voice or face in any post, image, caption or commit.
2. Every claim is a fact id from `content/facts/facts.csv`; new facts are added and sourced first and flagged for Daniel.
3. Describe, never advise. No promise of returns or yields. Sponsored content is labelled.
4. Free tools only. If a step needs a paid tool, stop and add a task for the CEO.
5. Do not edit `sponsors/Sponsors_v2.xlsx` by hand; use `python3 sponsors/build/build_v2.py`.
6. Run `node scripts/check-content.mjs` and `node scripts/check-parity.mjs` and a site build before the PR.

## Done when

The operator can run `/publish-week`, review one PR, and have next week's ten posts, three newsletters and the weekly numbers ready, with every check passing; and a dry run for the week of 9 Nov is in a PR.

# Content and publishing plan: from nothing to a weekly rhythm

Written 25 Oct 2026 by the CEO (task 17). For Daniel's approval. Nothing here is built or sent yet. Free tools only until a sponsor has paid (hard rule 5); nothing public without the operator's approval (hard rule 2).

## 1. The answer in ten lines

1. We publish three things: a **newsletter** per edition (Thursday), **blog and FAQ pages** (from the site), and **social posts** (from the same approved facts).
2. The content is not the problem. We already have 70 weekly topics in `content/plan/` (10 weeks, 7 plans), 18 week-1 newsletters, week 1 and 2 drafts, 15 to 23 FAQ answers per edition and language, two blog articles, 18 e-books, about ten calculators, and a checker that rejects anything without a source or with banned wording.
3. What is missing is the plumbing: **accounts, a newsletter platform, a way to put approved posts on the platforms, and a way to count results.** The operator creates the accounts; the CTO builds the rest.
4. **Automation has a ceiling set by two rules.** A human approves everything before it is public. And a fully autonomous writer needs paid model credits, which we do not buy before the first sponsor pays. So: Claude Code drafts once a week in one sitting; scripts do everything around it; the operator approves in one place.
5. **Target for the operator: about 2 hours a week at launch, falling to 30 minutes by January.** Daniel's review of legal and tax facts stays, and is the real bottleneck.
6. **One blocker is not technical: the data controller.** We cannot collect email addresses, or run the privacy policy, without the billing entity (D4). It has to be decided before the first sign-up push on 9 Nov.
7. Cost until the first sponsor pays: **0 €** beyond the domains.
8. Order of work: accounts this week, plumbing in week 2, first public posts on Mon 9 Nov, first newsletters on Tue 1 Dec (launch), automation of posting from December.
9. Six decisions for Daniel are in section 9, each with a recommendation.
10. The setup checklist in section 5 is the list of everything we need to start publishing.

## 2. What already exists

| Asset | Where | State |
| --- | --- | --- |
| Weekly topics, 10 weeks, per edition and language | `content/plan/*.csv` (70 rows) | Done. Week 1 starts Mon 9 Nov |
| Weekly drafts (article, carousels, newsletter) | `content/inbox/week-01`, `week-02` | Drafts for 7 plans |
| Newsletter format (seven blocks) and week 1 issues | `content/NEWSLETTER_FORMAT.md`, `content/inbox/week-01-newsletter/` | 18 drafts (6 editions x 3 languages) |
| FAQ, 15 to 23 answers per edition and language | `content/faq/` | Done, one new answer on HPP |
| Blog, 2 articles in PT, EN, FR | `content/blog/` | On the preview branch |
| Free e-books, 18 PDFs | `site/public/ebooks/` | Built, not yet offered (`ebooksLive` false) |
| Facts base, 59 facts with sources | `content/facts/facts.csv` | Done |
| Quality gate | `scripts/check-content.mjs`, `check-parity.mjs` | Rejects missing sources or disclaimer, banned words, AI wording, missing languages |
| Voice and glossary | `content/VOICE.md`, `GLOSSARY.md` | Done |

Missing: any account, any platform, any posting or measuring script, `ops/METRICS.md`, and the forms (every form ID in `site/src/config.ts` is empty).

## 3. The weekly loop

One cycle per week. "Human" time is the operator unless named.

| Day | What happens | Who | Human time |
| --- | --- | --- | --- |
| Mon | The topic row for the week is read from `content/plan/`. The CEO adds or changes the hook if news requires it | CEO | 10 min |
| Mon | Claude Code drafts the week in one sitting: newsletter per edition, one article or FAQ extension, 5 social posts per account set, one video script. Every claim is a fact id; new facts are added to `facts.csv` first | CTO | 0 |
| Mon | Scripts run the checks, build the social export and the newsletter files, and open **one pull request** | CTO scripts | 0 |
| Tue | **Review.** Daniel: legal and tax facts. Partner agency: market facts and the listing of the week. Both read the same PR. Comments go in the PR | Daniel, partner | 40 min total |
| Wed | The operator approves: merge. The site deploys. The social export is scheduled on the platforms. The newsletter drafts are pasted into the email platform | Operator | 60 min (30 at the target) |
| Wed | Test send of each newsletter to the three reviewers | Operator | 10 min |
| Thu | The operator presses send on the platform. Posts go out at the scheduled times | Operator | 5 min |
| Daily | Replies to comments and email replies. Buyer requests go to the partner agency the same day (rule 6) | Operator, partner | 15 min/day |
| Fri | The weekly numbers are collected into `ops/METRICS.md` | CTO scripts | 0 |

**Rule that keeps the review short:** every social post and every newsletter block is derived from text and facts that are already approved on the site (FAQ, blog, calculators). A post may shorten and reformat approved wording; it may not introduce a new figure or claim. The checker enforces it: a post whose fact ids are not all in `facts.csv`, or whose figures differ from the fact value, fails. Reviewers then check changes, not everything.

## 4. Tools, with what was verified on 25 Oct 2026

| Need | Choice | What the search found | Consequence |
| --- | --- | --- | --- |
| Newsletter | beehiiv, free plan | Free plan up to 2,500 subscribers. API access exists on free, but the Send API is paid. Whether the free plan can **create draft posts** by API is unconfirmed, and beehiiv renamed its tiers on 1 Oct 2026 | Day-one test: create the account, make an API key, try to create a draft post. If it fails, the operator pastes each issue (6 issues, 10 minutes). Also check whether the free plan allows more than one publication: if not, editions are segments |
| Scheduler for Facebook and Instagram | Meta Business Suite (free) at the start | Native, free. No native CSV bulk upload was found; posts are scheduled one by one, up to 30 days ahead | Operator schedules from the weekly export. About 30 posts a week across accounts is about 45 minutes. Third-party bulk tools exist but are paid |
| Buffer, Metricool | Not yet | Buffer free: 3 channels, 10 queued posts per channel. Metricool free: 1 brand, 20 posts a month, no LinkedIn or X | Too small for two account sets on four platforms. Revisit when a sponsor has paid |
| Direct posting by our own script | Phase 2 (December) | Instagram's API allows 100 API-published posts per rolling 24 hours (Meta's own docs also show a 50 figure for containers: read the live limit endpoint), only for Business or Creator accounts, and needs Meta App Review | Start the Meta app and review request now: it takes weeks. It would let a small scheduled Cloudflare Worker post only what the operator has approved. LinkedIn's API needs a partner approval: skip it, post LinkedIn natively |
| Scheduled automation | Cloudflare Workers cron (free: 5 triggers per account) and GitHub Actions (free for private repos, within limits to check) | Verified on the Cloudflare limits page | Enough for the weekly numbers job and the approved-post publisher |
| Web analytics | Cloudflare Web Analytics (cookie-free) | Not verified here whether its API can be read for weekly numbers | CTO checks on day one; fallback is a weekly manual copy of six numbers |
| Content drafting | Claude Code, in one weekly session | A fully unattended writer needs paid API credits, so it waits for the first sponsor | The weekly sitting is the "automation" of creation. A scheduled cloud agent that opens the Monday PR is an option to test later |

## 5. Everything we need to start publishing

Order matters. "Needed by" is the date after which the Monday 9 Nov push slips.

### A. Operator: accounts and decisions (this week, one batch)

| # | Step | Needed by | Notes |
| --- | --- | --- | --- |
| A1 | **Decide D4: the billing entity.** It becomes the data controller named in the privacy policy and the publisher in the legal notice | Fri 30 Oct | Without it, no sign-up form can go live. Recommendation: a brand-only entity, not in Daniel's name |
| A2 | Create the brand mailbox on the domain once domains are bought (task 5), or keep the brand Gmail for now | Tue 27 Oct | Use it for every account below |
| A3 | beehiiv account (brand mailbox). Turn on double opt-in. Create the publication or six segments. Make an API key and send it to the CTO through an environment variable, never in the repo | Wed 28 Oct | Section 4 test |
| A4 | Tally account and the forms listed in `ops/SETUP.md` (sponsor, buyer, partner request, credit) | Wed 28 Oct | IDs go to `site/src/config.ts` |
| A5 | Cal.com account and two event links (15 minutes free, 45 minutes paid at 150 €, D19) | Wed 28 Oct | |
| A6 | Meta Business portfolio under the brand mailbox. Two Facebook Pages and two Instagram Business accounts: "Imóveis Portugal" and "Portugal Home Guides" (D2, D13) | Fri 30 Oct | See risk R1 on anonymity |
| A7 | LinkedIn company page for each of the two names | Fri 30 Oct | Needs a personal LinkedIn admin: risk R1 |
| A8 | YouTube channel for each name (empty, for later) | Mon 2 Nov | Video starts in December |
| A9 | Unsplash developer app and key as an environment variable (task 8t) | Tue 27 Oct | Photos for cards |
| A10 | Domains: .lu, .fr, .ch, .com.br; US and Israel options in `ops/DOMAINS_US_IL.md` (task 5, 8l) | Tue 27 Oct | Needed for the country links in posts |
| A11 | Approve the merge of the preview branch into main (task 14) | Fri 30 Oct | So the live link shows the current design and the blog |
| A12 | Tell the CTO who the three reviewers of the Wednesday test send are | Fri 30 Oct | Without names in the repo: only mailboxes in beehiiv |

### B. CTO: what gets built

| # | Build | Done by | Result |
| --- | --- | --- | --- |
| B1 | Fill `config.ts` from the IDs of A3 to A5; switch the e-book downloads on after the sign-up works (`ebooksLive`) | Fri 30 Oct, after A3 to A5 | A visitor can sign up and get the guide |
| B2 | `/publish-week` command: validates the batch, builds the newsletter files and the social export, opens the PR | Fri 6 Nov | Section 3, Monday |
| B3 | Social export: one file per account set and week, with the text, image, link with UTM tags, and time for each post | Fri 6 Nov | The operator schedules from it |
| B4 | Card and carousel generator: images from templates, with the site's fonts and photos, in PT, EN and FR | Fri 6 Nov | No design tool needed |
| B5 | Quality gate extended to posts: fact ids exist, figures match, disclaimer, sponsored label, banned words | Fri 6 Nov | Reviewers see only changes |
| B6 | `ops/METRICS.md` and the weekly numbers script (site visits, subscribers per edition, post reach, clicks, leads) | Fri 13 Nov | Task 14c |
| B7 | `/status` command (reads tasks, metrics, pipeline) | Fri 13 Nov | Task 14c |
| B8 | Meta app and App Review request for publishing; then the approved-post publisher on Cloudflare Workers | Request Fri 6 Nov; publisher Fri 4 Dec | Phase 2 |
| B9 | Short faceless videos from carousels (captions and screen recordings of the calculators, no voice or face) | Fri 11 Dec | 3 a week, captioned per language |
| B10 | Newsletter issues per edition from the weekly plan, as files ready to paste | Fri 6 Nov | Section 3 |

### C. CEO and partner: content that is not generated

| # | Item | Needed by |
| --- | --- | --- |
| C1 | One real listing a week from the partner agency, with its written permission (block 1 of the newsletter) | From 9 Nov; for 1 Dec at the latest |
| C2 | Confirm the agency's profile text (task 9g) and the credit partner's name and registration number (13d) | Fri 6 Nov |
| C3 | Approve the newsletter format and the week 1 drafts (task 12d) | Fri 6 Nov |
| C4 | Review the two blog articles and the new FAQ answer (tasks 15b, 14d) | Fri 13 Nov |
| C5 | Sponsor slot: until a sponsor signs, block 6 of the newsletter says "Talk to a partner" with the partner agency, labelled as sponsored | From 1 Dec |

## 6. Phases

**Phase 0, 26 Oct to 8 Nov: set up.** Accounts (A), config and sign-up (B1), commands and exports (B2 to B5, B10). Merge to main. No public post yet.

**Phase 1, 9 Nov to 30 Nov: pre-launch, manual posting.** The operator schedules from the weekly export on Meta Business Suite, and natively on LinkedIn. Goal: 300 sign-ups by 22 Nov and 600 by 29 Nov (PLAN.md). Posts push the free guide and sign-up, never sell. Posted in Facebook groups of each community by the operator, one by one, following each group's rules (no copy-paste spam).

**Phase 2, from 1 Dec: launch and automate.** Six newsletters on launch day, then weekly. Meta publishing by our own approved-post publisher once App Review passes (B8). Videos (B9). Weekly numbers automatic (B6).

**Phase 3, January: lighter.** Operator time to about 30 minutes: approve the PR, press send. A paid scheduler or API credits are bought only if the first sponsor money covers them.

## 7. Content system

**Two account sets.** "Imóveis Portugal" for PT and FR (LU, FR, CH, BR). "Portugal Home Guides" for EN (USA, Israel). One account per platform per set while D2 holds.

**Platforms in order.** Facebook (the community groups are where readers are), Instagram (Brazil and younger readers), LinkedIn (sponsors, USA and Israel), YouTube (later). TikTok is not planned before January.

**Weekly cadence per set.** Five posts: Monday article or FAQ teaser; Tuesday carousel; Wednesday "what a budget buys" card from the compare page; Thursday newsletter teaser with the sign-up link; Friday one calculator example. From December, three short captioned videos a week on top. Peaks: Christmas, Easter, August (PLAN.md).

**Pillars.** Money (taxes, mortgage, costs), Coming home (inheritance, the village house, visits), Places (what a budget buys in a named place), Rules (residency, banks, documents). The plan CSVs already tag each week with a pillar.

**Newsletter.** Seven fixed blocks (`NEWSLETTER_FORMAT.md`). Launch with **one issue per edition in its main language** (LU PT, FR FR, CH PT, BR PT, US EN, IL EN): six issues a week, not eighteen. Other languages arrive as segments when readers ask for them.

**Blog.** One article every two weeks, from the highest-ranked FAQ questions. Each is linked from the home page, the FAQ and the newsletter.

**Sponsored content** is labelled every time (EDITORIAL_POLICY.md). Sponsors may advise under their own responsibility; we describe.

## 8. Monitoring

| Level | What | How |
| --- | --- | --- |
| Per post | Reach, clicks, saves | Platform insights, copied weekly into METRICS.md; direct API once Meta is approved |
| Per edition | Visits, sign-ups, newsletter opens and clicks, subscribers | Cloudflare Web Analytics, beehiiv |
| Per sponsor | Reach, clicks and leads in their category | The sponsor report (`/sponsor-report`, Sprint 3) |
| Business | Subscribers per edition, buyer requests sent to the agency, sponsors signed, cash received | `ops/METRICS.md`, `/status` |

**Targets from PLAN.md:** 300 sign-ups by 22 Nov, 600 by 29 Nov, 1,000 subscribers at launch week, 2,000 by 20 Dec, 5,000 by 24 Jan.

**Decision rule:** if sign-ups are below 300 on 22 Nov, the CEO changes the offer in the posts (a different guide, a calculator as the hook) before spending any money. If a post type has half the reach of the others for three weeks, it stops.

## 9. Risks and decisions for Daniel

**Risks**

| # | Risk | Plan |
| --- | --- | --- |
| R1 | **Anonymity on the platforms.** Meta and LinkedIn tie a page to a personal profile as admin. The admin is not shown publicly by default, but it is a personal link to the brand | Use a Meta Business portfolio under the brand mailbox; keep the admin profile private; no name in any bio or post. Daniel decides whether a dedicated profile is created for this, or waits for the D4 entity. Never publish a name, voice or face |
| R2 | **Data controller.** No sign-up without D4 | Decide D4 by 30 Oct (A1) |
| R3 | **Review is the bottleneck.** 1 hour a week from Daniel is a hard limit | The derive-from-approved rule (section 3). If a PR has more than 10 new facts, the week's volume drops |
| R4 | **beehiiv free plan may not allow API drafts or more than one publication** | Day-one test; fallback is paste and segments |
| R5 | **Platform rules and bans.** New brand accounts that post links in groups can be banned | Warm up each account for a week; follow each group's rules; no automation inside groups |
| R6 | **Meta App Review can be refused or slow** | Phase 1 does not depend on it |
| R7 | **Claims we cannot support** (yields, returns, "best") | Banned by the checker (VOICE.md); no testimonials we have not been given in writing |
| R8 | **Platform data of readers** | Cookie-free analytics only; no pixels; no retargeting until a lawful basis and a consent banner exist |

**Decisions needed (CEO recommendation first)**

1. **Newsletter volume at launch.** Recommend six issues a week, one per edition in its main language, not eighteen.
2. **Accounts and platforms.** Recommend two sets (Imóveis Portugal, Portugal Home Guides) on Facebook, Instagram and LinkedIn at launch; YouTube from December; no TikTok yet.
3. **Faceless video.** Recommend captions and screen recordings only, no voice, no face, for anonymity.
4. **Who owns the platform accounts (R1).** Recommend a Meta Business portfolio under the brand mailbox, admin kept private.
5. **Approval roles.** Recommend Daniel for legal and tax, the partner agency for market facts, the operator for the final merge and send, all on one PR by Tuesday evening.
6. **Paid model credits and paid schedulers.** Recommend none until the first sponsor has paid; then spend the first month's tool budget on a scheduler and credits, in that order.

## 10. The next seven days

| Day | Operator | CTO |
| --- | --- | --- |
| Mon 26 Oct | A2, A9, A10 | Prepare `config.ts` and the commands (B2 to B5) |
| Tue 27 Oct | A10 finished; A11 decision | Merge prep once approved |
| Wed 28 Oct | A3, A4, A5 | B1 as soon as the IDs arrive; beehiiv API test |
| Thu 29 Oct | A6, A7 | B3, B4 |
| Fri 30 Oct | A1 (D4), A12 | B5; first end-to-end dry run of week 1 into a PR |

If A1 slips past 30 Oct, the sign-up push moves from 9 Nov to the day after it is decided. Everything else can proceed.

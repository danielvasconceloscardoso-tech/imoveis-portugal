# Status: Wed 28 Oct 2026, 22:20 (CEO)

**Launch:** Tue 1 Dec 2026, 34 days away. **Revenue signed:** 0 €. **First chance of a euro:** the Marble Terrace meeting, 29 Oct.

1. **Marble Terrace pitch (prompt 38, D65, D66):** site work on design-v2 by Claude Code (pin, tour, showcase, request flow to the qualified advisor only). Flyer v3 ready: sponsors/flyers/Marble_Terrace_ImoveisPortugal_v3.pdf.
2. **Prompt 37:** Concierge fixes, Artigos, map 2D/3D without night, lawyer cards (two lawyers agreed; task 37a).
3. **Open for the meeting:** 5,000 € per block (3 × 5,000 €) or per project.
4. **Still the critical path:** 8q, 30d, D4, social accounts by 9 Nov, the repo back to private.

---

Snapshot of 28 Oct, midday:

**Launch:** Tue 1 Dec 2026, 34 days away. **Revenue signed:** 0 €. **Sponsor emails sent:** none yet.

**Since 27 Oct morning:**
1. **Design v2:**
   - "The Resort" photography (D60);
   - "Passo a passo" and Simuladores in the menu (D61);
   - Apple-grade journeys, first pass;
   - **map v3, "20/20"** (D62): relief, Day/Night, budget slider, place card, Spotlight search, golf (79 courses), beaches, time slider, compare, tours.
2. **The home hero film** is restored to the version the operator liked (28 Oct, 11:55).
3. **Film v5, Vanguard:** a draft with a placeholder voice; no free voice passes as human (task 35c: a real person or a paid tool).
4. **Golf partnership ideas** parked in ops/IDEAS.md.
5. **For collaborators:** ops/TEST_GUIDE.md and ops/DEVELOP.md.

**Still the critical path to the first euro:**
1. legal bases for B2B emails (8q);
2. the 7.5% IMT check (30d);
3. the demo approval and enquiry routing (26a/31c, 8z);
4. the social accounts (30b);
5. the billing entity (D4).

---

Snapshot of 27 Oct, morning (kept for reference):


**Launch:** Tue 1 Dec 2026, 35 days away. **Revenue signed:** 0 €. **Sponsor emails sent:** none yet.

The product is far ahead of the sales. Site, map, demos and four weeks of content exist. No sponsor has been contacted, because the outreach waits on two legal confirmations (8q, 8z) and the demo approval. That is the critical path to the first euro. It needs the operator, not the CTO.

## 1. The site

| Item | State | Where |
| --- | --- | --- |
| Site in PT, EN, FR, six editions | Built, noindex until D4 | Working branch preview: https://claude-brave-gauss-cwafi6-imoveis-portugal.geralportugalimoveis.workers.dev |
| 3D map (308 municipalities, 10 years of INE prices and rents, place card, budget field) | Built; v1 frozen as the operator likes it | Frozen v1: https://freeze-map-path-v1-imoveis-portugal.geralportugalimoveis.workers.dev |
| Map v2 (time slider, compare, Islands filter, coastal glide) | Built, waiting for comparison (29b); coastal photos missing | https://map-v2-imoveis-portugal.geralportugalimoveis.workers.dev |
| Buy and sell paths ("O seu percurso"), FAQ as top section, simulators, team panel, qualified summary | Built | Working branch |
| Design v2, "the Claridge's pass" (hero film, path bar, six places, full-bleed map with one control bar, mosaic) | Home page built. **The last Cloudflare build failed**, so the link shows the previous version. Three place photos missing, mosaic weak | https://design-v2-imoveis-portugal.geralportugalimoveis.workers.dev ; screenshots in design/screens/home-v2b/ (design-v2 branch) |
| Identity v3 (D50) on site, brochure, media kits, e-books | Built, waiting for approval (23a) | design/brand/BRAND.pdf (working branch) |

## 2. Developer demos (the first product to sell)

| Item | State | Where (working branch) |
| --- | --- | --- |
| Four private demo pages: Vanguard, Vale do Lobo, Shalu, VIC | Built. Seven-step "How a buyer reaches you", "Walk the path as this buyer", numbers consistent, no agency button in demo mode | /d/34c86306cf/, /d/65bf930b11/, /d/f658bd1eef/, /d/7c1e5a90d4/ on the working preview |
| One-page PDFs | Built | sponsors/demos/*.pdf |
| Vanguard film v4 "December" (101 s, real footage, public-domain music) | Rendered. Gap: shots 0 and 13 use an amber drink, not wine on a Lisbon terrace; waiting for a valid Pixabay key | sponsors/demos/v4/ |
| Films for Vale do Lobo, Shalu, VIC | Not started: they follow once Vanguard is approved | — |

## 3. Content engine (prompt 30)

| Item | State | Where (working branch) |
| --- | --- | --- |
| Keyword map and 12-week calendar | Done | content/SEO_ENGINE.md |
| Weeks 1–4 in full: 140 social items (~650 images), 72 newsletters, 12 pillar pages | Done, waiting for review (30e). Gondomar appears only as the agency's name (D34 respected) | social/exports/week-0N-contact-sheet-draft.pdf; content/inbox/week-0N/ |
| Weeks 5–12 | Outlines with target phrases | content/SEO_ENGINE.md, content/inbox/ |
| Social playbook (voice, hashtags, posting times, design) | Done | social/PLAYBOOK.md (main) |
| Exports for Buffer, Meta, LinkedIn, beehiiv HTML | Done as drafts | social/exports/, content/inbox/week-0N/newsletter/beehiiv/ |
| Publishing | Blocked: social accounts and Buffer not created (30b, 30c); IMT legal check (30d) | — |

## 4. Sponsors and sales

| Item | State | Where |
| --- | --- | --- |
| Pipeline and workbook (about 200 companies, tiers) | Done | sponsors/pipeline.csv, sponsors/Sponsors_v2.xlsx |
| Partner Prospects PDF (OneMark style) | Done | sponsors/prospects/ |
| Price list v4 and brochure (Wealth Partner naming) | Done, brochure only | ops/DECISIONS.md D40; brochure on the working branch |
| Outreach drafts (week 1, international, v3) | Written, **none sent**: waiting for 8q (legal bases) and the operator's approval | sponsors/outreach/ |
| Developer approach emails (four, English) | CEO writes them once the demos are approved (26a/31c) and 8z is decided | — |

## 5. Accounts and setup

- **Done:**
  - Cloudflare hosting;
  - beehiiv publication and Tally forms (ops/ACCOUNTS.md);
  - GitHub repo (private);
  - Pixabay and Freesound accounts.
- **Not done:**
  - Instagram, Facebook and LinkedIn accounts (30b, by 9 Nov);
  - Buffer (30c);
  - Meta admin profile (17g);
  - beehiiv API key (30g);
  - Tally hidden fields and EN/FR copies (28a, 21a, 21b);
  - country domains (5, 8l);
  - brand email on the domain (4).
- **Keys:**
  - Pixabay returns "invalid" (recopy it);
  - Freesound answers 403 (low priority, Mixkit covers sound);
  - Pexels keys are paused for everyone.

## 6. Decisions and legal checks waiting

| # | What | Owner | Blocks |
| --- | --- | --- | --- |
| 30d / 8u | 7.5% IMT for non-residents: start date and the exception for former residents (190 mentions listed in ops/legal/IMT_7_5_MENTIONS.md) | Daniel | Every post, newsletter and pillar page |
| 8q | Legal bases for B2B emails per country | Daniel | All sponsor outreach, so all revenue |
| 8z | Where enquiries about a developer's project go | Operator | Sending the demos |
| D4 | Billing entity | Operator | Invoices, payments, indexing, legal pages, beehiiv footer |
| 8y | Licensing the map to agencies (vs D9) | Operator | Map licensing offer |
| 52a, 27b, 19h | Naming of the consultation; inherited-home door; Knight Frank examples | CEO / Daniel | Minor copy |

## 7. This week, in order of what earns money first

1. **Daniel:** 8q (legal bases for B2B emails) and 30d (7.5% IMT check).
2. **Operator:**
   - watch the Vanguard film (31c) and say go or changes;
   - decide 8z;
   - approve the four demos (26a).

   Then the CEO writes the four approach emails.
3. **Operator:** recopy the Pixabay key into the Claude Code chat.
4. **Operator:** approve the outreach drafts (8p, 16b, 19a), so the first 40 sponsor emails can go once 8q is confirmed.
5. **Operator:** create the social accounts by 9 Nov (30b), then Buffer (30c), so teasers start Tue 10 Nov.
6. **Operator:** review weeks 1–4 (30e), the home page v2 (32a), the brand guide (23a), map v2 (29b).
7. **Father / partner agency:** credit business name and Banco de Portugal number, one real listing with permission, the Gold agreement (13d, 17f).
8. **Operator:** D4 billing entity before 25 Nov (needed for indexing and the first invoice).
9. **CTO:** fix the design-v2 build, the film terrace, the missing photos; then prompts 21, 24, 22.
10. **CEO:** approach emails, the D4 memo if wanted, and checking every CTO delivery before it reaches the operator.

## 8. Board clean-up for the CTO (apply on ops/TASKS.md)

- **Close as done:**
  - 29a (voice draft, superseded by the v4 film);
  - 29b (network: done);
  - 29c (prompt 29: done);
  - 30a (samples: done, weeks 1–4 written);
  - 31a (storyboard: approved with changes, applied);
  - 31b (keys added; the Pixabay recopy goes in a new line).
- **Close as superseded:**
  - 8t (Unsplash key, replaced by Pixabay and Mixkit);
  - 12c (5,99 € paid plan, dropped by D39);
  - 17 (social plan, replaced by social/PLAYBOOK.md and prompt 30);
  - 8r (affiliates, answered by D45);
  - D3 (founding prices, replaced by D40);
  - the tag task 29a (`map-path-v1`): GitHub blocks tags from these sessions, and branch freeze-map-path-v1 already holds the commit.
- **Keep, and merge the duplicates:**
  - 26a and 31c (demo approval);
  - 8u (IMT) with 30d;
  - 30b with 17b.
- **Operator:** delete branch `claude/keen-pasteur-epzzfr` (task 8f: the stuck first session; never merge it).

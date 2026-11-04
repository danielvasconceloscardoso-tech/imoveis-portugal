# Maré: the game (prompt 67, step 7)

CTO helper, 4 Nov 2026. Research, prizes, legal check, three game designs and the build sketch. The operator picks one design (step 7.7); nothing here is built yet. Mockups of the flow (neutral styling, "game flow, not the final look") are listed in §9. All sources were opened on 4 Nov 2026 unless marked "(search summary only)".

## 1. What gives a reader a rush (research)

| Mechanic | Who does it, and what is documented | Source |
| --- | --- | --- |
| **Instant feedback** | Duolingo's own data: a new animation on the screen after a reader extends a streak lifted day-7 retention of new learners by 1.7%. The moment of the answer matters more than the prize. | blog.duolingo.com/how-duolingo-streak-builds-habit (31 Jan 2022) |
| **Streaks with slack** | Duolingo: learners on a 7-day streak are 3.6 times more likely to finish their course; letting learners hold up to two Streak Freezes *raised* daily active learners by 0.38% (a little slack keeps people going; they cite UPenn/UCLA research on "slack"). | same |
| **Streaks feel biggest early** | Duolingo: going from 2 to 3 days is +50%, from 200 to 201 is +0.5%; early milestones need the most ceremony, long streaks run on loss aversion. | same |
| **Progress you already have** | Nunes and Drèze, "The Endowed Progress Effect" (J. Consumer Research, 2006, doi 10.1086/500480): a 10-step task with 2 steps pre-completed is finished more often and faster than an 8-step task. | OpenAlex abstract |
| **Speeding up near the goal** | Kivetz, Urminsky and Zheng, "The Goal-Gradient Hypothesis Resurrected" (J. Marketing Research, 2006, doi 10.1509/jmkr.43.1.39): café customers buy faster the closer they are to the free coffee; a 12-stamp card with 2 bonus stamps is completed faster than a plain 10-stamp card. | OpenAlex abstract |
| **Variable reward** | Schultz, Dayan and Montague (Science, 1997, doi 10.1126/science.275.5306.1593): dopamine neurons signal the *difference* between expected and received reward. Surprise, not size, is what is felt. | Crossref abstract |
| **Curiosity gap** | Loewenstein, "The psychology of curiosity" (Psychological Bulletin, 1994, doi 10.1037/0033-2909.116.1.75): curiosity is a gap between what we know and want to know. Hsee and Ruan, "The Pandora Effect" (Psychological Science, 2016): people open the box even when the outcome may hurt. | Crossref |
| **Near-misses** | Clark et al. (Neuron, 2009, doi 10.1016/j.neuron.2008.12.031): near-misses feel worse than full misses yet raise the urge to play, through win-related brain circuitry, and only when the player had control. This is the slot-machine trick. | OpenAlex abstract |
| **The ending decides the memory** | Kahneman et al., "When More Pain Is Preferred to Less: Adding a Better End" (Psychological Science, 1993): people judge an experience by its end. The reveal screen is the experience. | Crossref abstract |
| **Status tiers** | Drèze and Nunes, "Feeling Superior" (J. Consumer Research, 2009, doi 10.1086/593946): a crowded top tier dilutes status; adding a tier *below* raises the status of those above; status-laden labels signal selectivity. Hotels sell this: Marriott Bonvoy's Silver, Gold and Platinum, with lifetime status. | OpenAlex abstract; marriott.com/loyalty/member-benefits.mi |
| **Sharing a result, not the answer** | Wordle's grid: players first typed the coloured squares by hand (New Zealand players), Josh Wardle then built the share button. In his words to RNZ, the grid "just leaves the colours and it's a way for you to share how you did without ruining the game for others". | thespinoff.co.nz, 13 Jan 2022 |
| **Newsletter games** | Morning Brew runs a games hub: Brew Mini, Brew Crossword, Decipher, Jigsaw, Turntable, News Quiz, Word Search, new puzzles every few days. | morningbrew.com/games (seen 4 Nov 2026) |
| **Milestone referrals** | Morning Brew: a personal link and a progress counter in every issue ("You're only 3 referrals away…"), double opt-in plus email validation and an email at each milestone to stop fake sign-ups; referrals were over 30% of subscribers and the #1 growth source. | referralcandy.com/blog/morning-brew-referral-program (21 Apr 2020, secondary) |
| theSkimm | "Skimm'bassador" at 10 referrals: private group, events, swag; about 10% of sign-ups from referrals. | viral-loops.com and digiday (search summary only; theskimm.com/ambassador returns 404) |
| The Hustle, Axios | The Hustle built a milestone referral programme in 2015 (search summary only); axios.com blocked our identified request (Cloudflare block page), so Axios's quiz could not be studied. | thehustle.co (search summary only) |
| **Lottery rewards** | Robinhood's free stock used to be a lottery: about 98% of referrals got a $2.50–10 share, about 1% got $50–200 (mymoneyblog, secondary). Robinhood UK now lets both friends *pick* their stock: no chance. | robinhood.com/gb/en/support/articles/invite-friends-pick-stock |
| **When gamification backfires** | Robinhood removed its confetti on 31 Mar 2021 after the Massachusetts regulator cited "colorful confetti" in a complaint about gamified trading; Robinhood called it a "distraction". | nbcboston.com, 31 Mar 2021 (CNBC report) |

**What creates the rush for our reader:** known stakes before the first tap (the prize is shown), an answer that lands in under a second, a fact that surprises (variable *information*, not a variable prize), visible progress that starts at 1 of 5 because the email tap already counted, an honest "close" on numbers, one slack card, and a result worth sending to a friend.

**What would break our quiet-luxury manners:** confetti and fireworks (Robinhood dropped them under regulatory fire), red alerts and guilt reminders ("Your streak is about to die"), fake countdowns (also illegal, §3), slot-machine near-misses engineered to keep people playing, loot boxes and scratch cards (chance, and illegal themes, §3), public leaderboards of named people, and streaks that take weeks to pay.

## 2. Prizes that cost us nothing (ranked)

Ranking = value to the reader × data signal ÷ cost and risk. Every prize below is guaranteed to whoever reaches the threshold, the same day, unless the row says otherwise.

| # | Prize | Cost to us | Value to the reader | Data signal | Legal note |
| --- | --- | --- | --- | --- | --- |
| 1 | **The analysis of a concelho the reader chooses**, from our INE data (ten years, rents, neighbours, sources), open for 30 days. Describes, never advises. | 0 (our data; the paid analysis of D83/D85) | High: sold at 29 € a region (D83) | The concelho chosen: the clearest intent signal we can get | No chance, everyone who qualifies gets it: outside the definition in DL 422/89 art. 159(1) on its wording (§3). Needs the paid analysis page to exist and accept a signed pass (§8). |
| 2 | **Reader level** ("Freguês", "Habitué", "Da casa", after The Art of Being a Regular): levels unlock rows 3 to 5, never cash | 0 | Status plus real perks | Frequency, loyalty | Guaranteed; status labels are fine. |
| 3 | **"A carta de domingo"**, the members' letter (D78 tier 3), unlocked at "Habitué" | 0 | Medium-high | Engagement depth | Guaranteed. |
| 4 | **The buyer's guide** (29–49 €, D78 tier 5), unlocked at "Da casa" | 0 | High | Buying stage | Guaranteed. |
| 5 | **Early access**: the next game opens the evening before for "Da casa"; first look at new developments before they are public (D78 tier 25) | 0 | Medium | Interest in new builds | Developer must agree to the early look. |
| 6 | **The reader's name in the next issue** ("Os cinco de terça": first name and country, opt-in) | 0 | Medium, delightful | Consent, country | Explicit opt-in, withdrawable until sending; no surname. |
| 7 | **A filigree piece from a Gondomar workshop**, "oferecido por {oficina}", labelled sponsored | 0 (the workshop gives it) | Very high | Claims by country | Limited stock: allocation must be by skill only and written in the rules; any draw or tie-break by lot needs authorisation (§3). D78 says "no shipped gifts": pick-up at the workshop or shipping by the workshop is the operator's call. |
| 8 | **A Topázio piece**, "oferecido por Topázio", labelled | 0 | Very high | Same | Same as 7. |
| 9 | **A dinner for two at the table in the issue**, offered by the restaurant, labelled | 0 | High for readers in Portugal | Travel intent | Same as 7; useless to readers abroad: offer it only to readers who say they will be in Portugal. |
| 10 | **A hotel night** at the hotel in the issue, offered by the hotel, labelled | 0 | High | Travel dates | Same as 7. |
| 11 | **A 15-minute call with the partner's adviser** (D84's free call) | 0 (partner's time) | High for buyers | Strongest lead signal | The reader chooses it (D79); flat sponsorship only, never per lead (D6); the agency is not named in Maré or on the site while config.agency.public is false (D91). |
| 12 | **A licensed photograph of the issue** as a phone wallpaper | 0 if the licence allows | Low-medium | Share | Only our own or suitably licensed photos. |

**Partner prizes: who the CEO asks and what they get.** The Câmara de Gondomar's "Rota da Filigrana" brochure (2021, visitgondomar.cm-gondomar.pt) lists these workshops on the route, each with a showroom or shop: AC Filigranas, António Marinho, ARPA – Artigos de Ourivesaria, Lda, Conceição Neves, J. Monteiro de Sousa & Filhos, Lda, and Topázio (silver; the brochure says founded in 1874 in Porto, first silver pieces in the 1920s, factory visits Tuesday to Thursday). CINDOR, the sector's training centre, is on the route too. In exchange for one or more pieces they get: the piece photographed and credited in the issue, one labelled line "oferecido por …" with their link, readers walking into the shop to collect, and an aggregate report (claims by country, never names). This is a sponsorship in kind: record it in sponsors/pipeline.csv like any other (CEO). The Topázio press-photo request (step "Photos") can carry the same ask. Dinner and hotel: the CEO asks the table and the hotel chosen for the issue.

## 3. Legal check: Portugal (not legal advice; the operator confirms with counsel before any partner prize)

1. **DL 422/89 (Lei do Jogo), art. 159(1)** defines "modalidades afins dos jogos de fortuna ou azar" as operations offered to the public "em que a esperança de ganho reside conjuntamente na sorte e perícia do jogador, ou somente na sorte, e que atribuem como prémios coisas com valor económico predeterminado à partida"; **art. 159(2)** names "rifas, tômbolas, sorteios, concursos publicitários, concursos de conhecimentos e passatempos". Consolidated text, 13th version (DL 9/2021): pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=242.
2. **Authorisation (art. 160(1))**, since DL 98/2018: the president of the câmara municipal, of the municipality where it runs, or, when it is not confined to one municipality, of the municipality of the organiser's seat. The president sets conditions and the audit regime (art. 160(3)).
3. **For-profit companies (art. 161(1))** may only run "concursos de conhecimentos, passatempos ou outros, organizados por jornais, revistas, emissoras de rádio ou de televisão" and "concursos publicitários de promoção de bens ou serviços". D71 positions us as a platform, not a press title, so a contest of ours would be a concurso publicitário promoting our service. **Art. 161(2):** no cost to the player. **Art. 161(3):** no themes of games of chance, "nomeadamente o póquer, frutos, campainhas, roleta, dados, bingo, lotaria de números ou instantânea": no scratch-card or roulette look, ever.
4. **Sanctions (art. 163):** breaching arts. 160–162 is a "contraordenação económica grave" under the RJCE, with possible seizure and up to six months' ban on the activity.
5. **Our reading:** a prize given to *every* reader who reaches a skill threshold, with no draw, no luck and no limit on winners, has no element of chance and so falls outside art. 159(1) as written: rows 1 to 6 and 11 of §2. **A limited partner prize** ("12 pieces") is where risk starts: allocation by speed can be argued to involve chance, and any tie-break by lot certainly does. Default: limited prizes go only by a skill criterion stated in advance (highest score, then the closest number estimate); if counsel disagrees, or we ever use a draw, we ask the presidente da câmara of our seat for authorisation first (D78 already bans draws).
6. **Unfair practices** (Directive 2005/29/EC, transposed by DL 57/2008), Annex I, banned in all circumstances: point 7, "falsely stating that a product will only be available for a very limited time… to elicit an immediate decision"; point 19, offering a prize promotion "without awarding the prizes described or a reasonable equivalent"; point 31, "creating the false impression that the consumer has already won… a prize" when there is none or claiming it costs money (legislation.gov.uk/eudr/2005/29/annex/I). No fake countdowns, real stock counts only, every promised prize delivered.
7. **Advertising:** partner prizes are advertising and are labelled "oferecido por … · patrocinado" (hard rule 4, Código da Publicidade).

## 4. Rules common to the three designs

1. **One tap in the email.** Question 1, the opening riddle ("O que têm em comum … ?" → Portuguese filigree), sits in the issue with four answer buttons. Each button is a link to `/{lang}/{ed}/mare/jogo/{issue}?a1={A|B|C|D}&s={{api_subscription_id}}`.
2. **The page carries the run.** The tap already counts: the reader lands at 1 of 5 (endowed progress), sees the riddle's answer and its story in two lines, and question 2 is right below. No sign-in.
3. **Same-day prize.** The prize opens on the screen where the run ends. The game of Tuesday stays open until Friday 07:59, Friday's until Tuesday 07:59 (Lisbon time); no countdown shown.
4. **Six questions per issue** (five plus one reserve), all about the place and the market in the issue, each answer revealing a fact with its source and date, so playing teaches: (1) the riddle; (2) the photo challenge (where is this, or which workshop); (3) people and businesses of the place; (4) the number (market price, from facts.csv); (5) the table or the weekend; (6) reserve. Facts come only from the issue's verified sources.
5. **Manners.** Black on white for the run, the photo does the delight; motion 200–300 ms; a wrong answer shows the right one, calmly, with its fact; no confetti, no red, no sound, no countdown, no "you lost"; no reminders outside the two issues.
6. **Readers without an id** (forwarded email, web visitors) can play the whole run; the prize screen asks for their email to keep it (signup through the beehiiv form, D87) and their result is not stored before that. The forwarder's link shares the forwarder's id: the run counts for the forwarder; accepted, low stakes.

## 5. Three designs

Mockups: §9. Each design uses §4.

### A. "Cinco seguidas" (five in a row, with a second tide)

- **Rules.** Five correct answers in a row open the prize. One wrong answer per run is forgiven ("a segunda maré"): the run continues and the reserve question is added, so five correct are still needed. A second wrong answer ends the run; the reader can start again from question 2 (question 1 keeps its first answer), with the questions in a new order.
- **Numbers count as right within 10%** of the official value (honest near-miss: "a 4 %").
- **Prize:** the concelho analysis (row 1). **Levels across issues:** "Freguês" (first run of five), "Habitué" (four issues with five, any four within six consecutive issues, so one missed issue never breaks it: Duolingo's slack), "Da casa" (twelve within sixteen). Levels unlock rows 3, 4, 5.
- **Share:** a spoiler-free line, "Maré 01 · Gondomar ■■□■■■", with the reader's referral link (prompt 57).
- **Why it works:** simplest to explain, clear stakes, teaches; the second tide removes the frustration of losing on question 4.

### B. "O cofre" (the vault)

- **Rules.** The prize is shown before the first tap: a photo of the piece, mostly hidden. Five locks; each correct answer opens one and reveals more of the photo (curiosity gap, Pandora effect). Three locks open a first reward at once: the reader's name in the next issue (row 6, opt-in). Five locks open the vault: the partner piece code (row 7 or 8) and the concelho analysis.
- **Partner stock** is real and shown as a plain count ("Peças nesta Maré: 12. Restam 9."); when it runs out, the vault still pays the analysis. Allocation by skill only (§3.5); rules linked under the count.
- **No partner prize that issue:** the vault holds the analysis and a level step.
- **Why it works:** the strongest stakes, a physical object, sponsor value for workshops; needs a partner each issue and the legal care of §3.5.

### C. "Mais perto" (closer)

- **Rules.** Five questions, 500 points. Choice questions: 100 points right, 0 wrong. The photo question zooms out on request: 100 points at the first crop, 70, then 40. Number questions: 100 points within 2% of the official value, one point less for each percentage point beyond. **400 points open the prize** (row 1); the title "Olho de avaliador" stays on the reader's level page.
- **Ranking by edition:** the reveal shows the day's average by country edition (LU, FR, CH, BR, US, IL), only for groups of 10 players or more (DESIGN_AND_DATA, data rule 7); no individual names.
- **Share:** "Maré 01 · Gondomar · 433" with the five scores.
- **Why it works:** pure skill, the most teaching on prices (the reader learns the €/m² by guessing it), edition pride without naming anyone; slightly more to explain.

**CTO recommendation (the operator decides):** A as the default for every issue, with C's closeness scoring for number questions, and B's vault only on issues where a workshop or partner has given a prize.

## 6. Signals and data

1. **Events** (one schema, DESIGN_AND_DATA data rule 4): `game_answer` (issue, question, choice, correct, closeness, ms to answer, edition, step), `game_run_end` (correct, second tide used, score), `game_prize_claim` (prize, concelho chosen), `game_share`, `game_level`. Page = mare/jogo, place = the issue's concelho, region, origin = edition.
2. **Identity:** the link carries beehiiv's `{{api_subscription_id}}`. The Worker never stores it: it stores `pid = HMAC-SHA256(GAME_KEY, id)`, with GAME_KEY a Worker secret. Nothing personal in the repo; the answer keys (not personal) live in the Worker bundle, not in public assets, except question 1, whose answer the page reveals on landing.
3. **Store:** Cloudflare D1, not KV: KV's free plan allows 1,000 writes a day (developers.cloudflare.com/kv/platform/limits), a list of 2,500 playing twice a week would pass that; D1's free plan allows 5 million rows read and 100,000 rows written a day, 5 GB (developers.cloudflare.com/d1/platform/pricing). Workers Free: 100,000 requests a day.
4. **Consented profile:** the answers run the game (GDPR art. 6(1)(b), a service the reader asked for). Using them to shape the reader's profile (the concelho chosen, the interests) needs consent: one unticked switch on the prize screen, "Usar as minhas respostas para escolher o que me mostram" (prompt 63 §5).
5. **Retention:** answers and runs 24 months after the last play, then only aggregates; names for "Os cinco de terça" deleted after the issue is sent.
6. **Privacy policy (PT, to add under the newsletter section, with EN and FR at roll-out):**
   > **O jogo da Maré.** Quando joga, guardamos as suas respostas, a pontuação, o nível e os prémios que abriu, ligados a um identificador cifrado da sua subscrição (nunca o seu email). Servem para fazer funcionar o jogo e entregar os prémios (artigo 6.º, n.º 1, alínea b), do RGPD). Só os usamos para escolher o que lhe mostramos se ligar essa opção, e pode desligá-la quando quiser (alínea a)). O nome que nos der para a lista "Os cinco de terça" é publicado uma vez e apagado depois do envio. Guardamos os dados do jogo durante 24 meses após a sua última jogada; depois ficam só totais anónimos. Os prémios oferecidos por parceiros são identificados como patrocinados; o parceiro recebe apenas o código que lhe apresentar.

## 7. One tap that a scanner cannot take (Gmail, Apple Mail, Outlook)

1. **What scanners do.** Microsoft Defender for Office 365 Safe Links scans URLs before delivery, rewrites them to safelinks.protection.outlook.com and checks them again at the click; URLs without a valid reputation "are detonated asynchronously in the background" (learn.microsoft.com/en-us/defender-office-365/safe-links-about). Bert Hubert (berthub.eu, 23 Jan 2025) logged Microsoft IPs visiting emailed links, running the page's JavaScript and sending its POSTs, which consumed sign-up links; he saw no scanner pressing an actual button yet, "but this is probably only a matter of time". beehiiv confirms ISPs and anti-phishing software "routinely scan emails and test links", which is why it filters clicks into "Verified Clicks" (beehiiv help, updated 30 Apr 2026). Apple Mail Privacy Protection preloads remote content (images) privately; Gmail serves images through its proxy: so no answer is ever recorded by an image load.
2. **Our endpoint.**
   - The email link is a plain GET to a static page: it renders question 1's answer and question 2 **and records nothing**. A scanner's GET, and a scanner running the page's script, change nothing.
   - The first write is `POST /api/mare/answer`, sent only from a real tap on an answer of question 2 or later: a pointer event with `isTrusted`, `navigator.userActivation.hasBeenActive`, and at least 1.5 s after the page became visible. No script on the page ever posts on load.
   - Writes are idempotent per run (a run id made at the first tap): a replayed or duplicated request changes nothing.
   - Runs never block each other: a fake run can only sit unfinished next to the real one; the best run counts.
   - Requests from scanner networks (Microsoft AS8075, Google AS15169, Proofpoint, Mimecast, from `request.cf.asn`) or answered faster than a person can read are stored but flagged `suspect`, kept out of rankings and metrics, and never block the reader.
   - Prizes are delivered on the screen after the fifth answer, never by a link click alone.
3. **To verify at the first test send** (the operator, one message in §8): tap an answer in Gmail on iOS and Android, Apple Mail and Outlook (iOS app and outlook.com), check the page opens with the reader's id in the URL, and check D1 shows no row from the delivery itself.

## 8. Build sketch (after the operator picks)

1. **Issue file:** `game:` replaces `challenge:` in content/mare/issues/{date}.md (the current challenge, "answer on Friday", is the rejected pattern): design, six questions (kind choice, photo or number; options; the fact shown after; sources `s:`), the prize. The answers go in `content/mare/game/{date}.key.json`, read by a build step into `site/worker/game/keys.js`; site/src/lib/mare.ts strips them from public output and renders question 1 as four email buttons.
2. **Page:** `/{lang}/{ed}/mare/jogo/{issue}` (static, PT first), one question per screen, the run in sessionStorage (strictly necessary for the game the reader asked for; no cookies).
3. **Worker** (site/worker/index.js routes `/api/mare/*`, already covered by `run_worker_first: ["/api/*"]`): `POST /api/mare/answer` → `{correct, fact, run}`; `POST /api/mare/claim` → a signed pass `t = base64url(pid8.concelho.expiry).HMAC` for the analysis; `GET /api/mare/me?s=` → level and progress (read only); a daily aggregate per edition. Rate limit by pid and IP.
4. **D1 schema** (`site/worker/game/schema.sql`):

```sql
CREATE TABLE players (pid TEXT PRIMARY KEY, edition TEXT, lang TEXT, first_seen TEXT, last_seen TEXT,
  level TEXT DEFAULT 'none', fives INTEGER DEFAULT 0, profile_consent INTEGER DEFAULT 0);
CREATE TABLE runs (run_id TEXT PRIMARY KEY, pid TEXT, issue TEXT, design TEXT, started TEXT, ended TEXT,
  correct INTEGER DEFAULT 0, answered INTEGER DEFAULT 0, score INTEGER DEFAULT 0, second_tide INTEGER DEFAULT 0,
  suspect INTEGER DEFAULT 0);
CREATE INDEX runs_pid_issue ON runs (pid, issue);
CREATE TABLE answers (run_id TEXT, q INTEGER, choice TEXT, correct INTEGER, closeness REAL, ms INTEGER, at TEXT,
  PRIMARY KEY (run_id, q));
CREATE TABLE prizes (pid TEXT, issue TEXT, prize TEXT, detail TEXT, code TEXT, at TEXT, PRIMARY KEY (pid, issue, prize));
CREATE TABLE stock (issue TEXT, prize TEXT, partner TEXT, total INTEGER, given INTEGER DEFAULT 0, PRIMARY KEY (issue, prize));
CREATE TABLE edition_day (issue TEXT, edition TEXT, players INTEGER, fives INTEGER, avg_score REAL,
  PRIMARY KEY (issue, edition));
CREATE TABLE shoutouts (pid TEXT, issue TEXT, first_name TEXT, country TEXT, at TEXT, PRIMARY KEY (pid, issue));
```

5. **Dependencies:** the concelho analysis page (D83/D85, paid, "after incorporation") must exist and accept the signed pass through the Worker; until then the prize falls back to the region guide (D78). beehiiv must render `{{api_subscription_id}}` in a link on our plan (content/mare/SENDING.md).
6. **What the operator creates** (Cloudflare, free plan; about 10 minutes):
   1. dash.cloudflare.com → Storage & Databases → D1 SQL Database → Create → name `mare-game`, location Western Europe → Create. Send the CTO the database ID (not a secret).
   2. Workers & Pages → the site's worker → Settings → Variables and Secrets → Add → Type "Secret", name `GAME_KEY`, value from `openssl rand -hex 32` run on your computer → Deploy. Do not send the value to anyone.
   3. The CTO adds the D1 binding `GAME` to site/wrangler.jsonc (helpers do not touch that file) and runs `npx wrangler d1 execute mare-game --remote --file=worker/game/schema.sql`.
   4. beehiiv: in a draft, add a button linking to `https://imoveisportugal.pt/?s={{api_subscription_id}}`, send a test to yourself, tap it and tell the CTO whether the address shows a number or the braces.

## 9. Mockups (scratchpad, research material; not in the repo)

Folder: /tmp/claude-0/-home-user-imoveis-portugal/686bee09-1d24-5475-8099-3259ef978529/scratchpad/p67/game/shots/ (390×844, deviceScaleFactor 2): A1_email, A2_reveal, A3_number, A4_prize; B1_email, B2_lock, B3_tier, B4_open; C1_email, C2_zoom, C3_estimate, C4_result; contact_sheet.png. Sample questions use facts already in content/facts/facts.csv (Gondomar 2 348 €/m², INE 2.º trimestre 2026) and the Câmara's Rota da Filigrana brochure; the names in question 1 stay "[nome em verificação]" until the Gondomar research verifies them.

## 10. Open questions for the operator (facts and business only)

1. **Partner prizes:** may the CEO ask the Gondomar workshops and Topázio for pieces in exchange for a labelled credit, and may the piece be collected at the workshop or shipped by the workshop (D78 says "no shipped gifts")? Recommended: yes, collected in the shop or shipped by the workshop at its cost.
2. **Counsel:** before the first limited partner prize, a one-page check by a lawyer of our reading of DL 422/89 arts. 159–161 (§3.5), and the municipality of our seat for any authorisation. Recommended: yes, before the first B issue.
3. **The concelho analysis as the default prize** gives away a 29 € product (D83) to every reader who plays well. Recommended: yes, 30-day access, one concelho per issue; it is the best signal we have.

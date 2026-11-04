# Maré: design research and the system the three directions vary

Prompt 67, step 2, researched on 4 Nov 2026. Internal, one language (EN). Follows CLAUDE.md rules 15–17, DESIGN_AND_DATA.md, VOICE_AND_WORLD.md and EDITORIAL_POLICY.md. This file picks no look. It gives the measurements, the Morning Brew structure, Maré's structure, and the axes the three directions of step 4 vary along. The phone screenshots of every reference (390×844 at 2×, first screen and full page) are third-party material and are kept outside the repo, never published.

## 1. Findings

### 1.1 Method

Real emails where public: Morning Brew's own archive (each issue page carries the sent HTML) and Really Good Emails (sent HTML of Apple, Monocle, Aesop, Kinfolk, Mr Porter); for Claridge's, Aman, Hodinkee and Cigar Aficionado, whose emails are not public, their sites. Measured in Playwright at 390×844, 2×: body size = the size carrying most characters in blocks of 60+; words per screen = visible words ÷ (page height ÷ 844); sharpness = file width ÷ display width (2.0+ is sharp on an iPhone); colours = text colours with 1%+ of the characters. Cookie banners hidden for screenshots, no consent given. Ten Brew issues (25 Oct–3 Nov 2026) parsed card by card, so word counts are exact.

### 1.2 The numbers

| Reference | Body px / line height | Headlines | Margin | Words per screen | Photos: share, sharpness | Text colours | Type |
|---|---|---|---|---|---|---|---|
| Morning Brew, 3 Nov 2026 issue (email) | 16 / 22 (1.38) | 24 bold sans | 19–34 | 137–141 | 12–21%, 2.6–3.8× | #333, black, blue #1c7ff2 | Helvetica |
| Apple, Vision Pro email, Oct 2025 | 14 (legal 12) / 1.33 | 19–24 semibold | 24 | 123 | 25%, 1.9–2.0× | #1d1d1f, #6e6e73, link #0066cc | system (SF) |
| Monocle Minute, 26 Feb 2025 | 16 / 20 (1.25) | 30 regular serif | 25 | 145 | 33%, 2.8–7× | #222, grey, cyan masthead | Plantin |
| Aesop emails, 2019 and 2022 | 14–16 / 1.75–1.86 | 24 regular | 20 | 32–52 | one or none | two: ink on off-white, or reversed | Suisse + a serif quote |
| Hodinkee feature, 3 Nov 2026 (site) | 19 / 29.4 (1.55) | 30–64 regular serif | 16 | 58 | 62%, 3.6–3.9× | white on #121212 | Portrait |
| Cigar Aficionado feature, 16 Oct 2026 (site) | 16 / 24 (1.5) | 23–29 bold serif | 24 | 44 | 33%, hero 2.4×, inline 1.3× | #262626, #404040, brown #4a1b00 | Domine + Roboto |
| "The Art of Being a Regular", 25 Aug 2025 | 17 / 27.2 (1.6) | 32 regular serif | 16 | 141 | one photo | #5c5537 on #fffbeb | Spectral |
| Claridge's homepage (site) | 16 / 24, tracked | 34–43 regular serif | 24 | 41 | 19%, 4:5 and 1:1, 1.0–1.9× | black, gold-brown #887344 | Sang Bleu + Commuters Sans |
| Aman story "Urban Escapes" (site) | 14 / 20.3 (1.45) | 20–24 regular serif | 25 | 67 | 29%, 3:4, 1.1–1.3× | #313131, #585858 on sand | Lyon + Whitney |
| Kinfolk, Mr Porter emails, 2018 | 14–16 / 24 | 24–32 Georgia | 28–40 | 34–55 | 34–49% | black, greys | Georgia + Arial |

### 1.3 Why the expensive ones feel expensive

1. **Fewer words per screen.** Aesop runs 32–52, Claridge's 41, Cigar Aficionado 44, Hodinkee 58 and Aman 67, against the Brew's 140. The luxury references give an idea a whole screen.
2. **Air in the line.** Line height runs 1.5–1.86 (Aesop, the Substack, Hodinkee, Claridge's), against the Brew's 1.38. Monocle is dense at 1.25 and makes up for it with photographs.
3. **Large display type in a regular weight.** Claridge's sets 34–43 px, Hodinkee up to 64, Monocle 30 and Aman 24, all regular. The Brew sets 24 px bold sans. That is the difference between news and a magazine.
4. **The photographs are the page.** Hodinkee's feature is 62% photographs (72 images, the article photos at 3.6–3.9×) and Monocle is 33%. The Brew is 12–21%, each picture inside a card.
5. **Two to four colours on a ground.** Aman uses no pure black: two greys on sand #f3eee7. Apple uses #1d1d1f and a grey on #f5f5f7. Aesop uses two colours. The colour comes from the photographs.
6. **One idea, one action:** Apple's email is one product, one hero and one blue button.
7. **What reads cheap even at the top:**
   - soft images: Claridge's homepage serves 1.0–1.3× files on a phone, and Cigar Aficionado's inline images are 1.3×;
   - stock serifs: the Georgia emails of Kinfolk and Mr Porter;
   - a cookie wall over the first screen.

### 1.4 What we could not see

1. **The HTSI Ghent story:** ft.com answers automated requests with a security check and search did not find it. Not worked around, not measured. **Needed from the operator: the URL or title.**
2. **Claridge's, Aman, Belmond, Hodinkee and Cigar Aficionado emails:** milled.com shows a bot check, Really Good Emails has none, Hodinkee's /newsletter is a 404 and Cigar Aficionado's newsletter host does not resolve.
3. **Aesop today:** aesop.com shows a bot check; only its 2016–2022 emails were measured (their images no longer load).
4. **"The Art of Being a Regular":** no Substack publication of that name turned up; the page measured is Riley Harper's essay of that title (lifeofrileyh.substack.com). **To confirm with the operator.**
5. **The Brew's current referral tiers** (page disallowed in robots.txt, needs a subscriber link) and **what a poll tap opens** (not clicked: a tap casts a vote).

## 2. Morning Brew: the structure map

### 2.1 A weekday issue, top to bottom

Corpus: the daily issues of 25 Oct to 3 Nov 2026, plus the sent email of 25 Oct and the welcome email (Feb 2026). The medians below come from the eight Monday-to-Saturday issues. An issue runs about 2,240 words before the answers and the footer, or 14–19 phone screens. The Brew calls it a five-minute read: it is skimmed, not read.

| # | Section | Words (median) | What it does |
|---|---|---|---|
| 0 | Subject + preheader | 2–4 words + a line | Pun subject ("Putting it to a vote", "Rev up the Buick"); the preheader carries the news. |
| 1 | Date, logo, **Presented By** + sponsor logo | – | The presenting sponsor sits above the first line. |
| 2 | Greeting, writers' names, **"In today's newsletter, we'll get into:"** | 98 | One odd, true, dated fact (or a reader list), then a three-line menu. |
| 3 | **Markets** | 100 | Six-row ticker (Nasdaq, S&P, Dow, 10-year, Bitcoin, the stock of the day) and one paragraph. |
| 4 | **Lead story** | 342 | Kicker + headline, photo ≈4:3, bold run-ins, three bullets, writer's initials. |
| 5 | **Sponsored By** (first native ad) | ≈127 | The editorial card, labelled. |
| 6 | **World: Tour de headlines** | 343 | Three items of 90–130 words, each opening on a bold sentence. |
| 7 | Second story | 232 | Lighter; pun kicker. |
| 8 | **Sponsored By** (short) | ≈59 | |
| 9 | Third story | ≈230 | |
| 10 | **Reader Poll** | 36 | One question, 4–5 one-tap answers, one being "I just want to see the results". |
| 11 | **Named column** of the weekday | 184 | Mon good news, Tue work life, Wed stock of the week, Thu the internet, Fri the sports desk. |
| 12 | **Sponsored By** (short) | ≈59 | |
| 13 | **What else is brewing** | 154 | Five to seven one-sentence items. |
| 14 | **recs** | 101 | Four or five links around the web; an affiliate pick (**) and sponsor lines (*). |
| 15 | **Play** | 80 | A link to the Brew's own games (Mini crossword, Turntable, Jigsaw) and an inline trivia. |
| 16 | **Word of the Day** | ≈40 | Suggested by a named reader ("Thanks to Heather from Milwaukee"). |
| 17 | **Answer** | 106 | The answers to the trivia, at the very bottom. |
| 18 | Footer | – | The presenting sponsor's legal note; "Was this email forwarded to you? Sign up here." |

Day changes: **Monday** adds "The week ahead" (≈310 words) and markets year to date; **Friday** a news quiz link ("The feeling of getting a 5/5…") and a word puzzle; **Saturday** ICYMI and "Community: Crowd work" (five reader answers to last week's question with first name and city, then the new question with a writer's own answer); **Sunday** is a themed edition (editor's note, four or five features, three games, links, no markets).

### 2.2 Opening, closing, markets, games, referral, ads, polls

1. **Opening:** "Good morning", "Happy Friday", then one specific, dated, slightly absurd fact ("October 28 (that's today) is historically the best day of the year for stocks."), the writers' names and the menu. Twenty seconds that promise the day.
2. **Closing:** play, word of the day, answers. The reward sits last, so finishing the trivia means reaching the end.
3. **Markets:** second, before any story, the same six rows every day, read in five seconds.
4. **Games:** one-tap links to the Brew's own game pages, plus an inline question answered further down (five idioms, five phobias, "Three headlines and a lie"; Saturday's "Open House" gives a listing's facts and asks the price).
5. **Referral:** the sent email carries a **"Share the Brew"** card near the end: "Your referral count: 0" (a personal field), a share button, the reader's link; the web archive strips it. Secondary sources describe tiers from a weekly draw at one referral, through stickers and a members-only Sunday newsletter, to a mug and bigger merchandise, and put referrals at over 30% of subscribers from an in-house system (ReferralCandy, Apr 2020, citing the co-founder).
6. **Ads:** five or six sponsor touches, all labelled: the presenting sponsor top and footer, three native cards (the first after the lead, ≈125 words, then two of ≈60), sponsor lines in recs.
7. **Polls:** one question, one tap, a joke option, the result on the page the tap opens (inferred from the "see the results" option, not tested).

### 2.3 Tone and jokes

1. **The wit sits in the kicker; the headline states the fact:** "DUCK, DUCK, GOOSE" over "DC voters are being served a foie gras referendum"; "THINGS GOT HEATED" over "Hackers attacked European supermarket fridges".
2. **The first sentence carries the joke, the second the news:** "Boiled gelato was the plat du jour" (the fridge hack); "Weil, it's over." (a law firm's collapse).
3. **Bold run-ins steer the scan** ("Big picture:", "Zoom out:", "Why now?"); every story has bullets.
4. **Names on both sides:** readers by first name and town; writers' initials after each item. Managing editor Neal Freyman: "you can read about it and laugh along with us" (The Publisher Newsletter, Sep 2022).
5. **Emojis and about a joke a paragraph:** Maré keeps 1–4 and drops this (VOICE_AND_WORLD.md).

### 2.4 The Brew's look, measured

670 px max width; white cards with 15 px corners and a 1 px #e6e6e6 border on #e9ebf7; kicker 16 px bold uppercase #1c7ff2; headline 24/26 px bold #333; text Helvetica 16/22 #333; one ≈4:3 photograph per story from 1336 px files (3.8× on a phone); Facebook, X and LinkedIn icons under each story.

### 2.5 What works, and why

1. **Pace:** the same order daily, items shrinking as you go (340, 230, 60-word ads, one-liners, a game); never a second long piece.
2. **Scannability and ritual:** a three-line menu, cards opening on a coloured kicker over a plain headline, run-ins and bullets, markets and answers always in the same place.
3. **Forwardability:** share icons per story, a personal referral count in every issue, "Was this email forwarded to you?", readers quoted by name.
4. **Ads that get read:** the editorial card, right after the lead, always labelled.

## 3. Maré's structure

**Take** from the Brew the fixed order and shrinking rhythm, the menu, the kicker-over-headline card, run-ins, one-tap play revealed the same day, readers named, the referral card and one labelled sponsor card after the lead. **Leave** news aggregation (D71), emojis, a joke a paragraph, five sponsor touches, 2,000 words. **Add** from the luxury side photographs as the page, fewer words per screen, one idea per screen. **Budget:** a four-minute read is **750–850 words** of reading copy (at an assumed 200 words a minute in Portuguese, to check against scroll depth once issues go out), 8–11 phone screens depending on the direction.

### 3.1 Tuesday: a place and its story

| # | Block (PT) | Words | Photo | What it does | Data signal |
|---|---|---|---|---|---|
| 0 | Assunto + pré-cabeçalho | ≤ 60 chars + a line | – | Specific subject; the preheader carries the riddle. | open |
| 1 | Cabeçalho | – | – | Maré, "Terça, 1 de dezembro · 4 minutos", Ver no browser; "Patrocinado por [Parceiro]" only once signed. | – |
| 2 | Bom dia + "Hoje:" | 50–70 | – | One true, dated fact about the place, then a three-line menu. | – |
| 3 | A pergunta (game, Q1) | 25–40 | detail, optional | The opening riddle, 3–4 one-tap answers; the tap opens the run page and the reveal at once. | answer, time |
| 4 | A história | 220–260 | hero | Pays the riddle off. One thread followed to the source, run-ins, bullets, numbered sources. | click |
| 5 | Os números | 40–60 | – | Four rows: €/m² (INE), the change on a year, a life number, a price. Never the hook. | tap to map |
| 6 | Patrocínio | 60–90 | sponsor's | Editorial card opening with the EDITORIAL_POLICY label; empty and labelled until a sponsor signs. | click |
| 7 | Em volta | 3 × 45–60 | small or none | Three short items on other threads of the place. | click per item |
| 8 | O formato da semana | 40–80 | as needed | Rotates: the league table, one huge number, the bench, before-and-after prices. | tap |
| 9 | Espaço do promotor parceiro | 30–50 | promoter's or marked placeholder | The labelled home block. Never O'rizon (D91). | tap |
| 10 | A mesa | 40–60 | landscape | One table near the place, and what to order there. | tap |
| 11 | O jogo (Q2–Q5) | 40–60 | – | The run continues. Five correct in one sitting unlocks the prize the same day (step 7). | answers, run, prize |
| 12 | Traga um amigo | 25–35 | – | The reader's referral count and link (D78 tiers 1/3/5/10/25). | share |
| 13 | Fecho | 30–40 + legal | – | "Responda a este email" (a question for Friday), disclaimer, sponsored label when present, unsubscribe and postal footer (beehiiv). | reply |

The ranges add up to 735–1,025 words; an issue hits 750–850 by keeping most blocks at the low end.

### 3.2 Friday: the weekend

Tuesday's frame (blocks 0–2, 6, 9, 11–13), with: **A pergunta** starting a new run (Tuesday's answers are never Friday's payoff: rejected); **O fim de semana** (200–240 words, hero), a 48-hour plan or one day hour by hour, ending at the homes; **Os números** for the weekend (sunset, sea temperature, a price); **Três sítios** (A mesa, O passeio, A festa; 3 × 45–60 words, one landscape photo each); **Os leitores** (80–120 words), three or four consented replies to Tuesday's question with first name and country, then the new question. A streak across issues may add a level, never delay a prize.

### 3.3 Rules for every issue

1. The sponsor card and the home block are always labelled and never pass as editorial (EDITORIAL_POLICY.md, hard rule 4).
2. The disclaimer and the unsubscribe line close every issue.
3. Every figure has a source number. The sources list sits on the web version.
4. One joke at most, in a kicker or a first line, never in a headline (VOICE_AND_WORLD.md).
5. Every word is live text; only the masthead wordmark may be an image.

## 4. Maré's finish: what the three directions vary

### 4.1 Fixed for all three

1. **Phone first:** 600 px column on desktop, 20–24 px margins on a 390 px phone, text 17–19 px (the luxury references; the Brew's 16 is the floor), line height 1.45–1.65, 34–42 characters a line.
2. **Sharp photographs:** full-width files 1200 px wide or more (2× the column, 3× the phone), JPEG (Gmail converts WebP), under 200 KB, never 1.0–1.3×.
3. **Ratios:** 4:5 hero and home block, 3:2 places and tables, 1:1 details; square corners on photographs (rounded photos were rejected).
4. **Colour:** at most four plus the photographs (a ground, two text tones, one accent). Never a rejected look: Georgia or a stock serif in black and white with one accent; cream paper with gold letter-spaced labels, forest-green blocks, drop caps, centred italic quotes, stat strips.
5. **Dark mode designed:** `prefers-color-scheme` works in Apple Mail, Outlook (Mac, iOS, Android, outlook.com) and Samsung Email; Gmail ignores it and may recolour the email, so logos are PNGs with a transparent edge and no text sits on an image.
6. **Outlook for Windows** drops rounded corners and web fonts; the layout holds with square cards and the fallbacks (`mso-font-alt`).

### 4.2 The blend axes

| Axis | Morning Brew end | Claridge's end | Evidence |
|---|---|---|---|
| Words per screen | 110–140 | 35–60 | Brew 140; Aesop 32–52, Claridge's 41 |
| Container | cards on a tinted ground | one open sheet | Brew cards, Apple panels; Aesop, Aman |
| Photos' share of page | 12–20%, inside cards | 40–60%, full bleed, in sequence | Brew 12–21%, Monocle 33%, Hodinkee 62% |
| Headlines | bold sans 22–26 px under a coloured kicker | regular serif 30–44 px, small label | Brew 24 bold; Claridge's 34–43 regular |
| Text face and line height | neutral sans at 1.35–1.45 | book serif or tracked sans at 1.6–1.8 | Helvetica 1.38; Spectral 1.6, Aesop 1.8 |
| Numbers | ticker table | one number on its own screen | Brew Markets; Apple |
| Colour | one saturated accent on white | toned ground, two greys, colour from photos | Brew blue; Aman sand, Apple #f5f5f7 |
| Blocks | 12–14 | 6–8, each a screen | Brew 15; Apple 7; Aesop 1–3 |

### 4.3 Three blends to build in step 4 (starting points, not a chosen look)

1. **Brew-forward.** From Morning Brew: cards, the menu, a coloured kicker over a plain headline, the numbers table, 110–130 words a screen, all 14 blocks. From Claridge's and Apple only the finish: photographs at 3× in every card, a toned ground, a regular-weight serif for headlines over a clean sans, two greys and one accent. Scrolls fast.
2. **Even blend (Monocle, Hodinkee).** An open sheet, no cards, full-width photographs between blocks (about a third of the page), serif headlines at 28–34 px, text in a book serif or quiet sans at 18 px and 1.55, 80–100 words a screen, the kicker as a small sans label, the league table and the bench typeset as their own blocks.
3. **Claridge's-forward (Apple, Aesop, Aman).** One idea per screen: a full-bleed 4:5 photograph opens each block, a large regular-weight headline, 40–70 words a screen, one number huge on its own screen, the game possibly on a dark screen like a keynote slide. From the Brew only the order, the brevity, the riddle, the game and the referral card; fewer blocks (Em volta becomes one item, A mesa merges into the lead).

All three pass 4.1, carry 3.3 and stay within 750–850 words.

### 4.4 Fonts: free (OFL) and how they behave in email

caniemail.com (font test of 19 Dec 2023; data of 16 Sep 2026) shows that web fonts load in only a minority of clients, about 22% plus 2% partial:

| Web fonts load | Web fonts do not load |
|---|---|
| Apple Mail (iOS and macOS) | Gmail (web, iOS, Android); it shows only Roboto and Google Sans |
| Samsung Email (not with Microsoft accounts) | Outlook (Windows ignores remote fonts; Mac, iOS, Android and outlook.com do not load them) |
| | Yahoo |

**The fallback stack is what most Gmail and Outlook readers see**, so each direction is checked twice: with the web font and with its fallback.

| Font | Role | Designer | Note |
|---|---|---|---|
| Gloock | display serif | Duarte Pinto (Portuguese designer) | high contrast; 28 px and up |
| Instrument Serif | display serif | Rodrigo Fuenzalida, Jordan Egstad | condensed; the huge number |
| Fraunces | display/text serif | Undercase Type and others | warm, variable |
| Bodoni Moda | display serif | Owen Earl | didone; large sizes only |
| Newsreader | text serif | Production Type | built for screen reading |
| Spectral | text serif | Production Type | the Substack reference's face |
| Domine | headline serif | Impallari Type | Cigar Aficionado's headlines |
| Instrument Sans | sans | Rodrigo Fuenzalida, Jordan Egstad | pairs with Instrument Serif |
| Schibsted Grotesk | sans | Bakken & Bæck, Henrik Kongsvoll | editorial sans |
| Inter | sans | Rasmus Andersson | closest to its system fallbacks |
| Manrope | sans | Mikhail Sharanda | today's site text face |
| DM Mono / IBM Plex Mono | figures for Os números | Colophon / Mike Abbink, Bold Monday | tabular figures |

All are OFL, checked in the google/fonts repository (`ofl/<family>/METADATA.pb`) on 4 Nov 2026.

The references' own faces are commercial, so they are **not** proposed: Sang Bleu and Suisse (Swiss Typefaces), Commuters Sans (Pangram Pangram), Lyon and Portrait (Commercial Type), Whitney (Hoefler&Co), Plantin (Monotype). Any of them would need a paid email and web licence and the operator's written go.

Fallback stacks to test on devices in step 8 (Georgia and Times New Roman are left out on purpose):
1. Display: `Gloock, "Bodoni 72", Didot, "Iowan Old Style", Constantia, "Noto Serif", serif`.
2. Text serif: `Newsreader, "Iowan Old Style", Charter, "Sitka Text", Cambria, "Noto Serif", serif`.
3. Sans: `"Instrument Sans", -apple-system, "Helvetica Neue", "Segoe UI", Roboto, Arial, sans-serif`.

### 4.5 Photographs per block (feeds the shot list)

- **A história (hero):** the thread in use (1 Dec: filigree on the bench, hands at work), 4:5, 1200 × 1500 minimum.
- **A pergunta:** a detail that hints without giving the answer away, 1:1, 1200 × 1200.
- **Em volta:** the river, a sports venue, an artwork, 3:2, 1200 × 800.
- **O formato da semana:** the bench in close-up (none for a table), 3:2 or 4:5, 1200 × 800.
- **Espaço do promotor parceiro:** the promoter's own photograph, credited; until then a marked placeholder, 4:5, 1200 × 1500.
- **A mesa / Três sítios:** the dish or the room, 3:2, 1200 × 800.

No photograph of a living person without a clear licence; no low-resolution web photographs.

## 5. Sources (opened 4 Nov 2026)

1. Morning Brew: https://www.morningbrew.com/archive and the ten issues linked from it, /issues/morning-boo-2026 to /issues/putting-it-to-a-vote (25 Oct to 3 Nov 2026).
2. Really Good Emails, https://reallygoodemails.com/emails/ : morning-brew-halloween-newsletter, caution-morning-brew-coming-in-hot, apple-vision-pro-now-powered-by-m5-available-october-22, the-monocle-minute-on-design-wednesday-26-february-2025, a-measure-of-composure-in-the-chaos, introducing-ptolemy-aganice-and-callippus, and the 2018 Kinfolk and Mr Porter Journal emails.
3. https://www.hodinkee.com/articles/casio-yamagata-visit ; https://www.cigaraficionado.com/article/the-broken-beauty-of-siglo-s-kintsugi-ashtray ; https://lifeofrileyh.substack.com/p/the-art-of-being-a-regular ; https://www.claridges.co.uk/ ; https://www.aman.com/stories/urban-escapes.
4. caniemail data: https://www.caniemail.com/api/data.json. Font licences: https://github.com/google/fonts.
5. Secondary: ReferralCandy, 21 Apr 2020, https://www.referralcandy.com/blog/morning-brew-referral-program ; Referral Rock, https://referralrock.com/rms/program-example/morning-brew/ ; The Publisher Newsletter, 15 Sep 2022, https://themediaroundup.beehiiv.com/p/thursday-15th-september-tone-voice-vital-morning-brews-newsletter-success
6. Not reachable: ft.com (security check), milled.com and aesop.com (bot checks).

# Prompt 67: Maré from scratch, the newsletter Claridge's and Steve Jobs would make

Operator, 4 Nov 2026. CEO mockups v3 to v8 were all rejected ("looks super Claude", "terrible", "shitty pictures"). You own this now: research, ask, design, build. Rules 15 (one language), 16 (DESIGN_AND_DATA.md) and 17 (golden sample first) apply. Record it as the next free D number.

## 0. First, ask the operator (one batched message, before any design)
Ask only what you cannot find yourself. At least:
1. Three newsletters or pages he would be proud to sit next to in the inbox (his references so far: the HTSI Ghent story on ft.com, Cigar Aficionado news, Hodinkee home, the Substack "The Art of Being a Regular" cover).
2. The image budget: which licence from section 3, or a commissioned shoot.
3. The streak prize (section 4): pick or reject the options you propose.
4. Day and send time, and whether Maré stays weekly.
5. Anything else that would change the design. Then build without asking again until the sample is ready.

## 1. Research before drawing anything
1. Study and scrape for structure, type, spacing, image treatment and rhythm: the HTSI newsletter and ft.com/htsi, Claridge's (site and emails), Apple (newsroom, product pages, launch emails), Cigar Aficionado, Hodinkee, Monocle's emails, Kinfolk, Aesop's emails. Screenshots on a phone.
2. Write content/mare/DESIGN.md: what makes each one feel expensive, in numbers (type sizes, line height, margins, how many items per screen, photo ratios, colour count). Then our design system from it.
3. What the operator rejected, so you do not repeat it:
   - cream paper, gold letter-spaced labels, forest-green blocks, drop caps, centred italic pull quotes, rounded photos, stat strips;
   - white page with a generic bold serif, one news-site skin after another;
   - low-resolution web photos.
   The bar: one idea per screen, huge calm space, photography that could be an Apple keynote slide, the restraint of a Claridge's menu card.
4. Fonts: licensed for email and web. Free first; if a paid face is clearly better, price it in the report.

## 2. Copy: the 1 December issue, Gondomar (PT only for the sample)
1. **Voice.** Cigar Aficionado plus How To Spend It, written with Mariana van Zeller's method: follow one story to its source with primary data, names and places, no two-beat flourishes ("Comece pelos números." is banned), no history lessons, no invented people. 50/50 property and lifestyle.
2. **Gondomar only.** Viana belongs in a Viana issue, not here.
3. **Verified facts you can use** (re-check each and add it to content/facts/facts.csv):
   - median €2,348/m², +23.4% (INE Q2 2026); €300k buys about 128 m²;
   - 37 km of Douro riverside; Estação Náutica opened October 2026;
   - 42% of national gold jewellery output, 445 firms (70% one-person), about 800 jobs, about €60M exports in 2022 to Spain, Hong Kong, Germany, Italy, US, France, Switzerland (Câmara, Jornal de Negócios, 18 Apr 2023). visitportoandnorth says "60%": use 42% unless you find a newer official figure;
   - filigree made only in Gondomar and Póvoa de Lanhoso, Portuguese intangible heritage 2023, UNESCO candidacy 2025; Rota da Filigrana since 2016;
   - Topázio, founded 1874 by Manuel José Ferreira Marques, factory in Gondomar, about 30,000 pieces a year, third-largest exporter of the sector (Forbes PT, INE), factory visits Tuesday to Friday;
   - **Zulmiro de Carvalho**, sculptor, born in Gondomar in 1940, studied at St Martin's in London (Gulbenkian scholarship, 1971-73, met Anthony Caro), monumental works in South Korea and Macau, in the CAM Gulbenkian collection, founding president of the Júlio Resende foundation;
   - Júlio Resende (1917-2011): Ribeira Negra tile panel at the Ponte Luís I, Lugar do Desenho in Valbom (opened 1997, about 2,000 drawings), buried there; São Paulo Biennial prize 1951;
   - Ricardinho, from Valbom: six times world's best futsal player (record), world champion 2021;
   - D8 nomad visa €3,680/month in 2026; Michelin 2026: The Yeatman two stars; 53 starred, 9 with two stars, 3 in Greater Porto.
4. **Find more yourself** and list them with sources: companies founded or made in Gondomar that a cool reader would know, designers, chefs, artists, athletes, brands that use Gondomar gold or silver, films or campaigns featuring it. The operator wants "facts cool people would like to know".
5. Subject line: specific, no AI slop, no question bait. Give three options.

## 3. Images and video: top tier, licensed, recommend a paid option
Hard rule 5 says no paid tool before a sponsor pays. The operator asked for a recommendation, so price it and let him decide:

| Option | What you get | Price to verify | Note |
| --- | --- | --- | --- |
| Commissioned Gondomar shoot (photographer plus drone, one day) | Exclusive photos and film we own | quote 2 or 3 local photographers | Best for exit: the buyer gets assets, not a subscription |
| Artlist (Max) | Cinematic 4K/8K footage, music | about $40/month, billed yearly | Footage stays licensed for published projects |
| Envato Elements | Unlimited photos, 4K video, fonts | about $16.50/month, billed yearly | Uneven quality; licence per project |
| Stocksy | Curated, least "stocky" photos | per image | Expensive, small library |

For each: licence for email, web and social, credit rules, whether the licence survives cancellation, and **whether it transfers to a buyer of the brand**. Recommend one. Until he decides, use only what is licensed today: the operator's Gondomar photos are not cleared, so ask the Câmara (draft the email for the CEO) and use Commons or Câmara images meanwhile.

## 4. Gamification: answers and prizes the same day
1. **Daily answer, not Friday.** Each quiz option in the email is a one-tap link carrying the subscriber's id (verify beehiiv's merge tag for it). A Pages Function records the first tap per issue and opens a page with right or wrong, the explanation, and the reader's streak. The photo challenge works the same way: four places to tap, the answer revealed at once.
2. **Streaks.** Five correct answers in a row unlocks a prize at once on that page. Propose prizes that cost no human time and produce a data signal, for example:
   - a personal market report for the concelho of the reader's choice, generated from our data (describe, never advise: EDITORIAL_POLICY.md);
   - early access to new map features;
   - entry to a monthly draw for a paid call.
3. **Data and GDPR.** Store a hashed subscriber id and answers in D1 or KV, never in the repo (hard rule 3). Add the purpose to the privacy policy in the same pass. Free tier only.
4. One-tap must work in Gmail, Apple Mail and Outlook, on phones.

## 5. Build the golden sample (rule 17)
1. **Check beehiiv first.** Find out what the free plan allows: custom HTML, custom fonts, image sizes, dark mode. Design within what it can send; say what it cannot do.
2. Build the 1 December PT issue as a beehiiv draft (never sent) plus the template.
3. Write an acceptance list and check the issue against it: phone and desktop, Gmail app, Apple Mail, Outlook, dark mode, load time, every fact with a source, sponsored label, unsubscribe.
4. Show the operator phone screenshots and wait for his go before rolling out to other editions or rewriting content/NEWSLETTER_FORMAT.md.

## 6. Report
1. The screenshots.
2. The questions you asked and his answers.
3. Your licence recommendation with prices.
4. The new facts found, with sources.
5. What beehiiv could not do.
6. What you could not do instead of a weaker version.

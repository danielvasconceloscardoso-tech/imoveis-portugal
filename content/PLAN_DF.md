# Content and social plan, Doutor Finanças model (prompt 13, D23)

What Doutor Finanças does (design/v2/DOUTOR_FINANCAS.md): about three dated articles a day, every one ending with a simulator and a "talk to us" button; 20 calculators as the traffic engine; a monthly data report for the press. Our version is smaller and for people abroad: one article per real question, every week, per edition and language, each ending with its calculator and the matching partner. Rules: content/EDITORIAL_POLICY.md, content/VOICE.md, facts only from content/facts/facts.csv. Topic bank: content/TOPICS.md.

## 1. Content: one article per real question

**Rhythm.** Each week, per edition, one article in PT, EN and FR (6 editions × 3 languages = 18 pieces a week; about 50 distinct questions a year once shared questions are reused across editions). The newsletter (content/NEWSLETTER_FORMAT.md) points to it.

**Where questions come from, in order.**
1. Replies to the newsletter ("Responda a este email com a sua pergunta").
2. Questions sent through "Talk to a partner" and "A sua casa, tratada de fora" (the question only, never the person).
3. The FAQ ranking by search interest (content/FAQ_SOURCES.md), then Google "People also ask" per country.

**Shape of every article** (800 to 1 200 words):
1. The question as the title, in the reader's words.
2. The short answer in two sentences, with its source number.
3. The worked example with real 2026 figures (and the reader's currency).
4. What changes for each edition (one paragraph per country where it matters).
5. **The calculator** that answers it, embedded as a link with the inputs pre-filled (shareable URL).
6. **The partner** for that question: agency (finding, viewing, buying), credit partner (financing), lawyer or tax adviser (tax and legal), money transfer.
7. Disclaimer and sources.

**Question → calculator → partner.**

| Question family | Calculator | Partner |
| --- | --- | --- |
| How much does it cost in total? | Custo total, IMT e imposto do selo | Agency |
| How much can I borrow? What can I afford from my salary in CHF/$/R$/₪? | Que casa consigo comprar, Taxa de esforço, Prestação | Credit partner |
| How much does the house cost every year? | IMI | Tax adviser |
| Is renting it out worth it? | Rendimento do arrendamento | Tax adviser |
| What if I sell later? | Mais-valias | Tax adviser |
| What does my budget buy here and there? | O que compra, Preços das casas | Agency |
| Can I buy without going? Visits, power of attorney, CPCV | Plano de compra (paid, D22, when live) | Agency (15-min call, D19), lawyer |

**First 12 weeks (from 1 Dec 2026), same order in every edition, local angle per country.**
1. What 500 000 € buys here and there (O que compra) · 2. The 7.5% non-resident IMT and its exceptions · 3. Can I get a mortgage from abroad? (LTV 80/90%, DSTI 45%) · 4. Buying without travelling: power of attorney and apostille · 5. CPCV and the deposit (sinal) · 6. IMI and AIMI every year · 7. Renting out: 25% for non-residents · 8. Moving the money and proof of funds · 9. Gondomar, Porto and the North in INE numbers · 10. Selling later: capital gains · 11. Tax where you live (one country per edition: LU treaty, FR 3916, CH 2nd pillar, BR Bens e Direitos, US FBAR, IL treaty) · 12. Inheritance: the house back home.

**Quarterly data piece** (our Observatório, small): when INE publishes the quarter (the next quarter is expected around January), update site/src/data/ine-m2.json and facts.csv, then one article and one image per edition: "Preços no Norte, trimestre a trimestre". Sent to Portuguese-community media in each country (for example LusoJornal in France and Contacto in Luxembourg) as a ready-to-use chart with its source.

## 2. Social: formats and rhythm per audience

Doutor Finanças' social channels could not be opened from here (blocked); the plan follows what their site shows (short explainers, client cases, podcast) and where our readers are.

| Edition | Main channels | Weekly rhythm | Formats |
| --- | --- | --- | --- |
| Luxembourg, France, Switzerland (emigrants) | Facebook page and community groups, WhatsApp (channel and "send to family") | 3 Facebook posts, 1 WhatsApp channel message, 1 short video | "Aqui vs lá" image; one-number post; question of the week with the calculator link; 60-second video "as contas de uma casa de 245 000 €" |
| Brazil | Instagram, YouTube | 3 Instagram posts or carousels, 2 Reels, 1 YouTube video (5 to 8 min) | Carousel "quanto custa de verdade" in R$; Reel with one number; YouTube walkthrough of a calculator |
| USA | YouTube, Google (articles and calculators) | 1 YouTube video, 1 Shorts, articles indexed for search | "Buying in Portugal from the US: the real numbers"; FBAR and treaty explainer; calculator walkthroughs |
| Israel | Facebook, WhatsApp, YouTube | 2 Facebook posts, 1 WhatsApp message, 1 short video | Same as emigrant editions, in English; ₪ figures |

**Rules for every post.** One sourced number or one real question; the source on the image; the link goes to the calculator or the article, never a bare homepage; sponsored posts labelled; no invented testimonials; exported weekly as the Meta Business Suite bulk file and scheduled only after the operator approves (hard rule 2).

**Later, when a sponsor pays for it.** A monthly 20-minute podcast or live ("No Final de Contas" is their equivalent): one reader question answered with the partner agency or the credit partner, labelled as sponsored.

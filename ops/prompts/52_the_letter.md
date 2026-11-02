# Prompt 52: the weekly letter, redesigned, and the engine to fill it with readers

CEO, 2 Nov 2026, 14:45. The current drafts (content/inbox/week-0N/newsletter) are accurate but read like a tax notice: long paragraphs, raw tracking links, no image, no number, a deficit opening ("Se não pode tirar dias…"), and press words ("edição") that D71 bans. Redesign to the mockup in `design/newsletter/carta_v2_mockup.html` (and `Carta_semanal_mockup.png`), rewrite weeks 1–4, and build the reader engine. Nothing is sent; beehiiv gets drafts only.

## 1. The voice and the order: desire first, the how last (operator, 2 Nov; D72)

We close people when they fall in love with Portugal, not when they understand IMT. The letter sells the life: the places, the houses, the sea, the table, the parties. The practical part comes last, short, as the answer to "how do I get there".

**The voice:** Cigar Aficionado (the pleasure, told by someone who knows), Hodinkee (detail and craft, the story behind the object, real expertise worn lightly), Morning Brew (a friend who writes well, quick, a little wit, never cute). Concretely:
- Write about a real place, a real house, a real afternoon: the light in Comporta at 7 p.m., the tasca in Gondomar that opens at noon, the levada in Madeira, the Douro at harvest, Lisbon on the night of Santo António, New Year's fireworks over Funchal bay.
- Details over adjectives: the name of the beach, the wine in the glass, the minutes to the airport, the price of lunch. Never "stunning", "breathtaking", "hidden gem", "paradise", "nestled", "boasts", "luxury".
- One small piece of wit per letter, in the framing, never in the numbers.
- Short sentences. Second person. A human signs off (the brand, not a name).
- Every fact still sourced (D12); the beauty is true, so it needs no superlatives.

**The order of every letter:**
1. **O lugar** (the destaque): one place, one photograph or film still, the number on the image (€/m², 10-year change, later the index), a headline of at most eight words and 80–120 words that make the reader want to be there this weekend. "Ver no mapa →".
2. **A casa:** one home worth looking at: a partner development with photos and what is available (labelled when it is a partner), or a house type in that place with what it costs. "Ver a casa →".
3. **O que fazer este mês:** three lines: a festa, a restaurant, a beach, a golf course, a wine harvest, an event in the next four weeks, wherever it is in Portugal.
4. **O número:** one number about life (sunshine hours, sea temperature in October, the flight time from the edition's airport, the price of a coffee and a pastel de nata) or about the market. Big, sourced.
5. **Parceiro · Patrocinado:** one labelled partner block.
6. **Como lá chegar** (last, three lines max): one practical step of the buying path, positive ("Pode comprar sem ir a Portugal: o NIF pede-se online.") and a link to Passo a passo. Never a tax lecture.
7. **A sua pergunta:** reply, a person reads it.

Header: brand, edition, date ("Luxemburgo · Carta de 3 dez"); never "edição", "n.º", "jornal". Links are words with an arrow; UTMs inside.

**The calendar of desire** (`content/letter/CALENDAR.md`): plan the 12 weeks around what Portugal is doing that week: São Martinho and magusto (11 Nov), the Christmas lights in Porto and Lisbon, Madeira's New Year (fireworks over Funchal), January surf at Nazaré, Carnaval in Ovar and Torres Vedras, almond blossom in the Algarve (February), Easter, the Santos Populares (June), August in the aldeias, harvest in the Douro (September). Each week's place is chosen from it, in all six editions, with the same photo standard as the feed (prompt 46).

## 2. Design

1. 600 px, ivory background (#FBF9F5) on a warm page (#EFEBE3), Playfair Display for headlines and numbers with Georgia fallback, Manrope for text with Helvetica/Arial fallback, the green (#2F5D50) only for the small section labels.
2. Images hosted on the site, WebP plus JPEG fallback, alt text, under 150 KB each; total email under 102 KB of HTML (Gmail clipping).
3. Dark-mode safe, readable at 390 px, tested in Gmail (web, iOS), Apple Mail, Outlook web; one-column on phone.
4. Build it as a beehiiv-compatible template and as `scripts/letter/render.mjs` that turns `content/inbox/week-NN/letter/{edition}-{lang}.md` front matter (destaque, numero, concelho, parceiro, pergunta) into the beehiiv HTML and a PNG preview.

## 3. Rewrite weeks 1–4

All six editions, PT, EN, FR, in the new voice and order. The pillar topics (NIF, total cost, signing from abroad, budget) move to "Como lá chegar" and to the site; the letters lead with places: week 1 Comporta, week 2 the Porto Christmas lights and the Douro, week 3 Madeira and New Year, week 4 the Algarve in winter (adjust to the calendar). The three welcome emails rebuilt the same way: 1) the place that makes people fall for Portugal, 2) a house and what it costs, 3) the way there, made simple. No AI tells, every figure sourced. Contact sheet PDF of all 4 weeks for the operator.

## 4. The reader engine (target: 10,000 subscribers across editions in 12 months)

Build what is ours; prepare what needs partners.
1. **On the site:** the signup in three places only (after the destaque on every edition home, at the end of every article, at the end of the Concierge); one field (email) plus the edition preselected; double opt-in; the welcome series.
2. **Lead magnets that are ours:** "O seu concelho": the full index card of any municipality, emailed (requires the letter opt-in, separate consent); the budget simulator result emailed; the Portugal 100 report (free for subscribers on 1 Dec).
3. **Referral:** check what beehiiv's plan includes for referrals; if not free, build a simple referral link (each subscriber's code, a reward at 3 and 10 referrals: the Portugal 100 report, a 20-minute call with the advisor). Document it.
4. **Partner distribution (prepare the asks, the operator sends):** the three developers and the partner agency send the signup to their buyer lists; the banks' non-resident units mention it to clients; diaspora associations, Casas de Portugal, the consulates' community pages and the Conselhos das Comunidades list it; the lawyers add it to their client emails. One-paragraph ask per partner type in `ops/growth/asks.md`.
5. **Social to letter:** every post ends with the letter, not the site (prompt 46).
6. **Measure weekly** in `ops/METRICS.md`: subscribers per edition, open rate (Apple-adjusted), click rate per block, replies, unsubscribes, source of each signup.

## 5. Selling the letter (sponsor product)

1. **One partner slot per letter per edition,** sold by the month (four letters), exclusive per category per edition, labelled.
2. **Founding price until 1,000 subscribers in that edition:** 600 €/month per edition, 1,500 €/month all six; −40% for the founding ten. Then CPM pricing: 40–60 € per 1,000 subscribers per letter for finance and real estate audiences, reviewed quarterly. Write it into rate card v5 §7c.
3. **"Apresentado por":** a bank presents the whole letter in one edition for a quarter (header line, partner block, one destaque a month on its topic, clearly labelled): 4,500 €/quarter per edition founding.
4. The media kit page for the letter: the format, the audience by edition, the sample letter, the prices, the labelling rule.

Ship the template, the renderer, the rewritten weeks, the signup changes and the lead magnets per D67; report with the contact sheet PDF and one line on anything not done. No sending.

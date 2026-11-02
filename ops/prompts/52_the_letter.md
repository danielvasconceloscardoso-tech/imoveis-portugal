# Prompt 52: the weekly letter, redesigned, and the engine to fill it with readers

CEO, 2 Nov 2026, 14:45. The current drafts (content/inbox/week-0N/newsletter) are accurate but read like a tax notice: long paragraphs, raw tracking links, no image, no number, a deficit opening ("Se não pode tirar dias…"), and press words ("edição") that D71 bans. Redesign to the mockup in `design/newsletter/carta_v2_mockup.html` (and `Carta_semanal_mockup.png`), rewrite weeks 1–4, and build the reader engine. Nothing is sent; beehiiv gets drafts only.

## 1. The format ("A carta", one per edition, Thursday 08:00 local)

Inspiration: Monocle's daily brief (calm, one city, one idea), Wine Spectator's newsletter (the score as the hook), Axios Smart Brevity (one line says why it matters), Morning Brew (a voice people forward). Ours is read in under three minutes.

1. **Header:** the brand, the edition and the date ("Luxemburgo · Carta de 3 dez"). Never "edição", "n.º", "jornal".
2. **Destaque da semana:** one full-width photograph (hero grade, licensed) with **the number** on it, bottom left, over a soft dark gradient (place · €/m² · 10-year change; the index score once live). A headline of at most 10 words, positive. Two sentences. One link: "Ler em 3 minutos →".
3. **O número da semana:** one large number (Playfair, 64 px) and one sentence on why it matters, plus a link to the matching simulator. Every number sourced; nothing that depends on a pending legal check (30d) until it clears.
4. **Concelho da semana:** a photo, the index score, the place, the one-line reason, "Com {budget} compra {m²}" for the edition's typical budget, "Ver no mapa →".
5. **Parceiro · Patrocinado:** one labelled partner block per letter (Código da Publicidade art. 8), visually distinct (warm grey panel), headline, two lines, one link. Empty slot = a house ad for the Concierge.
6. **A sua pergunta:** one line inviting a reply; the best reply opens the next letter.
7. **Footer:** disclaimer in one line, sources with dates, unsubscribe (beehiiv), the brand only.
8. Links are words with an arrow, never raw URLs; UTM parameters stay inside the links.

## 2. Design

1. 600 px, ivory background (#FBF9F5) on a warm page (#EFEBE3), Playfair Display for headlines and numbers with Georgia fallback, Manrope for text with Helvetica/Arial fallback, the green (#2F5D50) only for the small section labels.
2. Images hosted on the site, WebP plus JPEG fallback, alt text, under 150 KB each; total email under 102 KB of HTML (Gmail clipping).
3. Dark-mode safe, readable at 390 px, tested in Gmail (web, iOS), Apple Mail, Outlook web; one-column on phone.
4. Build it as a beehiiv-compatible template and as `scripts/letter/render.mjs` that turns `content/inbox/week-NN/letter/{edition}-{lang}.md` front matter (destaque, numero, concelho, parceiro, pergunta) into the beehiiv HTML and a PNG preview.

## 3. Rewrite weeks 1–4

All six editions, PT, EN, FR (and the pillar topics already planned). Positive framing (EDITORIAL_POLICY rule 10), B1 plain language, no AI tells, every figure sourced, the three welcome emails rebuilt in the same design. Contact sheet PDF of all 4 weeks for the operator.

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

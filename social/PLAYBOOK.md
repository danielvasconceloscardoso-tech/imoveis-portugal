# Social playbook v1 (CEO, 26 Oct 2026)

How Imóveis Portugal writes, tags, times and designs its posts. It applies to everything in social/ and sits on top of content/VOICE.md. The operator can change any line; review it after four weeks against our own analytics.

## 1. Writing

1. **The first line is the post.** At most 8 words, with a number or a place: "One square metre in Luxembourg City. Four in Gondomar." On Instagram the hook must fit in the first 125 characters; on LinkedIn, in the first two lines.
2. **Write what a person would say out loud.** Short sentences, everyday words, contractions in English. If it sounds like a brochure, rewrite it.
3. **One idea, one number, one action** per post.
   - Actions we use: "See your area on the map", "Run your numbers", "Read the answer", "Reply with your question".
   - Never "discover", "explore", "unlock" or the other banned words.
4. **Wit in the framing, never in the numbers.**
   - Dry and warm, built on details our readers recognise: the August holidays, the flight to Porto, the parents' house, the procuração at the consulate, the franc and the real.
   - No puns for their own sake.
   - Never mock a place or a reader.
5. **Optimistic and realistic** (D35). Every obstacle comes with the answer and the partner who solves it. No promises of returns. No "luxury", "premium", "exclusive" or "private" (D52).
6. **The source is always there.** One line at the end: "Fonte / Source / Source: INE, 2.º trimestre de 2026".
7. **Three languages on Instagram and Facebook,** in this order, each block starting with its label: `PT ·`, `EN ·`, `FR ·`.
   - Each block is complete on its own; never a word-for-word translation that reads stiffly.
   - LinkedIn posts are in EN or FR, one language per post.
8. **Emojis:** none in images; at most one in a caption, and only when it adds something (a flag for the edition, for example).

**Per platform:**

| | Instagram | Facebook | LinkedIn |
| --- | --- | --- | --- |
| Length | Hook + 2–4 short lines per language | Short; community posts end with one question people can answer | 600–1,200 characters, short paragraphs |
| Link | "Link in bio" plus the exact page name | In the post | In the first comment, not in the post |
| Who it is for | Buyers and families abroad | The Portuguese diaspora, in Portuguese first | Developers, banks, advisers, wealth managers, journalists |

## 2. Hashtags

Instagram allows 5 hashtags per post and reel since December 2025, and its head says hashtags no longer add reach. They still tell the platform what a post is about. Keywords in the caption and the alt text matter more: Instagram search reads them.

1. **Instagram: 3 to 5 per post,** always one from each group:
   - brand: #ImoveisPortugal;
   - topic: #PortugalRealEstate, #ImobiliarioPortugal, #ImmobilierPortugal, #CasaEmPortugal, #BuyingInPortugal, #MovingToPortugal;
   - place: the place in the post (#Lisboa, #Porto, #Algarve, #Comporta, #Cascais, #Madeira…);
   - audience, where it fits: #PortuguesesNoLuxemburgo, #PortuguesesEmFranca, #PortuguesesNaSuica, #BrasileirosEmPortugal, #AmericansInPortugal, #ExpatsPortugal.
2. **LinkedIn: at most 3,** for example #PortugalRealEstate, #RealEstateDevelopment, #WealthManagement, chosen per post.
3. **Facebook: 0 to 2.**
4. **Never:** hashtag walls; anything with luxury or premium; tags unrelated to the post.

Claude Code checks each tag before first use (that it is active, on topic and not spam-flagged) and keeps the list in `social/hashtags.csv` with the date checked.

## 3. When we post (Europe/Paris time)

Benchmarks: Sprout Social 2026, about 2 billion engagements, times in the audience's local time.
- Instagram: best Tue–Wed 12:00–19:00, Mon 14:00–16:00, Thu 12:00–14:00; weekends weakest.
- Facebook: best Tue–Wed 12:00–20:00.
- LinkedIn: best Tue–Thu 11:00–17:00; financial services from 08:00–10:00.

Our audience spans Europe (LU, FR, CH), Israel, Brazil and the US, from one account per platform. So we use two daily slots that cover both continents.

| Slot | Paris | Lisbon | Tel Aviv | São Paulo | New York |
| --- | --- | --- | --- | --- | --- |
| A, Europe lunchtime | 12:30 | 11:30 | 13:30 | 08:30 | 06:30 |
| B, Europe evening, Americas midday | 19:00 | 18:00 | 20:00 | 15:00 | 13:00 |

| Platform | Mon–Fri | Sat–Sun |
| --- | --- | --- |
| Instagram feed | Slot A and slot B | One post at 19:00 |
| Instagram stories | 3–5 a day: 09:00, 13:00, 20:30 | 2 a day |
| Facebook | 19:00 daily; community question Tue and Wed at 13:00 | One post at 19:00 |
| LinkedIn | 09:00 (Europe, finance); one post a week at 16:00 for US readers (10:00 New York) | None |
| Newsletter | Thursday 08:00 in each edition's own time zone (beehiiv per segment) | |

After four weeks, move the slots to the "most active times" in our own Instagram and LinkedIn analytics.

## 4. Design (what the operator likes)

1. **Identity (D50, the OneMark register):**
   - white and near-black;
   - large Playfair Display headings, Manrope for everything else;
   - our deep green #2F5D50 as the only accent;
   - numbered sections, generous white space.
2. **Real photographs of real places,** full-bleed, no credit on the image. Never: keys in a hand, handshakes, smiling couples, AI people, generic beaches named after a place they aren't.
3. **Data drawn simply:**
   - squares to scale for "here vs there";
   - floor-plan outlines for "what your budget buys";
   - one clean line for ten years of prices;
   - nothing else on the slide.
4. **Carousels:**
   - 5–7 slides, at most 20 words per slide;
   - slide 1 is the headline and the number;
   - the last slide is the source and one action;
   - wordmark small, bottom left.
5. **Never:** emojis in images, gradients, 3D icons, beige or cream "AI" palettes, Bodoni and brass, heavy black capitals in the Serhant style, stock-photo credits, logos of other companies without a signed agreement.

## 5. Weekly mix (written posts and images; video comes later)

| Platform | Per week |
| --- | --- |
| Instagram feed | 12 (two a day on weekdays, one a day at weekends), rotating formats 1–9 of prompt 30 |
| Instagram stories | 25–30 (static: poll, question box, map screenshot, page link) |
| Facebook | 7–9 |
| LinkedIn | 5 |
| Reddit and Quora | 2 drafts, posted by a person |

## 6. From draft to published

1. Claude Code writes the week into social/ and makes the contact-sheet PDF in social/exports/.
2. The operator approves, or marks changes on the PDF.
3. Claude Code sets the approved posts to `status: approved` and loads them into the scheduler with the times above. Nothing with `status: draft` is ever loaded.
4. Comments and messages:
   - automated replies only from the approved reply bank (Meta automated responses);
   - a person handles the rest, about 10 minutes a day;
   - advice questions go to the matching partner.

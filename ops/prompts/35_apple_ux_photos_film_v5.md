# Prompt 35: "Passo a passo", photographs, an Apple-grade journey, and film v5

CEO, 27 Oct 2026, evening. Decision D61. Replaces prompt 34 §3–§5 (the options round) and the remaining work on film v4.

**The operator does not want to be micromanaged.** You are the CTO: decide, build, and send results as you go. Don't wait for a "go" between steps. The CEO reviews what you send. Nothing is published, sent or merged without the operator's "go". Work on `design-v2` (site) and the working branch (films). The frozen v1 stays untouched.

## 1. Rename (now)

"O seu percurso" becomes **"Passo a passo"** (EN "Step by step", FR "Pas à pas") everywhere: navigation, pages, links, metadata, e-books, posts, newsletters. Keep the old URLs as redirects.

Navigation: **Passo a passo · Mapa · Simuladores · Perguntas · Parceiros**, plus the Concierge button.

## 2. Photographs: you choose, to this standard

Replace every photograph on the site that is still a postcard, old or ordinary. You choose, without an options round: the standard is the resort look of D60 (JNcQUOI Comporta, Conrad Algarve, Six Senses).

1. **Comporta** is known for its extraordinary beaches, not rice fields: aerial white sand, turquoise water, dunes, pines, an empty beach to the horizon.
2. **Cascais:** the bay from above, turquoise water, the old town, small boats, warm light.
3. **Lisboa:** São Jorge castle and the 25 de Abril bridge at sunset, or the river in golden light from a terrace.
4. **Porto:** the Ribeira and the Dom Luís I bridge from Gaia in late-afternoon light, and at blue hour with the lights on the Douro.
5. **Algarve:** golden cliffs over a long beach and turquoise sea.
6. **Madeira:** the New Year's Eve fireworks over Funchal bay, and Ponta de São Lourenço.
7. **Golf:** a clifftop course over the Atlantic; a dune course by the sea.
8. **Remove:** the olive tree and old pool with a wall, and anything else that looks dated, cheap or random.
9. **Never:** hotel rooms, interiors, indoor pools, lighthouses, stock people facing the camera, property listings, crowds.

Sources and licences: prompt 34 §4 (free sites first; Openverse and the Google Creative Commons filter as search tools; official banks only "with permission"). Log everything in content/media/SOURCES.md. No credits on the images. If the best Madeira fireworks photo needs permission, use the best free one now and prepare the request for the operator.

## 3. The journey: Apple-grade, one click from everything

**The operator's words:** when you click the map or the other features, "it just seems a Google form"; it is not UX/UI friendly and does not feel prestigious; he wants it clean, easy to understand, "a bit like Apple does, one click away from everything, run from the Android vibe".

Rethink the clicks, the features and the aesthetics of the interactive parts:
- the "Passo a passo" journey;
- the map place card;
- the simulators;
- every form: concierge, partner request, private viewing, newsletter.

**Principles:**
1. **One thing at a time.** One question per screen, with large tappable choices (cards, segmented controls, sliders) and automatic advance. Never a long form, a grid of boxes, or a page of fields.
2. **Instant answers.** Every choice changes something visible at once: the map lights up, the number updates, the next step appears. No "submit to see".
3. **One click from everything:**
   - a translucent, blurred top bar on desktop and a bottom bar on mobile with the five sections and Concierge;
   - one search (the magnifier, and ⌘K on desktop) that jumps to any place, question, simulator or step;
   - every state is a link.
4. **Sheets, not pages.** The place card, the concierge and the requests open as smooth sheets (from the bottom on mobile, the side on desktop) over what the reader was looking at, and close back to it.
5. **Our own components.** No default browser selects, checkboxes or date pickers, no embedded form look, no Material or Android patterns (floating action buttons, ripples, heavy shadows, outlined input boxes). Accessible custom components: keyboard, screen reader, focus states.
6. **Visual system:**
   - large type scale, a lot of space;
   - soft depth (very light shadows, subtle blur);
   - 16–20 px radii on cards and sheets;
   - one thin icon set;
   - transitions of 200–300 ms with an ease-out curve;
   - nothing bounces.
7. **The map:** see prompt 36 ("the map, from 12/20 to 20/20"). It replaces this point.
8. **Simulators:** one input to start; the result as one large number; the detail on demand; save or share in one tap.
9. **Forms:**
   - the same fields, data, consent and routing as today, presented one step at a time in our style, with the consent box unticked and naming the recipient (GDPR);
   - submission stays on free tools: keep Tally behind the scenes, or a Cloudflare Worker that forwards the request. Your choice; document it in ops/ARCHITECTURE.md.
10. **Keep everything that works:** 308/308 municipalities, search, golf layer, paths without JavaScript (fallback lists), Lighthouse mobile at least 95, no layout shift.

**Send:** screen recordings of these journeys, before and after:
- start → place → budget → result → concierge;
- tap on the map → place card → "See homes here";
- one simulator;
- one partner request.

## 4. Film v5 (replaces v4)

**Keep from v4:** the snow, the candle, the wine, the laptop at night. Everything else goes, including the blurred prices and the snippets of map and forms.

**The story:** her problems, and how we solve each one. Told with the new UI (§3) rendered full-frame and animated cleanly, like an Apple product film, never as screen snippets.

| # | What happens | Her voice |
| --- | --- | --- |
| 1 | December night in New York: snow, the candle, a glass of red wine | "Every Christmas we say: next year." |
| 2 | She opens the laptop and types "how can I buy a house in Portugal" into a plain search field (our design, no Google look-alike) | "So this year, I actually asked." |
| 3 | Our site opens and the screen fills with light; "Passo a passo" | "Most of what I found was noise. This was the first thing that made sense." |
| 4 | She chooses where (the map glides; a place lights up) and her budget as a range selected with one gesture: no exact figure, nothing blurred | "We knew roughly what we could spend. We didn't know where it would take us." |
| 5 | The concierge sheet: she books a first call | "I didn't want a sales pitch. I wanted someone to explain it." |
| 6 | The first visit by video call: on her laptop, a call in our own design (no Zoom or Meet look) showing the developer's real home, walked through slowly (their photographs in 2.5D) | "Two weeks later, we were walking through our future home. From our sofa." |
| 7 | The team appears one by one, as elegant cards with roles only: lawyer, international tax adviser, bank, notary | "A lawyer. A tax adviser who knew both countries. A bank. A notary. Introduced one at a time." |
| 8 | Summer. A drone shot of a family on an Algarve or Comporta beach (small figures, no faces), then a father on a golf course at golden hour, a cigar, the sea behind (from behind or in silhouette) | "And then, one summer…" |
| 9 | Hold on the sea | "…next year finally came." |
| 10 | Black. "Imóveis Portugal". "Your buyers, wherever they live." Small: "Launching 1 December 2026" | (silence, one note) |

You may tell it in a more cinematic way, for example opening on the summer shot and cutting back to December, as long as every beat and line above is there and it runs 90–120 s. **Make one film only: Vanguard.** The home in beat 6 is Tomás Ribeiro 79. Do not start the other three (Vale do Lobo, VIC, Shalu) until the operator approves this one; their variants are decided then.

**The voice must not sound like AI:** warm, gentle, charismatic, natural breathing and pauses.
1. Try current open-source voices with commercial licences, for example:
   - Chatterbox (Resemble AI, MIT);
   - Dia (Nari Labs, Apache 2.0);
   - Sesame CSM-1B (Apache 2.0).

   Use expressive settings and line-by-line direction. Pick the most human. Check each licence on the model card and record it in the README.
2. If none passes the "would a person believe this is a real woman" test, say so plainly and recommend one of two routes, for the operator to decide:
   - a real person records the eight lines on a phone; you clean the audio;
   - a paid voice tool for one month (for example ElevenLabs Starter, which includes commercial rights). That needs the operator's go under D30.
3. Send the film with the chosen voice, plus 10-second samples of the two runners-up.

**Footage:** Pixabay and Mixkit first, then the prompt 34 §4 sources. People only from behind, in silhouette or small in a drone shot. Every licence in sponsors/demos/v5/README.md.

## Order and report

1. §1 rename and §2 photographs. Send home page screenshots.
2. Prompt 36, the map (the priority of this prompt's interactive work). Send its recordings.
3. §3 journeys (the path, simulators, forms). Send the recordings.
4. §4 film v5: the Vanguard film only, using the new map and UI. Send it and stop there.

Report briefly after each step. Don't send, publish or merge anything.

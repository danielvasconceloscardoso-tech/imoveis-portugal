# Prompt 29 — Freeze map and path v1 · demos v3 (the buyer's path to the developer, narrated) · map v2 on its own preview

CEO, 26 Oct 2026. Decisions D55–D57. This replaces the film part of prompt 28 §3 (do not render the other three v2 films). Work in this order: §1, then §2, then §3, then go back to the master run (00_MASTER_RUN.md, from prompt 23).

Nothing is published, posted, sent or merged without the operator's "go". Demos stay private, unlisted, noindex.

---

## §1 Freeze the map and the path (do this first, D55)

The operator likes the current map and the buy and sell paths. Keep that version so it can always be restored.

1. Tag the current head of the working branch `map-path-v1` and push the tag.
2. Create branch `freeze-map-path-v1` from that commit and push it. Cloudflare builds it as its own preview (expected URL: `freeze-map-path-v1-imoveis-portugal.geralportugalimoveis.workers.dev`; send the real one). Never commit to this branch.
3. Screenshots of v1, desktop 1440 px and mobile 390 px, into `ops/snapshots/map-path-v1/`:
   - home;
   - map: whole of Portugal, Lisbon selected, Gondomar selected, a budget entered;
   - every station of the buying path and of the selling path;
   - FAQ.
4. Rule from now on: on the working branch, no changes to the map, the path pages or the navigation except bug fixes. All map improvements go to §3, on a separate branch, until the operator says go.

---

## §2 Demos v3: how a buyer reaches the developer (D56, D57)

### The problem

The v2 films spend most of their time on the map. A developer's first question is different: where does my buyer come from, and how do they arrive at my homes? The page and the film must answer that, step by step, with the map as one short beat.

Vanguard is the template. Shalu, Vale do Lobo and VIC follow the same structure.

### 2a. The seven steps (page and film use the same ones)

| # | Step | What is on screen (real screens of our site, that buyer, that developer) |
| --- | --- | --- |
| 1 | Where they first meet us | Our weekly letter for their edition on a phone; one of our articles; a question typed into a plain search field. Never show Google, ChatGPT, LinkedIn or any other brand's interface or logo. Use our own design only. |
| 2 | They choose where | The map, one fly-in to the area and the three numbers. At most 6 seconds. |
| 3 | They learn the real cost | The cost simulator with their budget in their currency: taxes, fees, exchange rate (ECB rate, dated). |
| 4 | They meet the developer's homes | "Partner developers here" on the place card, then the showcase page with the real homes, photos and published prices. |
| 5 | They ask for a private viewing | The form and the qualified summary. |
| 6 | The developer receives the enquiry | The email exactly as the developer's sales team would receive it, in our own email design: From Imóveis Portugal; subject; summary lines; the brief; the team. Labelled "Sample enquiry · illustrative buyer". |
| 7 | We stay beside them until the keys | The "Your team for this purchase" panel (roles only: lawyer, bank, tax adviser, notary; names only for signed partners); viewing by video or in person; reservation; deed. |

Honesty rules:
- No audience numbers and no promises of leads.
- The buyer is illustrative and labelled as such.
- Prices are the developer's own published prices, with source and date in the README.
- No testimonials.
- "Launching 1 December 2026" appears in small type on the closing card and on the page.

### 2b. The demo page

1. Put "How a buyer reaches you" first, straight after the opening. It shows the seven steps:
   - horizontal on desktop, vertical on mobile;
   - each step has a real screenshot for that buyer and one line of copy (the narration lines below);
   - the step 6 email is shown in full.
2. Add one button, "Walk the path as this buyer". It opens the real site in demo mode (`?demo=<token>`), pre-filled with the buyer: city, currency, budget, cash or mortgage, timeline.
   - A quiet caption bar at each station gives that step's line and a small "Listen" control that plays it.
   - The walk ends on the developer's showcase and the sample enquiry.
   - Demo mode never submits a real form, never sets cookies and is noindex.
3. Move the map lower on the page. It stays as "Where your homes sit".
4. Update the one-page PDF: add the seven-step strip at the top.

### 2c. The voice: the concierge

**Register.** A calm, warm British voice that talks the way a real concierge talks to a client across a table: short sentences, everyday words, no theatre, never selling. If a person would not say a line out loud, it is wrong. The voice is original. Never name, imitate or refer to any fictional character, actor or film, in files, metadata or copy.

**Engine.** Kokoro-82M: free, Apache 2.0, commercial use allowed.
- Install: `pip install kokoro-onnx soundfile`.
- Model files: GitHub release `thewh1teagle/kokoro-onnx`, tag `model-files-v1.0` (`kokoro-v1.0.onnx`, `voices-v1.0.bin`).
- Settings: `lang="en-gb"`, `speed=0.9`.
- Voice: `{VOICE}`, chosen by the operator from the samples (default `bm_george`).
- Record engine, model and licence in `sponsors/demos/README.md`.

**Pronunciation.** Feed the engine respellings, never the written name:

| Written | Feed the engine |
| --- | --- |
| Imóveis Portugal | Ee-MOH-vaysh Portugal |
| Tomás Ribeiro | Toh-MASH Ree-BAY-roo |
| Vale do Lobo | VAH-leh doo LOH-boo |
| Gondomar | Gon-doo-MAR |
| O'rizon | Oh-ree-ZON |
| Prata | PRAH-tah |

If an open-source speech-to-text model installs, transcribe every rendered line back and re-render any line that does not read back correctly.

**Timing.** Cut the picture to the voice. Each step holds until its line ends, plus 0.6 s. Target 60 to 75 s.

**Mix.**
- Voice at −16 LUFS integrated, light high-pass, gentle compression.
- Music is optional: one quiet solo piano or string bed, about 18 dB under the voice, fading in and out. Its licence must allow commercial use without attribution (Pixabay Content License or CC0), recorded in the README.
- If no such track can be fetched, deliver voice only. Never use a synthesised pad.

**Deliverables per developer:**
- the film, clean;
- the film with burned-in captions, for muted autoplay (Manrope, small, lower third, no box);
- a `.vtt` caption file;
- the voice as `.mp3`;
- the 6-second silent loop;
- frames at every step, sent for review.

### 2d. Narration

**Vanguard** (the template):

1. A family in New York wants a home in Lisbon. This is how they find yours.
2. It starts with our letter on a Thursday morning. Or a simple question: what does it really cost to buy in Lisbon?
3. We answer with ten years of official prices, area by area.
4. They put in three and a half million dollars. We show them what that really means, with taxes, fees and the exchange rate included.
5. Then they see your homes. Tomás Ribeiro 79. Real photos, real prices.
6. When they ask to visit, you don't just get a name. You know how they'll pay, when they want to move, what they can spend, and that their tax number is sorted.
7. We bring in the lawyer, the bank and the tax adviser when they need them. So when you meet them, on video or in Lisbon, they already know the numbers.
8. Imóveis Portugal. Your buyers, wherever they live.

**Changes for the other three.** Everything not listed stays word for word.

| Demo | Line 1 | Line 2 question | Line 4 budget | Line 5 homes | Line 7 place |
| --- | --- | --- | --- | --- | --- |
| Vale do Lobo | A family in California wants a home on the Algarve coast. | …to buy in the Algarve? | four million dollars | The Residences at Vale do Lobo. | on video or in the Algarve |
| Shalu | A family in Tel Aviv wants a home near Porto. | …to buy near Porto? | three million shekels | O'rizon Living, in Gondomar. | on video or in Porto |
| VIC Properties | A family in Geneva wants a home by the river in Lisbon. | …to buy in Lisbon? | two million Swiss francs | Prata Riverside Village. | on video or in Lisbon |

The copy is final. If a line breaks a VOICE.md rule or a legal rule, flag it rather than rewriting it.

---

## §3 Map v2: on branch `map-v2`, with its own preview (D55)

Only add. Everything v1 has stays exactly as it is: all 308 municipalities clickable, search, parishes, the single budget field, the place card, the embed and "Powered by Imóveis Portugal".

**1. The coast in photographs.** Real photographs of the Portuguese coast in the opening view and in the place cards of coastal places. Start with:
- North and Centre: Viana do Castelo, Porto (Foz), Matosinhos, Aveiro (Costa Nova), Figueira da Foz, Nazaré, Peniche.
- Lisbon area: Ericeira (Mafra), Cascais, the Sintra coast, Sesimbra and Arrábida.
- Alentejo: Comporta and Melides (Grândola), Vila Nova de Milfontes (Odemira).
- Algarve: Aljezur, Lagos, Carvoeiro (Lagoa), Quinta do Lago and Vale do Lobo (Loulé), Tavira.
- Islands: Funchal, Ponta Delgada.

Rules for the photographs:
- Each photo must show the place it is named for. Check the source's title, description and location. If in doubt, leave it out.
- Licence: Unsplash or Pexels (commercial use, no attribution required). No credit on the image; list every photo in `/credits` and in `content/media/SOURCES.md`.
- Serve AVIF/WebP in three sizes, lazy-loaded.
- Desktop: thumbnail on hover, photo header when a place is selected. Mobile: photo header on tap.

**2. Coastal opening.** On a visitor's first visit, an optional slow camera glide down the coast from Viana to the Algarve, 8 to 10 s.
- It stops at the first touch or scroll, and plays once per visitor.
- It is skipped when the visitor's device asks for reduced motion.

**3. Time slider, 2016 to the latest quarter.** A play button; heights and colours change year by year, and the place-card chart follows the slider.

**4. Filter chips:** Coast · City · Countryside · Islands. "Coast" means the municipality touches the coastline in OpenStreetMap data.

**5. Compare two places** side by side: price, 10-year change, rent, gross yield.

**Acceptance:**
- v2 must be at least as fast as v1. Report both in one table: Lighthouse mobile performance, LCP, JavaScript size, and frame rate on a mid-range phone profile.
- No paid tool.

**Report back:**
- the two preview links, v1 frozen and v2;
- screenshots of the same states in both versions;
- the speed table.

The operator compares them. `map-v2` merges into the working branch only after his "go". If he prefers v1, v2 stays a branch.

---

## Allowlist

Lines added to `ops/NETWORK_ALLOWLIST.txt` for this prompt:
- `unsplash.com`, `*.unsplash.com`
- `pexels.com`, `*.pexels.com`
- `pixabay.com`, `*.pixabay.com`
- `objects.githubusercontent.com`, `release-assets.githubusercontent.com`

## Report back

- After §1: the freeze preview link and the screenshots.
- After §2: the four demo links, the films, and frames at every step.
- After §3: the two map links and the speed table.

Keep it short. Do not merge, send or post anything.

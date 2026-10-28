# Demo film v5, the Vanguard film (prompt 35 §4, D61)

Status, 28 Oct 2026: **draft for the operator and the CEO, not sent to Vanguard.** The Vale do Lobo, VIC and Shalu films are not started; they wait for the operator's go on this one.

`ImoveisPortugal_Demo_Vanguard_Tomas-Ribeiro-79_v5.mp4` (clean) and `…_v5_captioned.mp4` (captions burned in), with `…_v5.vtt`. 1920×1080 at 2.39:1, 24 fps, H.264 and AAC, about 105 s, mixed to −16 LUFS. Built with `scripts/demos/v5/` (`ui.mjs` and `stage.html` for the interface, `film5.py` for picture and sound, `../v4/encode.sh` for the files).

## The story (10 beats, her lines)

| # | Picture | Her voice |
| --- | --- | --- |
| 1 | New York, December night: snow, the pour, the candle | "Every Christmas we say: next year." |
| 2 | Her hands at the laptop; a plain search field in our design: "how can I buy a house in Portugal" | "So this year, I actually asked." |
| 3 | The screen fills with light; "Step by step": Buy, then her country | "Most of what I found was noise. This was the first thing that made sense." |
| 4 | The map: the arrival over the Atlantic, Lisboa lights up, her budget opens as a range with one gesture (no figure anywhere, nothing blurred) | "We knew roughly what we could spend. We didn't know where it would take us." |
| 5 | The concierge sheet over the map: a time for the call, send, "A dedicated adviser is taking care of your request" | "I didn't want a sales pitch. I wanted someone to explain it." |
| 6 | The first viewing by video in our own design: Tomás Ribeiro 79, living room, terrace, kitchen, in 2.5D | "Two weeks later, we were walking through our future home. From our sofa." |
| 7 | The team, one card at a time, roles only: lawyer, international tax adviser, bank, notary | "A lawyer. A tax adviser who knew both countries. A bank. A notary. Introduced one at a time." |
| 8 | Summer: a family on the beach from above (small figures); a course on a headland by the sea; a cigar being lit; the father from behind, before the sea at sunset | "And then, one summer…" |
| 9 | Hold on the sea | "…next year finally came." |
| 10 | Black: "Imóveis Portugal", "Your buyers, wherever they live.", small "Launching 1 December 2026", one piano note | (silence, one note) |

An "Illustrative buyer journey" line opens the film, as in v4: she is not a real client.

## The voice: none of the open-source voices passes; a decision for the operator

Prompt 35 §4: the voice must not sound like AI. Three open-source voices with commercial licences were tried on CPU, line by line, with expressive settings (scripts and measurements in the session notes):

| Model | Licence | Result |
| --- | --- | --- |
| Chatterbox (Resemble AI) | MIT, https://github.com/resemble-ai/chatterbox/blob/master/LICENSE | Every word right, steady voice; but too fast by default (slowed to 0.82×), a low pitch that may not read clearly as a woman in her late thirties, and a read-aloud cadence. Adds Resemble's inaudible watermark. **Used in this draft as a placeholder.** |
| Dia-1.6B (Nari Labs) | Apache 2.0, https://huggingface.co/nari-labs/Dia-1.6B-0626 | The most natural female timbre, but it drops and changes words ("one side" for "one summer"), drifts in pitch from line to line, and is unstable between takes. Not usable as delivered. 10 s sample attached. |
| Sesame CSM-1B | Apache 2.0, https://huggingface.co/sesame/csm-1b | Not run: the model is gated on Hugging Face (log-in and acceptance of terms). Not worked around. |

**Plainly: none would pass "would a person believe this is a real woman".** The two routes, for the operator to decide:

1. **A real person records the nine lines on a phone** (quiet room, close to the mouth, three takes each); we clean the audio and lay it on this cut. Free; best result. A short written consent and a release for commercial use from the speaker are needed.
2. **A paid voice tool for one month** (for example ElevenLabs Starter, which includes commercial rights). Needs the operator's go under D30 (no paid tool before revenue).

Whatever is chosen, a synthetic voice must not be presented as a real buyer's testimony (consumer law; Dia's terms also forbid deceptive use): the film already says "Illustrative buyer journey".

## Gaps in the footage (for the CEO)

- **The father on a golf course at golden hour with a cigar** does not exist on Mixkit or Pixabay (all 73 Pixabay golf videos checked). The moment is built from three licensed clips: a course on a headland by the sea (aerial), a cigar being lit (hand only) and a man seen from behind before the sea at sunset (not on a course). The only golfer seen from behind on Pixabay is at midday with a suburban house behind him, so it was left out. A commissioned shot would be better.
- **The family on the beach** is the best drone shot found (Mixkit 27015, 720p only; small figures, no faces); the water is graded toward turquoise. No licensed Comporta footage was found.

## Sources and licences

Mixkit licence (free for commercial use, no attribution required): https://mixkit.co/license/. Pixabay Content License (free for commercial use, no attribution required): https://pixabay.com/service/license-summary/.

| Used in | Source | Licence |
| --- | --- | --- |
| 1, the city | Mixkit 4330, "New York buildings at night, pan shot" | Mixkit |
| 1, the snow | Mixkit 8459, snow falling (blended over the city) | Mixkit |
| 1, the pour | Mixkit 22733, "Pouring red wine in a glass seen on a black background" | Mixkit |
| 1, the candle | Mixkit 48919, "Candle flame on black background, closeup" | Mixkit |
| 2, the hands | Mixkit 17450, "Working on a laptop at night" | Mixkit |
| 2-7, the interface | our site (design-v2 build, English, US edition) and the film's own scenes in our design (`stage.html`); map data: INE, © OpenStreetMap contributors (ODbL), Terrain Tiles (AWS Open Data), NASA Black Marble | ours, with the map's data credits |
| 6, the home | Vanguard Properties, photographs of Tomás Ribeiro 79 as published (https://www.vangproperties.com/en/lisbon-portugal-real-estate/tomas-ribeiro-79/), in 2.5D with Depth Anything V2 Small (Apache 2.0) | the developer's own, shown to the developer |
| 8, the beach | Mixkit 27015, "Family enjoying the seashore, aerial shot" | Mixkit |
| 8, the course by the sea | Pixabay video 130578 by bellergy | Pixabay |
| 8, the father by the sea | Pixabay video 222039 by TonyDias7 (from behind, sunset) | Pixabay |
| 8, the cigar | Pixabay video 38618 by Ernest_Roy (hand only) | Pixabay |
| 9, the sea | Mixkit 50154, "Sunset at sea in a panoramic view" | Mixkit |
| Music | Chopin, Nocturne in C minor, B. 108, Musopen recording on archive.org (parso-0376f076666a403745bbb1c79277856a9f5ef9d4), as in v4 | CC0 |
| City, through the window | Radio Aporee, "724 8th Ave, New York, NY 10036, USA - cold winter", recorded by doejohn, 29 Aug 2021, archive.org aporee_58062_66563 | Public Domain Mark 1.0 |
| Sea and gulls | Radio Aporee, "Costa da Caparica, Portugal - Waves and seagulls on the beach close to Lisbon", Felix BLUME, 2 May 2019, archive.org aporee_44160_50230 | Public Domain Mark 1.0 |
| Wind, room tone, the pour, typing, a key | Mixkit sound effects 1175, 3080, 1324, 2532, 2541 | Mixkit |
| Her voice (placeholder) | Chatterbox, default voice | MIT |

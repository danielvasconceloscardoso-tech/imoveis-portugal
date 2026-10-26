# Prompt 31: demo films v4, "December" (cinematic)

CEO, 26 Oct 2026. Decision D58. This replaces the v3 films; move them to `sponsors/demos/archive/v3/`. The demo pages, the seven steps and the fixes already sent stay as they are: numbers that agree, no agency button in demo mode, readable screens.

Nothing is sent, published or merged without the operator's "go". Demos stay private, unlisted, noindex.

## The brief

1. **A short film, not a product tour.** A family at home in winter decides to buy a home in Portugal. The site appears naturally inside their evening.
2. **References:**
   - *Shutter Island:* storm, rain, mood;
   - Nolan: the cold open from the future, the cross-cut between two cities, the match cut back to the start;
   - Scorsese: her inner voice;
   - *The Sopranos:* small domestic moments carrying weight, and the hard cut to black.
3. **Slow:**
   - 100 to 120 seconds;
   - shots of 6 to 8 seconds;
   - at least three holds of 5 seconds or more with no voice.
4. **Discreet about money.** The budget is never spoken, and no amount is ever readable on screen. Labels are sharp; figures stay out of focus. The buyer's wealth shows only in the calm.
5. **No faces.** Hands, backs, silhouettes, reflections. No AI-generated people or video.

## How it is made (free tools only)

1. **Exteriors and textures:** licensed stock clips. Pexels or Pixabay licence; Wikimedia only with the credit in the README.
   - Examples: snow on a New York street with Christmas lights in windows; rain streaking a window; Geneva in snow; a sunlit Lisbon terrace.
   - Each clip must show the city it is named for. No logos, no recognisable faces.
2. **Interior:** stock clips of hands, a candle, a wine glass and a laptop, all without faces. If no clip fits, build the shot as a 3D scene in Three.js (laptop, glass, window with snow, warm lamp) and render it frame by frame.
3. **The site:**
   - Record the real site in demo mode at 60 fps, with slow, eased cursor moves.
   - Composite it into the laptop screen with perspective, plus a faint reflection of the window and the snow over it.
   - Pass through the screen into the page once, when the site first lights up.
4. **The developer's photographs** come alive in 2.5D:
   - depth map from Depth Anything V2 Small (Apache 2.0, Hugging Face), then slow parallax and a light sweep;
   - never alter what the photo shows.
5. **Picture:**
   - 24 fps, 1920×1080 with a 2.39:1 letterbox;
   - night scenes cool teal with deep blacks, subtle 35 mm grain and soft halation on lights;
   - Portugal scenes warm and golden;
   - the same grade on every clip.
6. **Sound:**
   - room tone, weather, the pour, glass on wood, the laptop, a distant siren;
   - a Christmas song from a TV in another room (a public-domain composition in a licensed recording);
   - in Lisbon, a tram bell and gulls.
7. **Music:**
   - sparse piano and low strings, from Musopen public-domain recordings or the Pixabay licence; never a synthesised pad;
   - it builds in act II, holds one note in the cross-cut and stops dead at the cut to black;
   - record every licence in the README.
8. **Voices (Kokoro):**
   - her: `af_heart` for the US films, `bf_emma` for Geneva and Tel Aviv; speed 0.85, close and quiet;
   - the partner, off-screen: `am_michael` (US) or `bm_george`, muffled through a wall (low-pass, a little room).
9. **Deliverables:** clean and captioned versions, `.vtt`, and frames of every shot.

## Screenplay: Vanguard, New York

| # | Picture | Sound | Voice |
| --- | --- | --- | --- |
| 0 | Cold open, the future. A Lisbon terrace in morning sun; a wine glass on a stone table; the light moves across it. 4 s. Hard cut to black. Small grey type in a corner: "Illustrative buyer journey". | Gulls far off, a tram bell. Silence on the cut. | |
| 1 | New York at night, snow falling, Christmas lights in windows. Small white type: "New York. December 23". | Wind, the city muffled by snow, a distant siren. Low strings enter. | |
| 2 | Inside, warm. Snow and rain streak the window, the city blurred behind. Slow pull back: a table, a candle, a hand filling a wine glass. | The pour, the glass set down on wood. The family muffled in another room; a Christmas song on a TV far away. | HER: "Every Christmas we say: next year." |
| 3 | Her hand opens a laptop. The screen's light falls on the glass and shows in the window. | The laptop opening. Strings hold. | HER: "This time I opened the laptop." |
| 4 | The site fades up and the camera passes through the screen into it. The map glides slowly along the coast and settles on Lisbon. The snow's reflection drifts over the screen. | One piano line opens up. | HER: "Somewhere with light." |
| 5 | The budget field. A hand on the trackpad; the figure is never readable. The map answers by lighting the places that fit. | | HER: "We'd already agreed on a number. That was the easy part." |
| 6 | The cost simulator. Labels sharp ("Transfer tax", "Stamp duty", "Deed and registration", "Total, taxes included"); every figure soft. | | HER: "It was everything else we didn't know." |
| 7 | The guide for US buyers; the FAQ answer, readable: viewings by video, a power of attorney for the signing. | | HER: "And whether we could do it from here." |
| 8 | On the area card, "Partner developers here" lights up. The showcase: Tomás Ribeiro 79. One photograph fills the frame and comes alive. Hold 6–8 s. | The room tone falls away; the music breathes. | (silence) HER: "That one." |
| 9 | "Arrange a private viewing", video viewing selected. The summary assembles: words sharp ("Cash buyer", "Ready within 3 months", "Viewing by video first"), figures soft. Send. | A soft click. | HER: "Okay." |
| 10 | Cross-cut. Lisbon, morning sun on a façade. Small type: "Lisbon. 9:00 am". Vanguard's inbox: the request opens, its subject sharp: "Private viewing request · Tomás Ribeiro 79". | A street in the morning, a tram bell. The music holds one note. | |
| 11 | New York. Her hand closes the laptop halfway; the glow stays on the glass. | PARTNER (off-screen, through the wall): "You coming?" HER: "In a minute." | |
| 12 | The window. The snow keeps falling. Hold. Hard cut to black. | Everything stops. Two seconds of silence. | |
| 13 | Out of black: the terrace from the cold open, the same glass, in sunlight. 3 s. Then "Imóveis Portugal", below it "Your buyers, wherever they live.", then small: "Launching 1 December 2026". | One last piano note. | |

## The other three

Everything not listed stays exactly as for Vanguard.

| Demo | City and weather (shots 1–2, 11–12) | Holiday | Shot 2 line | Shot 4 line | Shot 4 settles on | Shots 8 and 10 |
| --- | --- | --- | --- | --- | --- | --- |
| VIC Properties | Geneva, December 23: snow, the lake at night, a tram | Christmas lights, no brands | as Vanguard | "Somewhere with light." | Lisbon, the riverside | Prata Riverside Village; Lisbon, 9:00 am |
| Vale do Lobo | Los Angeles, December 23: a winter storm, rain on palm trees, porch lights | Christmas | as Vanguard | "Somewhere slower." | the Algarve, Loulé | The Residences at Vale do Lobo; the Algarve, 9:00 am |
| Shalu | Tel Aviv in December: winter rain over the seafront at night | none: no holiday symbols | "Every winter we say: next year." | "Somewhere green." | Porto, Gondomar | O'rizon Living; Porto, 9:00 am |

Guide in shot 7: the guide for the buyer's country.

## Order of work

1. **Vanguard storyboard first:** one still per shot (14 frames) and 20 seconds of the grade and sound for shots 1–3. Send it and wait for the go.
2. **After the go:** render Vanguard and send it. Then, after the next go, the other three.
3. **Report:** the film, its frames, and every clip and track with its licence. Do not send, publish or merge anything.

## Allowlist

`musopen.org`, `*.musopen.org` (public-domain music recordings). Everything else was added on 26 Oct.

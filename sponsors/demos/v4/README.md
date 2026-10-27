# Demo films v4, "December" (prompt 31, D58)

Status, 26 Oct 2026:
- Vanguard storyboard approved by the CEO with three changes.
  - Shots 0 and 13: real licensed footage of a sunlit Lisbon terrace with a wine glass, not the 3D terrace.
  - Shots 2, 3 and 11: real footage for the pour, the candle and the hands. 3D only for the laptop screen if no clip fits.
  - Shot 7: "Talk to a partner" hidden in demo mode. Done.
- The other three films follow the Vanguard film.

## The Vanguard film (27 Oct 2026)

`ImoveisPortugal_Demo_Vanguard_Tomas-Ribeiro-79_v4.mp4` (clean) and `ImoveisPortugal_Demo_Vanguard_Tomas-Ribeiro-79_v4_captioned.mp4` (captions burned in), with `ImoveisPortugal_Demo_Vanguard_Tomas-Ribeiro-79_v4.vtt`, 1920×1080 at 2.39:1, 24 fps, H.264 and AAC, 101 s, mixed to −16 LUFS. One frame per shot: `vanguard-shots.jpg`. Built with `film.py` (picture), `sound4.py` (sound and captions), `encode.sh` (the two MP4s), `mapframes.mjs` and `screens.mjs` (the site in demo mode).

Gaps, each to replace when a valid Pixabay key or a matching clip is found (task 31b):
- **Shots 0 and 13:** no licensed clip of a Lisbon terrace exists on Mixkit. The film uses a glass in warm light (clip 9899) with no city named; the drink is amber, not wine.
- **Strings:** no public-domain strings recording could be downloaded (Musopen blocks scripts, Wikimedia is rate-limited here); the music is the piano alone.
- **Pixabay:** the key given on 27 Oct returns "invalid or missing API key" (it looks truncated). **Freesound:** the API answers 403 from this environment. Sound effects come from Mixkit instead, ambiences from Radio Aporee.

## Engine (scripts/demos/v4/)

| File | What it does |
| --- | --- |
| scene.html, render.mjs | Three.js scenes rendered frame by frame at 1920×803 (2.39:1): the laptop and its screen, the window |
| screens.mjs | The real site in demo mode at 1280 px CSS width, every figure out of focus, labels sharp |
| plate.py, depth.py | Photographs in 2.5D: Depth Anything V2 Small (Apache 2.0) depth, slow push-in, snow at three distances |
| grade.py | One grade for every clip: teal night with deep blacks, warm Portugal, halation, 35 mm grain, letterbox |
| storyboard.py | One graded still per shot and the contact sheet |
| test20.py | Shots 1 to 3, 20 seconds, for the grade and sound test |
| voice4.py | Her lines and the partner's with Kokoro (af_heart / bf_emma, am_michael / bm_george), each read back by Whisper |

Lines: content/demos/screenplay_v4.json. The budget is never spoken and no amount is readable on screen.

## Sources and licences

Mixkit licence (free for commercial use, no attribution required): https://mixkit.co/license/. Files are fetched from `https://assets.mixkit.co/videos/<id>/<id>-1080.mp4` and `https://assets.mixkit.co/active_storage/sfx/<id>/<id>.wav`.

| Used in | Source | Licence |
| --- | --- | --- |
| Shots 0 and 13, the glass | Mixkit clip 9899, a glass of amber drink in warm light | Mixkit licence |
| Shot 1, the city | Mixkit clip 4330, "New York buildings at night, pan shot" (seconds 0.5 to 7.5, before a shop sign appears) | Mixkit licence |
| Shots 1 and 12, the snow | Mixkit clips 8459 (snow falling) and 27377 (snowstorm), blended over the picture | Mixkit licence |
| Shots 2 and 12, the window | Mixkit clip 21144, rain on a window at night | Mixkit licence |
| Shot 2, the pour | Mixkit clip 22733, "Pouring red wine in a glass seen on a black background" | Mixkit licence |
| Shot 3, the candle | Mixkit clip 48919, "Candle flame on black background, closeup" | Mixkit licence |
| Shot 11, the candle | Mixkit clip 17305, "Red candle burning in a dark room" | Mixkit licence |
| Shots 3 and 11, the hands | Mixkit clip 17450, "Working on a laptop at night" | Mixkit licence |
| Shot 10, the Lisbon morning | Mixkit clip 21748, "Cable cars in Lisbon" | Mixkit licence |
| Shots 4 and 5, the map | our site in demo mode (MapLibre; boundaries OpenStreetMap, ODbL; prices INE) | ours, with the map's data credits |
| Shots 6, 7, 9, 10, the screens | our site in demo mode, figures out of focus | ours |
| Shot 8, the living room | Vanguard Properties, render of Tomás Ribeiro 79, as published | the developer's own, shown to the developer |
| Wind | Mixkit sound effect 1175, "Winter wind loop" | Mixkit licence |
| Siren, far off | Mixkit sound effect 1650, "Ambulance siren passing by" | Mixkit licence |
| Room tone | Mixkit sound effect 3080, "Cinematic room tone" | Mixkit licence |
| Rain on the glass | Mixkit sound effect 1248, "Heavy rain on car glass interior" | Mixkit licence |
| The pour | Mixkit sound effect 1324, "Pouring water to glass" (slowed) | Mixkit licence |
| A key, Send | Mixkit sound effect 2541, "Single key press in a laptop" | Mixkit licence |
| Typing | Mixkit sound effect 2532, "Slow typing on a keyboard" | Mixkit licence |
| The tram | Mixkit sound effect 3019, "Slow tram passing" | Mixkit licence |
| Birds, the morning | Mixkit sound effect 2472, "Morning birds" | Mixkit licence |
| New York street, through the window | Radio Aporee, "724 8th Ave, New York, NY 10036, USA - cold winter", recorded by doejohn, 29 Aug 2021, archive.org aporee_58062_66563 | Public Domain Mark 1.0 |
| Lisbon street, the morning | Radio Aporee, "Lisbon, Rua do Salvador - in front of cafe do electrico", recorded by maciej janasik, 26 Sep 2013, archive.org aporee_19882_23134 | Public Domain Mark 1.0 |
| Sea and gulls, the terrace | Radio Aporee, "Costa da Caparica, Portugal - Waves and seagulls on the beach close to Lisbon", recorded by Felix BLUME, 2 May 2019, archive.org aporee_44160_50230 | Public Domain Mark 1.0 |
| Piano | Chopin, Nocturne in C minor, B. 108, Musopen recording on archive.org (parso-0376f076666a403745bbb1c79277856a9f5ef9d4) | CC0 |
| The carol on the TV | Westbrook Conservatory Entertainers, "Silent Night", Paramount 3197, October 1929, archive.org (WestbrookConservatoryEntertainers-SilentNight_323) | public domain |
| Voices | Kokoro-82M (kokoro-onnx), voices af_heart and am_michael, read back by Whisper | Apache 2.0 |
| Depth for shot 8 | Depth Anything V2 Small, ONNX weights by onnx-community | Apache 2.0 |
| Type | Playfair Display, Manrope | SIL Open Font License |

No Freesound or Pixabay material is in this film. No sound or clip under a non-commercial licence is used.

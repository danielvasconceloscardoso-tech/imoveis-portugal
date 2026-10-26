# Demo films v4, "December" (prompt 31, D58)

Status, 26 Oct 2026:
- Vanguard storyboard approved by the CEO with three changes.
  - Shots 0 and 13: real licensed footage of a sunlit Lisbon terrace with a wine glass, not the 3D terrace.
  - Shots 2, 3 and 11: real footage for the pour, the candle and the hands. 3D only for the laptop screen if no clip fits.
  - Shot 7: "Talk to a partner" hidden in demo mode. Done.
- The other three films follow the Vanguard film.

## Waiting on the operator (task 31b)

27 Oct: the Pixabay and Freesound keys are not visible to the session that started before they were added (environment variables load at session start), and the network policy refuses mixkit.co. Musopen's own site answers scripts with a Cloudflare challenge; archive.org works and carries Musopen's public-domain recordings.


The licensed clips come from Pexels or Pixabay, whose APIs need a free key. Neither key is in this environment yet, and pexels.com refuses this machine's requests without one. Musopen and archive.org are on the repo allowlist but not yet allowed in the environment. The Vanguard film renders as soon as `PEXELS_API_KEY` or `PIXABAY_API_KEY` is set.

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

## Sources and licences so far

| Used in | Source | Licence |
| --- | --- | --- |
| Shot 1 and the city behind the window | Billie Grace Ward, "Snowy Night", Wikimedia Commons (File:Snowy_Night_(42288909815).jpg) | CC BY 2.0, credit required (this line) |
| Shots 8 and 10 | Vanguard Properties, renders of Tomás Ribeiro 79, as published | the developer's own, shown to the developer |
| Screens | our site in demo mode | ours |
| Voice | Kokoro-82M (kokoro-onnx) | Apache 2.0 |
| Depth | Depth Anything V2 Small, ONNX weights by onnx-community | Apache 2.0 |
| Piano | Chopin, Nocturne in C minor, B. 108, Musopen recording on archive.org (parso-0376f076666a403745bbb1c79277856a9f5ef9d4) | CC0 |
| Strings, planned | Musopen String Quartet, Mendelssohn Op. 80, III Adagio (Wikimedia Commons) | public domain (Musopen) |
| Christmas song on the TV | Westbrook Conservatory Entertainers, "Silent Night", Paramount 3197, October 1929, archive.org (WestbrookConservatoryEntertainers-SilentNight_323) | public domain |
| Siren, planned | "American police siren i.ogg", pdsounds.org via Wikimedia Commons | public domain |

The Wikimedia downloads are slowed by rate limits on this machine's shared address. They are retried in the background.

# Social: one folder per platform

Everything here is a draft until the operator says "go" (hard rule 2). Nothing in this repo posts automatically. Rules: ops/prompts/30_content_engine_newsletter_social.md, content/VOICE.md, content/EDITORIAL_POLICY.md.

| Folder | What goes in it |
| --- | --- |
| instagram/posts/ | Feed posts: carousels and single data cards |
| instagram/reels/ | Reels: script, cover, captions, the MP4 |
| instagram/stories/ | Stories, one folder per day |
| facebook/ | Facebook posts (reuse Instagram images by path, add the community posts) |
| linkedin/ | LinkedIn posts and monthly document carousels |
| reddit/ | Answers drafted for a person to post |
| quora/ | Answers drafted for a person to post |
| exports/ | Per week: contact-sheet PDF, Meta Business Suite CSV, LinkedIn schedule sheet |

## Naming

`{platform folder}/week-NN/{YYYY-MM-DD}_{NN}_{slug}/`, for example `instagram/posts/week-04/2026-12-01_01_here-vs-there/`. The `NN` is the posting order that day.

Inside each item folder:
- `post.md` (`reel.md` for reels, `stories.md` for a day of stories);
- the images, `slide-01.png`, `slide-02.png`… (or `card.png`);
- for reels, `cover.png`, `reel.mp4` (kept under 8 MB) and `captions.vtt`;
- for LinkedIn documents, `document.pdf`.

Facebook items may point to Instagram images instead of copying them.

## Front matter for every post.md

```
platform: instagram | facebook | linkedin | reddit | quora
format: here-vs-there | budget-buys | then-and-now | ten-years | cost-sheet | myth-vs-law | one-number | postcard | reader-question | map-reel | community
week: 4
date: 2026-12-01
order: 1
keyword: "buying a house in portugal from luxembourg"
link: https://…?utm_source=instagram&utm_medium=social&utm_campaign=w04-here-vs-there
sources: [ine-m2-2026q2, lu-m2-2026q2]
sponsored: false
status: draft
```

Then the caption in PT, EN and FR (LinkedIn: EN or FR), the alt text, the hashtags, and the source line.

Reddit and Quora files also carry `community:`, the thread or question URL and a note that the community's self-promotion rules were checked.

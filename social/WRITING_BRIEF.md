# Writing brief for weeks 1–4: social posts (prompt 30, CTO, 27 Oct 2026)

For whoever writes a week of social posts. Read first, in this order: social/PLAYBOOK.md (it overrides the rest),
social/README.md, content/VOICE.md, content/EDITORIAL_POLICY.md, ops/prompts/30_content_engine_newsletter_social.md
§2–§4, the calendar at the end of content/SEO_ENGINE.md, content/inbox/WRITING_BRIEF.md (hard rules 1–9 and the
link table apply here too), and the eight samples in social/instagram/posts/week-04/ with scripts/social/samples.py
(the register and the file format to match). The week's pillar page and newsletters are being written in
content/inbox/week-NN/ at the same time; read them if they exist, but do not wait for them.

## The week, file by file (dates in the folder names; times are Paris time, PLAYBOOK §3)

1. **Instagram feed, 12 posts:** Mon–Fri two a day (order 01 at 12:30, order 02 at 19:00), Sat and Sun one at 19:00.
   `social/instagram/posts/week-NN/{YYYY-MM-DD}_{NN}_{slug}/post.md` + `spec.json`.
   - Rotate the formats 1–9 of prompt 30 §3 (here-vs-there, budget-buys, then-and-now, ten-years, cost-sheet, myth-vs-law, one-number, postcard, reader-question); at least three of the twelve are carousels of 5–7 slides (PLAYBOOK §4.4: at most 20 words a slide, slide 1 the headline and the number, last slide the source and the one action).
   - spec.json is `{ "pt": spec, "en": spec, "fr": spec }`. A single card's spec is one of the formats in design/social/templates/post.html with the fields the samples use. A carousel's spec is `{ "source": "…", "slides": [spec, spec, …] }`, slides using any card format plus `text` (kicker, h, optional big, optional body, optional dark: true) and `end` (kicker, h = the action, body = the page it opens). Reader-question: `{ format: "reader-question", kicker, q, a, source }`.
   - Postcard photographs: only these, and only for the place they show: design/directions/photos/lisboa-*.jpg (Lisbon), porto-*.jpg (Porto), madeira-funchal.jpg (Funchal, Madeira). Path in spec: `/design/directions/photos/<file>`. No other photo.
   - post.md front matter as in the samples, plus `time: "12:30"` or `"19:00"`, and `slides: 6` for a carousel. Captions `PT ·`, `EN ·`, `FR ·`, each complete on its own; the first line is the hook (≤ 8 words, a number or a place); one action ("link in bio" plus the exact page name). Source line, 3–5 hashtags (one brand, one topic, one place, one audience where it fits, from PLAYBOOK §2 only), `Alt text:` carrying the target phrase. Link with `utm_source=instagram&utm_medium=social&utm_campaign=wNN-{slug}`.
2. **Instagram stories, every day:** weekdays 3–5 frames (09:00, 13:00, 20:30, and up to two more), weekends 2; about 25 in the week. `social/instagram/stories/week-NN/{YYYY-MM-DD}/stories.md` + `spec.json`.
   - spec.json is `{ "frames": [ { "pt": spec, "en": spec, "fr": spec }, … ] }`, each spec `story-text` (kicker, h, optional big, body, source, optional dark) or `story-card` (kicker, img = the path of a feed card PNG of the same week, e.g. `/social/instagram/posts/week-NN/<folder>/card-pt.png` or `slide-01-pt.png`; the image is drawn later, so use the exact folder and file names you write).
   - Kinds to mix: a poll, a question box, a feed post shared to the story, a page link (link sticker). The text leaves room: stickers are added in the app, so stories.md says for each frame the time, which language to post (rotate PT, EN, FR across the day), the sticker and its exact wording (poll options, question-box prompt, link URL with `utm_source=instagram&utm_medium=story&utm_campaign=wNN-…`) and an alt text.
   - stories.md front matter: platform: instagram, format: stories, week, date, keyword, link (the day's main link with UTM), sources, status: draft.
3. **Facebook, 7–9 posts:** one a day at 19:00, reusing the day's Instagram image by path (`image: ../../../instagram/posts/week-NN/<folder>/card-pt.png` (relative to the Facebook post folder), or the carousel's slides), with its own shorter text and the link in the post (`utm_source=facebook`); plus community posts on Tuesday and Wednesday at 13:00, Portuguese first, for the diaspora, ending with one question people can answer in the comments (a real, useful question, never bait). `social/facebook/week-NN/{YYYY-MM-DD}_{NN}_{slug}/post.md`, format `community` for the community posts. 0–2 hashtags. Alt text for every image post (community posts without an image say `Alt text: no image, text post.` … plus 40 characters of description of what the post is about).
4. **LinkedIn, 5 posts:** Mon–Fri at 09:00, except one at 16:00 (10:00 New York) for US readers. EN or FR, one language per post (about three EN, two FR). 600–1,200 characters, short paragraphs, the hook in the first two lines, data-led, written for developers, banks, advisers, wealth managers and journalists; it shows what our readers ask and what the official numbers say (never an audience figure: we have none yet). Link in the first comment (`first_comment:` in front matter, `utm_source=linkedin`), at most 3 hashtags. `social/linkedin/week-NN/{YYYY-MM-DD}_{NN}_{slug}/post.md` + `spec.json` with one language key (the post's language) and a card or slides as on Instagram; it is drawn at 1200×1500. **Week 4 only:** one of the five is the month's document carousel: spec.json `{ "document": true, "en": { "source": "…", "slides": [ 7–9 slides ] } }`, written for the same professional readers.
5. **Reddit and Quora, 2 drafts:** one each. `social/reddit/week-NN/{slug}/post.md` and `social/quora/week-NN/{slug}/post.md`. Front matter: platform, format: reader-question, week, date, keyword, community (subreddit or Quora topic), thread (the question as people ask it; "to find" if a matching thread must be found when posting), rules_checked: "not verified: reddit.com and quora.com are blocked from the build environment; the person posting reads the community rules first", link (optional, only if the rules allow, with UTM), sources, status: draft. The body is a full answer that stands on its own (250–450 words), written as a knowledgeable person, no marketing, with the official sources named, and a last line for the person posting: "Affiliation: stated in the profile." Include a `Source:` line.

## Rules on top of the playbook

- Weeks 1–3 are before the launch: the site is live, the newsletter's first issue is Thursday 3 December, so actions are "Subscribe: link in bio" or the pillar's page; say "from 1 December" where the launch matters. Week 4 is the launch week.
- Every figure from content/facts/facts.csv or site/public/data/prices.json, computed with Python; every post lists its fact ids in `sources:`. D34: no single town as the punchline; comparisons use Lisbon, Porto, Cascais, Comporta (Grândola, municipality median), Algarve (Loulé), Madeira (Funchal). Foreign prices only lu-m2-2026q2, fr-m2-2026q3, ch-ge-m2-2024 with their method line.
- Any mention of the agency carries `partner_status: pending-agreement` in front matter and is not to be scheduled until it is signed. Prefer the lawyer, bank, tax adviser or money-transfer categories, unnamed.
- Every 7.5% IMT mention is under legal review: say it exactly as facts.csv does.
- No emojis in images; at most one in a caption. No banned words; no em-dash; no rhetorical-question headlines (a reader-question card's `q` is the reader's own words and is fine).
- Do not run git. Only write inside the week's folders listed above. Do not edit samples.py or the templates.

## When you finish

Run `node scripts/check-content.mjs` and fix everything it reports in your files. Then draw your images with
`node scripts/social/render.mjs social/instagram/posts/week-NN social/instagram/stories/week-NN social/linkedin/week-NN`
and look at a few of them (Read the PNG) to check nothing overflows; fix the spec if text runs off the card. Report: the
post list (date, time, platform, format, hook), anything you could not source.

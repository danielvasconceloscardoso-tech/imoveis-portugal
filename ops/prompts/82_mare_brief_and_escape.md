# Prompt 82: Maré, two letters a week — Tuesday "A Brief" and Friday "A Escapada" (operator, 10 Nov 2026)

Maré becomes two distinct letters, each a 3-minute read (500–700 words), European Portuguese first:
1. **Tuesday · A Brief** ("os três minutos mais interessantes da sua terça"). Portugal's economy, people, art, property, design, restaurants, business, culture and stories worth knowing. Intelligent, sharp, sometimes funny: numbers over adjectives, one dry joke at most per item.
2. **Friday · A Escapada** ("uma boa razão para pensar em Portugal"). An exceptional hotel, a remarkable table, a place (beach, village, golf, architecture) and the weekend's agenda. Atmospheric, seductive and genuinely useful: price-from, how to get there, the booking reality.

The long-term goal: each year's 104 letters become **Maré, Volume I**, an editorial anthology (photography, illustration, interviews, typography) that people keep on a coffee table. Write every item as if it will be printed.

Rules: EDITORIAL_POLICY.md (sources, describe never advise, disclaimer), VOICE.md (banned words), METHOD.md (head-concierge voice), and hard rule 2 (beehiiv drafts only, never sent). No sponsor block unless the operator says so for that issue.

## Agents per issue (run in parallel, then in order)

1. **Two research desks** (Tuesday and Friday). Use WebSearch and WebFetch, and public pages per rule 18. Each finds 7–8 candidates with primary sources and dates, nothing older than 3 months unless evergreen, no politics and no crime.
2. **Editor-in-chief.** Picks 5 items per letter for variety (no two items from the same city or the same category) and writes the subject (under 60 characters, specific, no question-bait), the preheader and the copy.
3. **Photo editor.** For each item, one licensed photo: our own `/img/v2`, the venue's press kit with permission noted, or Unsplash or Wikimedia under a reusable licence with the credit recorded. Never a public figure's photo from the web.
4. **Fact-checker** (independent). Checks every number and date against its source and marks each CONFIRMED, CORRECTED or REMOVED.
5. **Producer.** Writes `content/mare/issues/{date}.md` in the existing format (site/src/lib/mare.ts renders it), runs `node scripts/check-content.mjs`, creates the beehiiv draft, and emails the operator a preview.

## Report

To the operator: the two subjects, the 5 items of each in one line apiece, what could not be verified, and the beehiiv draft links.

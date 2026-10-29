# Social readiness check (28 Oct 2026)

Weeks 1 to 4 of the content engine (prompt 30) come from `claude/brave-gauss-cwafi6`. Every link now points at `imoveisportugal.pt` (primary domain, D67). Meta Business Suite has no CSV import, so the planner sheets are for scheduling by hand: Planner, Create post, tick Facebook and Instagram, paste the text, attach the image from the repo path, set the date and time.

## What is ready and what is blocked

Checked by building the site and testing every link in `social/exports/week-0N-meta-planner-draft.csv` (28 rows a week).

| Week | Rows | Link works | Blocked | Blocked on |
| --- | --- | --- | --- | --- |
| 1 (from Mon 9 Nov) | 28 | 14 | 14 | The NIF pillar page in PT, EN, FR is not published |
| 2 | 28 | 9 | 19 | The IMT total-cost pillar page |
| 3 | 28 | 20 | 8 | The power-of-attorney pillar page |
| 4 | 28 | 25 | 3 | The "what your budget buys" pillar page |

The 12 pillar pages exist as drafts in `content/inbox/week-0N/pillar/` (same front matter as the blog) but the site does not render them yet. They are waiting for the review in task 30e (Daniel on legal and tax facts), and then need to be published as blog pages.

## Before anything is scheduled
1. Daniel reviews week 1 (30e). All 112 rows are still `status: draft`.
2. Publish the week 1 NIF pillar page, or schedule only the 14 rows whose link works and the rest after.
3. Images: schedule from the repo files named in the "Media" column. The Buffer sheets use image URLs under `/social-media/` that are not hosted anywhere, so ignore the `*-buffer-*` sheets.
4. All posts are in English first per D26: the planner sheet has the PT, EN and FR blocks in one caption; the PT and FR blocks are held until Daniel gives a start date.

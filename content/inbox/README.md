# Content inbox: drafts for review

Weekly drafts per edition: `week-NN/{edition}/` with `article.md`, `newsletter.md`, `videos.md` (5 scripts), `carousels.md` (3 outlines) and `posts.md` (5 posts). Switzerland has `ch-pt` and `ch-fr`.

1. Every piece has front matter (edition, lang, type, week, title, sources, cta, status) and ends with the edition's disclaimer from content/EDITORIAL_POLICY.md.
2. `sources` lists fact ids from content/facts/facts.csv; every number in the piece comes from those facts or is computed from them (worked IMT examples use the 2026 brackets and the splitting rule of CIMT art. 17.º n.º 3).
3. Check before review: `node scripts/check-content.mjs` (it fails on missing sources or disclaimer, an open [check], banned or advice wording).
4. Weeks 1 to 3 are pre-launch (from Mon 9 Nov 2026): no newsletter is sent before Tue 1 Dec, so the week 1 and 2 newsletters are written as the first two emails of the welcome sequence.
5. Review: Daniel for legal and tax content, the partner agency for market content (D12). Nothing is published from here; `/publish-week` moves approved pieces to content/published/.

Open point for Daniel before any of these goes out: how exception (a) to the flat 7.5% IMT for non-residents ("tenha sido considerado residente para efeitos fiscais") applies to emigrants who were once Portuguese tax residents. The drafts quote the law and send that question to a lawyer or tax adviser (content/faq/UNVERIFIED.md).

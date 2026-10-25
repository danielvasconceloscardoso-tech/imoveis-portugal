# Launch-day SEO checklist (prompt 15 §3.4)

Do these on launch day, after D4 (billing entity) and the legal pages are done. Owner: operator, with the CTO.

1. In `site/src/config.ts`, set `launchReady: true` (removes `noindex`, robots.txt allows crawling and lists the sitemaps). Build, check the preview, merge with the operator's "go".
2. Google Search Console, for each domain (imoveisportugal.lu, .fr, .ch, .com.br, .us, .co.il): Add property > Domain > copy the TXT record > add it in Cloudflare DNS > Verify.
3. Submit each domain's sitemap: `https://<domain>/sitemap-<edition>.xml` (for example `https://imoveisportugal.lu/sitemap-lu.xml`).
4. Request indexing (URL inspection) for the pillars: home, FAQ, calculators, map, guide, and the five first municipality pages, in PT, EN and FR on the canonical edition of each language (pt on .lu, fr on .fr, en on .us, D24).
5. Bing Webmaster Tools: Import from Google Search Console (one click), then submit the same sitemaps.
6. Cloudflare Web Analytics: Analytics & Logs > Web Analytics > Add a site for each domain (no cookies, no banner needed). Note the first-week numbers in ops/METRICS.md.
7. Check one page per language with the Rich Results Test (FAQPage, Article, BreadcrumbList).
8. One week later: Search Console > Pages, fix anything "Discovered, not indexed".

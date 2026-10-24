# Prompt 06 — FAQ pages and the topic bank

To run: in Claude Code, plan mode, type "Read ops/prompts/06_faq_and_topics.md and execute it."

Nothing is published, sent, deployed or merged without Daniel's approval.

---

Read CLAUDE.md, content/EDITORIAL_POLICY.md, content/FAQ.md and content/TOPICS.md first.

## Decisions to apply (24 Oct 2026)

1. **D13:** the USA and Israel editions are branded **Portugal Home Guides** (English). Keep the brand name and domains in config.ts. Do not buy or claim domains: list available options (for example portugalhomeguides.com) for the operator.
2. **D14:** the only real-estate agency on the platform is the partner agency. Every buyer request and every "find me a house" call goes to it. No other agency appears anywhere (D9).
3. **Developers stay in scope** as sponsors (Daniel confirmed).

## Part A — FAQ pages

1. One FAQ page per edition, in the edition's language, built from content/FAQ.md: the 12 common questions plus that edition's specific ones.
2. Verify every **[check]** against a primary source and add it to content/facts/facts.csv (shared with prompt 04). If you cannot verify one, leave the question out and list it for Daniel.
3. Keep each answer under 70 words. Each ends with one next step, linked: partner pages for **[talk-…]**, the buyer form for **[agency]**, the e-book page for **[guide]**.
4. Add FAQPage structured data (schema.org) and link the FAQ from the home page and the footer of each edition.
5. Disclaimer once at the bottom of each FAQ page.

## Part B — Topic bank into the weekly engine

1. Turn content/TOPICS.md into the content plan for the first 10 weeks per edition (content/plan/{edition}.csv: week, pillar, hook, sources to check, FAQ entries it feeds, CTA).
2. Draft weeks 1 and 2 for each edition into content/inbox/ (article, newsletter, 5 video scripts, 3 carousel outlines, 5 posts), following the editorial policy. These are drafts for review.
3. When `/publish-week` is built, it must reject any piece without sources, without the disclaimer, or with an open [check].

## Review

Open a PR with the FAQ pages (screenshots per edition), the plan CSVs and the week 1–2 drafts, plus the list of anything you could not verify. End with the summary in ops/TASKS.md under "Last session".

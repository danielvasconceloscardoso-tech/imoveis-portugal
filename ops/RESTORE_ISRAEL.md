# Bringing the Israel edition back

Hidden on 8 Nov 2026 at the operator's request, for the Programa Regressar meeting. Nothing was deleted: the Israel copy, FAQ, facts, guides and code all stay in the repo.

The fastest way back is to undo the one commit that hid it:

```
git revert <hide-commit>      # the commit "Hide the Israel edition (reversible)", listed in ops/DECISIONS.md
```

The tag `israel-visible-2026-11-08` marks the last state with Israel visible, for comparison (`git diff israel-visible-2026-11-08`).

By hand, the same thing is six edits:
1. `site/src/i18n.ts`: set `HIDDEN_EDITIONS` to `[]`. This alone brings back the pages, menus, lists, sitemap and hreflang links.
2. `site/public/_redirects`: delete the three `/…/il/*` lines at the end.
3. `site/functions-lib/geo.js`: put `IL: "il"` back in `GEO_ED`.
4. `site/src/scripts/flow.ts`: put `"il"` back in the fallback list of editions.
5. `site/src/pages/index.astro`: add Israel back to the description and to the footer line.
6. `content/copy/COPY_DECK.md`, block `lede` (partners page): add Israel back to the list of countries in PT, EN and FR.
7. `site/src/components/Regressar.astro`: nothing to do; the country list follows `HIDDEN_EDITIONS`.
8. `content/blog/imt-nonresidents.{pt,en,fr}.md`, line 36: the list of countries named Israel; it now ends with the UK. Add Israel back if wanted.
9. `site/public/llms.txt`, line 3: Israel was in the list of countries; the UK replaced it.

Then `scripts/visual-check.mjs`: remove `home-il` from `HIDDEN`, and run the checks, build and visual check as usual.

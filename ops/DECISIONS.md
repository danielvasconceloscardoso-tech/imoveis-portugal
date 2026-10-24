# Decisions

One line per decision: date — decision — who decided.

- 2026-10-24 — pipeline.csv uses CLAUDE.md's columns (company, sector, edition, priority, package, status, next step, date) plus the workbook's extras (id, website, why_they_pay, contact_role, channel, verification, owner, notes). Status values stay in the CEO's Portuguese ("Por contactar", "Recusou"…). — CTO
- 2026-10-24 — Editions in pipeline.csv are a semicolon list from LU;FR;CH;BR, and "Todas" expands to all four. — CTO
- 2026-10-24 — The xlsx stays in sponsors/ as the CEO's source; from now on pipeline.csv is the working copy, and the importer is not re-run after hand edits. — CTO
- 2026-10-24 — Repo-local git author set to the brand identity "Imóveis Portugal". — CTO

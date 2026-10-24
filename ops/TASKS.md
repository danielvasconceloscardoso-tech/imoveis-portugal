# Task board

Owners: CEO, CTO, Operator, Partner, Father. Status: todo, doing, blocked, done.
Sprint 1 target: 2026-10-31. A sponsor can open a link, read the offer and send an enquiry on all four domains.

## Sprint 1: sell before launch

| ID | Task | Owner | Status | Due | Blocked by |
|----|------|-------|--------|-----|------------|
| S1-01 | Import the 100-sponsor list into sponsors/pipeline.csv | CTO | done | 2026-10-24 | |
| S1-02 | Create ops/TASKS.md, DECISIONS.md, METRICS.md | CTO | done | 2026-10-24 | |
| S1-03 | Approve the Sprint 1 plan | Operator | todo | 2026-10-25 | |
| S1-04 | Operator setup batch (accounts, domains, DNS, keys; see Sprint 1 plan) | Operator | todo | 2026-10-27 | S1-03 |
| S1-05 | Astro site skeleton, edition config, pre-commit secret/email check | CTO | todo | 2026-10-27 | S1-03 |
| S1-06 | Pilot landing page + media kit on imoveisportugal.lu | CTO | todo | 2026-10-28 | S1-05, S1-10 |
| S1-07 | Sponsor enquiry form (Pages Function + Turnstile, emails the brand inbox) | CTO | todo | 2026-10-28 | S1-04 |
| S1-08 | Newsletter signup embed (beehiiv, double opt-in) | CTO | todo | 2026-10-29 | S1-04 |
| S1-09 | Privacy policy + legal notice per edition (brand entity only) | CTO | todo | 2026-10-29 | S1-11 |
| S1-10 | Media kit copy: final prices per package and edition, Founding Partner terms, pre-launch audience claims | CEO | todo | 2026-10-27 | |
| S1-11 | Legal entity details for the legal notice (company name, registered address, registration no., VAT) | Operator | todo | 2026-10-27 | |
| S1-12 | Decide languages per edition for Sprint 1 (proposal: PT on all, PT-BR on .com.br, FR on .lu/.fr/.ch; DE for .ch later) | CEO | todo | 2026-10-26 | |
| S1-13 | Decide .com.br route: registro.br needs a Brazilian CPF/CNPJ and can expose the holder | CEO | todo | 2026-10-26 | |
| S1-14 | Roll the template out to .fr, .ch, .com.br | CTO | todo | 2026-10-30 | S1-06, S1-12, S1-13 |
| S1-15 | Legal/fact review of media kit and legal pages | Father | todo | 2026-10-30 | S1-09 |
| S1-16 | End-to-end test: open link, read offer, submit enquiry, on all four domains | CTO | todo | 2026-10-31 | S1-14 |
| S1-17 | Move repo to a brand-named GitHub organisation; the current owner account and the first commit's author show a personal name | Operator | todo | 2026-10-27 | |

## Backlog

| ID | Task | Owner | Status | Due |
|----|------|-------|--------|-----|
| B-01 | Fill "owner" and "date" for priority-1 sponsors in pipeline.csv (40 new contacts/week) | CEO | todo | |
| B-02 | Contact the access partners in sponsors/access_partners.csv | CEO | todo | |
| B-03 | Confirm whether the beehiiv free plan includes API access (decides how much of /publish-week can be automated) | CTO | todo | Sprint 2 |
| B-04 | Build /status, /publish-week, /new-sponsor, /sponsor-report, /lead-route | CTO | todo | Sprints 2–3 |

## Last session

2026-10-24. Read CLAUDE.md and the CEO's 100-sponsor workbook. Moved the workbook to sponsors/, imported "Lista 100" into sponsors/pipeline.csv (100 rows; "Todas" expanded to LU;FR;CH;BR; counts LU 72, FR 66, CH 66, BR 69, same as the workbook summary) and "Parceiros de acesso" into sponsors/access_partners.csv. The workbook holds companies and roles only, no personal contacts. Created the ops files and proposed the Sprint 1 plan. Nothing built yet: waiting for operator approval (S1-03) and the setup batch (S1-04). Open issue: the GitHub owner account and the first commit carry a personal name (S1-17).

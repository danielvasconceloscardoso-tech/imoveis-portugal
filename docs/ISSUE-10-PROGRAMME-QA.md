# Programme-centred Regressar — independent QA

## Scope and execution status

The additional suite is `site/tests/e2e/regressar-programme.spec.ts`: six scenarios on desktop and mobile (12 cases). Together with the original 36 cases, **48/48 current test identities passed**, checked against a fresh collection. Six whole-page axe states passed with **zero automated violations, runtime errors or horizontal overflow**. No screenshots or traces were produced by this QA workflow.

| Verification | Result |
| --- | --- |
| New programme cases | 12/12 passed across desktop and mobile |
| Complete current browser coverage | 48/48 identities passed; no missing/skipped/flaky cases |
| Whole-page axe states | 6/6 passed: programme-qualified results in PT/EN/FR desktop and PT mobile, plus PT desktop/mobile city-life views |
| Real image choices | Six local photographs loaded and exposed accessible names/pressed states |
| Hero contrast floor | Computed photo overlay ≥66% on desktop and mobile |
| Actual life-data fixture | Matosinhos: housing power, schools, actual hospitals, individual dated citations and correct map link |

The retained healthy full run passed 46 cases and failed two assertions expecting source dates in the coverage note. Inspection confirmed dates were correctly attached to each school/hospital citation. The test now asserts dates at that actual location and checks origin/private-international coverage in the note; both affected cases passed on rerun with no application change. The earlier preview-server interruption is preserved separately as infrastructure evidence and is not counted as a pass.

Reports under `site/artifacts/issue10/`: `programme-browser-results.json`, `programme-life-browser-results.json`, `programme-collected.json`, `programme-final-coverage.json`, and `programme-axe-results.json`. The coverage manifest includes source SHA-256 hashes. No image deliverable is included.

The test boundary is the independent Imóveis Portugal experience referring to Programa Regressar. A programme reference or visual treatment cannot establish a government partnership, official endorsement or the right to relief.

## Acceptance contracts

- The programme name is prominent and the independent relationship is visible. The tax-model source/verification limit remains visible.
- Year and all four disclosed screening answers are required before an Article 12-A comparison can be selected. Unknown or partially answered conditions never enable it. A 2023 return is explicitly incomplete because legacy rules require review; 2027 is outside this model, without asserting that legislation cannot change.
- A completed checklist only means potentially eligible. It permits a conditional comparison, lowers the gross required for the same declared net, and never announces approval.
- A disqualifying answer revokes an active comparison; the standard scenario must be restored and stale relief cannot persist.
- Image questions have accessible names and pressed states, lazy local images and the existing strict preference constraints.
- A Matosinhos fixture satisfying the six evidenced tastes shows housing purchasing power, actual sourced schools and hospitals, dated/distance context and the correct map link. Primary-care USF entries must not be labelled as hospitals.
- All browser requests are restricted to same-origin GET. The tests cannot submit salary data, leads, mail or external forms. Runtime errors and horizontal overflow fail the suite.

The original 36 Regressar cases remain relevant. Their legacy opt-in relief case must first complete the screening checklist; bypassing or force-enabling a disabled benefit would weaken the contract and is not permitted.

## Review limits

Implementation tests validate the disclosed fiscal model and source handling, not present legal accuracy. Statutory eligibility and salary calculations still require independent source/fiscal confirmation where the environment cannot retrieve official pages. School/hospital proximity is not availability, admissions, quality, clinical access or a guarantee of travel time. Housing power is a stated scenario, not bank approval or proof of available deposit funds.

Reproduction after the updated build: run the suite with the existing desktop/mobile projects, workers=1 and the local preview URL. Use a no-images configuration (`screenshot: off`, `trace: off`) for this handoff. No competing browser or Lighthouse process should run in parallel.

## Manual accessibility review

Axe retains 15 image/pseudo-element contrast items as incomplete in each audited state (hero copy and photo-choice labels). The 66% dark-green overlay and white foreground provide a mathematical worst-case contrast of about 5.3:1 even over a white image; the actual hero overlay is checked by the browser suite on both viewports. No additional ARIA/role/label incomplete findings were present. These checks are not a full WCAG certification. Marker-name overlaps remain a possible map-density limit.

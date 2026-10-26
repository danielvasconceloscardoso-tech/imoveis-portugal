// The seven steps of "How a buyer reaches you" (prompt 29 §2a), shared by the demo page, the walk in demo mode
// (walk.json), the one-pager strip, the step screenshots and the film: the page each step shows, her line, its recording.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Demo } from "./demos";
import { pathFor } from "../i18n";
import { SUB } from "./tools";

export const SCREENPLAY = JSON.parse(readFileSync(join(process.cwd(), "..", "content", "demos", "screenplay.json"), "utf8"));
export function walkSteps(d: Demo) {
  const S = SCREENPLAY.demos[d.token], ed = S.ed, b = Math.round(d.budgets[0]), q = `demo=${d.token}`, home = `/d/${d.token}/home/${d.home}/`;
  const a = (shot: string) => `/d/${d.token}/voice/line-${shot}.mp3`;
  return [
    { n: 1, h: "They search, and we appear", line: S.lines["2"], audio: a("2"), url: `/d/${d.token}/search/?${q}` },
    { n: 2, h: "They choose where", line: S.lines["4"], audio: a("4"), url: `${pathFor("en", ed, "map")}?place=${d.muni}&budget=${b}&cur=${d.buyer.cur}&${q}` },
    { n: 3, h: "They learn the real cost", line: S.lines["5"], audio: a("5"), url: `${pathFor("en", ed, "sims")}${SUB.cost.en}/?price=${b}&own=0&resident=0&mortgage=0&${q}` },
    { n: 4, h: "They meet your homes", line: S.lines["7"], audio: a("7"), url: `/d/${d.token}/homes/?${q}` },
    { n: 5, h: "They ask for a private viewing", line: S.lines["9"], audio: a("9"), url: `${home}?${q}#viewing` },
    { n: 6, h: "You receive the enquiry", line: S.morning, audio: "", url: `/d/${d.token}/enquiry/?${q}` },
    { n: 7, h: "We stay beside them until the keys", line: S.lines["10"], audio: a("10"), url: `${home}?sent=1&${q}#team` },
  ];
}

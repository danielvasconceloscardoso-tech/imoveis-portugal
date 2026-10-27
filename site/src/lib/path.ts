// "Passo a passo" (formerly "Passo a passo", D61) as a path (prompt 27 §3, D51, D52): two routes, buying and selling (an inherited home adds its
// station), each a line of stations. Every station: what happens, what you need (a checklist the reader can tick),
// the questions people ask (answered from facts.csv, prompt 20 journeys), the numbers for their case (a calculator
// prefilled), the partner for the step, and "Próximo passo". Wording: COPY_DECK.md "path.*"; questions: "journey.q.*".
import type { EdCode } from "../i18n";
import { JOURNEY, type JQ, type Role } from "./journeys";
import type { ToolKey } from "./tools";

export type Door = "buy" | "sell";
export type Station = { k: string; door: Door; roles: Role[]; qs: JQ[]; tool?: ToolKey; map?: boolean; cta: "agency" | "sell" | "talk"; cat?: string;
  high?: boolean; inherit?: boolean; need: number };
const cp = (k: string) => JOURNEY.find((c) => c.k === k)!;
const qs = (k: string, ids?: string[]) => cp(k).qs.filter((q) => !ids || ids.includes(q.id));

export const STATIONS: Station[] = [
  { k: "place", door: "buy", roles: ["agency", "developer"], qs: qs("budget"), map: true, cta: "agency", need: 3 },
  { k: "money", door: "buy", roles: ["bank", "fx"], qs: qs("finance"), tool: "payment", cta: "talk", cat: "bank", need: 3 },
  { k: "docs", door: "buy", roles: ["lawyer"], qs: qs("docs"), cta: "talk", cat: "lawyer", need: 3 },
  // D52: added by themselves for a high budget, never labelled as such.
  { k: "struct", door: "buy", roles: ["lawyer", "wealth"], qs: qs("struct"), cta: "talk", cat: "lawyer", high: true, need: 3 },
  { k: "choose", door: "buy", roles: ["agency", "developer"], qs: [], map: true, cta: "agency", need: 3 },
  { k: "cpcv", door: "buy", roles: ["lawyer"], qs: qs("buy", ["cpcv"]), cta: "talk", cat: "lawyer", need: 3 },
  { k: "deed", door: "buy", roles: ["lawyer", "tax"], qs: [...qs("taxbuy"), ...qs("buy", ["deed", "docs"])], tool: "cost", cta: "talk", cat: "lawyer", need: 3 },
  { k: "estate", door: "buy", roles: ["wealth", "tax", "lawyer"], qs: qs("estate"), cta: "talk", cat: "tax", high: true, need: 2 },
  { k: "keys", door: "buy", roles: ["insurance", "architect"], qs: [], cta: "talk", cat: "insurance", need: 3 },
  { k: "own", door: "buy", roles: ["tax", "insurance", "rental"], qs: [...qs("own"), ...qs("rent")], tool: "rent", cta: "talk", cat: "tax", need: 3 },
  { k: "later", door: "buy", roles: ["tax", "agency"], qs: qs("sell"), tool: "gains", cta: "talk", cat: "tax", need: 2 },

  { k: "worth", door: "sell", roles: ["agency"], qs: qs("budget", ["trend"]), map: true, cta: "sell", need: 3 },
  { k: "inherit", door: "sell", roles: ["lawyer", "tax"], inherit: true, cta: "talk", cat: "lawyer", need: 3, qs: [
    { id: "inherit", facts: ["pt-is-inheritance-exempt"], cat: "lawyer" },
    { id: "sell.filing", facts: ["pt-is-inheritance-filing"], cat: "tax" },
    { id: "sell.heirs", facts: [], cat: "lawyer", ask: true },
  ] },
  { k: "taxes", door: "sell", roles: ["tax"], qs: qs("sell"), tool: "gains", cta: "talk", cat: "tax", need: 3 },
  { k: "prepare", door: "sell", roles: ["lawyer"], cta: "talk", cat: "lawyer", need: 3, qs: [
    { id: "sell.cert", facts: [], cat: "lawyer", ask: true },
    { id: "docs", facts: ["pt-casa-pronta-docs-all"], cat: "lawyer" },
  ] },
  { k: "list", door: "sell", roles: ["agency"], qs: [], cta: "sell", need: 3 },
  { k: "sdeed", door: "sell", roles: ["lawyer"], qs: qs("buy", ["deed"]), cta: "talk", cat: "lawyer", need: 2 },
  { k: "smoney", door: "sell", roles: ["fx", "tax"], qs: qs("finance", ["move", "fr.3916", "us.fbar", "br.cbe"]), cta: "talk", cat: "fx", need: 2 },
];

export const stationsFor = (door: Door, ed: EdCode) => STATIONS.filter((s) => s.door === door)
  .map((s) => ({ ...s, qs: s.qs.filter((q) => !q.only || q.only.includes(ed)) }));

// FAQ (prompt 27 §2): each question belongs to a stage of the path and to one station, by the end of its id.
export const FAQ_STAGES = ["before", "buying", "owning", "renting", "selling", "inheritance"] as const;
export type FaqStage = (typeof FAQ_STAGES)[number];
const FAQ_MAP: [string, FaqStage, string][] = [
  ["buy-abroad", "before", "place"], ["costs", "before", "deed"], ["mortgage", "before", "money"], ["borrow", "before", "money"], ["nif", "before", "docs"],
  ["timing", "before", "choose"], ["find", "before", "choose"], ["money", "before", "money"], ["fr-declare", "before", "money"], ["ch-2p", "before", "money"],
  ["ch-2p-rules", "before", "money"], ["ch-3a", "before", "money"], ["br-irpf", "before", "money"], ["us-report", "before", "money"], ["visa", "before", "struct"],
  ["ifici", "owning", "struct"], ["lawyer", "buying", "docs"], ["imt-nonres", "buying", "deed"], ["imt-calc", "buying", "deed"], ["deed", "buying", "deed"],
  ["hpp", "buying", "deed"], ["sign", "buying", "cpcv"], ["cpcv", "buying", "cpcv"], ["yearly", "owning", "own"], ["rent", "renting", "own"], ["lu-rent", "renting", "own"],
  ["il-rent", "renting", "own"], ["sell", "selling", "later"], ["us-sale", "selling", "later"], ["inherit", "inheritance", "inherit"],
];
export function faqPlace(id: string): { stage: FaqStage; station: string } | null {
  const hit = FAQ_MAP.filter(([s]) => id.endsWith(`-${s}`)).sort((a, b) => b[0].length - a[0].length)[0];
  return hit ? { stage: hit[1], station: hit[2] } : null;
}
export const stationDoor = (k: string): Door => STATIONS.find((s) => s.k === k)?.door ?? "buy";

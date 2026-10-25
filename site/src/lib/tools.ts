// Calculator definitions (prompts 12 and 13): URL slugs, input fields, result rows and the call to action
// that follows each result. Maths in ./sims.ts; wording in content/copy/COPY_DECK.md ("sims.*").
// Imported by the pages at build time and by the calculator script in the browser.
import type { Lang } from "../i18n";
import * as S from "./sims";

export type ToolKey = "cost" | "payment" | "rent" | "imt" | "imi" | "dsti" | "afford" | "gains";
export const TOOLS: ToolKey[] = ["cost", "payment", "afford", "rent", "imt", "imi", "dsti", "gains"];
// Calculators with a page (prompt 12: the first three; prompt 13 adds the rest).
export const ENABLED: ToolKey[] = ["cost", "payment", "rent"];
export const SUB: Record<ToolKey | "plan" | "checkout", Record<Lang, string>> = {
  cost: { pt: "custo-total", en: "total-cost", fr: "cout-total" },
  payment: { pt: "prestacao", en: "monthly-payment", fr: "mensualite" },
  rent: { pt: "arrendamento", en: "rental-yield", fr: "rendement-locatif" },
  imt: { pt: "imt-e-imposto-do-selo", en: "transfer-tax-and-stamp-duty", fr: "imt-et-droit-de-timbre" },
  imi: { pt: "imi", en: "property-tax-imi", fr: "taxe-fonciere-imi" },
  dsti: { pt: "taxa-de-esforco", en: "debt-to-income", fr: "taux-d-endettement" },
  afford: { pt: "que-casa-consigo-comprar", en: "what-can-i-afford", fr: "quel-bien-puis-je-acheter" },
  gains: { pt: "mais-valias", en: "capital-gains", fr: "plus-values" },
  plan: { pt: "plano-de-compra", en: "purchase-plan", fr: "plan-d-achat" },
  checkout: { pt: "comprar-plano", en: "buy-plan", fr: "acheter-plan" },
};

export type Field = { id: string; kind: "money" | "local" | "num" | "pct" | "bool"; def: number | boolean; step?: number; hint?: string };
export const FIELDS: Record<ToolKey, Field[]> = {
  cost: [{ id: "price", kind: "money", def: 250000 }, { id: "own", kind: "bool", def: false }, { id: "resident", kind: "bool", def: false }, { id: "mortgage", kind: "bool", def: false }],
  imt: [{ id: "price", kind: "money", def: 250000 }, { id: "own", kind: "bool", def: false }, { id: "resident", kind: "bool", def: false }],
  payment: [{ id: "price", kind: "money", def: 250000 }, { id: "deposit", kind: "money", def: 50000 }, { id: "years", kind: "num", def: 30 }, { id: "rate", kind: "pct", def: S.RATE_DEFAULT, step: 0.01, hint: "rate.hint" }, { id: "own", kind: "bool", def: false }],
  rent: [{ id: "price", kind: "money", def: 200000 }, { id: "rent", kind: "money", def: 900 }, { id: "imi", kind: "money", def: 450, hint: "imi.hint" }, { id: "condo", kind: "money", def: 40 }, { id: "insurance", kind: "money", def: 200 }, { id: "mgmt", kind: "pct", def: 0, step: 0.5 }],
  imi: [{ id: "vpt", kind: "money", def: 120000, hint: "vpt.hint" }, { id: "imirate", kind: "pct", def: 0.35, step: 0.005, hint: "imi.hint" }],
  dsti: [{ id: "income", kind: "local", def: 3000 }, { id: "instalments", kind: "local", def: 900 }],
  afford: [{ id: "income", kind: "local", def: 3500 }, { id: "debts", kind: "local", def: 0 }, { id: "deposit", kind: "money", def: 60000 }, { id: "years", kind: "num", def: 30 }, { id: "rate", kind: "pct", def: S.RATE_DEFAULT, step: 0.01, hint: "rate.hint" }, { id: "own", kind: "bool", def: false }],
  gains: [{ id: "sale", kind: "money", def: 300000 }, { id: "buy", kind: "money", def: 200000 }, { id: "buycosts", kind: "money", def: 17000 }, { id: "works", kind: "money", def: 0 }, { id: "salecosts", kind: "money", def: 0 }],
};

// What follows each result (prompt 12, 2.4): financing → credit partner, tax → tax adviser, buying → the agency.
export const NEXT: Record<ToolKey, "credit" | "tax" | "agency"> = { cost: "agency", imt: "agency", payment: "credit", afford: "credit", dsti: "credit", rent: "tax", imi: "tax", gains: "tax" };
export const FACTS_USED: Record<ToolKey, string[]> = {
  cost: ["pt-imt-hpp-2026", "pt-imt-second-home-2026", "pt-imt-nonresident-flat", "pt-is-purchase", "pt-casa-pronta-fees"],
  imt: ["pt-imt-hpp-2026", "pt-imt-second-home-2026", "pt-imt-nonresident-flat", "pt-imt-nonresident-exceptions", "pt-is-purchase"],
  payment: ["bdp-mortgage-rate-2026-08", "pt-ltv-limits", "pt-dsti-45", "pt-is-loan-5y"],
  afford: ["pt-dsti-45", "pt-ltv-limits", "bdp-mortgage-rate-2026-08"],
  dsti: ["pt-dsti-45"],
  rent: ["pt-rent-tax-nonresident", "pt-imi-rates"],
  imi: ["pt-imi-rates", "pt-aimi-deduction"],
  gains: ["pt-cg-50pct", "pt-cg-nonres-28-revoked", "pt-irs-68-2026"],
};

export type Row = { k: string; v: number; fmt: "eur" | "pct" | "local"; strong?: boolean };
export type Out = { rows: Row[]; warn?: { k: string; vars?: Record<string, string | number> } };
type V = Record<string, number | boolean>;
const n = (v: V, k: string) => Number(v[k]) || 0;
const b = (v: V, k: string) => v[k] === true;

/** Runs one calculator. `fx` = units of the reader's currency per euro (ECB), 1 for euro editions. */
export function run(tool: ToolKey, v: V, fx = 1): Out {
  switch (tool) {
    case "cost":
    case "imt": {
      const r = S.purchase(n(v, "price"), b(v, "own"), b(v, "resident"), b(v, "mortgage"));
      const rows: Row[] = [{ k: "r.imt", v: r.imt, fmt: "eur" }, { k: "r.is", v: r.is, fmt: "eur" }];
      if (tool === "cost") rows.push({ k: "r.deed", v: r.deed, fmt: "eur" }, { k: "r.extra", v: r.extra, fmt: "eur" }, { k: "r.total", v: r.total, fmt: "eur", strong: true });
      else rows.push({ k: "r.taxes", v: r.imt + r.is, fmt: "eur", strong: true });
      return { rows };
    }
    case "payment": {
      const r = S.mortgage(n(v, "price"), n(v, "deposit"), n(v, "years"), n(v, "rate"), b(v, "own"));
      return {
        rows: [{ k: "r.loan", v: r.loan, fmt: "eur" }, { k: "r.ltv", v: r.ltv, fmt: "pct" }, { k: "r.monthly", v: r.monthly, fmt: "eur", strong: true }, { k: "r.interest", v: r.interest, fmt: "eur" }, { k: "r.stamp", v: r.stamp, fmt: "eur" }],
        warn: r.overCap ? { k: "ltv.over", vars: { cap: r.cap } } : undefined,
      };
    }
    case "rent": {
      const r = S.rental(n(v, "price"), n(v, "rent"), n(v, "imi"), n(v, "condo"), n(v, "insurance"), n(v, "mgmt"));
      return { rows: [{ k: "r.gross", v: r.gross, fmt: "eur" }, { k: "r.costs", v: r.costs, fmt: "eur" }, { k: "r.net", v: r.net, fmt: "eur" }, { k: "r.tax", v: r.tax, fmt: "eur" }, { k: "r.after", v: r.after, fmt: "eur" },
        { k: "r.grossYield", v: r.grossYield, fmt: "pct" }, { k: "r.netYield", v: r.netYield, fmt: "pct" }, { k: "r.afterYield", v: r.afterYield, fmt: "pct", strong: true }] };
    }
    case "imi":
      return { rows: [{ k: "r.imi", v: S.imi(n(v, "vpt"), n(v, "imirate")), fmt: "eur", strong: true }],
        warn: n(v, "imirate") < S.IMI_RANGE[0] || n(v, "imirate") > S.IMI_RANGE[1] ? { k: "imi.range" } : undefined };
    case "dsti": {
      const r = S.dsti(n(v, "income"), n(v, "instalments"));
      return { rows: [{ k: "r.ratio", v: r.ratio, fmt: "pct", strong: true }, { k: "r.limit", v: r.limit, fmt: "pct" }, { k: "r.room", v: r.room, fmt: "local" }],
        warn: r.over ? { k: "dsti.over" } : undefined };
    }
    case "afford": {
      const inc = n(v, "income") / fx, debts = n(v, "debts") / fx;
      const r = S.afford(inc, debts, n(v, "deposit"), n(v, "years"), n(v, "rate"), b(v, "own"));
      return { rows: [{ k: "r.maxInst", v: r.maxInst, fmt: "eur" }, { k: "r.maxLoan", v: r.maxLoan, fmt: "eur" }, { k: "r.price", v: r.price, fmt: "eur", strong: true }],
        warn: { k: r.limitedBy === "deposit" ? "afford.bydeposit" : "afford.byincome" } };
    }
    case "gains": {
      const r = S.gains(n(v, "sale"), n(v, "buy"), n(v, "buycosts"), n(v, "works"), n(v, "salecosts"));
      return { rows: [{ k: "r.gain", v: r.gain, fmt: "eur" }, { k: "r.taxable", v: r.taxable, fmt: "eur" }, { k: "r.taxIfOnly", v: r.taxIfOnly, fmt: "eur", strong: true }] };
    }
  }
}

/** Every deck key a calculator can show, so the page can hand the browser its wording. */
export function keysFor(tool: ToolKey): string[] {
  const keys = new Set<string>();
  for (const f of FIELDS[tool]) { keys.add(`f.${f.id}`); if (f.hint) keys.add(f.hint); }
  const sample = run(tool, Object.fromEntries(FIELDS[tool].map((f) => [f.id, f.def])) as V);
  sample.rows.forEach((r) => keys.add(r.k));
  ["ltv.over", "imi.range", "dsti.over", "afford.bydeposit", "afford.byincome", "r.deed", "r.extra", "r.total", "r.taxes", "copied", "yes", "no"].forEach((k) => keys.add(k));
  return [...keys];
}

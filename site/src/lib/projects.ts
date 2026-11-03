// Developer projects (prompts 26 §1 and 28 §2): content/developers/projects.json, built by scripts/developers/import.py.
// PROJECTS: partners only (partner: true), the ones the public site shows, each labelled "Sponsored".
// demoProjects(token): one developer's projects for its own private demo, whether or not it has signed.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Unit = { id: string; ref: string; name?: string | null; typology: string; area: number | null; areaNote?: string | null; price: number | null; priceNote?: string | null; img?: string | null; url: string };
export type Project = { id: string; name: string; developer: string; devSlug?: string; muni: string; lon: number; lat: number; line?: string; render?: string | null; credit?: string;
  lines?: Partial<Record<"pt" | "en" | "fr", string>>; from: number | null; typologies: string[]; delivery?: string | null; url?: string; partner?: boolean; demo?: string; checked?: string; gallery?: string[]; credits?: string[]; units?: Unit[]; sources?: string[]; hideRefs?: boolean;
  // Prompt 38 (Marble Terrace): a partner still negotiating ("pending") shows on the preview only; availability by block and typology.
  pending?: boolean; summary?: Partial<Record<"pt" | "en" | "fr", string>>; features?: (Record<"pt" | "en" | "fr", string> & { card?: boolean })[];
  blocks?: Block[]; region?: string; near?: string[]; availabilityChecked?: string; availabilitySource?: string; availabilityNote?: Partial<Record<"pt" | "en" | "fr", string>>;
  // Marble Terrace Vila do Conde (3 Nov 2026): a hand-entered partner may also publish every home in "unitTable" (shown under
  // the availability table, never as unit pages, so requests stay on the showcase's request sheet, D66) and the stated
  // location facts in "location" (distances are ours: straight line, from OpenStreetMap).
  featuresNote?: L3; unitTable?: UnitRow[]; unitTableNote?: L3; location?: Location };
type L3 = Partial<Record<"pt" | "en" | "fr", string>>;
export type UnitRow = { ref: string; typology: string; floor: number; sun: string; gross: number | null; dwelling: number | null; balcony: number | null; terrace: number | null; garden: number | null;
  parking: { kind: "space" | "box"; cars: number; area: number | null } | null; storage: number | null; price: number | null; status: "available" | "reserved" | "sold" };
export type Location = { address?: L3; marks?: L3; marksSource?: string; distances?: (Record<"pt" | "en" | "fr", string> & { m: number })[]; distSource?: string };
export type Block = { id: string; units: { typology: string; total: number; forSale: number; soon?: number; reserved: number; sold: number }[] };
const ALL: Project[] = JSON.parse(readFileSync(join(process.cwd(), "..", "content", "developers", "projects.json"), "utf8")).projects;
// A pending partner is never built on the live branch (Cloudflare Workers Builds sets WORKERS_CI_BRANCH).
const LIVE = process.env.WORKERS_CI_BRANCH === "main";
export const PROJECTS: Project[] = ALL.filter((p) => p.partner === true && !(LIVE && p.pending));
export const demoProjects = (token: string) => ALL.filter((p) => p.demo === token);
/** A developer's projects in one municipality: one showcase page each. */
export const showcases = (list: Project[]) => {
  const m = new Map<string, Project[]>();
  for (const p of list) if (p.units?.length || p.blocks?.length) { const k = `${p.devSlug}/${p.muni}`; m.set(k, [...(m.get(k) ?? []), p]); }
  return [...m.values()];
};
/** The developer's other showcases (another municipality), for "By the same developer". */
export const sameDeveloper = (list: Project[], devSlug?: string, muni?: string) =>
  showcases(list).filter((ps) => ps[0].devSlug === devSlug && ps[0].muni !== muni);
/** The two web sizes the importer writes for every image. */
export const img = (base: string | null | undefined, w: 800 | 1600 = 1600) => (base ? `${base}-${w}.webp` : "");

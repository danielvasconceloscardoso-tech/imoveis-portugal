// Developer projects (prompts 26 §1 and 28 §2): content/developers/projects.json, built by scripts/developers/import.py.
// PROJECTS: partners only (partner: true), the ones the public site shows, each labelled "Sponsored".
// demoProjects(token): one developer's projects for its own private demo, whether or not it has signed.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export type Unit = { id: string; ref: string; name?: string | null; typology: string; area: number | null; areaNote?: string | null; price: number | null; priceNote?: string | null; img?: string | null; url: string;
  // Prompt 66 (O'rizon): the outdoor space a sale listing states (kinds and, where given, the total in m²).
  out?: { kinds: ("balcony" | "terrace" | "garden")[]; m2: number | null; duplex?: boolean } };
export type Project = { id: string; name: string; developer: string; devSlug?: string; muni: string; lon: number; lat: number; line?: string; render?: string | null; credit?: string;
  lines?: Partial<Record<"pt" | "en" | "fr", string>>; from: number | null; typologies: string[]; delivery?: string | null; url?: string; partner?: boolean; demo?: string; checked?: string; gallery?: string[]; credits?: string[]; units?: Unit[]; sources?: string[]; hideRefs?: boolean;
  // Prompt 38 (Marble Terrace): a partner still negotiating ("pending") shows on the preview only; availability by block and typology.
  pending?: boolean; summary?: Partial<Record<"pt" | "en" | "fr", string>>; features?: (Record<"pt" | "en" | "fr", string> & { card?: boolean })[];
  blocks?: Block[]; region?: string; near?: string[]; availabilityChecked?: string; availabilitySource?: string; availabilityNote?: Partial<Record<"pt" | "en" | "fr", string>>;
  // Marble Terrace Vila do Conde (3 Nov 2026): a hand-entered partner may also publish every home in "unitTable" (shown under
  // the availability table, never as unit pages, so requests stay on the showcase's request sheet, D66) and the stated
  // location facts in "location" (distances are ours: straight line, from OpenStreetMap).
  featuresNote?: L3; unitTable?: UnitRow[]; unitTableNote?: L3; location?: Location;
  // Prompt 66 (O'rizon Living, 3 Nov 2026): shown on the site without being a sponsor. "tag" replaces "Sponsored" wherever the
  // project is labelled; the showcase adds the developer's film and 3D tour (click to load, never on page load: both set
  // their own cookies), the river views, the buildings and the areas by typology as published, the homes from sale listings
  // (no agency, no listing reference), floor plans per typology and the amenities with photographs. Every visual block
  // appears only when its files exist under site/public (no empty boxes).
  tag?: L3; views?: string[]; amenityImgs?: string[]; plans?: { t: string; img: string }[]; film?: Film; tour3d?: { url: string; poster?: string; page?: string };
  typeAreas?: { t: string; min: number; max: number }[]; buildings?: { id: string; phase?: number; units?: Record<string, number> }[]; buildingsSource?: string;
  featuresSource?: string; unitsNote?: L3; sourcesShown?: string[];
  // Prompt 68 (4 Nov 2026): one line and one render: the map opens the project's place on it (arrival, the project first).
  hero?: L3; heroImg?: string };
export type Film = { id?: string; file?: string; poster?: string; title?: string; date?: string; more?: { id: string; poster?: string; title?: L3 }[] };
type L3 = Partial<Record<"pt" | "en" | "fr", string>>;
export type UnitRow = { ref: string; typology: string; floor: number; sun: string; gross: number | null; dwelling: number | null; balcony: number | null; terrace: number | null; garden: number | null;
  parking: { kind: "space" | "box"; cars: number; area: number | null } | null; storage: number | null; price: number | null; status: "available" | "reserved" | "sold" };
export type Location = { address?: L3; marks?: L3; marksSource?: string; distances?: (Record<"pt" | "en" | "fr", string> & { m: number })[]; distSource?: string };
export type Block = { id: string; units: { typology: string; total: number; forSale: number; soon?: number; reserved: number; sold: number }[] };
const ALL: Project[] = JSON.parse(readFileSync(join(process.cwd(), "..", "content", "developers", "projects.json"), "utf8")).projects;
// A pending partner is never built on the live branch (Cloudflare Workers Builds sets WORKERS_CI_BRANCH).
const LIVE = process.env.WORKERS_CI_BRANCH === "main";
export const PROJECTS: Project[] = ALL.filter((p) => p.partner === true && !(LIVE && p.pending));
/** Partners switched off on the live branch (pending): their old showcase addresses send the reader to the place's map card. */
export const HIDDEN: Project[] = ALL.filter((p) => p.partner === true && LIVE && p.pending);
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
/** The label a project carries on the site: its own tag (a pick of ours, not paid) or the "Sponsored" label it is given. */
export const labelOf = (p: Pick<Project, "tag">, lang: "pt" | "en" | "fr", sponsored: string) => p.tag?.[lang] || sponsored;
/** A showcase laid out like Marble Terrace (blocks, a unit table or buildings): requests stay on its sheet, no unit pages. */
export const rich = (p: Project) => !!(p.blocks?.length || p.unitTable?.length || p.buildings?.length);
/** Only images whose web copy exists (a block with no file renders nothing). */
export const present = (list: (string | null | undefined)[] = []) => list.filter((b): b is string => !!b && existsSync(join(process.cwd(), "public", `${b}-800.webp`)));
/** The two web sizes the importer writes for every image. */
export const img = (base: string | null | undefined, w: 800 | 1600 = 1600) => (base ? `${base}-${w}.webp` : "");

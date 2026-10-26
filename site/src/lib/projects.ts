// Developer projects (prompts 26 §1 and 28 §2): content/developers/projects.json, built by scripts/developers/import.py.
// PROJECTS: partners only (partner: true), the ones the public site shows, each labelled "Sponsored".
// demoProjects(token): one developer's projects for its own private demo, whether or not it has signed.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Unit = { id: string; ref: string; name?: string | null; typology: string; area: number | null; areaNote?: string | null; price: number | null; priceNote?: string | null; img?: string | null; url: string };
export type Project = { id: string; name: string; developer: string; devSlug?: string; muni: string; lon: number; lat: number; line?: string; render?: string | null; credit?: string;
  lines?: Partial<Record<"pt" | "en" | "fr", string>>; from: number | null; typologies: string[]; delivery?: string | null; url?: string; partner?: boolean; demo?: string; checked?: string; gallery?: string[]; credits?: string[]; units?: Unit[]; sources?: string[]; hideRefs?: boolean };
const ALL: Project[] = JSON.parse(readFileSync(join(process.cwd(), "..", "content", "developers", "projects.json"), "utf8")).projects;
export const PROJECTS: Project[] = ALL.filter((p) => p.partner === true);
export const demoProjects = (token: string) => ALL.filter((p) => p.demo === token);
/** A developer's projects in one municipality: one showcase page each. */
export const showcases = (list: Project[]) => {
  const m = new Map<string, Project[]>();
  for (const p of list) if (p.units?.length) { const k = `${p.devSlug}/${p.muni}`; m.set(k, [...(m.get(k) ?? []), p]); }
  return [...m.values()];
};
/** The two web sizes the importer writes for every image. */
export const img = (base: string | null | undefined, w: 800 | 1600 = 1600) => (base ? `${base}-${w}.webp` : "");

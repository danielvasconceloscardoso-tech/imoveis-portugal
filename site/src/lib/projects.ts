// Partner developer projects (prompt 26 §1): content/developers/projects.json, partners only, each labelled "Patrocinado".
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Project = { id: string; name: string; developer: string; muni: string; lon: number; lat: number; render?: string; credit?: string;
  from: number | null; typologies: string[]; delivery?: string; url?: string };
export const PROJECTS: Project[] = JSON.parse(readFileSync(join(process.cwd(), "..", "content", "developers", "projects.json"), "utf8")).projects;

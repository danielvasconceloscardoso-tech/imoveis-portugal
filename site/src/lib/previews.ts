// Prompt 71 §3: a private preview for a developer whose projects are on our map without a demo film (Arrow Global /
// Details: The Uncommon Beach Residences, Springs at The Els Club, Palmares Ocean Living & Golf). One unlisted page,
// /d/{token}/ (noindex, no menu, English), built only where its projects are shown: never on the live branch while they
// are pending (projects.ts), so it exists on design-v2 builds and comes to main with `pending: false`.
import { PROJECTS, type Project } from "./projects";

type Def = { token: string; developer: string; lede: string; ids: string[]; map: string };
const DEFS: Def[] = [
  { token: "a7c3e91f42", developer: "Arrow Global / Details", lede: "Vilamoura and Palmares, as an American buyer meets them on the US edition's map.",
    ids: ["the-uncommon", "springs-els-club", "palmares"], map: "/en/us/map/?pins=the-uncommon,springs-els-club,palmares" },
];
export type Preview = Def & { projects: Project[] };
export const PREVIEWS: Preview[] = DEFS.map((d) => ({ ...d, projects: d.ids.map((id) => PROJECTS.find((p) => p.id === id)).filter((p): p is Project => !!p) }))
  .filter((d) => d.projects.length === d.ids.length);

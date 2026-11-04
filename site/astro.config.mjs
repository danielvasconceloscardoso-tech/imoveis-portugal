import { defineConfig } from "astro/config";
import { readFileSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

// Prompt 71 §3: a partner marked pending is hidden on the live branch (site/src/lib/projects.ts). Its pages and data are
// never built there; this also leaves its images (site/public/img/developers/<id>/) out of the live build's output.
const pendingImages = {
  name: "pending-images",
  hooks: {
    "astro:build:done": ({ dir }) => {
      if (process.env.WORKERS_CI_BRANCH !== "main") return;
      const all = JSON.parse(readFileSync(new URL("../content/developers/projects.json", import.meta.url), "utf8")).projects;
      for (const p of all.filter((x) => x.partner === true && x.pending)) {
        const d = join(fileURLToPath(dir), "img", "developers", p.id);
        if (existsSync(d)) rmSync(d, { recursive: true });
      }
    },
  },
};

export default defineConfig({
  site: "https://imoveisportugal.pt",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [pendingImages],
});

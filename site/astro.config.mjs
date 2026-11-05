import { defineConfig } from "astro/config";
import { existsSync, readdirSync, readFileSync, renameSync, rmdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

// Prompt 70 (J-24, MI-11): the per-language and per-edition 404 pages are built as {lang}/{ed}/404/index.html; Cloudflare
// serves the nearest 404.html up the path (wrangler.jsonc not_found_handling "404-page"), so they move there.
const notFoundPages = {
  name: "ip-404-pages",
  hooks: {
    "astro:build:done": ({ dir }) => {
      const out = fileURLToPath(dir);
      const move = (base) => {
        const from = join(base, "404", "index.html");
        if (!existsSync(from)) return;
        renameSync(from, join(base, "404.html"));
        if (!readdirSync(join(base, "404")).length) rmdirSync(join(base, "404"));
      };
      for (const lang of readdirSync(out, { withFileTypes: true }).filter((d) => d.isDirectory() && /^(pt|en|fr)$/.test(d.name))) {
        const lb = join(out, lang.name);
        move(lb);
        for (const ed of readdirSync(lb, { withFileTypes: true }).filter((d) => d.isDirectory())) move(join(lb, ed.name));
      }
    },
  },
};

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
  // Test builds and reports contain thousands of files; keep them out of the dev watcher.
  vite: { server: { watch: { ignored: ["**/artifacts/**", "**/playwright-report/**", "**/test-results/**"] } } },
  build: { format: "directory" },
  integrations: [notFoundPages, pendingImages],
});

import { defineConfig } from "astro/config";
import { existsSync, readdirSync, renameSync, rmdirSync } from "node:fs";
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

export default defineConfig({
  site: "https://imoveisportugal.pt",
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [notFoundPages],
});

import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://imoveisportugal.pt",
  trailingSlash: "always",
  build: { format: "directory" },
});

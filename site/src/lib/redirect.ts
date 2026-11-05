// Keep response HTML outside Astro source: Vite's dependency scanner otherwise
// mistakes the script inside the template string for an Astro script block.
export function redirectPage(to: string, lang: string): Response {
  return new Response(`<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${to}"><link rel="canonical" href="${to}"><title>Imóveis Portugal</title><script>location.replace(${JSON.stringify(to)} + location.hash)</script></head><body><p><a href="${to}">${to}</a></p></body></html>`, { headers: { "content-type": "text/html; charset=utf-8" } });
}

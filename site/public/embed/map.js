/* Imóveis Portugal map embed (prompt 25 §3). Usage:
   <div data-imoveis-map data-lang="pt" data-budget="500000" data-center="-8.61,41.15,9" data-pin="-8.61,41.15,Residências do Rio"
        data-cta="https://example.com/contact" data-cta-label="Pedir informação" data-accent="#003b5c" data-height="720"></div>
   <script src="https://imoveisportugal.pt/embed/map.js" async></script>
   Every option is optional. The map shows "Powered by Imóveis Portugal" and the data credits (Fonte: INE · © OpenStreetMap contributors). */
(function () {
  var s = document.currentScript, origin = s ? new URL(s.src).origin : "https://imoveisportugal.pt";
  var keys = { budget: "budget", metric: "metric", center: "center", pin: "pin", cta: "cta", ctaLabel: "ctalabel", accent: "accent" };
  function mount(el) {
    if (el.getAttribute("data-ready")) return; el.setAttribute("data-ready", "1");
    var d = el.dataset, q = new URLSearchParams(), lang = /^(pt|en|fr)$/.test(d.lang || "") ? d.lang : "pt";
    Object.keys(keys).forEach(function (k) { if (d[k]) q.set(keys[k], d[k]); });
    var f = document.createElement("iframe");
    f.src = origin + "/embed/map/" + lang + "/?" + q.toString();
    f.title = { pt: "Mapa de preços das casas em Portugal", en: "Map of house prices in Portugal", fr: "Carte des prix des logements au Portugal" }[lang];
    f.loading = "lazy"; f.allow = "web-share; clipboard-write"; f.referrerPolicy = "strict-origin-when-cross-origin";
    f.style.cssText = "display:block;width:100%;height:" + (parseInt(d.height, 10) || 760) + "px;border:0";
    el.appendChild(f);
  }
  function run() { Array.prototype.forEach.call(document.querySelectorAll("[data-imoveis-map]"), mount); }
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", run) : run();
})();

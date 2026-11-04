// Prompt 78 §0 (operator, 4 Nov 23:09: "The site is static. The videos are not moving and that's crucial"): every film on
// the site moves on its own, with no tap, on phone and desktop: muted, looping, inline, starting when it comes into view.
// - Reduced motion no longer keeps the still (an iPhone with "Reduce Motion" on saw a static site); it only removes the
//   decorative fade. Every film gets a small, quiet pause control instead (WCAG 2.2.2), remembered for the visit.
// - iPhone Low Power Mode blocks autoplay: the first touch, scroll or key anywhere starts the film.
// - Off screen, the film pauses; back on screen, it plays again (unless the reader paused it).
// - Only the reader's own "Save-Data" keeps the still.
// Markup: <video data-ambient data-src="…mp4" poster="…" muted loop playsinline preload="none"
//                data-pause-l="Pause film" data-play-l="Play film"></video> inside a positioned frame.
const KEY = "ip.film.paused";
const PAUSE = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8zM13 5h3v14h-3z"/></svg>`;
const PLAY = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>`;
const gestures = ["touchstart", "pointerdown", "scroll", "keydown", "wheel"];

const userPaused = () => { try { return sessionStorage.getItem(KEY) === "1"; } catch { return false; } };
const setUserPaused = (on: boolean) => { try { on ? sessionStorage.setItem(KEY, "1") : sessionStorage.removeItem(KEY); } catch { /* private mode */ } };

function wire(v: HTMLVideoElement) {
  if (v.dataset.ambientOn) return;
  v.dataset.ambientOn = "1";
  if ((navigator as any).connection?.saveData === true) return;
  v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
  v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
  const shown = () => v.classList.add("on");
  v.addEventListener("playing", shown);
  const load = () => { if (v.dataset.src && !v.getAttribute("src")) { v.src = v.dataset.src; v.preload = "auto"; } };
  let visible = false, waiting = false;
  const kick = () => { if (!visible || userPaused()) return; v.play().then(() => { waiting = false; gestures.forEach((g) => removeEventListener(g, kick)); }).catch(() => {}); };
  const play = () => {
    if (userPaused()) return;
    load();
    v.play().then(shown).catch(() => { if (!waiting) { waiting = true; gestures.forEach((g) => addEventListener(g, kick, { passive: true })); } });
  };

  // The quiet pause control, bottom right of the film's frame.
  // The control goes where the page asks (data-ctl-host, a selector), else in the film's own frame.
  const frame = (v.dataset.ctlHost && document.querySelector<HTMLElement>(v.dataset.ctlHost)) || v.parentElement;
  if (frame && !frame.querySelector(":scope > .film-ctl")) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "film-ctl";
    const label = () => { const p = userPaused(); b.innerHTML = p ? PLAY : PAUSE; b.setAttribute("aria-label", (p ? v.dataset.playL : v.dataset.pauseL) || (p ? "Play" : "Pause")); b.setAttribute("aria-pressed", String(p)); };
    b.addEventListener("click", (e) => { e.stopPropagation(); const p = !userPaused(); setUserPaused(p); if (p) v.pause(); else play(); label(); });
    label();
    frame.appendChild(b);
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((es) => es.forEach((x) => { visible = x.isIntersecting; if (visible) play(); else v.pause(); }), { rootMargin: "120px 0px" }).observe(v);
  } else { visible = true; play(); }
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && visible) play(); });
}

export function initAmbient(root: ParentNode = document) { root.querySelectorAll<HTMLVideoElement>("video[data-ambient]").forEach(wire); }

# Prompt 23 (D50): the logo set, drawn from the font itself so the files need no font installed.
# The wordmark is "Imóveis Portugal" in Playfair Display (OFL) at weight 400, outlined to paths, with our small
# deep-green square (#2F5D50) before it; the monogram is "IP" in the same face. Writes design/brand/:
#   wordmark.svg (near-black), wordmark-white.svg, wordmark-plain.svg (no square), monogram.svg (white on near-black),
#   and PNGs of each at 2x, plus avatar-1080.png for social profiles and favicon-512.png.
# Usage (repo root): python3 scripts/design/logo.py
import io, os, subprocess
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

INK, GREEN, WHITE = "#0A0A0A", "#2F5D50", "#FFFFFF"
SRC = "site/node_modules/@fontsource-variable/playfair-display/files/playfair-display-latin-wght-normal.woff2"
OUT = "design/brand"; os.makedirs(OUT, exist_ok=True)
font = TTFont(SRC); font.flavor = None
font = instancer.instantiateVariableFont(font, {"wght": 400})
gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]


def outline(text, size):
    """SVG path data for text at `size` px (baseline at y = 0, y down) and its advance width."""
    upm = font["head"].unitsPerEm; k = size / upm; x = 0; parts = []
    for ch in text:
        g = cmap[ord(ch)]
        pen = SVGPathPen(gs); gs[g].draw(pen)
        d = pen.getCommands()
        if d: parts.append(f'<path transform="translate({x:.2f} 0) scale({k:.5f} {-k:.5f})" d="{d}"/>')
        x += hmtx[g][0] * k
    return "".join(parts), x


def bounds(text, size):
    upm = font["head"].unitsPerEm; k = size / upm; x = 0; top = 0; bot = 0
    for ch in text:
        g = cmap[ord(ch)]; bp = BoundsPen(gs); gs[g].draw(bp)
        if bp.bounds: top = max(top, bp.bounds[3] * k); bot = min(bot, bp.bounds[1] * k)
        x += hmtx[g][0] * k
    return top, -bot


def svg(path, w, h, body, bg=None):
    open(os.path.join(OUT, path), "w").write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:.0f}" height="{h:.0f}" viewBox="0 0 {w:.0f} {h:.0f}">'
                                              + (f'<rect width="100%" height="100%" fill="{bg}"/>' if bg else "") + body + "</svg>\n")


S = 96; top, bot = bounds("Imóveis Portugal", S); paths, adv = outline("Imóveis Portugal", S)
sq = round(S * 0.16); gap = round(S * 0.2); pad = round(S * 0.25)
W = pad + sq + gap + adv + pad; H = pad + top + bot + pad; base = pad + top
sqy = base - S * 0.36 - sq / 2
for name, col, mark in [("wordmark.svg", INK, True), ("wordmark-white.svg", WHITE, True), ("wordmark-plain.svg", INK, False)]:
    x0 = pad + (sq + gap if mark else 0)
    sqr = f'<rect x="{pad}" y="{sqy:.1f}" width="{sq}" height="{sq}" fill="{GREEN if col == INK else "#9CC4B6"}"/>' if mark else ""
    svg(name, W - (0 if mark else sq + gap), H, sqr + f'<g fill="{col}" transform="translate({x0:.1f} {base:.1f})">{paths}</g>')
# Monogram: "IP" centred on a near-black square, the green square as the full stop.
M = 1000; ms = 520; mt, mb = bounds("IP", ms); mp, madv = outline("IP", ms); ss = 70
mx = (M - madv - ss * 1.4) / 2; my = (M + mt - mb) / 2
svg("monogram.svg", M, M, f'<g fill="{WHITE}" transform="translate({mx:.1f} {my:.1f})">{mp}</g><rect x="{mx + madv + ss * 0.4:.1f}" y="{my - ss:.1f}" width="{ss}" height="{ss}" fill="#9CC4B6"/>', bg=INK)

# PNGs through Chromium (the same renderer as every other image we make).
pngs = [("wordmark.svg", "wordmark-2x.png", None), ("wordmark-white.svg", "wordmark-white-on-black-2x.png", INK), ("wordmark-plain.svg", "wordmark-plain-2x.png", None),
        ("monogram.svg", "avatar-1080.png", None), ("monogram.svg", "favicon-512.png", None)]
js = "const { chromium } = require('" + subprocess.run(["node", "-p", "require.resolve('playwright', { paths: ['site'] })"], capture_output=True, text=True).stdout.strip() + "');(async()=>{const b=await chromium.launch();const p=await b.newPage();for(const [src,out,bg,sz] of " + \
     str([[os.path.abspath(os.path.join(OUT, a)), os.path.abspath(os.path.join(OUT, b)), c or "transparent", 1080 if "avatar" in b else 512 if "favicon" in b else 0] for a, b, c in pngs]) + \
     "){const svg=require('fs').readFileSync(src,'utf8');const m=svg.match(/width=\"(\\d+)\" height=\"(\\d+)\"/);let w=+m[1],h=+m[2],s=2;if(sz){s=sz/w;}await p.setViewportSize({width:Math.round(w),height:Math.round(h)});await p.setContent(`<style>html,body{margin:0;background:${bg}}svg{display:block}</style>`+svg);await p.screenshot({path:out,omitBackground:bg==='transparent',scale:'device',clip:{x:0,y:0,width:w,height:h}}).catch(()=>0);}await b.close();})()"
# deviceScaleFactor is fixed per page, so draw each PNG on its own page at its own scale.
js = js.replace("const p=await b.newPage();for(const [src,out,bg,sz] of", "for(const [src,out,bg,sz] of").replace("let w=+m[1],h=+m[2],s=2;if(sz){s=sz/w;}await p.setViewportSize", "let w=+m[1],h=+m[2],s=2;if(sz){s=sz/w;}const p=await b.newPage({deviceScaleFactor:s});await p.setViewportSize")
subprocess.run(["node", "-e", js], check=True)
print("logo set in", OUT, sorted(os.listdir(OUT)))

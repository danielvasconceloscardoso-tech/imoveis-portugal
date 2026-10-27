"""Map v3 assets (prompt 36), all self-hosted so the live map needs no third-party tiles:

1. Terrain: AWS Terrain Tiles (terrarium encoding) for mainland Portugal, z5-z10, re-encoded as lossless WebP
   -> site/public/tiles/dem/{z}/{x}/{y}.webp  (relief, hillshade). Source: https://registry.opendata.aws/terrain-tiles/
   (SRTM, GMTED, ETOPO1, EU-DEM among others; attribution "Terrain Tiles: Mapzen / AWS Open Data").
2. Sea: a depth-tinted base for the view (z5-z8), from the same tiles (bathymetry under the sea), land left transparent
   -> site/public/tiles/sea/{z}/{x}/{y}.webp
3. Night: NASA Black Marble 2016 (VIIRS_Black_Marble, NASA GIBS, public domain), z5-z8
   -> site/public/tiles/night/{z}/{x}/{y}.webp
4. Insets: Madeira and the Azores are drawn moved and scaled next to the mainland (build.py INSET). Their relief and night
   lights are rendered here as two images each, in the same place -> site/public/data/map/inset-{madeira,azores}-{relief,night}.webp
   with their corner coordinates in site/public/data/map/insets.json.
Only Portugal is sculpted: the terrain outside the mainland outline (from munis.topo.json) is lowered to 0 m with a short
feathered slope, so the country reads as a relief model on a calm Atlantic. A far sea (z5-z6, wider) sits under the near one.
Usage (repo root): python3 scripts/map-data/v3_assets.py   (cached downloads in /tmp/mapv3-cache; needs node for the outline)
"""
import io, json, math, os, subprocess, time, urllib.request
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUT = "site/public"; CACHE = "/tmp/mapv3-cache"; os.makedirs(CACHE, exist_ok=True)
UA = {"User-Agent": "ImoveisPortugalMap/1.0 (ops@imoveisportugal.lu)"}
DEM = "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"
NIGHT = "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_Black_Marble/default/2016-01-01/GoogleMapsCompatible_Level8/{z}/{y}/{x}.png"
INSET = {"madeira": dict(c=(-16.95, 32.75), to=(-10.75, 37.55), s=0.5, bb=(-17.32, 32.36, -16.22, 33.16), z=10),
         "azores": dict(c=(-28.0, 38.6), to=(-11.35, 39.95), s=0.28, bb=(-31.35, 36.88, -24.95, 39.8), z=8)}

def lon2x(lon, z): return (lon + 180) / 360 * 2 ** z
def lat2y(lat, z): r = math.radians(lat); return (1 - math.asinh(math.tan(r)) / math.pi) / 2 * 2 ** z
def x2lon(x, z): return x / 2 ** z * 360 - 180
def y2lat(y, z): return math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * y / 2 ** z))))
def tiles(bb, z):
    x0, x1 = int(lon2x(bb[0], z)), int(lon2x(bb[2], z)); y0, y1 = int(lat2y(bb[3], z)), int(lat2y(bb[1], z))
    return [(x, y) for x in range(x0, x1 + 1) for y in range(y0, y1 + 1)]
def get(url):
    f = os.path.join(CACHE, url.split("//")[1].replace("/", "_"))
    if os.path.exists(f) and os.path.getsize(f) > 0: return open(f, "rb").read()
    for t in range(5):
        try: b = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60).read(); open(f, "wb").write(b); return b
        except Exception as e: print("retry", url, e); time.sleep(3 * (t + 1))
    raise SystemExit("failed " + url)
def elev(png):
    a = np.asarray(Image.open(io.BytesIO(png)).convert("RGB"), np.float32)
    return a[..., 0] * 256 + a[..., 1] + a[..., 2] / 256 - 32768
def save(img, path, lossless=False, q=82):
    os.makedirs(os.path.dirname(path), exist_ok=True); img.save(path, "WEBP", lossless=lossless, quality=100 if lossless else q, method=4 if lossless else 6)

# Sea depth ramp: shallow shelf to the deep Atlantic (prompt 36 §1.1, "a subtle depth gradient").
# Nearly flat below 1500 m, so the abyssal plain reads as calm water rather than blotches.
SEA = [(0, (210, 228, 229)), (-80, (184, 210, 214)), (-400, (150, 184, 194)), (-1500, (124, 160, 176)), (-5000, (114, 150, 168))]
def sea_rgb(e):
    out = np.zeros(e.shape + (3,), np.float32); d = np.minimum(e, 0)
    for (a, ca), (b, cb) in zip(SEA, SEA[1:]):
        m = (d <= a) & (d > b) if b != SEA[-1][0] else (d <= a)
        t = np.clip((a - d) / (a - b), 0, 1)[..., None]; out[m] = (np.array(ca) * (1 - t) + np.array(cb) * t)[m]
    return out
def blur(a, sd):
    k = np.exp(-0.5 * (np.arange(-3 * int(sd + 1), 3 * int(sd + 1) + 1) / sd) ** 2); k /= k.sum(); r = len(k) // 2
    a = np.pad(a, r, mode="edge")
    a = np.apply_along_axis(lambda v: np.convolve(v, k, "valid"), 0, a)
    return np.apply_along_axis(lambda v: np.convolve(v, k, "valid"), 1, a)
def hillshade(e, cell, az=225, alt=38, z=1.6):
    gy, gx = np.gradient(e * z, cell)
    slope = np.arctan(np.hypot(gx, gy)); aspect = np.arctan2(-gx, gy)
    a, al = math.radians(az), math.radians(alt)
    return np.clip(np.sin(al) * np.cos(slope) + np.cos(al) * np.sin(slope) * np.cos(a - aspect), 0, 1)

MAIN = (-9.75, 36.75, -6.0, 42.25); VIEW = (-14.5, 35.0, -5.0, 43.8); FAR = (-32.0, 27.5, 4.0, 47.5)
OUTLINE = json.loads(subprocess.check_output(["node", "-e", """
const {merge}=require("topojson-client"); const t=require("./public/data/map/munis.topo.json");
process.stdout.write(JSON.stringify(merge(t, t.objects.m.geometries.filter((g) => g.properties.x > -10 && g.properties.y > 36.5))));"""], cwd="site"))
def mask(z, x, y):
    """1 inside mainland Portugal, 0 outside, feathered over about 1.5 km."""
    S = 512; im = Image.new("L", (S, S), 0); d = ImageDraw.Draw(im)
    for poly in OUTLINE["coordinates"]:
        for k, ring in enumerate(poly):
            pts = [((lon2x(lo, z) - x) * S, (lat2y(la, z) - y) * S) for lo, la in ring]
            d.polygon(pts, fill=255 if k == 0 else 0)
    mpp = 40075016 * math.cos(math.radians(39.5)) / (2 ** z * S)
    im = im.filter(ImageFilter.GaussianBlur(max(0.8, 1500 / mpp))).resize((256, 256), Image.BILINEAR)
    return np.asarray(im, np.float32) / 255
n = 0
for z in range(5, 11):  # 1. terrain, mainland
    for x, y in tiles(MAIN, z):
        p = f"{OUT}/tiles/dem/{z}/{x}/{y}.webp"
        if os.path.exists(p): continue
        # The sea floor is clamped to 0 m, so the 3D terrain stays flat at sea level and the sea tiles lie on it.
        e = np.maximum(elev(get(DEM.format(z=z, x=x, y=y))), 0) * mask(z, x, y) + 32768
        r = np.floor(e / 256); g = np.floor(e - r * 256); b = np.round((e - r * 256 - g) * 256).clip(0, 255)
        save(Image.fromarray(np.dstack([r, g, b]).astype(np.uint8), "RGB"), p, lossless=True); n += 1
print("dem tiles", n)
n = 0
for name, bb, zs in (("sea", VIEW, range(5, 9)), ("seafar", FAR, range(5, 7))):  # 2. sea and 3. night lights
    for z in zs:
        for x, y in tiles(bb, z):
            e = elev(get(DEM.format(z=z, x=x, y=y)))
            # The real islands are drawn elsewhere (the insets), so at their true place there is only sea.
            lon = np.array([x2lon(x + (i + .5) / 256, z) for i in range(256)])[None, :].repeat(256, 0)
            e = np.where(lon < -11.5, np.minimum(e, -50), e)
            sm = blur(np.minimum(e, 0), 2.5)
            rgb = sea_rgb(sm); alpha = np.where(e < 2, 255, 0).astype(np.uint8)
            save(Image.fromarray(np.dstack([rgb.astype(np.uint8), alpha]), "RGBA"), f"{OUT}/tiles/{name}/{z}/{x}/{y}.webp", q=80)
            nn = "night" if name == "sea" else "nightfar"
            try: nb = get(NIGHT.format(z=z, x=x, y=y)); save(Image.open(io.BytesIO(nb)).convert("RGB"), f"{OUT}/tiles/{nn}/{z}/{x}/{y}.webp", q=80)
            except SystemExit: pass
            n += 1
print("sea/night tiles", n)

meta = {}
for name, t in INSET.items():  # 4. island panels, rendered in lon/lat then placed where build.py draws the islands
    bb, z = t["bb"], t["z"]; W = 1400 if name == "madeira" else 1600; H = int(W * (bb[3] - bb[1]) / (bb[2] - bb[0]) / math.cos(math.radians((bb[1] + bb[3]) / 2)))
    lons = np.linspace(bb[0], bb[2], W); lats = np.linspace(bb[3], bb[1], H)
    E = np.zeros((H, W), np.float32); N = np.zeros((H, W, 3), np.float32)
    cacheT, cacheN = {}, {}
    for zz, src, store, fn in ((z, DEM, cacheT, elev), (8, NIGHT, cacheN, lambda b: np.asarray(Image.open(io.BytesIO(b)).convert("RGB"), np.float32))):
        fx = np.array([lon2x(v, zz) for v in lons]); fy = np.array([lat2y(v, zz) for v in lats])
        tx, ty = fx.astype(int), fy.astype(int); px = ((fx - tx) * 256).astype(int).clip(0, 255); py = ((fy - ty) * 256).astype(int).clip(0, 255)
        for j in range(H):
            for X in np.unique(tx):
                cols = np.where(tx == X)[0]; key = (X, ty[j])
                if key not in store: store[key] = fn(get(src.format(z=zz, x=X, y=ty[j])))
                if src is DEM: E[j, cols] = store[key][py[j], px[cols]]
                else: N[j, cols] = store[key][py[j], px[cols]]
    cell = (bb[2] - bb[0]) / W * 111320 * math.cos(math.radians((bb[1] + bb[3]) / 2))
    # Relief as light and shadow only (like the mainland hillshade layer, which sits above the colour field).
    hs = hillshade(E, cell); land = E > 1; d = (hs - math.sin(math.radians(38)))[..., None]
    hi, lo = np.array([255, 244, 214], np.float32), np.array([52, 64, 70], np.float32)
    rgb = np.where(d > 0, hi, lo); alpha = np.where(land, np.clip(np.abs(d[..., 0]) * 1.4, 0, 0.6) * 255, 0)
    save(Image.fromarray(np.dstack([rgb.astype(np.uint8), alpha.astype(np.uint8)]), "RGBA"), f"{OUT}/data/map/inset-{name}-relief.webp", q=84)
    save(Image.fromarray(N.clip(0, 255).astype(np.uint8)), f"{OUT}/data/map/inset-{name}-night.webp", q=84)
    cx, cy = t["c"]; tx_, ty_ = t["to"]; s = t["s"]; mv = lambda lo, la: [round((lo - cx) * s + tx_, 5), round((la - cy) * s + ty_, 5)]
    meta[name] = [mv(bb[0], bb[3]), mv(bb[2], bb[3]), mv(bb[2], bb[1]), mv(bb[0], bb[1])]
json.dump(meta, open(f"{OUT}/data/map/insets.json", "w"))
print("insets", meta)

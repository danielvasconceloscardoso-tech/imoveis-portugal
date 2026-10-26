# Prompt 31 (D58): photographs that come alive in 2.5D. A slow push-in where near things move more than far ones
# (depth from depth.py), falling snow at three distances, and an optional light sweep. Nothing in the photograph
# is changed: only the camera moves over it.
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, A = 1920, 803  # the picture area of the 2.39:1 frame


def _sample(src, x, y):
    """Bilinear sample of an H×W×3 float image at float coordinates."""
    h, w = src.shape[:2]
    x = np.clip(x, 0, w - 1.001); y = np.clip(y, 0, h - 1.001)
    x0 = x.astype(np.int32); y0 = y.astype(np.int32); fx = (x - x0)[..., None]; fy = (y - y0)[..., None]
    a = src[y0, x0]; b = src[y0, x0 + 1]; c = src[y0 + 1, x0]; d = src[y0 + 1, x0 + 1]
    return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy


class Plate:
    def __init__(self, photo, depth, focus=(.5, .5), margin=1.12):
        im = Image.open(photo).convert("RGB") if isinstance(photo, str) else photo.convert("RGB")
        s = max(W * margin / im.width, A * margin / im.height)
        self.src = np.asarray(im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS), np.float32) / 255
        dp = Image.open(depth) if isinstance(depth, str) else depth
        d = np.asarray(dp.resize((self.src.shape[1], self.src.shape[0]), Image.BICUBIC), np.float32)
        self.depth = np.asarray(Image.fromarray(((d - d.min()) / (np.ptp(d) + 1e-9) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3)), np.float32) / 255
        self.c = (self.src.shape[1] * focus[0], self.src.shape[0] * focus[1])
        yy, xx = np.mgrid[0:A, 0:W].astype(np.float32); self.grid = (xx - W / 2, yy - A / 2)

    def frame(self, k, push=.06, drift=(0, 0), parallax=.7):
        """k in 0..1 along the move; push is the extra zoom on the nearest things at the end."""
        gx, gy = self.grid  # the photo is held 1:1 at the start, the frame being its central part
        d = _sample(self.depth[..., None], self.c[0] + gx, self.c[1] + gy)[..., 0]
        z = 1 + k * push * ((1 - parallax) + parallax * d)
        x = self.c[0] + gx / z + drift[0] * k * d * 40
        y = self.c[1] + gy / z + drift[1] * k * d * 40
        return Image.fromarray((np.clip(_sample(self.src, x, y), 0, 1) * 255).astype(np.uint8))


class Snow:
    """Snow at three distances: small and sharp far away, large and soft close to the lens."""
    def __init__(self, n=1100, seed=7):
        r = np.random.default_rng(seed)
        self.x = r.uniform(0, W, n); self.y = r.uniform(-40, A, n)
        self.layer = r.choice([0, 1, 2], n, p=[.62, .3, .08])
        self.ph = r.uniform(0, 6.3, n); self.sp = r.uniform(.8, 1.2, n)

    def draw(self, img, t, opacity=1.0):
        v = np.array([28, 55, 120])[self.layer] * self.sp; size = np.array([1.3, 2.4, 6.5])[self.layer]
        y = (self.y + v * t) % (A + 80) - 40; x = (self.x + np.sin(t * .7 + self.ph) * np.array([6, 14, 30])[self.layer] + t * 8) % W
        out = img.convert("RGBA")
        for L, blur, alpha in [(0, .4, .75), (1, .9, .7), (2, 3.2, .35)]:
            lay = Image.new("RGBA", img.size, (0, 0, 0, 0)); d = ImageDraw.Draw(lay)
            for xi, yi, si in zip(x[self.layer == L], y[self.layer == L], size[self.layer == L]):
                d.ellipse((xi - si, yi - si * 1.1, xi + si, yi + si * 1.1), fill=(236, 241, 248, int(255 * alpha * opacity)))
            out = Image.alpha_composite(out, lay.filter(ImageFilter.GaussianBlur(blur)))
        return out.convert("RGB")

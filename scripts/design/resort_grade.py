# Prompt 33 §1.3 (D60): one grade for every photograph on the site. Bright, warm, soft contrast, blues and greens
# slightly muted: sunlit, never neon. Writes a graded JPEG (quality 92) that site images are cut from.
# Usage: python3 scripts/design/resort_grade.py <in.jpg> <out.jpg> [strength 0..1, default 1]
import sys
import numpy as np
from PIL import Image

src, out = sys.argv[1:3]
k = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
im = Image.open(src).convert("RGB")
x = np.asarray(im, np.float32) / 255


def hsv(a):
    mx, mn = a.max(-1), a.min(-1); d = mx - mn
    h = np.zeros_like(mx); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = d > 1e-6
    rr = m & (mx == r); gg = m & (mx == g) & ~rr; bb = m & ~rr & ~gg
    h[rr] = ((g - b)[rr] / d[rr]) % 6; h[gg] = (b - r)[gg] / d[gg] + 2; h[bb] = (r - g)[bb] / d[bb] + 4
    return h * 60, np.where(mx > 0, d / np.maximum(mx, 1e-6), 0), mx


def rgb(h, s, v):
    c = v * s; hp = h / 60; xx = c * (1 - np.abs(hp % 2 - 1)); z = np.zeros_like(h)
    i = np.floor(hp).astype(int) % 6
    r = np.choose(i, [c, xx, z, z, xx, c]); g = np.choose(i, [xx, c, c, xx, z, z]); b = np.choose(i, [z, z, xx, c, c, xx])
    m = v - c
    return np.stack([r + m, g + m, b + m], -1)


y = x.copy()
# 1. Warm white balance: a touch of sun in the whites, the shadows kept neutral.
lum = y.mean(-1, keepdims=True)
y = y * (1 + k * np.array([0.035, 0.012, -0.03], np.float32) * (0.4 + 0.6 * lum))
# 2. Soft contrast with lifted blacks and gently held highlights.
y = 0.5 + (y - 0.5) * (1 - 0.12 * k)
y = 0.035 * k + y * (1 - 0.035 * k)
# 3. Brighter mid-tones.
y = np.clip(y, 0, 1) ** (1 - 0.08 * k)
# 4. Blues and greens slightly muted; everything a little calmer.
h, s, v = hsv(np.clip(y, 0, 1))
blue = np.clip(1 - np.abs(h - 210) / 45, 0, 1); green = np.clip(1 - np.abs(h - 110) / 50, 0, 1)
s = s * (1 - k * (0.22 * blue + 0.18 * green)) * (1 - 0.05 * k)
y = rgb(h, np.clip(s, 0, 1), v)
Image.fromarray((np.clip(y, 0, 1) * 255 + 0.5).astype(np.uint8)).save(out, quality=92)
print(out)

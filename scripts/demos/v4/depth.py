# Prompt 31 (D58): depth of a photograph for the 2.5D moves, with Depth Anything V2 Small (Apache 2.0, ONNX weights
# from huggingface.co/onnx-community/depth-anything-v2-small). Writes a 16-bit PNG, near = white.
# Usage: python3 scripts/demos/v4/depth.py <model.onnx> <photo> <out.png>
import sys
import numpy as np
import onnxruntime as ort
from PIL import Image

model, src, out = sys.argv[1:4]
im = Image.open(src).convert("RGB"); w, h = im.size
x = np.asarray(im.resize((518, 518), Image.BICUBIC), np.float32) / 255
x = ((x - [0.485, 0.456, 0.406]) / [0.229, 0.224, 0.225]).transpose(2, 0, 1)[None].astype(np.float32)
s = ort.InferenceSession(model, providers=["CPUExecutionProvider"])
d = s.run(None, {s.get_inputs()[0].name: x})[0].squeeze()
d = (d - d.min()) / (d.max() - d.min() + 1e-9)
Image.fromarray((d * 65535).astype(np.uint16)).resize((w, h), Image.BICUBIC).save(out)
print("depth", out, w, h)

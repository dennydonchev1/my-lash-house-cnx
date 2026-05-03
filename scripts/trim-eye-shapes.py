#!/usr/bin/env python3
"""
Trim text labels from eye-shape illustrations.

The 6 source webp files in public/images/blog/eye-shapes/ each show an eye
illustration with an EN + TH text caption ("Double eyelid / ตาสองชั้น", etc.)
at the bottom of the frame. The blog post doesn't use those captions, so
they should be cropped off.

Strategy per image (each gets its own natural tight crop):
  1. Convert to grayscale, count dark pixels per row.
  2. Identify all "cream-row runs" (consecutive rows with low darkness).
  3. The LARGEST cream run that has dark rows on BOTH sides is the gap
     between the eye/eyebrow region and the text caption block. Crop just
     below the eye = (start of that gap) + small margin.
  4. The TOP margin is the cream run starting at y=0 (it has no dark rows
     above it). Crop to (end of top margin) - small margin so the eyebrow
     gets a consistent breathing room across all images.
  5. Result preserves the eyebrow + eye + small skin margin on each side
     and discards both the top whitespace and the caption block.

Result: each image is cropped tight to "eyebrow + eye + a few px of skin".
The blog uses .prose <img> with no fixed aspect ratio, so per-image heights
are fine.
"""

from __future__ import annotations

from pathlib import Path
import sys

try:
    from PIL import Image
    import numpy as np
except ImportError as e:
    print(f"Missing dep: {e}", file=sys.stderr)
    sys.exit(1)

ROOT = Path("/Users/dennydonchev1/Downloads/my-lash-house-cnx/public/images/blog/eye-shapes")
NAMES = ["double-eyelid", "single-eyelid", "downturned", "round", "hooded", "wide-set"]

# Tuning:
DARK_THRESHOLD = 80          # pixel value < this counts as "dark"
ROW_DARK_FRAC = 0.02         # fraction of width that must be dark for a row to be "dark"
EYE_MARGIN_PX = 12           # rows kept below detected eye bottom and above eyebrow top


def _build_cream_runs(dark_per_row: np.ndarray, threshold: int):
    """Return list of (start, end_inclusive, length) for each consecutive
    run of cream rows."""
    runs = []
    run_start = None
    for y in range(len(dark_per_row)):
        is_cream = dark_per_row[y] <= threshold
        if is_cream:
            if run_start is None:
                run_start = y
        else:
            if run_start is not None:
                runs.append((run_start, y - 1, y - run_start))
                run_start = None
    if run_start is not None:
        runs.append((run_start, len(dark_per_row) - 1, len(dark_per_row) - run_start))
    return runs


def detect_eyebrow_top(img: Image.Image) -> int:
    """Return the y of the topmost dark row (top of eyebrow)."""
    arr = np.array(img.convert("L"))
    h, w = arr.shape
    threshold = max(8, int(w * ROW_DARK_FRAC))
    dark_per_row = np.sum(arr < DARK_THRESHOLD, axis=1)
    for y in range(h):
        if dark_per_row[y] > threshold:
            return y
    return 0


def detect_eye_bottom(img: Image.Image) -> int:
    """Find the bottom of the eye region. The eye-to-text gap is reliably
    the LONGEST cream-row run that has dark rows on BOTH sides — that
    filter excludes the top margin (no dark above) and the bottom margin
    (no dark below the trailing text)."""
    arr = np.array(img.convert("L"))
    h, w = arr.shape
    threshold = max(8, int(w * ROW_DARK_FRAC))
    dark_per_row = np.sum(arr < DARK_THRESHOLD, axis=1)
    runs = _build_cream_runs(dark_per_row, threshold)

    # Keep only runs sandwiched between dark rows. Excludes top margin
    # (darkAbove == 0) and bottom margin (darkBelow == 0).
    candidates = []
    for start, end, length in runs:
        dark_above = int(np.sum(dark_per_row[:start]))
        dark_below = int(np.sum(dark_per_row[end + 1 :]))
        if dark_above > 0 and dark_below > 0:
            candidates.append((start, end, length))

    if not candidates:
        return h - 1

    # The longest sandwiched gap is the eye-to-text gap.
    longest = max(candidates, key=lambda r: r[2])
    eye_bottom = longest[0] - 1  # last dark row before the gap
    return eye_bottom


def main():
    print(f"Processing {len(NAMES)} images in {ROOT}\n")
    for name in NAMES:
        path = ROOT / f"{name}.webp"
        img = Image.open(path)
        eye_top = detect_eyebrow_top(img)
        eye_bottom = detect_eye_bottom(img)
        crop_top = max(0, eye_top - EYE_MARGIN_PX)
        crop_bottom = min(img.height, eye_bottom + EYE_MARGIN_PX)
        cropped = img.crop((0, crop_top, img.width, crop_bottom))
        cropped.save(path, "WEBP", quality=85, method=6)
        new_size = path.stat().st_size
        print(
            f"  {name:14s}  {img.width}x{img.height} -> "
            f"{cropped.width}x{cropped.height}  "
            f"(top={crop_top} bot={crop_bottom}, {new_size:,} bytes)"
        )


if __name__ == "__main__":
    main()

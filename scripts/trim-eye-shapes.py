#!/usr/bin/env python3
"""
Restitch eye-shape illustrations into 1:1.5 portrait frames.

Each source webp is 418x627 (already 1:1.5) with this vertical structure:
    top margin (cream)
    eyebrow      (dark)
    gap          (cream)
    eye/lashes   (dark)
    gap          (cream, large — surplus whitespace)
    EN caption   (dark, e.g. "Double eyelid")
    gap          (cream)
    TH caption   (dark, e.g. "ตาสองชั้น")
    bottom margin (cream)

Goal:
    - Keep ALL four content elements (eyebrow, eye, EN text, TH text).
    - Output at 1:1.5 portrait ratio (418 wide x 627 tall, matches source).
    - Internal gaps are aggressively compressed; freed space goes to
      symmetric top + bottom margins so the element cluster sits centered.

Algorithm:
    1. Detect dark-row spans (rows where >2% of pixels are dark) with an
       8px gap-tolerance to merge spans across small inter-letter cream rows.
       Filter spans with height < 6px (noise).
    2. Expect 4 spans per image (eyebrow, eye, EN, TH). Bail with a
       fallback if a different count comes back.
    3. Sum span heights = content_h. Target_h = 279 (418/1.5).
       Available gap budget = 279 - content_h.
    4. Distribute the gap budget across 5 gaps with weights:
            top : eyebrow-eye : eye-EN : EN-TH : bottom = 1 : 3 : 3 : 1 : 1
       (eb-eye and eye-text are the visually meaningful gaps; the others
       are minimal margins.)
    5. Stitch by keeping each dark span at native pixel size (sharpness
       preserved) and VERTICALLY RESIZING each cream gap region to its
       target height. The smooth skin-tone gradient compresses cleanly
       under LANCZOS resampling, with no visible seam between adjacent
       elements.
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

TARGET_W = 418                # output width (matches source)
TARGET_H = 627                # output height (1:1.5 portrait, matches source)
DARK_THRESHOLD = 80           # pixel value < this counts as "dark"
ROW_DARK_FRAC = 0.02          # fraction of width that must be dark for a row to count as "dark"
MERGE_GAP_TOL = 8             # cream rows ≤ this many merge two adjacent dark spans
MIN_SPAN_PX = 6               # ignore dark spans shorter than this (noise)

# Compressed internal gap sizes (px). The remaining space becomes symmetric
# top + bottom margins. gap1 keeps a bit of natural skin between eyebrow and
# lashes; gap2 (eye-to-text) is the most compressible; gap3 (EN-to-TH) is tight.
INTERNAL_GAPS = {"gap1_eb_eye": 55, "gap2_eye_text": 30, "gap3_en_th": 15}


def detect_spans(img: Image.Image) -> list[tuple[int, int]]:
    arr = np.array(img.convert("L"))
    h, w = arr.shape
    threshold = max(8, int(w * ROW_DARK_FRAC))
    dark_per_row = np.sum(arr < DARK_THRESHOLD, axis=1)
    is_dark = dark_per_row > threshold

    # Phase 1: raw consecutive-dark spans.
    raw = []
    in_span = False
    span_start = None
    for y in range(h):
        if is_dark[y]:
            if not in_span:
                span_start = y
                in_span = True
        else:
            if in_span:
                raw.append((span_start, y - 1))
                in_span = False
    if in_span:
        raw.append((span_start, h - 1))

    # Phase 2: merge spans separated by small cream gaps.
    merged: list[tuple[int, int]] = []
    for s, e in raw:
        if merged and (s - merged[-1][1] - 1) <= MERGE_GAP_TOL:
            merged[-1] = (merged[-1][0], e)
        else:
            merged.append((s, e))

    # Phase 3: drop tiny noise spans.
    return [(s, e) for s, e in merged if (e - s + 1) >= MIN_SPAN_PX]


def restitch(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    spans = detect_spans(img)
    arr = np.array(img.convert("RGB"))
    h, w = arr.shape[:2]

    if len(spans) != 4:
        # Fallback: tight crop from first dark to last dark, scale to fit.
        if not spans:
            return img.resize((target_w, target_h), Image.LANCZOS)
        top = spans[0][0]
        bot = spans[-1][1]
        cropped = img.crop((0, max(0, top - 5), img.width, min(img.height, bot + 6)))
        return cropped.resize((target_w, target_h), Image.LANCZOS)

    # 5 gap regions: top margin, gap1 (eb-eye), gap2 (eye-EN), gap3 (EN-TH), bottom margin
    gap_regions = [
        (0, spans[0][0] - 1),
        (spans[0][1] + 1, spans[1][0] - 1),
        (spans[1][1] + 1, spans[2][0] - 1),
        (spans[2][1] + 1, spans[3][0] - 1),
        (spans[3][1] + 1, h - 1),
    ]

    content_h = sum(e - s + 1 for s, e in spans)
    fixed_internal = (
        INTERNAL_GAPS["gap1_eb_eye"]
        + INTERNAL_GAPS["gap2_eye_text"]
        + INTERNAL_GAPS["gap3_en_th"]
    )
    available_for_margins = target_h - content_h - fixed_internal

    if available_for_margins < 0:
        # Content + fixed gaps don't fit; fall back to scaling the source down.
        scale = target_h / (content_h + fixed_internal)
        scaled = img.resize((target_w, int(img.height * scale)), Image.LANCZOS)
        return restitch(scaled, target_w, target_h)

    top_margin = available_for_margins // 2
    bottom_margin = available_for_margins - top_margin
    gap_sizes = [
        top_margin,
        INTERNAL_GAPS["gap1_eb_eye"],
        INTERNAL_GAPS["gap2_eye_text"],
        INTERNAL_GAPS["gap3_en_th"],
        bottom_margin,
    ]

    def resize_gap(idx: int) -> Image.Image | None:
        gs, ge = gap_regions[idx]
        gap_h = ge - gs + 1
        target = gap_sizes[idx]
        if gap_h <= 0 or target <= 0:
            return None
        gap_crop = img.crop((0, gs, w, ge + 1))
        if gap_crop.height == target:
            return gap_crop
        return gap_crop.resize((target_w, target), Image.LANCZOS)

    def crop_span(idx: int) -> Image.Image:
        s, e = spans[idx]
        return img.crop((0, s, w, e + 1))

    pieces: list[Image.Image] = []
    pieces.append(resize_gap(0))
    pieces.append(crop_span(0))
    pieces.append(resize_gap(1))
    pieces.append(crop_span(1))
    pieces.append(resize_gap(2))
    pieces.append(crop_span(2))
    pieces.append(resize_gap(3))
    pieces.append(crop_span(3))
    pieces.append(resize_gap(4))
    pieces = [p for p in pieces if p is not None]

    canvas = Image.new("RGB", (target_w, target_h), (255, 255, 255))
    y = 0
    for piece in pieces:
        canvas.paste(piece, (0, y))
        y += piece.height

    # Final guard: trim/pad to exactly target_h
    if y < target_h:
        # Repeat last piece's bottom row to pad
        last_row = canvas.crop((0, y - 1, target_w, y))
        for fill_y in range(y, target_h):
            canvas.paste(last_row, (0, fill_y))
    elif y > target_h:
        canvas = canvas.crop((0, 0, target_w, target_h))
    return canvas


def main():
    print(f"Target: {TARGET_W}x{TARGET_H} (1:1.5 portrait)\n")

    for name in NAMES:
        path = ROOT / f"{name}.webp"
        img = Image.open(path)
        spans = detect_spans(img)
        print(f"{name:14s} src={img.width}x{img.height}  spans={len(spans)}: "
              f"{[(s, e, e - s + 1) for s, e in spans]}")
        new_img = restitch(img, TARGET_W, TARGET_H)
        new_img.save(path, "WEBP", quality=85, method=6)
        size = path.stat().st_size
        print(f"               -> {new_img.width}x{new_img.height}  ({size:,} bytes)\n")


if __name__ == "__main__":
    main()

# Next Steps

## Eye-shape illustrations — replace with high-res sources

**Status:** Paused 2026-05-03.

**Current state on prod:**
- 6 illustrations at `public/images/blog/eye-shapes/*.webp`, 418×627 (1:1.5 portrait), restitched from a low-res source.
- Internal whitespace is compressed (gap1=55, gap2=30, gap3=15) but the eye still occupies only ~25% of the frame because the source artwork itself has a small eye on a large skin/cream canvas. We can't make the eye dominate without higher-res source files.

**What to do next:**
1. Get the high-resolution individual eye illustrations from the user (~1240×1240, ~1:1 ratio, eye-dominant — sample shown during the 2026-05-03 session).
2. Drop them somewhere accessible (e.g. `~/Downloads/eye-shapes-source/` or paste into chat).
3. Re-run a simpler version of `scripts/trim-eye-shapes.py`:
   - At ~1240×1240 the artwork is already eye-dominant — likely no compression needed, just normalize all 6 to the same target dims and convert to webp.
   - Pick the target ratio after seeing the new sources (1:1 square is probably correct given the sample).
4. Replace the 6 webp files; verify all per-section images on the blog page; commit + push.

**Files currently in the directory (post-restitch, 1:1.5 portrait):**
- `double-eyelid.webp` 16,422 B
- `single-eyelid.webp` 14,330 B
- `downturned.webp` 15,250 B
- `round.webp` 14,484 B
- `hooded.webp` 14,628 B
- `wide-set.webp` 14,922 B

**Other open items (not blocking):**
- Blog B (5-day retouch guarantee post) still unwritten — see `seo-reports/blog-outlines.md`.

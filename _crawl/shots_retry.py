# -*- coding: utf-8 -*-
"""Retry the pages shots.py could not capture, with a longer budget."""
import os, io, json, pathlib
from playwright.sync_api import sync_playwright
from PIL import Image
import shots as S

PROJ = S.PROJ
mf = os.path.join(PROJ, "screenshots-index.json")
data = json.load(io.open(mf, encoding="utf8"))
# _external/* are saved CSS/JS, not pages - never screenshot them
todo = [(r, e) for r, e in data["failed"] if not r.startswith("_external/")]
print("retrying %d real pages (skipping %d non-page files)"
      % (len(todo), len(data["failed"]) - len(todo)))

fixed, still = [], []
with sync_playwright() as pw:
    br = pw.chromium.launch(channel="msedge", args=["--allow-file-access-from-files"])
    ctx = br.new_context(viewport={"width": 1366, "height": 900})
    ctx.set_default_timeout(90000)
    pg = ctx.new_page()
    pg.route("**://**", lambda r: r.abort()
             if r.request.url.split(":")[0] in ("http", "https") else r.continue_())
    for rel, err in todo:
        src = os.path.join(S.SITE, rel.replace("/", os.sep))
        dst = os.path.join(S.FULL, rel.replace("/", os.sep) + ".jpg")
        tmb = os.path.join(S.THUMB, rel.replace("/", os.sep) + ".jpg")
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        os.makedirs(os.path.dirname(tmb), exist_ok=True)
        try:
            # domcontentloaded: don't wait on assets that never settle
            uri = pathlib.Path(src).resolve().as_uri()
            try:
                pg.goto(uri, wait_until="domcontentloaded", timeout=90000)
            except Exception as nav:
                # some pages self-redirect (WPML/JS) and interrupt their own
                # navigation - the document still renders, so shoot it anyway
                if "interrupted" not in repr(nav) and "ERR_ABORTED" not in repr(nav):
                    raise
                pg.wait_for_timeout(1200)
            pg.add_style_tag(content=S.HIDE_CSS)
            pg.wait_for_timeout(1800)
            h = pg.evaluate("Math.max(document.body.scrollHeight,"
                            "document.documentElement.scrollHeight)")
            h = max(400, min(int(h or 900), S.MAXH))
            pg.screenshot(path=dst, type="jpeg", quality=76,
                          clip={"x": 0, "y": 0, "width": 1366, "height": h})
            im = Image.open(dst); w, hh = im.size
            im.convert("RGB").resize((S.THUMB_W, max(1, int(hh * S.THUMB_W / w))),
                                     Image.LANCZOS).save(tmb, "JPEG", quality=70)
            fixed.append({"rel": rel, "url": "", "lang": S.lang_of(rel),
                          "title": (pg.title() or "").strip(), "height": h,
                          "shot": "pages/" + rel + ".jpg",
                          "thumb": "thumbs/" + rel + ".jpg",
                          "bytes": os.path.getsize(dst)})
            print("  fixed:", rel)
        except Exception as e:
            still.append((rel, repr(e)[:120]))
            print("  STILL FAILING:", rel, repr(e)[:80])
    br.close()

# fold the recovered pages back into the manifest
ci = json.load(io.open(os.path.join(S.ROOT, "crawl-index.json"), encoding="utf8"))
rel2url = {}
for u, p in ci["pages"].items():
    rel2url.setdefault(p["rel"], u)
for f in fixed:
    f["url"] = rel2url.get(f["rel"], "")
data["shots"].extend(fixed)
data["failed"] = still
json.dump(data, io.open(mf, "w", encoding="utf8"), ensure_ascii=False, indent=1)
print("RETRY DONE fixed=%d still_failing=%d total_shots=%d"
      % (len(fixed), len(still), len(data["shots"])))

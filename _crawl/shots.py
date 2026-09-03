# -*- coding: utf-8 -*-
"""
Screenshot every page of the local mirror (site/) with one persistent Edge.

  screenshots/pages/<same path as site/>.jpg   full-page capture
  screenshots/thumbs/<same path>.jpg           380px-wide thumbnail
  screenshots-index.csv / .json                manifest: original URL -> image
  screenshots/index.html                       browsable gallery, grouped by language
"""
import os, io, json, csv, time, traceback
from urllib.parse import urlsplit, unquote
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(ROOT)
SITE = os.path.join(PROJ, "site")
SHOTS = os.path.join(PROJ, "screenshots")
FULL = os.path.join(SHOTS, "pages")
THUMB = os.path.join(SHOTS, "thumbs")
MAXH = 9000          # don't render absurdly tall pages forever
THUMB_W = 380

# popups fire on load and would hide the actual page content
HIDE_CSS = """
[class*="sgpb"], [id*="sg-popup"], [id*="sgpb"], .sgpb-popup-overlay,
.pum-overlay, .popmake-overlay, .mfp-bg, .mfp-wrap, .fancybox-overlay,
#cookie-notice, .cookie-notice-container, .pp_overlay, div.pp_pic_holder {
  display: none !important;
}
html, body { overflow: visible !important; height: auto !important; }
"""


def rel_pages():
    out = []
    for dp, _, ns in os.walk(SITE):
        for n in ns:
            if n.lower().endswith((".html", ".htm")):
                p = os.path.join(dp, n)
                out.append(os.path.relpath(p, SITE).replace("\\", "/"))
    return sorted(out)


def lang_of(rel):
    if "lang-ar" in rel: return "ar"
    if "lang-en" in rel: return "en"
    return "fr"


def main():
    idx_path = os.path.join(ROOT, "crawl-index.json")
    rel2url = {}
    if os.path.exists(idx_path):
        ci = json.load(io.open(idx_path, encoding="utf8"))
        for u, p in ci["pages"].items():
            rel2url.setdefault(p["rel"], u)

    pages = rel_pages()
    lim = int(os.environ.get("SHOT_LIMIT", "0"))
    if lim:
        pages = pages[:lim]
    print("pages to shoot: %d" % len(pages), flush=True)
    rows, failed = [], []

    with sync_playwright() as pw:
        br = pw.chromium.launch(channel="msedge", args=["--allow-file-access-from-files"])
        ctx = br.new_context(viewport={"width": 1366, "height": 900},
                             device_scale_factor=1, ignore_https_errors=True)
        ctx.set_default_timeout(30000)
        pg = ctx.new_page()
        # never wait on the network for dead third parties
        pg.route("**://**", lambda r: r.abort()
                 if urlsplit(r.request.url).scheme in ("http", "https") else r.continue_())

        for i, rel in enumerate(pages, 1):
            src = os.path.join(SITE, rel.replace("/", os.sep))
            dst = os.path.join(FULL, rel.replace("/", os.sep) + ".jpg")
            tmb = os.path.join(THUMB, rel.replace("/", os.sep) + ".jpg")
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            os.makedirs(os.path.dirname(tmb), exist_ok=True)
            url = "file:///" + src.replace("\\", "/")
            try:
                pg.goto(url, wait_until="load", timeout=25000)
                pg.add_style_tag(content=HIDE_CSS)
                pg.wait_for_timeout(700)
                h = pg.evaluate("Math.max(document.body.scrollHeight,"
                                "document.documentElement.scrollHeight)")
                h = max(400, min(int(h or 900), MAXH))
                pg.set_viewport_size({"width": 1366, "height": min(h, 2000)})
                pg.wait_for_timeout(250)
                pg.screenshot(path=dst, type="jpeg", quality=76,
                              clip={"x": 0, "y": 0, "width": 1366, "height": h})
                im = Image.open(dst)
                w, hh = im.size
                im.convert("RGB").resize((THUMB_W, max(1, int(hh * THUMB_W / w))),
                                         Image.LANCZOS).save(tmb, "JPEG", quality=70)
                title = (pg.title() or "").strip()
                rows.append({"rel": rel, "url": rel2url.get(rel, ""),
                             "lang": lang_of(rel), "title": title,
                             "height": h,
                             "shot": "pages/" + rel + ".jpg",
                             "thumb": "thumbs/" + rel + ".jpg",
                             "bytes": os.path.getsize(dst)})
            except Exception as e:
                failed.append((rel, repr(e)[:120]))
            if i % 10 == 0 or i == len(pages):
                print("  %d/%d  ok=%d failed=%d" % (i, len(pages), len(rows),
                                                    len(failed)), flush=True)
        br.close()

    json.dump({"shots": rows, "failed": failed},
              io.open(os.path.join(PROJ, "screenshots-index.json"), "w", encoding="utf8"),
              ensure_ascii=False, indent=1)
    with io.open(os.path.join(PROJ, "screenshots-index.csv"), "w",
                 encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow(["lang", "title", "original_url", "screenshot", "page_file"])
        for r in sorted(rows, key=lambda x: (x["lang"], x["rel"])):
            w.writerow([r["lang"], r["title"], r["url"],
                        "screenshots/" + r["shot"], "site/" + r["rel"]])
    print("DONE ok=%d failed=%d" % (len(rows), len(failed)))
    for r, e in failed[:10]:
        print("  FAIL", r, e)


if __name__ == "__main__":
    main()

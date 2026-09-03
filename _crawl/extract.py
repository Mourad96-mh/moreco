# -*- coding: utf-8 -*-
"""
Turn the raw/ HTML mirror into clean, rebuild-ready content:

  content/<lang>/<slug>.md   front-matter + Markdown body
  content/<lang>/<slug>.html cleaned inner HTML (keeps tables/formatting)
  content-index.json         every page: url, lang, title, meta, images, translations
  content-index.csv          same, spreadsheet-friendly for the client
"""
import os, re, io, json, csv, hashlib
from urllib.parse import urlsplit, unquote
from bs4 import BeautifulSoup
from markdownify import markdownify as md

ROOT = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(ROOT)
RAW  = os.path.join(PROJ, "raw")
OUT  = os.path.join(PROJ, "content")

# chrome that is never page content
DROP_SEL = ("script,style,noscript,"
            ".tw_post_sharebox,.twitter_share,.tw-top-bar,.tw-menu-container,"
            ".tw-breadcrumb,.tw-logo,.sociallinkswidget-3,"
            "#comments,.comments-area,#respond,.pagination,"
            ".sidebar,.right-sidebar,.switcher,.show-mobile-menu,"
            ".mobile-menu-text,.mobile-menu-icon,.menu-sitemap-fr-container,"
            "header,footer,nav")
# candidates, richest-text wins (the theme uses a different shell per template)
CAND_SEL = ("div.span9.content-right", "section.main", "div.entry-content",
            "div.post-content", "article", ".post", "div.span9", "#content")

def slugify(s, fallback="page"):
    s = unquote(s).strip("/").replace("/", "-")
    s = re.sub(u"[<>:\"|?*\\]|[\x00-\x1f]", "", s)
    return (s or fallback)[:80]


def detect_lang(soup, relpath):
    if "lang-ar" in relpath: return "ar"
    if "lang-en" in relpath: return "en"
    h = soup.find("html")
    code = (h.get("lang") or "").lower() if h else ""
    if code.startswith("ar"): return "ar"
    if code.startswith("en"): return "en"
    return "fr"


def meta(soup, **kw):
    for k, v in kw.items():
        t = soup.find("meta", attrs={k.replace("_", ":"): v})
        if t and t.get("content"):
            return t["content"].strip()
    return ""



def page_type(url, relpath):
    import re as _re
    p = (urlsplit(url).path if url else "/" + relpath).lower()
    if p in ("/", "") or relpath.startswith("index"):
        return "home"
    if _re.search(r'/(tag|category|research_cat)/', p):     return "taxonomy"
    if _re.search(r'/(author)/', p):                        return "author"
    if _re.search(r'^/20\d\d(/|$)', p):                     return "archive"
    return "page"


def extract(path):
    rel = os.path.relpath(path, RAW).replace("\\", "/")
    html = io.open(path, encoding="utf8", errors="replace").read()
    soup = BeautifulSoup(html, "html.parser")

    canon = soup.find("link", rel="canonical")
    url = canon["href"].strip() if canon and canon.get("href") else ""
    if not url:
        url = meta(soup, property="og:url")

    lang = detect_lang(soup, rel)
    title = soup.title.get_text(strip=True) if soup.title else ""

    desc = ""
    t = soup.find("meta", attrs={"name": "description"})
    if t and t.get("content"):
        desc = t["content"].strip()
    if not desc:
        desc = meta(soup, property="og:description")

    # WPML alternate-language links = the translation map
    trans = {}
    for l in soup.find_all("link", rel="alternate"):
        hl, hr = l.get("hreflang"), l.get("href")
        if hl and hr:
            trans[hl.lower()[:2]] = hr

    # strip chrome from the whole document first, then keep the richest block
    for bad in soup.select(DROP_SEL):
        bad.decompose()
    body = soup.body or soup
    node, best = body, len(body.get_text(" ", strip=True))
    for sel in CAND_SEL:
        for cand in soup.select(sel):
            n = len(cand.get_text(" ", strip=True))
            # prefer a tighter block unless it loses real content
            if n > 120 and n >= best * 0.55:
                node, best = cand, max(best, n)
                break
        else:
            continue
        break

    h1 = node.find(["h1", "h2"])
    heading = h1.get_text(strip=True) if h1 else ""

    imgs, docs = [], []
    for im in node.find_all("img"):
        src = im.get("src") or im.get("data-src") or im.get("data-lazy-src")
        if src:
            imgs.append({"src": src.strip(), "alt": (im.get("alt") or "").strip()})
    for a in node.find_all("a", href=True):
        if re.search(r'\.(pdf|docx?|xlsx?|pptx?|zip)(\?|$)', a["href"], re.I):
            docs.append({"href": a["href"].strip(),
                         "text": a.get_text(strip=True)[:120]})

    body_html = node.decode_contents()
    body_md = md(body_html, heading_style="ATX", strip=["script", "style"])
    body_md = re.sub(r'\n{3,}', "\n\n", body_md).strip()
    text = node.get_text(" ", strip=True)

    return {"file": rel, "url": url, "lang": lang, "title": title,
            "type": page_type(url, rel),
            "description": desc, "heading": heading, "translations": trans,
            "images": imgs, "documents": docs, "chars": len(text),
            "body_md": body_md, "body_html": body_html}


def main():
    rows, skipped = [], 0
    for dirpath, _, names in os.walk(RAW):
        for n in names:
            if not n.lower().endswith((".html", ".htm")):
                continue
            p = os.path.join(dirpath, n)
            try:
                r = extract(p)
            except Exception as e:
                skipped += 1
                print("  ! %s -> %r" % (n, e)[:160])
                continue
            if r["chars"] < 40:          # empty shell, nothing to rebuild from
                skipped += 1
                continue
            rows.append(r)

    # de-dupe identical bodies reached via several URLs
    seen, uniq = {}, []
    for r in rows:
        k = (r["lang"], hashlib.md5(r["body_md"].encode("utf8")).hexdigest())
        if k in seen:
            seen[k]["also_at"].append(r["url"] or r["file"])
            continue
        r["also_at"] = []
        seen[k] = r
        uniq.append(r)

    for r in uniq:
        base = r["url"] and urlsplit(r["url"]).path or r["file"]
        slug = slugify(base) or "index"
        sub = "pages" if r["type"] in ("home", "page") else "listings"
        d = os.path.join(OUT, r["lang"], sub)
        os.makedirs(d, exist_ok=True)
        fm = ["---",
              "title: %s" % json.dumps(r["title"], ensure_ascii=False),
              "url: %s" % json.dumps(r["url"], ensure_ascii=False),
              "lang: %s" % r["lang"],
              "description: %s" % json.dumps(r["description"], ensure_ascii=False),
              "source_file: %s" % r["file"],
              "images: %d" % len(r["images"]),
              "---", ""]
        io.open(os.path.join(d, slug + ".md"), "w", encoding="utf8").write(
            "\n".join(fm) + r["body_md"] + "\n")
        io.open(os.path.join(d, slug + ".html"), "w", encoding="utf8").write(
            r["body_html"])
        r["slug"] = slug

    os.makedirs(OUT, exist_ok=True)
    idx = [{k: v for k, v in r.items() if k not in ("body_md", "body_html")}
           for r in uniq]
    io.open(os.path.join(PROJ, "content-index.json"), "w", encoding="utf8").write(
        json.dumps(idx, ensure_ascii=False, indent=1))

    with io.open(os.path.join(PROJ, "content-index.csv"), "w", encoding="utf-8-sig",
                 newline="") as f:
        w = csv.writer(f)
        w.writerow(["lang", "type", "url", "title", "description", "heading",
                    "chars", "images", "documents", "slug", "source_file"])
        for r in sorted(uniq, key=lambda x: (x["lang"], x["url"])):
            w.writerow([r["lang"], r["type"], r["url"], r["title"], r["description"],
                        r["heading"], r["chars"], len(r["images"]),
                        len(r["documents"]), r["slug"], r["file"]])

    by = {}
    for r in uniq:
        by[r["lang"]] = by.get(r["lang"], 0) + 1
    print("pages kept: %d  (skipped %d)" % (len(uniq), skipped))
    print("by language:", by)


if __name__ == "__main__":
    main()

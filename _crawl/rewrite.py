# -*- coding: utf-8 -*-
"""
Phase 3: build a BROWSABLE offline copy in site/ .

Reads crawl-index.json (written by mirror.py), copies every raw/ page into
site/ and rewrites href/src/srcset/CSS-url() to relative local paths, so the
mirror opens by double-clicking site/index.html with no web server.
"""
import os, io, re, json
from urllib.parse import urljoin, urlsplit, urlunsplit, unquote

ROOT = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(ROOT)
RAW  = os.path.join(PROJ, "raw")
SITE = os.path.join(PROJ, "site")
HOST = "moreco.ma"

idx = json.load(io.open(os.path.join(ROOT, "crawl-index.json"), encoding="utf8"))
pages, assets = idx["pages"], idx["assets"]


def norm(url):
    u = urlsplit(url)
    netloc = u.netloc.lower()
    if netloc.startswith("www."):
        netloc = netloc[4:]
    q = u.query
    if q:
        keep = [kv for kv in q.split("&")
                if kv.split("=")[0] in ("lang", "ver", "v", "p", "page_id", "cat", "paged")]
        q = "&".join(keep)
    return urlunsplit((u.scheme or "https", netloc, u.path or "/", q, ""))


def key(url):
    """Lookup key: scheme-agnostic, percent-decoded, trailing-slash-insensitive."""
    u = urlsplit(norm(url))
    host = u.netloc.lower()
    path = unquote(u.path).rstrip("/")
    q = ("?" + u.query) if u.query else ""
    return host + path + q


# url -> local relative path, for both pages and assets
target = {}
for u, p in pages.items():
    target.setdefault(key(u), p["rel"])
for u, rel in assets.items():
    target.setdefault(key(u), rel)

# secondary index ignoring ?ver= cache-busters, so foo.css?ver=3 still resolves
target_nq = {}
for k, v in target.items():
    target_nq.setdefault(k.split("?")[0], v)

ATTRS = ("href", "src", "data-src", "data-lazy-src", "data-original", "poster",
         "data", "data-gt-lazy-src", "data-thumb", "data-large", "data-image",
         "data-bg", "data-background", "data-retina")
attr_re = re.compile(r'\b(' + "|".join(ATTRS) + r')\s*=\s*(["\'])(.*?)\2',
                     re.I | re.S)
srcset_re = re.compile(r'\b(srcset|data-srcset)\s*=\s*(["\'])(.*?)\2', re.I | re.S)
cssurl_re = re.compile(r'url\(\s*(["\']?)([^)"\']+)\1\s*\)', re.I)


def relative(from_rel, to_rel):
    a = os.path.dirname(from_rel.replace("/", os.sep))
    r = os.path.relpath(to_rel.replace("/", os.sep), a or ".")
    return r.replace(os.sep, "/")


def map_url(raw_url, base_url, from_rel):
    v = (raw_url or "").strip()
    if not v or v.startswith(("data:", "mailto:", "tel:", "javascript:", "#")):
        return None
    absu = norm(urljoin(base_url, v))
    frag = ""
    if "#" in v:
        frag = "#" + v.split("#", 1)[1]
        absu = norm(urljoin(base_url, v.split("#", 1)[0]))
    hit = target.get(key(absu))
    if not hit:                       # ignore the ?ver= cache-buster as a last resort
        hit = target_nq.get(key(absu).split("?")[0])
    if not hit:
        return None
    return relative(from_rel, hit) + frag


def rewrite_html(text, base_url, from_rel):
    def a_sub(m):
        attr, q, val = m.group(1), m.group(2), m.group(3)
        new = map_url(val, base_url, from_rel)
        return '%s=%s%s%s' % (attr, q, new, q) if new else m.group(0)

    def s_sub(m):
        attr, q, val = m.group(1), m.group(2), m.group(3)
        out = []
        for part in val.split(","):
            part = part.strip()
            if not part:
                continue
            bits = part.split()
            new = map_url(bits[0], base_url, from_rel)
            bits[0] = new if new else bits[0]
            out.append(" ".join(bits))
        return '%s=%s%s%s' % (attr, q, ", ".join(out), q)

    def c_sub(m):
        new = map_url(m.group(2), base_url, from_rel)
        return 'url("%s")' % new if new else m.group(0)

    text = srcset_re.sub(s_sub, text)
    text = attr_re.sub(a_sub, text)
    text = cssurl_re.sub(c_sub, text)
    return text


def main():
    done = 0
    for u, p in pages.items():
        src = os.path.join(RAW, p["rel"].replace("/", os.sep))
        if not os.path.exists(src):
            continue
        html = io.open(src, encoding="utf8", errors="replace").read()
        out = rewrite_html(html, u, p["rel"])
        dst = os.path.join(SITE, p["rel"].replace("/", os.sep))
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        io.open(dst, "w", encoding="utf8").write(out)
        done += 1
    # rewrite url() inside downloaded CSS too
    def abs_only(raw_url, base_url, from_rel):
        v = (raw_url or "").strip()
        if not (v.startswith("http://") or v.startswith("https://")
                or v.startswith("//")):
            return None          # already relative -> correct as-is, and idempotent
        return map_url(v, base_url, from_rel)

    css = 0
    for u, rel in assets.items():
        if not rel.lower().endswith(".css"):
            continue
        fp = os.path.join(SITE, rel.replace("/", os.sep))
        if not os.path.exists(fp):
            continue
        txt = io.open(fp, encoding="utf8", errors="replace").read()
        io.open(fp, "w", encoding="utf8").write(
            cssurl_re.sub(
                lambda m: ('url("%s")' % abs_only(m.group(2), u, rel))
                if abs_only(m.group(2), u, rel) else m.group(0), txt))
        css += 1
    print("rewrote %d pages, %d css files -> %s" % (done, css, SITE))


if __name__ == "__main__":
    main()

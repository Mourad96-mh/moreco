# -*- coding: utf-8 -*-
"""
Mirror https://moreco.ma/ (WordPress + WPML fr/en/ar) to a local folder.

Phase 1  crawl every same-host HTML page (sitemap seeds + link discovery) -> raw/
Phase 2  download every referenced asset (css, js, img, fonts, pdf...)    -> site/
         including url() refs inside CSS, recursively; cross-origin assets too
"""
import os, re, json, time, threading
from urllib.parse import urlsplit, urljoin, unquote, urlunsplit
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor

BASE = "https://moreco.ma/"
HOST = "moreco.ma"
ROOT = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(ROOT)
SITE = os.path.join(PROJ, "site")
RAW = os.path.join(PROJ, "raw")
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")

session = requests.Session()
session.headers.update({"User-Agent": UA, "Accept-Language": "fr,en;q=0.8,ar;q=0.6"})


def fetch(url, timeout=60, tries=4):
    """GET with retries + backoff; old PHP5.6 host drops connections at random."""
    last = None
    for i in range(tries):
        try:
            r = session.get(url, timeout=timeout, allow_redirects=True)
            # 5xx is often transient on this host -> retry, but give up on 4xx
            if r.status_code >= 500 and i < tries - 1:
                last = RuntimeError("HTTP %s" % r.status_code)
                time.sleep(2 * (i + 1))
                continue
            return r
        except Exception as e:
            last = e
            time.sleep(2 * (i + 1))
    raise last

BAD = re.compile(r'[<>:"|?*\x00-\x1f]')
SKIP_PATH = re.compile(r'^/(wp-admin|wp-login|xmlrpc)', re.I)
SKIP_QS = ("replytocom", "share=", "add-to-cart", "print=", "attachment_id")
DOC_EXT = (".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".zip", ".rar",
           ".csv", ".mp4", ".webm", ".mp3", ".svg", ".png", ".jpg", ".jpeg", ".gif",
           ".webp", ".ico", ".woff", ".woff2", ".ttf", ".eot", ".otf", ".css", ".js",
           ".json", ".xml", ".txt")


def winpath(p):
    p = os.path.abspath(p)
    return "\\\\?\\" + p if os.name == "nt" and not p.startswith("\\\\") else p


def norm(url):
    u = urlsplit(url)
    scheme = u.scheme or "https"
    netloc = u.netloc.lower()
    if netloc.startswith("www."):
        netloc = netloc[4:]
    path = u.path or "/"
    q = u.query
    if q:
        keep = [kv for kv in q.split("&")
                if kv.split("=")[0] in ("lang", "ver", "v", "p", "page_id", "cat", "paged")]
        q = "&".join(keep)
    return urlunsplit((scheme, netloc, path, q, ""))


def is_html_url(url):
    ext = os.path.splitext(urlsplit(url).path.lower())[1]
    return ext in ("", ".html", ".htm", ".php")


def local_rel(url):
    """url -> path relative to the mirror root, using real (decoded) names"""
    import hashlib
    u = urlsplit(url)
    cross = (u.netloc.lower().replace("www.", "") != HOST)
    path = unquote(u.path).lstrip("/")
    segs = [BAD.sub("_", s).strip(" .") or "_" for s in path.split("/")
            if s not in ("", ".", "..")]
    ext = os.path.splitext(segs[-1])[1].lower() if segs else ""
    html_like = ext in ("", ".html", ".htm", ".php")
    if html_like:
        if segs and ext:
            segs[-1] = os.path.splitext(segs[-1])[0]
        segs.append("index")
        ext = ".html"
    else:
        segs[-1] = os.path.splitext(segs[-1])[0]
    q = u.query
    if q and html_like:
        segs[-1] += "~" + BAD.sub("_", q).replace("&", "_").replace("=", "-")
    segs[-1] += ext
    if cross:
        segs = ["_external", BAD.sub("_", u.netloc)] + segs
    out = "/".join(segs)
    if len(out) > 160:
        head, tail = os.path.split(out)
        h = hashlib.md5(out.encode("utf8")).hexdigest()[:8]
        base, e = os.path.splitext(tail)
        out = head[:110].rstrip("/") + "/" + base[:40] + "-" + h + e
    return out


def save(relpath, data, root):
    fp = os.path.join(root, relpath.replace("/", os.sep))
    os.makedirs(os.path.dirname(fp), exist_ok=True)
    with open(winpath(fp), "wb") as f:
        f.write(data)
    return fp


pages = {}
assets = set()
failed = []
seen = set()
lock = threading.Lock()

ASSET_ATTRS = [("img", "src"), ("img", "data-src"), ("img", "data-lazy-src"),
               ("img", "data-original"), ("source", "src"), ("source", "data-src"),
               ("script", "src"), ("video", "src"), ("video", "poster"),
               ("audio", "src"), ("embed", "src"), ("object", "data"),
               ("input", "src")]


def collect(soup, base_url):
    links, ast = set(), set()
    for tag, attr in ASSET_ATTRS:
        for el in soup.find_all(tag):
            v = el.get(attr)
            if v:
                ast.add(urljoin(base_url, v.strip()))
    for el in soup.find_all(["img", "source"]):
        for a in ("srcset", "data-srcset"):
            v = el.get(a)
            if v:
                for part in v.split(","):
                    u = part.strip().split(" ")[0]
                    if u:
                        ast.add(urljoin(base_url, u))
    for el in soup.find_all("link"):
        rel = " ".join(el.get("rel") or []).lower()
        href = el.get("href")
        if href and any(k in rel for k in ("stylesheet", "icon", "preload",
                                           "apple-touch", "manifest")):
            ast.add(urljoin(base_url, href.strip()))
    for el in soup.find_all(style=True):
        for m in re.finditer(r'url\((["\']?)(.*?)\1\)', el["style"]):
            ast.add(urljoin(base_url, m.group(2).strip()))
    for el in soup.find_all("style"):
        for m in re.finditer(r'url\((["\']?)(.*?)\1\)', el.get_text() or ""):
            ast.add(urljoin(base_url, m.group(2).strip()))
    for a in soup.find_all("a", href=True):
        u = urljoin(base_url, a["href"].strip())
        if urlsplit(u).path.lower().endswith(DOC_EXT):
            ast.add(u)
        else:
            links.add(u)
    return links, ast


def crawl_page(url):
    r = fetch(url, timeout=45)
    if r.status_code != 200:
        raise RuntimeError("HTTP %s" % r.status_code)
    if "html" not in r.headers.get("Content-Type", ""):
        with lock:
            assets.add(url)
        return set()
    final = norm(r.url)
    rel = local_rel(final)
    soup = BeautifulSoup(r.content, "html.parser")
    links, ast = collect(soup, r.url)
    with lock:
        pages[final] = {"rel": rel, "url": final, "orig": url,
                        "title": (soup.title.get_text(strip=True) if soup.title else ""),
                        "bytes": len(r.content)}
        assets.update(ast)
    save(rel, r.content, RAW)
    out = set()
    for l in links:
        n = norm(l)
        u = urlsplit(n)
        if u.netloc.lower().replace("www.", "") != HOST:
            continue
        if SKIP_PATH.match(u.path) or any(k in (u.query or "") for k in SKIP_QS):
            continue
        if not is_html_url(n):
            with lock:
                assets.add(n)
            continue
        out.add(n)
    return out


def phase1(seeds):
    pending = list(dict.fromkeys(norm(s) for s in seeds))
    seen.update(pending)
    while pending:
        batch, pending = pending, []
        with ThreadPoolExecutor(max_workers=6) as ex:
            futs = {ex.submit(crawl_page, u): u for u in batch}
            for f in futs:
                u = futs[f]
                try:
                    new = f.result()
                except Exception as e:
                    failed.append((u, repr(e)[:120]))
                    continue
                for n in new:
                    with lock:
                        if n not in seen:
                            seen.add(n)
                            pending.append(n)
        print("  pages=%d queued=%d failed=%d" % (len(pages), len(pending), len(failed)),
              flush=True)


done_assets = {}


def dl_asset(url):
    if url.startswith(("data:", "mailto:", "tel:", "javascript:", "#")):
        return []
    u = urlsplit(url)
    if u.scheme not in ("http", "https"):
        return []
    rel = local_rel(url)
    fp = os.path.join(SITE, rel.replace("/", os.sep))
    if os.path.exists(winpath(fp)):
        body = open(winpath(fp), "rb").read()
    else:
        try:
            r = fetch(url, timeout=60)
            if r.status_code != 200:
                failed.append((url, "HTTP %s" % r.status_code))
                return []
            save(rel, r.content, SITE)
            body = r.content
        except Exception as e:
            failed.append((url, repr(e)[:120]))
            return []
    done_assets[norm(url)] = rel
    more = []
    if rel.lower().endswith(".css"):
        txt = body.decode("utf8", "replace")
        for m in re.finditer(r'url\((["\']?)([^)"\']+)\1\)', txt):
            v = m.group(2).strip()
            if not v.startswith("data:"):
                more.append(urljoin(url, v))
        for m in re.finditer(r'@import\s+(?:url\()?["\']([^"\')]+)', txt):
            more.append(urljoin(url, m.group(1)))
    return more


def phase2():
    todo = set(assets)
    seen_a = set()
    rounds = 0
    while todo and rounds < 6:
        rounds += 1
        batch = [u for u in todo if norm(u) not in seen_a]
        for u in batch:
            seen_a.add(norm(u))
        todo = set()
        with ThreadPoolExecutor(max_workers=10) as ex:
            for more in ex.map(dl_asset, batch):
                for m in more:
                    if norm(m) not in seen_a:
                        todo.add(m)
        print("  assets=%d next=%d failed=%d" % (len(done_assets), len(todo), len(failed)),
              flush=True)


if __name__ == "__main__":
    seeds = [BASE, BASE + "?lang=en", BASE + "?lang=ar"]
    sm = os.path.join(ROOT, "sitemap-urls.txt")
    if os.path.exists(sm):
        seeds += [l.strip() for l in open(sm, encoding="utf8") if l.startswith("http")]
    print("PHASE 1 - crawling pages")
    phase1(seeds)
    print("PHASE 2 - downloading assets (%d queued)" % len(assets))
    phase2()
    with open(os.path.join(ROOT, "crawl-index.json"), "w", encoding="utf8") as f:
        json.dump({"pages": pages, "assets": done_assets, "failed": failed},
                  f, ensure_ascii=False, indent=1)
    print("DONE pages=%d assets=%d failed=%d" % (len(pages), len(done_assets), len(failed)))

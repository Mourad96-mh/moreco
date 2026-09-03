# -*- coding: utf-8 -*-
"""Retry everything mirror.py could not fetch, slowly and one at a time."""
import io, os, json, time, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mirror import (session, norm, local_rel, save, RAW, SITE, is_html_url,
                    BeautifulSoup, collect)

ROOT = os.path.dirname(os.path.abspath(__file__))
idx = json.load(io.open(os.path.join(ROOT, "crawl-index.json"), encoding="utf8"))
failed = idx.get("failed", [])
print("retrying %d failures" % len(failed))

fixed, still, gone = [], [], []
for url, err in failed:
    ok = False
    for attempt in range(3):
        try:
            r = session.get(url, timeout=90, allow_redirects=True)
            if r.status_code == 200:
                rel = local_rel(norm(r.url))
                root = RAW if "html" in r.headers.get("Content-Type", "") else SITE
                save(rel, r.content, root)
                fixed.append((url, rel))
                ok = True
                break
            if r.status_code in (404, 410):
                gone.append((url, r.status_code))
                ok = True
                break
            time.sleep(3 * (attempt + 1))
        except Exception as e:
            time.sleep(3 * (attempt + 1))
    if not ok:
        still.append((url, err))
    print("  fixed=%d gone404=%d still=%d" % (len(fixed), len(gone), len(still)),
          end="\r", flush=True)

print()
json.dump({"fixed": fixed, "gone": gone, "still_failing": still},
          io.open(os.path.join(ROOT, "retry-report.json"), "w", encoding="utf8"),
          ensure_ascii=False, indent=1)
print("RETRY DONE fixed=%d gone(404)=%d still_failing=%d"
      % (len(fixed), len(gone), len(still)))

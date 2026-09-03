# -*- coding: utf-8 -*-
"""Build screenshots/index.html — a browsable gallery of every page snapshot."""
import os, io, json, html, collections

ROOT = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(ROOT)
SHOTS = os.path.join(PROJ, "screenshots")

data = json.load(io.open(os.path.join(PROJ, "screenshots-index.json"), encoding="utf8"))
rows = data["shots"]

# page type, same rule as extract.py, for grouping
def kind(rel, url):
    p = (url or rel).lower()
    if rel.split("/")[0].startswith("index"): return "Accueil"
    if "/tag/" in p or "/category/" in p or "/research_cat/" in p: return "Archives & listes"
    if "/author/" in p: return "Archives & listes"
    if rel[:4].isdigit(): return "Archives & listes"
    if "/research/" in p: return "Résultats / Research"
    return "Pages"

LANGS = [("fr", "Français"), ("en", "English"), ("ar", "العربية")]
KORDER = ["Accueil", "Pages", "Résultats / Research", "Archives & listes"]
groups = collections.OrderedDict()
for r in rows:
    groups.setdefault((r["lang"], kind(r["rel"], r["url"])), []).append(r)

cards = []
def korder(k):
    return KORDER.index(k) if k in KORDER else len(KORDER)


for (lang, k), items in sorted(groups.items(),
                               key=lambda x: (korder(x[0][1]),
                                              [l for l, _ in LANGS].index(x[0][0]))):
    for r in sorted(items, key=lambda x: (x["title"] or x["rel"]).lower()):
        title = html.escape(r["title"] or r["rel"])
        url = html.escape(r["url"] or "")
        cards.append(
            '<a class="card" data-lang="%s" data-kind="%s" data-q="%s" '
            'href="%s" target="_blank">'
            '<div class="shot"><img loading="lazy" src="%s" alt=""></div>'
            '<div class="meta"><div class="t">%s</div>'
            '<div class="u">%s</div>'
            '<div class="tags"><span class="lang %s">%s</span>'
            '<span class="kind">%s</span></div></div></a>'
            % (r["lang"], html.escape(k),
               html.escape(((r["title"] or "") + " " + (r["url"] or "")).lower()),
               html.escape(r["shot"]), html.escape(r["thumb"]),
               title, url or "&nbsp;", r["lang"], r["lang"].upper(), html.escape(k)))

counts = collections.Counter(r["lang"] for r in rows)
kinds = sorted({kind(r["rel"], r["url"]) for r in rows}, key=korder)

doc = """<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>moreco.ma — snapshots de toutes les pages</title>
<style>
:root{--bg:#f6f7f8;--card:#fff;--ink:#16191d;--mut:#6b7280;--line:#e4e7eb;--ac:#1a7f4b}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);
 font:14px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
header{background:#fff;border-bottom:1px solid var(--line);padding:22px 26px;
 position:sticky;top:0;z-index:5}
h1{margin:0 0 4px;font-size:19px}
.sub{color:var(--mut);font-size:13px}
.bar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:14px}
button{font:inherit;padding:6px 13px;border:1px solid var(--line);background:#fff;
 border-radius:99px;cursor:pointer;color:var(--ink)}
button.on{background:var(--ac);border-color:var(--ac);color:#fff}
input{font:inherit;padding:7px 12px;border:1px solid var(--line);border-radius:8px;
 min-width:230px;flex:1;max-width:340px}
main{padding:22px 26px;display:grid;gap:18px;
 grid-template-columns:repeat(auto-fill,minmax(280px,1fr))}
.card{background:var(--card);border:1px solid var(--line);border-radius:12px;
 overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;
 transition:box-shadow .15s,transform .15s}
.card:hover{box-shadow:0 6px 22px rgba(0,0,0,.10);transform:translateY(-2px)}
.shot{height:210px;overflow:hidden;background:#fff;border-bottom:1px solid var(--line)}
.shot img{width:100%;display:block}
.meta{padding:11px 13px 13px}
.t{font-weight:600;font-size:13.5px;line-height:1.35;
 display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.u{color:var(--mut);font-size:11.5px;margin-top:4px;word-break:break-all;
 display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden}
.tags{margin-top:9px;display:flex;gap:6px;flex-wrap:wrap}
.tags span{font-size:10.5px;padding:2px 8px;border-radius:99px;background:#eef1f4;
 color:#4b5563}
.lang.fr{background:#e6f2ec;color:#14663d}.lang.en{background:#e8eefc;color:#1e429f}
.lang.ar{background:#fdf0e4;color:#96500f}
.empty{padding:40px;color:var(--mut)}
</style></head><body>
<header>
<h1>moreco.ma — snapshot de chaque page</h1>
<div class="sub">__N__ pages capturées le 2026-08-30 · FR __FR__ · EN __EN__ · AR __AR__ ·
cliquez une vignette pour ouvrir la capture en pleine page</div>
<div class="bar">
<button class="on" data-f="all">Toutes</button>
__LANGBTN__
__KINDBTN__
<input id="q" placeholder="Rechercher un titre ou une URL…">
</div></header>
<main id="grid">
__CARDS__
</main>
<div class="empty" id="none" style="display:none">Aucune page ne correspond.</div>
<script>
var cards=[].slice.call(document.querySelectorAll('.card'));
var mode='all',val='',q=document.getElementById('q');
function apply(){
  var n=0;
  cards.forEach(function(c){
    var okF = mode==='all' ||
      (mode==='lang' && c.dataset.lang===val) ||
      (mode==='kind' && c.dataset.kind===val);
    var okQ = !q.value || c.dataset.q.indexOf(q.value.toLowerCase())>-1;
    var show = okF && okQ;
    c.style.display = show ? '' : 'none';
    if(show) n++;
  });
  document.getElementById('none').style.display = n ? 'none' : '';
}
document.querySelectorAll('button').forEach(function(b){
  b.onclick=function(){
    document.querySelectorAll('button').forEach(function(x){x.classList.remove('on')});
    b.classList.add('on');
    mode=b.dataset.f; val=b.dataset.v||'';
    apply();
  };
});
q.oninput=apply;
</script></body></html>"""

langbtn = "".join('<button data-f="lang" data-v="%s">%s (%d)</button>'
                  % (l, n, counts.get(l, 0)) for l, n in LANGS)
kindbtn = "".join('<button data-f="kind" data-v="%s">%s</button>'
                  % (html.escape(k), html.escape(k)) for k in kinds)
doc = (doc.replace("__CARDS__", "\n".join(cards))
          .replace("__LANGBTN__", langbtn).replace("__KINDBTN__", kindbtn)
          .replace("__N__", str(len(rows)))
          .replace("__FR__", str(counts.get("fr", 0)))
          .replace("__EN__", str(counts.get("en", 0)))
          .replace("__AR__", str(counts.get("ar", 0))))

io.open(os.path.join(SHOTS, "index.html"), "w", encoding="utf8").write(doc)
print("gallery written: screenshots/index.html  (%d cards)" % len(cards))

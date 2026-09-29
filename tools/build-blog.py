#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Régénère automatiquement, à partir de tools/blog-calendar.json :
- la grille de cartes entre <!-- BLOG:AUTO-START --> et <!-- BLOG:AUTO-END -->
  dans blog/index.html (TOUS les articles publiés, plus récent en premier)
  et dans index.html (les 3 derniers seulement) ;
- le bloc d'URLs entre les mêmes marqueurs dans sitemap.xml.

Usage :
  python3 tools/build-blog.py          # régénère les fichiers
  python3 tools/build-blog.py --check  # vérifie sans écrire (exit 1 si désaccord)
"""
import json
import os
import re
import sys
import xml.dom.minidom

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CALENDAR = os.path.join(ROOT, "tools", "blog-calendar.json")
DOMAIN = "https://nuisiblesecure.fr"

ICON_ARROW = (
    '<svg class="icon icon-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
    'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" '
    'focusable="false"><path d="M4.5 12h15M13.5 6l6 6-6 6"/></svg>'
)


def load_published():
    with open(CALENDAR, encoding="utf-8") as f:
        entries = json.load(f)
    pub = [e for e in entries if e.get("status") == "published"]
    pub.sort(key=lambda e: e.get("publishedAt", ""), reverse=True)
    return pub


def card_html(e):
    return (
        f'<a class="card blog-card reveal" href="/blog/{e["slug"]}/">\n'
        f'  <div class="blog-meta"><span>{e["dateLabel"]}</span><span>·</span>'
        f'<span>{e["readTime"]}</span></div>\n'
        f'  <h3>{e["cardTitle"]}</h3>\n'
        f'  <p>{e["teaser"]}</p>\n'
        f'  <span class="card-link">Lire l\'article {ICON_ARROW}</span>\n'
        f'</a>'
    )


def replace_block(path, new_inner, marker="BLOG"):
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = f"<!-- {marker}:AUTO-START -->"
    end = f"<!-- {marker}:AUTO-END -->"
    pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.S)
    if not pattern.search(html):
        raise SystemExit(f"Marqueurs {start} introuvables dans {path}")
    replacement = f"{start}\n{new_inner}\n{end}"
    new_html = pattern.sub(replacement, html, count=1)
    changed = new_html != html
    if changed:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_html)
    return changed


def sitemap_url_block(slugs):
    parts = []
    for slug in slugs:
        parts.append(
            "  <url>\n"
            f"    <loc>{DOMAIN}/blog/{slug}/</loc>\n"
            f"    <lastmod>{TODAY}</lastmod>\n"
            "    <priority>0.6</priority>\n"
            "  </url>"
        )
    return "\n".join(parts)


def main():
    global TODAY
    import datetime
    TODAY = datetime.date.today().isoformat()

    check_only = "--check" in sys.argv
    published = load_published()

    slugs_on_disk = {
        d for d in os.listdir(os.path.join(ROOT, "blog"))
        if os.path.isdir(os.path.join(ROOT, "blog", d))
    }
    missing = [e["slug"] for e in published if e["slug"] not in slugs_on_disk]
    if missing:
        raise SystemExit(f"Articles marqués publiés mais absents de /blog/ : {missing}")

    all_cards = "\n".join(card_html(e) for e in published)
    latest3_cards = "\n".join(card_html(e) for e in published[:3])
    sitemap_block = sitemap_url_block([e["slug"] for e in published])

    targets = [
        (os.path.join(ROOT, "blog", "index.html"), all_cards, "BLOG"),
        (os.path.join(ROOT, "index.html"), latest3_cards, "BLOG"),
    ]

    any_change = False
    if check_only:
        for path, inner, marker in targets:
            with open(path, encoding="utf-8") as f:
                html = f.read()
            start, end = f"<!-- {marker}:AUTO-START -->", f"<!-- {marker}:AUTO-END -->"
            current = re.search(re.escape(start) + r"(.*?)" + re.escape(end), html, re.S)
            if current is None or current.group(1).strip() != inner.strip():
                print(f"DESACCORD: {path}")
                any_change = True
        with open(os.path.join(ROOT, "sitemap.xml"), encoding="utf-8") as f:
            xml_txt = f.read()
        cur = re.search(r"<!-- BLOG:AUTO-START -->(.*?)<!-- BLOG:AUTO-END -->", xml_txt, re.S)
        want_slugs = sorted(e["slug"] for e in published)
        have_slugs = sorted(re.findall(r"/blog/([a-z0-9-]+)/</loc>", cur.group(1))) if cur else []
        if want_slugs != have_slugs:
            print("DESACCORD: sitemap.xml")
            any_change = True
        if any_change:
            sys.exit(1)
        print("OK: rien à régénérer")
        return

    for path, inner, marker in targets:
        if replace_block(path, inner, marker):
            any_change = True
            print(f"régénéré: {path}")

    if replace_block(os.path.join(ROOT, "sitemap.xml"), sitemap_block, "BLOG"):
        any_change = True
        print("régénéré: sitemap.xml")

    xml.dom.minidom.parse(os.path.join(ROOT, "sitemap.xml"))

    if not any_change:
        print("Rien à changer (déjà à jour).")


if __name__ == "__main__":
    main()

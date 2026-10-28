#!/usr/bin/env python3
"""SHAZWAN© site generator: a static rebuild of the Hanza Framer template (see _teardown/TEARDOWN.md).

Content lives in content.py. Run `python3 build/build.py` and the site is written to site/.
Every page is a plain HTML file in its own folder (portfolio/motosaka/index.html ...) so links
work on GitHub Pages and from a local static server.
"""
import html, json, os, re, shutil, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(ROOT, "site")
sys.path.insert(0, HERE)
import content as C
import springs

E = html.escape

def real(*vals):
    """True when none of the values is still a content.py placeholder."""
    return not any(isinstance(v, C._PH) for v in vals)
P_BY = {p["slug"]: p for p in C.projects}
VER = "1"

# ------------------------------------------------------------------ icons
ARROW = '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M6.75 3.75 12 9l-5.25 5.25" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
CHEV = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M5.25 2.917 9.333 7 5.25 11.083" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>'
CHEV_L = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M8.75 2.917 4.667 7l4.083 4.083" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>'
PLUS = '<svg viewBox="0 0 14 14" aria-hidden="true"><path d="M7 0v14M0 7h14" stroke="currentColor" stroke-width="1.2"/></svg>'
CHECK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>'
STAR = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 .8 7.53 4.1l3.62.42-2.68 2.46.73 3.57L6 8.77l-3.2 1.78.73-3.57L.85 4.52l3.62-.42Z" fill="currentColor"/></svg>'
QUOTE = '<svg viewBox="0 0 39 34" aria-hidden="true"><path d="M0 34V20.4C0 8.9 5.4 2.1 16.2 0l1.6 4.4C12 6.2 8.9 10 8.6 15.6H17V34Zm22 0V20.4C22 8.9 27.4 2.1 38.2 0l1.6 4.4C34 6.2 30.9 10 30.6 15.6H39V34Z" fill="currentColor"/></svg>'
MAIL = '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M2.25 4.5h13.5v9H2.25zM2.25 4.5 9 10l6.75-5.5" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>'
SOCIAL = {
    "instagram": '<svg viewBox="0 0 18 18" aria-hidden="true"><rect x="2.25" y="2.25" width="13.5" height="13.5" rx="3.75" fill="none" stroke="currentColor" stroke-width="1.35"/><circle cx="9" cy="9" r="3" fill="none" stroke="currentColor" stroke-width="1.35"/><circle cx="12.9" cy="5.1" r=".9" fill="currentColor"/></svg>',
    "github": '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M9 1.5a7.5 7.5 0 0 0-2.37 14.62c.38.07.51-.16.51-.36v-1.3c-2.09.45-2.53-.89-2.53-.89-.34-.87-.84-1.1-.84-1.1-.68-.47.05-.46.05-.46.76.05 1.15.78 1.15.78.67 1.15 1.76.82 2.19.62.07-.48.26-.81.48-1-1.67-.19-3.42-.83-3.42-3.71 0-.82.29-1.49.78-2.02-.08-.19-.34-.95.07-1.98 0 0 .63-.2 2.06.77a7.1 7.1 0 0 1 3.75 0c1.43-.97 2.06-.77 2.06-.77.41 1.03.15 1.79.07 1.98.48.53.77 1.2.77 2.02 0 2.89-1.76 3.52-3.43 3.71.27.23.51.69.51 1.39v2.06c0 .2.13.44.52.36A7.5 7.5 0 0 0 9 1.5Z" fill="currentColor"/></svg>',
    "behance": '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M1.5 4.5h4.3c1.6 0 2.6.8 2.6 2.1 0 .9-.5 1.5-1.2 1.8.9.3 1.5 1 1.5 2.1 0 1.5-1.2 2.5-2.9 2.5H1.5Zm2 3.3h1.9c.6 0 1-.3 1-.9s-.4-.9-1-.9H3.5Zm0 3.6h2.1c.7 0 1.1-.4 1.1-1s-.4-1-1.1-1H3.5ZM11.3 5h4.2v1h-4.2Zm2.2 2.4c1.9 0 3 1.3 3 3.2v.4h-4.6c.1.9.7 1.4 1.6 1.4.6 0 1.1-.3 1.3-.7h1.6c-.4 1.3-1.5 2-2.9 2-1.9 0-3.2-1.3-3.2-3.2s1.3-3.1 3.2-3.1Zm1.3 2.6c-.1-.8-.6-1.3-1.3-1.3s-1.2.5-1.4 1.3Z" fill="currentColor"/></svg>',
    "linkedin": '<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M2.25 2.25h13.5v13.5H2.25Z" fill="none" stroke="currentColor" stroke-width="1.35"/><path d="M5.4 7.6v5M5.4 5.2v.1M8.2 12.6V7.6m0 2.6c0-1.5.9-2.6 2.1-2.6 1.1 0 1.8.8 1.8 2.3v2.7" fill="none" stroke="currentColor" stroke-width="1.35"/></svg>',
}

# ------------------------------------------------------------------ small components
def rel(depth):
    return "../" * depth

class Ctx:
    """Per-page render context: relative prefix for links and assets."""
    def __init__(self, depth):
        self.r = rel(depth)
    def u(self, path):            # internal page link: path like "portfolio/" or "" (home)
        return self.r + path if path else (self.r or "./")
    def img(self, name):
        return self.r + "img/" + name

def sq(cls=""):
    return '<i class="sq %s" data-pop></i>' % cls

def label(text, num=None, inverse=False, tx=True):
    n = '<span class="lbl__n">%s</span>' % E(num) if num else ""
    return '<div class="lbl%s">%s%s<span class="lbl__t">%s</span></div>' % (" lbl--inv" if inverse else "", sq(), n, E(text))

def title(lines, cls="t-h2", tag="h2", delay=".2", extra=""):
    """Two-tone Hanza title: first line(s) muted, last line full colour."""
    parts = []
    for i, l in enumerate(lines):
        parts.append('<span class="%s">%s</span>' % ("tt-m" if i == 0 and len(lines) > 1 else "tt-f", E(l)))
    return '<%s class="tt %s" data-tx="%s"%s>%s</%s>' % (tag, cls, delay, extra, "<br>".join(parts), tag)

def roll(text):
    t = E(text)
    return '<span class="roll"><span>%s</span><span aria-hidden="true">%s</span></span>' % (t, t)

def tlink(text, href, variant="", left=False, ext=False):
    """Small text link with rolling text + 24px icon box (Hanza 'Default (Right)' etc.)."""
    icon = '<span class="tl__ic">%s</span>' % (CHEV_L if left else CHEV)
    tgt = ' target="_blank" rel="noopener"' if ext else ""
    body = (icon + roll(text)) if left else (roll(text) + icon)
    return '<a class="tl %s%s" href="%s"%s>%s</a>' % (variant, " tl--left" if left else "", E(href), tgt, body)

def btn(text, href, slash=None, img=None, variant="", tag="a", ext=False, attrs=""):
    """The big 50px CTA: hidden left arrow, optional avatar, label + /slash, right arrow."""
    s = '<span class="btn__s">%s</span>' % E(slash) if slash else ""
    im = '<span class="btn__img"><img src="%s" alt="" loading="lazy"></span>' % img if img else ""
    tgt = ' target="_blank" rel="noopener"' if ext else ""
    href_attr = ' href="%s"' % E(href) if tag == "a" else ""
    return ('<%s class="btn %s"%s%s%s><span class="btn__ic btn__ic--l">%s</span>%s'
            '<span class="btn__c"><span class="btn__t">%s</span>%s</span><span class="btn__ic btn__ic--r">%s</span></%s>'
            % (tag, variant, href_attr, tgt, attrs, ARROW, im, E(text), s, ARROW, tag))

def socials_html(cls=""):
    return '<div class="socials %s">%s</div>' % (cls, "".join(
        '<a href="%s" target="_blank" rel="noopener" aria-label="%s">%s</a>' % (E(h), E(n), SOCIAL[i]) for n, h, i in C.socials))

def lines(n=5):
    return '<div class="lines" aria-hidden="true">%s</div>' % ("<i></i>" * n)

def noise(op):
    return '<div class="noise" style="opacity:%s" aria-hidden="true"></div>' % op

def dots(on, total=5, cls=""):
    return '<span class="dots %s">%s</span>' % (cls, "".join('<i class="%s"></i>' % ("on" if i < on else "") for i in range(total)))

def tx(text, delay=".2", cls="", tag="p"):
    return '<%s class="%s" data-tx="%s">%s</%s>' % (tag, cls, delay, text, tag)

def profile_card(ctx, inverse=False, sticky=False):
    """Portrait card with Get in Touch button + name / socials / profession / location."""
    return ('<div class="pcard%s">'
            '<div class="pcard__img"><img src="%s" alt="Portrait of %s" loading="lazy" data-ap="zoom12">%s</div>'
            '<div class="pcard__info"><div class="pcard__row"><div class="pcard__name">%s<span class="t-sub">%s</span></div>%s</div>'
            '<div class="pcard__meta"><div><span class="t-mono">Profession</span><span class="t-label">%s</span></div>'
            '<div><span class="t-mono">Location</span><span class="t-label">%s</span></div></div></div></div>'
            % (" pcard--inv" if inverse else "", ctx.img("portrait.jpg"), E(C.site["name"]),
               btn("Get in Touch", ctx.u("contact/"), C.site["slash"]),
               sq(), E(C.site["short_name"]), socials_html(), E(C.site["role"]), E(C.site["location"])))

def avatars(ctx, plus=None, inverse=False):
    picks = [p["image"] for p in C.projects[:4]]
    ims = "".join('<span class="av"><img src="%s" alt="" loading="lazy"></span>' % ctx.img(p) for p in picks[:3 if plus else 4])
    if plus:
        ims += '<span class="av av--plus">%s</span>' % E(plus)
    return ('<div class="proof%s"><span class="proof__av">%s</span><span class="proof__t"><span class="proof__b"><span class="t-proof">%s</span>%s</span><span class="t-mono">%s</span></span></div>'
            % (" proof--inv" if inverse else "", ims, E(C.hero["proof_bold"]), dots(4, 5, "dots--sm"), E(C.hero["proof_mono"])))

# ------------------------------------------------------------------ header / menu / footer
def header(ctx, page_label, over):
    clock = ('<div class="hdr__time"><span class="t-label hdr__clock" data-clock="%s">00:00 AM</span><span class="t-mono">Local Time</span></div>' % C.site["timezone"]) if page_label is None else \
            ('<div class="hdr__page">%s</div>' % label(page_label, inverse=over))
    return ('<header class="hdr%s" data-hdr>'
            '<div class="hdr__l"><button class="mtog" type="button" aria-expanded="false" aria-controls="menu" data-menu-toggle>'
            '<span class="mtog__dots" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="mtog__t">Menu</span></button>'
            '<i class="hdr__rule" aria-hidden="true"></i><a class="hdr__logo" href="%s" aria-label="Home">%s</a></div>'
            '<div class="hdr__m">%s</div>'
            '<div class="hdr__r">%s</div></header>'
            % (" hdr--over" if over else "", ctx.u(""), E(C.site["logo"]), clock,
               btn("Start Project", ctx.u("contact/"), C.site["slash"], ctx.img("headshot.jpg"))))

def menu(ctx):
    links = [("Home", ""), ("Portfolio", "portfolio/"), ("About", "about/"), ("Contact", "contact/"), ("Pricing", "pricing/")]
    nav = "".join('<a href="%s">%s</a>' % (ctx.u(h), roll(t)) for t, h in links)
    tiles = "".join(
        '<a class="mproj" href="%s"><img src="%s" alt="" loading="lazy"><span class="mproj__ov"></span>%s<span class="mproj__logo">%s</span></a>'
        % (ctx.u("portfolio/%s/" % s), ctx.img(P_BY[s]["image"]), noise(.15), E(P_BY[s]["client"] if P_BY[s]["kind"] == "live" else P_BY[s]["title"])) for s in C.menu_featured)
    return ('<div class="menu" id="menu" aria-hidden="true" data-menu><div class="menu__bg" data-menu-close></div>'
            '<div class="menu__panel"><div class="menu__l"><nav class="menu__nav">%s</nav>'
            '<div class="menu__me"><img src="%s" alt="" loading="lazy"><div class="menu__name">%s<span class="t-sub">%s</span></div>'
            '<span class="t-mono">%s</span>%s</div></div><div class="menu__r">%s</div></div></div>'
            % (nav, ctx.img("headshot.jpg"), sq(), E(C.site["short_name"]), E(C.site["role"]), socials_html(), tiles))

def contact_form(ctx, inverse=True):
    f = C.contact["form"]
    def field(key, name, typ):
        lab, ph = f[key]
        inp = ('<textarea name="%s" placeholder="%s" rows="5" required></textarea>' % (name, E(ph))) if typ == "textarea" else \
              ('<input type="%s" name="%s" placeholder="%s" required autocomplete="%s">' % (typ, name, E(ph), "name" if name == "name" else "email"))
        return '<label class="fld"><span class="fld__l">%s<span class="t-mono">%s</span></span>%s</label>' % (sq(), E(lab), inp)
    return ('<form class="cform" action="%s" method="POST" data-form novalidate>'
            '%s%s%s<input type="hidden" name="_subject" value="New enquiry from mhdshazwn.com"><input type="text" name="_honey" class="hp" tabindex="-1" autocomplete="off">'
            '<div class="cform__foot"><div class="cform__btn">%s</div><p class="cform__note">%s <a href="%s" target="_blank" rel="noopener">%s</a></p></div></form>'
            % (C.FORM_ENDPOINT, field("name", "name", "text"), field("email", "email", "email"), field("msg", "message", "textarea"),
               btn(f["incomplete"], "", None, variant="btn--form", tag="button", attrs=' type="submit" data-state="incomplete"'),
               E(f["note"]), E(f["note_link"][1]), E(f["note_link"][0])))

def contact_block(ctx, page=False):
    """The dark contact block: footer of every page (page=True renders the light Contact page version)."""
    c = C.contact
    t = c["page_title"] if page else c["title"]
    avail = ('<div class="avail">%s<div><span class="t-label">%s</span><span class="t-mono">%s</span></div></div>'
             % (dots(3, 5), E(C.site["availability"][0]), E(C.site["availability"][1])))
    return ('<div class="cblock__l"><div class="cblock__card">%s</div></div>'
            '<div class="cblock__r"><div class="cblock__head">%s%s'
            '<div class="cblock__sub">%s%s</div></div>%s</div>'
            % (profile_card(ctx, inverse=not page), label(C.contact["label"], inverse=not page), title(t, "t-display", "h2", ".2"),
               tx(E(c["page_desc"] if page else c["desc"]), ".3", "t-sub cblock__desc"), avail, contact_form(ctx, not page)))

def footer(ctx):
    c = C.contact
    nav = [("Home", ""), ("Portfolio", "portfolio/"), ("About", "about/"), ("Contact", "contact/"), ("Pricing", "pricing/"), ("404", "404.html")]
    navh = "".join('<a href="%s">%s</a>' % (ctx.u(h), roll(t)) for t, h in nav)
    return ('<footer class="foot sec sec--dark" data-sec>%s%s<div class="wrap foot__in">'
            '<div class="foot__grid"><div class="foot__l"><div class="foot__sticky">%s</div>'
            '<div class="foot__wm wm" aria-hidden="true"><span>%s©</span></div></div>'
            '<div class="foot__r"><div class="cblock__head">%s%s<div class="cblock__sub">%s%s</div></div>%s'
            '<i class="foot__rule"></i><div class="foot__links"><nav class="foot__nav">%s</nav>'
            '<div class="foot__contact"><p class="t-body foot__addr">%s</p>'
            '<a class="bigmail" href="mailto:%s"><span class="bigmail__roll">%s</span><i class="bigmail__line"><i></i></i></a>%s</div></div></div></div>'
            '<div class="foot__bottom"><div class="foot__credit"><img src="%s" alt="" loading="lazy"><span><span class="t-mono">%s</span><span class="t-label">%s</span></span></div>'
            '<div class="foot__copy"><span class="t-label">%s</span><span class="t-label">%s</span></div>'
            '<div class="foot__legal">%s</div></div></div></footer>'
            % (lines(), noise(.07), profile_card(ctx, inverse=True), E(C.site["wordmark"]),
               label(c["label"], inverse=True), title(c["title"], "t-display", "h2", ".2"),
               tx(E(c["desc"]), ".3", "t-sub cblock__desc"),
               '<div class="avail">%s<div><span class="t-label">%s</span><span class="t-mono">%s</span></div></div>' % (dots(3, 5), E(C.site["availability"][0]), E(C.site["availability"][1])),
               contact_form(ctx), navh, "<br>".join(E(a) for a in c["address"]), E(C.EMAIL), roll(C.EMAIL.upper()),
               tlink("Contact Me", C.MAILTO, "tl--inv tl--pri"), ctx.img("headshot.jpg"), E(c["credit"][0]), E(c["credit"][1]),
               E(c["copyright"][0]), E(c["copyright"][1]),
               "".join('<a href="%s">%s</a>' % (ctx.u(k + "/"), roll(n)) for k, n in (("terms", "Terms"), ("privacy", "Privacy Policy")) if legal_live(k))))

# ------------------------------------------------------------------ shared sections
def project_panel(ctx, p, i, heading="h3"):
    light = " panel--light" if p.get("light") else ""
    return ('<a class="panel%s" href="%s" data-kind="%s"><div class="panel__media"><div class="panel__par" data-parallax="30">'
            '<img src="%s" alt="%s website" loading="lazy"></div>%s<span class="panel__ov"></span>%s</div>'
            '<div class="panel__c"><div class="panel__top"><div class="panel__n">%s<span class="t-mono">%02d</span></div>'
            '<div class="panel__meta"><span><span class="t-mono">%s</span><%s class="t-label">%s</%s></span><span><span class="t-mono">Year</span><span class="t-label">%s</span></span></div></div>'
            '<div class="panel__bot"><div class="panel__thumb"><img src="%s" alt="" loading="lazy" data-ap="zoom12s">%s<span class="panel__btn">%s</span></div>'
            '<div class="panel__info"><div class="panel__col"><span class="panel__logo">%s</span>%s<i class="sq sq--w" data-pop></i></div>'
            '<div class="panel__col panel__svc"><span class="t-sub">%s</span><span class="t-sub">%s</span><i class="sq sq--w" data-pop></i></div></div></div></div></a>'
            % (light, ctx.u("portfolio/%s/" % p["slug"]), p["kind"], ctx.img(p["image"]), E(p["title"]), lines(), noise(.2),
               sq(), i + 1, "Client" if p["kind"] == "live" else "Type", heading, E(p["client"]), heading, E(p["year"]),
               ctx.img(p["image"]), noise(.1), btn("View Project", ctx.u("portfolio/%s/" % p["slug"]), None, tag="span", variant="btn--panel"),
               E(p["title"]), tx(E(p["caption"]), ".2", "t-sub panel__cap"), E(p["services"][0]), E(p["services"][1])))

def logos_section(ctx):
    names = [p["client"] if p["kind"] == "live" else p["title"] for p in C.projects]
    cells = "".join('<div class="logos__c"><span class="logos__name">%s</span></div>' % E(n) for n in names)
    return ('<section class="logos" data-sec><div class="wrap"><div class="logos__track"><div class="logos__row" data-ticker>%s%s</div></div></div></section>'
            % (cells, cells.replace('class="logos__c"', 'class="logos__c" aria-hidden="true"')))

def stat_card(n, lab, val, suf, copy, first=False):
    return ('<div class="scard%s"><div class="scard__top"><span class="scard__l"><span class="t-mono">%02d</span><span class="t-label">%s</span></span>%s</div>'
            '<div class="scard__b"><span class="scard__num t-stat"><span data-count="%d">0</span>%s</span>%s</div></div>'
            % (" scard--first" if first else "", n, E(lab), dots(1, 3, "dots--r"), val, E(suf), tx(E(copy), ".3", "t-body t-muted")))

def stats_cards(ctx):
    s = C.mission["stats"]
    col1 = stat_card(1, *s[0], first=True) + stat_card(2, *s[1])
    col2 = stat_card(3, *s[2], first=True) + stat_card(4, *s[3])
    return ('<div class="scards"><div class="scards__col" data-scrub="y:100"  data-scrub-ref="sec">%s</div>'
            '<div class="scards__col scards__col--2" data-scrub="y:250" data-scrub-ref="sec">%s</div></div>' % (col1, col2))

def about_section(ctx, home=True):
    head = ('<div class="about__head"><div>%s</div><span class="t-mono">%s</span></div>' % (label(C.mission["label"], "01"), E(C.site["years"])))
    return ('<section class="about sec" data-sec>%s<div class="wrap about__in"><div class="about__l">%s</div>'
            '<div class="about__r"><div class="about__top">%s<p class="t-mission about__txt" data-reveal-words>%s</p>%s</div>%s</div></div></section>'
            % (lines(), profile_card(ctx), head, E(C.mission["intro"]), stats_cards(ctx),
               ('<div class="about__next">%s%s</div>' % (label(C.work["label"], "02"), title(C.work["title"], "t-display"))) if home else ""))

def services_section(ctx, num="03"):
    s = C.services
    rows = []
    for i, (t, copy, good) in enumerate(s["items"]):
        rows.append('<div class="acc__item%s"><button class="acc__h" type="button" aria-expanded="false"><span class="acc__ti"><span class="acc__num">%s</span><span class="t-nav">%s</span></span><span class="acc__plus">%s</span></button>'
                    '<div class="acc__p"><div class="acc__in"><p class="t-body">%s</p><p class="acc__good"><span class="t-mono">Good for</span><span class="t-body">%s</span></p></div></div><i class="acc__bar"></i></div>'
                    % (" acc__item--first" if i == 0 else "", roll("%02d" % (i + 1)), E(t), PLUS, E(copy), E(good)))
    card = ('<div class="svc__card"><div class="svc__cimg"><img src="%s" alt="" loading="lazy"></div><div class="svc__cc"><span class="t-sub svc__cn">%s</span><span class="t-mono">%s</span>%s</div></div>'
            % (ctx.img("headshot.jpg"), E(C.site["first"]), E(C.site["role"]), tlink(s["card_cta"], C.MAILTO, "tl--inv tl--pri")))
    return ('<section class="svc sec sec--dark" data-sec>%s%s<div class="wrap svc__in"><div class="svc__lab">%s</div>'
            '<div class="svc__main"><div class="svc__top"><div class="svc__tt">%s%s</div><div class="svc__sp"></div>'
            '<div class="svc__contact">%s<h3 class="t-h4up svc__ct" data-tx=".2">%s</h3>%s</div></div>'
            '<div class="acc acc--dark" data-acc>%s</div></div></div></section>'
            % (lines(), noise(.07), label(s["label"], num, True), title(s["title"]), tx(E(s["desc"]), ".3", "t-sub t-muted-inv"),
               label("Contact", inverse=True), "<br>".join(E(x) for x in s["card_title"]), card, "".join(rows)))

def process_section(ctx):
    pr = C.process
    def step(i):
        eb, t, copy = pr["steps"][i]
        return ('<div class="pstep%s"><div class="pstep__top"><span class="t-num">%02d</span>%s</div><div class="pstep__b">%s<h3 class="t-card" data-tx=".2">%s</h3>%s</div></div>'
                % (" pstep--first" if i in (0, 1, 2) else "", i + 1, dots(i + 1, 5), label(eb, inverse=True), E(t), tx(E(copy), ".3", "t-body t-muted-inv")))
    c = pr["card"]
    card = ('<div class="pcta"><div class="pcta__c"><div class="pcta__t"><h3 class="t-h4up" data-tx=".2">%s</h3>%s</div>'
            '<div class="pcta__list"><span class="t-mono">%s</span>%s</div></div>%s</div>'
            % (E(c["title"]), tx(E(c["copy"]), ".3", "t-body"), E(c["list_label"]),
               "".join('<span class="pcta__li"><i>%s</i><span class="t-label">%s</span></span>' % (CHECK, E(x)) for x in c["list"]),
               btn(c["cta"], C.MAILTO, None, variant="btn--onorange")))
    return ('<section class="proc sec sec--dark" data-sec>%s%s<div class="wrap proc__in"><div class="proc__lab">%s</div>'
            '<div class="proc__main"><div class="proc__top"><div class="proc__tt">%s</div><div class="proc__desc">%s</div></div>'
            '<div class="proc__grid proc__grid--d"><div class="proc__col" data-scrub="y:100" data-scrub-ref="sec">%s%s</div>'
            '<div class="proc__col proc__col--2" data-scrub="y:225" data-scrub-ref="sec">%s%s</div>'
            '<div class="proc__col proc__col--3" data-scrub="y:350" data-scrub-ref="sec">%s%s</div></div>'
            '<div class="proc__grid proc__grid--t" aria-hidden="true"><div class="proc__col" data-scrub="y:100" data-scrub-ref="sec">%s%s%s</div>'
            '<div class="proc__col proc__col--2" data-scrub="y:225" data-scrub-ref="sec">%s%s%s</div></div>'
            '<div class="proc__grid proc__grid--p" aria-hidden="true">%s%s%s%s%s%s</div></div></div></section>'
            % (lines(), noise(.07), label(pr["label"], "04", True), title(pr["title"]), tx(E(pr["desc"]), ".3", "t-sub t-muted-inv"),
               step(0), step(3), step(1), step(4), step(2), card,
               step(0), step(2), step(4), step(1), step(3), card,
               step(0), step(1), step(2), step(3), step(4), card))

def stats_band(ctx):
    cells = "".join('<div class="sband__c"><span class="t-statxl"><span data-count="%d">0</span>%s</span>%s%s</div>'
                    % (v, E(s), label(l), tx(E(c), ".3", "t-body")) for l, v, s, c in C.stats_band)
    return '<section class="sband sec" data-sec>%s<div class="wrap sband__in">%s</div></section>' % (lines(), cells)

def case_section(ctx, num="05"):
    cs = C.case_study; p = P_BY[cs["project"]]
    stats = "".join('<div class="case__st">%s<span class="t-statsm">%s</span><span class="t-mono">%s</span>%s</div>'
                    % ('<i class="sq" data-pop></i>', E(v), E(l), tx(E(c), ".3", "t-body")) for v, l, c in cs["stats"])
    return ('<section class="case sec sec--dark" data-sec>%s<div class="case__in"><div class="case__c"><div class="case__top">%s'
            '<p class="t-quote case__q" data-tx=".2"><span>%s</span><span class="t-muted-inv">%s</span></p><span class="case__qm">%s</span></div>'
            '<div class="case__bot"><div class="case__stats">%s</div><div class="case__foot"><div class="case__au"><img src="%s" alt="" loading="lazy"><span><span class="t-sub">%s</span><span class="t-mono">%s</span></span></div>%s</div></div></div>'
            '<div class="case__media"><div class="case__img" data-scrub-to="scale:1.2;opacity:.5;y:250" data-scrub-ref="next"><img src="%s" alt="%s website" loading="lazy"></div><span class="case__logo">%s</span></div></div>%s</section>'
            % (noise(.07), label(cs["label"], num, True), E(cs["quote"][0]), E(cs["quote"][1]), QUOTE, stats, ctx.img("headshot.jpg"),
               E(cs["author"][0]), E(cs["author"][1]), tlink("See Project", ctx.u("portfolio/%s/" % p["slug"]), "tl--inv tl--pri"),
               ctx.img(p["image"]), E(p["title"]), E(p["title"]), lines()))

def pricing_section(ctx, page=False, num="06"):
    """Packages grid + custom-quote card. page=True swaps the centred section head for the inner-page hero."""
    pr = C.pricing
    def plan(pl, scrub):
        lists = "".join('<div class="plan__list"><span class="t-label plan__lh">%s</span>%s</div>'
                        % (E(h), "".join('<span class="plan__li"><i>%s</i><span class="t-body">%s</span></span>' % (CHECK, E(x)) for x in xs)) for h, xs in pl["lists"])
        pop = '<span class="plan__pop">Popular</span>' if pl.get("popular") else ""
        bv = "btn--muted" if pl["style"] == "muted" else ""
        return ('<div class="plan__col" data-scrub="y:%d" data-scrub-ref="sec"><div class="plan%s"><div class="plan__h"><div class="plan__hr">%s%s</div>'
                '<div class="plan__pr"><span class="plan__price"><span class="t-statmd">%s</span><span class="t-mono">/Project</span></span>%s</div></div>'
                '<i class="plan__rule"></i><div class="plan__b">%s<div class="plan__cta">%s<p class="plan__tl"><span class="t-mono">Project timeline:</span> <span class="t-mono t-ink">%s</span></p></div></div></div></div>'
                % (scrub, " plan--pop" if pl.get("popular") else "", label(pl["name"]), pop, E(pl["price"]), tx(E(pl["desc"]), ".3", "t-bodyl"), lists,
                   btn(pl["cta"], ctx.u("contact/"), pl["slash"], variant=bv), E(pl.get("timeline", pr["timeline"]))))
    promo = ('<div class="plan__col plan__col--promo" data-scrub="y:150" data-scrub-ref="sec"><div class="ppromo"><div class="ppromo__img"><img src="%s" alt="" loading="lazy"></div>'
             '<div class="ppromo__c">%s<h4 class="t-h5up" data-tx=".2">%s</h4>%s</div></div></div>'
             % (ctx.img("portrait.jpg"), label(pr["promo"][0], inverse=True), E(pr["promo"][1]), tlink(pr["promo"][2], C.MAILTO, "tl--inv tl--pri")))
    p = pr["plans"]
    if page:
        head = ('<div class="plist__hero pricing__phero"><div class="plist__tt">%s%s</div></div>'
                % (title(pr["title"], "t-display", "h1", ".6"), tx(E(pr["desc"]), ".65", "t-sub")))
    else:
        head = ('<div class="pricing__head">%s%s%s</div>'
                % (label(pr["label"], num), title(pr["title"], "t-h2 t-center"), tx(E(pr["desc"]), ".3", "t-sub t-center pricing__desc")))
    grid = ('<div class="pricing__grid">%s%s%s</div><div class="pricing__promo"><div></div>%s<div></div></div>'
            % (plan(p[0], 250), plan(p[1], 150), plan(p[2], 50), promo))
    if page:
        return '<section class="pricing pricing--page sec" data-sec>%s<div class="wrap">%s<div class="pricing__in">%s</div></div></section>' % (lines(), head, grid)
    return '<section class="pricing sec" data-sec>%s<div class="wrap pricing__in">%s%s</div></section>' % (lines(), head, grid)

def pricing_page():
    ctx = Ctx(1)
    main = pricing_section(ctx, page=True) + faq_section(ctx, None)
    return page(ctx, "p-pricing", "Pricing — Shazwan", C.pricing["desc"], main, False, "Pricing", "pricing/")

def faq_section(ctx, num=None):
    f = C.faq
    rows = []
    for i, (q, a) in enumerate(f["items"]):
        paras = "".join('<p class="t-body">%s</p>' % E(x) for x in a.split("\n\n"))
        rows.append('<div class="acc__item%s"><button class="acc__h" type="button" aria-expanded="%s"><span class="acc__ti"><i class="acc__sq"></i><span class="acc__num">%s</span><span class="t-nav">%s</span></span><span class="acc__plus">%s</span></button>'
                    '<div class="acc__p"><div class="acc__in">%s</div></div><i class="acc__bar"></i></div>'
                    % (" is-open" if i == 0 else "", "true" if i == 0 else "false", roll("%02d" % (i + 1)), E(q), PLUS, paras))
    return ('<section class="faq sec" data-sec id="faq">%s<div class="wrap faq__in"><div class="faq__l">%s<div class="faq__tt">%s%s</div></div>'
            '<div class="faq__r"><div class="acc acc--light" data-acc data-single>%s</div></div></div></section>'
            % (lines(), label(f["label"], num), title(f["title"]), tx(E(f["desc"]), ".3", "t-sub t-muted faq__desc"), "".join(rows)))

# ------------------------------------------------------------------ pages
def page(ctx, body_cls, title_txt, desc, main, over=True, page_label=None, canonical=""):
    return """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>%s</title>
<meta name="description" content="%s">
<link rel="canonical" href="%s/%s">
<meta name="view-transition" content="same-origin">
<link rel="icon" href="%sfavicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@500;700&family=Zalando+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="%scss/site.css?v=%s">
<script>document.documentElement.classList.add('js')</script>
</head>
<body class="%s">
<div class="blurstrip" aria-hidden="true"></div>
<div class="pg" data-page>
%s
<main>
%s
</main>
%s
</div>
%s
<script src="%sjs/lenis.min.js"></script>
<script>window.SPRINGS=%s;</script>
<script src="%sjs/site.js?v=%s"></script>
</body>
</html>
""" % (E(title_txt), E(desc), C.site["domain"], canonical, ctx.r, ctx.r, VER, body_cls, header(ctx, page_label, over), main,
       footer(ctx), menu(ctx), ctx.r, json.dumps(SPRING_CSS), ctx.r, VER)

def home_tail(ctx):
    """Case study (only once its quote is written), pricing and FAQ, numbered in order."""
    cs = C.case_study
    show_case = real(*cs["quote"], *cs["author"], *[x for st in cs["stats"] for x in st])
    n = 5
    out = ""
    if show_case:
        out += case_section(ctx, "%02d" % n); n += 1
    out += pricing_section(ctx, num="%02d" % n); n += 1
    return out + faq_section(ctx, "%02d" % n)

def home():
    ctx = Ctx(0)
    h = C.hero
    svc = "".join('<span class="hero__svc"><span class="t-mono16">%s</span><span class="t-sub">%s</span></span>' % (E(n), E(t)) for n, t in h["services"])
    hero = ('<section class="hero sec sec--dark" data-sec id="top"><div class="hero__media"><div class="hero__vid" data-scrub-to="scale:1.2;opacity:.5;y:300" data-scrub-ref="self-top">'
            '<video src="%s" poster="%s" autoplay muted loop playsinline preload="auto"></video></div>'
            '<span class="hero__ov"></span>%s%s</div><div class="hero__c"><div class="hero__row"><div class="hero__tag" data-ap="y10" data-ap-d=".3"><h1 class="t-sub t-muted-inv"><span class="t-inv">%s</span>%s</h1>%s</div>'
            '<div class="hero__list" data-ap="y10" data-ap-d=".4">%s%s</div></div>'
            '<div class="hero__row hero__row--b"><div class="hero__proof" data-ap="y10" data-ap-d=".5">%s</div><div class="hero__wm wm" data-ap="y50" data-ap-d=".3"><span>%s</span></div></div></div></section>'
            % (ctx.img("hero-tulip.mp4"), ctx.img("hero-poster.jpg"), lines(), noise(.15), E(h["lead"]), E(h["rest"]), '<i class="sq sq--w" data-pop data-pop-th=".5"></i>', svc,
               '<i class="sq sq--w" data-pop data-pop-th=".5"></i>', avatars(ctx, None, True), E(C.site["wordmark"])))
    work = ('<section class="work sec" data-sec id="work"><div class="work__hero"><div class="work__all">%s</div><div class="work__desc">%s</div></div><div class="stack" data-stack>%s</div></section>'
            % (tlink("All Projects", "portfolio/", "", left=True), tx(E(C.work["desc"]), ".3", "t-sub"),
               "".join(project_panel(ctx, p, i) for i, p in enumerate(C.projects[:C.work["home_count"]]))))
    main = (hero + logos_section(ctx) + about_section(ctx) + work + services_section(ctx) + process_section(ctx)
            + stats_band(ctx) + home_tail(ctx))
    return page(ctx, "p-home", C.site["title"], C.site["description"], main, True, None, "")

def work_card(ctx, p, n):
    """Half-width project card for the portfolio grid (same parts as the full panel, sized for two columns)."""
    return ('<a class="wcard%s" href="%s"><div class="wcard__media"><div class="wcard__par" data-parallax="20"><img src="%s" alt="%s website" loading="lazy"></div>'
            '<span class="wcard__ov"></span>%s</div><div class="wcard__c"><div class="wcard__top"><span class="wcard__n">%s<span class="t-mono">%02d</span></span>'
            '<span class="wcard__meta"><span><span class="t-mono">%s</span><span class="t-label">%s</span></span><span><span class="t-mono">Year</span><span class="t-label">%s</span></span></span></div>'
            '<div class="wcard__bot"><div class="wcard__info"><h3 class="t-h4up">%s</h3><p class="t-sub wcard__cap">%s</p><span class="t-mono wcard__svc">%s · %s</span></div>%s</div></div></a>'
            % (" wcard--light" if p.get("light") else "", ctx.u("portfolio/%s/" % p["slug"]), ctx.img(p["image"]), E(p["title"]), noise(.15),
               sq(), n, "Client" if p["kind"] == "live" else "Type", E(p["client"]), E(p["year"]), E(p["title"]), E(p["caption"]),
               E(p["services"][0]), E(p["services"][1]), btn("View Project", ctx.u("portfolio/%s/" % p["slug"]), None, tag="span", variant="btn--panel")))

def portfolio():
    """All works in one list, in content.py order: rows of two cards that stack on scroll."""
    ctx = Ctx(1)
    w = C.work
    items = C.projects
    rows = "".join('<div class="prow">%s</div>' % "".join(work_card(ctx, p, r * 2 + k + 1) for k, p in enumerate(items[r * 2:r * 2 + 2]))
                   for r in range((len(items) + 1) // 2))
    main = ('<section class="plist sec" data-sec>%s<div class="wrap plist__hero"><div class="plist__tt">%s%s</div>'
            '<div class="plist__bar"><span class="t-mono">%02d Projects</span>%s</div></div>'
            '<div class="wrap pgroups" id="work-list"><div class="pgrid" data-stack>%s</div></div></section>'
            % (lines(), title(w["title"], "t-display", "h1", ".6"), tx(E(w["desc"]), ".65", "t-sub"), len(items),
               tlink("Explore Work", "#work-list", "tl--down"), rows))
    return page(ctx, "p-portfolio", "Portfolio — Shazwan", w["desc"], main, False, "Portfolio", "portfolio/")

def project_page(p, i):
    ctx = Ctx(2)
    nxt = C.projects[(i + 1) % len(C.projects)]
    ext = btn(p["cta"], p["href"], None, variant="btn--onimg", ext=True)
    meta = ('<div class="phero__meta"><span><span class="t-mono">%s</span><span class="t-label">%s</span></span><span><span class="t-mono">Year</span><span class="t-label">%s</span></span>'
            '<span><span class="t-mono">Type</span><span class="t-label">%s</span></span></div>' % ("Client" if p["kind"] == "live" else "Brand", E(p["client"]), E(p["year"]), E(p["kind_label"])))
    hero = ('<section class="phero sec sec--dark" data-sec><div class="phero__media"><img src="%s" alt="%s website" data-ap="zoom12h">%s<span class="phero__ov"></span>%s</div>'
            '<div class="phero__c"><div class="phero__top" data-ap="y10" data-ap-d=".6">%s</div><div class="phero__bot"><div class="phero__tt" data-ap="y10" data-ap-d=".65"><h1 class="t-display">%s</h1></div>'
            '<div class="phero__desc" data-ap="y10" data-ap-d=".7"><p class="t-sub t-muted-inv">%s</p>%s</div></div></div></section>'
            % (ctx.img(p["image"]), E(p["title"]), lines(), noise(.15), meta, E(p["title"]), E(p["caption"]), ext))
    quote = ""
    if real(p["quote"], p["quote_name"], p["quote_role"]):
        quote = ('<div class="pbody__quote">%s<p class="t-lead" data-tx=".2">%s</p><div class="pbody__au"><img src="%s" alt="" loading="lazy">'
                 '<span><span class="t-sub">%s</span><span class="t-mono">%s</span></span></div></div>'
                 % ('<span class="pbody__qm">%s</span>' % QUOTE, E(p["quote"]), ctx.img("headshot.jpg"), E(p["quote_name"]), E(p["quote_role"])))
    blocks = ['<div class="pblock">%s<h2 class="t-h3" data-tx=".2">%s</h2>%s</div>'
              % (label("Overview"), E(p["caption"]), tx(E(p["story"]), ".3", "t-body t-muted") if real(p["story"]) else ""),
              '<figure class="pfig"><img src="%s" alt="%s website, home page" loading="lazy" data-ap="zoom12s"></figure>' % (ctx.img(p["image"]), E(p["title"]))]
    if real(p["approach_title"], p["approach"]):
        blocks.append('<div class="pblock">%s<h2 class="t-h3" data-tx=".2">%s</h2>%s</div>'
                      % (label("Approach"), E(p["approach_title"]), tx(E(p["approach"]), ".3", "t-body t-muted")))
    if real(p["result_title"], *[x for r in p["results"] for x in r]):
        blocks.append('<div class="pblock">%s<h2 class="t-h3" data-tx=".2">%s</h2><div class="pres">%s</div></div>'
                      % (label("Result"), E(p["result_title"]),
                         "".join('<div class="pres__c"><span class="t-statsm">%s</span><span class="t-mono">%s</span>%s</div>' % (E(v), E(l), tx(E(cp), ".3", "t-body t-muted")) for v, l, cp in p["results"])))
    body = ('<section class="pbody sec" data-sec>%s<div class="wrap pbody__in"><aside class="pbody__aside">%s</aside><div class="pbody__main">%s</div></div></section>'
            % (lines(), quote, "".join(blocks)))
    nxtsec = ('<section class="pnext sec" data-sec><div class="wrap pnext__head">%s<div class="pnext__tt">%s%s</div></div><div class="stack" data-stack>%s</div></section>'
              % (tlink("All Projects", ctx.u("portfolio/"), "", left=True), title(("Next", "Project."), "t-display"), tx(E(C.work["desc"]), ".3", "t-sub"),
                 project_panel(ctx, nxt, (i + 1) % len(C.projects))))
    return page(ctx, "p-project", "%s — Shazwan" % p["title"], p["caption"], hero + body + nxtsec, True, "Case Study", "portfolio/%s/" % p["slug"])

def about():
    ctx = Ctx(1)
    a = C.about
    hero = ('<section class="ahero sec sec--dark" data-sec><div class="ahero__c">%s%s<div class="ahero__t"><h1 class="tt t-display" data-tx=".6"><span class="tt-m">%s</span><br><span class="tt-f">%s</span></h1>'
            '%s<div class="ahero__cta">%s</div></div></div><div class="ahero__media"><img src="%s" alt="Portrait of %s" data-ap="zoom11h"><span class="ahero__ov"></span>%s'
            '<div class="ahero__wm wm" data-ap="y50" data-ap-d=".65"><span>%s</span></div></div></section>'
            % (lines(), noise(.07), E(a["hero_title"][0]), E(a["hero_title"][1]), tx(E(a["hero_desc"]), ".65", "t-sub t-muted-inv"),
               tlink("View Portfolio", ctx.u("portfolio/"), "tl--inv tl--pri"), ctx.img("portrait.jpg"), E(C.site["name"]), noise(.07), E(C.site["wordmark"])))
    body = "".join(tx(E(x), ".3", "t-body t-muted") for x in a["body"])
    story = ('<section class="astory sec" data-sec>%s<div class="wrap astory__in"><div class="astory__l">%s<div class="astory__tt">%s%s<div>%s</div></div></div>'
             '<div class="astory__r">%s<p class="t-h3 astory__lead" data-tx=".2">%s</p><div class="astory__body">%s</div></div></div></section>'
             % (lines(), label("About", "01"), title(a["title"]), tx(E(C.site["description"]), ".3", "t-sub t-muted"), tlink(a["cta"], C.MAILTO, "tl--pri"),
                label(C.mission["label"], "02"), E(a["lead"]), body))
    main = hero + logos_section(ctx) + story + stats_band(ctx) + services_section(ctx, "03")
    return page(ctx, "p-about", "About — Shazwan", a["hero_desc"], main, True, "About", "about/")

def contact_page():
    ctx = Ctx(1)
    main = ('<section class="cpage sec" data-sec>%s<div class="wrap cblock cblock--light">%s</div></section>%s'
            % (lines(), contact_block(ctx, page=True), faq_section(ctx, None)))
    return page(ctx, "p-contact", "Contact — Shazwan", C.contact["page_desc"], main, False, "Contact", "contact/")

def legal_live(key):
    return any(real(x) for x in C.legal[key][2])

def legal_page(key):
    ctx = Ctx(1)
    t1, t2, paras = C.legal[key]
    body = "".join('<p class="t-body">%s</p>' % E(x) for x in paras if real(x))
    main = ('<section class="legal sec" data-sec>%s<div class="wrap legal__in"><div class="legal__l">%s<p class="t-mono">Last updated: 2026</p></div><div class="legal__r">%s</div></div></section>'
            % (lines(), title((t1, t2), "t-display", "h1", ".6"), body))
    return page(ctx, "p-legal", "%s %s — Shazwan" % (t1, t2.rstrip(".")), "%s %s" % (t1, t2), main, False, t1, "%s/" % key)

def notfound():
    ctx = Ctx(0); ctx.r = "/"
    card = ('<div class="nf__card"><img src="%s" alt="" loading="lazy"><div class="nf__who">%s<span class="t-sub">%s</span><span class="t-mono">%s</span></div>'
            '<div class="nf__ct"><span><i class="sq"></i><span class="t-mono">Email</span><a class="t-label" href="mailto:%s">%s</a></span></div></div>'
            % (ctx.img("headshot.jpg"), "", E(C.site["short_name"]), E(C.site["role"]), E(C.EMAIL), E(C.EMAIL.upper())))
    main = ('<section class="nf sec" data-sec>%s<div class="wrap nf__in"><div class="nf__l">%s</div><div class="nf__r">%s'
            '<div class="nf__txt">%s</div>%s</div></div></section>'
            % (lines(), card, title(("Page", "Not Found."), "t-display", "h1", ".6"),
               tx('<span class="t-ink">Something went off track.</span> The page you opened can\'t be found, but you can return to the homepage and start again.', ".65", "t-sub t-muted"),
               btn("Go Back", "./", "/Home")))
    return page(ctx, "p-404", "Page not found — Shazwan", "Page not found", main, False, "404 Error", "404.html").replace('href="./"', 'href="/"')

# ------------------------------------------------------------------ springs + assets
SPRING_CSS = {}
def build_springs():
    for k, (d, b) in {"s08": (.8, 0), "s06": (.6, 0), "s05": (.5, 0), "s04b2": (.4, .2), "s03": (.3, 0), "s1": (1, 0)}.items():
        SPRING_CSS[k] = springs.duration_spring(d, b)[0]
    e, dur = springs.physics_spring(100, 60, 1, 34)
    SPRING_CSS["soft"] = e; SPRING_CSS["soft_ms"] = round(dur * 1000)

WRITTEN = set()
def write(path, txt):
    full = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, "w").write(txt)
    WRITTEN.add(os.path.normpath(full))

def prune():
    """Delete generated pages that no longer exist in content (e.g. removed sections); never touches .git or assets."""
    gone = []
    for d, dirs, files in os.walk(OUT, topdown=False):
        if "/.git" in d or d.endswith(".git"):
            continue
        for f in files:
            full = os.path.normpath(os.path.join(d, f))
            if f.endswith(".html") and full not in WRITTEN:
                os.remove(full); gone.append(os.path.relpath(full, OUT))
        if d != OUT and not os.listdir(d):
            os.rmdir(d)
    # images no page or stylesheet refers to any more (e.g. a removed project) are not shipped
    used = ""
    for d, dirs, files in os.walk(OUT):
        for f in files:
            if f.endswith((".html", ".css")):
                used += open(os.path.join(d, f), errors="replace").read()
    imgdir = os.path.join(OUT, "img")
    for f in sorted(os.listdir(imgdir)):
        if f not in used:
            os.remove(os.path.join(imgdir, f)); gone.append("img/" + f)
    if gone:
        print("removed", len(gone), "old files:", ", ".join(sorted(gone))[:400])

def assets():
    from PIL import Image
    os.makedirs(os.path.join(OUT, "img"), exist_ok=True)
    src = os.path.join(HERE, "img")
    for f in os.listdir(src):
        s = os.path.join(src, f); d = os.path.join(OUT, "img", f)
        if f in ("portrait.png", "headshot.png"):
            d = d[:-4] + ".jpg"
            if not os.path.exists(d) or os.path.getmtime(d) < os.path.getmtime(s):
                im = Image.open(s).convert("RGB"); im.save(d, quality=86)
            continue
        if not os.path.exists(d) or os.path.getmtime(d) < os.path.getmtime(s):
            shutil.copy2(s, d)
    os.makedirs(os.path.join(OUT, "css"), exist_ok=True); os.makedirs(os.path.join(OUT, "js"), exist_ok=True)
    shutil.copy2(os.path.join(HERE, "css", "site.css"), os.path.join(OUT, "css", "site.css"))
    shutil.copy2(os.path.join(HERE, "js", "site.js"), os.path.join(OUT, "js", "site.js"))
    shutil.copy2(os.path.join(HERE, "vendor", "lenis.min.js"), os.path.join(OUT, "js", "lenis.min.js"))
    write("favicon.svg", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><text x="16" y="25" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="26" fill="#EB5E28">S</text></svg>')
    write("CNAME", "mhdshazwn.com\n")
    write(".nojekyll", "")

def main():
    build_springs()
    assets()
    write("index.html", home())
    write("portfolio/index.html", portfolio())
    for i, p in enumerate(C.projects):
        write("portfolio/%s/index.html" % p["slug"], project_page(p, i))
    write("about/index.html", about())
    write("pricing/index.html", pricing_page())
    write("contact/index.html", contact_page())
    for key in ("terms", "privacy"):
        if legal_live(key):
            write("%s/index.html" % key, legal_page(key))
    write("404.html", notfound())
    prune()
    n = sum(len(fs) for _, _, fs in os.walk(OUT))
    print("built", n, "files into", OUT)

if __name__ == "__main__":
    main()

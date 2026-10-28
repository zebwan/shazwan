# ============================================================
# SHAZWAN© — ALL SITE CONTENT
# Copied from the current mhdshazwn.com (src/config.ts). Edit this file to change any text,
# link or image, then run:  python3 build/build.py
# Anything marked PH(...) is a PLACEHOLDER: the Hanza layout has a slot there but you have no
# content for it yet. Placeholder blocks are HIDDEN on the built site until you fill them in (case-study quote and numbers, project stories ...).
# ============================================================

class _PH(str):
    """Marks placeholder text. The build leaves placeholder-only blocks out of the site, so they
    appear automatically once you replace PH("...") with your own words."""

def PH(text):
    return _PH(text)

EMAIL = "zebwan00@gmail.com"
MAILTO = "mailto:%s?subject=Website%%20project%%20enquiry" % EMAIL
FORM_ENDPOINT = "https://formsubmit.co/ajax/%s" % EMAIL  # first submission sends an activation email

site = {
    "wordmark": "SHAZWAN",          # giant wordmark in hero + footer
    "logo": "SHAZWAN©",             # small header logo
    "slash": "/Shazwan",
    "name": "Mohd Shazwan Norisham",
    "short_name": "Shazwan Norisham",
    "first": "Shazwan",
    "role": "Web Designer & Developer",
    "location": "Kuala Lumpur · Johor Bahru",
    "country": "Malaysia",
    "timezone": "Asia/Kuala_Lumpur",
    "years": "©2019-2026",
    "availability": ("Taking new projects", "August 2026"),
    "title": "Shazwan — Web Designer & Developer, Malaysia",
    "description": "I help SMEs and small businesses build a stronger online presence through clean, modern websites.",
    "domain": "https://mhdshazwn.com",
}

socials = [
    ("Instagram", "https://www.instagram.com/shazwan.sites", "instagram"),
    ("GitHub", "https://github.com/zebwan", "github"),
    ("Behance", "https://behance.net/mohdzebwan", "behance"),
    ("LinkedIn", "https://www.linkedin.com/in/mohd-shazwan-norisham-40b2aa284", "linkedin"),
]

hero = {
    "lead": "I help SMEs and small businesses",
    "rest": " build a stronger online presence through clean, modern websites.",
    "services": [("/01", "Web Design"), ("/02", "Web Development"), ("/03", "Redesign")],
    "proof_bold": "30+ Projects",
    "proof_mono": "Open for selected projects",
}

mission = {
    "label": "My Mission",
    "intro": "Hi, I'm Shazwan. I help SMEs, brands, and growing businesses turn their ideas into clean, modern websites. I plan the structure, design the visual direction, and build responsive sites that feel clear, professional, and easy to trust.",
    "stats": [
        ("Projects", 30, "+", "Websites and web projects shaped from first concept to polished build."),
        ("Live Websites", 8, "+", "Client and commercial websites designed, built, and launched to production."),
        ("Years", 6, "+", "Years across IT, web design, and front-end development."),
        ("Clients", 8, "+", "Brands and businesses supported from early idea to final launch."),
    ],
}

# kind: live | concept.  services = the two lines shown under each project panel.
# The works shown on the site, in this order (home shows the first three). kind: live | concept.
projects = [
    dict(slug="shazwan-folio", kind="concept", client="Design portfolio", title="Shazwan Folio", year="2026",
         caption="A portfolio concept laid out like a design canvas, with rulers, selection handles, and a cursor that inverts whatever it passes over.",
         image="work-folio.jpg", href="https://zebwan.github.io/shazwan-folio/", light=True),
    dict(slug="tatzmy-studio", kind="concept", client="Tattoo studio", title="TatzMy Studio", year="2026",
         caption="A custom tattoo studio concept in Kuala Lumpur covering Bornean tribal, oriental, and fine-line work.",
         image="work-tatzmy.jpg", href="https://zebwan.github.io/tatzmy/"),
    dict(slug="nelfar-zulkifli", kind="live", client="Nelfar Zulkifli", title="Nelfar Zulkifli", year="2026",
         caption="A personal site for a property and strata management professional in Johor Bahru, built around her projects and field experience.",
         image="work-nelfar.jpg", href="https://nelfarzulkifli.com", light=True),
    dict(slug="aksb-global", kind="live", client="AKSB Global", title="AKSB Global", year="2026",
         caption="A multi-page corporate website for a highway maintenance and engineering company.",
         image="work-aksb.jpg", href="https://aksbglobal.com"),
    dict(slug="chup-studio", kind="concept", client="Fashion house", title="Chup Studio", year="2026",
         caption="A fashion-house concept built around calm layouts, bold typography, and smooth motion.",
         image="work-chup.jpg", href="https://zebwan.github.io/chup/", light=True),
    dict(slug="imagify", kind="concept", client="Visual studio", title="Imagify", year="2026",
         caption="A minimal visual-studio concept working across identity, image, and film.",
         image="work-imagify.jpg", href="https://zebwan.github.io/imagify/", light=True),
    dict(slug="embun", kind="concept", client="Skincare brand", title="Embun", year="2026",
         caption="A natural-skincare store concept for a Malaysian brand, with a full product catalogue, collections, a journal, and a mock checkout.",
         image="work-embun.jpg", href="https://zebwan.github.io/embun/", light=True),
    dict(slug="meranti-works", kind="concept", client="Construction company", title="Meranti Works", year="2026",
         caption="A contractor and renovation company concept for the Klang Valley, with service, project, and location pages.",
         image="work-meranti.jpg", href="https://zebwan.github.io/meranti-works/"),
    dict(slug="fluffed-cafe", kind="concept", client="Café and dessert bar", title="Fluffed Café", year="2026",
         caption="A cake-ordering site for a neighbourhood café in Taman Paramount, PJ, where customers pick a cake and size and send the order over WhatsApp.",
         image="work-fluffed.jpg", href="https://zebwan.github.io/fluffed-cafe/", light=True),
    dict(slug="seri-ampuan", kind="concept", client="Residential development", title="Seri Ampuan", year="2026",
         caption="A low-rise residence concept in Penang, carried by long scroll transitions and full-bleed photography.",
         image="work-seriampuan.jpg", href="https://zebwan.github.io/seri-ampuan/", light=True),
]
for p in projects:
    # project page text: replace the PH() defaults per project, e.g. projects[0]["quote"] = "..."
    p.setdefault("quote", PH("Client quote about this project goes here."))
    p.setdefault("quote_name", PH("Client Name"))
    p.setdefault("quote_role", PH("Role at %s" % p["client"]))
    p.setdefault("story", PH("Add the project story here: the brief, who it was for, and what the website needed to do."))
    p.setdefault("approach_title", PH("How the design and build came together."))
    p.setdefault("approach", PH("Describe the structure, visual direction and build decisions. Add more screenshots of the finished site."))
    p.setdefault("result_title", PH("What the finished website does for the business."))
    p.setdefault("results", [(PH("—"), PH("Result"), PH("One line on what changed."))] * 2)
    p["services"] = ("Design", "Development") if p["kind"] == "live" else ("Concept", "Design")
    p["kind_label"] = "Live Website" if p["kind"] == "live" else "Concept"
    p["cta"] = "Visit Live Site" if p["kind"] == "live" else "View Concept"

work = {
    "label": "Portfolio",
    "title": ("Selected", "Projects."),
    "desc": "Each project shows how I approach design, structure, and development.",
    "home_count": 3,
}

services = {
    "label": "Services",
    "title": ("What I", "Create."),
    "desc": "Websites that help your business look clearer, better, and easier to trust.",
    "card_title": ("Plan your", "next website", "with me."),
    "card_cta": "Email Me",
    "items": [
        ("Landing Pages", "A simple one-page website made to introduce your offer clearly. Good for promotions, personal brands, service pages, or small businesses that just need a clean place to send people.", "New offers · portfolios · service pages · ads · small launches"),
        ("Business Websites", "A proper website for businesses that need more than one page. I help structure the important sections, organise the content, and make the website feel professional on both desktop and mobile.", "Company profiles · service businesses · agencies · clinics · studios"),
        ("Redesign & Cleanup", "For websites that already exist but feel outdated, messy, or hard to use. I clean up the layout, improve the flow, and make the overall website feel more polished.", "Old websites · weak landing pages · messy layouts · unclear branding"),
    ],
}

process = {
    "label": "Process",
    "title": ("Simple Process,", "Cleaner Result."),
    "desc": "From the first conversation to the final handoff, I keep the process simple and clear.",
    "steps": [
        ("Understand", "Project Direction", "I start by understanding what the website needs to do, who it is for, and what kind of impression it should give."),
        ("Plan", "Structure & Flow", "I map out the sections, content flow, references, and structure before jumping into the design."),
        ("Design", "Visual Direction", "I create the visual direction, layout, spacing, and section style so the website feels consistent from top to bottom."),
        ("Build", "Development", "I turn the design into a responsive website using the right tools: custom code, WordPress, Framer, or a mix depending on the project."),
        ("Refine", "Final Polish", "I adjust the details, test the mobile view, clean up the flow, and make sure the final website feels ready to go live."),
    ],
    "card": {
        "title": "Ready to start?",
        "copy": "Tell me about your business, your goals, and where you want the website to go.",
        "list_label": "What you get",
        "list": ["Free intro chat", "Honest scope & recommendation", "Clear next steps"],
        "cta": "Email Me",
    },
}

stats_band = mission["stats"]  # the Stats band reuses the mission numbers (no other figures on the current site)

case_study = {
    "label": "Case Study",
    "project": "nelfar-zulkifli",
    "quote": (PH("“Client quote about the project goes here,"), PH(" with the part that matters most in muted text.”")),
    "stats": [(PH("—"), PH("Result one"), PH("One line on what changed after launch.")),
              (PH("—"), PH("Result two"), PH("One line on what changed after launch."))],
    "author": (PH("Client Name"), PH("Client role")),
}

pricing = {
    "label": "Pricing",
    "title": ("Website", "Packages."),
    "desc": "Clear website packages for a smooth path from idea to launch.",
    "timeline": "After our first chat",
    "plans": [
        dict(name="Landing Page", price="RM 1,200", timeline="2 Weeks", desc="A simple one-page website made to introduce your offer clearly.",
             lists=[("Good for", ["New offers", "Portfolios", "Service pages", "Ads", "Small launches"])], cta="Get Started", slash="/Landing", style="muted"),
        dict(name="Website · Up to 6 Pages", price="RM 2,400", timeline="1–1.5 Months", desc="A proper website for businesses that need more than one page.", popular=True,
             lists=[("Includes", ["Up to 6 pages", "Structured sections", "Organised content", "Desktop + mobile"]),
                    ("Good for", ["Company profiles", "Clinics & studios"])], cta="Get Started", slash="/6 Pages", style="dark"),
        dict(name="Website · Up to 10 Pages", price="RM 3,000", timeline="1–1.5 Months", desc="A bigger multi-page website for businesses with more to show.",
             lists=[("Includes", ["Up to 10 pages", "Structured sections", "Organised content", "Desktop + mobile"]),
                    ("Good for", ["Service businesses", "Agencies", "Studios"])], cta="Get Started", slash="/10 Pages", style="muted"),
    ],
    # the small dark card under the packages: anything bigger than 10 pages is quoted
    "promo": ("More than 10 pages?", "Let's talk about a custom quote.", "Get a Quote"),
}

faq = {
    "label": "FAQ",
    "title": ("Quick", "Answers."),
    "desc": "Everything you should know before we start designing and building.",
    "items": [
        ("What do you offer?", "I design and build websites for SMEs, brands, and growing businesses: landing pages, multi-page business websites, and redesigns. Depending on the project, I work with custom code (HTML, CSS, JavaScript, React) or CMS platforms like WordPress with Elementor.\n\nThe goal is always the same: a website that looks clean, feels easy to use, and presents your business properly."),
        ("Do you only do custom code?", "No. I choose the right tool for each project: custom-coded websites when you want full design control, WordPress and Elementor when you want to manage content yourself, and Framer for fast, interactive builds."),
        ("How long does a project take?", "A landing page takes about 2 weeks, and a multi-page website takes 1 to 1.5 months. After our first chat, I'll confirm the timeline for your project before any work starts."),
        ("Can you redesign my existing website?", "Yes. If your current website feels outdated, messy, or hard to use, I can clean up the layout, improve the flow, and make the whole thing feel properly built again."),
        ("Will I be able to edit the website myself?", "If we build on WordPress or another CMS, yes, you'll be able to update content yourself. For custom-coded websites, I hand over clean, organised code and can help with updates whenever you need them."),
        ("How do we start?", "Email me a few details about your business and what you need. I'll reply with initial thoughts, a rough scope, and clear next steps. No pressure, no jargon."),
    ],
}

contact = {
    "label": "Contact",
    "title": ("Create your", "next website", "with me."),
    "page_title": ("Let's build", "your website."),
    "page_desc": "Share a few details about your project and I'll help you figure out the right structure, scope, and timeline.",
    "desc": "From first concept to final build, I create websites with clear structure and smooth interactions.",
    "form": {
        "name": ("Your Name", "e.g. Aiman Hakim"),
        "email": ("Email Address", "you@company.com"),
        "msg": ("How can I help?", "I need a website for ..."),
        "incomplete": "Form Incomplete", "send": "Send Message", "sending": "Sending ...",
        "sent": "Message Sent", "error": "Try Again",
        "note": "Goes straight to my inbox, or DM me on Instagram",
        "note_link": ("@shazwan.sites", "https://www.instagram.com/shazwan.sites"),
    },
    "address": ["Kuala Lumpur", "Johor Bahru", "Malaysia"],
    "copyright": ("© 2026 Mohd Shazwan Norisham", "All rights reserved."),
    "credit": ("Built by", "Shazwan, with caffeine"),
}

menu_featured = ["shazwan-folio", "tatzmy-studio"]  # the two project tiles in the menu

about = {
    "hero_label": "About Me",
    "hero_title": ("Web Designer", "& Developer."),
    "hero_desc": "I help SMEs and small businesses build a stronger online presence through clean, modern websites.",
    "title": ("Clear and", "easy to trust."),
    "lead": "I help SMEs, brands, and growing businesses turn their ideas into clean, modern websites that feel clear, professional, and easy to trust.",
    "body": [
        "I start by understanding what the website needs to do, who it is for, and what kind of impression it should give. Then I map out the sections, content flow, and structure before jumping into the design.",
        "I choose the right tool for each project: custom-coded websites when you want full design control, WordPress and Elementor when you want to manage content yourself, and Framer for fast, interactive builds.",
        "From the first conversation to the final handoff, I keep the process simple and clear, and I make sure the final website feels ready to go live on desktop and mobile.",
    ],
    "cta": "Email Me",
}

legal = {
    "terms": ("Terms", "Of Use.", [PH("Terms of use for this website go here."), PH("Replace this placeholder with your own terms before going live.")]),
    "privacy": ("Privacy", "Policy.", [
        "The contact form on this website sends your name, email address and message to my inbox through FormSubmit, so I can reply to you. I don't use it for anything else.",
        PH("Add the rest of your privacy policy here before going live."),
    ]),
}

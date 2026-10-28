# SHAZWAN© revamp — Hanza template rebuild

Static HTML/CSS/JS clone of https://hanza-template.framer.website/ with mhdshazwn.com's colours and content.
Built 26 Oct 2026. Not deployed.

## Folders
- `_teardown/` — the study: `TEARDOWN.md` (sections, responsive matrix, motion, tokens), template source
  (`source/`), measurements (`geom/`), screenshots (`screens/`), tools.
- `build/` — the generator. **All text lives in `build/content.py`.** Styles `build/css/site.css`,
  motion `build/js/site.js`, images `build/img/`.
- `site/` — the output. Rebuild with `python3 build/build.py` after any edit.
- `build/qa/` — `shot.py` (screenshot + overflow/error audit), `compare.py` (section heights vs template),
  `interact.py` (menu, accordions, filters, load more, form, hover, counters, ticker, scroll effects).

## Pages (18)
Home, Portfolio (+10 project pages), About, Pricing, Contact, Terms, Privacy, 404.
The blog (page, 8 posts and the home Blog section) was removed at your request; Pricing took its place in the menu and footer.

## Placeholders to replace (search `PH(` in content.py)
- Case study quote, two result numbers, client name
- Project pages: client quote, story text, approach text, results, extra screenshots (only one image per project so far)
- Terms of use; the rest of the privacy policy (the FormSubmit sentence is real)

## Pricing (your figures, 26 Oct)
Landing page RM 1,200 (2 weeks) · website up to 6 pages RM 2,400 (1–1.5 months, marked Popular) · up to 10 pages RM 3,000 (1–1.5 months) · more than 10 pages = custom quote (the dark card under the packages). E-commerce is not offered: removed from pricing, services, the hero list (/03 is now Redesign) and the FAQ answers. Edit in `pricing` in content.py.

## Where it differs from Hanza (on purpose)
- **Testimonials and Blog removed**, at your request. Home section numbers now run 01 Mission … 05 Case Study, 06 Pricing, 07 FAQ. Pricing has its own page (/pricing/) with the packages + FAQ.
- **Portfolio page = two groups (Live Websites, Concepts) of two-column cards**, at your request; rows of two stack on scroll (one column on phones, where each card stacks). Group titles/descriptions are in `work["groups"]` in content.py.
- **Project cards stack on scroll** on every page (home, portfolio, next project), at your request: each card sticks once it fills the screen, the next slides over it and the covered card eases back to 92%. On screens shorter than the card it sticks with its bottom edge on screen so the caption is never cut off. Hanza's cards simply scroll.
- Hanza's seller badges ("More templates / Buy for $99", "Made in Framer") are left out — they are the template shop's ads.
- Project panels built from light-background screenshots get a deeper scrim (62% instead of 20%) so the white text stays readable.
- The footer email drops from 32px to 26px on phones so ZEBWAN00@GMAIL.COM fits.
- The hero rating block ("4.92/5, trusted by 122+ founders") shows "30+ Projects / Open for selected projects" instead.
- Logo ticker shows project names as text (no client logo files yet); header logo is text.
- No phone number anywhere.

## Contact form
Posts to formsubmit.co/ajax/zebwan00@gmail.com (same as the live site). The very first submission sends an
activation email that has to be clicked once.

## Deploy (when ready)
`site/` already has `CNAME` (mhdshazwn.com) and `.nojekyll`. It would replace the React build in zebwan/shazwan.

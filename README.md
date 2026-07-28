# mhdshazwn.com — Shazwan© Portfolio

Personal portfolio of **Mohd Shazwan Norisham** — Web Designer & Developer (Kuala Lumpur · Johor Bahru, Malaysia).

Single-page site with a video hero, ruled 4-column grid, sticky-stacked project cards, accordions, count-up stats, and smooth scrolling.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v3 + custom design system (`src/index.css`)
- GSAP ScrollTrigger (reveals, count-ups, scroll-scrubbed text) + Lenis (smooth scroll)
- Fonts: Zalando Sans + Geist Mono (Google Fonts)

## Editing content

All text, links, projects, and section copy live in **`src/config.ts`** — edit that file to update the site; components only render what the config provides. Images live in `public/images/`, the hero loop in `public/videos/`.

## Develop & deploy

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build to dist/
```

Pushing to `main` triggers the GitHub Actions workflow, which builds and deploys to GitHub Pages (custom domain via `public/CNAME` → mhdshazwn.com).

## Credits

- Hero video: [Pexels](https://www.pexels.com/video/a-close-up-of-a-red-tulip-with-yellow-and-white-petals-15872157/) (free license)
- Design direction inspired by grid-ruled editorial portfolio sites; built from scratch.

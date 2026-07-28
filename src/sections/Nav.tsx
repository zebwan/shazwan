import { site, hero } from "../config"
import { useClock, Flip } from "../lib/anim"
import { Chevron } from "./Icons"

export default function Nav({ onMenu, menuOpen }: { onMenu: () => void; menuOpen: boolean }) {
  const time = useClock(site.timezone)
  return (
    <header className="absolute top-0 inset-x-0 z-[60] px-frame">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-6">
        {/* left: menu + wordmark */}
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={onMenu}
            className={`hidden min-[900px]:inline-flex items-center f-mono font-semibold tracking-[0.14em] text-cream ${menuOpen ? "menu-open" : ""}`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="menu-dots"><i /><i /><i /><i /></span>
            <Flip>Menu</Flip>
          </button>
          <span className="hidden min-[900px]:block h-px w-8 bg-cream/30" aria-hidden="true" />
          <span className="font-disp font-extrabold tracking-tight text-cream text-lg uppercase">
            {site.brandShort}
          </span>
        </div>

        {/* center: live clock */}
        <div className="hidden min-[1200px]:flex items-baseline gap-3 f-mono text-cream">
          <span className="clock-val font-semibold">{time}</span>
          <span className="text-cream/45">Local Time</span>
        </div>
        <div className="min-[1200px]:hidden" />

        {/* right: start project bar / compact menu */}
        <div className="flex justify-end">
          <a href={hero.cta.href} className="hidden min-[900px]:flex items-stretch bg-ink-3 text-cream group">
            <span className="w-[52px] overflow-hidden flex-none">
              <img src="images/footer-shazwan.png" alt="" className="w-full h-full object-cover grayscale" loading="eager" />
            </span>
            <span className="flex items-center gap-2 px-5 f-mono font-semibold tracking-[0.14em]">
              <Flip>Start Project</Flip>
              <span className="text-cream/40">{site.slashTag}</span>
            </span>
            <span className="w-[52px] flex items-center justify-center bg-orange text-cream group-hover:bg-orange-deep transition-colors">
              <Chevron />
            </span>
          </a>
          <button
            onClick={onMenu}
            className={`min-[900px]:hidden inline-flex items-center f-mono font-semibold tracking-[0.14em] text-cream ${menuOpen ? "menu-open" : ""}`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="menu-dots"><i /><i /><i /><i /></span>
            Menu
          </button>
        </div>
      </div>
    </header>
  )
}

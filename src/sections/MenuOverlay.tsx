import { useEffect, useRef } from "react"
import { menu, site, socials } from "../config"
import { Anchor, stopScroll } from "../lib/anim"
import { SocialIcon } from "./Icons"

export default function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const prevFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    stopScroll(open)
    if (open) {
      prevFocus.current = document.activeElement as HTMLElement | null
      closeRef.current?.focus()
    } else {
      prevFocus.current?.focus()
      prevFocus.current = null
    }
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return }
      if (e.key !== "Tab") return
      // keep Tab focus inside the dialog
      const panel = panelRef.current
      if (!panel) return
      const focusables = panel.querySelectorAll<HTMLElement>('a[href], button:not([tabindex="-1"])')
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault(); last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault(); first.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => { window.removeEventListener("keydown", onKey); stopScroll(false) }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-[70] transition-[opacity,visibility] duration-500 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      aria-hidden={!open}
    >
      {/* blurred, dimmed page behind */}
      <button
        className="absolute inset-0 w-full h-full bg-black/45 backdrop-blur-xl cursor-default"
        onClick={onClose}
        aria-label="Close menu"
        tabIndex={-1}
      />
      {/* panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`absolute left-[max(16px,var(--frame))] top-[max(16px,4.5rem)] w-[min(680px,calc(100vw-32px))] max-h-[calc(100dvh-96px)] overflow-y-auto bg-[#2A2521] border border-cream/10 p-6 sm:p-8 transition-transform duration-500 ${open ? "translate-y-0" : "-translate-y-3"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <span className="f-mono text-cream/45">Navigation</span>
          <button
            ref={closeRef}
            onClick={onClose}
            className="f-mono text-cream hover:text-orange transition-colors"
            tabIndex={open ? 0 : -1}
          >
            Close ✕
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-10">
          {/* links + persona */}
          <div className="flex flex-col">
            <nav className="flex flex-col gap-4 mb-10">
              {menu.links.map((l) => (
                <Anchor
                  key={l.label}
                  href={l.href}
                  onClick={onClose}
                  className="font-disp font-bold uppercase tracking-wide text-cream text-lg hover:text-orange transition-colors"
                >
                  {l.label}
                </Anchor>
              ))}
            </nav>
            <div className="mt-auto">
              <div className="w-[72px] h-[88px] overflow-hidden bg-ink-3 border border-cream/10 mb-4">
                <img src="images/footer-shazwan.png" alt={site.name} className="w-full h-full object-cover grayscale" loading="lazy" />
              </div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="sq" />
                <span className="font-disp font-bold uppercase text-cream text-sm tracking-wide">{site.name}</span>
              </div>
              <div className="f-mono text-cream/45 mb-4">{site.role}</div>
              <div className="flex gap-4 text-cream/60">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hover:text-orange transition-colors">
                    <SocialIcon name={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* featured work */}
          <div className="hidden sm:flex flex-col gap-4">
            {menu.featured.map((f) => (
              <a key={f.label} href={f.href} target="_blank" rel="noopener noreferrer" className="relative block h-[170px] overflow-hidden grain group" tabIndex={open ? 0 : -1}>
                <img src={f.image} alt={f.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <span className="absolute inset-0 bg-black/35 z-[1]" />
                <span className="absolute inset-0 z-[2] flex items-center justify-center font-disp font-bold uppercase tracking-wide text-cream text-sm">
                  {f.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

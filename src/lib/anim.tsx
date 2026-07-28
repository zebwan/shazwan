// ============================================================
// Motion utilities — Lenis smooth scroll + GSAP scroll effects
// ============================================================
import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger)

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

// ---- Lenis smooth scroll, wired into GSAP's ticker ----
let lenis: Lenis | null = null

export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    ;(window as unknown as { lenis: Lenis }).lenis = lenis
    lenis.on("scroll", ScrollTrigger.update)
    const raf = (time: number) => lenis?.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

export function scrollToHash(hash: string) {
  const el = document.querySelector(hash)
  if (!el) return
  // force: Lenis silently drops scrollTo while stopped (menu open)
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.4, force: true })
  else el.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth" })
}

export function stopScroll(stop: boolean) {
  if (lenis) {
    if (stop) lenis.stop()
    else lenis.start()
    return
  }
  // reduced-motion path has no Lenis — lock the document instead
  document.documentElement.style.overflow = stop ? "hidden" : ""
}

// ---- Anchor link that routes through Lenis ----
export function Anchor({ href, className, children, onClick }: {
  href: string; className?: string; children: ReactNode; onClick?: () => void
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (href.startsWith("#")) {
          e.preventDefault()
          onClick?.()
          scrollToHash(href === "#top" ? "#root" : href)
        } else onClick?.()
      }}
    >
      {children}
    </a>
  )
}

// ---- Heading mask reveal (slides up when scrolled into view) ----
export function Mask({ children, delay = 0, as = "span" }: {
  children: ReactNode; delay?: number; as?: "span" | "div"
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const inner = el.querySelector(".mask-in")
    if (!inner) return
    if (prefersReduced()) { gsap.set(inner, { y: 0 }); return }
    const tween = gsap.fromTo(
      inner,
      { yPercent: 110 },
      {
        yPercent: 0, duration: 1.1, delay, ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      },
    )
    // safety: if the trigger never fires (throttled rAF, layout shifts),
    // reveal once the element is actually on screen
    const safety = window.setInterval(() => {
      if (tween.progress() > 0) { window.clearInterval(safety); return }
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) { tween.progress(1); window.clearInterval(safety) }
    }, 1500)
    return () => { window.clearInterval(safety); tween.scrollTrigger?.kill(); tween.kill() }
  }, [delay])
  const Tag = as
  return (
    <Tag className="mask" ref={ref as never}>
      <span className="mask-in">{children}</span>
    </Tag>
  )
}

// ---- Word-by-word colour reveal, scrubbed to scroll ----
export function WordReveal({ text, className, to }: {
  text: string; className?: string; to: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll<HTMLElement>(".w")
    if (prefersReduced()) { gsap.set(words, { color: to }); return }
    const tween = gsap.to(words, {
      color: to,
      stagger: 0.35,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 45%", scrub: 0.6 },
    })
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [to])
  return (
    <p ref={ref} className={`wreveal ${className ?? ""}`}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="w">{w}{" "}</span>
      ))}
    </p>
  )
}

// ---- Count-up number ----
export function Count({ value, suffix = "", className }: {
  value: number; suffix?: string; className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(prefersReduced() ? value : 0)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced()) return
    let fired = false
    const run = () => {
      if (fired) return
      fired = true
      const obj = { v: 0 }
      gsap.to(obj, {
        v: value, duration: 1.6, ease: "power3.out",
        onUpdate: () => setDisplay(Math.round(obj.v)),
        onComplete: () => setDisplay(value),
      })
    }
    const st = ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: run })
    const safety = window.setInterval(() => {
      if (fired) { window.clearInterval(safety); return }
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) {
        fired = true
        setDisplay(value)
        window.clearInterval(safety)
      }
    }, 1500)
    return () => { window.clearInterval(safety); st.kill() }
  }, [value])
  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  )
}

// ---- Simple fade/slide-in on enter ----
export function useFadeIn<T extends HTMLElement>(offset = 24) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReduced()) return
    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y: offset },
      {
        autoAlpha: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      },
    )
    return () => { tween.scrollTrigger?.kill(); tween.kill() }
  }, [offset])
  return ref
}

// ---- Flip label (hover text swap) ----
export function Flip({ children }: { children: ReactNode }) {
  return (
    <span className="flip">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  )
}

// ---- Live clock (Malaysia time) ----
export function useClock(timeZone: string) {
  const [time, setTime] = useState("")
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit", minute: "2-digit", hour12: true, timeZone,
    })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 10_000)
    return () => clearInterval(id)
  }, [timeZone])
  return time
}

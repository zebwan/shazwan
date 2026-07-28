import { useEffect, useRef } from "react"
import gsap from "gsap"
import { hero, site } from "../config"
import { prefersReduced } from "../lib/anim"

export default function Hero() {
  const root = useRef<HTMLElement>(null)

  // some browsers ignore the autoplay attribute after bfcache/anchor loads
  useEffect(() => {
    const v = root.current?.querySelector("video")
    v?.play().catch(() => {})
  }, [])

  // load intro: statement → services list → cluster → wordmark
  useEffect(() => {
    const el = root.current
    if (!el || prefersReduced()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.fromTo(".hero-statement", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.35)
        .fromTo(".hero-svc", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.55)
        .fromTo(".hero-cluster", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.8)
        .fromTo(".hero-wordmark", { autoAlpha: 0, yPercent: 24 }, { autoAlpha: 1, yPercent: 12, duration: 1.4, ease: "power4.out" }, 0.7)
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative h-[100svh] overflow-hidden bg-ink grain rails rails--hero" id="top-hero">
      {/* background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="videos/hero-tulip.mp4"
        poster="videos/hero-poster.jpg"
        autoPlay muted loop playsInline
        preload="metadata"
        aria-hidden="true"
      />
      {/* warm dark wash for legibility */}
      <div className="absolute inset-0 bg-[#1c120b]/45" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" aria-hidden="true" />
      <div className="rails-lines" aria-hidden="true" />

      {/* statement — mid right-of-centre */}
      <div className="hero-statement absolute z-[4] left-[var(--frame)] right-[var(--frame)] bottom-[max(42svh,200px)] min-[900px]:bottom-auto min-[900px]:top-[54%] min-[900px]:-translate-y-1/2 min-[900px]:left-[50.5%] min-[900px]:right-auto min-[900px]:w-[min(360px,21vw)]">
        <p className="statement text-cream">
          {hero.statementLead}{" "}
          <span className="text-cream/70">{hero.statementRest}</span>
        </p>
        <span className="sq sq--ghost mt-6 text-cream" aria-hidden="true" />
      </div>

      {/* numbered services — right rail */}
      <div className="hero-svc-wrap absolute z-[4] hidden min-[900px]:flex flex-col gap-2.5 left-[74%] top-[54%] -translate-y-1/2">
        {hero.services.map((s) => (
          <div key={s.n} className="hero-svc flex items-baseline gap-3">
            <span className="f-mono text-cream/50">{s.n}</span>
            <span className="font-disp font-bold uppercase tracking-wide text-cream text-[1.05rem]">{s.label}</span>
          </div>
        ))}
        <span className="hero-svc sq sq--ghost mt-4 text-cream" aria-hidden="true" />
      </div>

      {/* bottom-left cluster */}
      <div className="hero-cluster absolute z-[4] left-[var(--frame)] bottom-[120px] min-[900px]:bottom-[calc(clamp(88px,16.5vw,340px)*0.72+28px)] min-[1380px]:bottom-[7svh] max-w-[80vw] min-[900px]:max-w-none">
        <div className="font-disp font-bold uppercase tracking-wide text-cream text-[0.9rem] mb-1.5">
          {hero.bottomBold}
        </div>
        <div className="f-mono text-cream/50">{hero.bottomMono}</div>
      </div>

      {/* giant cropped wordmark */}
      <div
        className="hero-wordmark absolute z-[3] bottom-0 left-0 min-[900px]:left-[24%] whitespace-nowrap font-disp font-extrabold uppercase text-cream leading-[0.78] tracking-[-0.02em] select-none pointer-events-none"
        style={{ fontSize: "clamp(88px, 16.5vw, 340px)", transform: "translateY(12%)" }}
        aria-hidden="true"
      >
        {site.wordmark}
      </div>
    </section>
  )
}

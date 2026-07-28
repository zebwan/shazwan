import { useState } from "react"
import { services, site } from "../config"
import { Flip, Mask, useFadeIn } from "../lib/anim"
import { Chevron } from "./Icons"

export default function Services() {
  const [open, setOpen] = useState(0)
  const cardRef = useFadeIn<HTMLDivElement>()
  return (
    <section id="services" className="relative bg-ink text-cream rails rails--dark">
      <div className="rails-lines" aria-hidden="true" />
      <div className="relative z-[1] px-frame pt-[14svh] pb-[12svh]">
        {/* header */}
        <div className="grid min-[900px]:grid-cols-2 gap-10 mb-16 min-[900px]:mb-24">
          <span className="lbl lbl-dark f-mono font-semibold self-start">
            <span className="sq" />
            <span className="n">{services.number}</span>
            {services.label}
          </span>
          <div>
            <h2 className="h-display">
              {services.titleLines.map((l) => (
                <Mask key={l} as="span">{l}<br /></Mask>
              ))}
            </h2>
            <p className="statement text-cream/45 mt-8 max-w-[520px]">{services.desc}</p>
          </div>
        </div>

        <div className="grid min-[1000px]:grid-cols-[1fr_360px] gap-14 items-start">
          {/* accordion */}
          <div style={{ ["--acc-hair" as string]: "var(--hair-d)" }}>
            {services.items.map((it, i) => (
              <div key={it.n} className={`acc-item ${open === i ? "open" : ""}`}>
                <button className="acc-head" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span className="f-mono text-cream/40">{it.n}</span>
                  <span className="font-disp font-bold uppercase tracking-wide text-[clamp(1.05rem,1.4vw,1.45rem)]">
                    {it.title}
                  </span>
                  <span className="acc-icon text-cream/70" aria-hidden="true" />
                </button>
                <div className="acc-panel">
                  <div>
                    <div className="pb-9 min-[900px]:pl-[80px] max-w-[640px]">
                      <p className="text-cream/60 leading-relaxed mb-5">{it.copy}</p>
                      <p className="f-mono text-orange">Good for — {it.goodFor}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* sticky contact card */}
          <div ref={cardRef} className="min-[1000px]:sticky min-[1000px]:top-24 bg-ink-2 border border-cream/10 p-7">
            <span className="lbl lbl-dark f-mono font-semibold mb-7 inline-flex">
              <span className="sq" />
              {services.card.label}
            </span>
            <h3 className="h-card mb-8">{services.card.title}</h3>
            <div className="flex items-center gap-4 mb-8">
              <span className="w-[52px] h-[62px] overflow-hidden bg-ink-3 flex-none">
                <img src="images/footer-shazwan.png" alt="" className="w-full h-full object-cover grayscale" loading="lazy" />
              </span>
              <span>
                <span className="block font-disp font-bold uppercase tracking-wide text-sm">{site.name}</span>
                <span className="block f-mono text-cream/45 mt-1">{site.role}</span>
              </span>
            </div>
            <a href={services.card.cta.href} className="bar-btn bar-btn--cream group">
              <span className="bar-label font-semibold">
                <Flip>{services.card.cta.label}</Flip>
              </span>
              <span className="bar-arrow"><Chevron /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

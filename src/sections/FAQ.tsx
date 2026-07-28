import { useState } from "react"
import { faq } from "../config"
import { Mask } from "../lib/anim"

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="relative bg-cream text-ink rails">
      <div className="rails-lines" aria-hidden="true" />
      <div className="relative z-[1] px-frame pt-[14svh] pb-[12svh]">
        {/* header */}
        <div className="grid min-[900px]:grid-cols-2 gap-10 mb-16 min-[900px]:mb-24">
          <span className="lbl f-mono font-semibold self-start">
            <span className="sq" />
            <span className="n">{faq.number}</span>
            {faq.label}
          </span>
          <div>
            <h2 className="h-display">
              {faq.titleLines.map((l) => (
                <Mask key={l} as="span">{l}<br /></Mask>
              ))}
            </h2>
            <p className="statement text-ink/45 mt-8 max-w-[520px]">{faq.desc}</p>
          </div>
        </div>

        {/* accordion */}
        <div style={{ ["--acc-hair" as string]: "var(--hair-l)" }}>
          {faq.items.map((it, i) => (
            <div key={it.n} className={`acc-item ${open === i ? "open" : ""}`}>
              <button className="acc-head" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className="f-mono text-ink/40">{it.n}</span>
                <span className="font-disp font-bold uppercase tracking-wide text-[clamp(1rem,1.3vw,1.35rem)]">
                  {it.q}
                </span>
                <span className="acc-icon text-ink/60" aria-hidden="true" />
              </button>
              <div className="acc-panel">
                <div>
                  <div className="pb-9 min-[900px]:pl-[80px] max-w-[680px]">
                    {it.a.split("\n\n").map((p, j) => (
                      <p key={j} className="text-ink/60 leading-relaxed mb-4 last:mb-0">{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

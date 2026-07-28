import { process, site } from "../config"
import { Flip, Mask, useFadeIn } from "../lib/anim"
import { CheckMark, Chevron } from "./Icons"

export default function Process() {
  const cardRef = useFadeIn<HTMLDivElement>()
  return (
    <section id="process" className="relative bg-ink text-cream rails rails--dark">
      <div className="rails-lines" aria-hidden="true" />
      <div className="relative z-[1] px-frame pb-[14svh]">
        {/* header */}
        <div className="grid min-[900px]:grid-cols-2 gap-10 mb-16 min-[900px]:mb-24 pt-[4svh] border-t border-cream/10">
          <span className="lbl lbl-dark f-mono font-semibold self-start">
            <span className="sq" />
            <span className="n">{process.number}</span>
            {process.label}
          </span>
          <div>
            <h2 className="h-display">
              {process.titleLines.map((l) => (
                <Mask key={l} as="span">{l}<br /></Mask>
              ))}
            </h2>
            <p className="statement text-cream/45 mt-8 max-w-[520px]">{process.desc}</p>
          </div>
        </div>

        <div className="grid min-[1000px]:grid-cols-[1fr_360px] gap-14 items-start">
          {/* sticky step cards */}
          <div>
            {process.steps.map((s, i) => (
              <div
                key={s.n}
                className="proc-card p-8 min-[900px]:p-11 mb-5"
                style={{ top: `${84 + i * 14}px` }}
              >
                <div className="flex items-start justify-between mb-14 min-[900px]:mb-20">
                  <span className="font-disp font-extrabold text-[1.7rem] leading-none">{s.n}</span>
                  <span className="dots5 text-cream" aria-hidden="true">
                    {process.steps.map((_, j) => (
                      <i key={j} className={j <= i ? "on" : ""} />
                    ))}
                  </span>
                </div>
                <span className="lbl lbl-dark f-mono font-semibold mb-4 inline-flex">
                  <span className="sq" />
                  {s.eyebrow}
                </span>
                <h3 className="h-card mb-5">{s.title}</h3>
                <p className="text-cream/55 leading-relaxed max-w-[560px]">{s.copy}</p>
              </div>
            ))}
          </div>

          {/* orange card */}
          <div ref={cardRef} className="min-[1000px]:sticky min-[1000px]:top-24 bg-orange text-cream p-7">
            <h3 className="h-card mb-5">{process.orangeCard.title}</h3>
            <p className="text-cream/85 leading-relaxed mb-8">{process.orangeCard.copy}</p>
            <div className="f-mono font-semibold mb-4 text-cream/80">{process.orangeCard.listLabel}</div>
            <div className="flex flex-col gap-3.5 mb-9">
              {process.orangeCard.checklist.map((c) => (
                <div key={c} className="check-row">
                  <span className="check-box"><CheckMark /></span>
                  <span className="font-medium">{c}</span>
                </div>
              ))}
            </div>
            <a href={process.orangeCard.cta.href} className="bar-btn group">
              <span className="bar-thumb">
                <img src="images/footer-shazwan.png" alt="" className="grayscale" loading="lazy" />
              </span>
              <span className="bar-label font-semibold">
                <Flip>{process.orangeCard.cta.label}</Flip>
                <span className="bar-slash">{site.slashTag}</span>
              </span>
              <span className="bar-arrow !bg-cream !text-ink"><Chevron /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

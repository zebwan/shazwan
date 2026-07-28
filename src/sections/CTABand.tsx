import { ctaBand } from "../config"
import { Flip, Mask } from "../lib/anim"
import { Chevron } from "./Icons"

export default function CTABand() {
  return (
    <section id="cta" className="bg-cream text-ink">
      <div className="border-t border-ink/15 px-frame py-[12svh] flex flex-col items-center text-center">
        <span className="f-mono font-semibold text-ink/45 mb-7">{ctaBand.label}</span>
        <h2 className="h-display mb-11">
          {ctaBand.titleLines.map((l) => (
            <Mask key={l} as="span">{l}<br /></Mask>
          ))}
        </h2>
        <a href={ctaBand.cta.href} className="bar-btn bar-btn--light group !w-auto min-w-[300px]">
          <span className="bar-label font-semibold justify-center">
            <Flip>{ctaBand.cta.label}</Flip>
          </span>
          <span className="bar-arrow"><Chevron /></span>
        </a>
      </div>
    </section>
  )
}

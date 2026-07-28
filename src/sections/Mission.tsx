import { mission, site, socials } from "../config"
import { Count, Flip, useFadeIn, WordReveal } from "../lib/anim"
import { Chevron, SocialIcon } from "./Icons"
import { MAILTO } from "../config"

export default function Mission() {
  const cardRef = useFadeIn<HTMLDivElement>()
  return (
    <section id="about" className="relative bg-cream text-ink rails">
      <div className="rails-lines" aria-hidden="true" />
      <div className="relative z-[1] px-frame pt-[13svh] pb-[10svh]">
        {/* label row */}
        <div className="grid min-[900px]:grid-cols-2 gap-4 mb-14 min-[900px]:mb-20">
          <div className="min-[900px]:col-start-2 flex items-center justify-between">
            <span className="lbl f-mono font-semibold">
              <span className="sq" />
              <span className="n">{mission.number}</span>
              {mission.label}
            </span>
            <span className="f-mono text-ink/40">{mission.meta}</span>
          </div>
        </div>

        <div className="grid min-[900px]:grid-cols-[minmax(280px,400px)_1fr] gap-x-[6vw] gap-y-16 items-start">
          {/* persona card */}
          <div ref={cardRef} className="min-[900px]:sticky min-[900px]:top-24 max-w-[400px]">
            <div className="border-t-2 border-orange">
              <div className="aspect-[4/5] overflow-hidden bg-[#E9E2D4]">
                <img src="images/potraitdesktop.png" alt={`Portrait of ${site.name}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            <a href={MAILTO} className="bar-btn group" aria-label="Get in touch by email">
              <span className="bar-label">
                <Flip>Get in Touch</Flip>
                <span className="bar-slash">{site.slashTag}</span>
              </span>
              <span className="bar-arrow"><Chevron /></span>
            </a>
            <div className="pt-6">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2.5">
                  <span className="sq" />
                  <span className="font-disp font-bold uppercase tracking-wide text-[0.95rem]">{site.name}</span>
                </span>
                <span className="flex gap-3.5 text-ink/55">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="hover:text-orange transition-colors">
                      <SocialIcon name={s.icon} />
                    </a>
                  ))}
                </span>
              </div>
              <div className="mt-5 border-t border-ink/15 py-3.5 flex justify-between gap-4">
                <span className="f-mono text-ink/45">Profession</span>
                <span className="f-mono font-semibold text-right">{site.role}</span>
              </div>
              <div className="border-t border-ink/15 py-3.5 flex justify-between gap-4">
                <span className="f-mono text-ink/45">Location</span>
                <span className="f-mono font-semibold text-right">{site.location}</span>
              </div>
            </div>
          </div>

          {/* intro + stats */}
          <div>
            <WordReveal
              text={mission.intro}
              to="#252422"
              className="text-[clamp(1.7rem,2.6vw+0.6rem,3.1rem)]"
            />
            <div className="mt-20">
              {mission.stats.map((s) => (
                <div key={s.n} className="border-t border-ink/15 py-10 last:border-b">
                  <div className="flex items-center justify-between mb-8">
                    <span className="lbl f-mono font-semibold">
                      <span className="n">{s.n}</span>
                      {s.label}
                    </span>
                    <span className="dots3 text-ink" aria-hidden="true"><i /><i /><i /></span>
                  </div>
                  <div className="font-disp font-extrabold text-[clamp(2.6rem,4vw,4.2rem)] leading-none mb-5">
                    <Count value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-ink/55 max-w-[420px] leading-relaxed">{s.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

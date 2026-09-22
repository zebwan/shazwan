import { work } from "../config"
import type { WorkItem } from "../config"
import { Flip, Mask } from "../lib/anim"
import { Arrow } from "./Icons"

function GroupBand({ title, mono }: { title: string; mono: string }) {
  return (
    <div className="relative z-[5] flex items-center justify-between gap-6 border-y border-ink/15 bg-cream px-frame h-[88px] min-[900px]:h-[112px]">
      <span className="font-disp font-extrabold uppercase tracking-tight text-[clamp(1.1rem,2vw,1.9rem)]">
        {title}
      </span>
      <span className="f-mono text-ink/40 hidden sm:block">{mono}</span>
    </div>
  )
}

function Stack({ items }: { items: WorkItem[] }) {
  return (
    <div className="relative">
      {items.map((p) => (
        <article key={p.n} className="stack-card bg-ink-3 text-cream grain">
          <img
            src={p.image}
            alt={`${p.title} — website preview`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className={`absolute inset-0 ${p.light ? "bg-black/75" : "bg-black/55"}`} aria-hidden="true" />

          {/* top meta bar */}
          <div className="absolute z-[4] top-0 inset-x-0 px-frame pt-6 flex items-start justify-between">
            <span className="lbl lbl-dark f-mono font-semibold">
              <span className="sq" />
              <span className="n">{p.n}</span>
            </span>
            <span className="text-right">
              <span className="block f-mono">
                <span className="text-cream/45">{p.kind === "live" ? "Client" : "Concept"}&nbsp;&nbsp;</span>
                <b>{p.client}</b>
              </span>
              <span className="block f-mono mt-1"><span className="text-cream/45">Year&nbsp;&nbsp;</span><b>{p.year}</b></span>
            </span>
          </div>

          {/* centred content */}
          <div className="absolute z-[4] inset-0 flex flex-col items-center justify-center text-center px-frame">
            <h3 className="h-display mb-7">{p.title}</h3>
            <p className="statement text-cream/60 text-[0.9rem] max-w-[560px] mb-10">
              {p.caption}
            </p>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="chip-btn text-cream font-semibold">
              <Flip>{p.kind === "live" ? "Visit Live Site" : "View Concept"}</Flip>
              <span className="chip-arrow"><Arrow /></span>
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function Work() {
  const live = work.items.filter((p) => p.kind === "live")
  const concepts = work.items.filter((p) => p.kind === "concept")

  return (
    <section id="work" className="relative bg-cream text-ink">
      {/* header */}
      <div className="relative rails">
        <div className="rails-lines" aria-hidden="true" />
        <div className="relative z-[1] px-frame pt-[10svh] pb-16">
          <div className="grid min-[900px]:grid-cols-2 gap-10">
            <span className="lbl f-mono font-semibold self-start">
              <span className="sq" />
              <span className="n">{work.number}</span>
              {work.label}
            </span>
            <div>
              <h2 className="h-display">
                {work.titleLines.map((l) => (
                  <Mask key={l} as="span">{l}<br /></Mask>
                ))}
              </h2>
              <p className="statement text-ink/45 mt-8 max-w-[520px]">{work.desc}</p>
              <p className="f-mono text-ink/40 mt-6">{work.sideMono}</p>
            </div>
          </div>
        </div>
      </div>

      <GroupBand title={work.groups.live.title} mono={work.groups.live.mono} />
      <Stack items={live} />

      <GroupBand title={work.groups.concept.title} mono={work.groups.concept.mono} />
      <Stack items={concepts} />

      {/* full-bleed ALL PROJECTS banner */}
      <a
        href={work.allProjects.href}
        target="_blank" rel="noopener noreferrer"
        className="group relative z-[5] flex items-center justify-between gap-6 border-y border-ink/15 bg-cream px-frame h-[110px] min-[900px]:h-[150px] hover:bg-ink hover:text-cream transition-colors duration-500"
      >
        <span className="font-disp font-extrabold uppercase tracking-tight text-[clamp(1.4rem,2.6vw,2.4rem)]">
          <Flip>{work.allProjects.label}</Flip>
        </span>
        <span className="flex items-center gap-5">
          <span className="f-mono opacity-50 hidden sm:block">{work.allProjects.mono}</span>
          <span className="w-11 h-11 flex items-center justify-center bg-ink text-cream group-hover:bg-orange transition-colors duration-500">
            <Arrow />
          </span>
        </span>
      </a>
    </section>
  )
}

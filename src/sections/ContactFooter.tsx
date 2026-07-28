import { useState } from "react"
import type { FormEvent } from "react"
import { contact, site, socials, EMAIL } from "../config"
import { Anchor, Flip } from "../lib/anim"
import { Arrow, Chevron, SocialIcon } from "./Icons"
import { MAILTO } from "../config"

type SendState = "idle" | "sending" | "sent" | "error"

export default function ContactFooter() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [msg, setMsg] = useState("")
  const [state, setState] = useState<SendState>("idle")
  const ready = Boolean(name.trim() && email.trim() && msg.trim())

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!ready || state === "sending" || state === "sent") return
    setState("sending")
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: msg.trim(),
          _subject: `Website enquiry — ${name.trim()}`,
          _template: "table",
          _captcha: "false",
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setState("sent")
    } catch {
      // fallback: open the visitor's email app pre-filled
      setState("error")
      const subject = encodeURIComponent(`Website project — ${name.trim()}`)
      const body = encodeURIComponent(`${msg.trim()}\n\n— ${name.trim()}\n${email.trim()}`)
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    }
  }

  return (
    <footer id="contact" className="relative bg-ink text-cream rails rails--dark">
      <div className="rails-lines" aria-hidden="true" />
      <div className="relative z-[1] px-frame pt-[14svh]">
        {/* top: persona + form */}
        <div className="grid min-[1000px]:grid-cols-[minmax(280px,400px)_1fr] gap-x-[6vw] gap-y-16 items-start pb-20">
          {/* persona */}
          <div className="max-w-[400px]">
            <a href={MAILTO} className="bar-btn group border border-cream/10">
              <span className="bar-label font-semibold">
                <Flip>Get in Touch</Flip>
                <span className="bar-slash">{site.slashTag}</span>
              </span>
              <span className="bar-arrow"><Chevron /></span>
            </a>
            <div className="pt-6">
              <div className="flex items-center gap-2.5">
                <span className="sq" />
                <span className="font-disp font-bold uppercase tracking-wide text-[0.95rem]">{site.name}</span>
              </div>
              <div className="mt-5 border-t border-cream/10 py-3.5 flex justify-between gap-4">
                <span className="f-mono text-cream/45">Profession</span>
                <span className="f-mono font-semibold text-right">{site.role}</span>
              </div>
              <div className="border-t border-cream/10 py-3.5 flex justify-between gap-4">
                <span className="f-mono text-cream/45">Location</span>
                <span className="f-mono font-semibold text-right">{site.location}</span>
              </div>
            </div>
          </div>

          {/* heading + availability + form */}
          <div>
            <span className="lbl lbl-dark f-mono font-semibold mb-8 inline-flex">
              <span className="sq" />
              <span className="n">{contact.number}</span>
              {contact.label}
            </span>
            <h2 className="h-display mb-6">{contact.title}</h2>
            <p className="statement text-cream/45 max-w-[560px] mb-12">{contact.desc}</p>

            <div className="mb-12">
              <div className="font-disp font-bold uppercase tracking-wide text-lg">{site.availability.line1}</div>
              <div className="f-mono text-cream/45 mt-1">{site.availability.line2}</div>
            </div>

            <form onSubmit={submit} noValidate>
              <div className="field-label">
                <span className="sq" />
                <label htmlFor="cf-name" className="f-mono text-cream/70">{contact.form.nameLabel}</label>
              </div>
              <input id="cf-name" className="field-input mb-8" placeholder={contact.form.namePh} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />

              <div className="field-label">
                <span className="sq" />
                <label htmlFor="cf-email" className="f-mono text-cream/70">{contact.form.emailLabel}</label>
              </div>
              <input id="cf-email" type="email" className="field-input mb-8" placeholder={contact.form.emailPh} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />

              <div className="field-label">
                <span className="sq" />
                <label htmlFor="cf-msg" className="f-mono text-cream/70">{contact.form.msgLabel}</label>
              </div>
              <textarea id="cf-msg" className="field-input mb-8" placeholder={contact.form.msgPh} value={msg} onChange={(e) => setMsg(e.target.value)} />

              <button
                type="submit"
                disabled={!ready || state === "sending" || state === "sent"}
                className={`bar-btn group ${ready && state !== "sent" ? "" : "opacity-60 cursor-not-allowed"}`}
              >
                <span className="bar-label font-semibold justify-center">
                  {state === "sending" ? contact.form.sending
                    : state === "sent" ? contact.form.sent
                    : ready ? <Flip>{contact.form.send}</Flip>
                    : contact.form.incomplete}
                </span>
                <span className="bar-arrow"><Chevron /></span>
              </button>
              <p className="f-mono text-cream/35 mt-4">
                {contact.form.note}{" "}
                <a href={contact.form.noteIgHref} target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-orange transition-colors">
                  {contact.form.noteIg}
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* middle: link columns */}
        <div className="border-t border-cream/10 py-14 grid grid-cols-2 min-[900px]:grid-cols-3 gap-10">
          <div>
            <div className="f-mono text-cream/40 mb-5">{contact.navHeading}</div>
            <div className="flex flex-col gap-2.5">
              {contact.navLinks.map((l) => (
                <Anchor key={l.label} href={l.href} className="font-medium text-cream/70 hover:text-cream transition-colors w-fit">
                  {l.label}
                </Anchor>
              ))}
            </div>
          </div>
          <div>
            <div className="f-mono text-cream/40 mb-5">{contact.connectHeading}</div>
            <div className="flex flex-col gap-2.5">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 font-medium text-cream/70 hover:text-cream transition-colors w-fit">
                  <SocialIcon name={s.icon} size={14} />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="f-mono text-cream/40 mb-5">{contact.locationHeading}</div>
            <p className="font-medium text-cream/70 leading-relaxed">
              {site.location}<br />{site.country}
            </p>
          </div>
        </div>

        {/* big email */}
        <div className="border-t border-cream/10 py-16 flex flex-col items-center text-center">
          <a
            href={MAILTO}
            className="font-disp font-extrabold uppercase tracking-tight underline underline-offset-8 decoration-2 text-[clamp(1.5rem,3.6vw,3.4rem)] hover:text-orange transition-colors break-all"
          >
            {contact.bigEmail}
          </a>
          <a href={contact.contactMe.href} className="chip-btn text-cream font-semibold mt-10">
            <Flip>{contact.contactMe.label}</Flip>
            <span className="chip-arrow"><Arrow /></span>
          </a>
        </div>

        {/* bottom bar */}
        <div className="border-t border-cream/10 py-7 flex flex-wrap justify-between gap-3">
          <span className="f-mono text-cream/35">{contact.copyright}</span>
          <span className="f-mono text-cream/25">{contact.credit}</span>
        </div>
      </div>
    </footer>
  )
}

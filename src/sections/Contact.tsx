// ============================================================
// CONTACT SECTION — Intro + enquiry form
// ============================================================
import type { FormEvent } from 'react'
import { contactConfig } from '../config'

export default function Contact() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)

    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const business = String(form.get('business') || '')
    const websiteType = String(form.get('websiteType') || '')
    const goal = String(form.get('goal') || '')
    const message = String(form.get('message') || '')

    const subject = encodeURIComponent(
      `Website enquiry from ${business || name || 'a new lead'}`
    )

    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Business / Brand: ${business}`,
        `Website type: ${websiteType}`,
        '',
        `Main goal:`,
        goal,
        '',
        `Project details:`,
        message,
      ].join('\n')
    )

    window.location.href = `mailto:${contactConfig.email}?subject=${subject}&body=${body}`
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        width: '100%',
        background: '#252422',
        color: '#FFFCF2',
        zIndex: 2,
        padding: 'clamp(80px, 14vh, 140px) clamp(20px, 6vw, 80px)',
      }}
    >
      <div
        className="contact-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: 'clamp(48px, 8vw, 100px)',
          alignItems: 'start',
        }}
      >
        {/* Left column */}
        <div>
          <div
            className="font-mono-data"
            style={{
              fontSize: '0.65rem',
              color: '#EB5E28',
              letterSpacing: '0.15em',
              marginBottom: '22px',
            }}
          >
            {contactConfig.sectionLabel}
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: '0 0 24px 0',
              color: '#FFFCF2',
              maxWidth: '560px',
            }}
          >
            {contactConfig.title}
          </h2>

          <p
            className="font-body"
            style={{
              fontSize: '1rem',
              lineHeight: 1.8,
              color: 'rgba(255, 252, 242, 0.68)',
              margin: 0,
              maxWidth: '520px',
            }}
          >
            {contactConfig.paragraph}
          </p>
        </div>

        {/* Right column — form */}
        <form
          onSubmit={handleSubmit}
          className="contact-form"
          style={{
            width: '100%',
            border: '1px solid rgba(255, 252, 242, 0.14)',
            background: 'rgba(255, 252, 242, 0.045)',
            borderRadius: '2px',
            padding: 'clamp(22px, 3vw, 34px)',
            boxShadow: '0 28px 70px rgba(0, 0, 0, 0.22)',
          }}
        >
          <h3
            className="font-heading"
            style={{
              margin: '0 0 28px 0',
              color: '#FFFCF2',
              fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Tell me what you need.
          </h3>

          <div className="contact-form-row">
            <label className="contact-field">
              <span>Your name</span>
              <input name="name" type="text" placeholder="Your name" required />
            </label>

            <label className="contact-field">
              <span>Email address</span>
              <input name="email" type="email" placeholder="you@email.com" required />
            </label>
          </div>

          <label className="contact-field">
            <span>Business / brand name</span>
            <input
              name="business"
              type="text"
              placeholder="Example: Kopi Kita, Klinik Amani, etc."
            />
          </label>

          <label className="contact-field">
            <span>What kind of website do you need?</span>
            <select name="websiteType" defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              <option value="Landing page">Landing page</option>
              <option value="Business website">Business website</option>
              <option value="E-commerce website">E-commerce website</option>
              <option value="Website redesign / cleanup">Website redesign / cleanup</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </label>

          <label className="contact-field">
            <span>What do you want the website to help with?</span>
            <input
              name="goal"
              type="text"
              placeholder="Example: get enquiries, explain services, sell products..."
            />
          </label>

          <label className="contact-field">
            <span>Tell me a bit about the project</span>
            <textarea
              name="message"
              rows={5}
              placeholder="Share your idea, target customers, pages needed, references, deadline, or anything important."
              required
            />
          </label>

          <button type="submit" className="contact-submit font-body">
            Send enquiry
          </button>
        </form>
      </div>

      <style>{`
        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-bottom: 16px;
        }

        .contact-field span {
          font-family: Inter, sans-serif;
          font-size: 0.72rem;
          line-height: 1;
          color: rgba(255, 252, 242, 0.58);
          letter-spacing: 0.02em;
        }

        .contact-field input,
        .contact-field select,
        .contact-field textarea {
          width: 100%;
          border: 1px solid rgba(255, 252, 242, 0.14);
          background: rgba(255, 252, 242, 0.055);
          color: #FFFCF2;
          border-radius: 2px;
          padding: 14px 15px;
          font-family: Inter, sans-serif;
          font-size: 0.88rem;
          line-height: 1.4;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .contact-field textarea {
          resize: vertical;
          min-height: 130px;
        }

        .contact-field input::placeholder,
        .contact-field textarea::placeholder {
          color: rgba(255, 252, 242, 0.32);
        }

        .contact-field select {
          color: rgba(255, 252, 242, 0.78);
        }

        .contact-field select option {
          background: #252422;
          color: #FFFCF2;
        }

        .contact-field input:focus,
        .contact-field select:focus,
        .contact-field textarea:focus {
          border-color: rgba(235, 94, 40, 0.85);
          background: rgba(255, 252, 242, 0.08);
          box-shadow: 0 0 0 3px rgba(235, 94, 40, 0.08);
        }

        .contact-submit {
          width: 100%;
          min-height: 52px;
          border: 0;
          border-radius: 2px;
          background: #EB5E28;
          color: #252422;
          font-size: 0.9rem;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.22s ease, background 0.22s ease;
        }

        .contact-submit:hover {
          transform: translateY(-2px);
          background: #FFFCF2;
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 560px) {
          .contact-form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
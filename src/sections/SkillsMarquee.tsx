// ============================================================
// SKILLS MARQUEE — Continuous infinite tools section
// ============================================================
import { skillsConfig } from '../config'

export default function SkillsMarquee() {
  if (!skillsConfig.skills.length) return null

  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        width: '100%',
        background: '#FFFCF2',
        zIndex: 2,
        padding: 'clamp(60px, 10vh, 100px) 0',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 clamp(20px, 6vw, 80px)',
          marginBottom: '48px',
        }}
      >
        <div
          className="font-mono-data"
          style={{
            fontSize: '0.65rem',
            color: '#EB5E28',
            letterSpacing: '0.15em',
            marginBottom: '16px',
          }}
        >
          {skillsConfig.sectionLabel}
        </div>

        <h2
          className="font-heading"
          style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 700,
            color: '#252422',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 0 16px 0',
          }}
        >
          {skillsConfig.title}
        </h2>

        <p
          className="font-body"
          style={{
            fontSize: '0.95rem',
            color: '#403D39',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: 0,
          }}
        >
          {skillsConfig.description}
        </p>
      </div>

      {/* Continuous marquee */}
      <div
        className="skills-marquee"
        style={{
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          borderTop: '1px solid rgba(37, 36, 34, 0.08)',
          borderBottom: '1px solid rgba(37, 36, 34, 0.08)',
          padding: '28px 0',
        }}
      >
        <div className="skills-marquee-track">
          <div className="skills-marquee-group">
            {skillsConfig.skills.map((skill) => (
              <span key={skill} className="skills-marquee-item font-heading">
                {skill}
              </span>
            ))}
          </div>

          <div className="skills-marquee-group" aria-hidden="true">
            {skillsConfig.skills.map((skill) => (
              <span key={`${skill}-duplicate`} className="skills-marquee-item font-heading">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
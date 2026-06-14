// ============================================================
// ABOUT SECTION — Bio and background info
// ============================================================
import { aboutConfig } from '../config'

export default function About() {
  return (
    <section
      id="about"
      style={{
        position: 'relative',
        width: '100%',
        background: '#FFFCF2',
        zIndex: 2,
        padding: 'clamp(80px, 14vh, 140px) clamp(20px, 6vw, 80px)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}
        className="about-grid"
      >
        {/* Left column — text */}
        <div>
          <div
            className="font-mono-data"
            style={{
              fontSize: '0.65rem',
              color: '#EB5E28',
              letterSpacing: '0.15em',
              marginBottom: '20px',
            }}
          >
            {aboutConfig.sectionLabel}
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 700,
              color: '#252422',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '0 0 28px 0',
            }}
          >
            {aboutConfig.title}
          </h2>

          {aboutConfig.paragraph.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="font-body"
              style={{
                fontSize: '0.95rem',
                color: '#403D39',
                lineHeight: 1.75,
                margin: '0 0 18px 0',
              }}
            >
              {para}
            </p>
          ))}

          {/* Bullet points */}
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '28px 0 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {aboutConfig.points.map((point, i) => (
              <li
                key={i}
                className="font-body"
                style={{
                  fontSize: '0.85rem',
                  color: '#403D39',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    color: '#EB5E28',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    lineHeight: 1.4,
                    flexShrink: 0,
                  }}
                >
                  —
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Right column — image */}
        <div
          style={{
            borderRadius: '4px',
            aspectRatio: '4 / 5',
            position: 'relative',
            overflow: 'hidden',
            background: '#CCC5B9',
          }}
          className="about-visual"
        >
          <picture>
            <source media="(max-width: 768px)" srcSet="/images/potraitmobile.png" />
            <img
              src="/images/potraitdesktop.png"
              alt={aboutConfig.imageAlt}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </picture>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }

          .about-visual {
            aspect-ratio: 16 / 9 !important;
            max-height: 280px;
          }
        }
      `}</style>
    </section>
  )
}
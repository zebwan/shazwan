import { whyMeConfig } from '../config'

export default function WhyMe() {
  return (
    <section
      id="why-me"
      style={{
        position: 'relative',
        width: '100%',
        background: '#252422',
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
        className="whyme-grid"
      >
        {/* Left column — heading + paragraph */}
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
            {whyMeConfig.sectionLabel}
          </div>

          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 700,
              color: '#FFFCF2',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: '0 0 28px 0',
            }}
          >
            {whyMeConfig.title}
          </h2>

          {whyMeConfig.paragraph.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="font-body"
              style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 252, 242, 0.7)',
                lineHeight: 1.75,
                margin: '0 0 18px 0',
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Right column — benefit points */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            paddingTop: '48px',
          }}
          className="whyme-points"
        >
          {whyMeConfig.points.map((point, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                padding: '20px 24px',
                background: 'rgba(255, 252, 242, 0.03)',
                border: '1px solid rgba(255, 252, 242, 0.06)',
                borderRadius: '2px',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 252, 242, 0.06)'
                e.currentTarget.style.borderColor = 'rgba(235, 94, 40, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 252, 242, 0.03)'
                e.currentTarget.style.borderColor = 'rgba(255, 252, 242, 0.06)'
              }}
            >
              <span
                style={{
                  color: '#EB5E28',
                  fontSize: '1rem',
                  lineHeight: 1.4,
                  flexShrink: 0,
                  fontWeight: 700,
                }}
              >
                ✓
              </span>
              <span
                className="font-body"
                style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 252, 242, 0.8)',
                  lineHeight: 1.6,
                }}
              >
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .whyme-grid {
            grid-template-columns: 1fr !important;
          }
          .whyme-points {
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}

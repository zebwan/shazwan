import { servicesConfig } from '../config'

export default function Services() {
  return (
    <section
      id="services"
      style={{
        position: 'relative',
        width: '100%',
        background: '#252422',
        zIndex: 2,
        padding: 'clamp(80px, 14vh, 140px) clamp(20px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: 'clamp(40px, 6vh, 64px)' }}>
          <div
            className="font-mono-data"
            style={{
              fontSize: '0.65rem',
              color: '#EB5E28',
              letterSpacing: '0.15em',
              marginBottom: '16px',
            }}
          >
            {servicesConfig.sectionLabel}
          </div>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 700,
              color: '#FFFCF2',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: '600px',
            }}
          >
            {servicesConfig.title}
          </h2>
        </div>

        {/* Service cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1px',
            background: 'rgba(255, 252, 242, 0.08)',
          }}
          className="services-grid"
        >
          {servicesConfig.services.map((service, i) => (
            <div
              key={i}
              style={{
                background: '#252422',
                padding: 'clamp(28px, 4vw, 40px)',
                transition: 'background 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2e2c29'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#252422'
              }}
            >
              {/* Service number */}
              <div
                className="font-heading"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#EB5E28',
                  marginBottom: '16px',
                  letterSpacing: '0.04em',
                }}
              >
                0{i + 1}
              </div>

              {/* Service title */}
              <h3
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  fontWeight: 600,
                  color: '#FFFCF2',
                  lineHeight: 1.25,
                  letterSpacing: '-0.01em',
                  margin: '0 0 16px 0',
                }}
              >
                {service.title}
              </h3>

              {/* Service description */}
              <p
                className="font-body"
                style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 252, 242, 0.65)',
                  lineHeight: 1.7,
                  margin: '0 0 20px 0',
                }}
              >
                {service.copy}
              </p>

              {/* Good for */}
              <div
                className="font-mono-data"
                style={{
                  fontSize: '0.6rem',
                  color: 'rgba(255, 252, 242, 0.35)',
                  letterSpacing: '0.08em',
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: '#EB5E28', opacity: 0.7 }}>Good for: </span>
                {service.goodFor}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

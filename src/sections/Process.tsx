import { processConfig } from '../config'

export default function Process() {
  return (
    <section
      id="process"
      style={{
        position: 'relative',
        width: '100%',
        background: '#FFFCF2',
        zIndex: 2,
        padding: 'clamp(80px, 14vh, 140px) clamp(20px, 6vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: 'clamp(48px, 8vh, 72px)' }}>
          <div
            className="font-mono-data"
            style={{
              fontSize: '0.65rem',
              color: '#EB5E28',
              letterSpacing: '0.15em',
              marginBottom: '16px',
            }}
          >
            {processConfig.sectionLabel}
          </div>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 700,
              color: '#252422',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            {processConfig.title}
          </h2>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {processConfig.steps.map((step, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: 'clamp(20px, 4vw, 40px)',
                padding: 'clamp(28px, 4vh, 40px) 0',
                borderTop: '1px solid rgba(37, 36, 34, 0.1)',
                alignItems: 'start',
              }}
              className="process-step"
            >
              {/* Step number */}
              <div
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 800,
                  color: '#CCC5B9',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {step.number}
              </div>

              {/* Step content */}
              <div>
                <h3
                  className="font-heading"
                  style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                    fontWeight: 600,
                    color: '#252422',
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    margin: '0 0 10px 0',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-body"
                  style={{
                    fontSize: '0.9rem',
                    color: '#403D39',
                    lineHeight: 1.7,
                    margin: 0,
                    maxWidth: '520px',
                  }}
                >
                  {step.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-step {
            grid-template-columns: 56px 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .process-step {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  )
}

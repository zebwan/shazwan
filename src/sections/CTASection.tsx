import { ctaConfig } from '../config'

export default function CTASection() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        background: '#EB5E28',
        zIndex: 2,
        padding: 'clamp(80px, 14vh, 140px) clamp(20px, 6vw, 80px)',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Small label */}
        <div
          className="font-mono-data"
          style={{
            fontSize: '0.65rem',
            color: 'rgba(37, 36, 34, 0.6)',
            letterSpacing: '0.15em',
            marginBottom: '20px',
          }}
        >
          {ctaConfig.smallLabel}
        </div>

        {/* Title */}
        <h2
          className="font-heading"
          style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
            fontWeight: 700,
            color: '#252422',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: '0 0 20px 0',
          }}
        >
          {ctaConfig.title}
        </h2>

        {/* Paragraph */}
        <p
          className="font-body"
          style={{
            fontSize: '0.95rem',
            color: 'rgba(37, 36, 34, 0.75)',
            lineHeight: 1.7,
            margin: '0 auto 36px auto',
            maxWidth: '520px',
          }}
        >
          {ctaConfig.paragraph}
        </p>

        {/* Button */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <a
            href={ctaConfig.buttonHref}
            className="font-body"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#FFFCF2',
              background: '#252422',
              border: 'none',
              borderRadius: '2px',
              letterSpacing: '0.02em',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#403D39'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#252422'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            {ctaConfig.buttonLabel}
          </a>

          <a
            href={ctaConfig.secondaryHref}
            className="font-body"
            style={{
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'rgba(37, 36, 34, 0.7)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#252422')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(37, 36, 34, 0.7)')}
          >
            {ctaConfig.secondaryText}
          </a>
        </div>
      </div>
    </section>
  )
}

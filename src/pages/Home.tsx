import Navigation from '../sections/Navigation'
import FluidSubconscious from '../sections/FluidSubconscious'
import HeroOverlay from '../sections/HeroOverlay'
import SkillsMarquee from '../sections/SkillsMarquee'
import About from '../sections/About'
import Services from '../sections/Services'
import GenerativeCascade from '../sections/GenerativeCascade'
import Process from '../sections/Process'
import WhyMe from '../sections/WhyMe'
import CTASection from '../sections/CTASection'
import Contact from '../sections/Contact'
import DeepSpaceFold from '../sections/DeepSpaceFold'
import { footerConfig } from '../config'

export default function Home() {
  const hasFooter =
    !!footerConfig.brandText ||
    footerConfig.taglineLines.length > 0 ||
    footerConfig.navigationLinks.length > 0 ||
    footerConfig.contactLinks.length > 0 ||
    !!footerConfig.copyright

  return (
    <>
      <Navigation />

      {/* Hero — WebGL shader background + overlay */}
      <FluidSubconscious />
      <HeroOverlay />

      <main>
        {/* Light sections */}
        <SkillsMarquee />
        <About />

        {/* Dark sections */}
        <Services />

        {/* Selected Work — Gallery with sticky sidebar */}
        <div id="work">
          <GenerativeCascade />
        </div>

        {/* Light sections */}
        <Process />

        {/* Dark sections */}
        <WhyMe />

        {/* Orange CTA */}
        <CTASection />

        {/* Contact */}
        <Contact />

        {/* Kinetic text closing */}
        <DeepSpaceFold />

        {/* Footer */}
        {hasFooter && (
          <footer
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              background: '#252422',
              borderTop: '1px solid rgba(255, 252, 242, 0.06)',
              padding: 'clamp(60px, 10vh, 120px) clamp(20px, 6vw, 80px)',
            }}
          >
            <div
              className="footer-layout"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '48px',
                maxWidth: '1400px',
                margin: '0 auto',
              }}
            >
             {/* Brand */}
<div
  style={{
    maxWidth: '560px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '22px',
    flexWrap: 'wrap',
  }}
>
  <div
    style={{
      width: '112px',
      height: '140px',
      flexShrink: 0,
      overflow: 'hidden',
      background: '#403D39',
      border: '1px solid rgba(255, 252, 242, 0.08)',
    }}
  >
    <img
      src="/images/footer-shazwan.png"
      alt="Shazwan portrait"
      loading="lazy"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'block',
        filter: 'grayscale(100%)',
      }}
    />
  </div>

  <div style={{ paddingTop: '2px' }}>
    {footerConfig.brandText && (
      <div
        className="font-heading"
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 700,
          color: '#FFFCF2',
          marginBottom: '16px',
          letterSpacing: '-0.01em',
        }}
      >
        {footerConfig.brandText}
      </div>
    )}

    {footerConfig.taglineLines.length > 0 && (
      <div
        className="font-mono-data"
        style={{
          fontSize: '0.65rem',
          color: 'rgba(255, 252, 242, 0.3)',
          lineHeight: 1.8,
          letterSpacing: '0.08em',
        }}
      >
        {footerConfig.taglineLines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    )}
  </div>
</div>

              {/* Links */}
              {(footerConfig.navigationLinks.length > 0 || footerConfig.contactLinks.length > 0) && (
                <div
                  className="footer-links-wrap"
                  style={{
                    display: 'flex',
                    gap: 'clamp(32px, 6vw, 80px)',
                    flexWrap: 'wrap',
                  }}
                >
                  {footerConfig.navigationLinks.length > 0 && (
                    <div>
                      {footerConfig.navigationHeading && (
                        <div
                          className="font-mono-data"
                          style={{
                            fontSize: '0.6rem',
                            color: 'rgba(255, 252, 242, 0.25)',
                            letterSpacing: '0.2em',
                            marginBottom: '16px',
                          }}
                        >
                          {footerConfig.navigationHeading}
                        </div>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {footerConfig.navigationLinks.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            className="font-body"
                            style={{
                              fontSize: '0.85rem',
                              color: 'rgba(255, 252, 242, 0.55)',
                              letterSpacing: '0.02em',
                              fontWeight: 400,
                              textDecoration: 'none',
                              transition: 'color 0.2s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFCF2')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 252, 242, 0.55)')}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {footerConfig.contactLinks.length > 0 && (
                    <div>
                      {footerConfig.contactHeading && (
                        <div
                          className="font-mono-data"
                          style={{
                            fontSize: '0.6rem',
                            color: 'rgba(255, 252, 242, 0.25)',
                            letterSpacing: '0.2em',
                            marginBottom: '16px',
                          }}
                        >
                          {footerConfig.contactHeading}
                        </div>
                      )}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {footerConfig.contactLinks.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-body"
                            style={{
                              fontSize: '0.8rem',
                              color: 'rgba(255, 252, 242, 0.45)',
                              letterSpacing: '0.04em',
                              textDecoration: 'none',
                              transition: 'color 0.2s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFCF2')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 252, 242, 0.45)')}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom bar */}
            {(footerConfig.copyright || footerConfig.creditText) && (
              <div
                className="footer-bottom"
                style={{
                  marginTop: 'clamp(48px, 8vh, 80px)',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(255, 252, 242, 0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  maxWidth: '1400px',
                  margin: 'clamp(48px, 8vh, 80px) auto 0',
                }}
              >
                {footerConfig.copyright && (
                  <div
                    className="font-mono-data"
                    style={{
                      fontSize: '0.6rem',
                      color: 'rgba(255, 252, 242, 0.2)',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {footerConfig.copyright}
                  </div>
                )}
                {footerConfig.creditText && (
                  <div
                    className="font-mono-data"
                    style={{
                      fontSize: '0.6rem',
                      color: 'rgba(255, 252, 242, 0.15)',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {footerConfig.creditText}
                  </div>
                )}
              </div>
            )}
          </footer>
        )}
      </main>
    </>
  )
}

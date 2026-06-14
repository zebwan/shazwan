import { useEffect, useRef, useState } from 'react'
import { heroConfig } from '../config'

const TYPE_SPEED = 28
const DELAY_BEFORE_TYPE = 800

export default function HeroOverlay() {
  const paragraphSource = heroConfig.paragraph
  const [displayedText, setDisplayedText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [showCTAs, setShowCTAs] = useState(false)
  const indexRef = useRef(0)

  // Typewriter effect for paragraph
  useEffect(() => {
    if (!paragraphSource) {
      setTypingDone(true)
      return
    }
    const delayTimer = setTimeout(() => {
      const typeInterval = setInterval(() => {
        indexRef.current += 1
        if (indexRef.current <= paragraphSource.length) {
          setDisplayedText(paragraphSource.slice(0, indexRef.current))
        } else {
          clearInterval(typeInterval)
          setTypingDone(true)
        }
      }, TYPE_SPEED)
      return () => clearInterval(typeInterval)
    }, DELAY_BEFORE_TYPE)

    return () => clearTimeout(delayTimer)
  }, [paragraphSource])

  // Blink cursor then show CTAs
  useEffect(() => {
    if (!typingDone) return
    let blinkCount = 0
    const blinkInterval = setInterval(() => {
      blinkCount++
      setCursorVisible((v) => !v)
      if (blinkCount >= 6) {
        clearInterval(blinkInterval)
        setCursorVisible(false)
        setTimeout(() => setShowCTAs(true), 200)
      }
    }, 400)
    return () => clearInterval(blinkInterval)
  }, [typingDone])

  const scrollToWork = () => {
    const el = document.getElementById('work')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  if (!heroConfig.headline && !paragraphSource) {
    return null
  }

  return (
    <div
      className="hero-overlay"
      style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 'clamp(100px, 15vh, 160px) clamp(20px, 6vw, 80px)',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      {/* Small availability label */}
      {heroConfig.smallLabel && (
        <div
          className="font-mono-data"
          style={{
            fontSize: '0.65rem',
            color: '#EB5E28',
            letterSpacing: '0.15em',
            marginBottom: '24px',
            opacity: 0.9,
          }}
        >
          {heroConfig.smallLabel}
        </div>
      )}

      {/* Main headline */}
      {heroConfig.headline && (
        <h1
          className="font-heading"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#FFFCF2',
            textShadow: '0 2px 30px rgba(0,0,0,0.5)',
            margin: '0 0 32px 0',
            maxWidth: '800px',
          }}
        >
          {heroConfig.headline}
        </h1>
      )}

      {/* Typewriter paragraph */}
      {paragraphSource && (
        <div
          style={{
            maxWidth: '640px',
            minHeight: '80px',
            marginBottom: '40px',
          }}
        >
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
              fontWeight: 400,
              lineHeight: 1.7,
              color: 'rgba(255, 252, 242, 0.8)',
              textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.6)',
              letterSpacing: '0.01em',
              margin: 0,
            }}
          >
            {displayedText}
            <span
              style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                background: cursorVisible ? 'rgba(255,252,242,0.8)' : 'transparent',
                marginLeft: '4px',
                verticalAlign: 'text-bottom',
                transition: 'background 0.1s',
              }}
            />
          </p>
        </div>
      )}

      {/* CTA Buttons */}
      {(heroConfig.ctaPrimary.label || heroConfig.ctaSecondary.label) && (
        <div
          className="hero-actions"
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            opacity: showCTAs ? 1 : 0,
            transform: showCTAs ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            marginBottom: '40px',
          }}
        >
          {heroConfig.ctaPrimary.label && (
            <button
              onClick={scrollToWork}
              className="font-body"
              style={{
                padding: '12px 28px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#252422',
                background: '#EB5E28',
                border: 'none',
                borderRadius: '2px',
                letterSpacing: '0.02em',
                cursor: 'pointer',
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFFCF2'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#EB5E28'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {heroConfig.ctaPrimary.label}
            </button>
          )}
          {heroConfig.ctaSecondary.label && (
            <a
              href={heroConfig.ctaSecondary.href}
              className="font-body"
              style={{
                padding: '12px 28px',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: '#FFFCF2',
                background: 'transparent',
                border: '1px solid rgba(255, 252, 242, 0.3)',
                borderRadius: '2px',
                letterSpacing: '0.02em',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#FFFCF2'
                e.currentTarget.style.color = '#FFFCF2'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 252, 242, 0.3)'
                e.currentTarget.style.color = '#FFFCF2'
              }}
            >
              {heroConfig.ctaSecondary.label}
            </a>
          )}
        </div>
      )}

      {/* Support text */}
      {heroConfig.supportText && (
        <div
          className="font-mono-data"
          style={{
            fontSize: '0.6rem',
            color: 'rgba(255, 252, 242, 0.35)',
            letterSpacing: '0.15em',
            opacity: showCTAs ? 1 : 0,
            transition: 'opacity 1.2s ease 0.4s',
          }}
        >
          {heroConfig.supportText}
        </div>
      )}
    </div>
  )
}

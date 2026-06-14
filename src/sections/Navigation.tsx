import { useEffect, useState } from 'react'
import { navLinks, navCta } from '../config'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="site-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 clamp(20px, 4vw, 48px)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
        background: scrolled ? 'rgba(37, 36, 34, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 252, 242, 0.06)' : '1px solid transparent',
      }}
    >
  {/* Logo */}
<a
  href="#"
  className="font-heading"
  style={{
    fontSize: 'clamp(0.82rem, 1.4vw, 0.95rem)',
    fontWeight: 700,
    color: '#FFFCF2',
    textDecoration: 'none',
    letterSpacing: '0.08em',
  }}
>
  MHDSHAZWN.COM
</a>

      {/* Desktop Links */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }}
        className="nav-desktop"
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="font-body"
            style={{
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'rgba(255, 252, 242, 0.7)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFCF2')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 252, 242, 0.7)')}
          >
            {link.label}
          </a>
        ))}
        <a
          href={navCta.href}
          className="font-body"
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#252422',
            background: '#EB5E28',
            padding: '8px 18px',
            borderRadius: '2px',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            transition: 'background 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#FFFCF2'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#EB5E28'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {navCta.label}
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="nav-mobile-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          color: '#FFFCF2',
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '4px',
        }}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            display: 'none',
            position: 'absolute',
            top: '64px',
            left: 0,
            right: 0,
            background: 'rgba(37, 36, 34, 0.97)',
            backdropFilter: 'blur(20px)',
            padding: '24px',
            flexDirection: 'column',
            gap: '16px',
            borderBottom: '1px solid rgba(255, 252, 242, 0.08)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '1rem',
                fontWeight: 500,
                color: 'rgba(255, 252, 242, 0.8)',
                textDecoration: 'none',
                padding: '8px 0',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={navCta.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#252422',
              background: '#EB5E28',
              padding: '10px 20px',
              borderRadius: '2px',
              textDecoration: 'none',
              textAlign: 'center',
              marginTop: '8px',
            }}
          >
            {navCta.label}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .nav-mobile-menu { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

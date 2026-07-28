// ============================================================
// APP — single-page composition
// ============================================================
import { useState } from "react"
import { useSmoothScroll } from "./lib/anim"
import Nav from "./sections/Nav"
import MenuOverlay from "./sections/MenuOverlay"
import Hero from "./sections/Hero"
import Mission from "./sections/Mission"
import Work from "./sections/Work"
import Services from "./sections/Services"
import Process from "./sections/Process"
import FAQ from "./sections/FAQ"
import CTABand from "./sections/CTABand"
import ContactFooter from "./sections/ContactFooter"

export default function App() {
  useSmoothScroll()
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <>
      <Nav onMenu={() => setMenuOpen((v) => !v)} menuOpen={menuOpen} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <Mission />
        <Work />
        <Services />
        <Process />
        <FAQ />
        <CTABand />
        <ContactFooter />
      </main>
    </>
  )
}

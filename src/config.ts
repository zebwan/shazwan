// ============================================================
// SHAZWAN© PORTFOLIO — ALL CONTENT CONFIGURATION
// Edit this file to update text, links, and content across
// the entire website. No need to touch component files.
// ============================================================

export const EMAIL = "zebwan00@gmail.com"
export const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Website project enquiry")}`

export const site = {
  wordmark: "SHAZWAN©",
  brandShort: "SHAZWAN©",
  slashTag: "/SHAZWAN",
  name: "Mohd Shazwan Norisham",
  role: "Web Designer & Developer",
  location: "Kuala Lumpur · Johor Bahru",
  country: "Malaysia",
  timezone: "Asia/Kuala_Lumpur",
  activeYears: "©2019–2026",
  availability: { line1: "Taking new projects", line2: "August 2026" },
}

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/shazwan.sites", icon: "instagram" },
  { label: "GitHub", href: "https://github.com/zebwan", icon: "github" },
  { label: "Behance", href: "https://behance.net/mohdzebwan", icon: "behance" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohd-shazwan-norisham-40b2aa284", icon: "linkedin" },
] as const

export const hero = {
  statementLead: "I help SMEs and small businesses",
  statementRest: "build a stronger online presence through clean, modern websites.",
  services: [
    { n: "/01", label: "Web Design" },
    { n: "/02", label: "Web Development" },
    { n: "/03", label: "E-Commerce" },
  ],
  bottomBold: "Open for selected projects",
  bottomMono: "Kuala Lumpur · Johor Bahru — Malaysia",
  cta: { label: "Start Project", href: MAILTO },
}

export const mission = {
  number: "01",
  label: "My Mission",
  meta: "©2019–2026",
  intro:
    "Hi, I'm Shazwan. I help SMEs, brands, and growing businesses turn their ideas into clean, modern websites. I plan the structure, design the visual direction, and build responsive sites that feel clear, professional, and easy to trust.",
  stats: [
    {
      n: "01", label: "Projects", value: 30, suffix: "+",
      copy: "Websites and web projects shaped from first concept to polished build.",
    },
    {
      n: "02", label: "Live Websites", value: 8, suffix: "+",
      copy: "Client and commercial websites designed, built, and launched to production.",
    },
    {
      n: "03", label: "Years", value: 6, suffix: "+",
      copy: "Years across IT, web design, and front-end development.",
    },
    {
      n: "04", label: "Clients", value: 8, suffix: "+",
      copy: "Brands and businesses supported from early idea to final launch.",
    },
  ],
}

export type WorkKind = "live" | "concept"

export interface WorkItem {
  n: string
  kind: WorkKind
  /** live: the client's name — concept: what kind of brand it is */
  client: string
  title: string
  year: string
  caption: string
  image: string
  href: string
  /** the preview shot is a light-background site — needs a deeper scrim for legible text */
  light?: boolean
}

export const work = {
  number: "02",
  label: "Selected Work",
  titleLines: ["Selected", "Projects."],
  desc: "Each project shows how I approach design, structure, and development.",
  sideMono: "Live client sites + design concepts",
  groups: {
    live: {
      title: "Live Websites",
      mono: "Built, launched, and running today",
    },
    concept: {
      title: "Concepts",
      mono: "Self-initiated design studies",
    },
  },
  allProjects: { label: "All Projects", mono: "GitHub — 30+ repositories", href: "https://github.com/zebwan" },
  items: [
    {
      n: "01", kind: "live", client: "Motosaka", title: "Motosaka Detailing", year: "2026",
      caption: "An automotive detailing brand in Malaysia, given a bolder and more premium online presence from first concept to live website.",
      image: "images/projects/work-motosaka.jpg",
      href: "https://motosakadetailing.com",
    },
    {
      n: "02", kind: "live", client: "9NERS", title: "9NERS Detailing Studio", year: "2026",
      caption: "A car and bike detailing studio in Johor Bahru — full price list, gallery, and an online store, with booking handled over WhatsApp.",
      image: "images/projects/work-9ners.jpg",
      href: "https://9nersstudio.com",
    },
    {
      n: "03", kind: "live", client: "Nelfar Zulkifli", title: "Nelfar Zulkifli", year: "2026",
      caption: "A personal site for a property and strata management professional in Johor Bahru, built around her projects and field experience.",
      image: "images/projects/work-nelfar.jpg",
      light: true,
      href: "https://nelfarzulkifli.com",
    },
    {
      n: "04", kind: "live", client: "AKSB Global", title: "AKSB Global", year: "2026",
      caption: "A multi-page corporate website for a highway maintenance and engineering company.",
      image: "images/projects/work-aksb.jpg",
      href: "https://aksbglobal.com",
    },
    {
      n: "05", kind: "concept", client: "Design portfolio", title: "Shazwan Folio", year: "2026",
      caption: "A portfolio concept laid out like a design canvas — rulers, selection handles, and a cursor that inverts whatever it passes over.",
      image: "images/projects/work-folio.jpg",
      light: true,
      href: "https://zebwan.github.io/shazwan-folio/",
    },
    {
      n: "06", kind: "concept", client: "Visual studio", title: "Imagify", year: "2026",
      caption: "A minimal visual-studio concept working across identity, image, and film.",
      image: "images/projects/work-imagify.jpg",
      light: true,
      href: "https://zebwan.github.io/imagify/",
    },
    {
      n: "07", kind: "concept", client: "Fashion house", title: "Chup Studio", year: "2026",
      caption: "A fashion-house concept built around calm layouts, bold typography, and smooth motion.",
      image: "images/projects/work-chup.jpg",
      light: true,
      href: "https://zebwan.github.io/chup/",
    },
    {
      n: "08", kind: "concept", client: "Tattoo studio", title: "TatzMy Studio", year: "2026",
      caption: "A custom tattoo studio concept in Kuala Lumpur — Bornean tribal, oriental, and fine-line work.",
      image: "images/projects/work-tatzmy.jpg",
      href: "https://zebwan.github.io/tatzmy/",
    },
    {
      n: "09", kind: "concept", client: "Residential development", title: "Seri Ampuan", year: "2026",
      caption: "A low-rise residence concept in Penang, carried by long scroll transitions and full-bleed photography.",
      image: "images/projects/work-seriampuan.jpg",
      light: true,
      href: "https://zebwan.github.io/seri-ampuan/",
    },
    {
      n: "10", kind: "concept", client: "Bakery and kopi", title: "Tepung", year: "2026",
      caption: "A neighbourhood bakery concept in Kuala Lumpur — warm type, a daily menu, and a shopfront that feels open.",
      image: "images/projects/work-tepung.jpg",
      light: true,
      href: "https://zebwan.github.io/tepung/",
    },
  ] as WorkItem[],
}

export const services = {
  number: "03",
  label: "Services",
  titleLines: ["What I", "Create."],
  desc: "Websites that help your business look clearer, better, and easier to trust.",
  card: {
    label: "Contact",
    title: "Plan your next website with me.",
    cta: { label: "Email Me", href: MAILTO },
  },
  items: [
    {
      n: "01", title: "Landing Pages",
      copy: "A simple one-page website made to introduce your offer clearly. Good for promotions, personal brands, service pages, or small businesses that just need a clean place to send people.",
      goodFor: "New offers · portfolios · service pages · ads · small launches",
    },
    {
      n: "02", title: "Business Websites",
      copy: "A proper website for businesses that need more than one page. I help structure the important sections, organise the content, and make the website feel professional on both desktop and mobile.",
      goodFor: "Company profiles · service businesses · agencies · clinics · studios",
    },
    {
      n: "03", title: "E-Commerce",
      copy: "For businesses that want to sell products online. I set up a clean store layout with product sections, simple navigation, and a shopping experience that feels easy for customers to use.",
      goodFor: "Online stores · product brands · catalogue-style websites",
    },
    {
      n: "04", title: "Redesign & Cleanup",
      copy: "For websites that already exist but feel outdated, messy, or hard to use. I clean up the layout, improve the flow, and make the overall website feel more polished.",
      goodFor: "Old websites · weak landing pages · messy layouts · unclear branding",
    },
  ],
}

export const process = {
  number: "04",
  label: "Process",
  titleLines: ["Simple Process,", "Cleaner Result."],
  desc: "From the first conversation to the final handoff, I keep the process simple and clear.",
  steps: [
    {
      n: "01", eyebrow: "Understand", title: "Project Direction",
      copy: "I start by understanding what the website needs to do, who it is for, and what kind of impression it should give.",
    },
    {
      n: "02", eyebrow: "Plan", title: "Structure & Flow",
      copy: "I map out the sections, content flow, references, and structure before jumping into the design.",
    },
    {
      n: "03", eyebrow: "Design", title: "Visual Direction",
      copy: "I create the visual direction, layout, spacing, and section style so the website feels consistent from top to bottom.",
    },
    {
      n: "04", eyebrow: "Build", title: "Development",
      copy: "I turn the design into a responsive website using the right tools — custom code, WordPress, Framer, or a mix depending on the project.",
    },
    {
      n: "05", eyebrow: "Refine", title: "Final Polish",
      copy: "I adjust the details, test the mobile view, clean up the flow, and make sure the final website feels ready to go live.",
    },
  ],
  orangeCard: {
    title: "Ready to start?",
    copy: "Tell me about your business, your goals, and where you want the website to go.",
    listLabel: "What you get",
    checklist: ["Free intro chat", "Honest scope & recommendation", "Clear next steps"],
    cta: { label: "Email Me", href: MAILTO },
  },
}

export const faq = {
  number: "05",
  label: "FAQ",
  titleLines: ["Quick", "Answers."],
  desc: "Everything you should know before we start designing and building.",
  items: [
    {
      n: "01", q: "What do you offer?",
      a: "I design and build websites for SMEs, brands, and growing businesses — landing pages, business websites, e-commerce, and redesigns. Depending on the project, I work with custom code (HTML, CSS, JavaScript, React) or CMS platforms like WordPress with Elementor.\n\nThe goal is always the same: a website that looks clean, feels easy to use, and presents your business properly.",
    },
    {
      n: "02", q: "Do you only do custom code?",
      a: "No — I choose the right tool for each project. Custom-coded websites when you want full design control, WordPress and Elementor when you want to manage content yourself, and Framer for fast, interactive builds.",
    },
    {
      n: "03", q: "How long does a project take?",
      a: "It depends on the scope. A simple landing page moves quickly, while a full business website or e-commerce build takes longer. After our first chat, I'll give you a clear timeline before any work starts.",
    },
    {
      n: "04", q: "Can you redesign my existing website?",
      a: "Yes. If your current website feels outdated, messy, or hard to use, I can clean up the layout, improve the flow, and make the whole thing feel properly built again.",
    },
    {
      n: "05", q: "Will I be able to edit the website myself?",
      a: "If we build on WordPress or another CMS — yes, you'll be able to update content yourself. For custom-coded websites, I hand over clean, organised code and can help with updates whenever you need them.",
    },
    {
      n: "06", q: "How do we start?",
      a: "Email me a few details about your business and what you need. I'll reply with initial thoughts, a rough scope, and clear next steps — no pressure, no jargon.",
    },
  ],
}

export const ctaBand = {
  label: "Have something in mind?",
  titleLines: ["Let's turn it into a website", "that looks proper."],
  cta: { label: "Start a Project", href: MAILTO },
}

export const contact = {
  number: "06",
  label: "Contact",
  title: "Create your next website with me.",
  desc: "From first concept to final build, I create websites with clear structure and smooth interactions.",
  form: {
    nameLabel: "Your Name", namePh: "e.g. Aiman Hakim",
    emailLabel: "Email Address", emailPh: "you@company.com",
    msgLabel: "How can I help?", msgPh: "I need a website for ...",
    incomplete: "Form Incomplete",
    send: "Send Message",
    sending: "Sending ...",
    sent: "Message Sent ✓",
    note: "Goes straight to my inbox — or DM me on Instagram",
    noteIg: "@shazwan.sites",
    noteIgHref: "https://www.instagram.com/shazwan.sites",
  },
  navHeading: "Navigate",
  navLinks: [
    { label: "Home", href: "#top" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
  connectHeading: "Connect",
  locationHeading: "Location",
  bigEmail: EMAIL.toUpperCase(),
  contactMe: { label: "Contact Me", href: MAILTO },
  copyright: "© 2026 Mohd Shazwan Norisham — All rights reserved.",
  credit: "Built with care, caffeine on the side.",
}

export const menu = {
  links: [
    { label: "Home", href: "#top" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  featured: [
    { label: "Motosaka Detailing", image: "images/projects/work-motosaka.jpg", href: "https://motosakadetailing.com" },
    { label: "9NERS Detailing Studio", image: "images/projects/work-9ners.jpg", href: "https://9nersstudio.com" },
  ],
}

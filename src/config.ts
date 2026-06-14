// ============================================================
// SHAZWAN PORTFOLIO — ALL CONTENT CONFIGURATION
// Edit this file to update text, links, and content across
// the entire website. No need to touch component files.
// ============================================================

// ---- Site Meta ----
export interface SiteConfig {
  language: string
  title: string
  description: string
  brandName: string
}

export const siteConfig: SiteConfig = {
  language: "en",
  title: "Shazwan — Web Designer & Developer",
  description: "Mohd Shazwan Norisham — Web Designer & Developer. I design and build clean websites that help brands look more serious online.",
  brandName: "Shazwan",
}

// ---- Navigation ----
export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
    { label: "About", href: "#about" },

  { label: "Services", href: "#services" },
 { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
]

export const navCta = {
  label: "Start a project",
  href: "mailto:zebwan00@gmail.com",
}

// ---- Hero Section ----
export interface HeroConfig {
  smallLabel: string
  headline: string
  paragraph: string
  ctaPrimary: { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  supportText: string
  fluidImagePath: string
}

export const heroConfig: HeroConfig = {
  smallLabel: "Available for selected website projects",
  headline: "I help SMEs and small businesses build a stronger online presence through clean, modern websites.",
  paragraph: "I'm Shazwan, a web designer and developer focused on landing pages, business websites, and e-commerce websites. My goal is to help businesses present themselves better online with websites that are clear, responsive, and easy for customers to trust.",
  ctaPrimary: { label: "View my work", href: "#work" },
  ctaSecondary: { label: "Let's build a website", href: "mailto:zebwan00@gmail.com" },
  supportText: "",
  fluidImagePath: "/images/hero-source.jpg",
}

// ---- Skills / Marquee Section ----
export interface SkillsConfig {
  sectionLabel: string
  title: string
  description: string
  skills: string[]
}

export const skillsConfig: SkillsConfig = {
  sectionLabel: "Tools I work with",
  title: "The stack behind the work.",
  description: "A mix of design tools, front-end code, CMS platforms, and practical workflows I use to plan, build, test, and launch websites.",
  skills: ["HTML", "CSS", "JavaScript", "React", "PHP", "MySQL", "WordPress", "Elementor", "Framer", "Figma"],
}

// ---- About Section ----
export interface AboutConfig {
  sectionLabel: string
  title: string
  paragraph: string
  points: string[]
  imageAlt: string
}

export const aboutConfig: AboutConfig = {
  sectionLabel: "About me",
  title: "I build clean and practical websites for businesses that want to look better online.",
  paragraph: "I'm Shazwan, a Junior Web Designer & Developer with a background in computer science. Most of my work focuses on landing pages, business websites, e-commerce websites, and custom web projects.\n\nI care about the small details, how the website looks, how it feels on mobile, how the sections flow, and whether it helps the business present itself properly.",
  points: [
    "Websites that look clean and easy to understand",
    "Focused on small business and brand websites",
    "Built with mobile users in mind",
    "Open to working from ideas, references, or existing brand direction",
  ],
  imageAlt: "Portrait of Shazwan",
}
// ---- Services Section ----
export interface ServiceItem {
  title: string
  copy: string
  goodFor: string
}

export interface ServicesConfig {
  sectionLabel: string
  title: string
  services: ServiceItem[]
}

export const servicesConfig: ServicesConfig = {
  sectionLabel: "Services",
  title: "Websites that help your business look clearer, better, and easier to trust.",
  services: [
    {
      title: "Landing page design & development",
      copy: "A simple one-page website made to introduce your offer clearly. Good for promotions, personal brands, service pages, or small businesses that just need a clean place to send people.",
      goodFor: "New offers, portfolios, service pages, ads, small business launches",
    },
    {
      title: "Business website design & development",
      copy: "A proper website for businesses that need more than one page. I help structure the important sections, organise the content, and make the website feel professional on both desktop and mobile.",
      goodFor: "Company profiles, service businesses, agencies, clinics, studios, local brands",
    },
    {
      title: "E-commerce websites",
      copy: "For businesses that want to sell products online. I can help set up a clean store layout with product sections, simple navigation, and a shopping experience that feels easy for customers to use.",
      goodFor: "Online stores, product brands, small businesses, catalogue-style websites",
    },
    {
      title: "Website redesign & cleanup",
      copy: "For websites that already exist, but feel outdated, messy, or hard to use. I help clean up the layout, improve the flow, and make the overall website feel more polished.",
      goodFor: "Old websites, weak landing pages, messy layouts, unclear brand presentation",
    },
  ],
}

// ---- Selected Work / Gallery ----
export interface WorkItem {
  id: string
  title: string
  type: string
  status: string
  metrics: string
  image: string
  artist: string
  location: string
  medium: string
  article: string
  link?: string
}

export interface GalleryConfig {
  eyebrowLabel: string
  titleLines: string[]
  stats: { label: string; value: string }[]
  sideLabel: string
  works: WorkItem[]
}
export const galleryConfig: GalleryConfig = {
  eyebrowLabel: "SELECTED PROJECTS",
  titleLines: ["Selected", "Projects"],
  stats: [
    { label: "Featured", value: "4 projects" },
    { label: "Live work", value: "1 project" },
    { label: "Concept work", value: "3 projects" },
  ],
  sideLabel: "CLIENT + CONCEPT WORK",
  works: [
    {
      id: "",
      title: "Motosaka Detailing",
      type: "bike-detailing-website",
      status: "VIEW LIVE",
      metrics: "2026",
      image: "/images/work-motosaka.png",
      artist: "Mohd Shazwan Norisham",
      location: "Malaysia",
      medium: "Figma, HTML, CSS, JavaScript",
      article: "One of the selected projects from my portfolio, built for an automotive detailing brand that needed a stronger and cleaner online presence.\n\nThe website focuses on bold visuals, clear service presentation, and a premium feel that matches the business. It was designed to help visitors quickly understand the services, packages, and overall brand quality.\n\nThis is the live project in this selected set.",
      link: "https://motosakadetailing.com",
    },
    {
      id: "",
      title: "Valehouse Estates",
      type: "real-estates-website",
      status: "VIEW LIVE CONCEPT",
      metrics: "2025",
      image: "/images/work-valehouse.png",
      artist: "Mohd Shazwan Norisham",
      location: "Malaysia",
      medium: "React, HTML, CSS, JavaScript",
      article: "A selected concept project created around a property and real estate direction.\n\nThe focus was on clean property sections, calm visual spacing, and a layout that feels suitable for showcasing homes, spaces, and property details. I wanted the design to feel structured, polished, and easy to browse.\n\nThis concept was chosen because it shows how I approach layout, content flow, and visual direction for a business-style website.",
      link: "https://zebwan.github.io/valehouse-estates/",
    },
    {
      id: "",
      title: "Travel Dulu",
      type: "traveling-agency-website",
      status: "VIEW LIVE CONCEPT",
      metrics: "2026",
      image: "/images/work-traveldulu.png",
      artist: "Mohd Shazwan Norisham",
      location: "Malaysia",
      medium: "HTML, CSS, JavaScript",
      article: "A selected concept project built around a travel website direction.\n\nThe design focuses on simple content flow, warm destination-style visuals, and a layout that feels easy for users to explore. The goal was to create something that feels inviting without making the website too crowded.\n\nThis concept was chosen because it shows how I build mood, structure, and usability into a website idea.",
      link: "https://zebwan.github.io/travel-dulu/",
    },
    {
      id: "",
      title: "Maison Ember",
      type: "aesthetic-cafe-website",
      status: "VIEW LIVE CONCEPT",
      metrics: "2024",
      image: "/images/work-maisonember.png",
      artist: "Mohd Shazwan Norisham",
      location: "Malaysia",
      medium: "React, HTML, CSS, JavaScript",
      article: "A selected concept project with a lifestyle and interior-inspired direction.\n\nThe website was built around soft visuals, clean spacing, and a more refined brand feel. It focuses less on heavy effects and more on mood, layout balance, and how the sections sit together.\n\nThis concept was chosen because it reflects the kind of clean, polished website style I enjoy building.",
      link: "https://zebwan.github.io/maison-ember/",
    },
  ],
}

// ---- Process Section ----
export interface ProcessStep {
  number: string
  title: string
  copy: string
}

export interface ProcessConfig {
  sectionLabel: string
  title: string
  steps: ProcessStep[]
}

export const processConfig: ProcessConfig = {
  sectionLabel: "Process",
  title: "Simple process, cleaner result.",
  steps: [
    {
      number: "01",
      title: "Understand",
      copy: "I start by understanding what the website needs to do, who it is for, and what kind of impression it should give.",
    },
    {
      number: "02",
      title: "Plan",
      copy: "I map out the sections, content flow, references, and structure before jumping into the design.",
    },
    {
      number: "03",
      title: "Design",
      copy: "I create the visual direction, layout, spacing, and section style so the website feels consistent from top to bottom.",
    },
    {
      number: "04",
      title: "Build",
      copy: "I turn the design into a responsive website using the right tools, whether custom code, WordPress, Framer, or a mix depending on the project.",
    },
    {
      number: "05",
      title: "Refine",
      copy: "I adjust the details, test the mobile view, clean up the flow, and make sure the final website feels ready to go live.",
    },
  ],
}

// ---- Why Work With Me Section ----
export interface WhyMeConfig {
  sectionLabel: string
  title: string
  paragraph: string
  points: string[]
}

export const whyMeConfig: WhyMeConfig = {
  sectionLabel: "Why me",
  title: "I care about the small things people notice, even when they don't say it.",
  paragraph: "A good website is not just about putting sections together. The spacing, mobile layout, typography, colours, buttons, image choices, and content order all affect how people feel when they land on the page.\n\nI focus on making websites look intentional, easy to understand, and suitable for the brand. Nothing too noisy. Nothing too generic. Just a clean website that feels properly built.",
  points: [
    "Responsive layouts that work on mobile",
    "Clean visual direction based on the brand",
    "Simple content flow that visitors can understand quickly",
    "Custom-coded and CMS-based options depending on the project",
    "Design decisions that feel intentional, not random",
  ],
}

// ---- CTA Section ----
export interface CTAConfig {
  smallLabel: string
  title: string
  paragraph: string
  buttonLabel: string
  buttonHref: string
  secondaryText: string
  secondaryHref: string
}

export const ctaConfig: CTAConfig = {
  smallLabel: "Have something in mind?",
  title: "Let's turn it into a website that looks proper.",
  paragraph: "Whether it's a landing page, business website, or e-commerce project, I can help shape the structure, design direction, and build.",
  buttonLabel: "Start a project",
  buttonHref: "mailto:zebwan00@gmail.com",
  secondaryText: "Or view selected work first",
  secondaryHref: "#work",
}

// ---- Contact Section ----
export interface ContactConfig {
  sectionLabel: string
  title: string
  paragraph: string
  email: string
  links: { label: string; href: string }[]
  buttonLabel: string
}

export const contactConfig: ContactConfig = {
  sectionLabel: "Contact",
  title: "Let's talk about your website.",
  paragraph: "Got a business, brand, or idea that needs a cleaner online presence? Send me the details and I'll help you figure out the best way to build it.",
  email: "zebwan00@gmail.com",
  links: [
    { label: "Website", href: "https://mhdshazwn.com" },
    { label: "GitHub", href: "https://github.com/zebwan" },
    { label: "Behance", href: "https://behance.net/mohdzebwan" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mohd-shazwan-norisham-40b2aa284" },
  ],
  buttonLabel: "Email me",
}

// ---- The Instant / Kinetic Text Section ----
export interface InstantConfig {
  textLines: [string, string, string] | string[]
  videoPath: string
  roomLabel: string
}

export const instantConfig: InstantConfig = {
  textLines: ["Build", "clean websites that feel intentional", "Design, develop, and launch with purpose."],
  videoPath: "",
  roomLabel: "",
}

// ---- Footer ----
export interface FooterConfig {
  brandText: string
  taglineLines: string[]
  navigationHeading: string
  navigationLinks: NavLink[]
  contactHeading: string
  contactLinks: NavLink[]
  copyright: string
  creditText: string
}

export const footerConfig: FooterConfig = {
  brandText: "Hi, I'm Shazwan",
  taglineLines: [
    "I design, and develop",
    "Responsive websites",
    "For SMEs and Brands",
  ],
  navigationHeading: "NAVIGATION",
  navigationLinks: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  contactHeading: "CONNECT",
  contactLinks: [
    { label: "GitHub", href: "https://github.com/zebwan" },
    { label: "Behance", href: "https://behance.net/mohdzebwan" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mohd-shazwan-norisham-40b2aa284" },
    { label: "Email", href: "mailto:zebwan00@gmail.com" },
  ],
  copyright: "© 2026 Mohd Shazwan Norisham",
  creditText: "Built with care, caffeine on the side, and probably too many layout tweaks.",
}

// ---- Work Detail Page Labels ----
export interface WorkDetailConfig {
  backLabel: string
  artistLabel: string
  locationLabel: string
  mediumLabel: string
  backToGalleryLabel: string
  metaRoomSuffix: string
  footerNote: string
  notFoundTitle: string
  notFoundLink: string
}

export const workDetailConfig: WorkDetailConfig = {
  backLabel: "← BACK",
  artistLabel: "Developer",
  locationLabel: "Location",
  mediumLabel: "Stack",
  backToGalleryLabel: "← Back to projects",
  metaRoomSuffix: "PROJECT",
  footerNote: "Shazwan · Portfolio 2026",
  notFoundTitle: "404 · Project not found",
  notFoundLink: "← BACK TO PROJECTS",
}

// Helper map for WorkDetail lookups
export const worksById: Record<string, WorkItem> = Object.fromEntries(
  galleryConfig.works.map((w) => [w.id.toLowerCase(), w]),
)

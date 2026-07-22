export type Project = {
  slug: string;
  title: string;
  category: string;
  /** One-line description. Truthful only — no invented metrics. */
  summary: string;
  year: number;
  stack: string[];
  liveUrl: string;
  /** Screenshot lives in /public/projects/ */
  screenshot: string;
  /**
   * Per-project tint sampled from the real screenshot. The room re-lights
   * in this colour as the user scrolls into the chapter.
   *
   * NOTE: All tints below are PROVISIONAL placeholders. Replace each by
   * sampling the actual screenshot in a later phase.
   */
  tint: string;
  /** Optional — unused for now. Never render a dead link. */
  caseStudyUrl?: string;
};

export const projects: Project[] = [
  {
    // Flagship — opens the show. Hero consumes projects[0].
    slug: "moveup-pro",
    title: "MoveUp Pro",
    category: "Web Application",
    // TODO: Abdul to confirm/edit
    summary:
      "Property management platform with authentication, role-based access, payments and reporting.",
    year: 2024,
    stack: ["Next.js", "TypeScript", "Auth", "Payments", "Dashboards"],
    liveUrl: "https://example.com/moveup-pro",
    screenshot: "/projects/moveup-pro.jpg",
    tint: "#4C7DFF", // PROVISIONAL
  },
  {
    slug: "bravo-roofing",
    title: "Bravo Roofing Idaho",
    category: "Local Business",
    // TODO: Abdul to confirm/edit
    summary:
      "Conversion-focused roofing website with dedicated local service pages built to drive customer enquiries.",
    year: 2024,
    stack: ["Next.js", "Responsive", "Local SEO"],
    liveUrl: "https://example.com/bravo-roofing",
    screenshot: "/projects/bravo-roofing.jpg",
    tint: "#FF7A29", // PROVISIONAL
  },
  {
    slug: "safal-capital",
    title: "Safal Capital",
    category: "Finance",
    // TODO: Abdul to confirm/edit
    summary:
      "Full visual redesign for an investment and wealth-management firm.",
    year: 2023,
    stack: ["Next.js", "UI Redesign", "Design System"],
    liveUrl: "https://example.com/safal-capital",
    screenshot: "/projects/safal-capital.jpg",
    tint: "#1E9E6A", // PROVISIONAL
  },
  {
    slug: "twilio-dialer",
    title: "Twilio Dialer Platform",
    category: "Communications",
    // TODO: Abdul to confirm/edit
    summary:
      "Multi-line calling and conference management system built on the Twilio API.",
    year: 2023,
    stack: ["React", "Node.js", "Twilio API"],
    liveUrl: "https://example.com/twilio-dialer",
    screenshot: "/projects/twilio-dialer.jpg",
    tint: "#F22F46", // PROVISIONAL
  },
  {
    slug: "ideal-floors",
    title: "Ideal Floors Idaho",
    category: "Local Business",
    // TODO: Abdul to confirm/edit
    summary:
      "Flooring company website and advertising landing pages designed around lead generation.",
    year: 2024,
    stack: ["Next.js", "Landing Pages", "CRO"],
    liveUrl: "https://example.com/ideal-floors",
    screenshot: "/projects/ideal-floors.jpg",
    tint: "#C99A6B", // PROVISIONAL
  },
  {
    slug: "websitelift",
    title: "WebsiteLift",
    category: "Agency",
    // TODO: Abdul to confirm/edit
    summary: "Business website for a UK web development agency.",
    year: 2023,
    stack: ["Next.js", "Tailwind", "SEO"],
    liveUrl: "https://example.com/websitelift",
    screenshot: "/projects/websitelift.jpg",
    tint: "#38B6FF", // PROVISIONAL
  },
];

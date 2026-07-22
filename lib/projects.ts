export type Project = {
  slug: string;
  title: string;
  category: string;
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
};

export const projects: Project[] = [
  {
    // Flagship — opens the show. Hero consumes projects[0].
    slug: "moveup-pro",
    title: "MoveUp Pro",
    category: "Property Ops Platform",
    year: 2024,
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    liveUrl: "https://example.com/moveup-pro",
    screenshot: "/projects/moveup-pro.jpg",
    tint: "#4C7DFF", // PROVISIONAL
  },
  {
    slug: "bravo-roofing",
    title: "Bravo Roofing",
    category: "Marketing Site",
    year: 2024,
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com/bravo-roofing",
    screenshot: "/projects/bravo-roofing.jpg",
    tint: "#FF7A29", // PROVISIONAL
  },
  {
    slug: "ideal-floors",
    title: "Ideal Floors",
    category: "Marketing Site",
    year: 2024,
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com/ideal-floors",
    screenshot: "/projects/ideal-floors.jpg",
    tint: "#C99A6B", // PROVISIONAL
  },
  {
    slug: "twilio-dialer",
    title: "Twilio Dialer",
    category: "Web App",
    year: 2023,
    stack: ["React", "TypeScript", "Twilio"],
    liveUrl: "https://example.com/twilio-dialer",
    screenshot: "/projects/twilio-dialer.jpg",
    tint: "#F22F46", // PROVISIONAL
  },
  {
    slug: "websitelift",
    title: "WebsiteLift",
    category: "Marketing Site",
    year: 2023,
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com/websitelift",
    screenshot: "/projects/websitelift.jpg",
    tint: "#38B6FF", // PROVISIONAL
  },
  {
    slug: "safal-capital",
    title: "Safal Capital",
    category: "Financial Site",
    year: 2023,
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com/safal-capital",
    screenshot: "/projects/safal-capital.jpg",
    tint: "#1E9E6A", // PROVISIONAL
  },
];

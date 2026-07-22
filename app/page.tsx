import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Abdul Rehman — Full-Stack Developer",
};

// TEMPORARY anchor test sections — verify header active link + tint relight
// while scrolling. These die in Prompt 5.
const TEST_SECTIONS = [
  { id: "work", label: "Work", tint: "#4C7DFF" },
  { id: "capabilities", label: "Capabilities", tint: "#FF7A29" },
  { id: "process", label: "Process", tint: "#1E9E6A" },
  { id: "about", label: "About", tint: "#C99A6B" },
];

export default function Home() {
  return (
    <main>
      <Hero />

      {TEST_SECTIONS.map((s) => (
        <section
          key={s.id}
          id={s.id}
          data-section={s.id}
          data-tint={s.tint}
          style={{ "--tint": s.tint } as React.CSSProperties}
          className="flex min-h-[90vh] items-center justify-center border-b border-[var(--line-dark)]"
        >
          <h2 className="display text-[9vw] text-bone">{s.label}</h2>
        </section>
      ))}
    </main>
  );
}

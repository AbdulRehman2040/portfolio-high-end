"use client";

import { useEffect, useState } from "react";

const BONE = "var(--color-bone)";

type ActiveSection = {
  activeId: string | null;
  activeTint: string;
};

/**
 * Tracks which `[data-section]` is crossing the upper third of the viewport
 * and exposes its `data-tint`. IntersectionObserver only — no scroll listeners.
 *
 * The negative rootMargin collapses the observation area to a thin band at
 * ~33% from the top; whichever section overlaps that band wins.
 */
export function useActiveSection(): ActiveSection {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTint, setActiveTint] = useState<string>(BONE);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );
    if (sections.length === 0) return;

    const visibility = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.section;
          if (id) visibility.set(id, entry.isIntersecting);
        }

        // First section (in DOM order) currently overlapping the band wins.
        const current = sections.find(
          (section) => section.dataset.section && visibility.get(section.dataset.section),
        );

        if (current) {
          setActiveId(current.dataset.section ?? null);
          setActiveTint(current.dataset.tint || BONE);
        }
      },
      { rootMargin: "-33% 0px -66% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return { activeId, activeTint };
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

type MarqueeProps = {
  items: ReactNode[];
  /** pixels per second */
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
};

/**
 * Dependency-free marquee. The track renders the item list twice and a CSS
 * keyframe translates it -50% for a seamless loop; the duplicate list is
 * aria-hidden. Duration = single-list width / speed (measured once + on
 * resize — no scroll/RAF loop). Reduced motion → static wrapped row.
 *
 * No edge-fade masks: items slide past hard edges by design.
 */
export function Marquee({
  items,
  speed = 45,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const el = listRef.current;
    if (!el) return;
    const measure = () => setDuration(el.scrollWidth / speed);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [reduce, speed, items]);

  if (reduce) {
    return (
      <div className={className}>
        <ul className="flex flex-wrap items-center justify-center gap-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-center">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={`group/marq overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max ${
          pauseOnHover
            ? "group-hover/marq:[animation-play-state:paused]"
            : ""
        }`}
        style={{
          animationDuration: duration ? `${duration}s` : "0s",
          animationPlayState: duration ? undefined : "paused",
        }}
      >
        <ul ref={listRef} className="flex w-max shrink-0 items-center">
          {items.map((item, i) => (
            <li key={i} className="flex items-center">
              {item}
            </li>
          ))}
        </ul>
        <ul aria-hidden="true" className="flex w-max shrink-0 items-center">
          {items.map((item, i) => (
            <li key={i} className="flex items-center">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

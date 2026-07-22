"use client";

import { useSyncExternalStore } from "react";

/**
 * True below the md breakpoint (<768px). Subscription-based so it avoids
 * setState-in-effect and stays hydration-safe (server snapshot = desktop).
 */
export function useIsMobile() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );
}

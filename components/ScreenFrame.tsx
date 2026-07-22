"use client";

import Image from "next/image";
import { useState } from "react";

type ScreenFrameProps = {
  src: string;
  alt: string;
  /** Fallback label shown as a placard if the screenshot is missing. */
  title: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** When true, the image zooms 1.015 while an ancestor `group/media` is hovered. */
  hoverZoom?: boolean;
};

/**
 * A lit screen hanging in the dark room: `.frame` + `.screenlight` around a
 * fill `next/image`. If the screenshot file is absent, a built-in placeholder
 * keeps the layout intact so pages work before real assets land.
 *
 * Reusable — the hero and the work gallery both mount this.
 */
export function ScreenFrame({
  src,
  alt,
  title,
  priority = false,
  sizes = "(min-width: 768px) 58vw, 100vw",
  className = "",
  hoverZoom = false,
}: ScreenFrameProps) {
  const [failed, setFailed] = useState(false);
  const zoom = hoverZoom
    ? "transition-transform duration-[250ms] ease-[var(--ease-out)] group-hover/media:scale-[1.015]"
    : "";

  return (
    <div
      className={`frame screenlight relative aspect-[16/10] w-full ${className}`}
    >
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-iron">
          <span className="mono-label">{title}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={`object-cover ${zoom}`}
        />
      )}
    </div>
  );
}

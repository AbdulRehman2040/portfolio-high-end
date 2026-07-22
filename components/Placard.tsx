type PlacardProps = {
  index: number;
  title: string;
  category: string;
  liveUrl: string;
  className?: string;
};

/**
 * One-line gallery caption beneath a ScreenFrame.
 * Left: numbered mono placard. Right: live status dot + "LIVE ↗" link.
 * Reusable — hero and work gallery share it.
 */
export function Placard({
  index,
  title,
  category,
  liveUrl,
  className = "",
}: PlacardProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 ${className}`}
    >
      <span className="mono-label">
        {String(index).padStart(2, "0")} — {title} · {category}
      </span>
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group mono-label inline-flex items-center gap-1.5 transition-colors duration-[var(--dur-fast)] hover:text-bone"
      >
        <span
          aria-hidden="true"
          className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-live"
        />
        Live
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
        >
          ↗
        </span>
      </a>
    </div>
  );
}

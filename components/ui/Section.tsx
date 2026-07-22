import type { CSSProperties, ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  /** Overrides --tint for everything inside this chapter. */
  tint?: string;
  /** Houselights: the one light section (About) — bone bg, carbon text. */
  light?: boolean;
  id?: string;
  /** Sets data-section for the active-section observer contract. */
  dataSection?: string;
  /** Vertical padding; override per section. */
  py?: string;
  className?: string;
};

type TintStyle = CSSProperties & { ["--tint"]?: string };

export function Section({
  children,
  tint,
  light = false,
  id,
  dataSection,
  py = "py-24 md:py-36",
  className = "",
}: SectionProps) {
  // Light sections resolve --tint to carbon so selection, focus rings and
  // ghost-hover read correctly on the houselights background.
  const resolvedTint = tint ?? (light ? "var(--color-carbon)" : undefined);
  const style: TintStyle | undefined = resolvedTint
    ? { ["--tint"]: resolvedTint }
    : undefined;

  return (
    <section
      id={id}
      data-section={dataSection}
      // Only chapters expose a data-tint to the header; light sections don't,
      // so the nav underline stays monochrome (bone) while About is active.
      data-tint={tint}
      style={style}
      className={`${light ? "bg-houselights text-carbon" : ""} ${py} ${className}`}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        {children}
      </div>
    </section>
  );
}

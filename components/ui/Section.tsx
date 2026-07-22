import type { CSSProperties, ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  /** Overrides --tint for everything inside this chapter. */
  tint?: string;
  /** Houselights: the one light section (About) — bone bg, carbon text. */
  light?: boolean;
  id?: string;
  className?: string;
};

type TintStyle = CSSProperties & { ["--tint"]?: string };

export function Section({
  children,
  tint,
  light = false,
  id,
  className = "",
}: SectionProps) {
  const style: TintStyle | undefined = tint ? { ["--tint"]: tint } : undefined;

  return (
    <section
      id={id}
      style={style}
      className={`${light ? "bg-houselights text-carbon" : ""} py-24 md:py-36 ${className}`}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        {children}
      </div>
    </section>
  );
}

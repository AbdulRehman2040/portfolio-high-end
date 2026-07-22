import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const base =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-sm)] px-6 font-sans font-medium " +
  "transition-colors duration-[var(--dur-fast)] ease-[var(--ease-out)]";

const variants: Record<Variant, string> = {
  // bone → tint on hover. In monochrome context tint = bone, so it stays calm.
  primary:
    "bg-bone text-backstage hover:bg-[var(--tint)]",
  // transparent, hairline border → border + text become tint on hover.
  ghost:
    "border border-[var(--line-dark)] text-bone hover:border-[var(--tint)] hover:text-[var(--tint)]",
};

export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {variant === "ghost" && (
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
        >
          ↗
        </span>
      )}
    </a>
  );
}

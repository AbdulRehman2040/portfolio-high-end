import type { ReactNode } from "react";

type MonoLabelProps = {
  children: ReactNode;
  /** Optional index prefix, rendered as e.g. "01 —". */
  index?: string | number;
  className?: string;
};

export function MonoLabel({ children, index, className = "" }: MonoLabelProps) {
  return (
    <span className={`mono-label ${className}`}>
      {index !== undefined && (
        <span aria-hidden="true">
          {typeof index === "number"
            ? String(index).padStart(2, "0")
            : index}{" "}
          —{" "}
        </span>
      )}
      {children}
    </span>
  );
}

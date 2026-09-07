import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /**
   * "scroll" (default) animates as the element scrolls into view.
   * "mount" animates once on load — use it for above-the-fold content.
   */
  mode?: "scroll" | "mount";
  /** Stagger offset in seconds. Only meaningful with mode="mount". */
  delay?: number;
}

/**
 * Entrance animation wrapper.
 *
 * Implemented in CSS rather than JavaScript: a scroll-driven animation is
 * deterministic, costs no client bundle, and — crucially — degrades to fully
 * visible content in browsers that do not support it or when a visitor has
 * scripting disabled. See the `.rise` / `.reveal` utilities in globals.css.
 */
export function Reveal({ children, className, mode = "scroll", delay }: RevealProps) {
  const style =
    mode === "mount" && delay
      ? ({ "--rise-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties)
      : undefined;

  return (
    <div className={cn(mode === "mount" ? "rise" : "reveal", className)} style={style}>
      {children}
    </div>
  );
}

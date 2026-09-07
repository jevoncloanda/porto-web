import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Accessible name for the landmark, when no visible heading is inside. */
  label?: string;
  /** Alternating page bands replace card borders as the separator. */
  tone?: "base" | "alt";
}

/** Vertical rhythm wrapper. Every homepage section uses this. */
export function Section({ children, id, className, label, tone = "base" }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn("py-section", tone === "alt" ? "bg-bg-alt" : "bg-bg", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

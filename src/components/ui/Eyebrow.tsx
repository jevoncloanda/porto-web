import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/** Small uppercase section label with a leading accent rule. */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-label font-medium tracking-[0.18em] text-accent uppercase",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-accent" />
      {children}
    </p>
  );
}

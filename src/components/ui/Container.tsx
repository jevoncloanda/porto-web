import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Narrow measure for long-form reading (case studies, resume body). */
  width?: "page" | "reading";
}

export function Container({ children, className, width = "page" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        width === "page" ? "max-w-page" : "max-w-reading",
        className,
      )}
    >
      {children}
    </div>
  );
}

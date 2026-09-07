import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Optional trailing control, e.g. a "View all" link. */
  action?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-reading">
        {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
        <Heading className="text-h2 font-semibold text-fg">{title}</Heading>
        {description ? (
          <p className="mt-4 text-lead text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type NoticeTone = "accent" | "muted";

const TONES: Record<NoticeTone, string> = {
  accent: "border-accent/30 bg-accent/[0.07]",
  muted: "border-border bg-surface/60",
};

interface NoticeProps {
  children: ReactNode;
  tone?: NoticeTone;
  icon?: ReactNode;
  className?: string;
}

/** Inline callout used for confidentiality notes, placeholder warnings and MDX callouts. */
export function Notice({ children, tone = "muted", icon, className }: NoticeProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-card border-l-2 border-y-0 border-r-0 px-5 py-4 text-sm text-muted",
        TONES[tone],
        className,
      )}
    >
      {icon ? <span className="mt-0.5 shrink-0 text-accent">{icon}</span> : null}
      <div className="[&>p]:m-0">{children}</div>
    </div>
  );
}

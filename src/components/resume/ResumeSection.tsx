import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ResumeSection({ title, children, className }: ResumeSectionProps) {
  return (
    <section className={cn("resume-section mt-8", className)}>
      <h2 className="border-b border-neutral-300 pb-1.5 text-[0.6875rem] tracking-[0.16em] text-neutral-500 uppercase">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

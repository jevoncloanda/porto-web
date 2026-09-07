import type { ReactNode } from "react";

interface ResumeSectionProps {
  title: string;
  children: ReactNode;
}

export function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <section className="resume-section mt-8">
      <h2 className="border-b border-neutral-300 pb-1.5 text-[0.6875rem] tracking-[0.16em] text-neutral-500 uppercase">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

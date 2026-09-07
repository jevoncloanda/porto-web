import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/cn";
import type { ProjectMeta } from "@/lib/types";

interface ProjectGridProps {
  projects: ProjectMeta[];
  columns?: 2 | 3;
  /** Marks the first cover as LCP-critical (homepage only). */
  priorityFirst?: boolean;
  className?: string;
}

const COLUMNS: Record<2 | 3, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

const SIZES: Record<2 | 3, string> = {
  2: "(min-width: 1280px) 36rem, (min-width: 640px) 45vw, 100vw",
  3: "(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 100vw",
};

export function ProjectGrid({
  projects,
  columns = 2,
  priorityFirst,
  className,
}: ProjectGridProps) {
  return (
    <ul className={cn("grid gap-x-8 gap-y-14", COLUMNS[columns], className)}>
      {projects.map((project, index) => (
        <li key={project.slug} className="flex">
          <ProjectCard
            project={project}
            sizes={SIZES[columns]}
            priority={priorityFirst && index === 0}
            className="w-full"
          />
        </li>
      ))}
    </ul>
  );
}

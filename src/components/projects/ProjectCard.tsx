import { ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";

import { ProjectCover } from "@/components/projects/ProjectCover";
import { cn } from "@/lib/cn";
import { PROJECT_TYPE_LABELS, type ProjectMeta } from "@/lib/types";

const MAX_VISIBLE_TAGS = 4;

interface ProjectCardProps {
  project: ProjectMeta;
  sizes: string;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({ project, sizes, priority, className }: ProjectCardProps) {
  const visibleTags = project.stack.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTagCount = project.stack.length - visibleTags.length;

  return (
    <article className={cn("group relative flex h-full flex-col", className)}>
      <ProjectCover project={project} sizes={sizes} priority={priority} />

      <div className="flex flex-1 flex-col pt-6">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-label tracking-[0.18em] text-subtle uppercase">
          <span>{PROJECT_TYPE_LABELS[project.type]}</span>
          {project.category ? (
            <>
              <span aria-hidden>·</span>
              <span>{project.category}</span>
            </>
          ) : null}
          <span aria-hidden>·</span>
          <span>{project.year}</span>
          {project.confidential ? (
            <span className="inline-flex items-center gap-1 text-accent">
              <Lock size={11} aria-hidden />
              Confidential
            </span>
          ) : null}
          {project.placeholder ? (
            <span className="text-subtle">Placeholder</span>
          ) : null}
        </p>

        <h3 className="mt-3 text-h3 font-semibold text-fg">
          {/* The whole card is the click target; the link stretches over it. */}
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          {visibleTags.length > 0 ? (
            <p className="text-xs text-subtle">
              {visibleTags.join("  ·  ")}
              {hiddenTagCount > 0 ? `  ·  +${hiddenTagCount}` : ""}
            </p>
          ) : (
            <span />
          )}

          <ArrowUpRight
            size={20}
            aria-hidden
            className="shrink-0 text-subtle transition-colors duration-(--duration-fast) group-hover:text-accent"
          />
        </div>
      </div>
    </article>
  );
}

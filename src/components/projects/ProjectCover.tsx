import Image from "next/image";

import { cn } from "@/lib/cn";
import type { ProjectMeta } from "@/lib/types";

interface ProjectCoverProps {
  project: ProjectMeta;
  /** Responsive sizes hint for next/image. */
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Project cover image with a graceful fallback: a project without a `cover`
 * renders a typographic placeholder instead of a broken image.
 */
export function ProjectCover({ project, sizes, priority, className }: ProjectCoverProps) {
  return (
    <div
      className={cn(
        "relative aspect-16/10 w-full overflow-hidden bg-surface",
        className,
      )}
    >
      {project.cover ? (
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-(--duration-slow) ease-(--ease-out-expo) group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-label tracking-[0.18em] text-subtle uppercase">
            No cover image
          </span>
        </div>
      )}
    </div>
  );
}

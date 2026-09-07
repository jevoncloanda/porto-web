import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";

import { ProjectCover } from "@/components/projects/ProjectCover";
import { Button } from "@/components/ui/Button";
import { Notice } from "@/components/ui/Notice";
import { CONFIDENTIAL_NOTICE } from "@/lib/confidential";
import { resolveHref } from "@/lib/placeholder";
import { PROJECT_TYPE_LABELS, type ProjectMeta } from "@/lib/types";

export function ProjectHeader({ project }: { project: ProjectMeta }) {
  const live = resolveHref(project.links.live);
  const github = resolveHref(project.links.github);
  const article = resolveHref(project.links.article);

  return (
    <header>
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-label tracking-[0.18em] text-subtle uppercase transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} aria-hidden />
        All projects
      </Link>

      <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-label tracking-[0.18em] text-subtle uppercase">
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
      </p>

      <h1 className="mt-5 max-w-[22ch] text-h1 font-semibold text-fg">
        {project.title}
      </h1>

      {project.subtitle ? (
        <p className="mt-4 max-w-reading text-h3 text-muted">{project.subtitle}</p>
      ) : null}

      <p className="mt-6 max-w-reading text-lead text-muted">{project.summary}</p>

      {live || github || article ? (
        <div className="mt-8 flex flex-wrap gap-3">
          {live ? (
            <Button href={live} external size="sm">
              Live site
              <ArrowUpRight size={15} aria-hidden />
            </Button>
          ) : null}
          {github ? (
            <Button href={github} external variant="secondary" size="sm">
              Source
              <ArrowUpRight size={15} aria-hidden />
            </Button>
          ) : null}
          {article ? (
            <Button href={article} external variant="secondary" size="sm">
              Write-up
              <ArrowUpRight size={15} aria-hidden />
            </Button>
          ) : null}
        </div>
      ) : null}

      {project.confidential ? (
        <Notice tone="accent" icon={<Lock size={15} aria-hidden />} className="mt-8">
          <p>{CONFIDENTIAL_NOTICE}</p>
        </Notice>
      ) : null}

      {project.placeholder ? (
        <Notice className="mt-4">
          <p>
            <span className="font-medium text-fg">Placeholder content.</span> This
            case study is demo content shipped with the template. Replace{" "}
            <code className="font-mono text-fg">
              content/projects/{project.slug}.mdx
            </code>{" "}
            with a real project.
          </p>
        </Notice>
      ) : null}

      {/* A project without a cover skips the block entirely rather than
          showing a large empty frame. */}
      {project.cover ? (
        <div className="mt-12 overflow-hidden">
          <ProjectCover
            project={project}
            sizes="(min-width: 1280px) 72rem, 100vw"
            priority
          />
        </div>
      ) : null}
    </header>
  );
}

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MdxContent } from "@/components/mdx/MdxContent";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectMetaList } from "@/components/projects/ProjectMetaList";
import { Container } from "@/components/ui/Container";
import {
  getAllProjects,
  getProjectBySlug,
  getProjectNeighbours,
  toProjectMeta,
} from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import type { ProjectMeta } from "@/lib/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  return pageMetadata({
    title: project.title,
    description: project.summary,
    pathname: `/projects/${project.slug}`,
    image: project.cover,
    type: "article",
  });
}

function NeighbourLink({
  project,
  direction,
}: {
  project: ProjectMeta;
  direction: "previous" | "next";
}) {
  const isPrevious = direction === "previous";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-1 flex-col gap-2 border-t-2 border-border pt-5 transition-colors hover:border-accent"
    >
      <span className="flex items-center gap-2 text-label tracking-[0.18em] text-subtle uppercase">
        {isPrevious ? <ArrowLeft size={13} aria-hidden /> : null}
        {isPrevious ? "Previous" : "Next"}
        {isPrevious ? null : <ArrowRight size={13} aria-hidden />}
      </span>
      <span className="text-h3 font-medium text-fg transition-colors group-hover:text-accent">
        {project.title}
      </span>
    </Link>
  );
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const meta = toProjectMeta(project);
  const { previous, next } = await getProjectNeighbours(slug);

  return (
    <article className="pt-28 pb-24 sm:pt-36 sm:pb-32">
      <Container>
        <ProjectHeader project={meta} />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <ProjectMetaList project={meta} />
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="max-w-reading">
              <MdxContent source={project.body} />
            </div>
            <ProjectGallery images={meta.gallery} />
          </div>
        </div>

        {previous || next ? (
          <nav
            aria-label="More projects"
            className="mt-24 flex flex-col gap-4 border-t border-border pt-12 sm:flex-row"
          >
            {previous ? (
              <NeighbourLink project={previous} direction="previous" />
            ) : (
              <span className="hidden flex-1 sm:block" />
            )}
            {next ? <NeighbourLink project={next} direction="next" /> : null}
          </nav>
        ) : null}
      </Container>
    </article>
  );
}

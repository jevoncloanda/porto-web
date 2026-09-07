import type { Metadata } from "next";

import { ProjectBrowser } from "@/components/projects/ProjectBrowser";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getAllProjects, toProjectMeta } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Selected engineering work — case studies covering the problem, the approach and the outcome.",
  pathname: "/projects",
});

export default async function ProjectsPage() {
  const projects = (await getAllProjects()).map(toProjectMeta);

  return (
    <Container className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <header className="max-w-reading">
        <Eyebrow>Projects</Eyebrow>
        <h1 className="accent-rule mt-6 text-h1 font-semibold text-fg">
          Selected work
        </h1>
        <p className="mt-8 text-lead text-muted">
          Case studies covering the problem, the constraints and the decisions
          behind each build. Confidential work is presented without client detail.
        </p>
      </header>

      <div className="mt-16">
        {projects.length > 0 ? (
          <ProjectBrowser projects={projects} />
        ) : (
          <p className="border border-dashed border-border px-6 py-16 text-center text-muted">
            No projects yet. Add an MDX file to{" "}
            <code className="text-fg">content/projects/</code> to get
            started.
          </p>
        )}
      </div>
    </Container>
  );
}

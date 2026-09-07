import { ArrowRight } from "lucide-react";

import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ProjectMeta } from "@/lib/types";

export function FeaturedProjects({ projects }: { projects: ProjectMeta[] }) {
  if (projects.length === 0) return null;

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Selected work"
        title="Featured projects"
        action={
          <Button href="/projects" variant="secondary" size="sm">
            All projects
            <ArrowRight size={15} aria-hidden />
          </Button>
        }
      />

      <Reveal>
        <ProjectGrid projects={projects} columns={2} priorityFirst className="mt-16" />
      </Reveal>
    </Section>
  );
}

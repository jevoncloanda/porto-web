import type { MetadataRoute } from "next";

import { getAllProjects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();

  return [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/projects"), priority: 0.8 },
    { url: absoluteUrl("/resume"), priority: 0.6 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      priority: 0.7,
    })),
  ];
}

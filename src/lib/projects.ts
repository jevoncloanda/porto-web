import { cache } from "react";
import matter from "gray-matter";

import { projectSources } from "@/generated/project-sources";
import {
  PROJECT_TYPES,
  type Project,
  type ProjectFrontmatter,
  type ProjectImage,
  type ProjectMeta,
  type ProjectType,
} from "@/lib/types";

const MDX_EXTENSION = ".mdx";

function isProjectType(value: unknown): value is ProjectType {
  return PROJECT_TYPES.includes(value as ProjectType);
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function toGallery(value: unknown, fallbackAlt: string): ProjectImage[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item): ProjectImage[] => {
    if (!item || typeof item !== "object") return [];
    const image = item as Partial<ProjectImage>;
    if (typeof image.src !== "string" || image.src.length === 0) return [];

    return [
      {
        src: image.src,
        alt: typeof image.alt === "string" && image.alt ? image.alt : fallbackAlt,
        caption: typeof image.caption === "string" ? image.caption : undefined,
      },
    ];
  });
}

/**
 * Applies defaults and drops anything malformed. A single broken content file
 * must never take the whole build down, so invalid projects are skipped with a
 * warning that names the file.
 */
function normalize(slug: string, data: Partial<ProjectFrontmatter>): ProjectMeta | null {
  const problems: string[] = [];

  if (typeof data.title !== "string" || !data.title.trim()) problems.push("title");
  if (typeof data.summary !== "string" || !data.summary.trim()) problems.push("summary");
  if (typeof data.year !== "number" || !Number.isFinite(data.year)) problems.push("year");
  if (!isProjectType(data.type)) problems.push("type");

  if (problems.length > 0) {
    console.warn(
      `[projects] Skipping content/projects/${slug}${MDX_EXTENSION}: invalid or missing frontmatter (${problems.join(", ")}).`,
    );
    return null;
  }

  const title = data.title as string;
  const coverAlt = data.coverAlt ?? `Cover image for ${title}`;

  return {
    slug,
    title,
    subtitle: data.subtitle,
    summary: data.summary as string,
    year: data.year as number,
    type: data.type as ProjectType,
    category: data.category,
    role: data.role,
    period: data.period,
    featured: data.featured === true,
    featuredOrder:
      typeof data.featuredOrder === "number" ? data.featuredOrder : Number.MAX_SAFE_INTEGER,
    confidential: data.confidential === true,
    placeholder: data.placeholder === true,
    stack: toStringArray(data.stack),
    cover: typeof data.cover === "string" && data.cover ? data.cover : undefined,
    coverAlt,
    gallery: toGallery(data.gallery, coverAlt),
    links: {
      live: data.links?.live,
      github: data.links?.github,
      article: data.links?.article,
    },
    order: typeof data.order === "number" ? data.order : 0,
  };
}

/** Newest first; `order` breaks ties, then title for stability. */
function byRecency(a: ProjectMeta, b: ProjectMeta): number {
  if (a.year !== b.year) return b.year - a.year;
  if (a.order !== b.order) return a.order - b.order;
  return a.title.localeCompare(b.title);
}

/** Every project, including its MDX body. Cached per request/render pass. */
export const getAllProjects = cache(async (): Promise<Project[]> => {
  const projects = await Promise.all(
    Object.entries(projectSources).map(async ([file, raw]): Promise<Project | null> => {
      const slug = file.slice(0, -MDX_EXTENSION.length);
      const { data, content } = matter(raw);

      const meta = normalize(slug, data as Partial<ProjectFrontmatter>);
      if (!meta) return null;

      return { ...meta, body: content };
    }),
  );

  return projects
    .filter((project): project is Project => project !== null)
    .sort(byRecency);
});

export async function getProjectSlugs(): Promise<string[]> {
  const projects = await getAllProjects();
  return projects.map((project) => project.slug);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug);
}

export async function getFeaturedProjects(limit?: number): Promise<Project[]> {
  const projects = await getAllProjects();
  const featured = projects
    .filter((project) => project.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder || byRecency(a, b));
  // Fall back to the most recent work so the homepage is never empty.
  const list = featured.length > 0 ? featured : projects;
  return typeof limit === "number" ? list.slice(0, limit) : list;
}

/** Adjacent projects for the case-study footer navigation. */
export async function getProjectNeighbours(slug: string): Promise<{
  previous?: ProjectMeta;
  next?: ProjectMeta;
}> {
  const projects = await getAllProjects();
  const current = projects.find((project) => project.slug === slug);
  if (!current) return {};

  // Keep real case-study navigation focused on real work. Demo templates still
  // link through the full content set so their optional-state examples remain
  // easy to inspect during development.
  const neighbours = current.placeholder
    ? projects
    : projects.filter((project) => !project.placeholder);
  const index = neighbours.findIndex((project) => project.slug === slug);
  if (index === -1) return {};

  return {
    previous: neighbours[index - 1],
    next: neighbours[index + 1],
  };
}

/** Drops the MDX body so only serialisable metadata crosses to client components. */
export function toProjectMeta(project: Project): ProjectMeta {
  const { body, ...meta } = project;
  void body;
  return meta;
}

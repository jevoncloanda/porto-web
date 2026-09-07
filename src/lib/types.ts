/**
 * Content model.
 *
 * Every piece of portfolio content is typed here so the content files under
 * `content/` and the presentation components under `src/components/` share a
 * single contract. Components must never redefine these shapes locally.
 */

/* ---------------------------------- Profile --------------------------------- */

export interface ProfileImage {
  src: string;
  alt: string;
  /** Intrinsic size of the source file, used by next/image. */
  width: number;
  height: number;
}

export interface ProfileLinks {
  github: string;
  linkedin: string;
  /** Optional extras — omit the key entirely when unused. */
  x?: string;
  website?: string;
}

export interface Profile {
  name: string;
  /** Professional title, e.g. "Software Engineer". */
  title: string;
  location?: string;
  email: string;
  /** One or two sentences used in the hero and as the SEO description. */
  shortBio: string;
  /** Longer bio, one string per paragraph. */
  bio: string[];
  photo?: ProfileImage;
  /** Short availability note rendered next to the hero status dot. */
  availability?: string;
  links: ProfileLinks;
}

/* -------------------------------- Experience -------------------------------- */

export interface ExperienceEntry {
  company: string;
  role: string;
  /** Human readable range, e.g. "2023 — Present". */
  period: string;
  location?: string;
  description?: string;
  /** Optional. Never populate with anything that was not provided. */
  achievements?: string[];
  technologies?: string[];
  url?: string;
}

/* ---------------------------------- Skills ---------------------------------- */

export interface SkillCategory {
  title: string;
  description?: string;
  items: string[];
}

/* --------------------------------- Resume ----------------------------------- */

export interface EducationEntry {
  institution: string;
  qualification: string;
  period: string;
  location?: string;
  description?: string;
}

export interface CertificationEntry {
  name: string;
  issuer?: string;
  year?: string;
}

/* --------------------------------- Projects --------------------------------- */

export const PROJECT_TYPES = [
  "professional",
  "client",
  "open-source",
  "personal",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  /** Any additional public reference, e.g. an article or a talk. */
  article?: string;
}

/**
 * Frontmatter accepted by `content/projects/*.mdx`.
 * Required: title, summary, year, type. Everything else is optional.
 */
export interface ProjectFrontmatter {
  title: string;
  subtitle?: string;
  summary: string;
  year: number;
  type: ProjectType;
  /** Free-form grouping shown as a filter on /projects, e.g. "Web App". */
  category?: string;
  role?: string;
  period?: string;
  featured?: boolean;
  confidential?: boolean;
  /** Marks demo content so the UI can label it honestly. */
  placeholder?: boolean;
  stack?: string[];
  cover?: string;
  coverAlt?: string;
  gallery?: ProjectImage[];
  links?: ProjectLinks;
  /** Lower numbers sort first within the same year. */
  order?: number;
}

/** A project with defaults applied. This is what components receive. */
export interface ProjectMeta {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  year: number;
  type: ProjectType;
  category?: string;
  role?: string;
  period?: string;
  featured: boolean;
  confidential: boolean;
  placeholder: boolean;
  stack: string[];
  cover?: string;
  coverAlt: string;
  gallery: ProjectImage[];
  links: ProjectLinks;
  order: number;
}

/** A project including its MDX case-study body. */
export interface Project extends ProjectMeta {
  body: string;
}

/** Display labels for project types. Kept next to the vocabulary they name. */
export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  professional: "Professional",
  client: "Client",
  "open-source": "Open Source",
  personal: "Personal",
};

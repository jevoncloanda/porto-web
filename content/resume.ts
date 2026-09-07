import type {
  CertificationEntry,
  EducationEntry,
  ExperienceEntry,
} from "@/lib/types";

/**
 * Resume-only sections.
 *
 * The resume page reuses `profile`, `experience` and `skills`. These two
 * arrays cover the parts that only appear on the resume. An empty array hides
 * its section entirely.
 */

export const education: EducationEntry[] = [
  {
    institution: "Universitas Bina Nusantara",
    qualification: "Undergraduate, Computer Science",
    period: "Sep 2021 — May 2025",
    location: "Jakarta, Indonesia",
    description: "GPA 3.89 / 4.00",
  },
  {
    institution: "SMA Regina Pacis Bogor",
    qualification: "High School Diploma in Science",
    period: "Jul 2018 — Jun 2021",
    location: "Bogor, Indonesia",
  },
];

/** Volunteer and student-organisation experience, most recent first. */
export const organizations: ExperienceEntry[] = [
  {
    company: "GSJA Betlehem",
    role: "Back End Web Developer",
    period: "Jul 2023 — Present",
    location: "Bogor, Indonesia",
    description:
      "Helped develop the current website and content management system (CMS) for GSJA Betlehem.",
  },
  {
    company: "Bina Nusantara Computer Club",
    role: "Activist",
    period: "Oct 2021 — Oct 2022",
    location: "Jakarta, Indonesia",
    achievements: [
      "Participated in the Subdivision SWOT Analysis Program",
      "Participated as a Technology Project member",
      "Participated in video editing training and other training activities",
    ],
  },
];

// Nothing on your CV to put here yet. Add entries when you have them, or leave
// the array empty and the section stays hidden.
export const certifications: CertificationEntry[] = [];

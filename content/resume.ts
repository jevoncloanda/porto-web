import type { CertificationEntry, EducationEntry } from "@/lib/types";

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

// Nothing on your CV to put here yet. Add entries when you have them, or leave
// the array empty and the section stays hidden.
export const certifications: CertificationEntry[] = [];

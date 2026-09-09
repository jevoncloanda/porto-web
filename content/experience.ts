import type { ExperienceEntry } from "@/lib/types";

/**
 * Work history, most recent first.
 *
 * `achievements`, `technologies`, `location` and `description` are optional —
 * delete the key entirely for roles where you have nothing to list and the UI
 * will hide it rather than render an empty block.
 */
export const experience: ExperienceEntry[] = [
  {
    company: "Harita Group",
    role: "Full Stack Developer",
    period: "Jun 2025 — Present",
    location: "Jakarta, Indonesia",
    description:
      "Building full-stack web applications with CodeIgniter, Node.js (Express), MySQL, SSMS and Docker.",
    achievements: [
      "Introduced the Git version control system to the team, leading to faster development cycles",
      "Introduced Docker for containerisation, simplifying application deployment and environment consistency",
      "Integrated Git CI/CD pipelines, including Docker",
    ],
    technologies: [
      "CodeIgniter",
      "Node.js",
      "Nuxt.js",
      "Express",
      "MySQL",
      "PostgreSQL",
      "SSMS",
      "Docker",
      "Git",
    ],
  },
  {
    company: "PT Hartono Istana Teknologi (Polytron)",
    role: "Full Stack Developer",
    period: "Feb 2025 — May 2025",
    location: "Jakarta, Indonesia",
    description:
      "Developed full-stack web applications using Node.js (Express), CodeIgniter, Go, WordPress, MySQL and Docker.",
    achievements: [
      "Developed APIs and their documentation for a chatbot",
      "Resolved and fixed bug issues in web applications",
      "Resolved security threats found with Burp Suite and OWASP ZAP",
      "Designed and implemented UAT for web applications",
    ],
    technologies: [
      "Node.js",
      "Express",
      "CodeIgniter",
      "Go",
      "WordPress",
      "MySQL",
      "Docker",
    ],
  },
  {
    company: "PT Hartono Istana Teknologi (Polytron)",
    role: "Full Stack Developer Intern",
    period: "Feb 2024 — Jan 2025",
    location: "Jakarta, Indonesia",
    description:
      "Developed full-stack web applications using Node.js (Express), CodeIgniter, Go, WordPress, MySQL and Docker.",
    achievements: ["Resolved and fixed bug issues in web applications"],
    technologies: [
      "Node.js",
      "Express",
      "CodeIgniter",
      "Go",
      "WordPress",
      "MySQL",
      "Docker",
    ],
  },
];

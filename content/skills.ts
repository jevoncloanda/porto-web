import type { SkillCategory } from "@/lib/types";

/**
 * Only list things you genuinely work with. Delete any category you do not
 * need; the section renders whatever is in this array, and an empty array
 * hides the section entirely.
 *
 * Everything below is taken from your CV. The Frontend row is the one gap —
 * your CV says "full-stack" but never names a frontend framework, so fill it
 * in yourself rather than have it guessed.
 */
export const skills: SkillCategory[] = [
  {
    title: "Backend",
    description: "Where most of my work happens",
    items: ["Node.js", "Express", "Go", "Laravel", "CodeIgniter"],
  },
  {
    title: "Frontend",
    items: ["Nuxt.js", "Next.js"],
  },
  {
    title: "Data",
    items: ["MySQL", "PostgreSQL", "SSMS"],
  },
  {
    title: "Infrastructure",
    description: "Containers, pipelines and version control",
    items: ["Docker", "CI/CD", "Git"],
  },
  {
    title: "Security & QA",
    items: ["Burp Suite", "OWASP ZAP", "UAT"],
  },
  {
    title: "Languages",
    items: ["Indonesian", "English"],
  },
];

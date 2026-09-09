import type { Profile } from "@/lib/types";

/**
 * Single source of truth for personal information. Changing a value here
 * updates the whole site (navigation, hero, contact, footer, resume, SEO).
 * Never duplicate these values in components.
 *
 * Any value left in `[BRACKETS]` is detected as a placeholder by
 * `isPlaceholder()` and rendered as inert, clearly-marked content instead of
 * a broken link.
 */
export const profile: Profile = {
  name: "Jevon Christopher Loanda",
  title: "Full Stack Developer",
  location: "Bogor, Indonesia",
  email: "jevon.loanda@gmail.com",

  shortBio:
    "Full Stack Developer building full-stack web applications end to end — from APIs and databases to the containers and pipelines that deploy them.",

  bio: [
    "I'm an Full Stack Developer at Harita Group, where I build full-stack web applications with CodeIgniter, Node.js, Nuxt.js and MySQL. Before that I worked at Polytron, first as an intern and then as a developer, across Node.js, Go, CodeIgniter and WordPress — building APIs, fixing bugs, and closing the security issues that came out of testing.",
    "I care about the parts of the job that outlast a single feature: introducing Git to a team that didn't have it, containerising applications with Docker so environments stop drifting, and wiring up CI/CD so deploys stay boring. I graduated in Computer Science from Bina Nusantara University in 2025, and I'm still excited to learn and grow as a developer.",
  ],

  // Replace the file at public/profile/portrait.png with your own photo and
  // update the dimensions below to match it.
  photo: {
    src: "/profile/portrait.png",
    alt: "Portrait of Jevon Christopher Loanda",
    width: 720,
    height: 900,
  },

  // Delete this line if you would rather not show a status.
  availability: "Currently at Harita Group",

  links: {
    github: "https://github.com/jevoncloanda",
    linkedin: "https://linkedin.com/in/jevoncl",
  },
};

/**
 * Public origin of the deployed site, used for canonical URLs and Open Graph.
 * Set NEXT_PUBLIC_SITE_URL in your hosting provider (see .env.example).
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

import { resolveHref } from "@/lib/placeholder";
import { profile } from "@content/profile";

export type SocialKind = "email" | "github" | "linkedin";

export interface SocialEntry {
  kind: SocialKind;
  label: string;
  /** Raw content value — still shown (as a placeholder) when no href exists. */
  value: string;
  /** Absent when the content value is still a placeholder. */
  href?: string;
}

/** Strips the scheme so links read as `github.com/you` rather than a full URL. */
function displayUrl(value: string): string {
  return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * Contact channels derived from `content/profile.ts`. Every surface that shows
 * social links (hero, contact, footer, resume) reads from here, so changing a
 * URL in the profile updates all of them.
 */
export function getSocialEntries(): SocialEntry[] {
  const email = resolveHref(profile.email, "email");
  const github = resolveHref(profile.links.github);
  const linkedin = resolveHref(profile.links.linkedin);

  return [
    {
      kind: "email",
      label: "Email",
      value: profile.email,
      href: email,
    },
    {
      kind: "github",
      label: "GitHub",
      value: github ? displayUrl(github) : profile.links.github,
      href: github,
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      value: linkedin ? displayUrl(linkedin) : profile.links.linkedin,
      href: linkedin,
    },
  ];
}

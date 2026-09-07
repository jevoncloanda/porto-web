import type { Metadata } from "next";

import { profile, siteUrl } from "@content/profile";

export const siteTitle = `${profile.name} — ${profile.title}`;

/** Absolute URL for canonical links and Open Graph. */
export function absoluteUrl(pathname = "/"): string {
  return new URL(pathname, siteUrl).toString();
}

interface PageMetadataInput {
  title: string;
  description: string;
  /** Route path, e.g. "/projects". Used for the canonical URL. */
  pathname: string;
  /** Overrides the site-wide Open Graph image. */
  image?: string;
  type?: "website" | "article";
}

/**
 * Builds per-page metadata. The root layout supplies the shared defaults
 * (metadataBase, title template, site name, default OG image), so pages only
 * declare what actually differs.
 */
export function pageMetadata({
  title,
  description,
  pathname,
  image,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(pathname);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/cn";
import { getSocialEntries, type SocialKind } from "@/lib/social";

const ICONS: Record<SocialKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  email: Mail,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

interface SocialLinksProps {
  className?: string;
}

/**
 * Compact icon row. Placeholder values render as a disabled control with an
 * explanatory label rather than a broken link.
 */
export function SocialLinks({ className }: SocialLinksProps) {
  const entries = getSocialEntries();

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {entries.map((entry) => {
        const Icon = ICONS[entry.kind];
        const shared =
          "inline-flex h-10 w-10 items-center justify-center rounded-card border transition-colors duration-(--duration-fast)";

        return (
          <li key={entry.kind}>
            {entry.href ? (
              <a
                href={entry.href}
                target={entry.kind === "email" ? undefined : "_blank"}
                rel={entry.kind === "email" ? undefined : "noreferrer noopener"}
                className={cn(
                  shared,
                  "border-border text-muted hover:border-accent hover:text-accent",
                )}
              >
                <Icon width={18} height={18} aria-hidden />
                <span className="sr-only">{entry.label}</span>
              </a>
            ) : (
              <span
                title={`${entry.label} not set — update content/profile.ts`}
                className={cn(shared, "border-dashed border-border text-subtle")}
              >
                <Icon width={18} height={18} aria-hidden />
                <span className="sr-only">{entry.label} — not set yet</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

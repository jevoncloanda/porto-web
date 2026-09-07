import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { NAV_LINKS } from "@/lib/navigation";
import { profile } from "@content/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg print:hidden">
      <Container className="flex flex-col gap-10 py-14 sm:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-sm font-medium text-fg">{profile.name}</p>
            <p className="mt-3 text-sm text-subtle">{profile.title}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/resume"
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              Resume
            </Link>
          </nav>

          <SocialLinks />
        </div>

        <div className="flex flex-col gap-3 border-t border-border pt-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}
          </p>
          <p className="text-xs">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </Container>
    </footer>
  );
}

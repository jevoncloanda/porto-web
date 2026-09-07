"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/navigation";
import { profile } from "@content/profile";

function isActive(pathname: string, href: string): boolean {
  if (href.startsWith("/#")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  // The menu is bound to the route it was opened on, so navigating anywhere
  // (including via the back button) collapses it without an extra effect.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  const close = useCallback(() => setOpenedOn(null), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-(--duration-base) ease-(--ease-out-expo) print:hidden",
        scrolled || open ? "bg-bg/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-medium tracking-tight text-fg"
        >
          <span
            aria-hidden
            className="h-7 w-7 rounded-card bg-accent transition-transform duration-(--duration-fast) group-hover:scale-105"
          />
          {profile.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className={cn(
                "px-3 py-2 text-sm transition-colors duration-(--duration-fast)",
                isActive(pathname, link.href)
                  ? "text-accent"
                  : "text-muted hover:text-fg",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button href="/resume" variant="secondary" size="sm" className="ml-3">
            Resume
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpenedOn(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-card text-fg transition-colors hover:bg-surface md:hidden"
        >
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-scrim"
            aria-hidden
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            /* Sits behind the header row but above the page, so the open
               menu reads as a layer rather than a floating panel. */
            className="fixed inset-0 -z-10 bg-bg/95 md:hidden"
          />
        ) : null}

        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-border bg-bg md:hidden"
          >
            <Container className="flex flex-col py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="border-b border-border py-4 text-h3 font-medium text-fg transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/resume" variant="primary" className="mt-6 w-full">
                Resume
              </Button>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

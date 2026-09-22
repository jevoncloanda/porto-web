import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-card font-medium " +
  "transition-colors duration-(--duration-fast) ease-(--ease-out-expo) " +
  "disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-ink hover:bg-accent-strong",
  secondary: "border border-border-strong text-fg hover:border-accent hover:text-accent",
  ghost: "px-0! text-accent underline underline-offset-[6px] decoration-accent/40 hover:decoration-accent",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
};

interface CommonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "children" | "className" | "href"> & {
    href: string;
    /** Set for links that leave the site. */
    external?: boolean;
  };

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

function isLink(props: ButtonAsLink | ButtonAsButton): props is ButtonAsLink {
  return "href" in props;
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  if (isLink(props)) {
    const {
      children,
      variant = "primary",
      size = "md",
      className,
      href,
      external,
      ...rest
    } = props;
    const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

    if (external || rest.download) {
      return (
        <a
          {...rest}
          href={href}
          target={external ? "_blank" : rest.target}
          rel={external ? "noreferrer noopener" : rest.rel}
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <Link {...rest} href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { children, variant = "primary", size = "md", className, ...rest } = props;
  return (
    <button {...rest} className={cn(BASE, VARIANTS[variant], SIZES[size], className)}>
      {children}
    </button>
  );
}

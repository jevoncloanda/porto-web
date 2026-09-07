import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Notice } from "@/components/ui/Notice";

/**
 * Component map for case-study MDX.
 *
 * Authors write plain markdown; a section that is not written simply does not
 * render, which is how optional case-study sections "hide gracefully".
 * `<Figure>` and `<Callout>` are available for richer content.
 */

function Anchor({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const className =
    "text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent";

  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={className} {...rest}>
      {children}
    </a>
  );
}

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
}

export function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="my-10">
      <div className="relative aspect-16/10 overflow-hidden rounded-card border border-border bg-surface-2">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 44rem, 100vw" className="object-cover" />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-subtle">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <Notice tone="accent" className="my-8">
      {children}
    </Notice>
  );
}

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-14 scroll-mt-28 text-h3 font-semibold text-fg first:mt-0"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-10 text-lg font-medium text-fg" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-5 leading-[1.75] text-muted" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-5 space-y-2.5 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:top-[0.72em] [&>li]:before:left-0 [&>li]:before:h-px [&>li]:before:w-3.5 [&>li]:before:bg-border-strong [&>li]:before:content-['']"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-5 list-decimal space-y-2.5 pl-5 marker:text-subtle" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-[1.7] text-muted" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-medium text-fg" {...props} />
  ),
  a: Anchor,
  hr: () => <hr className="my-12 border-border" />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-8 border-l-2 border-accent/50 pl-5 text-lead text-fg italic"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-[0.3rem] bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-fg [pre_&]:bg-transparent [pre_&]:p-0"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className="my-8 overflow-x-auto rounded-card border border-border bg-surface p-5 font-mono text-sm leading-relaxed text-muted"
      {...props}
    />
  ),
  img: ({ src, alt }: ComponentPropsWithoutRef<"img">) =>
    typeof src === "string" ? <Figure src={src} alt={alt ?? ""} /> : null,
  Figure,
  Callout,
};

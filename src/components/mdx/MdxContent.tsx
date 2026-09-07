import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/components/mdx/mdx-components";

/** Renders a case-study body. Compiled at build time in a Server Component. */
export function MdxContent({ source }: { source: string }) {
  return (
    <div className="text-base">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}

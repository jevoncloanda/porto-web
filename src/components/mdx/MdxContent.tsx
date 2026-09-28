import { mdxComponents } from "@/components/mdx/mdx-components";
import { projectBodies } from "@/generated/project-bodies";

/** Renders a case-study body compiled when the project manifest is generated. */
export function MdxContent({ slug }: { slug: string }) {
  const Body = projectBodies[slug];
  if (!Body) return null;

  return (
    <div className="text-base">
      <Body components={mdxComponents} />
    </div>
  );
}

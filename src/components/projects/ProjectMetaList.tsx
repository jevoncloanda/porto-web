import { isPlaceholder } from "@/lib/placeholder";
import { PROJECT_TYPE_LABELS, type ProjectMeta } from "@/lib/types";

interface Row {
  label: string;
  value: string;
}

/** Sidebar fact list for a case study. Rows without content are omitted. */
export function ProjectMetaList({ project }: { project: ProjectMeta }) {
  const rows: Row[] = [
    { label: "Year", value: String(project.year) },
    { label: "Type", value: PROJECT_TYPE_LABELS[project.type] },
    project.category ? { label: "Category", value: project.category } : null,
    project.role ? { label: "Role", value: project.role } : null,
    project.period ? { label: "Period", value: project.period } : null,
  ].filter((row): row is Row => row !== null);

  return (
    <dl className="border-t border-border">
      {rows.map((row) => (
        <div key={row.label} className="border-b border-border py-4">
          <dt className="text-label tracking-[0.18em] text-subtle uppercase">
            {row.label}
          </dt>
          <dd className="mt-2 text-sm text-fg">{row.value}</dd>
        </div>
      ))}

      {project.stack.length > 0 ? (
        <div className="border-b border-border py-4">
          <dt className="text-label tracking-[0.18em] text-subtle uppercase">Stack</dt>
          <dd className="mt-2 space-y-1.5">
            {project.stack.map((item) => (
              <p
                key={item}
                className={
                  isPlaceholder(item) ? "text-sm text-subtle italic" : "text-sm text-fg"
                }
              >
                {item}
              </p>
            ))}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

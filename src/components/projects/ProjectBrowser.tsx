"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { cn } from "@/lib/cn";
import { PROJECT_TYPES, PROJECT_TYPE_LABELS, type ProjectMeta, type ProjectType } from "@/lib/types";

type Filter = ProjectType | "all";

interface ProjectBrowserProps {
  projects: ProjectMeta[];
}

/**
 * Client-side filtering for the projects index. Kept small on purpose: the
 * project data is already on the page, so filtering needs no navigation.
 */
export function ProjectBrowser({ projects }: ProjectBrowserProps) {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");

  const filters = useMemo<Filter[]>(() => {
    const present = PROJECT_TYPES.filter((type) =>
      projects.some((project) => project.type === type),
    );
    return ["all", ...present];
  }, [projects]);

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.type === filter)),
    [filter, projects],
  );

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter projects by type"
          className="-mx-1 flex flex-wrap gap-2 px-1"
        >
          {filters.map((value) => {
            const active = value === filter;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={active}
                className={cn(
                  "rounded-card px-3.5 py-2 text-[0.6875rem] font-medium tracking-[0.12em] uppercase transition-colors duration-(--duration-fast)",
                  active
                    ? "bg-accent text-accent-ink"
                    : "bg-surface text-muted hover:text-fg",
                )}
              >
                {value === "all" ? "All" : PROJECT_TYPE_LABELS[value]}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="text-xs tracking-[0.12em] text-subtle uppercase">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="py-20 text-center text-muted">
          No projects match this filter yet.
        </p>
      ) : reduceMotion ? (
        <ProjectGrid projects={visible} columns={3} className="mt-12" />
      ) : (
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProjectGrid projects={visible} columns={3} className="mt-12" />
        </motion.div>
      )}
    </div>
  );
}

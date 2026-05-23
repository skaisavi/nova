"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/dashboard/project-card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/lib/types";

const STATUS_OPTIONS: { value: ProjectStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All projects" },
  { value: "ACTIVE", label: "Active" },
  { value: "PLANNING", label: "Planning" },
  { value: "PAUSED", label: "Paused" },
  { value: "COMPLETED", label: "Completed" },
  { value: "ARCHIVED", label: "Archived" }
];

export function ProjectListFilter({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "ALL">("ALL");
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    }
    if (filterOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [filterOpen]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = search.trim().toLowerCase();
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q);
      const matchesStatus = status === "ALL" || p.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [projects, search, status]);

  const hasFilter = search.trim() !== "" || status !== "ALL";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by project, client, or status..."
            className="min-h-12 w-full rounded-full border border-white/10 bg-white/[0.08] pl-11 pr-10 text-sm shadow-inset outline-none transition placeholder:text-muted-foreground focus:border-white/20 focus:bg-white/[0.1]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
        <div ref={filterRef} className="relative shrink-0">
          <Button
            variant="secondary"
            onClick={() => setFilterOpen((o) => !o)}
            className={cn(status !== "ALL" && "border-primary/40 text-primary")}
          >
            <Filter className="size-4" aria-hidden="true" />
            {status === "ALL" ? "Filters" : (STATUS_OPTIONS.find((s) => s.value === status)?.label ?? "Filters")}
          </Button>
          {filterOpen && (
            <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e16] shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setStatus(opt.value); setFilterOpen(false); }}
                  className={cn(
                    "flex w-full items-center px-4 py-3 text-left text-sm transition hover:bg-white/[0.08]",
                    status === opt.value ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {filtered.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </section>
      ) : (
        <EmptyState
          title={hasFilter ? "No projects match your filter" : "No projects yet"}
          description={
            hasFilter
              ? "Try adjusting your search or clearing the filters."
              : "Create your first workspace project to start tracking tasks, comments, and activity."
          }
          actionLabel={hasFilter ? undefined : "Create project"}
          actionHref={hasFilter ? undefined : "/dashboard/projects#create-project"}
        />
      )}
    </div>
  );
}

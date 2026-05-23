import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { PriorityBadge, StatusBadge } from "@/components/ui/badges";
import { DeleteProjectButton } from "@/components/dashboard/delete-project-button";
import { GlassCard } from "@/components/ui/glass-card";
import type { Project } from "@/lib/types";
import { formatRelativeDue } from "@/lib/utils";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassCard className="group overflow-hidden" intensity="soft">
      <div className={`mb-6 h-2 rounded-full bg-gradient-to-r ${project.accent}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{project.client}</p>
          <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>
        </div>
        <Link href={`/dashboard/projects/${project.id}`} className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] shadow-inset transition group-hover:bg-white/[0.14]" aria-label={`Open ${project.name}`}>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-4 min-h-12 text-sm leading-6 text-muted-foreground">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <StatusBadge status={project.status} />
        <PriorityBadge priority={project.priority} />
      </div>
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{project.progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10">
          <div className={`h-full rounded-full bg-gradient-to-r ${project.accent}`} style={{ width: `${project.progress}%` }} />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
        <span>{project.tasksDone}/{project.tasksTotal} tasks</span>
        <span className="inline-flex items-center gap-2">
          <CalendarDays className="size-4" aria-hidden="true" />
          {formatRelativeDue(project.dueDate)}
        </span>
      </div>
      <div className="mt-4 flex justify-end">
        <DeleteProjectButton projectId={project.id} />
      </div>
    </GlassCard>
  );
}

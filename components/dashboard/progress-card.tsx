import { Gauge } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import type { Project } from "@/lib/types";

export function ProgressCard({ projects }: { projects: Project[] }) {
  const averageProgress = projects.length
    ? Math.round(projects.reduce((total, project) => total + project.progress, 0) / projects.length)
    : 0;

  return (
    <GlassCard intensity="strong" className="overflow-hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Workspace health</p>
          <h2 className="mt-2 text-xl font-semibold">Progress overview</h2>
        </div>
        <span className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] shadow-inset">
          <Gauge className="size-5 text-primary" aria-hidden="true" />
        </span>
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.07] p-5 shadow-inset">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-5xl font-semibold">{averageProgress}%</p>
            <p className="mt-2 text-sm text-muted-foreground">average project completion</p>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <p>{projects.length} tracked projects</p>
            <p className="mt-1">live-ready activity</p>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {projects.map((project) => (
          <div key={project.id}>
            <div className="mb-2 flex justify-between gap-4 text-sm">
              <span className="truncate">{project.name}</span>
              <span className="text-muted-foreground">{project.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div className={`h-full rounded-full bg-gradient-to-r ${project.accent}`} style={{ width: `${project.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

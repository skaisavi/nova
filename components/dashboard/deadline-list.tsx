import { CalendarClock } from "lucide-react";
import { PriorityBadge } from "@/components/ui/badges";
import { EmptyState } from "@/components/ui/empty-state";
import { GlassCard } from "@/components/ui/glass-card";
import type { Task } from "@/lib/types";
import { formatRelativeDue } from "@/lib/utils";

export function DeadlineList({ tasks }: { tasks: Task[] }) {
  return (
    <GlassCard intensity="soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Next up</p>
          <h2 className="mt-2 text-xl font-semibold">Upcoming deadlines</h2>
        </div>
        <span className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] shadow-inset">
          <CalendarClock className="size-5 text-primary" aria-hidden="true" />
        </span>
      </div>
      <div className="mt-5 space-y-3">
        {tasks.length ? (
          tasks.map((task) => (
            <article key={task.id} className="rounded-3xl border border-white/10 bg-white/[0.075] p-4 shadow-inset">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{task.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{task.project}</p>
                </div>
                <PriorityBadge priority={task.priority} />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{task.assignee}</span>
                <span>{formatRelativeDue(task.dueDate)}</span>
              </div>
            </article>
          ))
        ) : (
          <EmptyState title="No upcoming deadlines" description="Create tasks with due dates and they will appear here." />
        )}
      </div>
    </GlassCard>
  );
}

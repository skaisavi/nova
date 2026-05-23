import { cn } from "@/lib/utils";
import type { Priority, ProjectStatus, TaskStatus } from "@/lib/types";

const statusStyles: Record<ProjectStatus | TaskStatus, string> = {
  PLANNING: "border-cyan-200/25 bg-cyan-200/10 text-cyan-100",
  ACTIVE: "border-emerald-200/25 bg-emerald-200/10 text-emerald-100",
  PAUSED: "border-amber-200/25 bg-amber-200/10 text-amber-100",
  COMPLETED: "border-violet-200/25 bg-violet-200/10 text-violet-100",
  ARCHIVED: "border-slate-200/20 bg-slate-200/10 text-slate-200",
  BACKLOG: "border-slate-200/20 bg-slate-200/10 text-slate-200",
  TODO: "border-cyan-200/25 bg-cyan-200/10 text-cyan-100",
  IN_PROGRESS: "border-blue-200/25 bg-blue-200/10 text-blue-100",
  REVIEW: "border-fuchsia-200/25 bg-fuchsia-200/10 text-fuchsia-100",
  DONE: "border-emerald-200/25 bg-emerald-200/10 text-emerald-100"
};

const priorityStyles: Record<Priority, string> = {
  LOW: "border-slate-200/20 bg-slate-200/10 text-slate-200",
  MEDIUM: "border-cyan-200/25 bg-cyan-200/10 text-cyan-100",
  HIGH: "border-amber-200/25 bg-amber-200/10 text-amber-100",
  URGENT: "border-rose-200/30 bg-rose-200/10 text-rose-100"
};

function normalizeLabel(value: string) {
  return value.toLowerCase().replaceAll("_", " ");
}

export function StatusBadge({ status }: { status: ProjectStatus | TaskStatus }) {
  return (
    <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize", statusStyles[status])}>
      {normalizeLabel(status)}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize", priorityStyles[priority])}>
      {normalizeLabel(priority)}
    </span>
  );
}

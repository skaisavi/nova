import { ActivityIcon, MessageCircle, UserPlus, Workflow } from "lucide-react";
import type { Activity } from "@/lib/types";
import { cn } from "@/lib/utils";

const activityIcons: Record<Activity["type"], typeof ActivityIcon> = {
  PROJECT_CREATED: Workflow,
  PROJECT_UPDATED: Workflow,
  TASK_CREATED: ActivityIcon,
  TASK_MOVED: ActivityIcon,
  COMMENT_CREATED: MessageCircle,
  MEMBER_JOINED: UserPlus
};

export function ActivityItem({ activity, compact = false }: { activity: Activity; compact?: boolean }) {
  const Icon = activityIcons[activity.type];

  return (
    <article
      className={cn(
        "flex gap-4 rounded-3xl border border-white/10 bg-white/[0.075] shadow-inset transition hover:border-white/15 hover:bg-white/[0.095]",
        compact ? "p-3" : "p-4"
      )}
    >
      <span className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
        <Icon className="size-4 text-primary" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm leading-6">
          <span className="font-semibold">{activity.actor}</span>{" "}
          <span className="text-muted-foreground">{activity.message}</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{activity.timestamp}</p>
        {activity.context ? (
          <p className="mt-2 inline-flex rounded-full border border-white/10 bg-white/[0.08] px-2 py-1 text-[11px] text-muted-foreground">
            {activity.context}
          </p>
        ) : null}
      </div>
    </article>
  );
}

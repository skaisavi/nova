import { Users } from "lucide-react";
import { LiveActivityFeed } from "@/components/dashboard/live-activity-feed";
import { GlassCard } from "@/components/ui/glass-card";
import { LiveIndicator } from "@/components/ui/live-indicator";
import { getWorkspaceActivity } from "@/lib/queries/activity";
import { getWorkspaceContext } from "@/lib/queries/workspace";
import { getWorkspaceStats } from "@/lib/queries/workspace";
import { isRealtimeClientConfigured, realtimeChannels } from "@/lib/realtime";
import { cn } from "@/lib/utils";

function StatRow({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-medium tabular-nums", accent)}>{value}</span>
    </div>
  );
}

export default async function ActivityPage() {
  const [activities, workspace, stats] = await Promise.all([
    getWorkspaceActivity(),
    getWorkspaceContext(),
    getWorkspaceStats()
  ]);

  const workspaceChannel = workspace
    ? realtimeChannels.workspace(workspace.workspaceId)
    : realtimeChannels.workspace("unconfigured");

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold text-primary">Activity stream</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-5xl">Every workspace move, in order.</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A clean audit trail of project updates, task moves, and team actions.
          </p>
        </div>
        <LiveIndicator
          status={isRealtimeClientConfigured() ? "live" : "offline"}
          label={isRealtimeClientConfigured() ? "Live-ready" : "Realtime optional"}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.65fr_0.35fr]">
        <GlassCard>
          <LiveActivityFeed channelName={workspaceChannel} initialActivities={activities} />
        </GlassCard>

        <div className="space-y-4">
          {stats && (
            <>
              <GlassCard>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Projects</h2>
                <div className="mt-1 divide-y divide-white/[0.06]">
                  <StatRow label="Active" value={stats.projects.active} accent="text-emerald-400" />
                  <StatRow label="Planning" value={stats.projects.planning} accent="text-primary" />
                  <StatRow label="Paused" value={stats.projects.paused} />
                  <StatRow label="Completed" value={stats.projects.completed} />
                </div>
              </GlassCard>

              <GlassCard>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Tasks</h2>
                <div className="mt-1 divide-y divide-white/[0.06]">
                  <StatRow label="In progress" value={stats.tasks.inProgress} accent="text-primary" />
                  <StatRow label="In review" value={stats.tasks.review} accent="text-yellow-400" />
                  <StatRow label="Done" value={stats.tasks.done} accent="text-emerald-400" />
                  <StatRow label="To do" value={stats.tasks.todo} />
                  <StatRow label="Backlog" value={stats.tasks.backlog} />
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-white/10">
                    <Users className="size-4 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{stats.members} member{stats.members !== 1 ? "s" : ""}</p>
                    <p className="text-xs text-muted-foreground">{workspace?.workspaceName ?? "Workspace"}</p>
                  </div>
                </div>
              </GlassCard>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

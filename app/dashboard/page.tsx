import { ArrowRight, CalendarClock, FolderKanban, Gauge, Sparkles, SquareCheckBig } from "lucide-react";
import Link from "next/link";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { DeadlineList } from "@/components/dashboard/deadline-list";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { ProjectCard } from "@/components/dashboard/project-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { GlassCard } from "@/components/ui/glass-card";
import { RealtimeIndicator } from "@/components/ui/live-indicator";
import { getDashboardOverview } from "@/lib/queries/dashboard";

export default async function DashboardPage() {
  const { activities, projects, stats, tasks, userName, workspaceName } = await getDashboardOverview();
  const firstName = userName.split(" ")[0] ?? "there";

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-glass backdrop-blur-2xl sm:p-7">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,233,255,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,167,255,0.12),transparent_38%)]" aria-hidden="true" />
        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <RealtimeIndicator label="Live workspace" />
              <span className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-1 text-xs font-medium text-muted-foreground">
                {workspaceName}
              </span>
            </div>
            <h1 className="mt-5 max-w-4xl text-balance text-3xl font-semibold leading-tight sm:text-5xl">
              Good afternoon, {firstName}. Your workspace is moving cleanly.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              A calm command view for active projects, deadlines, decisions, and collaboration signals across the NOVA workspace.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <Button asChild>
              <Link href="/dashboard/projects">
                Review projects <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/dashboard/activity">
                Activity pulse <Sparkles className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active projects" value={String(stats.activeProjects)} detail="Scoped to your current workspace" icon={FolderKanban} />
        <StatCard label="Tasks completed" value={String(stats.completedTasks)} detail="Done tasks across workspace projects" icon={SquareCheckBig} />
        <StatCard label="Upcoming deadlines" value={String(stats.upcomingDeadlines)} detail={`${stats.overdueTasks} overdue tasks`} icon={CalendarClock} />
        <StatCard label="Workspace health" value={`${stats.workspaceHealth}%`} detail="Based on progress and overdue work" icon={Gauge} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">In motion</p>
              <h2 className="mt-1 text-xl font-semibold">Active projects</h2>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/projects">View all</Link>
            </Button>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {projects.length ? (
              projects.slice(0, 2).map((project) => <ProjectCard key={project.id} project={project} />)
            ) : (
              <div className="lg:col-span-2">
                <EmptyState
                  title="No active projects yet"
                  description="Create your first NOVA project to start tracking tasks, activity, and deadlines."
                  actionLabel="Create project"
                  actionHref="/dashboard/projects#create-project"
                />
              </div>
            )}
          </div>
        </div>
        <GlassCard intensity="soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">Signals</p>
              <h2 className="mt-1 text-xl font-semibold">Recent activity</h2>
            </div>
            <RealtimeIndicator label="Live-ready" />
          </div>
          <div className="mt-4">
            <ActivityFeed activities={activities.slice(0, 4)} />
          </div>
        </GlassCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <DeadlineList tasks={tasks.slice(0, 4)} />
        <ProgressCard projects={projects} />
      </section>
    </div>
  );
}

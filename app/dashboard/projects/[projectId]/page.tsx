import { notFound } from "next/navigation";
import { LiveActivityFeed } from "@/components/dashboard/live-activity-feed";
import { LiveProjectComments } from "@/components/dashboard/live-project-comments";
import { TaskCard } from "@/components/dashboard/task-card";
import { DeleteProjectButton } from "@/components/dashboard/delete-project-button";
import { ProjectEditPanel } from "@/components/dashboard/project-edit-panel";
import { PriorityBadge, StatusBadge } from "@/components/ui/badges";
import { EmptyState } from "@/components/ui/empty-state";
import { GlassCard } from "@/components/ui/glass-card";
import { getWorkspaceProject } from "@/lib/queries/projects";
import { realtimeChannels } from "@/lib/realtime";
import { formatDate } from "@/lib/utils";

type ProjectDetailPageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { projectId } = await params;
  const data = await getWorkspaceProject(projectId);

  if (!data) notFound();

  const { activities, comments, project, tasks } = data;

  return (
    <div className="space-y-6">
      <GlassCard className="overflow-hidden">
        <div className={`mb-8 h-3 rounded-full bg-gradient-to-r ${project.accent}`} />
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <p className="text-sm text-muted-foreground">{project.client}</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-5xl">{project.name}</h1>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{project.description}</p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={project.status} />
              <PriorityBadge priority={project.priority} />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ProjectEditPanel project={project} />
              <DeleteProjectButton projectId={project.id} redirectAfter />
            </div>
          </div>
        </div>
      </GlassCard>

      <section className="grid gap-6 lg:grid-cols-[0.7fr_0.3fr]">
        <GlassCard>
          <h2 className="text-xl font-semibold">Project tasks</h2>
          <div className="mt-5 grid gap-3">
            {tasks.length ? (
              tasks.map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <EmptyState
                title="No tasks yet"
                description="Add tasks to turn this project into a clear delivery plan."
                actionLabel="Create task"
                actionHref="/dashboard/tasks#create-task"
              />
            )}
          </div>
        </GlassCard>
        <GlassCard>
          <h2 className="text-xl font-semibold">Project details</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Due date</dt>
              <dd>{formatDate(project.dueDate)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Completion</dt>
              <dd>{project.progress}%</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Tasks</dt>
              <dd>{project.tasksDone}/{project.tasksTotal}</dd>
            </div>
          </dl>
        </GlassCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.45fr_0.55fr]">
        <GlassCard>
          <LiveProjectComments
            channelName={realtimeChannels.project(project.id)}
            initialComments={comments}
            projectId={project.id}
          />
        </GlassCard>
        <GlassCard>
          <h2 className="text-xl font-semibold">Activity</h2>
          <div className="mt-5">
            <LiveActivityFeed channelName={realtimeChannels.project(project.id)} initialActivities={activities} />
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

import { Plus } from "lucide-react";
import { TaskForm } from "@/components/forms/task-form";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { KanbanBoard } from "@/components/dashboard/kanban-board";
import { getWorkspaceProjects } from "@/lib/queries/projects";
import { getWorkspaceTasks } from "@/lib/queries/tasks";

export default async function TasksPage() {
  const [projects, tasks] = await Promise.all([getWorkspaceProjects(), getWorkspaceTasks()]);

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold text-primary">Task board</p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-5xl">Move work without losing the thread.</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Drag tasks between columns or use the status button to advance them.</p>
        </div>
        <Button asChild>
          <a href="#create-task">
            <Plus className="size-4" aria-hidden="true" />
            New task
          </a>
        </Button>
      </section>

      <KanbanBoard initialTasks={tasks} />

      <GlassCard id="create-task">
        <div className="mb-5">
          <p className="text-sm font-semibold text-primary">Create workflow</p>
          <h2 className="mt-2 text-2xl font-semibold">Add a task</h2>
        </div>
        <TaskForm projectOptions={projects.map((project) => ({ id: project.id, name: project.name }))} />
      </GlassCard>
    </div>
  );
}

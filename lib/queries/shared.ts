import type { ActivityType, Priority, Project, ProjectStatus, Task, TaskStatus } from "@/lib/types";

export const projectAccents = [
  "from-cyan-300/80 to-emerald-300/70",
  "from-violet-300/80 to-fuchsia-300/70",
  "from-amber-200/90 to-rose-300/70",
  "from-blue-200/80 to-cyan-300/70"
] as const;

export const dashboardTaskColumns: { status: TaskStatus; label: string }[] = [
  { status: "TODO", label: "To do" },
  { status: "IN_PROGRESS", label: "In progress" },
  { status: "REVIEW", label: "Review" },
  { status: "DONE", label: "Done" }
];

export function toDateString(date: Date | null | undefined) {
  return date ? date.toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
}

export function activityTimestamp(date: Date) {
  const diffMinutes = Math.max(1, Math.round((Date.now() - date.getTime()) / 60_000));
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;

  return `${Math.round(diffHours / 24)}d ago`;
}

export type ProjectWithTaskStatuses = {
  id: string;
  name: string;
  client: string | null;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  dueDate: Date | null;
  tasks: { status: TaskStatus }[];
};

export function mapProject(project: ProjectWithTaskStatuses, index = 0): Project {
  const tasksTotal = project.tasks.length;
  const tasksDone = project.tasks.filter((task) => task.status === "DONE").length;
  const progress = tasksTotal ? Math.round((tasksDone / tasksTotal) * 100) : 0;

  return {
    id: project.id,
    name: project.name,
    client: project.client ?? "Internal workspace",
    description: project.description,
    status: project.status,
    priority: project.priority,
    progress,
    dueDate: toDateString(project.dueDate),
    accent: projectAccents[index % projectAccents.length],
    tasksTotal,
    tasksDone
  };
}

export type TaskWithProject = {
  id: string;
  projectId: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: Date | null;
  project: {
    name: string;
  };
  assignee: {
    name: string;
  } | null;
  comments: { id: string }[];
};

export function mapTask(task: TaskWithProject): Task {
  return {
    id: task.id,
    title: task.title,
    projectId: task.projectId,
    project: task.project.name,
    status: task.status,
    priority: task.priority,
    assignee: task.assignee?.name ?? "Unassigned",
    dueDate: toDateString(task.dueDate),
    comments: task.comments.length
  };
}

export type ActivityWithActor = {
  id: string;
  type: ActivityType;
  message: string;
  createdAt: Date;
  actor: {
    name: string;
  };
  project?: {
    name: string;
  } | null;
  task?: {
    title: string;
  } | null;
};

export function mapActivity(activity: ActivityWithActor) {
  const context = activity.task?.title ?? activity.project?.name;

  return {
    id: activity.id,
    type: activity.type,
    actor: activity.actor.name,
    message: activity.message,
    timestamp: activityTimestamp(activity.createdAt),
    context
  };
}

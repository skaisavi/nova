export type ProjectStatus = "PLANNING" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";
export type TaskStatus = "BACKLOG" | "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type ActivityType =
  | "PROJECT_CREATED"
  | "PROJECT_UPDATED"
  | "TASK_CREATED"
  | "TASK_MOVED"
  | "COMMENT_CREATED"
  | "MEMBER_JOINED";

export type Project = {
  id: string;
  name: string;
  client: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  progress: number;
  dueDate: string;
  accent: string;
  tasksTotal: number;
  tasksDone: number;
};

export type Task = {
  id: string;
  title: string;
  projectId: string;
  project: string;
  status: TaskStatus;
  priority: Priority;
  assignee: string;
  dueDate: string;
  comments: number;
};

export type Activity = {
  id: string;
  type: ActivityType;
  actor: string;
  message: string;
  timestamp: string;
  context?: string;
};

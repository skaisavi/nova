import type { Activity, Project, Task, TaskStatus } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "aurora-brand-system",
    name: "Aurora Brand System",
    client: "Northstar Studio",
    description: "Identity refresh, launch deck, and client portal for a boutique creative team.",
    status: "ACTIVE",
    priority: "HIGH",
    progress: 72,
    dueDate: "2026-06-05",
    accent: "from-cyan-300/80 to-emerald-300/70",
    tasksTotal: 28,
    tasksDone: 20
  },
  {
    id: "pulse-saas-redesign",
    name: "Pulse SaaS Redesign",
    client: "Pulse Labs",
    description: "Product dashboard UX, component audit, and onboarding conversion work.",
    status: "PLANNING",
    priority: "MEDIUM",
    progress: 34,
    dueDate: "2026-06-18",
    accent: "from-violet-300/80 to-fuchsia-300/70",
    tasksTotal: 19,
    tasksDone: 6
  },
  {
    id: "junior-dev-portfolio",
    name: "Junior Dev Portfolio",
    client: "Mentor Sprint",
    description: "Case study system, project narrative templates, and deployment checklist.",
    status: "ACTIVE",
    priority: "URGENT",
    progress: 58,
    dueDate: "2026-05-29",
    accent: "from-amber-200/90 to-rose-300/70",
    tasksTotal: 16,
    tasksDone: 9
  }
];

export const tasks: Task[] = [
  {
    id: "task-1",
    title: "Finalize dashboard preview composition",
    projectId: "aurora-brand-system",
    project: "Aurora Brand System",
    status: "IN_PROGRESS",
    priority: "HIGH",
    assignee: "Sofia",
    dueDate: "2026-05-27",
    comments: 4
  },
  {
    id: "task-2",
    title: "Write onboarding microcopy variants",
    projectId: "pulse-saas-redesign",
    project: "Pulse SaaS Redesign",
    status: "TODO",
    priority: "MEDIUM",
    assignee: "Mika",
    dueDate: "2026-06-01",
    comments: 2
  },
  {
    id: "task-3",
    title: "Review Prisma schema with mentor notes",
    projectId: "junior-dev-portfolio",
    project: "Junior Dev Portfolio",
    status: "REVIEW",
    priority: "URGENT",
    assignee: "Nova",
    dueDate: "2026-05-24",
    comments: 7
  },
  {
    id: "task-4",
    title: "Archive unused discovery notes",
    projectId: "aurora-brand-system",
    project: "Aurora Brand System",
    status: "DONE",
    priority: "LOW",
    assignee: "Iris",
    dueDate: "2026-05-20",
    comments: 1
  },
  {
    id: "task-5",
    title: "Map activity event naming convention",
    projectId: "pulse-saas-redesign",
    project: "Pulse SaaS Redesign",
    status: "BACKLOG",
    priority: "MEDIUM",
    assignee: "Theo",
    dueDate: "2026-06-04",
    comments: 0
  }
];

export const activities: Activity[] = [
  {
    id: "activity-1",
    type: "TASK_MOVED",
    actor: "Sofia",
    message: "moved dashboard preview into review",
    timestamp: "2 min ago"
  },
  {
    id: "activity-2",
    type: "COMMENT_CREATED",
    actor: "Mika",
    message: "left feedback on onboarding copy",
    timestamp: "18 min ago"
  },
  {
    id: "activity-3",
    type: "PROJECT_UPDATED",
    actor: "Nova",
    message: "updated Pulse SaaS milestone dates",
    timestamp: "1 hr ago"
  },
  {
    id: "activity-4",
    type: "MEMBER_JOINED",
    actor: "Iris",
    message: "joined Northstar Studio workspace",
    timestamp: "Yesterday"
  }
];

export const taskColumns: { status: TaskStatus; label: string }[] = [
  { status: "BACKLOG", label: "Backlog" },
  { status: "TODO", label: "To do" },
  { status: "IN_PROGRESS", label: "In progress" },
  { status: "REVIEW", label: "Review" },
  { status: "DONE", label: "Done" }
];

import type { ActivityType } from "@/lib/types";

export const realtimeChannels = {
  workspace: (workspaceId: string) => `workspace:${workspaceId}`,
  project: (projectId: string) => `project:${projectId}`,
  task: (taskId: string) => `task:${taskId}`
} as const;

export const realtimeEvents = {
  projectCommentCreated: "project:comment_created",
  projectActivityCreated: "project:activity_created",
  taskUpdated: "task:updated",
  taskCompleted: "task:completed",
  workspaceActivityCreated: "workspace:activity_created"
} as const;

export const activityEvents: Record<ActivityType, string> = {
  PROJECT_CREATED: realtimeEvents.projectActivityCreated,
  PROJECT_UPDATED: realtimeEvents.projectActivityCreated,
  TASK_CREATED: realtimeEvents.workspaceActivityCreated,
  TASK_MOVED: realtimeEvents.taskUpdated,
  COMMENT_CREATED: realtimeEvents.projectCommentCreated,
  MEMBER_JOINED: realtimeEvents.workspaceActivityCreated
};

export type RealtimeStatus = "connecting" | "live" | "offline";

export type ActivityCreatedPayload = {
  id: string;
  workspaceId: string;
  projectId?: string | null;
  taskId?: string | null;
  type: ActivityType;
  message: string;
  createdAt: string;
  context?: string | null;
  user?: {
    name: string | null;
    image: string | null;
  };
};

export type ProjectCommentCreatedPayload = {
  id: string;
  projectId: string;
  taskId?: string | null;
  body: string;
  createdAt: string;
  author: {
    name: string | null;
    image: string | null;
  };
};

export type TaskUpdatedPayload = {
  id: string;
  projectId: string;
  workspaceId: string;
  title: string;
  status: string;
  completed: boolean;
};

export type RealtimePayloadMap = {
  [realtimeEvents.projectCommentCreated]: ProjectCommentCreatedPayload;
  [realtimeEvents.projectActivityCreated]: ActivityCreatedPayload;
  [realtimeEvents.workspaceActivityCreated]: ActivityCreatedPayload;
  [realtimeEvents.taskUpdated]: TaskUpdatedPayload;
  [realtimeEvents.taskCompleted]: TaskUpdatedPayload;
};

export type RealtimeEventName = keyof RealtimePayloadMap;

export type RealtimeEvent<TEvent extends RealtimeEventName = RealtimeEventName> = {
  channel: string;
  name: TEvent;
  payload: RealtimePayloadMap[TEvent];
};

export function isRealtimeConfigured() {
  return Boolean(
    process.env.PUSHER_APP_ID &&
      process.env.NEXT_PUBLIC_PUSHER_KEY &&
      process.env.PUSHER_SECRET &&
      process.env.NEXT_PUBLIC_PUSHER_CLUSTER
  );
}

export function isRealtimeClientConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_PUSHER_KEY && process.env.NEXT_PUBLIC_PUSHER_CLUSTER);
}

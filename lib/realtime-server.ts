import Pusher from "pusher";
import type { ActivityLog, Comment, Project, Task, User } from "@prisma/client";
import {
  isRealtimeConfigured,
  realtimeChannels,
  realtimeEvents,
  type ActivityCreatedPayload,
  type ProjectCommentCreatedPayload,
  type RealtimeEvent,
  type TaskUpdatedPayload,
  type RealtimeEventName
} from "@/lib/realtime";

let pusher: Pusher | null = null;

function getPusherServer() {
  if (!isRealtimeConfigured()) {
    return null;
  }

  if (!pusher) {
    pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID ?? "",
      key: process.env.NEXT_PUBLIC_PUSHER_KEY ?? "",
      secret: process.env.PUSHER_SECRET ?? "",
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "eu",
      useTLS: true
    });
  }

  return pusher;
}

export async function publishRealtimeEvent<TEvent extends RealtimeEventName>(event: RealtimeEvent<TEvent>) {
  const server = getPusherServer();

  if (!server) {
    return;
  }

  await server.trigger(event.channel, event.name, event.payload);
}

export function toActivityPayload(
  activity: ActivityLog & {
    actor: Pick<User, "name" | "image">;
    project?: Pick<Project, "name"> | null;
    task?: Pick<Task, "title"> | null;
  }
): ActivityCreatedPayload {
  return {
    id: activity.id,
    workspaceId: activity.workspaceId,
    projectId: activity.projectId,
    taskId: activity.taskId,
    type: activity.type,
    message: activity.message,
    createdAt: activity.createdAt.toISOString(),
    context: activity.task?.title ?? activity.project?.name ?? null,
    user: {
      name: activity.actor.name,
      image: activity.actor.image
    }
  };
}

export function toProjectCommentPayload(
  comment: Comment & {
    author: Pick<User, "name" | "image">;
  },
  projectId: string
): ProjectCommentCreatedPayload {
  return {
    id: comment.id,
    projectId,
    taskId: comment.taskId,
    body: comment.body,
    createdAt: comment.createdAt.toISOString(),
    author: {
      name: comment.author.name,
      image: comment.author.image
    }
  };
}

export async function publishActivity(activity: Parameters<typeof toActivityPayload>[0]) {
  const payload = toActivityPayload(activity);

  await Promise.all([
    publishRealtimeEvent({
      channel: realtimeChannels.workspace(activity.workspaceId),
      name: realtimeEvents.workspaceActivityCreated,
      payload
    }),
    activity.projectId
      ? publishRealtimeEvent({
          channel: realtimeChannels.project(activity.projectId),
          name: realtimeEvents.projectActivityCreated,
          payload
        })
      : Promise.resolve()
  ]);
}

export async function publishProjectComment(comment: Parameters<typeof toProjectCommentPayload>[0], projectId: string) {
  await publishRealtimeEvent({
    channel: realtimeChannels.project(projectId),
    name: realtimeEvents.projectCommentCreated,
    payload: toProjectCommentPayload(comment, projectId)
  });
}

export async function publishTaskUpdated(payload: TaskUpdatedPayload) {
  await Promise.all([
    publishRealtimeEvent({
      channel: realtimeChannels.workspace(payload.workspaceId),
      name: payload.completed ? realtimeEvents.taskCompleted : realtimeEvents.taskUpdated,
      payload
    }),
    publishRealtimeEvent({
      channel: realtimeChannels.project(payload.projectId),
      name: payload.completed ? realtimeEvents.taskCompleted : realtimeEvents.taskUpdated,
      payload
    }),
    publishRealtimeEvent({
      channel: realtimeChannels.task(payload.id),
      name: payload.completed ? realtimeEvents.taskCompleted : realtimeEvents.taskUpdated,
      payload
    })
  ]);
}

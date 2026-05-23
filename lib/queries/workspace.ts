import { cache } from "react";
import { getCurrentUser } from "@/lib/auth";
import { hasDatabaseUrl, prisma } from "@/lib/db";

export type WorkspaceStats = {
  members: number;
  projects: { planning: number; active: number; paused: number; completed: number };
  tasks: { backlog: number; todo: number; inProgress: number; review: number; done: number };
};

export type WorkspaceContext = {
  userId: string;
  userName: string;
  workspaceId: string;
  workspaceName: string;
};

export const getWorkspaceContext = cache(async function getWorkspaceContext(): Promise<WorkspaceContext | null> {
  const user = await getCurrentUser();

  if (!user || !hasDatabaseUrl()) {
    return null;
  }

  const membership = await prisma.workspaceMember.findFirst({
    where: {
      userId: user.id
    },
    include: {
      workspace: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  if (!membership) {
    return null;
  }

  return {
    userId: user.id,
    userName: user.name,
    workspaceId: membership.workspace.id,
    workspaceName: membership.workspace.name
  };
});

export const getWorkspaceStats = cache(async function getWorkspaceStats(): Promise<WorkspaceStats | null> {
  const user = await getCurrentUser();

  if (!user || !hasDatabaseUrl()) {
    return null;
  }

  const membership = await prisma.workspaceMember.findFirst({
    where: { userId: user.id },
    select: { workspaceId: true }
  });

  if (!membership) return null;

  const { workspaceId } = membership;

  const [members, projects, tasks] = await Promise.all([
    prisma.workspaceMember.count({ where: { workspaceId } }),
    prisma.project.groupBy({
      by: ["status"],
      where: { workspaceId },
      _count: true
    }),
    prisma.task.groupBy({
      by: ["status"],
      where: { project: { workspaceId } },
      _count: true
    })
  ]);

  function count<T extends string>(groups: { status: T; _count: number }[], status: T) {
    return groups.find((g) => g.status === status)?._count ?? 0;
  }

  return {
    members,
    projects: {
      planning: count(projects, "PLANNING"),
      active: count(projects, "ACTIVE"),
      paused: count(projects, "PAUSED"),
      completed: count(projects, "COMPLETED")
    },
    tasks: {
      backlog: count(tasks, "BACKLOG"),
      todo: count(tasks, "TODO"),
      inProgress: count(tasks, "IN_PROGRESS"),
      review: count(tasks, "REVIEW"),
      done: count(tasks, "DONE")
    }
  };
});

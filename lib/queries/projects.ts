import { prisma } from "@/lib/db";
import { getWorkspaceContext } from "@/lib/queries/workspace";
import { mapActivity, mapProject, mapTask, type ProjectWithTaskStatuses } from "@/lib/queries/shared";

export type ProjectComment = {
  id: string;
  projectId: string;
  body: string;
  author: string;
  createdAt: string;
};

export async function getWorkspaceProjects() {
  const context = await getWorkspaceContext();

  if (!context) {
    return [];
  }

  const projects = await prisma.project.findMany({
    where: {
      workspaceId: context.workspaceId
    },
    orderBy: [{ status: "asc" }, { dueDate: "asc" }],
    select: {
      id: true,
      name: true,
      client: true,
      description: true,
      status: true,
      priority: true,
      dueDate: true,
      tasks: {
        select: {
          status: true
        }
      }
    }
  });

  return projects.map((project: ProjectWithTaskStatuses, index) => mapProject(project, index));
}

export async function getWorkspaceProject(projectId: string) {
  const context = await getWorkspaceContext();

  if (!context) {
    return null;
  }

  const [project, tasks, comments, activities] = await Promise.all([
    prisma.project.findFirst({
      where: {
        id: projectId,
        workspaceId: context.workspaceId
      },
      select: {
        id: true,
        name: true,
        client: true,
        description: true,
        status: true,
        priority: true,
        dueDate: true,
        tasks: {
          select: {
            status: true
          }
        }
      }
    }),
    prisma.task.findMany({
      where: {
        projectId,
        project: {
          workspaceId: context.workspaceId
        }
      },
      orderBy: [{ status: "asc" }, { dueDate: "asc" }],
      include: {
        project: {
          select: {
            name: true
          }
        },
        assignee: {
          select: {
            name: true
          }
        },
        comments: {
          select: {
            id: true
          }
        }
      }
    }),
    prisma.comment.findMany({
      where: {
        projectId,
        project: {
          workspaceId: context.workspaceId
        },
        taskId: null
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        author: {
          select: {
            name: true
          }
        }
      }
    }),
    prisma.activityLog.findMany({
      where: {
        workspaceId: context.workspaceId,
        projectId
      },
      take: 8,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        actor: {
          select: {
            name: true
          }
        },
        project: {
          select: {
            name: true
          }
        },
        task: {
          select: {
            title: true
          }
        }
      }
    })
  ]);

  if (!project) {
    return null;
  }

  return {
    project: mapProject(project, 0),
    tasks: tasks.map(mapTask),
    comments: comments.map<ProjectComment>((comment) => ({
      id: comment.id,
      projectId,
      body: comment.body,
      author: comment.author.name,
      createdAt: comment.createdAt.toISOString()
    })),
    activities: activities.map(mapActivity)
  };
}

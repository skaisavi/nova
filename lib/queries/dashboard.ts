import { prisma } from "@/lib/db";
import { mapActivity, mapProject, mapTask } from "@/lib/queries/shared";
import { getWorkspaceContext } from "@/lib/queries/workspace";

export async function getDashboardOverview() {
  const context = await getWorkspaceContext();

  if (!context) {
    return {
      workspaceName: "NOVA workspace",
      userName: "there",
      projects: [],
      tasks: [],
      activities: [],
      stats: {
        activeProjects: 0,
        completedTasks: 0,
        upcomingDeadlines: 0,
        overdueTasks: 0,
        workspaceHealth: 0
      }
    };
  }

  const now = new Date();

  const [projects, tasks, activities, activeProjects, completedTasks, upcomingDeadlines, overdueTasks] =
    await Promise.all([
      prisma.project.findMany({
        where: {
          workspaceId: context.workspaceId
        },
        take: 4,
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
      }),
      prisma.task.findMany({
        where: {
          project: {
            workspaceId: context.workspaceId
          }
        },
        take: 8,
        orderBy: [{ dueDate: "asc" }, { priority: "desc" }],
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
      prisma.activityLog.findMany({
        where: {
          workspaceId: context.workspaceId
        },
        take: 6,
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
      }),
      prisma.project.count({
        where: {
          workspaceId: context.workspaceId,
          status: "ACTIVE"
        }
      }),
      prisma.task.count({
        where: {
          status: "DONE",
          project: {
            workspaceId: context.workspaceId
          }
        }
      }),
      prisma.task.count({
        where: {
          status: {
            not: "DONE"
          },
          dueDate: {
            gte: now
          },
          project: {
            workspaceId: context.workspaceId
          }
        }
      }),
      prisma.task.count({
        where: {
          status: {
            not: "DONE"
          },
          dueDate: {
            lt: now
          },
          project: {
            workspaceId: context.workspaceId
          }
        }
      })
    ]);

  const mappedProjects = projects.map(mapProject);
  const averageProgress = mappedProjects.length
    ? Math.round(mappedProjects.reduce((total, project) => total + project.progress, 0) / mappedProjects.length)
    : 0;
  const workspaceHealth = Math.max(0, Math.min(100, averageProgress - overdueTasks * 4 + activeProjects * 3));

  return {
    workspaceName: context.workspaceName,
    userName: context.userName,
    projects: mappedProjects,
    tasks: tasks.map(mapTask),
    activities: activities.map(mapActivity),
    stats: {
      activeProjects,
      completedTasks,
      upcomingDeadlines,
      overdueTasks,
      workspaceHealth
    }
  };
}

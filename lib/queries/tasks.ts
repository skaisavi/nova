import { prisma } from "@/lib/db";
import { mapTask } from "@/lib/queries/shared";
import { getWorkspaceContext } from "@/lib/queries/workspace";

export async function getWorkspaceTasks() {
  const context = await getWorkspaceContext();

  if (!context) {
    return [];
  }

  const tasks = await prisma.task.findMany({
    where: {
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
  });

  return tasks.map(mapTask);
}

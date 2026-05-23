import { prisma } from "@/lib/db";
import { mapActivity } from "@/lib/queries/shared";
import { getWorkspaceContext } from "@/lib/queries/workspace";

export async function getWorkspaceActivity(take = 12) {
  const context = await getWorkspaceContext();

  if (!context) {
    return [];
  }

  const activities = await prisma.activityLog.findMany({
    where: {
      workspaceId: context.workspaceId
    },
    take,
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
  });

  return activities.map(mapActivity);
}

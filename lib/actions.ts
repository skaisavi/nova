"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireCurrentUser } from "@/lib/auth";
import { hasDatabaseUrl, prisma } from "@/lib/db";
import { publishActivity, publishProjectComment, publishTaskUpdated } from "@/lib/realtime-server";
import { commentSchema, editProjectSchema, editTaskSchema, projectSchema, taskSchema } from "@/lib/validations";

const nameSchema = z.string().min(2, "Must be at least 2 characters.").max(80, "Must be 80 characters or fewer.");

export type ActionResult = {
  ok: boolean;
  message: string;
  id?: string;
};

async function getWritableWorkspace(userId: string) {
  const membership = await prisma.workspaceMember.findFirst({
    where: {
      userId
    },
    select: {
      workspaceId: true
    }
  });

  return membership?.workspaceId;
}

export async function createProjectAction(input: unknown): Promise<ActionResult> {
  const parsed = projectSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: "Check the project details and try again." };
  }

  if (!hasDatabaseUrl()) {
    return { ok: true, message: "Project validated. Connect PostgreSQL to save it." };
  }

  const user = await requireCurrentUser();
  const workspaceId = await getWritableWorkspace(user.id);

  if (!workspaceId) {
    return { ok: false, message: "No writable workspace found for the current user." };
  }

  const project = await prisma.project.create({
    data: {
      workspaceId,
      name: parsed.data.name,
      client: parsed.data.client,
      description: parsed.data.description,
      status: parsed.data.status,
      priority: parsed.data.priority,
      dueDate: parsed.data.dueDate
    }
  });

  const activity = await prisma.activityLog.create({
    data: {
      workspaceId,
      projectId: project.id,
      actorId: user.id,
      type: "PROJECT_CREATED",
      message: `created ${project.name}`
    },
    include: {
      actor: {
        select: {
          name: true,
          image: true
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

  await publishActivity(activity);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");

  return { ok: true, message: "Project created.", id: project.id };
}

export async function createTaskAction(input: unknown): Promise<ActionResult> {
  const parsed = taskSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: "Check the task details and try again." };
  }

  if (!hasDatabaseUrl()) {
    return { ok: true, message: "Task validated. Connect PostgreSQL to save it." };
  }

  const user = await requireCurrentUser();
  const workspaceId = await getWritableWorkspace(user.id);

  if (!workspaceId) {
    return { ok: false, message: "No writable workspace found for the current user." };
  }

  const project = await prisma.project.findFirst({
    where: {
      id: parsed.data.projectId,
      workspaceId
    },
    select: {
      id: true,
      workspaceId: true
    }
  });

  if (!project) {
    return { ok: false, message: "Project could not be found for this workspace." };
  }

  const task = await prisma.task.create({
    data: {
      projectId: project.id,
      title: parsed.data.title,
      status: parsed.data.status,
      priority: parsed.data.priority,
      assigneeId: parsed.data.assigneeId || null,
      creatorId: user.id,
      dueDate: parsed.data.dueDate
    },
    include: {
      project: {
        select: {
          workspaceId: true
        }
      }
    }
  });

  const activity = await prisma.activityLog.create({
    data: {
      workspaceId: task.project.workspaceId,
      projectId: task.projectId,
      taskId: task.id,
      actorId: user.id,
      type: "TASK_CREATED",
      message: `created task ${task.title}`
    },
    include: {
      actor: {
        select: {
          name: true,
          image: true
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

  await publishActivity(activity);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/tasks");
  revalidatePath(`/dashboard/projects/${task.projectId}`);

  return { ok: true, message: "Task created." };
}

export async function updateProjectAction(input: unknown): Promise<ActionResult> {
  const parsed = editProjectSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: "Check the project details and try again." };
  }

  if (!hasDatabaseUrl()) {
    return { ok: true, message: "Project update validated. Connect PostgreSQL to save it." };
  }

  const user = await requireCurrentUser();
  const workspaceId = await getWritableWorkspace(user.id);

  if (!workspaceId) {
    return { ok: false, message: "No writable workspace found for the current user." };
  }

  const project = await prisma.project.update({
    where: {
      id: parsed.data.id,
      workspaceId
    },
    data: {
      name: parsed.data.name,
      client: parsed.data.client,
      description: parsed.data.description,
      status: parsed.data.status,
      priority: parsed.data.priority,
      dueDate: parsed.data.dueDate
    }
  });

  const activity = await prisma.activityLog.create({
    data: {
      workspaceId,
      projectId: project.id,
      actorId: user.id,
      type: "PROJECT_UPDATED",
      message: `updated ${project.name}`
    },
    include: {
      actor: {
        select: {
          name: true,
          image: true
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

  await publishActivity(activity);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/projects/${project.id}`);

  return { ok: true, message: "Project updated." };
}

export async function updateTaskAction(input: unknown): Promise<ActionResult> {
  const parsed = editTaskSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: "Check the task details and try again." };
  }

  if (!hasDatabaseUrl()) {
    return { ok: true, message: "Task update validated. Connect PostgreSQL to save it." };
  }

  const user = await requireCurrentUser();
  const workspaceId = await getWritableWorkspace(user.id);

  if (!workspaceId) {
    return { ok: false, message: "No writable workspace found for the current user." };
  }

  const existingTask = await prisma.task.findFirst({
    where: {
      id: parsed.data.id,
      project: {
        workspaceId
      }
    },
    select: {
      status: true
    }
  });

  if (!existingTask) {
    return { ok: false, message: "Task could not be found for this workspace." };
  }

  const task = await prisma.task.update({
    where: {
      id: parsed.data.id
    },
    data: {
      title: parsed.data.title,
      status: parsed.data.status,
      priority: parsed.data.priority,
      assigneeId: parsed.data.assigneeId || undefined,
      dueDate: parsed.data.dueDate
    },
    include: {
      project: {
        select: {
          workspaceId: true
        }
      }
    }
  });

  const completed = task.status === "DONE";
  const statusChanged = parsed.data.status && parsed.data.status !== existingTask.status;

  const activity = await prisma.activityLog.create({
    data: {
      workspaceId: task.project.workspaceId,
      projectId: task.projectId,
      taskId: task.id,
      actorId: user.id,
      type: "TASK_MOVED",
      message: completed ? `completed task ${task.title}` : statusChanged ? `moved task ${task.title}` : `updated task ${task.title}`
    },
    include: {
      actor: {
        select: {
          name: true,
          image: true
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

  await Promise.all([
    publishActivity(activity),
    publishTaskUpdated({
      id: task.id,
      projectId: task.projectId,
      workspaceId: task.project.workspaceId,
      title: task.title,
      status: task.status,
      completed
    })
  ]);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/tasks");
  revalidatePath(`/dashboard/projects/${task.projectId}`);

  return { ok: true, message: "Task updated." };
}

export async function createCommentAction(input: unknown): Promise<ActionResult> {
  const parsed = commentSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: "Write a comment before sending." };
  }

  if (!hasDatabaseUrl()) {
    return { ok: true, message: "Comment validated. Connect PostgreSQL to save it." };
  }

  const user = await requireCurrentUser();

  if (parsed.data.taskId) {
    const task = await prisma.task.findFirst({
      where: {
        id: parsed.data.taskId,
        project: {
          workspace: {
            members: {
              some: {
                userId: user.id
              }
            }
          }
        }
      },
      select: {
        id: true,
        projectId: true,
        project: {
          select: {
            workspaceId: true
          }
        }
      }
    });

    if (!task) {
      return { ok: false, message: "Task could not be found for this comment." };
    }

    const comment = await prisma.comment.create({
      data: {
        taskId: task.id,
        authorId: user.id,
        body: parsed.data.body
      },
      include: {
        author: {
          select: {
            name: true,
            image: true
          }
        },
        task: {
          select: {
            projectId: true,
            project: {
              select: {
                workspaceId: true
              }
            }
          }
        }
      }
    });

    const activity = await prisma.activityLog.create({
      data: {
        workspaceId: task.project.workspaceId,
        projectId: task.projectId,
        taskId: task.id,
        actorId: user.id,
        type: "COMMENT_CREATED",
        message: "left a task comment"
      },
      include: {
        actor: {
          select: {
            name: true,
            image: true
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

    await Promise.all([publishProjectComment(comment, task.projectId), publishActivity(activity)]);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/activity");
    revalidatePath(`/dashboard/projects/${task.projectId}`);

    return { ok: true, message: "Comment created." };
  }

  if (!parsed.data.projectId) {
    return { ok: false, message: "Comment must belong to a project or task." };
  }

  const project = await prisma.project.findFirst({
    where: {
      id: parsed.data.projectId,
      workspace: {
        members: {
          some: {
            userId: user.id
          }
        }
      }
    },
    select: {
      id: true,
      workspaceId: true
    }
  });

  if (!project) {
    return { ok: false, message: "Project could not be found for this comment." };
  }

  const comment = await prisma.comment.create({
    data: {
      projectId: project.id,
      authorId: user.id,
      body: parsed.data.body
    },
    include: {
      author: {
        select: {
          name: true,
          image: true
        }
      },
      project: {
        select: {
          workspaceId: true
        }
      }
    }
  });

  const activity = await prisma.activityLog.create({
    data: {
      workspaceId: project.workspaceId,
      projectId: project.id,
      actorId: user.id,
      type: "COMMENT_CREATED",
      message: "left a project comment"
    },
    include: {
      actor: {
        select: {
          name: true,
          image: true
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

  await Promise.all([publishProjectComment(comment, project.id), publishActivity(activity)]);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/activity");
  revalidatePath(`/dashboard/projects/${project.id}`);

  return { ok: true, message: "Comment created." };
}

export async function updateProfileAction(input: unknown): Promise<ActionResult> {
  const parsed = z.object({ name: nameSchema }).safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid name." };
  }

  if (!hasDatabaseUrl()) {
    return { ok: true, message: "Profile updated." };
  }

  const user = await requireCurrentUser();

  await prisma.user.update({
    where: { id: user.id },
    data: { name: parsed.data.name }
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");

  return { ok: true, message: "Profile saved." };
}

export async function updateWorkspaceAction(input: unknown): Promise<ActionResult> {
  const parsed = z.object({ name: nameSchema }).safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid workspace name." };
  }

  if (!hasDatabaseUrl()) {
    return { ok: true, message: "Workspace updated." };
  }

  const user = await requireCurrentUser();
  const workspaceId = await getWritableWorkspace(user.id);

  if (!workspaceId) {
    return { ok: false, message: "No writable workspace found." };
  }

  await prisma.workspace.update({
    where: { id: workspaceId },
    data: { name: parsed.data.name }
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/settings");

  return { ok: true, message: "Workspace saved." };
}

export async function deleteProjectAction(projectId: string): Promise<ActionResult> {
  if (!hasDatabaseUrl()) {
    return { ok: false, message: "No database connected." };
  }

  const user = await requireCurrentUser();
  const workspaceId = await getWritableWorkspace(user.id);

  if (!workspaceId) {
    return { ok: false, message: "No writable workspace found." };
  }

  await prisma.project.delete({
    where: { id: projectId, workspaceId }
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/projects");

  return { ok: true, message: "Project deleted." };
}

export async function deleteWorkspaceAction(): Promise<ActionResult> {
  if (!hasDatabaseUrl()) {
    return { ok: false, message: "No database connected." };
  }

  const user = await requireCurrentUser();
  const workspaceId = await getWritableWorkspace(user.id);

  if (!workspaceId) {
    return { ok: false, message: "No workspace found." };
  }

  await prisma.workspace.delete({ where: { id: workspaceId } });

  return { ok: true, message: "Workspace deleted." };
}

export async function deleteTaskAction(taskId: string): Promise<ActionResult> {
  if (!hasDatabaseUrl()) {
    return { ok: false, message: "No database connected." };
  }

  const user = await requireCurrentUser();
  const workspaceId = await getWritableWorkspace(user.id);

  if (!workspaceId) {
    return { ok: false, message: "No writable workspace found." };
  }

  const task = await prisma.task.findFirst({
    where: { id: taskId, project: { workspaceId } },
    select: { projectId: true }
  });

  if (!task) {
    return { ok: false, message: "Task not found." };
  }

  await prisma.task.delete({ where: { id: taskId } });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/tasks");
  revalidatePath(`/dashboard/projects/${task.projectId}`);

  return { ok: true, message: "Task deleted." };
}

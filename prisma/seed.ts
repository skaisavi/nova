import { PrismaClient, type Priority, type ProjectStatus, type TaskStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const demoProjects: {
  name: string;
  client: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  dueDate: Date;
  tasks: {
    title: string;
    description: string;
    status: TaskStatus;
    priority: Priority;
    dueDate: Date;
  }[];
}[] = [
  {
    name: "Aurora Brand System",
    client: "Northstar Studio",
    description: "Identity refresh, launch deck, and client portal for a boutique creative team.",
    status: "ACTIVE",
    priority: "HIGH",
    dueDate: new Date("2026-06-05"),
    tasks: [
      {
        title: "Finalize dashboard preview composition",
        description: "Polish the responsive preview for portfolio screenshots.",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: new Date("2026-05-27")
      },
      {
        title: "Prepare client handoff checklist",
        description: "Create a concise checklist for logo files, typography, and launch assets.",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: new Date("2026-05-31")
      },
      {
        title: "Archive discovery notes",
        description: "Move unused research into the project archive.",
        status: "DONE",
        priority: "LOW",
        dueDate: new Date("2026-05-20")
      }
    ]
  },
  {
    name: "Pulse SaaS Redesign",
    client: "Pulse Labs",
    description: "Product dashboard UX, component audit, and onboarding conversion work.",
    status: "PLANNING",
    priority: "MEDIUM",
    dueDate: new Date("2026-06-18"),
    tasks: [
      {
        title: "Write onboarding microcopy variants",
        description: "Draft sharper product language for the first-run experience.",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: new Date("2026-06-01")
      },
      {
        title: "Map activity event naming convention",
        description: "Define consistent event names for future realtime updates.",
        status: "BACKLOG",
        priority: "MEDIUM",
        dueDate: new Date("2026-06-04")
      }
    ]
  },
  {
    name: "Junior Dev Portfolio",
    client: "Mentor Sprint",
    description: "Case study system, project narrative templates, and deployment checklist.",
    status: "ACTIVE",
    priority: "URGENT",
    dueDate: new Date("2026-05-29"),
    tasks: [
      {
        title: "Review Prisma schema with mentor notes",
        description: "Make the database model easy to explain in interviews.",
        status: "REVIEW",
        priority: "URGENT",
        dueDate: new Date("2026-05-24")
      },
      {
        title: "Record dashboard walkthrough",
        description: "Capture a short product narrative for the project case study.",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: new Date("2026-05-28")
      }
    ]
  },
  {
    name: "NOVA Command Centre",
    client: "Internal Portfolio Lab",
    description: "Full-stack portfolio product with workspace data, glass UI, and realtime-ready architecture.",
    status: "ACTIVE",
    priority: "HIGH",
    dueDate: new Date("2026-06-12"),
    tasks: [
      {
        title: "Connect project pages to Prisma data",
        description: "Replace mock project data after authentication is in place.",
        status: "BACKLOG",
        priority: "HIGH",
        dueDate: new Date("2026-06-06")
      },
      {
        title: "Design comment thread experience",
        description: "Create a refined discussion pattern for project and task comments.",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: new Date("2026-06-09")
      }
    ]
  }
];

async function main() {
  const demoPasswordHash = await bcrypt.hash("nova-demo", 12);

  const existingWorkspace = await prisma.workspace.findUnique({
    where: {
      slug: "northstar-studio"
    },
    select: {
      id: true
    }
  });

  if (existingWorkspace) {
    await prisma.workspace.delete({
      where: {
        id: existingWorkspace.id
      }
    });
  }

  await prisma.user.deleteMany({
    where: {
      email: {
        in: ["alex@nova.dev", "skaiste@nova.dev", "sofia@nova.dev", "mika@nova.dev"]
      }
    }
  });

  const [owner, designer, strategist] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Skaiste",
        email: "skaiste@nova.dev",
        passwordHash: demoPasswordHash,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      }
    }),
    prisma.user.create({
      data: {
        name: "Sofia Chen",
        email: "sofia@nova.dev",
        passwordHash: demoPasswordHash
      }
    }),
    prisma.user.create({
      data: {
        name: "Mika Stone",
        email: "mika@nova.dev",
        passwordHash: demoPasswordHash
      }
    })
  ]);

  const workspace = await prisma.workspace.create({
    data: {
      name: "Northstar Studio",
      slug: "northstar-studio",
      ownerId: owner.id,
      members: {
        create: [
          { userId: owner.id, role: "OWNER" },
          { userId: designer.id, role: "ADMIN" },
          { userId: strategist.id, role: "MEMBER" }
        ]
      }
    }
  });

  for (const projectData of demoProjects) {
    const project = await prisma.project.create({
      data: {
        workspaceId: workspace.id,
        name: projectData.name,
        client: projectData.client,
        description: projectData.description,
        status: projectData.status,
        priority: projectData.priority,
        dueDate: projectData.dueDate
      }
    });

    await prisma.comment.create({
      data: {
        projectId: project.id,
        authorId: owner.id,
        body: `${project.name} is ready for the next focused review pass.`
      }
    });

    for (const taskData of projectData.tasks) {
      const assignee = taskData.status === "BACKLOG" ? null : taskData.priority === "URGENT" ? owner : designer;
      const task = await prisma.task.create({
        data: {
          projectId: project.id,
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          priority: taskData.priority,
          dueDate: taskData.dueDate,
          creatorId: owner.id,
          assigneeId: assignee?.id
        }
      });

      await prisma.comment.create({
        data: {
          projectId: project.id,
          taskId: task.id,
          authorId: assignee?.id ?? strategist.id,
          body: task.status === "DONE" ? "Shipped and archived for the case study notes." : "Keep the next update concise and client-ready."
        }
      });
    }

    await prisma.activityLog.create({
      data: {
        workspaceId: workspace.id,
        projectId: project.id,
        actorId: owner.id,
        type: "PROJECT_CREATED",
        message: `created ${project.name}`,
        metadata: JSON.stringify({ source: "seed" })
      }
    });
  }

  const reviewTask = await prisma.task.findFirstOrThrow({
    where: {
      title: "Review Prisma schema with mentor notes"
    },
    select: {
      id: true,
      projectId: true
    }
  });

  await prisma.activityLog.createMany({
    data: [
      {
        workspaceId: workspace.id,
        projectId: reviewTask.projectId,
        taskId: reviewTask.id,
        actorId: designer.id,
        type: "TASK_MOVED",
        message: "moved Prisma schema review into review",
        metadata: JSON.stringify({ from: "IN_PROGRESS", to: "REVIEW" })
      },
      {
        workspaceId: workspace.id,
        projectId: reviewTask.projectId,
        taskId: reviewTask.id,
        actorId: strategist.id,
        type: "COMMENT_CREATED",
        message: "left feedback on the database case study",
        metadata: JSON.stringify({ source: "seed" })
      },
      {
        workspaceId: workspace.id,
        actorId: designer.id,
        type: "MEMBER_JOINED",
        message: "joined Northstar Studio workspace",
        metadata: JSON.stringify({ source: "seed" })
      }
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

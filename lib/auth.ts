import { cache } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { getAuthSecret } from "@/lib/auth-secret";
import { hasDatabaseUrl, prisma } from "@/lib/db";

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

const fallbackUser: CurrentUser = {
  id: "demo-user",
  name: "Skaiste",
  email: "skaiste@nova.dev"
};

function canReadServerSession() {
  return Boolean(getAuthSecret());
}

export const getCurrentUser = cache(async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!canReadServerSession()) {
    return null;
  }

  let session;

  try {
    session = await getServerSession(authOptions);
  } catch {
    return null;
  }

  if (!session?.user?.email) {
    return null;
  }

  if (!hasDatabaseUrl()) {
    return {
      id: session.user.id ?? fallbackUser.id,
      name: session.user.name ?? fallbackUser.name,
      email: session.user.email,
      image: session.user.image
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      image: true
    }
  });

  return user;
});

export async function requireCurrentUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return user;
}

export const getCurrentWorkspace = cache(async function getCurrentWorkspace() {
  const user = await getCurrentUser();

  if (!user || !hasDatabaseUrl()) {
    return null;
  }

  let membership = await prisma.workspaceMember.findFirst({
    where: {
      userId: user.id
    },
    include: {
      workspace: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  if (!membership) {
    const workspace = await prisma.workspace.create({
      data: {
        name: `${user.name.split(" ")[0]}'s Workspace`,
        slug: `workspace-${user.id.slice(0, 8)}`,
        ownerId: user.id,
        members: {
          create: {
            userId: user.id,
            role: "OWNER"
          }
        }
      }
    });

    membership = {
      id: "created",
      workspaceId: workspace.id,
      userId: user.id,
      role: "OWNER",
      createdAt: workspace.createdAt,
      updatedAt: workspace.updatedAt,
      workspace
    };
  }

  return membership.workspace;
});

export async function requireWorkspaceAccess(workspaceId: string) {
  const user = await requireCurrentUser();

  if (!hasDatabaseUrl()) {
    return { user, role: "OWNER" as const };
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId: user.id
      }
    },
    select: {
      role: true
    }
  });

  if (!membership) {
    redirect("/dashboard");
  }

  return {
    user,
    role: membership.role
  };
}

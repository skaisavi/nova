"use server";

import bcrypt from "bcryptjs";
import { hasDatabaseUrl, prisma } from "@/lib/db";
import { signUpSchema } from "@/lib/validations/auth";

export type AuthActionResult = {
  ok: boolean;
  message: string;
};

function createWorkspaceSlug(name: string) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${Date.now().toString(36)}`;
}

export async function registerUserAction(input: unknown): Promise<AuthActionResult> {
  const parsed = signUpSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, message: "Check your details and try again." };
  }

  if (!hasDatabaseUrl()) {
    return { ok: false, message: "Sign up needs PostgreSQL. Use demo login for now." };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: parsed.data.email
    },
    select: {
      id: true
    }
  });

  if (existingUser) {
    return { ok: false, message: "An account already exists for this email." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash
      }
    });

    await tx.workspace.create({
      data: {
        name: `${parsed.data.name.split(" ")[0]}'s Workspace`,
        slug: createWorkspaceSlug(parsed.data.name),
        ownerId: user.id,
        members: {
          create: {
            userId: user.id,
            role: "OWNER"
          }
        }
      }
    });
  });

  return { ok: true, message: "Account created. Signing you in..." };
}

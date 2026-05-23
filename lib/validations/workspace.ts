import { z } from "zod";

export const workspaceRoleSchema = z.enum(["OWNER", "ADMIN", "MEMBER", "VIEWER"]);

export const workspaceSchema = z.object({
  name: z.string().min(2, "Workspace name is required").max(80),
  slug: z
    .string()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only.")
});

export const workspaceMemberSchema = z.object({
  workspaceId: z.string().min(1),
  userId: z.string().min(1),
  role: workspaceRoleSchema
});

export type WorkspaceInput = z.infer<typeof workspaceSchema>;
export type WorkspaceMemberInput = z.infer<typeof workspaceMemberSchema>;

import { z } from "zod";
import { prioritySchema, requiredDate } from "@/lib/validations/common";

export const projectStatusSchema = z.enum(["PLANNING", "ACTIVE", "PAUSED", "COMPLETED", "ARCHIVED"]);

export const projectSchema = z.object({
  name: z.string().min(2, "Project name is required").max(80),
  client: z.string().min(2, "Client name is required").max(80),
  description: z.string().min(10).max(500),
  status: projectStatusSchema,
  priority: prioritySchema,
  dueDate: requiredDate
});

export const editProjectSchema = projectSchema.partial().extend({
  id: z.string().min(1)
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectFormInput = z.input<typeof projectSchema>;
export type EditProjectInput = z.infer<typeof editProjectSchema>;

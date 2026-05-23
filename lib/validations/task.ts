import { z } from "zod";
import { optionalDate, prioritySchema } from "@/lib/validations/common";

export const taskStatusSchema = z.enum(["BACKLOG", "TODO", "IN_PROGRESS", "REVIEW", "DONE"]);

export const taskSchema = z.object({
  title: z.string().min(2).max(120),
  projectId: z.string().min(1),
  status: taskStatusSchema,
  priority: prioritySchema,
  assigneeId: z.string().optional(),
  dueDate: optionalDate
});

export const editTaskSchema = taskSchema.partial().extend({
  id: z.string().min(1)
});

export type TaskInput = z.infer<typeof taskSchema>;
export type TaskFormInput = z.input<typeof taskSchema>;
export type EditTaskInput = z.infer<typeof editTaskSchema>;

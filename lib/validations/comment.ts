import { z } from "zod";

export const commentSchema = z
  .object({
    projectId: z.string().min(1).optional(),
    taskId: z.string().min(1).optional(),
    body: z.string().min(1, "Comment cannot be empty").max(1200)
  })
  .superRefine((value, context) => {
    if (!value.projectId && !value.taskId) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Comment must belong to a project or task.",
        path: ["projectId"]
      });
    }
  });

export type CommentInput = z.infer<typeof commentSchema>;

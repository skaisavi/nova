import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email("Use a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters.")
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(2, "Name is required.").max(80)
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;

import * as z from "zod";

/**
 * Base schema (shared fields)
 */
export const credentialsSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/**
 * Login schema
 */
export const loginSchema = credentialsSchema;

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Register schema
 */
export const signUpSchema = credentialsSchema.extend({
  email: z.email("Invalid email"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
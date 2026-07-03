import { z } from "zod";

export const baseSignUpSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(20, "First name must be 20 characters or less"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(20, "Last name must be 20 characters or less"),

  email: z.email("Enter a valid email address").trim(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be 64 characters or less")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const signUpSchema = baseSignUpSchema
  .extend({ verifyPassword: z.string().min(1) })
  .refine((d) => d.password === d.verifyPassword, {
    message: "Passwords do not match",
    path: ["verifyPassword"],
  });

export const signUpServerSchema = baseSignUpSchema;

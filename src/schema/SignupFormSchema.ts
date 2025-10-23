import z from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(128, "Name must be less than 128 chars"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

import { z } from "zod";

const name = (label) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(2, `${label} must be at least 2 characters`)
    .max(50, `${label} must be at most 50 characters`);

const email = z
  .string()
  .trim()
  .toLowerCase()
  .email("Please provide a valid email address");

// bcrypt only uses the first 72 bytes, so we cap the length.
const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be at most 72 characters")
  .regex(/[A-Za-z]/, "Password must contain at least one letter")
  .regex(/\d/, "Password must contain at least one number");

export const registerSchema = z.object({
  firstName: name("First name"),
  lastName: name("Last name"),
  email,
  password,
  // Admin can NEVER be chosen from the client.
  role: z.enum(["candidate", "recruiter"]).default("candidate"),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
});
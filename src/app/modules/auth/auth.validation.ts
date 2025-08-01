/** @format */

// modules/auth/auth.validation.ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["rider", "driver", "admin"]),
});

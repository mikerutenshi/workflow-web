import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().email("Must be a valid e-mail."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

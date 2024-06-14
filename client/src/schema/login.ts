import { z } from "zod";
import { signUpSchema } from "./sign-up";

export const loginSchema = signUpSchema.omit({
  firstName: true,
  lastName: true,
});

export type LoginType = z.infer<typeof loginSchema>;

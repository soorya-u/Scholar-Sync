import { z } from "zod";

export const nexusSchema = z.object({
  name: z.string().min(1, "This field is Required"),
  category: z.string().min(1, "This field is Required"),
});

export type NexusType = z.infer<typeof nexusSchema>;

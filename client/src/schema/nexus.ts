import { z } from "zod";

export const nexusSchema = z.object({
  name: z.string().min(1, "This field is Required"),
  category: z.enum([
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
  ]),
});

export type NexusType = z.infer<typeof nexusSchema>;

import { z } from "zod";

export const coreSchema = z.object({
  name: z.string().min(1, "This field is Required"),
  imageUrl: z.string().url().optional(),
});

export type CoreType = z.infer<typeof coreSchema>;

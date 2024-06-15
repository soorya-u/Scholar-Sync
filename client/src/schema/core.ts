import { z } from "zod";

export const coreSchema = z.object({
  name: z.string().min(1, "This field is Required"),
});

export type CoreType = z.infer<typeof coreSchema>;

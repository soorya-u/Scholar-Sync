import { z } from "zod";

export const fileSchema = z.object({
  title: z.string().min(1, "This field is required"),
  description: z.string().min(1, "This field is required"),
  file: z
    .any()
    .refine((f) => f.length > 0, { message: "File should be Uploaded" }),
});

export type FileType = z.infer<typeof fileSchema>;

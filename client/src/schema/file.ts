import { z } from "zod";

export const fileSchema = z.object({
  title: z.string().min(1, "Title field is required"),
  description: z.string().min(1, "Description field is required"),
  upload: z
    .any()
    .refine((f) => f.length > 0, { message: "File should be Uploaded" }),
});

export type FileType = z.infer<typeof fileSchema>;

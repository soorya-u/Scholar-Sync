import { z } from "zod";

export const fileSchema = z.object({
  title: z.string().min(1, "Title field is required"),
  description: z.string().min(1, "Description field is required"),
  upload: z
    .unknown()
    .transform((value) => {
      return value as FileList;
    })
    .refine((arg) => arg.length == 1, "File is required"),
});

export type FileType = z.infer<typeof fileSchema>;

import { z } from "zod";

export const announcementSchema = z.object({
  title: z.string().min(1, "This field is required"),
  description: z.string().min(1, "This field is required"),
});

export type AnnouncementType = z.infer<typeof announcementSchema>;

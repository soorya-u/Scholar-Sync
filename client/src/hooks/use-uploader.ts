import { useForm } from "react-hook-form";
import { AnnouncementType, announcementSchema } from "@/schema/announcement";
import { FileType, fileSchema } from "@/schema/file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/primitives/use-toast";

export const useUploader = (uploader: "Announcement" | "File") => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { isSubmitting, errors },
  } = useForm<AnnouncementType | FileType>({
    resolver: zodResolver(
      uploader === "File" ? fileSchema : announcementSchema
    ),
  });

  const onSubmitFn = (val: FileType | AnnouncementType) => {
    console.log(val);
  };
  const handleSubmit = handleFormSubmit(onSubmitFn, (e) => {
    if (e.title)
      toast({
        title: "Upload Error",
        description: e.title.message,
      });
    if (e.description)
      toast({
        title: "Upload Error",
        description: e.description.message,
      });
  });

  return {
    register,
    handleSubmit,
    isSubmitting,
    errors,
  };
};

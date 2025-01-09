import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { AnnouncementType, announcementSchema } from "@/schema/announcement";
import { FileType, fileSchema } from "@/schema/file";

import { useToast } from "@/hooks/use-toast";
import { useNexus } from "./use-nexus";
import {
  useCreateAnnouncementMutation,
  useCreateFileMutation,
} from "@/generated/graphql";
import { errorToast } from "@/utils/error-toast";

export const useUploader = (
  uploader: "Announcement" | "File",
  showToast: boolean = true,
) => {
  const { toast } = useToast();
  const {
    nexus: { id: nexusId },
  } = useNexus();

  const [fileMutate] = useCreateFileMutation({
    onError: (e) => errorToast(e, "File Upload"),
  });

  const [announcementMutate] = useCreateAnnouncementMutation({
    onError: (e) => errorToast(e, "Create Announcement"),
  });

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setValue,
  } = useForm<AnnouncementType | FileType>({
    resolver: zodResolver(
      uploader === "File" ? fileSchema : announcementSchema,
    ),
    defaultValues: {
      description: "",
      title: "",
    },
    reValidateMode: "onChange",
  });

  const onSubmitFn = async (val: FileType | AnnouncementType) => {
    const mutate =
      uploader === "File"
        ? announcementMutate({
            variables: {
              nexusId,
              ...(val as AnnouncementType),
            },
          })
        : fileMutate({
            variables: {
              nexusId,
              ...(val as FileType),
            },
          });

    await mutate.then(() =>
      toast({
        title: `${uploader} Creation Successfull!`,
        variant: "default",
        description: `${uploader} has been Successfully Created.`,
      }),
    );
  };

  const handleSubmit = handleFormSubmit(onSubmitFn, (e) => {
    // @ts-ignore
    const err = e.title ?? e.description ?? e.upload;
    if (err && showToast)
      toast({
        title: "Upload Error",
        description: err.message,
        variant: "destructive",
      });
  });

  return {
    register,
    handleSubmit,
    isSubmitting,
    getValues,
    setValue,
    errors,
  };
};

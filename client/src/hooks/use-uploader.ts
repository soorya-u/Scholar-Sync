import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createAnnouncementMutation,
  createFileMutation,
} from "@/graphql/mutations";

import { AnnouncementType, announcementSchema } from "@/schema/announcement";
import { FileType, fileSchema } from "@/schema/file";

import { useInitData } from "./use-init";
import { useToast } from "@/components/primitives/use-toast";
import { useNexus } from "./use-nexus";

export const useUploader = (
  uploader: "Announcement" | "File",
  showToast: boolean = true
) => {
  const { toast } = useToast();
  const {
    nexus: { id: nexus },
  } = useNexus();
  const { refetch } = useInitData();

  const [mutate, { data, error }] = useMutation(
    uploader === "File" ? createFileMutation : createAnnouncementMutation,
    {
      onError: (e) => console.log(e.message),
    }
  );

  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setValue,
  } = useForm<AnnouncementType | FileType>({
    resolver: zodResolver(
      uploader === "File" ? fileSchema : announcementSchema
    ),
    defaultValues: {
      description: "",
      title: "",
      upload: [],
    },
    reValidateMode: "onChange",
  });

  const onSubmitFn = async (val: FileType | AnnouncementType) => {
    // @ts-ignore
    if (val.upload) val.upload = val.upload[0];
    await mutate({
      variables: {
        ...val,
        nexus,
      },
    });
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

  useEffect(() => {
    if (error) {
      toast({
        title: `${uploader} Creation Unsuccessfull!`,
        variant: "destructive",
        description: error.message.replace(
          error.message[0],
          error.message[0].toUpperCase()
        ),
      });
      return;
    }

    if (data) {
      toast({
        title: `${uploader} Creation Successfull!`,
        variant: "default",
        description: "Nexus has been Successfully Created.",
      });

      refetch();
    }
  }, [data, error]);

  return {
    register,
    handleSubmit,
    isSubmitting,
    getValues,
    setValue,
    errors,
  };
};

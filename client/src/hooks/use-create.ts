import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CoreType, coreSchema } from "@/schema/core";
import { NexusType, nexusSchema } from "@/schema/nexus";

import { useToast } from "./use-toast";
import { useCore } from "./use-core";
import { useInitData } from "./use-init";

import { errorToast } from "@/utils/error-toast";

import {
  useCreateCoreMutation,
  useCreateNexusMutation,
} from "@/generated/graphql";

export const useCoreCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CoreType>({
    resolver: zodResolver(coreSchema),
    defaultValues: { name: "", imageUrl: "" },
  });
  const { toast } = useToast();
  const [mutate, { data, error }] = useCreateCoreMutation({
    onError: (e) => errorToast(e, "Core Creation"),
  });
  const { refetch } = useInitData();

  const onSubmitFunc = async (val: CoreType) => {
    // TODO: Add Core Image String
    await mutate({
      variables: {
        name: val.name,
        imageUrl:
          val.imageUrl ??
          "https://images-platform.99static.com//rGjWkopiOtbUmFlLOkjiFkHg4fU=/0x0:2000x2000/fit-in/590x590/projects-files/47/4779/477929/8a96c2c4-aa4f-48ce-b637-11cdcffc58f0.png",
      },
    }).then(async () => {
      toast({
        title: "Core Creation Successfull!",
        variant: "default",
        description: "Core has been Successfully Created.",
      });
      await refetch();
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmitFunc),
    isSubmitting,
    errors,
  };
};

export const useNexusCreate = () => {
  const { refetch } = useInitData();
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<NexusType>({
    resolver: zodResolver(nexusSchema),
    defaultValues: { name: "", category: "First" },
  });

  const { field } = useController<NexusType>({
    control,
    name: "category",
  });

  const { toast } = useToast();
  const { core } = useCore();
  const [mutate] = useCreateNexusMutation({
    onError: (e) => errorToast(e, "Nexus Creation"),
  });

  const onSubmitFunc = async (val: NexusType) => {
    await mutate({
      variables: {
        ...val,
        coreId: core.id,
      },
    }).then(async () => {
      toast({
        title: "Nexus Creation Successfull!",
        variant: "default",
        description: "Nexus has been Successfully Created.",
      });
      await refetch();
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmitFunc),
    isSubmitting,
    errors,
    category: {
      value: field.value,
      onChange: field.onChange,
      onBlur: field.onBlur,
    },
  };
};

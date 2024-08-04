import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";

import { createCoreMutation, createNexusMutation } from "@/graphql/mutations";
import { useToast } from "@/components/primitives/use-toast";
import { CoreType, coreSchema } from "@/schema/core";
import { NexusType, nexusSchema } from "@/schema/nexus";
import { useCore } from "./use-core";
import { useInitData } from "./use-init";

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
  const [mutate, { data, error }] = useMutation(createCoreMutation);
  const { refetch } = useInitData();

  const onSubmitFunc = async (val: CoreType) => {
    // TODO: Add Core Image String
    if (!val.imageUrl)
      val.imageUrl =
        "https://images-platform.99static.com//rGjWkopiOtbUmFlLOkjiFkHg4fU=/0x0:2000x2000/fit-in/590x590/projects-files/47/4779/477929/8a96c2c4-aa4f-48ce-b637-11cdcffc58f0.png";
    await mutate({
      variables: {
        ...val,
      },
    }).then(async () => await refetch());
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Core Creation Unsuccessfull!",
        variant: "destructive",
        description: error.message.replace(
          error.message[0],
          error.message[0].toUpperCase(),
        ),
      });
      return;
    }

    if (data) {
      toast({
        title: "Core Creation Successfull!",
        variant: "default",
        description: "Core has been Successfully Created.",
      });
    }
  }, [data, error]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmitFunc),
    isSubmitting,
    errors,
  };
};

export const useNexusCreate = () => {
  const { refetch } = useInitData();
  const router = useRouter();
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
  const [mutate, { data, error }] = useMutation(createNexusMutation);

  const onSubmitFunc = async (val: NexusType) => {
    await mutate({
      variables: {
        ...val,
        core: core.id,
      },
    }).then(async () => await refetch());
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Nexus Creation Unsuccessfull!",
        variant: "destructive",
        description: error.message.replace(
          error.message[0],
          error.message[0].toUpperCase(),
        ),
      });
      return;
    }

    if (data) {
      toast({
        title: "Nexus Creation Successfull!",
        variant: "default",
        description: "Nexus has been Successfully Created.",
      });
    }
  }, [data, error]);

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

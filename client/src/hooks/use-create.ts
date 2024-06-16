import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";

import { createCoreMutation, createNexusMutation } from "@/graphql/mutations";
import { useToast } from "@/components/primitives/use-toast";
import { CoreType, coreSchema } from "@/schema/core";
import { NexusType, nexusSchema } from "@/schema/nexus";

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

  const onSubmitFunc = async (val: CoreType) => {
    // TODO: Add Core Image String
    if (!val.imageUrl)
      val.imageUrl =
        "https://images-platform.99static.com//rGjWkopiOtbUmFlLOkjiFkHg4fU=/0x0:2000x2000/fit-in/590x590/projects-files/47/4779/477929/8a96c2c4-aa4f-48ce-b637-11cdcffc58f0.png";
    await mutate({
      variables: {
        ...val,
      },
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Core Creation Unsuccessfull!",
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
        title: "Core Creation Successfull!",
        variant: "default",
        description: "Core has been Successfully Created.",
      });

      // Add to redux
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
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NexusType>({
    resolver: zodResolver(nexusSchema),
    defaultValues: { name: "", category: "" },
  });
  const { toast } = useToast();
  const [mutate, { data, error }] = useMutation(createNexusMutation);

  const onSubmitFunc = async (val: NexusType) => {
    await mutate({
      variables: {
        ...val,
      },
    });
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Nexus Creation Unsuccessfull!",
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
        title: "Nexus Creation Successfull!",
        variant: "default",
        description: "Nexus has been Successfully Created.",
      });

      // Add to redux
    }
  }, [data, error]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmitFunc),
    isSubmitting,
    errors,
  };
};

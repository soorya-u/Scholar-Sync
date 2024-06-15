import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";

import { createCoreMutatuion } from "@/graphql/mutations";
import { useToast } from "@/components/primitives/use-toast";
import { CoreType, coreSchema } from "@/schema/core";

export const useCoreCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CoreType>({
    resolver: zodResolver(coreSchema),
    defaultValues: { name: "" },
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mutate, { data, error }] = useMutation(createCoreMutatuion);

  const onSubmitFunc = async (val: CoreType) => {
    await mutate({
      variables: {
        name: val.name,
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
      const t = toast({
        title: "Core Creation Successfull!",
        variant: "default",
        description: "You have been Successfully Logged In.",
      });

      setTimeout(() => {
        t.dismiss();
        navigate({ to: "/", viewTransition: true, replace: true });
      }, 3000);
    }
  }, [data, error]);

  return {
    register,
    handleSubmit: handleSubmit(onSubmitFunc),
    isSubmitting,
    errors,
  };
};

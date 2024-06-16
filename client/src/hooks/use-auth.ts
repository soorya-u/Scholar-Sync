import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyQuery, useMutation } from "@apollo/client";

import { LoginType, loginSchema } from "@/schema/login";
import { SignUpType, signUpSchema } from "@/schema/sign-up";
import { signUpMutation } from "@/graphql/mutations";
import { loginQuery } from "@/graphql/queries";
import { useToast } from "@/components/primitives/use-toast";

export const useSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", firstName: "", lastName: "", password: "" },
  });

  const [mutate, { data, error }] = useMutation(signUpMutation);

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast({
        title: "Registration Unsuccessfull!",
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
        title: "Registration Successfull!",
        variant: "default",
        description: "You have been Successfully Registered.",
      });

      setTimeout(() => {
        t.dismiss();
        navigate({ to: "/", viewTransition: true, replace: true });
      }, 3000);
    }
  }, [data, error]);

  const onSubmitFunc = async (val: SignUpType) => {
    await mutate({
      variables: {
        fullName: `${val.firstName} ${val.lastName}`,
        email: val.email,
        password: val.password,
      },
    });
  };

  return {
    handleSubmit: handleSubmit(onSubmitFunc),
    register,
    isSubmitting,
    errors,
  };
};

export const useLogin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const [query, { data, error }] = useLazyQuery(loginQuery);

  useEffect(() => {
    if (error) {
      toast({
        title: "Login Unsuccessfull!",
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
        title: "Login Successfull!",
        variant: "default",
        description: "You have been Successfully Logged In.",
      });

      setTimeout(() => {
        t.dismiss();
        navigate({ to: "/", viewTransition: true, replace: true });
      }, 3000);
    }
  }, [data, error]);

  const onSubmitFunc = async (val: LoginType) => {
    await query({
      variables: {
        email: val.email,
        password: val.password,
      },
    });
  };

  return {
    handleSubmit: handleSubmit(onSubmitFunc),
    register,
    isSubmitting,
    errors,
  };
};

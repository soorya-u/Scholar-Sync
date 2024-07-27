import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

import { LoginType, loginSchema } from "@/schema/login";
import { SignUpType, signUpSchema } from "@/schema/sign-up";
import { signUpMutation } from "@/graphql/mutations";
import {
  loginQuery,
  logOutQuery,
  isUserLoggedInQuery,
} from "@/graphql/queries";
import { useToast } from "@/components/primitives/use-toast";
import { useApiData } from "./use-api-data";
import { useUser } from "./use-user";
import useColor from "./use-color";
import { useNexus } from "./use-nexus";
import { useCore } from "./use-core";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const adder = searchParams.get("a");
  const joinId = searchParams.get("j");

  useEffect(() => {
    if (error) {
      toast({
        title: "Registration Unsuccessfull!",
        variant: "destructive",
        description: error.message.replace(
          error.message[0],
          error.message[0].toUpperCase(),
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
        if (adder && joinId)
          return router.replace(`/link?a=${adder}&j=${joinId}`);

        router.replace("/");
      }, 500);
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const adder = searchParams.get("a");
  const joinId = searchParams.get("j");

  const [query, { data, error }] = useLazyQuery(loginQuery);

  useEffect(() => {
    if (error) {
      toast({
        title: "Login Unsuccessfull!",
        variant: "destructive",
        description: error.message.replace(
          error.message[0],
          error.message[0].toUpperCase(),
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
        if (adder && joinId)
          return router.replace(`/link?a=${adder}&j=${joinId}`);

        router.replace("/");
      }, 500);
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

export const useLogOut = () => {
  const [query, { data, error }] = useLazyQuery(logOutQuery);
  const { toast } = useToast();
  const router = useRouter();
  const { resetApiData } = useApiData();
  const { resetUser } = useUser();
  const { resetCore } = useCore();
  const { resetNexus } = useNexus();

  const resetAll = () => {
    resetApiData();
    resetUser();
    resetCore();
    resetNexus();
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Logout Unsuccessfull!",
        variant: "destructive",
        description: error.message.replace(
          error.message[0],
          error.message[0].toUpperCase(),
        ),
      });
      return;
    }

    if (data) {
      const t = toast({
        title: "Logout Successfull!",
        variant: "default",
        description: "You have been Successfully Logged Out.",
      });

      setTimeout(() => {
        t.dismiss();
        resetAll();
        router.replace("/auth/login");
      }, 500);
    }
  }, [data, error]);

  return {
    handleClick: async () => await query(),
  };
};
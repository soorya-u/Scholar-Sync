import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginType, loginSchema } from "@/schema/login";
import { SignUpType, signUpSchema } from "@/schema/sign-up";

import { useToast } from "@/hooks/use-toast";

import { errorToast } from "@/utils/error-toast";

import {
  useLoginLazyQuery,
  useLogoutLazyQuery,
  useSignUpMutation,
} from "@/generated/graphql";

export const useSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", firstName: "", lastName: "", password: "" },
  });

  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const location = searchParams.get("l");
  const joinId = searchParams.get("j");
  const userId = searchParams.get("u");

  const [mutate] = useSignUpMutation({
    onError: (e) => errorToast(e, "Registration"),
  });

  const onSubmitFunc = async (val: SignUpType) => {
    await mutate({
      variables: {
        fullName: `${val.firstName} ${val.lastName}`,
        email: val.email,
        password: val.password,
      },
    }).then(() => {
      toast({
        title: "Registration Successfull!",
        variant: "default",
        description: "You have been Successfully Registered.",
      });
      return router.replace(
        location && joinId && userId
          ? `/link/${location}/${joinId}/${userId}`
          : "/dashboard",
      );
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

  const location = searchParams.get("l");
  const joinId = searchParams.get("j");
  const userId = searchParams.get("u");

  const [query] = useLoginLazyQuery({
    onError: (e) => errorToast(e, "Login"),
  });

  const onSubmitFunc = async (val: LoginType) => {
    await query({
      variables: {
        email: val.email,
        password: val.password,
      },
    }).then(() => {
      toast({
        title: "Login Successfull!",
        variant: "default",
        description: "You have been Successfully Logged In.",
      });
      router.replace(
        location && joinId && userId
          ? `/link/${location}/${joinId}/${userId}`
          : "dashboard",
      );
    });
  };

  return {
    handleSubmit: handleSubmit(onSubmitFunc),
    register,
    isSubmitting,
    errors,
  };
};

export const useLogout = () => {
  const [query] = useLogoutLazyQuery({
    onError: (e) => errorToast(e, "Logout"),
  });
  const { toast } = useToast();
  const router = useRouter();

  const logout = async () => {
    await query().then(() => {
      toast({
        title: "Logout Successfull!",
        variant: "default",
        description: "You have been Successfully Logged Out.",
      });
      router.replace("/");
    });
  };

  return {
    handleClick: logout,
  };
};

import { useLayoutEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@apollo/client";

import { getUserQuery } from "@/graphql/queries";
import { useToast } from "@/components/primitives/use-toast";
import { useUser } from "./use-user";
import { UserType } from "@/types/redux";

export const useInit = () => {
  const { data, error } = useQuery(getUserQuery);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useUser();
  useLayoutEffect(() => {
    if (error) {
      console.log(error.message);
      navigate({ to: "/auth/sign-up" });
      toast({
        title: "Authentication Required",
        variant: "default",
        description: "Please Login or Sign Up to Proceed",
      });
    }

    if (data && data.getUser) {
      setUser(data.getUser as UserType);
    }
  }, [data, error]);
};

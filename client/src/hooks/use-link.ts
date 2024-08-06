import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";

import { isUserLoggedInQuery } from "@/graphql/queries";
import {
  addPseudoUserToCoreMutation,
  addUserToNexusMutation,
  buildDemoEnvMutation,
} from "@/graphql/mutations";
import { useToast } from "@/components/primitives/use-toast";
import { useUser } from "./use-user";

export const useLink = (location: string, joinerId: string, userId: string) => {
  const { data, loading } = useQuery(isUserLoggedInQuery);
  const [pseudoUserMutate, { data: pseudoUserData }] = useMutation(
    addPseudoUserToCoreMutation,
  );
  const [userMutate, { data: userData }] = useMutation(addUserToNexusMutation);
  const router = useRouter();
  const { toast } = useToast();

  const performMutation = async () => {
    if (location === "c")
      await pseudoUserMutate({ variables: { coreId: joinerId } });
    else if (location === "n")
      await userMutate({ variables: { nexusId: joinerId } });
  };

  useEffect(() => {
    if (!location || !joinerId || !userId) {
      toast({
        title: "Invalid URL",
        description:
          "The URL used is Invalid. Please try again or ask the Admin to generate new URL",
        variant: "destructive",
      });
      return router.replace("/");
    }

    if (!loading && data) {
      if (!data.isUserLoggedIn) {
        router.replace(
          `/auth/login?${new URLSearchParams({ l: location, j: joinerId, u: userId }).toString()}`,
        );
        toast({
          title: "Authentication Required",
          variant: "destructive",
          description: "Please Login or Sign Up to Proceed",
        });
      } else performMutation();
    }
  }, [data, loading, location, joinerId, toast, router]);

  useEffect(() => {
    if (!pseudoUserData && !userData) return;
    if (pseudoUserData) {
      toast({
        title: "Join Sucessfull",
        description: "Successfully joined as a PseudoAdmin",
      });
      return router.replace("/dashboard");
    }
    if (userData) {
      toast({
        title: "Join Sucessfull",
        description: "Successfully joined as a User",
      });
      return router.replace("/dashboard");
    }
  }, [pseudoUserData, userData]);
};

type ILocation = "Nexus" | "Core";

export const useLinkGenerate = () => {
  const { toast } = useToast();
  const { user } = useUser();

  const handleClick = async (place: ILocation, id: string) => {
    const userId = user.id.split(":")[1];
    const joinId = id.split(":")[1];
    const location = place === "Nexus" ? "n" : "c";
    await navigator.clipboard
      .writeText(
        `${process.env.NEXT_PUBLIC_URL}/link/${location}/${joinId}/${userId}`,
      )
      .then(() =>
        toast({
          title: "Copy Successfull",
          description: "Link has been sucessfully Copied.",
        }),
      );
  };

  return {
    handleClick,
  };
};

export const useDemoLink = async () => {
  const { data, loading } = useQuery(isUserLoggedInQuery);
  const { toast } = useToast();
  const [mutate, { data: mutateData }] = useMutation(buildDemoEnvMutation);
  const router = useRouter();

  const performMutation = async () => await mutate();

  useEffect(() => {
    if (!loading && data) {
      if (!data.isUserLoggedIn) {
        router.replace(
          `/auth/login?${new URLSearchParams({ demo: "true" }).toString()}`,
        );
        toast({
          title: "Authentication Required",
          variant: "destructive",
          description: "Please Login or Sign Up to Proceed",
        });
      } else performMutation();
    }
  }, [data, loading, router]);

  useEffect(() => {
    if (!mutateData) return;
    toast({
      title: "Join Sucessfull",
      description: "Successfully joined to the Demo Core",
    });

    return router.replace("/dashboard");
  }, [mutateData]);
};

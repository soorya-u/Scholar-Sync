import { useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";

import { isUserLoggedInQuery } from "@/graphql/queries";
import {
  addPseudoUserToCoreMutation,
  addUserToNexusMutation,
} from "@/graphql/mutations";
import { useToast } from "@/components/primitives/use-toast";
import { useUser } from "./use-user";

export const useLink = () => {
  const { data, loading } = useQuery(isUserLoggedInQuery);
  const [pseudoUserMutate, { data: pseudoUserData }] = useMutation(
    addPseudoUserToCoreMutation,
  );
  const [userMutate, { data: userData }] = useMutation(addUserToNexusMutation);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const location = params.location as string;
  const joinerId = params.id as string;
  const userId = searchParams.get("u") as string;

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
      return router.push("/");
    }

    if (!loading && data) {
      if (!data.isUserLoggedIn) {
        router.push(
          `/auth/login?${new URLSearchParams({ l: location, j: joinerId, u: userId }).toString()}`,
        );
      } else {
        performMutation();
      }
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
        `${process.env.NEXT_PUBLIC_URL}/link/${location}/${joinId}?u=${userId}`,
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

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";

import { isUserLoggedInQuery } from "@/graphql/queries";
import {
  addPseudoUserToCoreMutation,
  addUserToNexusMutation,
} from "@/graphql/mutations";
import { useToast } from "@/components/primitives/use-toast";

export const useLink = () => {
  const { data, loading } = useQuery(isUserLoggedInQuery);
  const [pseudoUserMutate, { data: pseudoUserData }] = useMutation(
    addPseudoUserToCoreMutation,
  );
  const [userMutate, { data: userData }] = useMutation(addUserToNexusMutation);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const add = searchParams.get("a");
  const joinerId = searchParams.get("j");

  const performMutation = async () => {
    if (add === "c")
      await pseudoUserMutate({ variables: { coreId: joinerId } });
    else if (add === "n")
      await userMutate({ variables: { nexusId: joinerId } });
  };

  useEffect(() => {
    if (!add || !joinerId) {
      toast({
        title: "Invalid URL",
        description:
          "The URL used is Invalid. Please try again or ask the Admin to generate new URL",
        variant: "destructive",
      });
      return router.push("/auth/login");
    }

    if (!loading && data) {
      if (!data.isUserLoggedIn) {
        router.push(
          `/auth/login?${new URLSearchParams({ a: add, j: joinerId }).toString()}`,
        );
      } else {
        performMutation();
      }
    }
  }, [data, loading, add, joinerId, toast, router]);

  useEffect(() => {
    if (!pseudoUserData && !userData) return;
    if (pseudoUserData) {
      toast({
        title: "Join Sucessfull",
        description: "Successfully joined as a PseudoAdmin",
      });
      return router.replace("/");
    }
    if (userData) {
      toast({
        title: "Join Sucessfull",
        description: "Successfully joined as a User",
      });
      return router.replace("/");
    }
  }, [pseudoUserData, userData]);
};

type IPlace = "Nexus" | "Core";

export const useLinkGenerate = () => {
  const { toast } = useToast();

  const handleClick = async (place: IPlace, id: string) => {
    const joinId = id.split(":")[1];
    const adder = place === "Nexus" ? "n" : "c";
    await navigator.clipboard
      .writeText(
        `${process.env.NEXT_PUBLIC_URL}/link?a=${adder}&j=${joinId}`,
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

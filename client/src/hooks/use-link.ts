import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";

import { isUserLoggedInQuery } from "@/graphql/queries";
import { useToast } from "@/components/primitives/use-toast";
import { sendJoinRequest } from "@/lib/axios";

export const useLink = () => {
  const { data, loading } = useQuery(isUserLoggedInQuery);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const add = searchParams.get("a");
  const joinerId = searchParams.get("j");

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
        sendJoinRequest(add, joinerId)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
    }
  }, [data, loading, add, joinerId, toast, router]);
};

type IPlace = "Nexus" | "Core";

export const useLinkGenerate = () => {
  const { toast } = useToast();

  const handleClick = async (place: IPlace, id: string) => {
    const joinId = id.split(":")[1];
    const adder = place === "Nexus" ? "n" : "c";
    await navigator.clipboard
      .writeText(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/link?a=${adder}&j=${joinId}`,
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

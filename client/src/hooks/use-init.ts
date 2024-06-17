import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@apollo/client";

import { getInitDataQuery } from "@/graphql/queries";
import { useToast } from "@/components/primitives/use-toast";
import { useUser } from "./use-user";
import { ApiDataType, UserType } from "@/types/redux";
import { useApiData } from "./use-api-data";
import { useCore } from "./use-core";
import { useNexus } from "./use-nexus";

export const useInitData = () => {
  const { data, error, refetch, loading } = useQuery(getInitDataQuery);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { setUser } = useUser();
  const { apiData, setApiData } = useApiData();
  const { core, setCore } = useCore();
  const { nexus, setNexus } = useNexus();
  console.log(data);
  console.log(error?.message);

  useEffect(() => {
    if (loading) return;
    if (error || !data || !data.getUser || !data.getCores) {
      navigate({ to: "/auth/sign-up" });
      toast({
        title: "Authentication Required",
        variant: "default",
        description: "Please Login or Sign Up to Proceed",
      });
    }

    setUser(data.getUser as UserType);
    setApiData(data.getCores as ApiDataType[]);

    if (apiData.length === 0) return;
    const { nexus: n, ...rest } = apiData[0];
    if (core.id === "") setCore(rest);

    if (n.length === 0) return;
    if (nexus.id === "") setNexus(n[0]);
  }, [data, error, loading]);

  return {
    refetch,
  };
};

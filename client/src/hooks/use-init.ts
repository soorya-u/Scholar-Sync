import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@apollo/client";

import { getInitDataQuery } from "@/graphql/queries";
import { useToast } from "@/components/primitives/use-toast";
import { useUser } from "./use-user";
import { CoreType, UserType } from "@/types/api";
import { useApiData } from "./use-api-data";
import { useCore } from "./use-core";
import { useNexus } from "./use-nexus";

export const useInitData = () => {
  const { data, error, refetch, loading } = useQuery(getInitDataQuery);
  const navigate = useNavigate();
  const { toast } = useToast();

  const { setUser } = useUser();
  const { apiData, setApiData } = useApiData();
  const { setCore } = useCore();
  const { setNexus } = useNexus();

  console.log(error?.message);
  useEffect(() => {
    if (loading) return;
    if (error || !data || !data.getUser || !data.getUserData) {
      navigate({ to: "/auth/sign-up" });
      toast({
        title: "Authentication Required",
        variant: "default",
        description: "Please Login or Sign Up to Proceed",
      });
    }

    setUser(data.getUser as UserType);
    setApiData(data.getUserData as CoreType[]);

    if (apiData.length === 0) return;
    const selectedCores = apiData.filter((c) => c.nexus && c.nexus?.length > 0);
    const { id, imageUrl, name, nexus } =
      selectedCores.length > 0 ? selectedCores[0] : apiData[0];
    setCore({ id, imageUrl, name, nexus });
    nexus.length > 0 &&
      setNexus({
        category: nexus[0].category,
        id: nexus[0].id,
        name: nexus[0].name,
      });
  }, [data, error, loading]);

  return {
    refetch,
  };
};

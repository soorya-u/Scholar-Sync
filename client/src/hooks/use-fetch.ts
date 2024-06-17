import { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { getCoresQuery } from "@/graphql/queries";
import { useCore } from "./use-core";

export const useFetchCores = () => {
  const { data, error, refetch } = useQuery(getCoresQuery);
  const { core, setAllCores } = useCore();
  useEffect(() => {
    if (error) console.log(error.message);
    if (data && data.getCores) {
      setAllCores(data.getCores);
    }
  }, [data, error]);

  return {
    core,
    refetch,
  };
};

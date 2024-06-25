import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import { setCore as setCoreFn } from "@/redux/slices/core";
import { CoreReduxType } from "@/types/redux";
import { useNexus } from "./use-nexus";
import { useApiData } from "./use-api-data";

export const useCore = () => {
  const { setNexus } = useNexus();
  const { apiData } = useApiData();
  const core = useSelector((state: RootState) => state.core);
  const dispatch = useDispatch();

  const setCore = (core: CoreReduxType) => {
    dispatch(setCoreFn(core));
    const nexus = apiData.find((c) => c.id === core.id)!.nexus;
    setNexus(nexus[0]);
  };

  return {
    core,
    setCore,
  };
};

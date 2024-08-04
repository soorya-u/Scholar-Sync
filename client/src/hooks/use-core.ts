import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import { setCore as setCoreFn, resetCore } from "@/redux/slices/core";
import { CoreReduxType } from "@/types/redux";
import { useNexus } from "./use-nexus";
import { useApiData } from "./use-api-data";

export const useCore = () => {
  const { nexus: currentNexus, setNexus } = useNexus();
  const { apiData } = useApiData();
  const core = useSelector((state: RootState) => state.core);
  const dispatch = useDispatch();

  const setCore = (core: CoreReduxType) => {
    dispatch(setCoreFn(core));
    const allNexus = apiData.find((c) => c.id === core.id)!.nexus;
    const chosenNexus = allNexus.find((n) => n.id === currentNexus.id);
    if (currentNexus.id === "" || !chosenNexus) {
      if (allNexus && allNexus[0]) setNexus(allNexus[0]);
    } else {
      if (chosenNexus) return setNexus(chosenNexus);
    }
  };

  return {
    core,
    setCore,
    resetCore: () => dispatch(resetCore()),
  };
};

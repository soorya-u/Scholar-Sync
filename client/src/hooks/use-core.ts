import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import {
  setActiveCore as setActiveCoreFn,
  setAllCores as setAllCoresFn,
} from "@/redux/slices/core";
import { CoreType } from "@/types/redux";

export const useCore = () => {
  const core = useSelector((state: RootState) => state.core);
  const dispatch = useDispatch();
  return {
    core,
    setActiveCore: (core: CoreType) => dispatch(setActiveCoreFn(core)),
    setAllCores: (cores: CoreType[]) => dispatch(setAllCoresFn(cores)),
  };
};

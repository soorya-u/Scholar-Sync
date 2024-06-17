import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import { setCore as setCoreFn } from "@/redux/slices/core";
import { CoreType } from "@/types/redux";

export const useCore = () => {
  const core = useSelector((state: RootState) => state.core);
  const dispatch = useDispatch();
  return {
    core,
    setCore: (core: CoreType) => dispatch(setCoreFn(core)),
  };
};

import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import { setCore as setCoreFn, resetCore } from "@/redux/slices/core";
import { TCore } from "@/types/api";

export const useCore = () => {
  const core = useSelector((state: RootState) => state.core);
  const dispatch = useDispatch();

  const setCore = (core: TCore) => {};

  return {
    core,
    setCore,
    resetCore: () => dispatch(resetCore()),
  };
};

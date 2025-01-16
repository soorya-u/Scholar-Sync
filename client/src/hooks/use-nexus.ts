import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import { setNexus as setNexusFn, resetNexus } from "@/redux/slices/nexus";
import { TNexus } from "@/types/api";

export const useNexus = () => {
  const nexus = useSelector((state: RootState) => state.nexus);
  const dispatch = useDispatch();
  const setNexus = (nexus: TNexus) => {
    dispatch(setNexusFn(nexus));
  };
  return {
    nexus,
    setNexus,
    resetNexus: () => dispatch(resetNexus()),
  };
};

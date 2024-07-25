import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import { setNexus as setNexusFn, resetNexus } from "@/redux/slices/nexus";
import { NexusType } from "@/types/api";

export const useNexus = () => {
  const nexus = useSelector((state: RootState) => state.nexus);
  const dispatch = useDispatch();
  const setNexus = (nexus: NexusType) => {
    dispatch(setNexusFn(nexus));
  };
  return {
    nexus,
    setNexus,
    resetNexus: () => dispatch(resetNexus()),
  };
};

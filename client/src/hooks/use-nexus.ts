import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";
import { setNexus as setNexusFn } from "@/redux/slices/nexus";
import { NexusType } from "@/types/redux";

export const useNexus = () => {
  const nexus = useSelector((state: RootState) => state.nexus);
  const dispatch = useDispatch();
  return {
    nexus,
    setNexus: (nexus: NexusType) => dispatch(setNexusFn(nexus)),
  };
};

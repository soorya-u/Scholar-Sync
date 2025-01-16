import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";

import {
  setGroups as setGroupsFn,
  resetGroups as resetGroupsFn,
} from "@/redux/slices/group";

import { TGroups } from "@/types/api";

export const useGroups = () => {
  const dispatch = useDispatch();

  const groups = useSelector((state: RootState) => state.groups);
  const setGroups = (data: TGroups[]) => dispatch(setGroupsFn(data));
  const resetGroups = () => dispatch(resetGroupsFn());

  return { groups, setGroups, resetGroups };
};

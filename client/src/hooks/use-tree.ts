import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/redux/store";

import {
  setTree as setTreeFn,
  resetTree as resetTreeFn,
} from "@/redux/slices/tree";

import { TUserTree } from "@/types/api";

export const useTree = () => {
  const dispatch = useDispatch();

  const tree = useSelector((state: RootState) => state.trees);
  const setTree = (data: TUserTree[]) => dispatch(setTreeFn(data));
  const resetTree = () => dispatch(resetTreeFn());

  return { tree, setTree, resetTree };
};

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserTree } from "@/types/api";

const initialState: TUserTree[] = [];

export const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    setTree: (state, { payload }: PayloadAction<TUserTree[]>) =>
      payload.length !== 0 ? state : payload,
    resetTree: () => initialState,
  },
});

export const { setTree, resetTree } = treeSlice.actions;

export default treeSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserTree } from "@/types/api";

const initialState: TUserTree[] = [];

export const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    setTree: (_state, { payload }: PayloadAction<TUserTree[]>) => {
      console.log({ payload });
      return payload;
    },
    resetTree: () => initialState,
  },
});

export const { setTree, resetTree } = treeSlice.actions;

export default treeSlice.reducer;

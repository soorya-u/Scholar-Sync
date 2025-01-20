import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TCore } from "@/types/api";
import { ProfileType } from "@/generated/graphql";

const initialState: TCore = {
  id: "",
  name: "",
  imageUrl: "",
  members: [],
  userRole: ProfileType.Normal,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    setCore: (_state, { payload }: PayloadAction<TCore>) => payload,
    resetCore: () => initialState,
  },
});

export const { setCore, resetCore } = coreSlice.actions;

export default coreSlice.reducer;

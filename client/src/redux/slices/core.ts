import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TCore, UserRole } from "@/types/api";

const initialState: TCore = {
  id: "",
  name: "",
  imageUrl: "",
  members: [],
  userRole: UserRole.NORMAL,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    setCore: (_, { payload }: PayloadAction<TCore>) => payload,
    resetCore: () => initialState,
  },
});

export const { setCore, resetCore } = coreSlice.actions;

export default coreSlice.reducer;

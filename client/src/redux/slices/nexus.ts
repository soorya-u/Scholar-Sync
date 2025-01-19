import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TNexus, UserRole } from "@/types/api";

const initialState: TNexus = {
  id: "",
  name: "",
  category: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  members: [],
  userRole: UserRole.NORMAL,
};

export const nexusSlice = createSlice({
  name: "nexus",
  initialState,
  reducers: {
    setNexus: (_, { payload }: PayloadAction<TNexus>) => payload,
    resetNexus: () => initialState,
  },
});

export const { setNexus, resetNexus } = nexusSlice.actions;

export default nexusSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TNexus } from "@/types/api";
import { ProfileType } from "@/generated/graphql";

const initialState: TNexus = {
  id: "",
  name: "",
  category: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  members: [],
  userRole: ProfileType.Normal,
  announcements: [],
  files: [],
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

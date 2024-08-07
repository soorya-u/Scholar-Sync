import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { NexusType } from "@/types/api";

const initialState: NexusType = {
  id: "",
  name: "",
  category: "",
  announcements: [],
  files: [],
  users: [],
  createdAt: "",
  creator: {
    fullName: "",
    id: "",
    userType: "NORMAL",
  },
};

export const nexusSlice = createSlice({
  name: "nexus",
  initialState,
  reducers: {
    setNexus: (_, { payload }: PayloadAction<NexusType>) => {
      return payload;
    },
    resetNexus: () => initialState,
  },
});

export const { setNexus, resetNexus } = nexusSlice.actions;

export default nexusSlice.reducer;

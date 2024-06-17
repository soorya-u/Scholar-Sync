import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { NexusType } from "@/types/redux";

const initialState: NexusType = {
  id: "",
  category: "",
  name: "",
};

export const nexusSlice = createSlice({
  name: "nexus",
  initialState,
  reducers: {
    setNexus: (state, { payload }: PayloadAction<NexusType>) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setNexus } = nexusSlice.actions;

export default nexusSlice.reducer;

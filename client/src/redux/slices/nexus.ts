import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { NexusReduxType } from "@/types/redux";

const initialState: NexusReduxType = {
  id: "",
  name: "",
  category: "",
};

export const nexusSlice = createSlice({
  name: "nexus",
  initialState,
  reducers: {
    setNexus: (state, { payload }: PayloadAction<NexusReduxType>) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setNexus } = nexusSlice.actions;

export default nexusSlice.reducer;

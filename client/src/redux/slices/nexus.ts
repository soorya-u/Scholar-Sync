import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { NexusReduxType, NexusType } from "@/types/redux";

const initialState: NexusReduxType = {
  activeNexus: {
    id: "",
    category: "",
    name: "",
  },
  allNexus: [],
};

export const nexusSlice = createSlice({
  name: "nexus",
  initialState,
  reducers: {
    setActiveNexus: (state, action: PayloadAction<NexusType>) => {
      return {
        ...state,
        activeNexus: action.payload,
      };
    },
    setAllNexus: (state, action: PayloadAction<NexusType[]>) => {
      return state.activeNexus.id === ""
        ? {
            activeNexus: action.payload[0],
            allNexus: action.payload,
          }
        : {
            ...state,
            allNexus: action.payload,
          };
    },
  },
});

export const { setActiveNexus, setAllNexus } = nexusSlice.actions;

export default nexusSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CoreType } from "@/types/redux";

const initialState: CoreType = {
  id: "",
  imageUrl: "",
  name: "",
};

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    setCore: (state, { payload }: PayloadAction<CoreType>) => {
      return {
        ...state,
        ...payload,
      };
    },
  },
});

export const { setCore } = coreSlice.actions;

export default coreSlice.reducer;

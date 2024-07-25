import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CoreReduxType } from "@/types/redux";

const initialState: CoreReduxType = {
  id: "",
  name: "",
  imageUrl: "",
  nexus: [],
};

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    setCore: (state, { payload }: PayloadAction<CoreReduxType>) => {
      return {
        ...state,
        ...payload,
      };
    },
    resetCore: () => initialState,
  },
});

export const { setCore, resetCore } = coreSlice.actions;

export default coreSlice.reducer;

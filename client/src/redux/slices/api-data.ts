import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CoreType } from "@/types/api";

const initialState: CoreType[] = [];

export const apiDataSlice = createSlice({
  name: "apiData",
  initialState,
  reducers: {
    setApiData: (state, { payload }: PayloadAction<CoreType[]>) =>
      payload.length === 0 ? state : payload,
    resetApiData: () => initialState,
  },
});

export const { setApiData, resetApiData } = apiDataSlice.actions;

export default apiDataSlice.reducer;

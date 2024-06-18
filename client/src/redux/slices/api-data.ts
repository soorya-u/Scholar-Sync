import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CoreType } from "@/types/api";

const initialState: CoreType[] = [];

export const apiDataSlice = createSlice({
  name: "apiData",
  initialState,
  reducers: {
    setApiData: (state, { payload }: PayloadAction<CoreType[]>) => {
      if (payload.length === 0) return state;
      return payload;
    },
  },
});

export const { setApiData } = apiDataSlice.actions;

export default apiDataSlice.reducer;

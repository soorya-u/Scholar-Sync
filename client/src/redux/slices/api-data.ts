import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ApiDataType } from "@/types/redux";

const initialState: ApiDataType[] = [];

export const apiDataSlice = createSlice({
  name: "apiData",
  initialState,
  reducers: {
    setApiData: (state, { payload }: PayloadAction<ApiDataType[]>) => {
      if (payload.length === 0) return state;
      return payload;
    },
  },
});

export const { setApiData } = apiDataSlice.actions;

export default apiDataSlice.reducer;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TGroups } from "@/types/api";

const initialState: TGroups[] = [];

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, { payload }: PayloadAction<TGroups[]>) =>
      payload.length !== 0 ? state : payload,
    resetGroups: () => initialState,
  },
});

export const { setGroups, resetGroups } = groupsSlice.actions;

export default groupsSlice.reducer;

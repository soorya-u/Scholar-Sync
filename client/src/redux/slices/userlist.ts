import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const userListSlice = createSlice({
  name: "isUserListOpen",
  initialState,
  reducers: {
    toggleUserList: (state) => !state,
  },
});

// Action creators are generated for each case reducer function
export const { toggleUserList } = userListSlice.actions;

export default userListSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

export const sideBarSlice = createSlice({
  name: "isSidebarOpen",
  initialState,
  reducers: {
    toggleSidebar: (state) => !state,
  },
});

// Action creators are generated for each case reducer function
export const { toggleSidebar } = sideBarSlice.actions;

export default sideBarSlice.reducer;

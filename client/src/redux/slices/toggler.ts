import { createSlice } from "@reduxjs/toolkit";

type TogglerType = {
  sidebar: boolean;
  userList: boolean;
};

const initialState: TogglerType = {
  sidebar: false,
  userList: false,
};

export const togglerSlice = createSlice({
  name: "appToggler",
  initialState,
  reducers: {
    toggleSidebar: (state) => ({ ...state, sidebar: !state.sidebar }),
    toggleUserList: (state) => ({ ...state, userList: !state.userList }),
  },
});

export const { toggleSidebar, toggleUserList } = togglerSlice.actions;

export default togglerSlice.reducer;

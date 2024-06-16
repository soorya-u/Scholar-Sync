import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./slices/sidebar";
import userListSlice from "./slices/userlist";

export const store = configureStore({
  reducer: {
    sidebar: sidebarSlice,
    userList: userListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

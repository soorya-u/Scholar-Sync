import { configureStore } from "@reduxjs/toolkit";
import toggler from "./slices/toggler";
import user from "./slices/user";
import core from "./slices/core";

export const store = configureStore({
  reducer: {
    toggler,
    user,
    core,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

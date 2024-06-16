import { configureStore } from "@reduxjs/toolkit";
import toggler from "./slices/toggler";

export const store = configureStore({
  reducer: {
    toggler,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

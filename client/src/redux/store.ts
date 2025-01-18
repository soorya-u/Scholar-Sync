import { configureStore } from "@reduxjs/toolkit";

import user from "./slices/user";
import core from "./slices/core";
import nexus from "./slices/nexus";
import trees from "./slices/tree";

export const store = configureStore({ reducer: { user, core, nexus, trees } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

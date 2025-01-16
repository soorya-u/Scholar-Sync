import { configureStore } from "@reduxjs/toolkit";

import user from "./slices/user";
import core from "./slices/core";
import nexus from "./slices/nexus";
import groups from "./slices/group";

export const store = configureStore({ reducer: { user, core, nexus, groups } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TUser } from "@/types/api";

const initialState: TUser = {
  id: "",
  fullName: "",
  email: "",
  createdAt: new Date().toISOString(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<TUser>) => action.payload,
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

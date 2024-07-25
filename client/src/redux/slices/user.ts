import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { UserType } from "@/types/api";

const initialState: UserType = {
  id: "",
  userType: "NORMAL",
  fullName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action: PayloadAction<UserType>) => {
      return action.payload;
    },
    resetUser: () => initialState,
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;

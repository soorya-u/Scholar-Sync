import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getProfileColor } from "@/utils/colors";

type ProfileColor = {
  backgroundColor: string;
  color: string;
};

type ProfileColorMap = {
  [key: string]: ProfileColor;
};

const initialState: ProfileColorMap = {};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColor: (state, { payload: userId }: PayloadAction<string>) => {
      if (!userId) return state;
      const userColor = state[userId];
      if (userColor) return state;
      const newColors = getProfileColor();
      return {
        ...state,
        [userId]: newColors,
      };
    },
  },
});

export const { setColor } = colorSlice.actions;

export default colorSlice.reducer;

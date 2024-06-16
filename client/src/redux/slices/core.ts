import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CoreReduxType, CoreType } from "@/types/redux";

const initialState: CoreReduxType = {
  activeCore: {
    id: "",
    imageUrl: "",
    name: "",
  },
  allCores: [],
};

export const coreSlice = createSlice({
  name: "core",
  initialState,
  reducers: {
    setActiveCore: (state, action: PayloadAction<CoreType>) => {
      return {
        ...state,
        activeCore: action.payload,
      };
    },
    setAllCores: (state, action: PayloadAction<CoreType[]>) => {
      return state.activeCore.id === ""
        ? {
            activeCore: action.payload[0],
            allCores: action.payload,
          }
        : {
            ...state,
            allCores: action.payload,
          };
    },
  },
});

export const { setActiveCore, setAllCores } = coreSlice.actions;

export default coreSlice.reducer;

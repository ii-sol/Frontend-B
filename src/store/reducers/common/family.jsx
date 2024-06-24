import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  childInfo: [],
};

const familySlice = createSlice({
  name: "family",
  initialState: initialState,
  reducers: {
    setChildInfo(state, action) {
      state.childInfo = action.payload;
    },
    removeChildFromFamily(state, action) {
      state.childInfo = state.childInfo.filter((child) => child.id !== action.payload);
    },
  },
});

export const { setChildInfo, removeChildFromFamily } = familySlice.actions;

export default familySlice.reducer;

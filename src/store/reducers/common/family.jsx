import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  familyInfo: [],
};

const familySlice = createSlice({
  name: "family",
  initialState: initialState,
  reducers: {
    setFamilyInfo(state, action) {
      state.familyInfo = [...state.familyInfo, ...action.payload];
    },
    removeChildFromFamily(state, action) {
      state.familyInfo = state.familyInfo.filter((_, index) => index !== action.payload);
    },
  },
});

export const { setFamilyInfo } = familySlice.actions;

export default familySlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    baseRate: 0,
    investLimit: 0,
    loanLimit: 0,
  },
};

const managementSlice = createSlice({
  name: "management",
  initialState: initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
});

export const { setFormData } = managementSlice.actions;

export default managementSlice.reducer;

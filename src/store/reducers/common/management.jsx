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
      const { baseRate, investLimit, loanLimit } = action.payload;
      state.formData = {
        baseRate,
        investLimit,
        loanLimit,
      };
    },
  },
});

export const { setFormData } = managementSlice.actions;

export default managementSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllowanceHistory as reqFetchAllowanceHistory } from "../../../services/allowance";

const initialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchAllowanceHistory = createAsyncThunk("allowance/fetchAllowanceHistory", async ({ year, month, csn }, thunkAPI) => {
  try {
    const response = await reqFetchAllowanceHistory(year, month, csn);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const allowanceSlice = createSlice({
  name: "allowance",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllowanceHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllowanceHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllowanceHistory.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

export default allowanceSlice.reducer;

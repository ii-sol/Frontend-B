import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPortfolio as reqFetchPortfolio } from "../../../services/invest";

const initialState = {
  loading: true,
  totalEvaluationAmount: 0,
  totalPurchaseAmount: 0,
  totalProfit: 0,
  investTradeList: [],
};

export const fetchPortfolio = createAsyncThunk(
  "invest/fetchPortfolio",
  async (data, thunkAPI) => {
    const response = await reqFetchPortfolio();
    console.log(response);
    return response;
  }
);

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.loading = false;
        state.totalEvaluationAmount =
          action.payload.response.totalEvaluationAmount;
        state.totalPurchaseAmount = action.payload.response.totalPurchaseAmount;
        state.totalProfit = action.payload.response.totalProfit;
        state.investTradeList = action.payload.response.investTradeList;
      })
      .addCase(fetchPortfolio.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPortfolio.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const {} = portfolioSlice.actions;

export default portfolioSlice.reducer;

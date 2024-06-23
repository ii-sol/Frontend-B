import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchStock as reqFetchStock,
  fetchMyStocks as reqFetchMyStocks,
} from "../../../services/invest";

const initialState = {
  trade: 1, //1: 구매, 2: 판매
  price: 80000,
  myAmount: 0,
  name: "삼성전자",
  code: "005930",
  quantity: 0,
  changePrice: 0,
  changeRate: 0,
  changeSign: 3,
  isNew: false,
  parent: 10,
  message: "",
  charts: [],
  indi: {
    marketCapitalization: "1670765",
    dividendYield: "2.40",
    pbr: "3.00",
    per: "-18.34",
    profitGrowth: "-",
    roe: "-",
  },
};

export const fetchStock = createAsyncThunk(
  "invest/fetchStock",
  async ({ code, pathVariable }, thunkAPI) => {
    const response = await reqFetchStock(code, pathVariable);
    console.log(response);
    return response;
  }
);

export const fetchMyStocks = createAsyncThunk(
  "invest/fetchMyStocks",
  async (data, thunkAPI) => {
    const response = await reqFetchMyStocks();
    console.log(response);
    return response;
  }
);

const investSlice = createSlice({
  name: "invest",
  initialState: initialState,
  reducers: {
    setTrade(state, action) {
      state.trade = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setMyAmount(state, action) {
      state.myAmount = action.payload;
    },
    setCode(state, action) {
      state.code = action.payload;
    },
    setQuantity(state, action) {
      state.quantity = action.payload;
    },
    setIsNew(state, action) {
      state.isNew = action.payload;
    },
    setParent(state, action) {
      state.parent = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStock.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.charts = action.payload.response.charts;
        state.name = action.payload.response.companyName;
        state.price = action.payload.response.currentPrice * 100;
        state.changePrice = action.payload.response.changePrice;
        state.changeRate = action.payload.response.changeRate;
        state.changeSign = action.payload.response.changeSign;
        state.indi.marketCapitalization =
          action.payload.response.marketCapitalization;
        state.indi.dividendYield = action.payload.response.dividendYield;
        state.indi.pbr = action.payload.response.pbr;
        state.indi.per = action.payload.response.per;
        state.indi.roe = action.payload.response.roe;
        state.indi.profitGrowth = action.payload.response.profitGrowth;
      })
      .addCase(fetchStock.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchStock.rejected, (state) => {
        state.loading = "rejected";
      })
      .addCase(fetchMyStocks.fulfilled, (state, action) => {
        state.loading = "fulfilled";
      })
      .addCase(fetchMyStocks.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchMyStocks.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export const {
  setTrade,
  setName,
  setPrice,
  setMyAmount,
  setCode,
  setQuantity,
  setIsNew,
  setParent,
  setMessage,
} = investSlice.actions;

export default investSlice.reducer;

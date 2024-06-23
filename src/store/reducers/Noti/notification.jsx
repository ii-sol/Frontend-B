import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchNoti as reqFetchNoti,
  deleteNoti as reqDeleteNoti,
  deleteAllNoti as reqDeleteAllNoti,
} from "../../../services/notifications";

const initialState = {
  functionCode: 0,
  noti: [],
  loading: true,
};

export const fetchNoti = createAsyncThunk(
  "notification/fetchNoti",
  async (usn, thunkAPI) => {
    const response = await reqFetchNoti(usn);
    console.log("response", response);
    return response;
  }
);

export const deleteAllNoti = createAsyncThunk(
  "notification/deleteAllNoti",
  async (rsn, thunkAPI) => {
    const response = await reqDeleteAllNoti(rsn);
    console.log("response", response);
    return response;
  }
);

export const deleteNoti = createAsyncThunk(
  "notification/deleteNoti",
  async (nsn, thunkAPI) => {
    const response = await reqDeleteNoti(nsn);
    console.log("response", response);
    return response;
  }
);

const notiSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setFunctionCode(state, action) {
      state.functionCode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNoti.fulfilled, (state, action) => {
        state.loading = false;
        state.noti = action.payload.response;
      })
      .addCase(fetchNoti.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNoti.rejected, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllNoti.fulfilled, (state, action) => {
        state.noti = [];
      })
      .addCase(deleteNoti.fulfilled, (state, action) => {
        state.noti = state.noti.filter(
          (noti) => noti.notificationSerialNumber !== action.meta.arg
        );
      });
  },
});

export const { setFunctionCode } = notiSlice.actions;

export default notiSlice.reducer;

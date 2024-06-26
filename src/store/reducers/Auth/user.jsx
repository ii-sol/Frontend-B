import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFamilyInfo as reqFetchFamilyInfo } from "../../../services/user";
const initialState = {
  isLoggedIn: false,
  userInfo: {
    name: null,
    profileId: null,
    sn: null,
    familyInfo: [
      {
        sn: null,
        profileId: null,
        name: null,
      },
    ],
  },
  accessToken: null,
  refreshToken: null,
  selectedChildSn: null,
  selectedChildName: null,
  clickedChildSn: null,
};

export const fetchFamilyInfo = createAsyncThunk(
  "user/fetchFamilyInfo",
  async (data, thunkAPI) => {
    const response = await reqFetchFamilyInfo();
    console.log(response);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      console.log(action.payload);
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setSelectedChildSn(state, action) {
      state.selectedChildSn = action.payload;
    },
    setSelectedChildName(state, action) {
      state.selectedChildName = action.payload;
    },
    setClickedChildSn(state, action) {
      state.clickedChildSn = action.payload;
    },
    removeChild(state, action) {
      const snToRemove = action.payload;
      state.userInfo.familyInfo = state.userInfo.familyInfo.filter(
        (member) => member.sn !== snToRemove
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamilyInfo.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.userInfo.familyInfo = action.payload.response;
      })
      .addCase(fetchFamilyInfo.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchFamilyInfo.rejected, (state) => {
        state.loading = "rejected";
      });
  },
});

export const {
  loginSuccess,
  logout,
  setSelectedChildSn,
  setSelectedChildName,
  setClickedChildSn,
  removeChild,
} = userSlice.actions;

export default userSlice.reducer;

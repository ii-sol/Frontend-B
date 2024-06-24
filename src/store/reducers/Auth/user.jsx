import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userInfo: {
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
};

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
    removeChild(state, action) {
      const snToRemove = action.payload;
      state.userInfo.familyInfo = state.userInfo.familyInfo.filter((member) => member.sn !== snToRemove);
    },
  },
});

export const { loginSuccess, logout, setSelectedChildSn, removeChild } = userSlice.actions;

export default userSlice.reducer;

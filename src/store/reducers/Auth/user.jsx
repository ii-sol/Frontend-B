import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const {
  loginSuccess,
  logout,
  setSelectedChildSn,
  setSelectedChildName,
  setClickedChildSn,
} = userSlice.actions;

export default userSlice.reducer;

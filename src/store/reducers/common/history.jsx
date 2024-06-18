import { createSlice } from "@reduxjs/toolkit";

const getKoreanDate = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000; // 오프셋을 밀리초로 변환
  const kstTime = new Date(now.getTime() + offset + 9 * 3600000); // KST는 UTC+9
  return {
    year: kstTime.getFullYear(),
    month: kstTime.getMonth() + 1,
  };
};

const initialState = {
  ...getKoreanDate(),
  status: 0,
};

const historySlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {
    setYear(state, action) {
      state.year = action.payload;
    },
    setMonth(state, action) {
      state.month = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setYear, setMonth, setStatus } = historySlice.actions;

export default historySlice.reducer;

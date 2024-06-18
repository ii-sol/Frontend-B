import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  content: "",
  childId: 0,
  parentId: 0,
  price: 0,
  dueDate: "",
};

const missionSlice = createSlice({
  name: "mission",
  initialState: initialState,
  reducers: {
    setContent(state, action) {
      state.content = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setDueDate(state, action) {
      state.dueDate = action.payload;
    },
    setParentId(state, action) {
      state.parentId = action.payload;
    },
    setInitialState(state) {
      return { ...initialState };
    },
  },
});

export const { setContent, setPrice, setDueDate, setParentId, setInitialState } = missionSlice.actions;

export default missionSlice.reducer;

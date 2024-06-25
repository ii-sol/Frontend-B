import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMissionHistory as reqFetchMissionHistory } from "../../../services/mission";

const initialState = {
  historyData: [],
  loading: false,
  content: "",
  childSn: 0,
  parentSn: 0,
  price: 0,
  dueDate: "",
  missionData: [],
  ongoingData: [],
};

export const fetchMissionHistory = createAsyncThunk("mission/fetchMissionHistory", async ({ sn, year, month, status }, thunkAPI) => {
  try {
    const response = await reqFetchMissionHistory(sn, year, month, status);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const missionSlice = createSlice({
  name: "mission",
  initialState: initialState,
  reducers: {
    setMissionData(state, action) {
      state.missionData = action.payload;
    },
    setContent(state, action) {
      state.content = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    setDueDate(state, action) {
      state.dueDate = action.payload;
    },
    setParentSn(state, action) {
      state.parentSn = action.payload;
    },
    setChildSn(state, action) {
      state.childSn = action.payload;
    },
    setOngoingData(state, action) {
      state.ongoingData = action.payload;
    },
    deleteOngoingData(state, action) {
      state.ongoingData = state.ongoingData.filter((mission) => mission.id !== action.payload);
    },
    setHistoryData(state, action) {
      state.historyData = action.payload;
    },
    setInitialState(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMissionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.historyData = action.payload;
      })
      .addCase(fetchMissionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setMissionData, setContent, setPrice, setDueDate, setChildSn, setParentSn, setOngoingData, deleteOngoingData, setHistoryData, setInitialState } = missionSlice.actions;

export default missionSlice.reducer;

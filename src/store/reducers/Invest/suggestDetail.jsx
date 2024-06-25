import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProposalDetail as reqFetchProposalDetail,
  postProposalYN as reqPostProposalYN,
} from "../../../services/invest";

const initialState = {
  loading: true,
  companyInfo: null,
  requestProposal: null,
  responseProposal: null,
  display: true,
  error: null,
};

export const fetchProposalDetail = createAsyncThunk(
  "suggestDetail/fetchProposalDetail",
  async ({ proposeId, pathVariable, csn }, thunkAPI) => {
    const response = await reqFetchProposalDetail(proposeId, pathVariable, csn);
    console.log(response);
    return response;
  }
);

export const postProposalYN = createAsyncThunk(
  "suggestDetail/postProposalYN",
  async ({ proposeId, accept, message, csn }, thunkAPI) => {
    const response = await reqPostProposalYN(proposeId, accept, message, csn);
    console.log(response);
    return response;
  }
);

const suggestDetailSlice = createSlice({
  name: "suggestDetail",
  initialState: initialState,
  reducers: {
    setDisplay(state, action) {
      state.display = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProposalDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.companyInfo = action.payload.response.companyInfo;
        state.requestProposal = action.payload.response.requestProposal;
        state.responseProposal = action.payload.response.responseProposal;
      })
      .addCase(fetchProposalDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProposalDetail.rejected, (state) => {
        state.loading = true;
      })
      .addCase(postProposalYN.fulfilled, (state, action) => {
        state.loading = false;
        console.log("actions", action);
        if (action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.error = null;
        }

        // if (action.meta.arg.accept === true) {
        //   state.requestProposal.status = 3;
        // } else {
        //   state.requestProposal.status = 5;
        // }
      })
      .addCase(postProposalYN.pending, (state) => {
        state.loading = true;
      })
      .addCase(postProposalYN.rejected, (state) => {
        state.loading = true;
      });
  },
});

export const { setDisplay, setError } = suggestDetailSlice.actions;

export default suggestDetailSlice.reducer;

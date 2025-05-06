import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../url";

interface ValueItem {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
}

interface Section5State {
  values: ValueItem[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: Section5State = {
  values: [],
  loading: false,
  error: null,
};

// Async thunk to fetch data
export const fetchSection5Data = createAsyncThunk(
  "section5/fetchSection5Data",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/section5`);
      return response.data.values;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  }
);

// Slice
const section5Slice = createSlice({
  name: "section5",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSection5Data.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSection5Data.fulfilled, (state, action) => {
        state.loading = false;
        state.values = action.payload;
      })
      .addCase(fetchSection5Data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default section5Slice.reducer;

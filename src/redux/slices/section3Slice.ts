import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../url";

interface Section3Item {
  value: string;
  text: string;
}

interface Section3State {
  section3data: {
    GraduationCap: Section3Item;
    University: Section3Item;
    School: Section3Item;
    Users: Section3Item;
  } | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: Section3State = {
  section3data: null,
  loading: false,
  error: null,
};

// Async thunk to fetch data
export const fetchSection3Data = createAsyncThunk(
  "section3/fetchSection3Data",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/section3`);
      return response.data.section3data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  }
);

// Slice
const section3Slice = createSlice({
  name: "section3",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSection3Data.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSection3Data.fulfilled, (state, action) => {
        state.loading = false;
        state.section3data = action.payload;
      })
      .addCase(fetchSection3Data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default section3Slice.reducer;

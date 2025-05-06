import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../url";

// Define interfaces for each piece of data
interface HeaderImage {
  src: string;
  alt: string;
}

interface Section {
  title: string;
  content: string;
}

export interface AcademicsData {
  headerImage: HeaderImage;
  introText: string;
  programLevels: string[];
  sections: Section[];
}

interface AcademicsState {
  academicsData: AcademicsData | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AcademicsState = {
  academicsData: null,
  loading: false,
  error: null,
};

// Async thunk to fetch data
export const fetchAcademicsData = createAsyncThunk(
  "academics/fetchAcademicsData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/academics`);
      return response.data.academicsData;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  }
);

// Create the slice
const academicsSlice = createSlice({
  name: "academics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademicsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcademicsData.fulfilled, (state, action) => {
        state.loading = false;
        state.academicsData = action.payload;
      })
      .addCase(fetchAcademicsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default academicsSlice.reducer;

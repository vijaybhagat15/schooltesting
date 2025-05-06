import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../url";

// Define the interface for Section4 data
interface Section4State {
  sections: {
    p1: string;
    img1: string;
    img2: string;
    img3: string;
    img4: string;
  } | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: Section4State = {
  sections: null,
  loading: false,
  error: null,
};

// Async thunk for fetching Section 4 data
export const fetchSection4Data = createAsyncThunk<
  Section4State["sections"], // Expected return type
  void, // No arguments required
  { rejectValue: string } // Error handling
>("section4/fetchSection4Data", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/section4`);
    return response.data.sections; // Extract `sections` from response
  } catch (error) {
    const axiosError = error as AxiosError;
    return rejectWithValue(axiosError.message || "Failed to fetch section 4 data");
  }
});

// Create slice
const section4Slice = createSlice({
  name: "section4",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSection4Data.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSection4Data.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchSection4Data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export default section4Slice.reducer;

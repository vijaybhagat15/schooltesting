import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../url";

// Define the data structure for each section
interface Section {
  title: string;
  description: string;
  buttonText: string;
}

// Define the state structure
interface Section2State {
  sections: {
    Visit: Section;
    Learn: Section;
    Apply: Section;
    Giving: Section;
  } | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: Section2State = {
  sections: null,
  loading: false,
  error: null,
};

// Async thunk to fetch data from the API
export const fetchSection2 = createAsyncThunk(
    "section2/fetchSection2",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/section2`);
        return response.data.sections; // Extract the sections object from response
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
        return rejectWithValue("An unexpected error occurred");
      }
    }
  );

// Create the slice
const section2Slice = createSlice({
  name: "section2",
  initialState,
  reducers: {}, // No manual reducers needed, only async actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchSection2.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSection2.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchSection2.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the reducer to be used in store
export default section2Slice.reducer;

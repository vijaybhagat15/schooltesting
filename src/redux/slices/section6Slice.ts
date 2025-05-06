import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../url";

export interface NewsItem {
  _id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  author: string;
  category: string;
  link: string;
}

interface Section6State {
  newsData: NewsItem[];
  loading: boolean;
  error: string | null;
}

const initialState: Section6State = {
  newsData: [],
  loading: false,
  error: null,
};

export const fetchSection6Data = createAsyncThunk(
  "section6/fetchSection6Data",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/section6`);
      return response.data.newsData;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  }
);

const section6Slice = createSlice({
  name: "section6",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSection6Data.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSection6Data.fulfilled, (state, action) => {
        state.loading = false;
        state.newsData = action.payload;
      })
      .addCase(fetchSection6Data.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default section6Slice.reducer;

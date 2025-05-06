
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from "../url";

interface StyleState {
  styles: Record<string, string>;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: StyleState = {
  styles: {},
  loading: false,
  error: null,
};

// Async thunk to fetch styles from backend
export const fetchStyleData = createAsyncThunk('style/fetchStyleData', async () => {
  const response = await axios.get(`${BASE_URL}/`);
  return response.data.styles; // Assumes response is { styles: { ... } }
});

const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStyleData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStyleData.fulfilled, (state, action: PayloadAction<Record<string, string>>) => {
        state.loading = false;
        state.styles = action.payload;
      })
      .addCase(fetchStyleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch styles';
      });
  },
});

export default styleSlice.reducer;

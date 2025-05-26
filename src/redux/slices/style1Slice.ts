// src/redux/slices/style1Slice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ButtonStyles {
  backgroundColor: string;
  textColor: string;
  borderRadius: string;
  hoverBackgroundColor: string;
}

interface ThemeState {
  loading: boolean;
  error: string | null;
  data: {
    buttonStyles: ButtonStyles;
    name: string;
    primary_background_Color: string;
    Secondary_background_Color: string;
    primary_text_Color: string;
    secondary_text_Color : string;
    accentColor: string;
    fontFamily: string;
    headerBackgroundColor: string;
    footerBackgroundColor: string;
    linkColor: string;
    customCSS: string;
  } | null;
}

// Initial state
const initialState: ThemeState = {
  loading: false,
  error: null,
  data: null,
};

// Async thunk to fetch theme
export const fetchTheme = createAsyncThunk(
  'theme/fetchTheme',
  async (themeId: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/theme/get-theme/${themeId}`
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const style1Slice = createSlice({
  name: 'style1',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTheme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTheme.fulfilled, (state, action: PayloadAction<ThemeState["data"]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTheme.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default style1Slice.reducer;

// src/redux/slices/footerSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SocialLink {
  platform: string;
  url: string;
  _id: string;
}

interface FooterData {
  _id: string;
  name: string;
  description: string;
  logo: string;
  openingHours: string;
  copyright: string;
  Privacy_Policy: string;
  links: any[]; // Update this when structure is defined
  socialLinks: SocialLink[];
  columns: any[]; // Update this when structure is defined
}

interface FooterState {
  loading: boolean;
  footer: FooterData | null;
  error: string | null;
}

const initialState: FooterState = {
  loading: false,
  footer: null,
  error: null,
};

export const fetchFooter = createAsyncThunk(
  'footer/fetchFooter',
  async (id:string, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/footer/get-footer/${id}`
      );
      return response.data.data as FooterData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch footer');
    }
  }
);

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.footer = action.payload;
      })
      .addCase(fetchFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default footerSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define types for complex data
interface Logo {
  url: string;
  altText: string;
}

interface SubMenuItem {
  title: string;
  link: string;
}

interface NavigationItem {
  title: string;
  link: string;
  subMenu: SubMenuItem[];
  _id: string;
}


interface SocialLink {
  platform: string;
  url: string;
  _id: string;
}

interface HeaderState {
  logo: Logo | null;
  name: string;
  navigation: NavigationItem[];
  socialLinks: SocialLink[];
  customHtml: string;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: HeaderState = {
  logo: null,
  name: "",
  navigation: [],
  socialLinks: [],
  customHtml: "",
  loading: false,
  error: null,
};

// Async thunk to fetch header data
export const fetchHeader = createAsyncThunk(
  "header/fetchHeader",
  async (id:string, { rejectWithValue }) => {
    const headerid=id;    
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/header/get-header/${headerid}`);
      return response.data.data; // Use 'data' from response
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || "Failed to fetch header");
    }
  }
);

// Create slice
const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeader.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeader.fulfilled, (state, action) => {
        state.loading = false;
        state.logo = action.payload.logo;
        state.name = action.payload.name;
        state.navigation = action.payload.navigation;
        state.socialLinks = action.payload.socialLinks;
        state.customHtml = action.payload.customHtml;
      })
      .addCase(fetchHeader.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default headerSlice.reducer;

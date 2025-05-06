// src/redux/slices/websiteSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface MetaData {
  title: string;
  description: string;
  keywords: string[];
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}
interface HeroData {
  Slide1_title: string;
  Subtitle1: string;
  img1: string;
  Slide2_title: string;
  Subtitle2: string;
  img2: string;
  Slide3_title: string;
  Subtitle3: string;
  img3: string;
}

interface AboutData {
  Your_mission: string;
  mission_img: string;
  journey: string;
  Principal: string;
  HOD: string;
  President: string;
  Principal_img: string;
  HOD_img: string;
  President_img: string;
}

interface ContactData {
  contact_titel: string;
  description: string;
  location: string;
  contact_bg:string;
}

interface Modules {
  hero: { enabled: boolean; data: HeroData };
  about: { enabled: boolean; data: AboutData };
  courses: { enabled: boolean };
  events: { enabled: boolean };
  gallery: { enabled: boolean };
  testimonials: { enabled: boolean };
  blog: { enabled: boolean };
  contact: { enabled: boolean; data: ContactData };
  faq: { enabled: boolean };
}

export interface WebsiteData {
  _id: string;
  domainName: string;
  schoolId: string;
  footerId: string;
  themeId: string;
  headerId: string;
  name: string;
  status: string;
  metaData: MetaData;
  sslCertificate: {
    isActive: boolean;
    expiryDate: string | null;
  };
  contactInfo: ContactInfo;
  modules: Modules;
}

interface WebsiteState {
  website: WebsiteData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WebsiteState = {
  website: null,
  loading: false,
  error: null,
};

// Async thunk
export const fetchWebsite = createAsyncThunk(
  'website/fetchWebsite',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/website/get-website/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch website');
    }
  }
);

const websiteSlice = createSlice({
  name: 'website',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebsite.fulfilled, (state, action) => {
        state.website = action.payload;
        state.loading = false;
      })
      .addCase(fetchWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default websiteSlice.reducer;

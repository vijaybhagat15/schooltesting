import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../url";

// Define interfaces
interface Service {
  title: string;
  description: string;
  image: string;
  alt: string;
}

interface HelpSection {
  title: string;
  icon: string;
  text: string;
  iconColor: string;
}

interface FormPlaceholders {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Form {
  title: string;
  placeholders: FormPlaceholders;
  button: string;
}

export interface ContactData {
  introText: string;
  services: Service[];
  helpSections: HelpSection[];
  form: Form;
}

interface ContactState {
  contactData: ContactData | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: ContactState = {
  contactData: null,
  loading: false,
  error: null,
};

// Thunk to fetch contact data
export const fetchContactData = createAsyncThunk(
  "contact/fetchContactData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/contact`);
      return response.data.contactData;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  }
);

// Create the slice
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactData.fulfilled, (state, action) => {
        state.loading = false;
        state.contactData = action.payload;
      })
      .addCase(fetchContactData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default contactSlice.reducer;

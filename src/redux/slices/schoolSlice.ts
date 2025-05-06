import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the base URL (you can also import from a config file if needed)
const BASE_URL = "http://localhost:8000/api/v1/school";

// Define the type for the School
export interface SchoolDetails {
  _id: string;
  schoolName: string;
  schoolType: string;
  affiliation: string;
  year: string;
  schoolLogo: string | null;
  email: string;
  phone: string;
  alternatePhone: string;
  schoolurl: string;
  street: string;
  location: string;
  state: string;
  zipcode: string;
  country: string;
  principalName: string;
  principalEmail: string;
  principalPhone: string;
  linkedinProfile: string;
  description: string;
  totalStudents: number;
  totalFaculty: number;
  ratio: number;
  schoolAdminId: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define the slice state
interface SchoolState {
  school: SchoolDetails | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: SchoolState = {
  school: null,
  loading: false,
  error: null,
};

// Thunk to fetch a school’s details
export const fetchSchoolDetails = createAsyncThunk(
  "school/fetchSchoolDetails",
  async (schoolId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/school-details/${schoolId}`);
      return response.data.school; // This is where the actual school data is nested
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.message);
    }
  }
);

// Create the slice
const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchoolDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchoolDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.school = action.payload;
      })
      .addCase(fetchSchoolDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default schoolSlice.reducer;

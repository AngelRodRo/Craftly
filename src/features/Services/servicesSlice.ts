import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Service } from "./model";
import { fetchServices as fetchServicesApi } from "./api";
import type { Filter } from "./types";

interface ServicesState {
  services: Service[];
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  loading: false,
  error: null,
};

export const fetchServices = createAsyncThunk<Service[], Filter>(
  "services/fetchServices",
  async (filter: Filter) => {
    const response = await fetchServicesApi(filter);
    return response;
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching services";
      });
  },
});

export default servicesSlice.reducer;

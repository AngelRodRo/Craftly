import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Service } from "./model";
import {
  fetchServices as fetchServicesApi,
  fetchCategories as fetchCategoriesApi,
} from "./api";
import type { Filter } from "./types";

interface ServicesState {
  services: Service[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  categories: [],
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

export const fetchCategories = createAsyncThunk<string[], void>(
  "services/fetchCategories",
  async () => {
    const response = await fetchCategoriesApi();
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

    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching categories";
      });
  },
});

export default servicesSlice.reducer;

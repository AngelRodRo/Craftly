import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Service } from "./model";
import {
  fetchServices as fetchServicesApi,
  fetchCategories as fetchCategoriesApi,
  FetchServicesResponse,
} from "./api";
import type { Filter } from "./types";
import { DEFAULT_SERVICE_LIMIT } from "./constants/service";
import { FETCH_SERVICES, FETCH_CATEGORIES } from "./actions";

interface ServicesState {
  services: Service[];
  categories: string[];
  loading: boolean;
  totalPages: number;

  filter: Filter;
  error: string | null;
}

export const initialState: ServicesState = {
  services: [],
  categories: [],
  loading: false,
  totalPages: 0,
  filter: {
    name: "",
    category: [],
    priceMin: null,
    priceMax: null,
    page: 1,
    limit: DEFAULT_SERVICE_LIMIT,
  },
  error: null,
};

export const fetchServices = createAsyncThunk<FetchServicesResponse, Filter>(
  FETCH_SERVICES,
  async (filter: Filter) => {
    const response = await fetchServicesApi(filter);
    return response;
  }
);

export const fetchCategories = createAsyncThunk<string[], void>(
  FETCH_CATEGORIES,
  async () => {
    const response = await fetchCategoriesApi();
    return response;
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.services;
        state.totalPages = action.payload.totalPages;
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

export const { setFilter } = servicesSlice.actions;

export default servicesSlice.reducer;

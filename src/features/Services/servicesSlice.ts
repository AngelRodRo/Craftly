import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
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

  filter: Filter;
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  categories: [],
  loading: false,
  filter: {
    name: "",
    category: [],
    price: { min: undefined, max: undefined },
  },
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

export const { setFilter } = servicesSlice.actions;

export default servicesSlice.reducer;

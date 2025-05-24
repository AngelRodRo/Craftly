import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/Auth/authSlice";
import servicesReducer from "@/features/Services/servicesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

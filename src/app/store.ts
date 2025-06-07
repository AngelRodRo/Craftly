import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/Auth/authSlice";
import servicesReducer from "@/features/Services/servicesSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  services: servicesReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

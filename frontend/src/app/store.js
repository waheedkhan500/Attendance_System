import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../slices/authSlice";
import { apiSlice } from "../slices/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV === "development" ? true : false,
});

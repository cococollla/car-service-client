import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./СarSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

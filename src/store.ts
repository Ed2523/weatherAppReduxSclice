// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
/**
 * You're importing the default export from weatherslice.ts. Since weatherSlice.reducer is the default export, you import it with any name you choose (weatherReducer in this case).
 */
import weatherReducer from "./weatherslice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;

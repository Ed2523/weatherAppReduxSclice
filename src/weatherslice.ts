// src/weatherSlice.ts
/**
 * Import Statements: This code starts by importing necessary modules.
 * createSlice and createAsyncThunk are functions provided by Redux Toolkit,
 *  and axios is a library used for making an HTTP requests
 * to OpenWeatherMap API.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Defining State Interface: An interface called WeatherState is defined to specify 
 * the structure of the state managed by this slice. 
 * It includes three properties:
 * 
 *   weatherData: Holds the fetched weather data.
 * 
     loading: Indicates whether the data is currently being fetched.

     error: Stores any error message that might occur during the fetch process.

 *  */
interface WeatherState {
  weatherData: any;
  loading: boolean;
  error: string | null;
}

/**
 * Initial State: The initialState object defines the initial
 * values for the state properties.
 *  When the Redux store is first created,
 *  it will have these values.
 */
const initialState: WeatherState = {
  weatherData: null,
  loading: false,
  error: null,
};

/**
 * Async Thunk for Fetching Weather:
 *  fetchWeather is an asynchronous action creator created using
 * the createAsyncThunk function. It accepts a string parameter city,
 * representing the city for which weather data is to be fetched.
 * This action will later be dispatched in the component to initiate the API call.
 *
 * Inside the fetchWeather async function, an Axios GET request
 * is made to fetch weather data from the OpenWeatherMap API.
 * The response data is then returned.
 */
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (city: string) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`
    );
    return response.data;
  }
);

/**
 * 
 * Creating the Weather Slice: The weatherSlice is created using the
   createSlice function. It bundles together the reducer logic and actions 
   for managing the weather-related state.

  name: The name of the slice, used for generating action type strings.
  initialState: The initial state object.
  reducers: This section can contain custom reducer functions, but in this case, it's empty since we're using extraReducers.
  extraReducers: This is where the reducer logic is defined for handling actions dispatched by createAsyncThunk.

  .addCase(fetchWeather.pending, ...): This part handles the pending state of the fetchWeather action. It sets the loading state to true and clears any previous error messages.
  .addCase(fetchWeather.fulfilled, ...): This part handles the fulfilled state of the fetchWeather action. It sets the loading state to false and updates the weatherData with the payload from the action, which is the fetched weather data.
  .addCase(fetchWeather.rejected, ...): This part handles the rejected state of the fetchWeather action. It sets the loading state to false and sets the error state to either the error message from the action or a default error message.
 */
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An erro occured";
      });
  },
});

export default weatherSlice.reducer;

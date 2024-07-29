// src/WeatherComponent.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "./weatherslice";
import { AppDispatch } from "./store"; // Import the correct type for dispatch
import "./WeatherComponent.scss";

function WeatherComponent() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const weatherData = useSelector((state: any) => state.weather.weatherData);
  const loading = useSelector((state: any) => state.weather.loading);
  const error = useSelector((state: any) => state.weather.error);

  // need to convert kelvin to fahrenheit from openweather api
  const convertKelvinToFahrenheit = (kelvin: number): number => {
    return Math.round((kelvin - 273.15) * (9 / 5) + 32);
  };

  const handleFetchWeather = () => {
    if (city.trim() !== "") {
      dispatch(fetchWeather(city));
    }
  };

  return (
    <div>
      <h2>Weather App</h2>
      <input
        type='text'
        placeholder='Enter city name'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleFetchWeather} disabled={loading}>
        {loading ? "Loading..." : "Get Weather"}
      </button>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h3>Weather in {weatherData.name}</h3>
          <p>
            Temperature: {convertKelvinToFahrenheit(weatherData.main.temp)} °F
          </p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherComponent;

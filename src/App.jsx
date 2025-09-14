import React, { useState } from "react";
import useGetWeather from "./components/useGetWeather";
import Weather from "./components/Weather";

function App() {
  const [location, setLocation] = useState("Islamabad");

  const { weather, countryData, isLoading, error } = useGetWeather(location);

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <input
        type="text"
        value={location}
        placeholder="Enter Country"
        onChange={(e) => setLocation(e.target.value)}
      />
      {isLoading && !error && <p className="loader">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather.time && <Weather weather={weather} countryData={countryData} />}
    </div>
  );
}

export default App;

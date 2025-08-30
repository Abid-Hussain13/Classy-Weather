import { useState, useEffect } from "react";

function useGetWeather(location) {
  const [countryData, setCountryData] = useState({});
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getWeather() {
      if (location.length === 0) {
        setError("");
        setIsLoading(false);
        return;
      }
      if (location.length <= 2) return setWeather("");

      setIsLoading(true);
      setError("");
      setWeather({});
      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
          { signal: controller.signal }
        );
        const geoData = await geoRes.json();

        if (!geoData.results) throw new Error("Location not found");

        const {
          latitude,
          longitude,
          timezone = "auto",
          name,
          country_code = "",
        } = geoData.results.at(0);
        setCountryData({
          name: name,
          country_code: country_code,
        });

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
          { signal: controller.signal }
        );
        const weatherData = await weatherRes.json();
        setWeather(weatherData.daily);
        setError("");
        setIsLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request aborted");
        } else {
          console.error(err);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getWeather();

    return () => controller.abort();
  }, [location]);

  return {
    countryData,
    weather,
    isLoading,
    error,
  };
}

export default useGetWeather;

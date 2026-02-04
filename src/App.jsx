import React, { useEffect, useState } from "react";
import WeatherBackground from "./components/WeatherBackground";
import {
  convertTemperature,
  getHumidityValue,
  getWindDirection,
  getVisibilityValue,
} from "./components/Helper";
import {
  HumidityIcon,
  WindIcon,
  VisibilityIcon,
  SunriseIcon,
  SunsetIcon,
} from "./components/Icons";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [unit, setUnit] = useState("C");
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    if (city.trim().length >= 3 && !weather) {
      const timer = setTimeout(() => fetchSuggestions(city), 500);
      return () => clearTimeout(timer);
    }
    setSuggestion([]);
  }, [city, weather]);

  const fetchSuggestions = async (query) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`,
      );
      if (!res.ok) return setSuggestion([]);
      setSuggestion(await res.json());
    } catch {
      setSuggestion([]);
    }
  };

  const fetchWeatherData = async (url, name = "") => {
    setError("");
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
      setCity(name || data.name);
      setSuggestion([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a valid city name.");
      return;
    }

    fetchWeatherData(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`,
    );
  };

  const getWeatherCondition = () =>
    weather && {
      main: weather.weather[0].main,
      isDay:
        Date.now() / 1000 > weather.sys.sunrise &&
        Date.now() / 1000 < weather.sys.sunset,
    };

  return (
    <div className="min-h-screen">
      <WeatherBackground condition={getWeatherCondition()} />

      <div className="flex items-center justify-center min-h-screen">
        <div className="backdrop-blur-md bg-white/20 p-5 rounded-xl w-full max-w-2xl text-gray-800 shadow-2xl">
          <h1 className="text-3xl font-bold text-center mb-3 ">Weather App</h1>

          {!weather ? (
            <form onSubmit={handleSearch} className="relative">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="w-full p-3 mb-4 rounded bg-transparent border border-white text-white placeholder-white"
              />

              {suggestion.length > 0 && (
                <div className="absolute w-full bg-black/50 rounded">
                  {suggestion.map((s) => (
                    <button
                      key={`${s.lat}-${s.lon}`}
                      type="button"
                      className="block w-full text-left px-4 py-2 hover:bg-blue-600"
                      onClick={() =>
                        fetchWeatherData(
                          `https://api.openweathermap.org/data/2.5/weather?lat=${s.lat}&lon=${s.lon}&appid=${API_KEY}&units=metric`,
                          s.name,
                        )
                      }
                    >
                      {s.name}, {s.country}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 py-2 rounded"
              >
                Get Weather
              </button>

              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </form>
          ) : (
            <div className="text-center">
              <button
                onClick={() => {
                  setWeather(null);
                  setCity("");
                }}
                className="mb-2 bg-gray-700 px-3 py-1 rounded text-white"
              >
                New Search
              </button>

              {/* City Name on the left, Single grey button showing both °C | °F */}
              <div className="flex items-center justify-between mt-1">
                <h2 className="text-2xl font-bold">{weather.name}</h2>
                <button
                  className="px-2 py-1 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-sm"
                  onClick={() => setUnit(unit === "C" ? "F" : "C")}
                >
                  <span className={unit === "C" ? "font-bold" : ""}>°C</span> |{" "}
                  <span className={unit === "F" ? "font-bold" : ""}>°F</span>
                </button>
              </div>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather"
                className="mx-auto my-2 animate-bounce w-24 h-24"
              />

              <p className="text-4xl mt-1">
                {convertTemperature(weather.main.temp, unit)}°{unit}
              </p>

              <p className="capitalize">{weather.weather[0].description}</p>

              <div className="flex flex-wrap justify-around mt-3">
                {[
                  [
                    HumidityIcon,
                    "Humidity",
                    `${weather.main.humidity}% (${getHumidityValue(
                      weather.main.humidity,
                    )})`,
                  ],
                  [
                    WindIcon,
                    "Wind",
                    `${weather.wind.speed} m/s (${getWindDirection(
                      weather.wind.deg,
                    )})`,
                  ],
                  [
                    VisibilityIcon,
                    "Visibility",
                    getVisibilityValue(weather.visibility),
                  ],
                ].map(([Icon, label, value]) => (
                  <div key={label} className="flex flex-col items-center m-1">
                    <Icon />
                    <p className="mt-1 font-semibold">{label}</p>
                    <p className="text-sm">{value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-around mt-3">
                {[
                  [SunriseIcon, "Sunrise", weather.sys.sunrise],
                  [SunsetIcon, "Sunset", weather.sys.sunset],
                ].map(([Icon, label, time]) => (
                  <div key={label} className="flex flex-col items-center m-1">
                    <Icon />
                    <p className="mt-1 font-semibold">{label}</p>
                    <p className="text-sm">
                      {new Date(time * 1000).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-sm">
                <p>
                  <strong>Feels Like:</strong>{" "}
                  {convertTemperature(weather.main.feels_like, unit)}°{unit}
                </p>
                <p>
                  <strong>Pressure:</strong> {weather.main.pressure} hPa
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

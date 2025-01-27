import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for external styling
import appInsights from './appInsights'; 

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const getWeather = async () => {
    try {
      appInsights.trackEvent({ name: 'WeatherRequest' }, { city });
      console.log('Weather request sent to App Insights');

      const response = await axios.get(
        `https://getweatherjma.azurewebsites.net/api/GetWeather?city=${city}`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError('Error retrieving weather data');
      setWeather(null);
    }
  };

  // Function to select an image based on weather description
  const getWeatherImage = (description) => {
    if (description.includes('cloud')) {
      return '/cloudy.jpg'; // Replace with your own image URL
    } else if (description.includes('rain')) {
      return '/rainy.jpg'; // Replace with your own image URL
    } else if (description.includes('sun')) {
      return '/sunny.jpg'; // Replace with your own image URL
    } else if (description.includes('snow')) {
      return '/snowy.jpg'; // Replace with your own image URL
    } else {
      return '/default.jpg'; // Default weather image
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="city-input"
        />
        <button onClick={getWeather} className="get-weather-button">Get Weather</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <img
            src={getWeatherImage(weather.weather[0].description.toLowerCase())}
            alt={weather.weather[0].description}
            className="weather-image"
          />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;

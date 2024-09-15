import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import CitySearch from './components/CitySearch'; // Import the CitySearch component
import ToggleButton from './components/ToggleButton';
import ForecastCard from './components/ForecastCard';
import { ToastContainer, toast } from 'react-toastify';
import clearsky from "./utills/images/clear-sky.jpg";
import cloudysky from "./utills/images/cloudy-sky.webp";
import rain from "./utills/images/rain.jpg";
import snow from "./utills/images/snow.webp";
import thunderstorm from "./utills/images/thunderstorm.jpg";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState('New York');
  const [unit, setUnit] = useState('metric');
  const [background, setBackground] = useState('');
  const apiKey = '29f686dcbb9da4b059a29393b2a19031';

  useEffect(() => {
    const cachedCity = localStorage.getItem('city');
    const cachedWeatherData = localStorage.getItem('weatherData');
    const cachedForecastData = localStorage.getItem('forecastData');

    if (cachedCity && cachedWeatherData && cachedForecastData) {
      setCity(cachedCity);
      setWeatherData(JSON.parse(cachedWeatherData));
      setForecastData(JSON.parse(cachedForecastData));
    } else {
      fetchWeatherData(city);
      fetchForecastData(city);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData(city);
    fetchForecastData(city);
  }, [city, unit]);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`);
      setWeatherData(response.data);
      localStorage.setItem('city', city);
      localStorage.setItem('weatherData', JSON.stringify(response.data));
      const mainWeather = response.data.weather[0].main.toLowerCase();
      switch (mainWeather) {
        case 'clear':
            setBackground(clearsky);
            break;
        case 'clouds':
            setBackground(cloudysky);
            break;
        case 'rain':
            setBackground(rain);
            break;
        case 'snow':
            setBackground(snow);
            break;
        case 'thunderstorm':
            setBackground(thunderstorm);
            break;
        default:
            setBackground(clearsky);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchForecastData = async (city) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`);
      const uniqueDaysForecast = filterUniqueDays(response.data.list);
      setForecastData(uniqueDaysForecast);
      localStorage.setItem('forecastData', JSON.stringify(uniqueDaysForecast));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const filterUniqueDays = (list) => {
    const daysMap = {};
    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
      if (!daysMap[date] && item.dt_txt.includes("12:00:00")) {
        daysMap[date] = item;
      }
    });
    return Object.values(daysMap);
  };

  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  const handleError = (message) => {
    toast.error(message);
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}>
      <ToastContainer />
      <h1 style={{ color: 'white', paddingTop: '1rem' }}>Weather Forecast</h1>
      <CitySearch onSearch={handleSearch} onError={handleError} /> {/* Pass handleError to CitySearch */}
      <ToggleButton toggleUnit={toggleUnit} unit={unit} />
      {weatherData && <WeatherCard data={weatherData} />}
      <div className="forecast-container">
        {forecastData.length > 0 && forecastData.map((day, index) => (
          <ForecastCard key={index} forecast={day} />
        ))}
      </div>
    </div>
  );
}

export default App;

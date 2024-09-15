import React from 'react';
const WeatherCard = ({ data }) => {
  console.log(data,'mmmmmm');
  const { name, main, weather, wind, visibility } = data;
  const { description, icon } = weather[0];

  return (
    <div className="weather-card">
    <h2>{name}</h2>
    <p className="temperature">{Math.round(main.temp)}°</p>
    <p className="description">{description}</p>
    <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="weather icon" />
    <div className="details">
      <p>Feels Like: {Math.round(main.feels_like)}°</p>
      <p>Min Temp: {Math.round(main.temp_min)}°</p>
      <p>Max Temp: {Math.round(main.temp_max)}°</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} m/s</p>
      <p>Visibility: {visibility / 1000} km</p>
    </div>
  </div>
  );
};

export default WeatherCard;

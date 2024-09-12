import React from 'react';
const WeatherCard = ({ data }) => {
  const { name, main, weather } = data;

  return (
    <div className="weather-card">
      <h2>{name}</h2>  {/* City Name */}
      <p>{Math.round(main.temp)}°</p>  {/* Current Temperature */}
      <p>{weather[0].description}</p>  {/* Weather Condition (e.g., sunny, cloudy) */}
      <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt="weather icon" />  {/* Weather Icon */}
    </div>
  );
};

export default WeatherCard;

import React from 'react';

const ForecastCard = ({ forecast }) => {
  const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="forecast-card">
      <h3>{date}</h3>
      <p>High: {Math.round(forecast.main.temp_max)}°</p>
      <p>Low: {Math.round(forecast.main.temp_min)}°</p>
      <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} alt="weather icon" />
    </div>
  );
};

export default ForecastCard;

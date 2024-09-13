import React from 'react';
const WeatherCard = ({ data }) => {
  console.log(data);
  const { name, main, weather } = data;

  return (
    <div className="weather-card">
      <h2>{name}</h2>  
      <p>{Math.round(main.temp)}°</p>  
      <p>{weather[0].description}</p>  
      <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt="weather icon" /> 
    </div>
  );
};

export default WeatherCard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CitySearch = ({ onSearch, onError }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(true);

  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (isUserTyping) {
        setDebouncedQuery(query);
      }
    }, 500);

    return () => clearTimeout(timerId);
  }, [query, isUserTyping]);

  useEffect(() => {
    if(debouncedQuery.length == 0){
      setSuggestions([])
    }
    if (debouncedQuery.length != 0 && isUserTyping) {
      fetchCities(debouncedQuery);
    }
  }, [debouncedQuery, isUserTyping]);

  const fetchCities = async (cityName) => {
    setLoading(true);
    
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${cityName}&type=like&appid=29f686dcbb9da4b059a29393b2a19031`
      );
      const cityNames = response.data.list.map((city) => city.name);
      console.log(cityNames);
      if(cityNames.length == 0) { onError('Failed to fetch cities. Please check city name or try again.');
      console.log('hola',);
    }
      setSuggestions(cityNames) ;
      setShowSuggestions(true);
    
    setLoading(false);
  };

  const handleCityClick = (cityName) => {
    setIsUserTyping(false);
    setQuery(cityName);
    setShowSuggestions(false);
    onSearch(cityName);
  };

  const handleInputChange = (e) => {
    setIsUserTyping(true);
    setQuery(e.target.value);
  };

  return (
    <div className='search-bar'>
      <input
        type="text"
        placeholder="Search for a city..."
        value={query}
        onChange={handleInputChange}
        className="city-search-input"
      />
      {loading && <div>Loading...</div>}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="city-suggestions-dropdown">
          {suggestions.map((cityName, index) => (
            <li key={index} onClick={() => handleCityClick(cityName)}>
              {cityName}
            </li>
          ))}
        </ul>
      )}
    </div>
    
  );
};

export default CitySearch;

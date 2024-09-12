import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import WeatherCard from '../WeatherCard';

describe('WeatherCard component', () => {
  const mockData = {
    name: 'New York',
    main: { temp: 20 },
    weather: [{ description: 'clear sky', icon: '01d' }]
  };

  it('should render the city name', () => {
    const { getByText } = render(<WeatherCard data={mockData} />);
    expect(getByText('New York')).toBeInTheDocument();
  });

  it('should display the correct temperature', () => {
    const { getByText } = render(<WeatherCard data={mockData} />);
    expect(getByText('20°')).toBeInTheDocument();
  });

  it('should show the weather description', () => {
    const { getByText } = render(<WeatherCard data={mockData} />);
    expect(getByText('clear sky')).toBeInTheDocument();
  });

  it('should display the correct weather icon', () => {
    const { getByAltText } = render(<WeatherCard data={mockData} />);
    const icon = getByAltText('weather icon');
    expect(icon.src).toContain('01d'); // Check that the icon URL is correct
  });
});

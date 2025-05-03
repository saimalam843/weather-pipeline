import React, { useState } from 'react';
import { fetchWeather } from './services/api';
import WeatherCard from './components/WeatherCard';

export default function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await fetchWeather(city);
      setData(result);
      setError('');
    } catch {
      setError('Could not fetch weather');
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <WeatherCard data={data} />}
    </div>
  );
}

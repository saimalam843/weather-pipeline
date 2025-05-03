import React from 'react';

export default function WeatherCard({ data }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: 16,
      marginTop: 16,
      borderRadius: 8,
      maxWidth: 300
    }}>
      <h2>{data.city} — {new Date(data.datetime).toLocaleString()}</h2>
      <p>🌡 Temperature: {data.temperature} °C</p>
      <p>💧 Humidity: {data.humidity}%</p>
      <p>💨 Wind Speed: {data.windSpeed} m/s</p>
      <p>☁ Condition: {data.condition}</p>
    </div>
  );
}

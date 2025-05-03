const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const csvPath = path.join(__dirname, 'raw_data.csv');
const csvWriter = createObjectCsvWriter({
  path: csvPath,
  header: [
    { id: 'city', title: 'City' },
    { id: 'temperature', title: 'Temperature' },
    { id: 'humidity', title: 'Humidity' },
    { id: 'wind_speed', title: 'Wind Speed' },
    { id: 'condition', title: 'Condition' },
    { id: 'datetime', title: 'Datetime' }
  ],
  append: fs.existsSync(csvPath)
});

const fetchWeatherData = async (city) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${city}`;
  const response = await axios.get(url);
  const { current, location } = response.data;

  return {
    city: location.name,
    temperature: current.temp_c,
    humidity: current.humidity,
    wind_speed: current.wind_kph,
    condition: current.condition.text,
    datetime: location.localtime
  };
};

const saveToCSV = async (data) => {
  await csvWriter.writeRecords([data]);
};

app.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'Islamabad';
  try {
    const weatherData = await fetchWeatherData(city);
    await saveToCSV(weatherData);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

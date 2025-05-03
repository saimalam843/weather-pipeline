const axios = require('axios');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const path = require('path');
const Weather = require('../models/Weather');

const rawCsvPath = path.join(__dirname, '../raw_data.csv');
const csvWriter = createObjectCsvWriter({
  path: rawCsvPath,
  header: [
    {id: 'city', title: 'City'},
    {id: 'temperature', title: 'Temperature'},
    {id: 'humidity', title: 'Humidity'},
    {id: 'windSpeed', title: 'Wind Speed'},
    {id: 'condition', title: 'Weather Condition'},
    {id: 'datetime', title: 'Date and Time'}
  ],
  append: fs.existsSync(rawCsvPath)
});

async function collectAndSave(city) {
  const key = process.env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  const { data } = await axios.get(url);

  const record = {
    city,
    temperature: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    condition: data.weather[0].main,
    datetime: new Date()
  };

  // Save to CSV
  await csvWriter.writeRecords([record]);

  // Save to Mongo
  await new Weather(record).save();

  return record;
}

module.exports = { collectAndSave };

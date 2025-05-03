const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  humidity: Number,
  windSpeed: Number,
  condition: String,
  datetime: Date
});

module.exports = mongoose.model('Weather', WeatherSchema);

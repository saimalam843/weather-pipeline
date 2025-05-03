import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export async function fetchWeather(city) {
  const { data } = await axios.get(API_URL, {
    params: { city }
  });
  return data;
}

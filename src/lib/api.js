import axios from "axios";

export function getWeather() {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=37.425136&lon=126.666266&mode=json&APPID=${
      process.env.REACT_APP_WEATHER_API
    }`
  );
}

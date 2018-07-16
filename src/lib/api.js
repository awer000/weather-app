import axios from "axios";

export function getWeather() {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=37.425136&lon=126.666266&mode=json&APPID=${
      process.env.REACT_APP_WEATHER_API
    }`

    // 날씨 api를 받아와서 get으로 정보를 요청하고 그 결과값을 promise로 반환하는 함수이다.
    // 리덕스에서 사용하기 위해 만들었다.
  );
}

import React from "react";
import "./WeatherTemplate.scss";
import WeatherList from "./WeatherList";

const WeatherTemplate = ({ data }) => {
  return (
    <div className="weather-form">
      <WeatherList className="weather-sub" data={data} />
      {/* WeatherContainer.js에서 보내주는 data를 받아와서 그대로 WeatherList.js 컴포넌트에 보내주고, 그 컴포
      넌트를 렌더링 한다.*/}
    </div>
  );
};

export default WeatherTemplate;

import React from "react";
import "./WeatherTemplate.scss";
import WeatherList from "./WeatherList";

const WeatherTemplate = ({ data }) => {
  return (
    <div className="weather-form">
      <WeatherList className="weather-sub" data={data} />
    </div>
  );
};

export default WeatherTemplate;

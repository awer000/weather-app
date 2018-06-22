import React from "react";
import "./WeatherList.scss";

const WeatherList = ({ data }) => {
  const subWeatherList = data.map(value => (
    <div
      className="item"
      style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        color: "white"
      }}
    >
      <div className="days">{value.dt_txt.substring(0, 16)}</div>
      <div
        className="weather-img"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img
          alt="weather-img"
          src={`//openweathermap.org/img/w/${value.weather[0].icon}.png`}
        />
        <div style={{ paddingLeft: "1rem" }}>
          {(value.main.temp - 275.15).toFixed(2) + "°C"}
        </div>
      </div>
      <div
        className="weather-desc"
        style={{
          flex: "1",
          textAlign: "right"
        }}
      >
        <div>{value.weather[0].description}</div>
        <div>{value.wind.speed} m/s</div>
      </div>
    </div>
  ));
  return (
    <div className="weather-template">
      <div
        className="weather-list"
        style={{ width: "100vw", display: "flex", flexDirection: "column" }}
      >
        {subWeatherList}
      </div>
    </div>
  );
};

export default WeatherList;

import React from "react";
import "./WeatherList.scss";

const WeatherList = ({ data }) => {
  // WeatherList.js 에서 보내주는 data를 받아와서 (이 데이터는 배열 구조이다.)
  // map 메서드를 이용해서 컴포넌트를 반환한다.
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
      {/*자료로 받아오는 날짜를 원하는 만큼 잘라낸다.*/}
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
        {/*날씨마다 다른 아이콘을 api에서 자체 제공하기 때문에 그것을 사용하기 위해서 src 주소 내에 변수를 사용해서 받아온다.*/}
        <div style={{ paddingLeft: "1rem" }}>
          {(value.main.temp - 275.15).toFixed(2) + "°C"}
          {/* 절대온도를 섭씨온도로 보여주기 위해 사용한 수식*/}
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
        {/* 날씨의 설명과 풍속을 가져와서 보여준다.*/}
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
        {/* 위에서 배열을 가지고 만든 컴포넌트 배열을 그대로 가져와서 렌더링 한다.*/}
      </div>
    </div>
  );
};

export default WeatherList;

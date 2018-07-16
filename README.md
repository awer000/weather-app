weather-app
============

React를 이용해서 구현하였고, 날씨 api를 이용해서 날씨를 확인하는 웹 어플리케이션입니다.

컴포넌트 구조 간단 설명
----------

* components 
  * App.js
  * WeatherList.js (받아온 api 정보를 배열로 나타내고 그 배열을 각각 컴포넌트로 변환하고 렌더링 함)
  * WeatherList.scss
  * WeatherTemplate.js (WeatherList를 감싸는 템플릿 컴포넌트)
  * weatherTemplate.scss
* containers
  * WeatherContainer.js (store의 weather 리덕스와 WeatherList를 연결해주는 컴포넌트)
* lib
  * api.js (날씨 api에 get 요청을 보내서 그것의 응답을 리턴하는 함수를 만듦 - redux에서 사용하기 위함)
* store
  * modules
    * index.js
    * weather.js (api.js 파일을 이용하여 리덕스를 만드는 함수)
  * configures.js (weather.js 파일에서 만든 리듀서를 가져와서 리덕스 store를 만들어주는 함수)
  * index.js
* styles
  * img (배경으로 사용할 이미지 파일)
    * clear.jpg
    * clouds.jpg
    * rain.jpg
  * utils.scss

# Components 폴더의 컴포넌트들 설명

## App.js

```javascript
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


```

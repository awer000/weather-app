
weather-app
============

React를 이용해서 구현하였고, 날씨 api를 이용해서 날씨를 확인하는 웹 어플리케이션입니다.

![Alt text](/src/styles/img/weather-app.png)

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

## WeatherList.js

```javascript
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
```

## WeatherTemplate.js

```javascript
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
```

## App.js

```javascript
import React, { Component } from "react";
import WeatherContainer from "../containers/WeatherContainer";

class App extends Component {
  render() {
    return <WeatherContainer />;
    // 실제로 WeatherTemplate.js를 리턴해도 되지만 리덕스를 적용해야하기 때문에
    // WeatherTemplate.js를 감싸고 거기로 data를 보내주고 있는 WeatherContainer를 리턴해야 한다.
  }
}

export default App;
```

# Containers 폴더 설명

## WeatherContainer.js

```javascript
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as weatherActions from "store/modules/weather";
import WeatherTemplate from "components/WeatherTemplate";
import { ChasingDots } from "better-react-spinkit";

class WeatherContainer extends Component {
  // 현재 데이터의 상태를 state에 저장해 놓는다.
  state = {
    data: null
  };

  getWeather = async () => {
    const { WeatherActions } = this.props;

    // WeatherActions을 this.props로 받아오고 그 안에 있는 getWeather() 함수를 실행시킨다.
    // getWeather() 는 promise를 반환하고 반환에 성공하면 그 data를 반환한다.
    try {
      await WeatherActions.getWeather();
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.getWeather();

    //이 컴포넌트가 마운트 되면 바로 위에서 설정한 getWeather() 함수를 실행한다.
  }
  componentDidUpdate(prevProps, prevState) {
    return this.state.data !== prevState.data;
    // 데이터가 현재 데이터와 이전 데이터가 다르면 현재 데이터로 업데이트 한다.
  }

  render() {
    const data = this.props.data;
    if (data) {
      // 받아온 데이터가 있다면 아래의 코드를 실행한다.
      const dataList = [];

      for (let i = 0; i < 9; i++) {
        dataList.push(data.data.list[i]);
      }
      // 기본 데이터의 양이 너무 많기 때문에 현재 시간으로 부터 이후 10개까지의 데이터만 사용할 것이다.
      // 빈 배열에 push 메서드로 기존 데이터를 넣는다.

      return (
        <div
          style={{
            backgroundImage:
              (dataList[0].weather[0].main === "Rain" &&
                "url(https://i.imgur.com/WGw0CUF.jpg)") ||
              (dataList[0].weather[0].main === "Clear" &&
                "url(https://www.joongdo.co.kr/mnt/images/file/2017y/09m/27d/20170927001702132_1.jpg)") ||
              (dataList[0].weather[0].main === "Clouds" &&
                "url(https://cdn.pixabay.com/photo/2016/09/28/22/34/clouds-1701660_1280.jpg)"),

            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}

          // 현재 날씨에 따라서 배경 이미지가 바뀌도록 설정하였다.
          // data의 문자열의 참, 거짓을 구별하여 url의 소스가 달라지도록 설계하였다.
        >
          <WeatherTemplate data={dataList} />

          {/*위에서 새로 만든 dataList를 WeatherTemplate에 전달하고, 렌더링한다.
            이렇게 해서 WeatherTemplate은 받은 data를 WeatherList에 전달하게 된다.
          */}
        </div>
      );
    }

    return (
      // 받아온 데이터가 없다면 아래 코드를 실행한다.
      // 로딩중이라는 아이콘을 렌더링 하는 코드이다.
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "15rem"
        }}
      >
        <ChasingDots color="white" size={60} />
      </div>
    );
  }
}

export default connect(
  // weather.js 리덕스에서 만든 state와 액션을 받아와서 현재 컴포넌트에서 사용할 수 있도록 props로 보내준다.
  state => ({
    data: state.weather.data
  }),
  dispatch => ({
    WeatherActions: bindActionCreators(weatherActions, dispatch)
  })
)(WeatherContainer);
```

# lib 폴더 설명

## api.js

```javascript
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
```

# store 폴더 설명

## modules - weather.js

```javascript
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { pender } from "redux-pender";
import * as api from "../../lib/api";

const GET_WEATHER = "GET_WEATHER";
// 액션 이름

export const getWeather = createAction(GET_WEATHER, () => api.getWeather());
// 액션 생성 함수

const initialState = {
  data: null
};

// 초기 state 값 설정

export default handleActions(
  // 리듀서를 만들고 내보내준다.

  {
    ...pender({
      type: GET_WEATHER,
      onSuccess: (state, { payload: response }) => {
        return produce(state, draft => {
          draft.data = { ...response };
        });
      }
    })
  },
  initialState
);
```

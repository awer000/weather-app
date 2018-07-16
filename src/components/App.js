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

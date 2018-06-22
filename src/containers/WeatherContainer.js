import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as weatherActions from "store/modules/weather";
import WeatherTemplate from "components/WeatherTemplate";
import { ChasingDots } from "better-react-spinkit";

class WeatherContainer extends Component {
  state = {
    data: null
  };

  getWeather = async () => {
    const { WeatherActions } = this.props;

    try {
      // this.req 에 Promise 담기
      await WeatherActions.getWeather();

      // console.log(this.props.url);
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    // 컴포넌트가 처음 나타날 때 요청
    this.getWeather();
  }
  componentDidUpdate(prevProps, prevState) {
    return this.state.data !== prevState.data;
  }

  render() {
    const data = this.props.data;
    if (data) {
      const dataList = [];
      for (let i = 0; i < 9; i++) {
        dataList.push(data.data.list[i]);
      }
      console.log(dataList);
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
        >
          <WeatherTemplate data={dataList} />
        </div>
      );
    }

    return (
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
  state => ({
    data: state.weather.data
  }),
  dispatch => ({
    WeatherActions: bindActionCreators(weatherActions, dispatch)
  })
)(WeatherContainer);

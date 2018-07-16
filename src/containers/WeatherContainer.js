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

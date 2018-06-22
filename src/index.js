import React from "react";
import ReactDOM from "react-dom";
import './base.scss'
import registerServiceWorker from "./registerServiceWorker";
import Root from "./Root";

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();

//문제점 항목

// 문제점 1. 현재 정렬이 이상하게 되어있다. 약간 보기 싫게 뒤죽 박죽이다.

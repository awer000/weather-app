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

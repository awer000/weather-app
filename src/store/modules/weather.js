import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { pender } from "redux-pender";
import * as api from "../../lib/api";

const GET_WEATHER = "GET_WEATHER";

export const getWeather = createAction(GET_WEATHER, () => api.getWeather());

const initialState = {
  data: null
};

export default handleActions(
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

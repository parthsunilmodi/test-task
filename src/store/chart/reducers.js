import { handleActions } from 'redux-actions';
import chartActions from './actions';

export const hotelReducer = handleActions(
  new Map([
    [
      chartActions.setLoading,
      (state, action) => ({
        ...state,
        loading: action.payload,
        error: null,
      }),
    ],
    [
      chartActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    ],
    [
      chartActions.setWeatherData,
      (state, action) => ({
        ...state,
        loading: false,
        weatherData: action.payload,
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    weatherData: [],
  },
);

export default hotelReducer;

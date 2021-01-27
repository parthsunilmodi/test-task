import { createActions } from 'redux-actions';
import axios from 'axios';

const options = {
  prefix: 'CHART',
};

const chartActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    SET_WEATHER_DATA: undefined,
  },
  options,
);

const getWeatherData = () => dispatch => {
  try {
    dispatch(chartActions.setLoading(true));
    axios
      .get('https://weather-api-test-guna.herokuapp.com/api/weather')
      .then(response => {
        dispatch(chartActions.setLoading(true));
        dispatch(chartActions.setWeatherData(response.data));
      })
      .catch(error => {
        console.error('error while getting chart data----', error);
        dispatch(chartActions.setFailure(error));
      });
  } catch (e) {
    console.error('error----', e);
    dispatch(chartActions.setFailure(e));
  } finally {
    dispatch(chartActions.setLoading(false));
  }
};

export default {
  ...chartActions,
  getWeatherData,
};

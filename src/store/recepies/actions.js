import { createActions } from 'redux-actions';

const options = {
  prefix: 'RECEPIES',
};

const recepiesActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    SET_RECEPIES_DATA: undefined,
  },
  options,
);

const getRecepiesData = data => dispatch => {
  try {
    dispatch(recepiesActions.setLoading(true));
    const sessionData = JSON.parse(sessionStorage.getItem('recepiesList') || '[]');

    sessionStorage.setItem('recepiesList', JSON.stringify([...sessionData, data]));
    dispatch(recepiesActions.setLoading(true));
    dispatch(recepiesActions.setRecepiesData([...sessionData, data]));
  } catch (e) {
    console.error('error----', e);
    dispatch(recepiesActions.setFailure(e));
  } finally {
    dispatch(recepiesActions.setLoading(false));
  }
};

export default {
  ...recepiesActions,
  getRecepiesData,
};

import { handleActions } from 'redux-actions';
import recepiesActions from './actions';

export const recepiesReducer = handleActions(
  new Map([
    [
      recepiesActions.setLoading,
      (state, action) => ({
        ...state,
        loading: action.payload,
        error: null,
      }),
    ],
    [
      recepiesActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    ],
    [
      recepiesActions.setRecepiesData,
      (state, action) => ({
        ...state,
        loading: false,
        recepiesData: action.payload,
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    recepiesData: [],
  },
);

export default recepiesReducer;

import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';

import configureStore from './config';
import history from './history';

import chartReducer from './chart/reducers';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    chart: persistReducer(
      {
        key: 'chart',
        storage,
      },
      chartReducer,
    ),
    router: connectRouter(history),
  }),
);

const initialState = window.initialReduxState;
const { store } = configureStore(history, initialState, rootReducer);

const persistor = persistStore(store);

export { store, history, persistor };

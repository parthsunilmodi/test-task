import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
// eslint-disable-next-line import/no-named-as-default
import recepiesReducer from './recepies/reducers';

import configureStore from './config';
import history from './history';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: [],
};

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    recepies: persistReducer(
      {
        key: 'chart',
        storage,
      },
      recepiesReducer,
    ),
    router: connectRouter(history),
  }),
);

const initialState = window.initialReduxState;
const { store } = configureStore(history, initialState, rootReducer);

const persistor = persistStore(store);

export { store, history, persistor };

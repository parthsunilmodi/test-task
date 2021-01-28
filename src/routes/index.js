import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/dashboard';
import AddDish from '../pages/addDish';

const Routes = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={AddDish} />
        <PrivateRoute exact path="/list" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routes;

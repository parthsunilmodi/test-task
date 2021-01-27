import React from 'react';
import { Route } from 'react-router-dom';
import LayoutComponent from '../components/layout';

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <LayoutComponent {...props}>
        <Component {...props} />
      </LayoutComponent>
    )}
  />
);

export default PrivateRoute;

import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { store } from '../../utils';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const state = store.getState().toJS();
  return (
    <Route {...rest} render={(props) => (
      state && state.user && state.user.accessToken
        ? <Component {...props} />
        : <Redirect to='/auth'/>
    )}/>
  );
};

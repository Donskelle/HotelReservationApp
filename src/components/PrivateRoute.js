import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children, ...rest }) {
  const authStatus = useSelector(state => state.user.name);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authStatus ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

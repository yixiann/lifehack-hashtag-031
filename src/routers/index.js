import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, authContext, ...rest }) => {
  const useAuth = () => {
    return useContext(authContext);
  }

  var auth = useAuth();

  var { token } = auth

  return (
    <Route
      exact
      {...rest}
      render={({ location }) =>
        token && window.localStorage.getItem('token')!=''? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export {PrivateRoute}

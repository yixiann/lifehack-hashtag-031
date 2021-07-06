import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, authContext, ...rest }) => {
  var auth = useContext(authContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
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

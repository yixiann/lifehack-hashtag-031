import React from 'react';
import { Route } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes } from './routes';

const PrivateRouteHandling = ({ children, component, ...props }) => {
  return (
    <Route {...props}
      render={() => children ? children : component}
    />
  )
};

const PublicRouteHandling = ({ children, component, ...props }) => {

  return (
    <Route {...props}
      render={() => children ? children : component}
    />
  )
};

const PublicRouter = PublicRouteHandling
const PrivateRouter = PrivateRouteHandling

export { PrivateRoutes, PrivateRouter, PublicRoutes, PublicRouter };

import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { PublicRoutes } from './routes';

const PublicRouteHandling = ({ children, component, loggedInUser, ...rest }) => {

  const [location, setLocation ] = useState('/')

  useEffect(()=>{
    if(window.location.pathname!='/'){
      setLocation(window.location.pathname)
    }
  }, [window.location.pathname])

  return (
    <Route {...rest}
      render={() => children ? children : component}
    />
  )
};

const PublicRouter = PublicRouteHandling

export { PublicRoutes, PublicRouter };

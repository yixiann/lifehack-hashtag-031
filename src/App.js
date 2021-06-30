import React, { Suspense, useEffect, useState }  from 'react';
import MainLayout from './layout/MainLayout';
import { HashRouter as Router} from 'react-router-dom';
import { PrivateRoutes , PrivateRouter, PublicRoutes , PublicRouter } from './routers';
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';

function App() {

  const [ login , setLogin ] = useState(false)

  useEffect(()=>{
    console.log("CHECK", window.location)
    console.log("CHECK2", window.location.hash)
    if(window.location.hash!='#/login'){
      setLogin(true)
    }
  })

  console.log("CHECKp", window.location)
  console.log("CHECKp2", window.location.hash)


  return (
    <div className="App">
      <Router>
        <ErrorBoundary>
        {
          PublicRoutes.map(route => {
            return (
              <PublicRouter key={route.path} exact={route.exact} path={route.path}>                  
                <Suspense fallback={<div>loading...</div>}>
                  <route.component/>
                </Suspense>
              </PublicRouter>
          )}
          )
        }
        {
          <MainLayout>
            {
              PrivateRoutes.map(route => {
                return (
                  <PrivateRouter key={route.path} exact={route.exact} path={route.path}>                  
                    <Suspense fallback={<div>loading...</div>}>
                      <route.component/>
                    </Suspense>
                  </PrivateRouter>
              )}
              )
            }
          </MainLayout>
        }
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;

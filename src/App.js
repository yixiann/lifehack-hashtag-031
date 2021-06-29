import React, { Suspense }  from 'react';
import MainLayout from './layout/MainLayout';
import { HashRouter as Router} from 'react-router-dom';
import { PublicRoutes as publicRoutes, PublicRouter, PublicRoutes } from './routers';
import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <Router>
        <MainLayout>
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
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;

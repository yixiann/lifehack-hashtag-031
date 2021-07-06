import React, { createContext, useState, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import Loginpage from "./pages/loginpage/LoginPage";
import MainLayout from "./layout/MainLayout";
import { PrivateRoutes } from "./routers/routes";
import { PrivateRoute } from "./routers";

export default function app() {

  //TODO Check if user log in 
  window.onbeforeunload = function() {
    console.log("TEST")
  };

  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/login">
            <Loginpage authContext={authContext}/>
          </Route>

          <MainLayout
            authContext={authContext}
          >
            {
              PrivateRoutes.map(route => {
                return (
                  <PrivateRoute path={route.path} authContext={authContext}>
                    <Suspense fallback={<div>loading...</div>}>
                      <route.component/>
                    </Suspense>
                  </PrivateRoute>
              )}
              )
            }
          </MainLayout>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

// LOGIN CHECKING
const authContext = createContext();

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signin = cb => {
    return fakeAuth.signin((values) => {
      setUser("user");
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}
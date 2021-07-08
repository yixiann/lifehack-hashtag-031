import React, { createContext, useState, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginPage from "./pages/loginpage/LoginPage";
import CreateUserPage from "./pages/loginpage/CreateUserPage";
import MainLayout from "./layout/MainLayout";
import { PrivateRoutes } from "./routers/routes";
import { PrivateRoute } from "./routers";

export default function app() {

  //TODO Check if user log in 
  // window.onbeforeunload = function(){
  //     return true;
  // }

  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage authContext={authContext}/>
          </Route>
          <Route path="/createuser">
            <CreateUserPage authContext={authContext}/>
          </Route>

          <MainLayout
            authContext={authContext}
          >
            {
              PrivateRoutes.map(route => {
                return (
                  <PrivateRoute path={route.path} authContext={authContext}>
                    <Suspense fallback={<div>loading...</div>}>
                      <route.component authContext={authContext}/>
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

const authUser = {
  isAuthenticated: false,
  signin(fn) {
    authUser.isAuthenticated = true;
    fn()
  },
  signout(fn) {
    authUser.isAuthenticated = false;
    fn()
  }
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("")

  const signin = fn => {
    return authUser.signin(() => {
      setUser(fn().username);
      setToken(fn().token)
      fn();
    });
  };

  const signout = fn => {
    return authUser.signout(() => {
      setUser(null);
      fn();
    });
  };

  return {
    user,
    token,
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
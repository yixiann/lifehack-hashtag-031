import React, { createContext, useState, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginPage from "./pages/loginpage/LoginPage";
import CreateUserPage from "./pages/loginpage/CreateUserPage";
import MainLayout from "./layout/MainLayout";
import { PrivateRoutes } from "./routers/routes";
import { PrivateRoute } from "./routers";
import { Result, Button } from "antd";

export default function app() {

  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/login">
            <LoginPage authContext={authContext}/>
          </Route>
          <Route exact path="/createuser">
            <CreateUserPage authContext={authContext}/>
          </Route>
          <Route exact path="/notfound">
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you are looking for does not exist."
              extra={
              <Button type="primary" onClick={()=>(window.location.pathname='/home')}>
                  Back Home
              </Button>}
            />
          </Route>

          { PrivateRoutes.map((item)=>(item.path)).includes(window.location.pathname) &&
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
          }
          {
            !PrivateRoutes.map((item)=>(item.path)).includes(window.location.pathname) &&
            <Redirect to='/notfound'/>
          }
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

// LOGIN CHECKING
const authContext = createContext();
console.log("authContext", authContext)
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
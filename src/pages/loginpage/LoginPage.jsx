import React, { useContext } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Button, Row, Col } from 'antd';

export const Loginpage = ({
  authContext,
  ...props
}) => {

  const useAuth = () => {
    return useContext(authContext);
  }

  var history = useHistory();
  var location = useLocation();
  var auth = useAuth();

  
  var { from } = location.state || { from: { pathname: "/home" } };
  var login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div style={{ height: '100vh'}}>
      <Row justify="center" align="middle" style={{height: 'inherit'}}>
        <Col>
          <Button 
            onClick={login}
            style={{margin:'auto'}}
          >
            Log in
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Loginpage
import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Button, Row, Col, Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const Loginpage = ({
  authContext,
  ...props
}) => {

  const useAuth = () => {
    return useContext(authContext);
  }

  const [form] = Form.useForm()

  var history = useHistory();
  var location = useLocation();
  var auth = useAuth();

  useEffect(()=>{
    form.setFieldsValue({username:"Hello", password:'e'})
  })

  var login = (values) => {
    var { from } = location.state || { from: { pathname: "/home" } };
    console.log('Received values of form: ', values);
    auth.signin((values) => {
      history.replace(from);
    });
  };

  return (
    <div style={{ height: '100vh'}}>
      <Row justify="center" align="middle" style={{height: 'inherit'}}>
        <Col>
          <Form
            form={form}
            name="login"
            onFinish={login}
          >
            <Form.Item
              name="username"
              rules={[{required: true, message: 'Please input your Username!'}]}
            >
              <Input
                prefix={<UserOutlined/>}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{required: true, message: 'Please input your Password!'}]}
            >
              <Input
                prefix={<LockOutlined/>}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Col align='middle'>
                <Button 
                  type="primary"
                  htmlType="submit"
                  style={{alignItems: 'center'}}
                >
                  Log in
                </Button>
              </Col>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Loginpage
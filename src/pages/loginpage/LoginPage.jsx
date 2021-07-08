import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Button, Row, Col, Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import URI, { convertToFormData } from '../../constants/URL'
import { confirmationModal, errorModal, successModal } from '../../components/UI/submissionModal';

export const Loginpage = ({
  authContext,
  ...props
}) => {

  const useAuth = () => {
    return useContext(authContext);
  }

  const [ incorrect, setIncorrect ] = useState(false)

  const signInAxios = (values) => {
    var tokenData = axios
      .post(URI.signIn, convertToFormData(values))
      .then((res)=>{
        return res.data.token
      }).catch((err) => {
        console.log("ERROR", err)
      });
    return tokenData
  }

  const [form] = Form.useForm()

  var history = useHistory();
  var location = useLocation();
  var auth = useAuth();

  async function login(){
    var { from } = location.state || { from: { pathname: "/home" } };
    var values = form.getFieldsValue()
    if(values){
      var token = await signInAxios(values)
      if(token){
        auth.signin(() => {
          history.replace(from);
          return {
            username: values.username,
            token
          }
        })
      } else {
        setIncorrect(true)
      }
    }
    console.log("Token", token)
  };

  return (
    <div style={{ height: '100vh'}}>
      <Row justify="center" align="middle" style={{height: 'inherit'}}>
        <Col>
          <Form
            form={form}
            name="login"
            onFinish={()=>(login())}
          >
            <Form.Item
              name="username"
              rules={[{required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UserOutlined/>}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined/>}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {
              incorrect &&
              <p style={{color:'red', margin:'0px', padding: '0px'}}>Incorrect Username or Password</p>
            }
            <Form.Item>
              <Col align='middle'>
                <Button 
                  type="primary"
                  onClick={()=>(form.validateFields().then(login()))}
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
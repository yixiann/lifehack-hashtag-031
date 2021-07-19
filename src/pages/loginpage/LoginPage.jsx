import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Button, Row, Col, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import URI, { convertToFormData } from '../../constants/URL'

export const LoginPage = ({
  authContext,
  ...props
}) => {

  const useAuth = () => {
    return useContext(authContext);
  }

  var history = useHistory();
  var location = useLocation();
  var auth = useAuth();
  
  const [form] = Form.useForm()

  const [ incorrect, setIncorrect ] = useState(false)

  const [ token, setToken ] = useState("")

  const [ checkToken, setCheckToken ] = useState(false)

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
    window.localStorage.setItem('username', values.username)
    window.localStorage.setItem('token', token);
    console.log("Token", token)
  };

  console.log("TEST LOGIN", window.localStorage.getItem('username'), window.localStorage.getItem('token'));

  // If there is a token stored in local storage, use token to get new token
  useEffect(()=>{
    var token = window.localStorage.getItem('token')
    if(!!token){
      console.log("RUN")
      const headers = {'Content-Type': 'application/json',}
      axios
      .post(URI.signInRefresh, {token}, {headers})
      .then((res)=>{
        setToken(res?.data?.token)
        window.localStorage.setItem('token', res?.data?.token);
      }).catch((err) => {
        console.log("ERROR", err)
        setCheckToken(true)
      });
    } else {
      setCheckToken(true)
    }
  },[])

  // If there is a token, sign in
  useEffect(()=>{
    var { from } = location.state || { from: { pathname: "/home" } };
    if(token){
      auth.signin(() => {
        history.replace(from);
        return {
          username: window.localStorage.getItem('username'),
          token
        }
      })
    }
  },[token])

  return (
    <div style={{ height: '100vh'}}>
      { checkToken &&
        <Row justify="center" align="middle" style={{height: 'inherit'}}>
          <Col>
            <Form
              form={form}
              name="login"
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
              <Button 
                type="primary"
                onClick={()=>(form.validateFields().then(login()))}
                style={{alignItems: 'center', width: "-webkit-fill-available"}}
              >
                Log in
              </Button>
              Or <a href="/createuser">register now!</a>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      }
    </div>
  );
}

export default LoginPage
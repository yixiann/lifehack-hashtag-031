import React, { useContext, useEffect, useState } from 'react';
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

  const [ usernameFailed, setUsernameFailed ] = useState(false)
  const [ passwordFailed, setPasswordFailed ] = useState(false)

  const [ validation, setValidation ] = useState(false)

  var history = useHistory();
  var location = useLocation();
  var auth = useAuth();

  const users = [
    {
      username: "Bobby",
      password: "HELLO"
    },
    {
      username: "Kate",
      password: "BYE"
    }
  ]

  useEffect(()=>{
    if(validation){
      var { from } = location.state || { from: { pathname: "/home" } };
      var values = form.getFieldsValue()
      form.validateFields().then((e)=>{
        if(e){
          auth.signin(() => {
            history.replace(from);
            return values.username
          })
        }
      })
      setValidation(false)
    }
  }, [validation])

  var login = () => {

    var values = form.getFieldsValue()

    var listOfUsers = users.map((item)=>(item.username))

    var passwordOfUser = users.filter((item)=>(item.username===values.username))[0]?.password 

    // IF USERNAME EXIST
    if(listOfUsers.includes(values.username)){
      setUsernameFailed(false)

      //IF PASSWORD IS CORRECT only check password if user check passes
      if(passwordOfUser === values.password){
        setPasswordFailed(false)
        
      } else {

        // PASSWORD FAIL
        setPasswordFailed(true)
      }

    } else {

      // USERNAME FAIL
      setUsernameFailed(true)
    }

    setValidation(true)
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
              rules={[
                { required: true, message: 'Please input your Username!' },
                () => ({
                  validator(_, value) {
                    if (usernameFailed && form.getFieldsValue().username!=undefined) {
                      return Promise.reject(new Error('User does not exist'));
                    }
                    return Promise.resolve();
                  }
                }),
              ]}
            >
              <Input
                prefix={<UserOutlined/>}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your Password!' },
                () => ({
                  validator(_, value) {
                    console.log(form.getFieldsValue().password)
                    if (passwordFailed && !!form.getFieldsValue().password) {
                      return Promise.reject(new Error('Incorrect Password'));
                    }
                    return Promise.resolve();
                  }
                }),
              ]}
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
                  onClick={login}
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
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Button, Row, Col, Form, Input, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import URI, { convertToFormData } from '../../constants/URL'
import { confirmationModal, errorModal, successModal } from '../../components/UI/submissionModal';
import { Link } from 'react-router-dom';

export const CreateUserPage = ({
  authContext,
  ...props
}) => {

  const createUserAxios = (values) => {
    var { from } = location.state || { from: { pathname: "/login" } };
    axios
      .post(URI.createUser, convertToFormData(values))
      .then(()=>{
        history.replace(from)
        successModal("Successfully Created User")
      }).catch((err) => {
        console.log("ERROR", err)
      });
  }

  const [form] = Form.useForm()

  var history = useHistory();
  var location = useLocation();

  async function createUser(){
    var values = form.getFieldsValue()
    console.log("VALUE", values)
    createUserAxios(values)
  };

  return (
    <div style={{ height: '100vh'}}>
      <Row justify="center" align="middle" style={{height: 'inherit'}}>
        <Col>
          <Form
            form={form}
            name="createUser"
          >
            <Form.Item
              name="username"
              rules={[{required: true, message: 'Please input a Username!' }]}
            >
              <Input
                prefix={<UserOutlined/>}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{required: true, message: 'Please input a Password!' }]}
            >
              <Input
                prefix={<LockOutlined/>}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
            <Button 
              type="primary"
              onClick={()=>(form.validateFields().then(createUser()))}
              style={{alignItems: 'center', width: "-webkit-fill-available"}}
            >
              Create User
            </Button>
            <Button 
              type="primary"
              style={{alignItems: 'center', marginTop: '10px',width: "-webkit-fill-available"}}
            >
              <Link to='/login'>
                Back
              </Link>
            </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default CreateUserPage